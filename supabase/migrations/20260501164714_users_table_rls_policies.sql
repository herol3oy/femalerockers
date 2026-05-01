-- ============================================================
-- Helper: reusable admin check (SECURITY DEFINER avoids
-- infinite recursion when policies themselves query users_table)
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM users_table
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- users_table RLS
-- ============================================================
ALTER TABLE users_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Approved users are public (discovery, profile pages).
-- A user can always read their own row even before approval
-- (needed for onboarding, profile editing, and role checks).
-- Admins can see every row.
CREATE POLICY "users_select"
ON users_table FOR SELECT
USING (
  is_approved = true
  OR auth.uid() = id
  OR public.is_admin()
);

-- INSERT: A newly authenticated user inserts their own row
-- during onboarding. The id must match auth.uid() to prevent
-- anyone creating a row on behalf of someone else.
CREATE POLICY "users_insert_own"
ON users_table FOR INSERT
WITH CHECK (auth.uid() = id);

-- UPDATE: Users may update their own profile fields.
-- Admins may update any row (e.g. toggling is_approved, role).
-- Note: role/is_approved changes are enforced at the app layer
-- (server actions) and never exposed to the client.
CREATE POLICY "users_update_own_or_admin"
ON users_table FOR UPDATE
USING (auth.uid() = id OR public.is_admin());

-- DELETE: Users can delete their own account (account closure).
-- Admins can delete any user row.
CREATE POLICY "users_delete_own_or_admin"
ON users_table FOR DELETE
USING (auth.uid() = id OR public.is_admin());
