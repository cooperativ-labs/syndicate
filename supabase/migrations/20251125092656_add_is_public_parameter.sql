set check_function_bodies = off;

create or replace function public.create_organization_with_admin(
  p_user_id uuid,
  p_name text,
  p_logo text default null,
  p_short_description text default null,
  p_website text default null,
  p_country text default null,
  p_slug text default null,
  p_is_public boolean default true
)
returns table (organization_id bigint, organization_slug text, organization_user_id uuid)
language plpgsql
set search_path to 'public'
as $function$
declare
  v_org_id bigint;
  v_org_slug text;
  v_org_user_id uuid;
begin
  insert into public.organization (
    name,
    is_public,
    logo,
    website,
    country,
    short_description,
    slug
  )
  values (
    p_name,
    p_is_public,
    p_logo,
    p_website,
    p_country,
    p_short_description,
    p_slug
  )
  returning id,
    slug into v_org_id,
    v_org_slug;

  insert into public.organization_user (
    user_id,
    organization_id,
    permissions
  )
  values (
    p_user_id,
    v_org_id,
    array['ADMIN']::organization_permission_type[]
  )
  returning id into v_org_user_id;

  return query
  select v_org_id,
    v_org_slug,
    v_org_user_id;
end;
$function$;

