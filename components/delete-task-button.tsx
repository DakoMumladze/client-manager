"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteTask } from "@/actions/delete-task";

export function DeleteTaskButton({
  taskId,
  projectId,
  clientId,
}: {
  taskId: string;
  projectId: string;
  clientId: string;
}) {
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);
    const result = await deleteTask(taskId, projectId, clientId);
    setPending(false);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Task deleted.");
  }

  return (
    <ConfirmDialog
      trigger={
        <button
          type="button"
          aria-label="Delete task"
          className="rounded-md p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="size-3.5" />
        </button>
      }
      title="Delete task?"
      description="This action cannot be undone. The task will be permanently removed."
      confirmLabel="Delete task"
      onConfirm={handleDelete}
      pending={pending}
    />
  );
}
