-- Create a transactional helper to create an organization and its admin user atomically
-- Ensures organization.id is used for organization_user.organization_id within one transaction

set check_function_bodies = off;

create or replace function public.create_organization_with_admin(
  p_user_id uuid,
  p_name text,
  p_logo text default null,
  p_short_description text default null,
  p_website text default null,
  p_country text default null,
  p_slug text default null
)
returns table (
  organization_id bigint,
  organization_slug text,
  organization_user_id uuid
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_org_id bigint;
  v_org_slug text; 
  v_org_user_id uuid;
begin
  insert into public.organization (
    name, is_public, logo, website, country, short_description, slug
  )
  values (
    p_name, false, p_logo, p_website, p_country, p_short_description, p_slug
  )
  returning id, slug into v_org_id, v_org_slug;

  insert into public.organization_user (
    user_id, organization_id, permissions
  )
  values (
    p_user_id, v_org_id, array['ADMIN']::organization_permission_type[]
  )
  returning id into v_org_user_id;

  return query select v_org_id, v_org_slug, v_org_user_id;
end;
$$;

grant execute on function public.create_organization_with_admin(uuid, text, text, text, text, text, text) to public;


