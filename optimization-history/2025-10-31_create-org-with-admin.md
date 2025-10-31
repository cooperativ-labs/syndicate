## Create organization with admin in one transaction

- Added `public.create_organization_with_admin` Postgres function to insert into `organization` and `organization_user` atomically.
- New GraphQL mutation `ADD_ORGANIZATION_WITH_ADMIN` in `src/utils/graphQueries/organization.ts` calls the function via pg_graphql.
- Motivation: ensure `organization.id` is used for `organization_user.organization_id` without race conditions; single round-trip from the app.

### Files
- `supabase/migrations/20251031154500_create_org_with_admin_function.sql`
- `src/utils/graphQueries/organization.ts`

### Notes
- Function is `SECURITY DEFINER` and grants `EXECUTE` to `public`.
- Returns `organization_id` and `organization_user_id` for client linking/refetch.

