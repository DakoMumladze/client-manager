-- ============================================================
-- Security hardening — addresses Supabase Security Advisor findings
--   1. Pin search_path on functions
--   2. Revoke public EXECUTE on trigger functions
--   3. Remove broad SELECT policy on the public avatars bucket
--   4. Enforce projects.client_id ownership at the RLS layer
-- ============================================================

-- ── 1 & 2. Trigger functions: pin search_path + lock down EXECUTE ──
-- A SECURITY DEFINER function with a mutable search_path is a
-- privilege-escalation vector. Pinning search_path to empty (with
-- fully-qualified names) closes it. These are trigger-only functions,
-- so they should not be callable as RPCs by anon/authenticated.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers run as the table owner regardless of these grants;
-- revoking EXECUTE only removes the /rest/v1/rpc/* attack surface.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at()  from public, anon, authenticated;

-- ── 3. Avatars bucket: drop the broad SELECT policy ──────────
-- The bucket is public, so object URLs (storage/v1/object/public/...)
-- work WITHOUT this policy. The policy only enabled clients to LIST
-- every file in the bucket. The app uses getPublicUrl() and never
-- lists, so removing it stops enumeration with no functional loss.

drop policy if exists "Anyone can view avatars" on storage.objects;

-- ── 4. Projects: enforce client ownership in RLS ─────────────
-- The original insert/update policies checked only user_id, so a
-- direct API call could attach a project to a client_id owned by
-- a different user. Add an EXISTS check so the database — not just
-- application code — guarantees the client belongs to the caller.

drop policy if exists "Users can insert own projects" on public.projects;
create policy "Users can insert own projects"
  on public.projects for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.clients c
      where c.id = client_id and c.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update own projects" on public.projects;
create policy "Users can update own projects"
  on public.projects for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.clients c
      where c.id = client_id and c.user_id = auth.uid()
    )
  );
