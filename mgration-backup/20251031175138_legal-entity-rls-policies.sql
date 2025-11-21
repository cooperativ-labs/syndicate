-- RLS Policies for legal_entity table
-- Requirements:
-- - ADMIN or EDITOR (acting as MANAGER) can INSERT new legal_entity to their organization
-- - PUBLIC users can SELECT (view/select) legal_entity records
-- - EDITOR can UPDATE legal_entity records
-- - Only ADMIN can DELETE legal_entity records

-- Create a security definer function to check if user has ADMIN permission for organization
CREATE OR REPLACE FUNCTION public.is_organization_admin_for_legal_entity(p_organization_id BIGINT, p_user_id UUID)
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

-- Create a security definer function to check if user has EDITOR permission for organization
CREATE OR REPLACE FUNCTION public.is_organization_editor_for_legal_entity(p_organization_id BIGINT, p_user_id UUID)
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
      AND 'EDITOR' = ANY(permissions)
  );
$$;

-- Create a security definer function to check if user has ADMIN or EDITOR permission for organization
-- This covers the requirement for ADMIN or MANAGER (EDITOR) to insert
CREATE OR REPLACE FUNCTION public.is_organization_admin_or_editor_for_legal_entity(p_organization_id BIGINT, p_user_id UUID)
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
      AND ('ADMIN' = ANY(permissions) OR 'EDITOR' = ANY(permissions))
  );
$$;

-- Policy: PUBLIC users can SELECT legal_entity records
-- This allows anyone (including anonymous users) to view legal entities
CREATE POLICY "Public can view legal entities" ON legal_entity
  FOR SELECT USING (true);

-- Policy: ADMIN or EDITOR (MANAGER) can INSERT legal_entity for their organization
CREATE POLICY "Admins and editors can insert legal entities" ON legal_entity
  FOR INSERT WITH CHECK (
    public.is_organization_admin_or_editor_for_legal_entity(organization_id, auth.uid())
  );

-- Policy: EDITOR or ADMIN can UPDATE legal_entity records
CREATE POLICY "Editors and admins can update legal entities" ON legal_entity
  FOR UPDATE USING (
    public.is_organization_admin_or_editor_for_legal_entity(organization_id, auth.uid())
  );

-- Policy: Only ADMIN can DELETE legal_entity records
CREATE POLICY "Only admins can delete legal entities" ON legal_entity
  FOR DELETE USING (
    public.is_organization_admin_for_legal_entity(organization_id, auth.uid())
  );

