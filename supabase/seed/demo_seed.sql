insert into users (id, email, full_name, role)
values ('00000000-0000-0000-0000-000000000001', 'ops@bdteam.local', 'Alex Mercer', 'admin')
on conflict (id) do nothing;

insert into icps (
  id, title, description, geography, sectors, company_types, role_targets, keywords, exclusions, priority_score, status, created_by
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'B2B AI infrastructure startups hiring GTM leaders',
    'Companies showing GTM motion maturity and recent expansion.',
    '{"US","UK"}',
    '{"AI Infrastructure","Developer Tools"}',
    '{"Series A","Series B"}',
    '{"Head of Growth","VP Sales","Founder"}',
    '{"hiring","expansion","new product"}',
    '{"agencies","stealth"}',
    92,
    'active',
    '00000000-0000-0000-0000-000000000001'
  )
on conflict (id) do nothing;
