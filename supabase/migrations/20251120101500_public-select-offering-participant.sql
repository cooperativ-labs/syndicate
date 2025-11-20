BEGIN;

DROP POLICY IF EXISTS "Public can view offering participants" ON offering_participant;

CREATE POLICY "Public can view offering participants"
ON offering_participant
FOR SELECT
USING (true);

COMMIT;


