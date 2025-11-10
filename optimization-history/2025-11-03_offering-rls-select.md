Title: Add RLS policies for offering SELECT to enable nested organization queries

Date: 2025-11-03

Context
- Code path: `src/utils/actions/organizationActions.tsx` uses a Supabase select on `organization` with a nested relationship `legal_entityCollection(..., offering(...))`.
- RLS was enabled for `offering` but there were no SELECT policies, causing nested selects to fail even for valid users.

Change
- Created migration: `supabase/migrations/20251103000000_offering-rls-policies.sql`.
- Added two policies on `offering`:
  1) "Public can view public offerings" – allows SELECT where `is_public = true`.
  2) "Organization members can view organization offerings" – allows SELECT when the user is a member of the organization associated to the related `legal_entity` via `offering.offering_entity_id` or `offering.owner_id`.

Impact
- Authenticated users who belong to an organization can now successfully select organizations along with their `legal_entityCollection` and nested `offering` records.
- Public offerings remain readable without auth.

Notes
- Existing organization and legal_entity policies already permit SELECT per membership and public visibility respectively.






