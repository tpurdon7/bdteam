alter table leads
  add column if not exists company_name text,
  add column if not exists person_name text,
  add column if not exists person_role text,
  add column if not exists lead_type text,
  add column if not exists region text,
  add column if not exists source_url text,
  add column if not exists preferred_channel text,
  add column if not exists contact_detail text,
  add column if not exists fallback_contact_path text,
  add column if not exists email_draft text,
  add column if not exists linkedin_draft text,
  add column if not exists followup_draft text;

create index if not exists leads_created_at_idx on leads(created_at desc);
