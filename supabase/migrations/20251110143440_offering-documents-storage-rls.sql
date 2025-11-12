-- RLS policies for offering-documents storage bucket
-- Storage path structure: {offeringId}/docs/{filename}
-- 
-- Rules:
-- 1) Anyone can download/read documents (public access)
-- 2) Only organization_users with EDITOR, MANAGER, or ADMIN permissions can upload documents
-- 3) Only organization_users with MANAGER or ADMIN permissions can delete documents

-- First, add MANAGER to the organization_permission_type enum if it doesn't exist


-- Policy 1: Anyone can read/download documents from offering-documents bucket
CREATE POLICY "Anyone can read offering documents" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'offering-documents');

-- Policy 2: Organization users with EDITOR, MANAGER, or ADMIN permissions can upload documents
-- Extract offeringId from path (format: {offeringId}/docs/{filename})
-- Check if user is organization_user with appropriate permissions
CREATE POLICY "Editors, managers, and admins can upload offering documents" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'offering-documents'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND (
          'EDITOR' = ANY(ou.permissions)
          OR 'ADMIN' = ANY(ou.permissions)
        )
        AND (name LIKE (o.id::text || '/docs/%'))
    )
  );

-- Policy 3: Organization users with MANAGER or ADMIN permissions can delete documents
CREATE POLICY "Admins can delete offering documents" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'offering-documents'
    AND EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND (
         'ADMIN' = ANY(ou.permissions)
        )
        AND (name LIKE (o.id::text || '/docs/%'))
    )
  );


CREATE POLICY "Anyone can read organization assets" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'organization-assets');

CREATE POLICY "Editors and admins can upload organization assets" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'organization-assets'
    AND EXISTS (
      SELECT 1
      FROM organization o
      JOIN organization_user ou ON ou.organization_id = o.id
      WHERE ou.user_id = auth.uid()
        AND (
          'EDITOR' = ANY(ou.permissions)
          OR 'ADMIN' = ANY(ou.permissions)
        )
    )
  );


CREATE POLICY "Editors and admins can delete organization assets" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'organization-assets'
    AND EXISTS (
      SELECT 1
      FROM organization o
      JOIN organization_user ou ON ou.organization_id = o.id
      WHERE ou.user_id = auth.uid()
       AND (
          'EDITOR' = ANY(ou.permissions)
          OR 'ADMIN' = ANY(ou.permissions)
        )
    )
  );
