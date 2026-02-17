"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type State = { error?: string; success?: string } | null;

export function SignUpForm() {
  async function signUp(_prevState: State, formData: FormData): Promise<State> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    return {
      success:
        "Check your email for a confirmation link to complete your registration.",
    };
  }

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
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-xs text-stone-500"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter your email address..."
          className="h-9 w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-xs text-stone-500"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="Enter your password..."
          className="h-9 w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-9 w-full rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {pending ? "Creating account..." : "Continue"}
      </button>

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
