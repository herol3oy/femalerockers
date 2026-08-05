
  create policy "profile_media_delete_active_account"
  on "storage"."objects"
  as restrictive
  for delete
  to authenticated
using (((bucket_id <> ALL (ARRAY['avatars'::text, 'collab-covers'::text])) OR (EXISTS ( SELECT 1
   FROM public.users_table
  WHERE ((users_table.id = ( SELECT auth.uid() AS uid)) AND (users_table.deactivated_at IS NULL))))));



  create policy "profile_media_insert_active_account"
  on "storage"."objects"
  as restrictive
  for insert
  to authenticated
with check (((bucket_id <> ALL (ARRAY['avatars'::text, 'collab-covers'::text])) OR (EXISTS ( SELECT 1
   FROM public.users_table
  WHERE ((users_table.id = ( SELECT auth.uid() AS uid)) AND (users_table.deactivated_at IS NULL))))));



  create policy "profile_media_update_active_account"
  on "storage"."objects"
  as restrictive
  for update
  to authenticated
using (((bucket_id <> ALL (ARRAY['avatars'::text, 'collab-covers'::text])) OR (EXISTS ( SELECT 1
   FROM public.users_table
  WHERE ((users_table.id = ( SELECT auth.uid() AS uid)) AND (users_table.deactivated_at IS NULL))))))
with check (((bucket_id <> ALL (ARRAY['avatars'::text, 'collab-covers'::text])) OR (EXISTS ( SELECT 1
   FROM public.users_table
  WHERE ((users_table.id = ( SELECT auth.uid() AS uid)) AND (users_table.deactivated_at IS NULL))))));



