-- ============================================================
-- collaborations_table RLS
-- status lifecycle: pending → approved | rejected
-- ============================================================
ALTER TABLE collaborations_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Approved collabs are public (visible on the collab
-- showcase page). A user can always see their own submissions
-- regardless of status (pending, rejected) so they can track
-- progress. Admins see everything including rejected/pending
-- for moderation.
CREATE POLICY "collabs_select"
ON collaborations_table FOR SELECT
USING (
  status = 'approved'
  OR auth.uid() = user_id
  OR public.is_admin()
);

-- INSERT: Only approved users (is_approved = true) may submit
-- a collaboration. The user_id must equal auth.uid() to
-- prevent submitting on behalf of someone else.
-- The app layer also enforces this, but we double-check here.
CREATE POLICY "collabs_insert_own_approved"
ON collaborations_table FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM users_table
    WHERE id = auth.uid() AND is_approved = true
  )
);

-- UPDATE: Users may only edit their own collab while it is
-- still 'pending' (before admin review). Once approved or
-- rejected, the row is locked for the user.
-- Admins may update any collab regardless of status
-- (approve/reject workflow, setting admin_notes).
CREATE POLICY "collabs_update_own_pending_or_admin"
ON collaborations_table FOR UPDATE
USING (
  (auth.uid() = user_id AND status = 'pending')
  OR public.is_admin()
);

-- DELETE: Only admins can hard-delete a collaboration row.
-- Users withdraw via the collab status flow, not hard deletion.
CREATE POLICY "collabs_delete_admin"
ON collaborations_table FOR DELETE
USING (public.is_admin());
