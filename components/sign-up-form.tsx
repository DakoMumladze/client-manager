"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle, Mail } from "lucide-react";
import { signUp } from "@/actions/sign-up";
import { getPasswordStrength } from "@/lib/password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const strength = getPasswordStrength(password);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 w-full py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail size={26} />
        </div>
        <div className="text-center">
          <h2 className="text-base font-semibold text-foreground">
            Check your email
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs">
            {state.success}
          </p>
        </div>
        <div className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive it?{" "}
            <span className="text-primary hover:underline cursor-pointer font-medium">
              Check your spam folder
            </span>{" "}
            or try again.
          </p>
        </div>
        <Link
          href="/auth/sign-in"
          className="mt-1 text-sm font-medium text-primary hover:underline transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

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
        <div className="relative">
          <Input
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            variant="secondary"
            className="pr-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 bottom-[9px] h-auto w-auto bg-transparent hover:bg-transparent p-0 text-muted-foreground hover:text-muted-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </Button>
        </div>

        {password && (
          <div className="flex flex-col gap-1.5 mt-0.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    strength.score >= i ? strength.color : "bg-muted"
                  }`}
                />
              ))}
            </div>
            {strength.label && (
              <p className="text-xs text-muted-foreground">
                Strength:{" "}
                <span
                  className={
                    strength.score <= 1
                      ? "text-red-500"
                      : strength.score <= 2
                        ? "text-orange-500"
                        : strength.score <= 3
                          ? "text-yellow-600"
                          : "text-green-600"
                  }
                >
                  {strength.label}
                </span>
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-0.5">
          Use 8+ characters with letters, numbers &amp; symbols.
        </p>
      </div>

      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="mt-1 flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
