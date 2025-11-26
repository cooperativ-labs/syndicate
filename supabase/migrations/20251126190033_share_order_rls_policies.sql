-- Drop the existing public insert policy
drop policy if exists "Public can insert share orders" on "public"."share_order";

-- Create INSERT policy for public users (unrestricted)
create policy "Public can insert share orders"
  on "public"."share_order"
  as permissive
  for insert
  to public
with check (true);

-- Create INSERT policy for ADMIN/EDITOR users at the organization associated with the offering
create policy "Admins and editors can insert share orders"
  on "public"."share_order"
  as permissive
  for insert
  to public
with check (
  EXISTS (
    SELECT 1
    FROM offering_smart_contract_set oscs
    JOIN offering o ON o.id = oscs.offering_id
    JOIN legal_entity le ON le.id = o.offering_entity_id
    WHERE oscs.swap_contract_address = share_order.swap_contract_address
      AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
  )
);

-- Create UPDATE policy for ADMIN/EDITOR users at the organization associated with the offering only
create policy "Admins and editors can update share orders"
  on "public"."share_order"
  as permissive
  for update
  to public
using (
  EXISTS (
    SELECT 1
    FROM offering_smart_contract_set oscs
    JOIN offering o ON o.id = oscs.offering_id
    JOIN legal_entity le ON le.id = o.offering_entity_id
    WHERE oscs.swap_contract_address = share_order.swap_contract_address
      AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
  )
)
with check (
  EXISTS (
    SELECT 1
    FROM offering_smart_contract_set oscs
    JOIN offering o ON o.id = oscs.offering_id
    JOIN legal_entity le ON le.id = o.offering_entity_id
    WHERE oscs.swap_contract_address = share_order.swap_contract_address
      AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
  )
);

