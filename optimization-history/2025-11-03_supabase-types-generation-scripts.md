## Add Supabase types generation scripts (local and production)

Changes:
- Added `scripts/generate-supabase-types.js` which generates TypeScript database types via Supabase CLI.
- Added Yarn scripts:
  - `yarn types:local` → generates from local Supabase (`--local`).
  - `yarn types:prod` → generates from hosted project using `NEXT_PUBLIC_SUPABASE_URL` to derive project ref.
- Output written to `src/types/database.types.ts`.

Notes:
- Production script requires you to be logged in with the Supabase CLI (`supabase login`).
- Project ref is parsed from `NEXT_PUBLIC_SUPABASE_URL` (subdomain before `.supabase.co`).

Reference:
- Supabase JS TypeScript support and CLI generation: [supabase.com/docs/reference/javascript/typescript-support](https://supabase.com/docs/reference/javascript/typescript-support)





