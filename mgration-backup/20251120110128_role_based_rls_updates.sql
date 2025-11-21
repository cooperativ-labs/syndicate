BEGIN;

-- ============================================================================
-- Helper functions for organization permission checks
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_organization_admin_or_editor(
  p_organization_id BIGINT,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT
    p_user_id IS NOT NULL
    AND p_organization_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE organization_id = p_organization_id
        AND user_id = p_user_id
        AND (
          'ADMIN' = ANY(permissions)
          OR 'EDITOR' = ANY(permissions)
        )
    );
$$;

CREATE OR REPLACE FUNCTION public.is_organization_viewer_or_better(
  p_organization_id BIGINT,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT
    p_user_id IS NOT NULL
    AND p_organization_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE organization_id = p_organization_id
        AND user_id = p_user_id
        AND (
          'VIEWER' = ANY(permissions)
          OR 'EDITOR' = ANY(permissions)
          OR 'ADMIN' = ANY(permissions)
        )
    );
$$;

CREATE OR REPLACE FUNCTION public.is_any_organization_admin(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT
    p_user_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE user_id = p_user_id
        AND 'ADMIN' = ANY(permissions)
    );
$$;

-- ============================================================================
-- Profile visibility
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own profile" ON profile;

CREATE POLICY "Users and org peers can view profiles" ON profile
  FOR SELECT
  USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1
      FROM organization_user ou_requestor
      JOIN organization_user ou_target
        ON ou_target.organization_id = ou_requestor.organization_id
      WHERE ou_requestor.user_id = auth.uid()
        AND ou_target.user_id = profile.id
        AND (
          'VIEWER' = ANY(ou_requestor.permissions)
          OR 'EDITOR' = ANY(ou_requestor.permissions)
          OR 'ADMIN' = ANY(ou_requestor.permissions)
        )
    )
  );

-- ============================================================================
-- Legal entity relationships
-- ============================================================================

DROP POLICY IF EXISTS "Public can select legal entity relationships" ON legal_entity_relationship;
DROP POLICY IF EXISTS "Admins and editors can insert legal entity relationships" ON legal_entity_relationship;
DROP POLICY IF EXISTS "Admins and editors can update legal entity relationships" ON legal_entity_relationship;
DROP POLICY IF EXISTS "Admins and editors can delete legal entity relationships" ON legal_entity_relationship;

CREATE POLICY "Public can select legal entity relationships" ON legal_entity_relationship
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert legal entity relationships" ON legal_entity_relationship
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.parent_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.child_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update legal entity relationships" ON legal_entity_relationship
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.parent_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.child_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.parent_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.child_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can delete legal entity relationships" ON legal_entity_relationship
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.parent_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = legal_entity_relationship.child_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Address
-- ============================================================================

DROP POLICY IF EXISTS "Public can select addresses" ON address;
DROP POLICY IF EXISTS "Admins and editors can insert addresses" ON address;
DROP POLICY IF EXISTS "Admins and editors can update addresses" ON address;
DROP POLICY IF EXISTS "Admins and editors can delete addresses" ON address;

CREATE POLICY "Public can select addresses" ON address
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert addresses" ON address
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = address.legal_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update addresses" ON address
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = address.legal_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = address.legal_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can delete addresses" ON address
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = address.legal_entity_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Email address
-- ============================================================================

DROP POLICY IF EXISTS "Public can select email addresses" ON email_address;
DROP POLICY IF EXISTS "Admins and editors can insert email addresses" ON email_address;
DROP POLICY IF EXISTS "Admins and editors can update email addresses" ON email_address;
DROP POLICY IF EXISTS "Admins and editors can delete email addresses" ON email_address;

CREATE POLICY "Public can select email addresses" ON email_address
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert email addresses" ON email_address
  FOR INSERT
  WITH CHECK (
    public.is_organization_admin_or_editor(email_address.organization_id, auth.uid())
  );

CREATE POLICY "Admins and editors can update email addresses" ON email_address
  FOR UPDATE
  USING (
    public.is_organization_admin_or_editor(email_address.organization_id, auth.uid())
  )
  WITH CHECK (
    public.is_organization_admin_or_editor(email_address.organization_id, auth.uid())
  );

CREATE POLICY "Admins and editors can delete email addresses" ON email_address
  FOR DELETE
  USING (
    public.is_organization_admin_or_editor(email_address.organization_id, auth.uid())
  );

-- ============================================================================
-- Linked account
-- ============================================================================

