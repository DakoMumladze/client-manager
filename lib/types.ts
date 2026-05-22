export type ClientStatus = "lead" | "active" | "archived";

export type Client = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectStatus = "in_progress" | "completed" | "on_hold";

export type Project = {
  id: string;
  client_id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  deadline: string | null;
  budget: number | null;
  created_at: string;
  updated_at: string;
};

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  due_date: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
};
