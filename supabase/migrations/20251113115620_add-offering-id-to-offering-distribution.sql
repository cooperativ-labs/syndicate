-- Add offering_id column to offering_distribution table
-- This creates a foreign key relationship to offering.id

ALTER TABLE offering_distribution
  ADD COLUMN offering_id BIGINT REFERENCES offering(id) ON DELETE CASCADE;

-- Create an index on offering_id for better query performance
CREATE INDEX idx_offering_distribution_offering_id ON offering_distribution(offering_id);

