-- Add foreign key from organization_user.user_id to profile.id
-- This allows PostgREST to automatically join profile data when querying organization_user
ALTER TABLE organization_user
ADD CONSTRAINT organization_user_user_id_profile_fk
FOREIGN KEY (user_id) REFERENCES profile(id) ON DELETE CASCADE;

