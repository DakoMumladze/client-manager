"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/actions/forgot-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <div role="status" className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 w-full">
          <p className="text-sm text-green-800">{state.success}</p>
        </div>
        <Link
          href="/auth/sign-in"
          className="text-sm text-blue-500 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

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

      {state?.error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="mt-1">
        {pending ? "Sending..." : "Send reset link"}
      </Button>

      <p className="mt-2 text-center text-xs text-stone-500">
        Remember your password?{" "}
        <Link
          href="/auth/sign-in"
          className="text-blue-500 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