DROP POLICY IF EXISTS "Public can select linked accounts" ON linked_account;
DROP POLICY IF EXISTS "Admins and editors can insert linked accounts" ON linked_account;
DROP POLICY IF EXISTS "Admins and editors can update linked accounts" ON linked_account;
DROP POLICY IF EXISTS "Admins and editors can delete linked accounts" ON linked_account;

CREATE POLICY "Public can select linked accounts" ON linked_account
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert linked accounts" ON linked_account
  FOR INSERT
  WITH CHECK (
    public.is_organization_admin_or_editor(linked_account.organization_id, auth.uid())
  );

CREATE POLICY "Admins and editors can update linked accounts" ON linked_account
  FOR UPDATE
  USING (
    public.is_organization_admin_or_editor(linked_account.organization_id, auth.uid())
  )
  WITH CHECK (
    public.is_organization_admin_or_editor(linked_account.organization_id, auth.uid())
  );

CREATE POLICY "Admins and editors can delete linked accounts" ON linked_account
  FOR DELETE
  USING (
    public.is_organization_admin_or_editor(linked_account.organization_id, auth.uid())
  );

-- ============================================================================
-- Real estate property
-- ============================================================================

DROP POLICY IF EXISTS "Public can select real estate properties" ON real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can insert real estate properties" ON real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can update real estate properties" ON real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can delete real estate properties" ON real_estate_property;

CREATE POLICY "Public can select real estate properties" ON real_estate_property
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert real estate properties" ON real_estate_property
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = real_estate_property.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update real estate properties" ON real_estate_property
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = real_estate_property.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = real_estate_property.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can delete real estate properties" ON real_estate_property
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = real_estate_property.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Document
-- ============================================================================

DROP POLICY IF EXISTS "Public can select documents" ON document;
DROP POLICY IF EXISTS "Admins and editors can insert documents" ON document;
DROP POLICY IF EXISTS "Admins and editors can update documents" ON document;
DROP POLICY IF EXISTS "Admins can delete documents" ON document;

CREATE POLICY "Public can select documents" ON document
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert documents" ON document
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = document.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = document.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update documents" ON document
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = document.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = document.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = document.owner_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = document.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete documents" ON document
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      WHERE le.id = document.owner_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
    OR EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = document.offering_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Offering distribution
-- ============================================================================

DROP POLICY IF EXISTS "Public can select offering distributions" ON offering_distribution;
DROP POLICY IF EXISTS "Admins and editors can insert offering distributions" ON offering_distribution;
DROP POLICY IF EXISTS "Admins and editors can update offering distributions" ON offering_distribution;
DROP POLICY IF EXISTS "Admins can delete offering distributions" ON offering_distribution;

CREATE POLICY "Public can select offering distributions" ON offering_distribution
  FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert offering distributions" ON offering_distribution
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_distribution.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update offering distributions" ON offering_distribution
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_distribution.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_distribution.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete offering distributions" ON offering_distribution
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_distribution.offering_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Document signatory
-- ============================================================================

DROP POLICY IF EXISTS "Viewers can select document signatories" ON document_signatory;
DROP POLICY IF EXISTS "Admins and editors can insert document signatories" ON document_signatory;
DROP POLICY IF EXISTS "Admins and editors can update document signatories" ON document_signatory;
DROP POLICY IF EXISTS "Admins can delete document signatories" ON document_signatory;

CREATE POLICY "Viewers can select document signatories" ON document_signatory
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM document d
      JOIN legal_entity le ON le.id = d.owner_id
      WHERE d.id = document_signatory.document_id
        AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can insert document signatories" ON document_signatory
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM document d
      JOIN legal_entity le ON le.id = d.owner_id
      WHERE d.id = document_signatory.document_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update document signatories" ON document_signatory
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM document d
      JOIN legal_entity le ON le.id = d.owner_id
      WHERE d.id = document_signatory.document_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM document d
      JOIN legal_entity le ON le.id = d.owner_id
      WHERE d.id = document_signatory.document_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete document signatories" ON document_signatory
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM document d
      JOIN legal_entity le ON le.id = d.owner_id
      WHERE d.id = document_signatory.document_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Notification configuration
-- ============================================================================

DROP POLICY IF EXISTS "Viewers can select notification configurations" ON notification_configuration;
DROP POLICY IF EXISTS "Admins and editors can insert notification configurations" ON notification_configuration;
DROP POLICY IF EXISTS "Admins and editors can update notification configurations" ON notification_configuration;
DROP POLICY IF EXISTS "Admins can delete notification configurations" ON notification_configuration;

