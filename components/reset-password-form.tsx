"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword } from "@/actions/reset-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <form action={formAction} className="flex flex-col gap-3 w-full">
      <Input
        label="New password"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        placeholder="Enter your new password..."
      />

      <Input
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        placeholder="Confirm your new password..."
      />

      {state?.error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="mt-1">
        {pending ? "Resetting..." : "Reset password"}
      </Button>

      <p className="mt-2 text-center text-xs text-stone-500">
        <Link
          href="/auth/sign-in"
          className="text-blue-500 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
