-- ============================================================
-- challenge_participations_table RLS
-- status lifecycle: committed → submitted | withdrawn
-- ============================================================
ALTER TABLE challenge_participations_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Submitted entries are public (visible to everyone
-- as the challenge showcase). Users can always see their own
-- participation regardless of status so they can track and
-- manage it. Admins see all entries across all statuses.
CREATE POLICY "participations_select"
ON challenge_participations_table FOR SELECT
USING (
  status = 'submitted'
  OR auth.uid() = user_id
  OR public.is_admin()
);

-- INSERT: Any authenticated user with an account can commit
-- to a challenge — approval is not required. The user_id must
-- match auth.uid() to prevent spoofing.
CREATE POLICY "participations_insert_own"
ON challenge_participations_table FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM users_table WHERE id = auth.uid()
  )
);

-- UPDATE: Users may update their own participation to change
-- status (withdraw → 'withdrawn') or submit their entry
-- (committed → 'submitted', adding video_url/description).
-- Admins may update any participation.
CREATE POLICY "participations_update_own_or_admin"
ON challenge_participations_table FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin());

-- DELETE: Withdrawal is a hard DELETE. Users can delete their
-- own participation row at any time (withdraw from challenge).
-- Admins can delete any participation.
-- Note: if the parent challenge is deleted, this row is
-- also removed automatically via ON DELETE CASCADE.
CREATE POLICY "participations_delete_own_or_admin"
ON challenge_participations_table FOR DELETE
USING (auth.uid() = user_id OR public.is_admin());
