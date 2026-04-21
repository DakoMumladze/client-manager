"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteClient } from "@/actions/delete-client";

export function DeleteClientButton({ clientId }: { clientId: string }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setPending(true);
    const result = await deleteClient(clientId);
    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Client deleted.");
    router.push("/clients");
  }

  return (
    <ConfirmDialog
      trigger={
        <Button
          variant="secondary"
          className="w-auto border-red-200 px-4 text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      }
      title="Delete client?"
      description="This action cannot be undone. The client and all associated data will be permanently removed."
      confirmLabel="Delete client"
      onConfirm={handleDelete}
      pending={pending}
    />
  );
}
