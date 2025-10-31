-- Migration: Merge offering_detail columns into offering
-- Purpose: Add all columns from offering_detail to offering and backfill data

-- 1) Add columns to offering (kept nullable for safe rollout)
ALTER TABLE offering
  ADD COLUMN IF NOT EXISTS custom_onboarding_link TEXT,
  ADD COLUMN IF NOT EXISTS type offering_details_type,
  ADD COLUMN IF NOT EXISTS stage offering_stage,
  ADD COLUMN IF NOT EXISTS investment_currency currency_code,
  ADD COLUMN IF NOT EXISTS unit_name unit_name,
  ADD COLUMN IF NOT EXISTS max_raise BIGINT,
  ADD COLUMN IF NOT EXISTS min_raise BIGINT,
  ADD COLUMN IF NOT EXISTS num_units INTEGER,
  ADD COLUMN IF NOT EXISTS min_units_per_investor INTEGER,
  ADD COLUMN IF NOT EXISTS max_units_per_investor INTEGER,
  ADD COLUMN IF NOT EXISTS price_start INTEGER,
  ADD COLUMN IF NOT EXISTS max_investors INTEGER,
  ADD COLUMN IF NOT EXISTS min_investors INTEGER,
  ADD COLUMN IF NOT EXISTS raise_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS raise_period INTEGER,
  ADD COLUMN IF NOT EXISTS additional_info TEXT,
  ADD COLUMN IF NOT EXISTS distribution_period distribution_period_type,
  ADD COLUMN IF NOT EXISTS distribution_frequency INTEGER;

-- 2) Backfill data from offering_detail into offering where available
UPDATE offering o
SET
  custom_onboarding_link = od.custom_onboarding_link,
  type = od.type,
  stage = od.stage,
  investment_currency = od.investment_currency,
  unit_name = od.unit_name,
  max_raise = od.max_raise,
  min_raise = od.min_raise,
  num_units = od.num_units,
  min_units_per_investor = od.min_units_per_investor,
  max_units_per_investor = od.max_units_per_investor,
  price_start = od.price_start,
  max_investors = od.max_investors,
  min_investors = od.min_investors,
  raise_start = od.raise_start,
  raise_period = od.raise_period,
  additional_info = od.additional_info,
  distribution_period = od.distribution_period,
  distribution_frequency = od.distribution_frequency
FROM offering_detail od
WHERE od.offering_id = o.id;

-- Note:
-- If you later want NOT NULL constraints (e.g., on investment_currency),
-- add them in a follow-up migration after ensuring all rows have values.


