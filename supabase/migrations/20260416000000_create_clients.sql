-- ============================================================
-- 1. Clients table
-- ============================================================
create table public.clients (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  name       text not null,
  email      text,
  phone      text,
  status     text not null default 'lead',
  notes      text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  constraint clients_status_check check (status in ('lead', 'active', 'archived'))
);

-- Auto-update updated_at on row change (reuse function from profiles migration)
create trigger clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- ============================================================
-- 2. RLS – users can only access their own clients
-- ============================================================
alter table public.clients enable row level security;

create policy "Users can read own clients"
  on public.clients for select
  using (auth.uid() = user_id);

create policy "Users can insert own clients"
  on public.clients for insert
  with check (auth.uid() = user_id);

create policy "Users can update own clients"
  on public.clients for update
  using (auth.uid() = user_id);

create policy "Users can delete own clients"
  on public.clients for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 3. Indexes for common query patterns
-- ============================================================
create index clients_user_id_idx on public.clients (user_id);
create index clients_user_status_idx on public.clients (user_id, status);
