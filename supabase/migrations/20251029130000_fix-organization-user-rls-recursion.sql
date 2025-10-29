-- Fix infinite recursion in organization_user RLS policies
-- The issue: policies were querying organization_user table itself, causing recursion

-- Drop the problematic policies
DROP POLICY IF EXISTS "Organization members can view organization users" ON organization_user;
DROP POLICY IF EXISTS "Organization admins can manage organization users" ON organization_user;

-- Create a security definer function to check organization membership
-- This function bypasses RLS to avoid recursion
CREATE OR REPLACE FUNCTION public.is_organization_member(p_organization_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
  );
$$;

-- Create a security definer function to check if user is admin of organization
CREATE OR REPLACE FUNCTION public.is_organization_admin(p_organization_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
      AND 'ADMIN' = ANY(permissions)
  );
$$;

-- Policy: Users can view their own organization_user records
CREATE POLICY "Users can view own organization_user records" ON organization_user
  FOR SELECT USING (user_id = auth.uid());

-- Policy: Users can view organization_user records for organizations they belong to
-- Uses the security definer function to avoid recursion
CREATE POLICY "Organization members can view organization users" ON organization_user
  FOR SELECT USING (
    public.is_organization_member(organization_id, auth.uid())
  );

-- Policy: Users can insert organization_user records for themselves
-- This allows the creator of an organization to add themselves as admin
CREATE POLICY "Users can insert own organization_user" ON organization_user
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy: Organization admins can insert organization_user records
-- Uses security definer function to check admin status without recursion
CREATE POLICY "Organization admins can insert organization_user" ON organization_user
  FOR INSERT WITH CHECK (
    public.is_organization_admin(organization_id, auth.uid())
  );

-- Policy: Organization admins can update organization_user records
CREATE POLICY "Organization admins can update organization_user" ON organization_user
  FOR UPDATE USING (
    public.is_organization_admin(organization_id, auth.uid())
  );

-- Policy: Organization admins can delete organization_user records
-- Users cannot delete their own last membership (must have at least one org)
CREATE POLICY "Organization admins can delete organization_user" ON organization_user
  FOR DELETE USING (
    public.is_organization_admin(organization_id, auth.uid())
    AND user_id != auth.uid() -- Admins cannot delete themselves via this policy
  );

-- Policy: Users can delete their own organization_user records if they have other memberships
-- This allows users to leave organizations (but prevents them from being orphaned)
CREATE POLICY "Users can delete own organization_user if multiple memberships" ON organization_user
  FOR DELETE USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM organization_user ou2
      WHERE ou2.user_id = auth.uid()
        AND ou2.id != organization_user.id
    )
  );

