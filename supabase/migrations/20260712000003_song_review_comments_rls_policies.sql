-- ============================================================
-- song_review_comments_table RLS
-- ============================================================
ALTER TABLE song_review_comments_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Everyone can see all comments.
CREATE POLICY "song_review_comments_select"
ON song_review_comments_table FOR SELECT
USING (true);

-- INSERT: Authenticated users may insert their own comments.
CREATE POLICY "song_review_comments_insert_own"
ON song_review_comments_table FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Authenticated users may update their own comments.
CREATE POLICY "song_review_comments_update_own"
ON song_review_comments_table FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: Authenticated users may delete their own comments.
CREATE POLICY "song_review_comments_delete_own"
ON song_review_comments_table FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
