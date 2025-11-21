-- Create storage buckets for organization, offering, and entity assets
-- These buckets are public (readable by everyone) but RLS policies control write access

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('organization-assets', 'organization-assets', true),
  ('offering-assets', 'offering-assets', true),
  ('entity-assets', 'entity-assets', true)
ON CONFLICT (id) DO NOTHING;

