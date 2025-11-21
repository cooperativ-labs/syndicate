-- RLS policies for offering_description_text table
-- Requirements:
-- - Everyone can SELECT (view) offering_description_text records
-- - Admin and editor users can INSERT, UPDATE, and DELETE offering_description_text records
-- - Access is based on organization membership via offering -> legal_entity -> organization

-- Policy 1: Everyone can view offering_description_text records
-- This allows public and authenticated users to view description text
CREATE POLICY "Everyone can view offering description text" ON offering_description_text
  FOR SELECT USING (true);

-- Policy 2: Admins and editors can insert offering_description_text for their organization
-- Ensures the inserted description text references an offering that belongs to an org
-- where the user has ADMIN or EDITOR permission
CREATE POLICY "Admins and editors can insert offering description text" ON offering_description_text
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND o.id = offering_description_text.offering_id
    )
  );

-- Policy 3: Admins and editors can update offering_description_text for their organization
CREATE POLICY "Admins and editors can update offering description text" ON offering_description_text
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND o.id = offering_description_text.offering_id
    )
  );

-- Policy 4: Admins and editors can delete offering_description_text for their organization
CREATE POLICY "Admins and editors can delete offering description text" ON offering_description_text
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND o.id = offering_description_text.offering_id
    )
  );

