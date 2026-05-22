-- ============================================================
-- 1. Projects table
-- ============================================================
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  name        text not null,
  description text,
  status      text not null default 'in_progress',
  deadline    date,
  budget      numeric(12, 2),
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null,

  constraint projects_status_check check (status in ('in_progress', 'completed', 'on_hold'))
);

-- Auto-update updated_at on row change (reuse function from profiles migration)
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================
-- 2. RLS – users can only access projects belonging to their own clients
-- ============================================================
alter table public.projects enable row level security;

create policy "Users can read own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 3. Indexes for common query patterns
-- ============================================================
create index projects_user_id_idx on public.projects (user_id);
create index projects_client_id_idx on public.projects (client_id);
create index projects_client_status_idx on public.projects (client_id, status);
