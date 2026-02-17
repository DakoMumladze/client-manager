"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/actions/sign-up";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, null);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 w-full">
          <p className="text-sm text-green-800">{state.success}</p>
        </div>
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

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        placeholder="Enter your password..."
      />

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="mt-1">
        {pending ? "Creating account..." : "Continue"}
      </Button>

      <p className="mt-2 text-center text-xs text-stone-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-500 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
