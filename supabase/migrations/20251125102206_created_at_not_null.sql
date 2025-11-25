alter table "public"."address" alter column "created_at" set not null;

alter table "public"."crypto_address" alter column "created_at" set not null;

alter table "public"."document" alter column "created_at" set not null;

alter table "public"."document_signatory" alter column "created_at" set not null;

alter table "public"."share_order" alter column "created_at" set not null;

alter table "public"."email_address" alter column "created_at" set not null;

alter table "public"."investor_application" alter column "created_at" set not null;

alter table "public"."jurisdiction" alter column "created_at" set not null;

alter table "public"."legal_entity" alter column "created_at" set not null;

alter table "public"."legal_entity_relationship" alter column "created_at" set not null;

alter table "public"."linked_account" alter column "created_at" set not null;

alter table "public"."notification_configuration" alter column "created_at" set not null;

alter table "public"."offering" alter column "created_at" set not null;

alter table "public"."offering_description_text" alter column "created_at" set not null;

alter table "public"."offering_distribution" alter column "created_at" set not null;

alter table "public"."offering_participant" alter column "created_at" set not null;

alter table "public"."offering_smart_contract_set" alter column "created_at" set not null;

alter table "public"."organization" alter column "created_at" set not null;

alter table "public"."organization_user" alter column "created_at" set not null;

alter table "public"."profile" alter column "created_at" set not null;

alter table "public"."real_estate_property" alter column "created_at" set not null;

alter table "public"."real_estate_property_image" alter column "created_at" set not null;

alter table "public"."share_transfer_event" alter column "created_at" set not null;

alter table "public"."smart_contract" alter column "created_at" set not null;

alter table "public"."whitelist_transaction" alter column "created_at" set not null;


