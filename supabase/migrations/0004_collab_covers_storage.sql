INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('collab-covers', 'collab-covers', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload own collab cover"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'collab-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own collab cover"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'collab-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Public collab cover read access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'collab-covers');

CREATE POLICY "Users can delete own collab cover"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'collab-covers' AND (storage.foldername(name))[1] = auth.uid()::text);
