-- ============================================================
-- song_review_likes_table RLS
-- ============================================================
ALTER TABLE song_review_likes_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Everyone can see all likes (counts are public).
CREATE POLICY "song_review_likes_select"
ON song_review_likes_table FOR SELECT
USING (true);

-- INSERT: Authenticated users may insert their own likes.
-- The user_id must match the authenticated user's UID.
CREATE POLICY "song_review_likes_insert_own"
ON song_review_likes_table FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- DELETE: Users may delete their own likes.
CREATE POLICY "song_review_likes_delete_own"
ON song_review_likes_table FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
