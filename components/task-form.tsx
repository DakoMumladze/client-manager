"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createTask } from "@/actions/create-task";
import { updateTask } from "@/actions/update-task";
import type { Task } from "@/lib/types";

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export function TaskForm({
  clientId,
  projectId,
  task,
}: {
  clientId: string;
  projectId: string;
  task?: Task;
}) {
  const router = useRouter();
  const action = task
    ? updateTask.bind(null, task.id, projectId, clientId)
    : createTask.bind(null, projectId, clientId);

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
      router.push(`/clients/${clientId}/projects/${projectId}`);
    }
  }, [state, clientId, projectId, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Title"
        id="title"
        name="title"
        type="text"
        required
        maxLength={200}
        defaultValue={task?.title ?? ""}
        placeholder="Task title..."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Priority"
          id="priority"
          name="priority"
          defaultValue={task?.priority ?? "medium"}
        >
          {priorities.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>

        <Input
          label="Due date"
          id="due_date"
          name="due_date"
          type="date"
          defaultValue={task?.due_date ?? ""}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-xs text-stone-500">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={task?.description ?? ""}
          placeholder="Task description..."
          className="w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <Button type="submit" disabled={pending} className="w-auto px-6">
          {pending ? "Saving..." : task ? "Save changes" : "Create task"}
        </Button>
      </div>
    </form>
  );
}
