"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProfileForm({
  defaultName,
  email,
}: {
  defaultName: string;
  email: string;
}) {
  return (
    <form className="flex flex-col gap-4">
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

      <div>
        <Button type="submit" className="w-auto px-6">
          Save changes
        </Button>
      </div>
    </form>
  );
}
