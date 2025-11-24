BEGIN;

-- ============================================================================
-- Migration: Change real_estate_property to link to offering instead of legal_entity
-- ============================================================================

-- ============================================================================
-- Step 0: Drop existing RLS policies that reference owner_id
-- ============================================================================
DROP POLICY IF EXISTS "Public can select real estate properties" ON public.real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can insert real estate properties" ON public.real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can update real estate properties" ON public.real_estate_property;
DROP POLICY IF EXISTS "Admins and editors can delete real estate properties" ON public.real_estate_property;

-- Step 1: Drop existing foreign key constraint
ALTER TABLE public.real_estate_property
  DROP CONSTRAINT IF EXISTS real_estate_property_owner_id_fkey;

-- Step 2: Drop existing index on owner_id
DROP INDEX IF EXISTS idx_real_estate_property_owner_id;

-- Step 3: Add new offering_id column (nullable initially for data migration)
ALTER TABLE public.real_estate_property
  ADD COLUMN offering_id BIGINT;

-- Step 4: Migrate existing data
-- For each property, find the offering that owns it via legal_entity
UPDATE public.real_estate_property rep
SET offering_id = (
  SELECT o.id
  FROM public.offering o
  WHERE o.offering_entity_id = rep.owner_id
  LIMIT 1
)
WHERE rep.offering_id IS NULL;

-- Step 5: Drop old owner_id column
ALTER TABLE public.real_estate_property
  DROP COLUMN owner_id;

-- Step 6: Add NOT NULL constraint to offering_id
ALTER TABLE public.real_estate_property
  ALTER COLUMN offering_id SET NOT NULL;

-- Step 7: Add foreign key constraint to offering
ALTER TABLE public.real_estate_property
  ADD CONSTRAINT real_estate_property_offering_id_fkey
  FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE;

-- Step 8: Create new index on offering_id
CREATE INDEX idx_real_estate_property_offering_id ON public.real_estate_property(offering_id);

-- ============================================================================
-- Update RLS Policies
-- ============================================================================

-- Policy 1: Public can select real estate properties
CREATE POLICY "Public can select real estate properties" ON public.real_estate_property
  FOR SELECT
  USING (true);

-- Policy 2: Admins and editors can insert real estate properties
CREATE POLICY "Admins and editors can insert real estate properties" ON public.real_estate_property
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.offering o
      JOIN public.legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = real_estate_property.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

-- Policy 3: Admins and editors can update real estate properties
CREATE POLICY "Admins and editors can update real estate properties" ON public.real_estate_property
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.offering o
      JOIN public.legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = real_estate_property.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.offering o
      JOIN public.legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = real_estate_property.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

-- Policy 4: Admins and editors can delete real estate properties
CREATE POLICY "Admins and editors can delete real estate properties" ON public.real_estate_property
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.offering o
      JOIN public.legal_entity le ON le.id = o.offering_entity_id
      WHERE o.id = real_estate_property.offering_id
        AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())
    )
  );

COMMIT;

