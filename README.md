# BD Team Platform

Internal outbound prospecting and outreach platform built with Next.js, Supabase, n8n, and OpenAI.

## What is included
- Dashboard with queue metrics, top opportunities, and workflow health
- ICP management views and search run history
- Leads table, lead detail pages, and provenance-first contact intelligence
- Draft review queue with review-first actions
- Pipeline and activity log views
- Settings page for tone, approval defaults, cooldowns, and integration placeholders
- Supabase SQL migration and demo seed data
- n8n webhook contracts and typed API endpoints
- Modular OpenAI prompt and service layer
- Basic state transition tests

## Stack
- Next.js App Router
- TypeScript
- Supabase Postgres and auth
- n8n webhooks
- OpenAI Responses API
- Tailwind CSS

## Project structure
- `app/` UI routes and webhook API routes
- `components/` reusable admin UI
- `lib/` domain logic, repositories, actions, integrations
- `prompts/` scoring and drafting prompts
- `supabase/` migrations and seed SQL
- `docs/` architecture and webhook contracts
- `tests/` domain tests

## Local setup
1. Copy `.env.example` to `.env.local`.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.
4. Run tests with `npm test`.

## Supabase setup
1. Create a Supabase project.
2. Apply [`001_initial_schema.sql`](/Users/tompurdon/Downloads/BD Team/supabase/migrations/001_initial_schema.sql).
3. Seed demo data from [`demo_seed.sql`](/Users/tompurdon/Downloads/BD Team/supabase/seed/demo_seed.sql) if needed.
4. Fill `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

## n8n integration
- Incoming workflow callbacks live under `/api/webhooks/n8n/*`.
- Requests must include `x-bd-team-secret`.
- Each route validates payloads and returns a `dedupeKey` so retries stay idempotent.
- Contracts are documented in [`docs/n8n-webhook-contracts.md`](/Users/tompurdon/Downloads/BD Team/docs/n8n-webhook-contracts.md).

## OpenAI integration
- Model selection is controlled via env vars:
  - `OPENAI_MODEL_LEAD_SCORING`
  - `OPENAI_MODEL_PERSONALIZATION`
  - `OPENAI_MODEL_DRAFTING`
- Prompt logging is disabled by default and can be enabled with `OPENAI_LOG_PROMPTS=true`.
- Service modules live in:
  - [`lib/openai/lead-scoring.ts`](/Users/tompurdon/Downloads/BD Team/lib/openai/lead-scoring.ts)
  - [`lib/openai/personalization.ts`](/Users/tompurdon/Downloads/BD Team/lib/openai/personalization.ts)
  - [`lib/openai/draft-generation.ts`](/Users/tompurdon/Downloads/BD Team/lib/openai/draft-generation.ts)

## Current implementation notes
- The repository layer currently falls back to typed demo data when Supabase env vars are absent.
- Server actions validate payloads and revalidate UI routes; persistence wiring is the next integration step.
- Human review remains the default, and no silent autosend path is implemented.
# bdteam
# bdteam
