"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/update-profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProfileForm({
  defaultName,
  email,
}: {
  defaultName: string;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Display Name"
          id="displayName"
          name="displayName"
          type="text"
          defaultValue={defaultName}
          required
          placeholder="Enter your name..."
        />

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          disabled
          className="cursor-not-allowed opacity-60"
        />
      </div>

      {state?.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2"
        >
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2"
        >
          <p className="text-sm text-green-800">{state.success}</p>
        </div>
      )}

      <div>
        <Button type="submit" disabled={pending} className="w-auto px-6">
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
