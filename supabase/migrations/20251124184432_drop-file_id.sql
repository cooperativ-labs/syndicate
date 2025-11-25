
drop index if exists "public"."idx_document_file_id";

alter table "public"."document" drop column "file_id";

drop policy "Admins can delete offering documents" on "storage"."objects";

drop policy "Anyone can read offering documents" on "storage"."objects";

drop policy "Editors, managers, and admins can upload offering documents" on "storage"."objects";


