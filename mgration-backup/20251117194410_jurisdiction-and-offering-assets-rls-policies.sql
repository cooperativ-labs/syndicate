-- RLS policies for jurisdiction table and offering-assets storage bucket
-- Requirements:
-- - Everyone can SELECT (view) jurisdiction records and offering-assets files
-- - Admin and editor users can INSERT, UPDATE, and DELETE jurisdiction records
-- - Admin and editor users can INSERT, UPDATE, and DELETE offering-assets files
--   (based on organization membership via offering -> legal_entity -> organization)

-- ============================================================================
-- JURISDICTION TABLE POLICIES
-- ============================================================================

-- Enable RLS on jurisdiction table (if not already enabled)
ALTER TABLE jurisdiction ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can view jurisdiction records
-- This allows public and authenticated users to view jurisdictions
CREATE POLICY "Everyone can view jurisdictions" ON jurisdiction
  FOR SELECT USING (true);

-- Policy 2: Admins and editors can insert jurisdiction records
-- Any user with ADMIN or EDITOR permission in any organization can create jurisdictions
CREATE POLICY "Admins and editors can insert jurisdictions" ON jurisdiction
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy 3: Admins and editors can update jurisdiction records
CREATE POLICY "Admins and editors can update jurisdictions" ON jurisdiction
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy 4: Admins and editors can delete jurisdiction records
CREATE POLICY "Admins and editors can delete jurisdictions" ON jurisdiction
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- ============================================================================
-- OFFERING-ASSETS STORAGE BUCKET POLICIES
-- ============================================================================
-- Storage path structure: {offeringId}/{assetType}/{filename}
-- Examples: "123/logo/image.png", "123/banner_image/banner.jpg"

-- Policy 1: Everyone can read/download offering-assets files
CREATE POLICY "Everyone can read offering assets" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'offering-assets');

-- Policy 2: Admins and editors can upload offering-assets files
-- Extract offeringId from path (format: {offeringId}/{assetType}/{filename})
-- Check if user is organization_user with ADMIN or EDITOR permissions
CREATE POLICY "Admins and editors can upload offering assets" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'offering-assets'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (o.id::text || '/%'))
    )
  );

-- Policy 3: Admins and editors can update offering-assets files
CREATE POLICY "Admins and editors can update offering assets" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'offering-assets'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (o.id::text || '/%'))
    )
  )
  WITH CHECK (
    bucket_id = 'offering-assets'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (o.id::text || '/%'))
    )
  );

-- Policy 4: Admins and editors can delete offering-assets files
CREATE POLICY "Admins and editors can delete offering assets" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'offering-assets'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (o.id::text || '/%'))
    )
  );


