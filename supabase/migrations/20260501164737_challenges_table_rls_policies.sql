-- ============================================================
-- challenges_table RLS
-- Challenges are admin-created, publicly visible events.
-- ============================================================
ALTER TABLE challenges_table ENABLE ROW LEVEL SECURITY;

-- SELECT: All challenges are fully public — any visitor
-- (authenticated or not) can browse current and past challenges.
CREATE POLICY "challenges_select_public"
ON challenges_table FOR SELECT
USING (true);

-- INSERT: Only admins can create new challenges.
-- The app enforces this in createChallenge() server action,
-- but we enforce it at DB level too.
CREATE POLICY "challenges_insert_admin"
ON challenges_table FOR INSERT
WITH CHECK (public.is_admin());

-- UPDATE: Only admins can edit challenge details
-- (title, description, ends_at, slug).
CREATE POLICY "challenges_update_admin"
ON challenges_table FOR UPDATE
USING (public.is_admin());

-- DELETE: Only admins can delete a challenge.
-- Deleting a challenge cascades to challenge_participations_table
-- (ON DELETE CASCADE), removing all related participations.
CREATE POLICY "challenges_delete_admin"
ON challenges_table FOR DELETE
USING (public.is_admin());
