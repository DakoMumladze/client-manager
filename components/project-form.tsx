"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createProject } from "@/actions/create-project";
import { updateProject } from "@/actions/update-project";
import type { Project } from "@/lib/types";

const statuses = [
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
];

export function ProjectForm({
  clientId,
  project,
}: {
  clientId: string;
  project?: Project;
}) {
  const router = useRouter();
  const action = project
    ? updateProject.bind(null, project.id, clientId)
    : createProject.bind(null, clientId);

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
      router.push(
        project
          ? `/clients/${clientId}/projects/${project.id}`
          : `/clients/${clientId}`,
      );
    }
  }, [state, clientId, project, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          required
          defaultValue={project?.name ?? ""}
          placeholder="Project name..."
        />

        <Select
          label="Status"
          id="status"
          name="status"
          defaultValue={project?.status ?? "in_progress"}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Deadline"
          id="deadline"
          name="deadline"
          type="date"
          defaultValue={project?.deadline ?? ""}
        />

        <Input
          label="Budget"
          id="budget"
          name="budget"
          type="number"
          min="0"
          step="0.01"
          defaultValue={project?.budget ?? ""}
          placeholder="0.00"
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
          defaultValue={project?.description ?? ""}
          placeholder="Project description..."
          className="w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <Button type="submit" disabled={pending} className="w-auto px-6">
          {pending ? "Saving..." : project ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  );
}