CREATE POLICY "Viewers can select notification configurations" ON notification_configuration
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.id = notification_configuration.organization_user_id
        AND public.is_organization_viewer_or_better(ou.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can insert notification configurations" ON notification_configuration
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.id = notification_configuration.organization_user_id
        AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update notification configurations" ON notification_configuration
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.id = notification_configuration.organization_user_id
        AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.id = notification_configuration.organization_user_id
        AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete notification configurations" ON notification_configuration
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM organization_user ou
      WHERE ou.id = notification_configuration.organization_user_id
        AND public.is_organization_admin(ou.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Offering participant
-- ============================================================================

DROP POLICY IF EXISTS "Public can view offering participants" ON offering_participant;
DROP POLICY IF EXISTS "Organization admins and editors manage offering participants" ON offering_participant;
DROP POLICY IF EXISTS "Viewers can select offering participants" ON offering_participant;
DROP POLICY IF EXISTS "Admins and editors can insert offering participants" ON offering_participant;
DROP POLICY IF EXISTS "Admins and editors can update offering participants" ON offering_participant;
DROP POLICY IF EXISTS "Admins can delete offering participants" ON offering_participant;

CREATE POLICY "Public can view offering participants" ON offering_participant
  FOR SELECT
  USING (
    true
  );

CREATE POLICY "Viewers can select offering participants" ON offering_participant
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_participant.offering_id
        AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can insert offering participants" ON offering_participant
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_participant.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update offering participants" ON offering_participant
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_participant.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_participant.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete offering participants" ON offering_participant
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = offering_participant.offering_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Investor application
-- ============================================================================

DROP POLICY IF EXISTS "Public can insert investor applications" ON investor_application;
DROP POLICY IF EXISTS "Admins and editors can insert investor applications" ON investor_application;
DROP POLICY IF EXISTS "Viewers can select investor applications" ON investor_application;
DROP POLICY IF EXISTS "Admins and editors can update investor applications" ON investor_application;
DROP POLICY IF EXISTS "Admins can delete investor applications" ON investor_application;

CREATE POLICY "Public can insert investor applications" ON investor_application
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins and editors can insert investor applications" ON investor_application
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering_participant op
      JOIN offering o ON o.id = op.offering_id
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE op.id = investor_application.offering_participant_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Viewers can select investor applications" ON investor_application
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM offering_participant op
      JOIN offering o ON o.id = op.offering_id
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE op.id = investor_application.offering_participant_id
        AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins and editors can update investor applications" ON investor_application
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM offering_participant op
      JOIN offering o ON o.id = op.offering_id
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE op.id = investor_application.offering_participant_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering_participant op
      JOIN offering o ON o.id = op.offering_id
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE op.id = investor_application.offering_participant_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

CREATE POLICY "Admins can delete investor applications" ON investor_application
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM offering_participant op
      JOIN offering o ON o.id = op.offering_id
      JOIN legal_entity le ON le.id = o.offering_entity_id
      WHERE op.id = investor_application.offering_participant_id
        AND public.is_organization_admin(le.organization_id, auth.uid())
    )
  );

-- ============================================================================
-- Share order
-- ============================================================================

DROP POLICY IF EXISTS "Public can select share orders" ON share_order;
DROP POLICY IF EXISTS "Public can insert share orders" ON share_order;
DROP POLICY IF EXISTS "Admins can delete share orders" ON share_order;

CREATE POLICY "Public can select share orders" ON share_order
  FOR SELECT
  USING (true);

CREATE POLICY "Public can insert share orders" ON share_order
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can delete share orders" ON share_order
  FOR DELETE
  USING (public.is_any_organization_admin(auth.uid()));

-- ============================================================================
-- Share transfer event
-- ============================================================================

DROP POLICY IF EXISTS "Public can select share transfer events" ON share_transfer_event;
DROP POLICY IF EXISTS "Public can insert share transfer events" ON share_transfer_event;
DROP POLICY IF EXISTS "Admins can delete share transfer events" ON share_transfer_event;

CREATE POLICY "Public can select share transfer events" ON share_transfer_event
  FOR SELECT
  USING (true);

CREATE POLICY "Public can insert share transfer events" ON share_transfer_event
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can delete share transfer events" ON share_transfer_event
  FOR DELETE
  USING (public.is_any_organization_admin(auth.uid()));

COMMIT;

