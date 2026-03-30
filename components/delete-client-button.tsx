"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClient } from "@/actions/delete-client";

export function DeleteClientButton({ clientId }: { clientId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setPending(true);
    const result = await deleteClient(clientId);
    setPending(false);

    if (result?.error) {
      alert(result.error);
      setConfirming(false);
      return;
    }

    router.push("/clients");
  }

  if (!confirming) {
    return (
      <Button
        variant="secondary"
        className="w-auto border-red-200 px-4 text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5"
        onClick={() => setConfirming(true)}
      >
        <Trash2 className="size-3.5" />
        Delete
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-stone-500">Are you sure?</span>
      <Button
        variant="secondary"
        className="w-auto border-red-200 px-4 text-red-600 hover:bg-red-50"
        onClick={handleDelete}
        disabled={pending}
      >
        {pending ? "Deleting..." : "Yes, delete"}
      </Button>
      <Button
        variant="secondary"
        className="w-auto px-4"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </Button>
    </div>
  );
}
