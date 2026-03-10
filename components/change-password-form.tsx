"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
  return (
    <form className="flex flex-col gap-4">
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

      <div>
        <Button type="submit" className="w-auto px-6">
          Update password
        </Button>
      </div>
    </form>
  );
}
