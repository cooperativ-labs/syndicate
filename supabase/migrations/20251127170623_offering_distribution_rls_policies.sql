-- Drop the existing UPDATE policy that allows both ADMIN and EDITOR
drop policy if exists "Admins and editors can update offering distributions" on "public"."offering_distribution";

-- Create UPDATE policy for ADMIN only
create policy "Admins can update offering distributions"
  on "public"."offering_distribution"
  as permissive
  for update
  to public
using (
  EXISTS (
    SELECT 1
    FROM public.offering o
    JOIN public.legal_entity le ON le.id = o.offering_entity_id
    WHERE o.id = offering_distribution.offering_id
      AND public.is_organization_admin(le.organization_id, auth.uid())
  )
)
with check (
  EXISTS (
    SELECT 1
    FROM public.offering o
    JOIN public.legal_entity le ON le.id = o.offering_entity_id
    WHERE o.id = offering_distribution.offering_id
      AND public.is_organization_admin(le.organization_id, auth.uid())
  )
);

