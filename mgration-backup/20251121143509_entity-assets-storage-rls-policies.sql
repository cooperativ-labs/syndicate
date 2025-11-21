-- RLS policies for entity-assets storage bucket
-- Storage path structure: {entityId}/re/{rePropertyId}/{assetType}/{filename}
-- Examples: "123/re/456/images/photo.jpg", "123/re/456/documents/doc.pdf"
-- 
-- Rules:
-- 1) Public can SELECT (read/download) files
-- 2) EDITOR and ADMIN users of the organization that owns the entityId can INSERT, UPDATE, DELETE

-- ============================================================================
-- ENTITY-ASSETS STORAGE BUCKET POLICIES
-- ============================================================================

-- Policy 1: Everyone can read/download entity-assets files
CREATE POLICY "Public can read entity assets" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'entity-assets');

-- Policy 2: Admins and editors can upload entity-assets files
-- Extract entityId from path (format: {entityId}/re/{rePropertyId}/...)
-- Check if user is organization_user with ADMIN or EDITOR permissions
CREATE POLICY "Admins and editors can upload entity assets" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'entity-assets'
    AND EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (le.id::text || '/re/%'))
    )
  );

-- Policy 3: Admins and editors can update entity-assets files
CREATE POLICY "Admins and editors can update entity assets" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'entity-assets'
    AND EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (le.id::text || '/re/%'))
    )
  )
  WITH CHECK (
    bucket_id = 'entity-assets'
    AND EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (le.id::text || '/re/%'))
    )
  );

-- Policy 4: Admins and editors can delete entity-assets files
CREATE POLICY "Admins and editors can delete entity assets" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'entity-assets'
    AND EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (name LIKE (le.id::text || '/re/%'))
    )
  );

