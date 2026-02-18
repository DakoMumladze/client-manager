"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/actions/sign-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="flex flex-col gap-3 w-full">
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email address..."
      />

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        minLength={6}
        placeholder="Enter your password..."
      />

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Link
        href="/auth/forgot-password"
        className="text-xs text-blue-500 hover:underline self-end"
      >
        Forgot password?
      </Link>

      <Button type="submit" disabled={pending} className="mt-1">
        {pending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="mt-2 text-center text-xs text-stone-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-blue-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
