-- Allow public to SELECT organizations where is_public = true
-- This follows the same pattern as the offering RLS policies
CREATE POLICY "Public can view public organizations" ON organization
  FOR SELECT USING (is_public = true);

drop policy "Admins and editors can delete offering assets" on "storage"."objects";

drop policy "Admins and editors can update offering assets" on "storage"."objects";

drop policy "Admins and editors can upload offering assets" on "storage"."objects";


  create policy "Admins and editors can delete offering assets"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Admins and editors can update offering assets"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))))
with check (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Admins and editors can upload offering assets"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



