create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type lead_status as enum (
      'discovered',
      'qualified',
      'contact_path_found',
      'draft_ready',
      'needs_review',
      'draft_created',
      'sent',
      'replied',
      'followup_due',
      'archived'
    );
  end if;
end
$$;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  role text not null default 'operator',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists icps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  geography text[] not null default '{}',
  sectors text[] not null default '{}',
  company_types text[] not null default '{}',
  role_targets text[] not null default '{}',
  keywords text[] not null default '{}',
  exclusions text[] not null default '{}',
  priority_score integer not null default 50 check (priority_score between 0 and 100),
  status text not null default 'active',
  created_by uuid references users(id),
  last_run_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workflow_runs (
  id uuid primary key default gen_random_uuid(),
  external_run_id text not null unique,
  kind text not null,
  status text not null default 'pending',
  entity_type text,
  entity_id uuid,
  request_payload jsonb not null default '{}'::jsonb,
  response_payload jsonb not null default '{}'::jsonb,
  dedupe_key text,
  last_error text,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists workflow_runs_dedupe_idx
  on workflow_runs (kind, dedupe_key)
  where dedupe_key is not null;

create table if not exists search_runs (
  id uuid primary key default gen_random_uuid(),
  icp_id uuid not null references icps(id) on delete cascade,
  triggered_by_user_id uuid references users(id),
  workflow_run_id uuid references workflow_runs(id),
  source text not null default 'manual',
  status text not null default 'queued',
  result_count integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique,
  name text not null,
  geography text not null default '',
  sector text not null default '',
  company_type text not null default '',
  source_links text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  full_name text not null,
  role_title text not null default '',
  geography text not null default '',
  best_contact_path jsonb,
  fallback_contact_path jsonb,
  source_links text[] not null default '{}',
  confidence numeric(5,2) not null default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'active',
  owner_user_id uuid references users(id),
  icp_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  icp_id uuid not null references icps(id) on delete cascade,
  company_id uuid references companies(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  owner_user_id uuid references users(id),
  status lead_status not null default 'discovered',
  score integer not null default 0 check (score between 0 and 100),
  contact_confidence numeric(5,2) not null default 0.00,
  why_this_lead_matters text not null default '',
  best_outreach_angle text not null default '',
  source_links text[] not null default '{}',
  next_recommended_action text not null default '',
  personalization_points text[] not null default '{}',
  dedupe_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (dedupe_key)
);

create table if not exists drafts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  status text not null default 'draft_ready',
  short_draft text not null default '',
  warm_draft text not null default '',
  follow_up_draft text not null default '',
  personalization_points text[] not null default '{}',
  why_selected text[] not null default '{}',
  approved_by_user_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  workflow_run_id uuid references workflow_runs(id) on delete set null,
  actor_user_id uuid references users(id),
  actor_name text not null,
  event_type text not null,
  summary text not null,
  details text,
  severity text not null default 'info',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  user_id uuid primary key references users(id) on delete cascade,
  brand_tone text not null default '',
  writing_preferences text[] not null default '{}',
  signature_block text not null default '',
  outreach_rules text[] not null default '{}',
  cooldown_days integer not null default 7,
  approval_default text not null default 'review',
  integrations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on leads(status);
create index if not exists leads_score_idx on leads(score desc);
create index if not exists drafts_status_idx on drafts(status);
create index if not exists activities_created_at_idx on activities(created_at desc);
create index if not exists search_runs_icp_id_idx on search_runs(icp_id);

alter table users enable row level security;
alter table icps enable row level security;
alter table search_runs enable row level security;
alter table companies enable row level security;
alter table contacts enable row level security;
alter table leads enable row level security;
alter table drafts enable row level security;
alter table campaigns enable row level security;
alter table activities enable row level security;
alter table workflow_runs enable row level security;
alter table settings enable row level security;
