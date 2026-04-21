"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { signIn } from "@/actions/sign-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        required
        placeholder="you@example.com"
        variant="secondary"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs text-stone-500">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="••••••••"
            variant="secondary"
            className="pr-9"
          />
          <Button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent hover:bg-transparent p-0 text-stone-400 hover:text-stone-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </Button>
        </div>
      </div>

      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="mt-1 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="mt-2 text-center text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="font-medium text-blue-500 hover:underline">
          Create one free
        </Link>
      </p>
    </form>
  );
}
