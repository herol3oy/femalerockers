-- ============================================================
-- waitlist_invitations RLS
-- All access is admin-only. App reads/writes go through
-- server actions using Drizzle (service role, bypasses RLS).
-- Policies act as a safety net against direct client access.
-- ============================================================
ALTER TABLE waitlist_invitations ENABLE ROW LEVEL SECURITY;

-- SELECT: Only admins can view invitation records.
CREATE POLICY "waitlist_invitations_select_admin"
ON waitlist_invitations FOR SELECT
USING (public.is_admin());

-- INSERT: Only admins can create invitations (bulk invite).
-- Referral inserts also run server-side via Drizzle service role.
CREATE POLICY "waitlist_invitations_insert_admin"
ON waitlist_invitations FOR INSERT
WITH CHECK (public.is_admin());

-- UPDATE: Only admins can update invitation status.
-- Confirmations run server-side via Drizzle service role.
CREATE POLICY "waitlist_invitations_update_admin"
ON waitlist_invitations FOR UPDATE
USING (public.is_admin());

-- DELETE: Only admins can delete invitations.
CREATE POLICY "waitlist_invitations_delete_admin"
ON waitlist_invitations FOR DELETE
USING (public.is_admin());

-- ============================================================
-- waitlist_entries RLS
-- Same admin-only pattern. Entries are created server-side
-- when a user confirms their invitation.
-- ============================================================
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- SELECT: Only admins can view waitlist entries.
CREATE POLICY "waitlist_entries_select_admin"
ON waitlist_entries FOR SELECT
USING (public.is_admin());

-- INSERT: Only admins can insert entries.
-- Confirmation inserts run server-side via Drizzle service role.
CREATE POLICY "waitlist_entries_insert_admin"
ON waitlist_entries FOR INSERT
WITH CHECK (public.is_admin());

-- UPDATE: Only admins can update entries.
CREATE POLICY "waitlist_entries_update_admin"
ON waitlist_entries FOR UPDATE
USING (public.is_admin());

-- DELETE: Only admins can delete entries.
CREATE POLICY "waitlist_entries_delete_admin"
ON waitlist_entries FOR DELETE
USING (public.is_admin());
