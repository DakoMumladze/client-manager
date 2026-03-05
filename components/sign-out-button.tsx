"use client";

import { signOut } from "@/actions/sign-out";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="cursor-pointer text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}
