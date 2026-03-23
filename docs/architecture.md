# Architecture

## Stack
- Next.js App Router with TypeScript
- Supabase Postgres and auth
- n8n webhook-driven workflow orchestration
- OpenAI-backed scoring, personalization, and draft generation

## System shape
- `app/`: App Router pages and API routes
- `components/`: Admin UI and reusable table-first primitives
- `lib/repositories/`: Data access layer with demo fallback
- `lib/actions/`: Server actions for write paths
- `lib/openai/`: Model configuration, prompt contracts, and safe logging
- `supabase/`: SQL migrations and seed data
- `prompts/`: Prompt templates used by scoring and drafting services

## Operating principles
- Human review stays in the loop before external outreach.
- Workflows are idempotent through dedupe keys and workflow run records.
- Public, reviewable sources remain visible on every lead.
- The UI is optimized for fast operator review instead of marketing polish.
