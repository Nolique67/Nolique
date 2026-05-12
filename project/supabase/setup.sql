-- ============================================================
-- Ageless Skin Consult — Supabase Database Setup
-- Run this in your Supabase project's SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- ─── 1. profiles table ────────────────────────────────────────────────────
-- Drizzle migrations will create this, but we also need the trigger.
-- If you're using `pnpm --filter @workspace/db run push`, the table already
-- exists from your schema. This trigger auto-creates a profile row when a
-- new user signs up via Supabase Auth.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop existing trigger before recreating (idempotent)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ─── 2. Row Level Security (RLS) ──────────────────────────────────────────
-- Enable RLS on all tables so direct Supabase JS client access is safe.
-- Your Express API uses the service-role key which bypasses RLS.

alter table public.profiles enable row level security;
alter table public.consultations enable row level security;

-- profiles: users can only read/update their own row
create policy "Users can read own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- consultations: users can only CRUD their own consultations
create policy "Users can read own consultations"
  on public.consultations for select
  using ( auth.uid() = user_id );

create policy "Users can create consultations"
  on public.consultations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own pending consultations"
  on public.consultations for update
  using ( auth.uid() = user_id and status = 'pending' );


-- ─── 3. Updated_at auto-update trigger ───────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_consultations_updated_at
  before update on public.consultations
  for each row execute procedure public.set_updated_at();
