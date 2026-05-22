import Link from "next/link";
import { CalendarDays, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  clientId,
}: {
  project: Project;
  clientId: string;
}) {
  return (
    <Link
      href={`/clients/${clientId}/projects/${project.id}`}
      className="block"
    >
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">{project.name}</CardTitle>
            <ProjectStatusBadge status={project.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1.5 text-sm text-stone-500">
            {project.description && (
              <p className="line-clamp-2">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {project.deadline && (
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-stone-400" />
                  {new Date(
                    project.deadline + "T00:00:00",
                  ).toLocaleDateString()}
                </p>
              )}
              {project.budget !== null && (
                <p className="flex items-center gap-1.5">
                  <DollarSign className="size-3.5 text-stone-400" />
                  {project.budget.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
            {!project.description &&
              project.deadline === null &&
              project.budget === null && <p className="italic">No details</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
