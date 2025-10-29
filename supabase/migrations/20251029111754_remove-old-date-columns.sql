drop index if exists "public"."idx_offering_creation_date";

drop index if exists "public"."idx_profile_creation_date";

alter table "public"."document" drop column "creation_date";

alter table "public"."document" drop column "last_update";

alter table "public"."investor_application" drop column "creation_date";

alter table "public"."investor_application" drop column "last_update";

alter table "public"."legal_entity" drop column "creation_date";

alter table "public"."legal_entity" drop column "last_update";

alter table "public"."offering_description_text" drop column "creation_date";

alter table "public"."offering_description_text" drop column "last_update";

alter table "public"."offering_participant" drop column "creation_date";

alter table "public"."offering_participant" drop column "last_update";

alter table "public"."offering" drop column "creation_date";

alter table "public"."offering" drop column "last_update";

alter table "public"."organization" drop column "last_update";

alter table "public"."profile" drop column "creation_date";

alter table "public"."real_estate_property" drop column "creation_date";

alter table "public"."real_estate_property" drop column "last_update";

alter table "public"."share_order" drop column "creation_date";

alter table "public"."share_order" drop column "last_update";


