-- Fix organization SELECT policy to allow users to view organizations they just created
-- The issue: When creating an organization, users need to SELECT it to get the ID,
-- but the SELECT policy requires membership via organization_user, which doesn't exist yet.

-- Create a security definer function to check if an organization has no members
-- This allows the creator to view the organization before adding themselves as a member
CREATE OR REPLACE FUNCTION public.organization_has_no_members(p_organization_id BIGINT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT NOT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
  );
$$;

-- Add a new policy allowing authenticated users to view organizations with no members
-- that were created recently (within the last 5 minutes)
-- This allows the creator to view the organization before adding themselves as a member
CREATE POLICY "Authenticated users can view newly created organizations" ON organization
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND public.organization_has_no_members(id)
    AND created_at > NOW() - INTERVAL '5 minutes'
  );

-- Note: The existing "Organization members can view organization" policy will handle
-- organizations that have members, so users can still view organizations they belong to.

