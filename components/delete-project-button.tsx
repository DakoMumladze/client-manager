"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteProject } from "@/actions/delete-project";

export function DeleteProjectButton({
  projectId,
  clientId,
}: {
  projectId: string;
  clientId: string;
}) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setPending(true);
    const result = await deleteProject(projectId, clientId);
    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Project deleted.");
    router.push(`/clients/${clientId}`);
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
      title="Delete project?"
      description="This action cannot be undone. The project and all associated data will be permanently removed."
      confirmLabel="Delete project"
      onConfirm={handleDelete}
      pending={pending}
    />
  );
}
