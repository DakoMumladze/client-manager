"use client";

import { signOut } from "@/actions/sign-out";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Sign out
      </button>
    </form>
  );
}
