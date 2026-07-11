-- ============================================================
-- song_review_ratings_table RLS
-- ============================================================
ALTER TABLE song_review_ratings_table ENABLE ROW LEVEL SECURITY;

-- SELECT: Everyone can see all ratings (averages are public).
CREATE POLICY "song_review_ratings_select"
ON song_review_ratings_table FOR SELECT
USING (true);

-- INSERT: Authenticated users may insert their own ratings.
CREATE POLICY "song_review_ratings_insert_own"
ON song_review_ratings_table FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users may update their own ratings.
CREATE POLICY "song_review_ratings_update_own"
ON song_review_ratings_table FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: Users may delete their own ratings.
CREATE POLICY "song_review_ratings_delete_own"
ON song_review_ratings_table FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
