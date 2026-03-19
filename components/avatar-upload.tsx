"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { updateAvatar } from "@/actions/update-avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export function AvatarUpload({
  currentAvatarUrl,
  displayName,
  email,
}: {
  currentAvatarUrl: string;
  displayName: string;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(updateAvatar, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [clearedForState, setClearedForState] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initials = getInitials(displayName, email);

  if (state?.success && state.success !== clearedForState) {
    setClearedForState(state.success);
    setPreview(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  const imageSrc = preview || currentAvatarUrl;

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={displayName || "Avatar"}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-stone-100"
        />
      ) : (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-stone-100 text-3xl font-semibold text-stone-500 ring-4 ring-stone-50">
          {initials}
        </div>
      )}

      <div className="text-center">
        <p className="text-lg font-semibold text-stone-800">
          {displayName || "No name set"}
        </p>
        <p className="text-sm text-stone-500">{email}</p>
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

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          name="avatar"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          type="button"
          variant="secondary"
          className="w-auto px-4"
          disabled={pending}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? "Change image" : "Upload photo"}
        </Button>

        {preview && (
          <Button type="submit" disabled={pending} className="w-auto px-4">
            {pending ? "Uploading..." : "Save"}
          </Button>
        )}
      </div>

      <p className="text-xs text-stone-400">JPEG, PNG, or WebP. Max 2MB.</p>
    </form>
  );
}
