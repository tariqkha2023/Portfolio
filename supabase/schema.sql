-- Portfolio authentication + admin access
-- Run this entire file in Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read only their own profile.
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

-- Automatically create a normal (non-admin) profile after registration.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) not null,
  title text not null,
  description text not null,
  link text,
  image_url text,
  tags text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects"
on public.projects for select
using (true);

-- IMPORTANT: only profiles with is_admin=true can create/update/delete projects.
drop policy if exists "Authenticated users can insert their own projects" on public.projects;
drop policy if exists "Owners can update their own projects" on public.projects;
drop policy if exists "Owners can delete their own projects" on public.projects;
drop policy if exists "Admins can insert projects" on public.projects;
drop policy if exists "Admins can update projects" on public.projects;
drop policy if exists "Admins can delete projects" on public.projects;

create policy "Admins can insert projects"
on public.projects for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
  and owner_id = auth.uid()
);

create policy "Admins can update projects"
on public.projects for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
  and owner_id = auth.uid()
);

create policy "Admins can delete projects"
on public.projects for delete
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_admin = true
  )
);


-- AFTER registering your admin account, run this command once:
-- Replace the email with the admin email you registered with.
--
-- update public.profiles
-- set is_admin = true
-- where id = (select id from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com');
--
-- Do NOT set is_admin=true for ordinary users.
