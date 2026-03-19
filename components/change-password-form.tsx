"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword } from "@/actions/change-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <Input
        label="Current password"
        id="currentPassword"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
        required
        placeholder="Enter current password..."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="New password"
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="Enter new password..."
        />

        <Input
          label="Confirm new password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="Confirm new password..."
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
          {pending ? "Updating..." : "Update password"}
        </Button>
      </div>
    </form>
  );
}
