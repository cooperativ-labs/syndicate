-- RLS policies for crypto_address table
-- Requirements:
-- - ADMIN and EDITOR users can insert and delete crypto addresses for their organizations
-- - Public users (including anonymous) can select crypto addresses

-- Ensure policies are idempotent by dropping existing ones if present
DROP POLICY IF EXISTS "Public can view crypto addresses" ON crypto_address;
DROP POLICY IF EXISTS "Admins and editors can insert crypto addresses" ON crypto_address;
DROP POLICY IF EXISTS "Admins and editors can update crypto addresses" ON crypto_address;
DROP POLICY IF EXISTS "Admins and editors can delete crypto addresses" ON crypto_address;

-- Policy: Public can select crypto addresses
CREATE POLICY "Public can view crypto addresses" ON crypto_address
  FOR SELECT USING (true);

-- Policy: Admins and editors can insert crypto addresses for their organizations
CREATE POLICY "Admins and editors can insert crypto addresses" ON crypto_address
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = legal_entity_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can update crypto addresses for their organizations
CREATE POLICY "Admins and editors can update crypto addresses" ON crypto_address
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = crypto_address.legal_entity_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = crypto_address.legal_entity_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can delete crypto addresses for their organizations
CREATE POLICY "Admins and editors can delete crypto addresses" ON crypto_address
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = crypto_address.legal_entity_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Ensure offering_smart_contract_set policies match the same requirements
DROP POLICY IF EXISTS "Public can view offering smart contract sets" ON offering_smart_contract_set;
DROP POLICY IF EXISTS "Admins and editors can insert offering smart contract sets" ON offering_smart_contract_set;
DROP POLICY IF EXISTS "Admins and editors can update offering smart contract sets" ON offering_smart_contract_set;
DROP POLICY IF EXISTS "Admins and editors can delete offering smart contract sets" ON offering_smart_contract_set;

-- Policy: Public can select offering smart contract sets
CREATE POLICY "Public can view offering smart contract sets" ON offering_smart_contract_set
  FOR SELECT USING (true);

-- Policy: Admins and editors can insert offering smart contract sets for their organizations
CREATE POLICY "Admins and editors can insert offering smart contract sets" ON offering_smart_contract_set
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE o.id = offering_smart_contract_set.offering_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can update offering smart contract sets for their organizations
CREATE POLICY "Admins and editors can update offering smart contract sets" ON offering_smart_contract_set
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE o.id = offering_smart_contract_set.offering_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE o.id = offering_smart_contract_set.offering_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can delete offering smart contract sets for their organizations
CREATE POLICY "Admins and editors can delete offering smart contract sets" ON offering_smart_contract_set
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM offering o
      JOIN legal_entity le ON le.id = o.offering_entity_id
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE o.id = offering_smart_contract_set.offering_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policies for smart_contract table
DROP POLICY IF EXISTS "Public can view smart contracts" ON smart_contract;
DROP POLICY IF EXISTS "Admins and editors can insert smart contracts" ON smart_contract;
DROP POLICY IF EXISTS "Admins and editors can update smart contracts" ON smart_contract;
DROP POLICY IF EXISTS "Admins and editors can delete smart contracts" ON smart_contract;

-- Policy: Public can select smart contracts
CREATE POLICY "Public can view smart contracts" ON smart_contract
  FOR SELECT USING (true);

-- Policy: Admins and editors can insert smart contracts for their organizations
CREATE POLICY "Admins and editors can insert smart contracts" ON smart_contract
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = smart_contract.owner_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can update smart contracts for their organizations
CREATE POLICY "Admins and editors can update smart contracts" ON smart_contract
  FOR UPDATE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = smart_contract.owner_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = smart_contract.owner_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );

-- Policy: Admins and editors can delete smart contracts for their organizations
CREATE POLICY "Admins and editors can delete smart contracts" ON smart_contract
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM legal_entity le
      JOIN organization_user ou ON ou.organization_id = le.organization_id
      WHERE le.id = smart_contract.owner_id
        AND ou.user_id = auth.uid()
        AND ('ADMIN' = ANY(ou.permissions) OR 'EDITOR' = ANY(ou.permissions))
    )
  );
