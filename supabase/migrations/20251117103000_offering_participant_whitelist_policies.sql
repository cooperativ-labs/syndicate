BEGIN;

DROP POLICY IF EXISTS "Organization admins and editors manage offering participants" ON offering_participant;

CREATE POLICY "Organization admins and editors manage offering participants"
ON offering_participant
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM offering o
    JOIN legal_entity le ON le.id = o.offering_entity_id
    JOIN organization_user ou ON ou.organization_id = le.organization_id
    WHERE o.id = offering_participant.offering_id
      AND ou.user_id = auth.uid()
      AND (
        'ADMIN' = ANY(ou.permissions)
        OR 'EDITOR' = ANY(ou.permissions)
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM offering o
    JOIN legal_entity le ON le.id = o.offering_entity_id
    JOIN organization_user ou ON ou.organization_id = le.organization_id
    WHERE o.id = offering_participant.offering_id
      AND ou.user_id = auth.uid()
      AND (
        'ADMIN' = ANY(ou.permissions)
        OR 'EDITOR' = ANY(ou.permissions)
      )
  )
);

DROP POLICY IF EXISTS "Organization admins and editors can view whitelist transactions" ON whitelist_transaction;
DROP POLICY IF EXISTS "Organization admins and editors can add whitelist transactions" ON whitelist_transaction;

CREATE POLICY "Organization admins and editors can view whitelist transactions"
ON whitelist_transaction
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM offering_participant op
    JOIN offering o ON o.id = op.offering_id
    JOIN legal_entity le ON le.id = o.offering_entity_id
    JOIN organization_user ou ON ou.organization_id = le.organization_id
    WHERE op.id = whitelist_transaction.offering_participant_id
      AND ou.user_id = auth.uid()
      AND (
        'ADMIN' = ANY(ou.permissions)
        OR 'EDITOR' = ANY(ou.permissions)
      )
  )
);

CREATE POLICY "Organization admins and editors can add whitelist transactions"
ON whitelist_transaction
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM offering_participant op
    JOIN offering o ON o.id = op.offering_id
    JOIN legal_entity le ON le.id = o.offering_entity_id
    JOIN organization_user ou ON ou.organization_id = le.organization_id
    WHERE op.id = whitelist_transaction.offering_participant_id
      AND ou.user_id = auth.uid()
      AND (
        'ADMIN' = ANY(ou.permissions)
        OR 'EDITOR' = ANY(ou.permissions)
      )
  )
);

COMMIT;

