create table public.tasks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  description text,
  priority    text not null default 'medium',
  due_date    date,
  completed   boolean not null default false,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null,

  constraint tasks_priority_check check (priority in ('low', 'medium', 'high'))
);

create trigger tasks_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

alter table public.tasks enable row level security;

create policy "Users can read own tasks"
  on public.tasks for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.tasks for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.projects p
      where p.id = project_id and p.user_id = auth.uid()
    )
  );

create policy "Users can update own tasks"
  on public.tasks for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.projects p
      where p.id = project_id and p.user_id = auth.uid()
    )
  );

create policy "Users can delete own tasks"
  on public.tasks for delete
  to authenticated
  using (auth.uid() = user_id);

create index tasks_user_id_idx on public.tasks (user_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_project_completed_idx on public.tasks (project_id, completed);
