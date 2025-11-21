-- RLS policies for offering SELECT access
-- Context: allow nested selects in organization -> legal_entityCollection -> offering
-- Rules:
-- 1) Public can view offerings marked is_public = true
-- 2) Authenticated users can view offerings that belong to organizations they are members of

-- Policy 1: Public can view public offerings
CREATE POLICY "Public can view public offerings" ON offering
  FOR SELECT USING (is_public = true);

-- Policy 2: Organization members can view organization offerings
-- A user can view an offering if they are a member of the organization that owns
-- the related legal entity (either offering_entity_id or owner_id)
CREATE POLICY "Organization members can view organization offerings" ON offering
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND (le.id = offering.offering_entity_id)
    )
  );

-- Policy 3: Admins or editors can insert offerings for their organization
-- Ensures the inserted offering references a legal_entity that belongs to an org
-- where the user has ADMIN or EDITOR permission
CREATE POLICY "Admins and editors can insert offerings" ON offering
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (le.id = offering.offering_entity_id)
    )
  );

-- Policy 4: Admins or editors can update offerings for their organization
CREATE POLICY "Admins and editors can update offerings" ON offering
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
        AND (le.id = offering.offering_entity_id)
    )
  );

-- Policy 5: Only admins can delete offerings for their organization
CREATE POLICY "Only admins can delete offerings" ON offering
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE ou.user_id = auth.uid()
        AND 'ADMIN' = ANY(ou.permissions)
        AND (le.id = offering.offering_entity_id)
    )
  );


