create type "public"."asset_status" as enum ('IDENTIFIED', 'IN_NEGOTIATION', 'DUE_DILIGENCE', 'UNDER_CONTRACT', 'CLOSED', 'FOR_SALE');

create type "public"."crypto_address_protocol" as enum ('ETH', 'BTC', 'ADA', 'ALGO');

create type "public"."crypto_address_type" as enum ('WALLET', 'CONTRACT');

create type "public"."currency_code" as enum ('CC', 'USD', 'KYD', 'AUD', 'CAD', 'EUR', 'GBP', 'BTC', 'ETH', 'ADA', 'MATIC', 'USDC', 'ALGO_USDC', 'PoS_USDC', 'DAI', 'PoS_DAI', 'USDC_TEST_', 'DAI_TEST_', 'ALGO_USDC_TEST_', 'USDC_MATIC_TEST_', 'DAI_MATIC_TEST_', 'REAL_SHARE');

create type "public"."distribution_period_type" as enum ('DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR', 'UNSPECIFIED', 'DESCRIBED', 'NONE');

create type "public"."document_access_type" as enum ('OWNER', 'SIGNATORY', 'TOKEN', 'PUBLIC');

create type "public"."document_format" as enum ('GOOGLE_DRIVE', 'GOOGLE_DOC', 'GOOGLE_SHEET', 'GOOGLE_SLIDE', 'WORD_DOC', 'EXCEL', 'POWERPOINT', 'PDF', 'NOTION', 'GITHUB', 'MARKDOWN', 'VIDEO', 'OTHER');

create type "public"."document_type" as enum ('GENERAL', 'SHARE_LINK', 'PPM', 'OPERATING_AGREEMENT', 'DISCLOSURE', 'REG_FILING', 'FINANCIAL_STATEMENT', 'AGREEMENT', 'OTHER', 'OFFERING_DOCUMENT');

create type "public"."legal_entity_type" as enum ('INDIVIDUAL', 'CORPORATION', 'LLC', 'UNINCORPORATED_ASSOCIATION');

create type "public"."linked_account_type" as enum ('LINKEDIN', 'FACEBOOK', 'TWITTER', 'INSTAGRAM', 'DISCORD', 'TELEGRAM', 'MEDIUM', 'MIRROR', 'SUBSTACK', 'YOUTUBE', 'SOUNDCLOUD', 'DRIBBBLE', 'GITHUB', 'EMAIL', 'PHONE', 'WEBSITE', 'OTHER');

create type "public"."notification_method" as enum ('EMAIL');

create type "public"."notification_recipient_type" as enum ('MANAGER', 'PARTICIPANT');

create type "public"."notification_subject" as enum ('TRANSACTION_REQUEST', 'OFFERING_DISTRIBUTION', 'TRADE_EXECUTION', 'WHITELIST_APPROVAL', 'PROCEEDS_CLAIM', 'NEW_ORDER_LIVE');

create type "public"."offering_stage" as enum ('IDENTIFIED', 'IN_NEGOTIATION', 'DUE_DILIGENCE', 'SALE', 'LOCKED', 'CLOSED');

create type "public"."offering_tab_section" as enum ('DETAILS', 'FINANCIALS', 'TERMS', 'OFFEROR_INFO', 'DISCLOSURES');

create type "public"."offering_type" as enum ('CRYPTO', 'PRIVATE_EQUITY', 'REAL_ESTATE', 'VENTURE_CAPITAL', 'OTHER');

create type "public"."organization_permission_type" as enum ('ADMIN', 'EDITOR', 'VIEWER', 'AUDITOR');

create type "public"."organization_user_role" as enum ('BOARD_MEMBER', 'PARTNER', 'TEAM', 'INVESTOR', 'ADVISOR', 'SUPPORTER');

create type "public"."real_estate_property_type" as enum ('SINGLE_FAMILY', 'MULTI_FAMILY', 'COMMERCIAL', 'LAND_ONLY', 'SELF_STORAGE');

create type "public"."share_transfer_event_type" as enum ('ISSUANCE', 'TRADE', 'FORCED', 'TRANSFER', 'DISAPPROVAL', 'APPROVAL');

create type "public"."smart_contract_type" as enum ('C2', 'C3', 'ERC1410', 'ERC20', 'SWAP', 'DISTRIBUTION', 'OTHER');

create type "public"."unit_name" as enum ('SHARE', 'TOKEN', 'UNIT', 'MEMBERSHIP_INTEREST');

create type "public"."whitelist_transaction_type" as enum ('ADD', 'REMOVE');


  create table "public"."address" (
    "id" uuid not null default gen_random_uuid(),
    "legal_entity_id" bigint not null,
    "label" text,
    "line1" text,
    "line2" text,
    "line3" text,
    "city" text,
    "state_province" text,
    "postal_code" text,
    "country" text not null,
    "lat" numeric(10,8),
    "lng" numeric(11,8),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."address" enable row level security;


  create table "public"."crypto_address" (
    "id" uuid not null default gen_random_uuid(),
    "legal_entity_id" bigint not null,
    "name" text,
    "address" text not null,
    "description" text,
    "protocol" public.crypto_address_protocol,
    "chain_id" integer,
    "type" public.crypto_address_type,
    "is_public" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."crypto_address" enable row level security;


  create table "public"."document" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "text" text,
    "date" timestamp with time zone,
    "format" public.document_format,
    "type" public.document_type,
    "url" text,
    "file_id" text,
    "thumbnail_image" text,
    "owner_id" bigint not null,
    "smart_contract_id" uuid,
    "access" public.document_access_type,
    "offering_id" bigint,
    "offering_unique_id" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."document" enable row level security;


  create table "public"."document_signatory" (
    "id" uuid not null default gen_random_uuid(),
    "document_id" uuid not null,
    "legal_entity_id" bigint,
    "signer_address" text,
    "signature" text,
    "date" timestamp with time zone,
    "archived" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."document_signatory" enable row level security;


  create table "public"."email_address" (
    "id" uuid not null default gen_random_uuid(),
    "organization_id" bigint not null,
    "address" text not null,
    "name" text,
    "description" text,
    "is_public" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."email_address" enable row level security;


  create table "public"."investor_application" (
    "id" uuid not null default gen_random_uuid(),
    "offering_participant_id" uuid not null,
    "application_doc_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."investor_application" enable row level security;


  create table "public"."jurisdiction" (
    "id" uuid not null default gen_random_uuid(),
    "country" text not null,
    "province" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."jurisdiction" enable row level security;


  create table "public"."legal_entity" (
    "id" bigint generated always as identity not null,
    "organization_id" bigint not null,
    "display_name" text,
    "legal_name" text,
    "type" public.legal_entity_type not null,
    "tax_id" text,
    "purpose" text,
    "jurisdiction_id" uuid,
    "operating_currency" public.currency_code,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."legal_entity" enable row level security;


  create table "public"."legal_entity_relationship" (
    "id" uuid not null default gen_random_uuid(),
    "parent_entity_id" bigint not null,
    "child_entity_id" bigint not null,
    "relationship_type" text not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."legal_entity_relationship" enable row level security;


  create table "public"."linked_account" (
    "id" uuid not null default gen_random_uuid(),
    "organization_id" bigint not null,
    "account_provided_id" text,
    "username" text,
    "url" text not null,
    "type" public.linked_account_type,
    "verified" boolean default false,
    "hidden" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."linked_account" enable row level security;


  create table "public"."notification_configuration" (
    "id" uuid not null default gen_random_uuid(),
    "notification_recipient_type" public.notification_recipient_type not null,
    "notification_method" public.notification_method not null,
    "notification_subject" public.notification_subject not null,
    "organization_user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."notification_configuration" enable row level security;


  create table "public"."offering" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "image" text,
    "banner_image" text,
    "primary_video" text,
    "sharing_image" text,
    "brand_color" text,
    "light_brand" boolean default false,
    "website" text,
    "short_description" text,
    "offering_entity_id" bigint not null,
    "is_public" boolean default false,
    "waitlist_on" boolean default false,
    "access_code" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "custom_onboarding_link" text,
    "type" public.offering_type,
    "stage" public.offering_stage,
    "investment_currency" public.currency_code,
    "unit_name" public.unit_name,
    "max_raise" bigint,
    "min_raise" bigint,
    "num_units" integer,
    "min_units_per_investor" integer,
    "max_units_per_investor" integer,
    "price_start" integer,
    "max_investors" integer,
    "min_investors" integer,
    "raise_start" timestamp with time zone,
    "raise_period" integer,
    "additional_info" text,
    "distribution_period" public.distribution_period_type,
    "distribution_frequency" integer,
    "distribution_currency" public.currency_code,
    "distribution_description" text,
    "admin_expense" integer,
    "projected_irr" integer,
    "projected_irr_max" integer,
    "preferred_return" integer,
    "target_equity_multiple" integer,
    "target_equity_multiple_max" integer,
    "coc_return" integer,
    "projected_appreciation" integer,
    "cap_rate" integer
      );


alter table "public"."offering" enable row level security;


  create table "public"."offering_description_text" (
    "id" uuid not null default gen_random_uuid(),
    "section" public.offering_tab_section not null,
    "title" text not null,
    "text" text not null,
    "order" integer not null,
    "offering_id" bigint not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."offering_description_text" enable row level security;


  create table "public"."offering_distribution" (
    "id" uuid not null default gen_random_uuid(),
    "contract_index" integer not null,
    "transaction_hash" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "offering_id" bigint
      );


alter table "public"."offering_distribution" enable row level security;


  create table "public"."offering_participant" (
    "id" uuid not null default gen_random_uuid(),
    "address_offering_id" text not null,
    "wallet_address" text not null,
    "email_address" text,
    "chain_id" integer not null,
    "name" text,
    "offering_id" bigint not null,
    "min_pledge" integer,
    "max_pledge" integer,
    "jurisdiction_id" uuid,
    "paid" boolean default false,
    "external_id" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."offering_participant" enable row level security;


  create table "public"."offering_smart_contract_set" (
    "id" uuid not null default gen_random_uuid(),
    "offering_id" bigint not null,
    "share_contract_id" uuid,
    "swap_contract_id" uuid,
    "distribution_contract_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."offering_smart_contract_set" enable row level security;


  create table "public"."organization" (
    "id" bigint generated always as identity not null,
    "name" text,
    "logo" text,
    "slug" text,
    "banner_image" text,
    "brand_color" text,
    "short_description" text,
    "description" text,
    "is_public" boolean default false,
    "phone" text,
    "country" text,
    "website" text,
    "creation_date" timestamp with time zone default now(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."organization" enable row level security;


  create table "public"."organization_user" (
    "id" uuid not null default gen_random_uuid(),
    "organization_id" bigint not null,
    "user_id" uuid not null,
    "permissions" public.organization_permission_type[] default '{}'::public.organization_permission_type[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "account_email" text
      );


alter table "public"."organization_user" enable row level security;


  create table "public"."profile" (
    "id" uuid not null,
    "name" text,
    "image" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."profile" enable row level security;


  create table "public"."real_estate_property" (
    "id" uuid not null default gen_random_uuid(),
    "property_type" public.real_estate_property_type not null,
    "investment_status" public.asset_status,
    "address_id" uuid,
    "amenities_description" text,
    "description" text,
    "loan" integer,
    "down_payment" integer,
    "asset_value" integer,
    "asset_value_note" text,
    "lender_fees" integer,
    "closing_costs" integer,
    "owner_id" bigint not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."real_estate_property" enable row level security;


  create table "public"."real_estate_property_image" (
    "id" uuid not null default gen_random_uuid(),
    "property_id" uuid not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."real_estate_property_image" enable row level security;


  create table "public"."share_order" (
    "id" uuid not null default gen_random_uuid(),
    "min_units" integer,
    "max_units" integer,
    "visible" boolean default true,
    "swap_contract_address" text not null,
    "initiator" text not null,
    "contract_index" integer not null,
    "transaction_hash" text not null,
    "archived" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."share_order" enable row level security;


  create table "public"."share_transfer_event" (
    "id" uuid not null default gen_random_uuid(),
    "share_contract_address" text not null,
    "order_index" integer,
    "recipient_address" text not null,
    "sender_address" text not null,
    "amount" integer not null,
    "price" text,
    "currency_code" public.currency_code,
    "partition" text not null,
    "transaction_hash" text not null,
    "type" public.share_transfer_event_type not null,
    "archived" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."share_transfer_event" enable row level security;


  create table "public"."smart_contract" (
    "id" uuid not null default gen_random_uuid(),
    "crypto_address_id" uuid not null,
    "type" public.smart_contract_type not null,
    "sub_type" text,
    "num_tokens_authorized" bigint,
    "backing_token" public.currency_code,
    "owner_id" bigint not null,
    "name" text,
    "document_id" uuid,
    "established" boolean default false,
    "partitions" text[],
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."smart_contract" enable row level security;


  create table "public"."whitelist_transaction" (
    "transaction_hash" text not null,
    "offering_participant_id" uuid not null,
    "type" public.whitelist_transaction_type not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."whitelist_transaction" enable row level security;

CREATE UNIQUE INDEX address_pkey ON public.address USING btree (id);

CREATE UNIQUE INDEX crypto_address_address_key ON public.crypto_address USING btree (address);

CREATE UNIQUE INDEX crypto_address_pkey ON public.crypto_address USING btree (id);

CREATE UNIQUE INDEX document_offering_unique_id_key ON public.document USING btree (offering_unique_id);

CREATE UNIQUE INDEX document_pkey ON public.document USING btree (id);

CREATE UNIQUE INDEX document_signatory_pkey ON public.document_signatory USING btree (id);

CREATE UNIQUE INDEX email_address_address_key ON public.email_address USING btree (address);

CREATE UNIQUE INDEX email_address_pkey ON public.email_address USING btree (id);

CREATE INDEX idx_address_city ON public.address USING btree (city);

CREATE INDEX idx_address_country ON public.address USING btree (country);

CREATE INDEX idx_address_legal_entity_id ON public.address USING btree (legal_entity_id);

CREATE INDEX idx_crypto_address_address ON public.crypto_address USING btree (address);

CREATE INDEX idx_crypto_address_is_public ON public.crypto_address USING btree (is_public);

CREATE INDEX idx_crypto_address_legal_entity_id ON public.crypto_address USING btree (legal_entity_id);

CREATE INDEX idx_crypto_address_protocol ON public.crypto_address USING btree (protocol);

CREATE INDEX idx_crypto_address_type ON public.crypto_address USING btree (type);

CREATE INDEX idx_document_file_id ON public.document USING btree (file_id);

CREATE INDEX idx_document_format ON public.document USING btree (format);

CREATE INDEX idx_document_offering_id ON public.document USING btree (offering_id);

CREATE INDEX idx_document_offering_unique_id ON public.document USING btree (offering_unique_id);

CREATE INDEX idx_document_owner_id ON public.document USING btree (owner_id);

CREATE INDEX idx_document_signatory_document_id ON public.document_signatory USING btree (document_id);

CREATE INDEX idx_document_signatory_legal_entity_id ON public.document_signatory USING btree (legal_entity_id);

CREATE INDEX idx_document_type ON public.document USING btree (type);

CREATE INDEX idx_email_address_address ON public.email_address USING btree (address);

CREATE INDEX idx_email_address_is_public ON public.email_address USING btree (is_public);

CREATE INDEX idx_email_address_org_id ON public.email_address USING btree (organization_id);

CREATE INDEX idx_investor_application_application_doc_id ON public.investor_application USING btree (application_doc_id);

CREATE INDEX idx_investor_application_offering_participant_id ON public.investor_application USING btree (offering_participant_id);

CREATE INDEX idx_legal_entity_display_name_gin ON public.legal_entity USING gin (to_tsvector('english'::regconfig, display_name));

CREATE INDEX idx_legal_entity_legal_name_gin ON public.legal_entity USING gin (to_tsvector('english'::regconfig, legal_name));

CREATE INDEX idx_legal_entity_org_id ON public.legal_entity USING btree (organization_id);

CREATE INDEX idx_legal_entity_type ON public.legal_entity USING btree (type);

CREATE INDEX idx_linked_account_org_id ON public.linked_account USING btree (organization_id);

CREATE INDEX idx_linked_account_type ON public.linked_account USING btree (type);

CREATE INDEX idx_linked_account_username ON public.linked_account USING btree (username);

CREATE INDEX idx_offering_description_text_offering_id ON public.offering_description_text USING btree (offering_id);

CREATE INDEX idx_offering_description_text_order ON public.offering_description_text USING btree ("order");

CREATE INDEX idx_offering_description_text_section ON public.offering_description_text USING btree (section);

CREATE INDEX idx_offering_distribution_offering_id ON public.offering_distribution USING btree (offering_id);

CREATE INDEX idx_offering_is_public ON public.offering USING btree (is_public);

CREATE INDEX idx_offering_name_gin ON public.offering USING gin (to_tsvector('english'::regconfig, name));

CREATE INDEX idx_offering_offering_entity_id ON public.offering USING btree (offering_entity_id);

CREATE INDEX idx_offering_participant_address_offering_id ON public.offering_participant USING btree (address_offering_id);

CREATE INDEX idx_offering_participant_email_address ON public.offering_participant USING btree (email_address);

CREATE INDEX idx_offering_participant_offering_id ON public.offering_participant USING btree (offering_id);

CREATE INDEX idx_offering_participant_wallet_address_gin ON public.offering_participant USING gin (to_tsvector('english'::regconfig, wallet_address));

CREATE INDEX idx_offering_smart_contract_set_offering_id ON public.offering_smart_contract_set USING btree (offering_id);

CREATE INDEX idx_offering_stage ON public.offering USING btree (stage);

CREATE INDEX idx_offering_type ON public.offering USING btree (type);

CREATE INDEX idx_organization_is_public ON public.organization USING btree (is_public);

CREATE INDEX idx_organization_name_gin ON public.organization USING gin (to_tsvector('english'::regconfig, name));

CREATE INDEX idx_organization_slug ON public.organization USING btree (slug);

CREATE INDEX idx_organization_user_org_id ON public.organization_user USING btree (organization_id);

CREATE INDEX idx_organization_user_permissions ON public.organization_user USING gin (permissions);

CREATE INDEX idx_organization_user_user_id ON public.organization_user USING btree (user_id);

CREATE INDEX idx_real_estate_property_investment_status ON public.real_estate_property USING btree (investment_status);

CREATE INDEX idx_real_estate_property_owner_id ON public.real_estate_property USING btree (owner_id);

CREATE INDEX idx_real_estate_property_property_type ON public.real_estate_property USING btree (property_type);

CREATE INDEX idx_share_order_initiator ON public.share_order USING btree (initiator);

CREATE INDEX idx_share_order_swap_contract_address ON public.share_order USING btree (swap_contract_address);

CREATE INDEX idx_share_order_visible ON public.share_order USING btree (visible);

CREATE INDEX idx_share_transfer_event_partition ON public.share_transfer_event USING btree (partition);

CREATE INDEX idx_share_transfer_event_recipient_address ON public.share_transfer_event USING btree (recipient_address);

CREATE INDEX idx_share_transfer_event_sender_address ON public.share_transfer_event USING btree (sender_address);

CREATE INDEX idx_share_transfer_event_share_contract_address ON public.share_transfer_event USING btree (share_contract_address);

CREATE INDEX idx_share_transfer_event_type ON public.share_transfer_event USING btree (type);

CREATE INDEX idx_smart_contract_crypto_address_id ON public.smart_contract USING btree (crypto_address_id);

CREATE INDEX idx_smart_contract_owner_id ON public.smart_contract USING btree (owner_id);

CREATE INDEX idx_smart_contract_type ON public.smart_contract USING btree (type);

CREATE INDEX idx_whitelist_transaction_offering_participant_id ON public.whitelist_transaction USING btree (offering_participant_id);

CREATE INDEX idx_whitelist_transaction_type ON public.whitelist_transaction USING btree (type);

CREATE UNIQUE INDEX investor_application_pkey ON public.investor_application USING btree (id);

CREATE UNIQUE INDEX jurisdiction_pkey ON public.jurisdiction USING btree (id);

CREATE UNIQUE INDEX legal_entity_pkey ON public.legal_entity USING btree (id);

CREATE UNIQUE INDEX legal_entity_relationship_parent_entity_id_child_entity_id__key ON public.legal_entity_relationship USING btree (parent_entity_id, child_entity_id, relationship_type);

CREATE UNIQUE INDEX legal_entity_relationship_pkey ON public.legal_entity_relationship USING btree (id);

CREATE UNIQUE INDEX linked_account_pkey ON public.linked_account USING btree (id);

CREATE UNIQUE INDEX notification_configuration_pkey ON public.notification_configuration USING btree (id);

CREATE UNIQUE INDEX offering_description_text_pkey ON public.offering_description_text USING btree (id);

CREATE UNIQUE INDEX offering_distribution_pkey ON public.offering_distribution USING btree (id);

CREATE UNIQUE INDEX offering_participant_address_offering_id_key ON public.offering_participant USING btree (address_offering_id);

CREATE UNIQUE INDEX offering_participant_pkey ON public.offering_participant USING btree (id);

CREATE UNIQUE INDEX offering_pkey ON public.offering USING btree (id);

CREATE UNIQUE INDEX offering_smart_contract_set_pkey ON public.offering_smart_contract_set USING btree (id);

CREATE UNIQUE INDEX organization_pkey ON public.organization USING btree (id);

CREATE UNIQUE INDEX organization_slug_key ON public.organization USING btree (slug);

CREATE UNIQUE INDEX organization_user_organization_id_user_id_key ON public.organization_user USING btree (organization_id, user_id);

CREATE UNIQUE INDEX organization_user_pkey ON public.organization_user USING btree (id);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

CREATE UNIQUE INDEX real_estate_property_image_pkey ON public.real_estate_property_image USING btree (id);

CREATE UNIQUE INDEX real_estate_property_image_property_id_key ON public.real_estate_property_image USING btree (property_id);

CREATE UNIQUE INDEX real_estate_property_pkey ON public.real_estate_property USING btree (id);

CREATE UNIQUE INDEX share_order_pkey ON public.share_order USING btree (id);

CREATE UNIQUE INDEX share_transfer_event_pkey ON public.share_transfer_event USING btree (id);

CREATE UNIQUE INDEX smart_contract_pkey ON public.smart_contract USING btree (id);

CREATE UNIQUE INDEX whitelist_transaction_pkey ON public.whitelist_transaction USING btree (transaction_hash);

alter table "public"."address" add constraint "address_pkey" PRIMARY KEY using index "address_pkey";

alter table "public"."crypto_address" add constraint "crypto_address_pkey" PRIMARY KEY using index "crypto_address_pkey";

alter table "public"."document" add constraint "document_pkey" PRIMARY KEY using index "document_pkey";

alter table "public"."document_signatory" add constraint "document_signatory_pkey" PRIMARY KEY using index "document_signatory_pkey";

alter table "public"."email_address" add constraint "email_address_pkey" PRIMARY KEY using index "email_address_pkey";

alter table "public"."investor_application" add constraint "investor_application_pkey" PRIMARY KEY using index "investor_application_pkey";

alter table "public"."jurisdiction" add constraint "jurisdiction_pkey" PRIMARY KEY using index "jurisdiction_pkey";

alter table "public"."legal_entity" add constraint "legal_entity_pkey" PRIMARY KEY using index "legal_entity_pkey";

alter table "public"."legal_entity_relationship" add constraint "legal_entity_relationship_pkey" PRIMARY KEY using index "legal_entity_relationship_pkey";

alter table "public"."linked_account" add constraint "linked_account_pkey" PRIMARY KEY using index "linked_account_pkey";

alter table "public"."notification_configuration" add constraint "notification_configuration_pkey" PRIMARY KEY using index "notification_configuration_pkey";

alter table "public"."offering" add constraint "offering_pkey" PRIMARY KEY using index "offering_pkey";

alter table "public"."offering_description_text" add constraint "offering_description_text_pkey" PRIMARY KEY using index "offering_description_text_pkey";

alter table "public"."offering_distribution" add constraint "offering_distribution_pkey" PRIMARY KEY using index "offering_distribution_pkey";

alter table "public"."offering_participant" add constraint "offering_participant_pkey" PRIMARY KEY using index "offering_participant_pkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_pkey" PRIMARY KEY using index "offering_smart_contract_set_pkey";

alter table "public"."organization" add constraint "organization_pkey" PRIMARY KEY using index "organization_pkey";

alter table "public"."organization_user" add constraint "organization_user_pkey" PRIMARY KEY using index "organization_user_pkey";

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."real_estate_property" add constraint "real_estate_property_pkey" PRIMARY KEY using index "real_estate_property_pkey";

alter table "public"."real_estate_property_image" add constraint "real_estate_property_image_pkey" PRIMARY KEY using index "real_estate_property_image_pkey";

alter table "public"."share_order" add constraint "share_order_pkey" PRIMARY KEY using index "share_order_pkey";

alter table "public"."share_transfer_event" add constraint "share_transfer_event_pkey" PRIMARY KEY using index "share_transfer_event_pkey";

alter table "public"."smart_contract" add constraint "smart_contract_pkey" PRIMARY KEY using index "smart_contract_pkey";

alter table "public"."whitelist_transaction" add constraint "whitelist_transaction_pkey" PRIMARY KEY using index "whitelist_transaction_pkey";

alter table "public"."address" add constraint "address_legal_entity_id_fkey" FOREIGN KEY (legal_entity_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."address" validate constraint "address_legal_entity_id_fkey";

alter table "public"."crypto_address" add constraint "crypto_address_address_key" UNIQUE using index "crypto_address_address_key";

alter table "public"."crypto_address" add constraint "crypto_address_legal_entity_id_fkey" FOREIGN KEY (legal_entity_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."crypto_address" validate constraint "crypto_address_legal_entity_id_fkey";

alter table "public"."document" add constraint "document_offering_id_fkey" FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE not valid;

alter table "public"."document" validate constraint "document_offering_id_fkey";

alter table "public"."document" add constraint "document_offering_unique_id_key" UNIQUE using index "document_offering_unique_id_key";

alter table "public"."document" add constraint "document_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."document" validate constraint "document_owner_id_fkey";

alter table "public"."document_signatory" add constraint "document_signatory_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public.document(id) ON DELETE CASCADE not valid;

alter table "public"."document_signatory" validate constraint "document_signatory_document_id_fkey";

alter table "public"."document_signatory" add constraint "document_signatory_legal_entity_id_fkey" FOREIGN KEY (legal_entity_id) REFERENCES public.legal_entity(id) ON DELETE SET NULL not valid;

alter table "public"."document_signatory" validate constraint "document_signatory_legal_entity_id_fkey";

alter table "public"."email_address" add constraint "email_address_address_key" UNIQUE using index "email_address_address_key";

alter table "public"."email_address" add constraint "email_address_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON DELETE CASCADE not valid;

alter table "public"."email_address" validate constraint "email_address_organization_id_fkey";

alter table "public"."investor_application" add constraint "investor_application_application_doc_id_fkey" FOREIGN KEY (application_doc_id) REFERENCES public.document(id) ON DELETE CASCADE not valid;

alter table "public"."investor_application" validate constraint "investor_application_application_doc_id_fkey";

alter table "public"."investor_application" add constraint "investor_application_offering_participant_id_fkey" FOREIGN KEY (offering_participant_id) REFERENCES public.offering_participant(id) ON DELETE CASCADE not valid;

alter table "public"."investor_application" validate constraint "investor_application_offering_participant_id_fkey";

alter table "public"."legal_entity" add constraint "legal_entity_jurisdiction_id_fkey" FOREIGN KEY (jurisdiction_id) REFERENCES public.jurisdiction(id) not valid;

alter table "public"."legal_entity" validate constraint "legal_entity_jurisdiction_id_fkey";

alter table "public"."legal_entity" add constraint "legal_entity_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON DELETE CASCADE not valid;

alter table "public"."legal_entity" validate constraint "legal_entity_organization_id_fkey";

alter table "public"."legal_entity_relationship" add constraint "legal_entity_relationship_child_entity_id_fkey" FOREIGN KEY (child_entity_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."legal_entity_relationship" validate constraint "legal_entity_relationship_child_entity_id_fkey";

alter table "public"."legal_entity_relationship" add constraint "legal_entity_relationship_parent_entity_id_child_entity_id__key" UNIQUE using index "legal_entity_relationship_parent_entity_id_child_entity_id__key";

alter table "public"."legal_entity_relationship" add constraint "legal_entity_relationship_parent_entity_id_fkey" FOREIGN KEY (parent_entity_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."legal_entity_relationship" validate constraint "legal_entity_relationship_parent_entity_id_fkey";

alter table "public"."legal_entity_relationship" add constraint "legal_entity_relationship_relationship_type_check" CHECK ((relationship_type = ANY (ARRAY['owner'::text, 'subsidiary'::text]))) not valid;

alter table "public"."legal_entity_relationship" validate constraint "legal_entity_relationship_relationship_type_check";

alter table "public"."linked_account" add constraint "linked_account_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON DELETE CASCADE not valid;

alter table "public"."linked_account" validate constraint "linked_account_organization_id_fkey";

alter table "public"."notification_configuration" add constraint "notification_configuration_organization_user_id_fkey" FOREIGN KEY (organization_user_id) REFERENCES public.organization_user(id) ON DELETE CASCADE not valid;

alter table "public"."notification_configuration" validate constraint "notification_configuration_organization_user_id_fkey";

alter table "public"."offering" add constraint "offering_offering_entity_id_fkey" FOREIGN KEY (offering_entity_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."offering" validate constraint "offering_offering_entity_id_fkey";

alter table "public"."offering_description_text" add constraint "offering_description_text_offering_id_fkey" FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE not valid;

alter table "public"."offering_description_text" validate constraint "offering_description_text_offering_id_fkey";

alter table "public"."offering_distribution" add constraint "offering_distribution_offering_id_fkey" FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE not valid;

alter table "public"."offering_distribution" validate constraint "offering_distribution_offering_id_fkey";

alter table "public"."offering_participant" add constraint "offering_participant_address_offering_id_key" UNIQUE using index "offering_participant_address_offering_id_key";

alter table "public"."offering_participant" add constraint "offering_participant_jurisdiction_id_fkey" FOREIGN KEY (jurisdiction_id) REFERENCES public.jurisdiction(id) not valid;

alter table "public"."offering_participant" validate constraint "offering_participant_jurisdiction_id_fkey";

alter table "public"."offering_participant" add constraint "offering_participant_offering_id_fkey" FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE not valid;

alter table "public"."offering_participant" validate constraint "offering_participant_offering_id_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_distribution_contract_id_fkey" FOREIGN KEY (distribution_contract_id) REFERENCES public.smart_contract(id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_distribution_contract_id_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_offering_id_fkey" FOREIGN KEY (offering_id) REFERENCES public.offering(id) ON DELETE CASCADE not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_offering_id_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_share_contract_id_fkey" FOREIGN KEY (share_contract_id) REFERENCES public.smart_contract(id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_share_contract_id_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_swap_contract_id_fkey" FOREIGN KEY (swap_contract_id) REFERENCES public.smart_contract(id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_swap_contract_id_fkey";

alter table "public"."organization" add constraint "organization_slug_key" UNIQUE using index "organization_slug_key";

alter table "public"."organization_user" add constraint "organization_user_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON DELETE CASCADE not valid;

alter table "public"."organization_user" validate constraint "organization_user_organization_id_fkey";

alter table "public"."organization_user" add constraint "organization_user_organization_id_user_id_key" UNIQUE using index "organization_user_organization_id_user_id_key";

alter table "public"."organization_user" add constraint "organization_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."organization_user" validate constraint "organization_user_user_id_fkey";

alter table "public"."organization_user" add constraint "organization_user_user_id_profile_fk" FOREIGN KEY (user_id) REFERENCES public.profile(id) ON DELETE CASCADE not valid;

alter table "public"."organization_user" validate constraint "organization_user_user_id_profile_fk";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

alter table "public"."real_estate_property" add constraint "real_estate_property_address_id_fkey" FOREIGN KEY (address_id) REFERENCES public.address(id) not valid;

alter table "public"."real_estate_property" validate constraint "real_estate_property_address_id_fkey";

alter table "public"."real_estate_property" add constraint "real_estate_property_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."real_estate_property" validate constraint "real_estate_property_owner_id_fkey";

alter table "public"."real_estate_property_image" add constraint "real_estate_property_image_property_id_fkey" FOREIGN KEY (property_id) REFERENCES public.real_estate_property(id) ON DELETE CASCADE not valid;

alter table "public"."real_estate_property_image" validate constraint "real_estate_property_image_property_id_fkey";

alter table "public"."real_estate_property_image" add constraint "real_estate_property_image_property_id_key" UNIQUE using index "real_estate_property_image_property_id_key";

alter table "public"."smart_contract" add constraint "smart_contract_crypto_address_id_fkey" FOREIGN KEY (crypto_address_id) REFERENCES public.crypto_address(id) ON DELETE CASCADE not valid;

alter table "public"."smart_contract" validate constraint "smart_contract_crypto_address_id_fkey";

alter table "public"."smart_contract" add constraint "smart_contract_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public.document(id) not valid;

alter table "public"."smart_contract" validate constraint "smart_contract_document_id_fkey";

alter table "public"."smart_contract" add constraint "smart_contract_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.legal_entity(id) ON DELETE CASCADE not valid;

alter table "public"."smart_contract" validate constraint "smart_contract_owner_id_fkey";

alter table "public"."whitelist_transaction" add constraint "whitelist_transaction_offering_participant_id_fkey" FOREIGN KEY (offering_participant_id) REFERENCES public.offering_participant(id) ON DELETE CASCADE not valid;

alter table "public"."whitelist_transaction" validate constraint "whitelist_transaction_offering_participant_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_organization_with_admin(p_user_id uuid, p_name text, p_logo text DEFAULT NULL::text, p_short_description text DEFAULT NULL::text, p_website text DEFAULT NULL::text, p_country text DEFAULT NULL::text, p_slug text DEFAULT NULL::text)
 RETURNS TABLE(organization_id bigint, organization_slug text, organization_user_id uuid)
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare
  v_org_id bigint;
  v_org_slug text; 
  v_org_user_id uuid;
begin
  insert into public.organization (
    name, is_public, logo, website, country, short_description, slug
  )
  values (
    p_name, false, p_logo, p_website, p_country, p_short_description, p_slug
  )
  returning id, slug into v_org_id, v_org_slug;

  insert into public.organization_user (
    user_id, organization_id, permissions
  )
  values (
    p_user_id, v_org_id, array['ADMIN']::organization_permission_type[]
  )
  returning id into v_org_user_id;

  return query select v_org_id, v_org_slug, v_org_user_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.profile (id, name, image)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_any_organization_admin(p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    p_user_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE user_id = p_user_id
        AND 'ADMIN' = ANY(permissions)
    );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_admin(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
      AND 'ADMIN' = ANY(permissions)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_admin_for_legal_entity(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
      AND 'ADMIN' = ANY(permissions)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_admin_or_editor(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    p_user_id IS NOT NULL
    AND p_organization_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE organization_id = p_organization_id
        AND user_id = p_user_id
        AND (
          'ADMIN' = ANY(permissions)
          OR 'EDITOR' = ANY(permissions)
        )
    );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_admin_or_editor_for_legal_entity(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
      AND ('ADMIN' = ANY(permissions) OR 'EDITOR' = ANY(permissions))
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_editor_for_legal_entity(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
      AND 'EDITOR' = ANY(permissions)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_member(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
      AND user_id = p_user_id
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_organization_viewer_or_better(p_organization_id bigint, p_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    p_user_id IS NOT NULL
    AND p_organization_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM organization_user
      WHERE organization_id = p_organization_id
        AND user_id = p_user_id
        AND (
          'VIEWER' = ANY(permissions)
          OR 'EDITOR' = ANY(permissions)
          OR 'ADMIN' = ANY(permissions)
        )
    );
$function$
;

CREATE OR REPLACE FUNCTION public.organization_has_no_members(p_organization_id bigint)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT NOT EXISTS (
    SELECT 1
    FROM organization_user
    WHERE organization_id = p_organization_id
  );
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."address" to "anon";

grant insert on table "public"."address" to "anon";

grant references on table "public"."address" to "anon";

grant select on table "public"."address" to "anon";

grant trigger on table "public"."address" to "anon";

grant truncate on table "public"."address" to "anon";

grant update on table "public"."address" to "anon";

grant delete on table "public"."address" to "authenticated";

grant insert on table "public"."address" to "authenticated";

grant references on table "public"."address" to "authenticated";

grant select on table "public"."address" to "authenticated";

grant trigger on table "public"."address" to "authenticated";

grant truncate on table "public"."address" to "authenticated";

grant update on table "public"."address" to "authenticated";

grant delete on table "public"."address" to "service_role";

grant insert on table "public"."address" to "service_role";

grant references on table "public"."address" to "service_role";

grant select on table "public"."address" to "service_role";

grant trigger on table "public"."address" to "service_role";

grant truncate on table "public"."address" to "service_role";

grant update on table "public"."address" to "service_role";

grant delete on table "public"."crypto_address" to "anon";

grant insert on table "public"."crypto_address" to "anon";

grant references on table "public"."crypto_address" to "anon";

grant select on table "public"."crypto_address" to "anon";

grant trigger on table "public"."crypto_address" to "anon";

grant truncate on table "public"."crypto_address" to "anon";

grant update on table "public"."crypto_address" to "anon";

grant delete on table "public"."crypto_address" to "authenticated";

grant insert on table "public"."crypto_address" to "authenticated";

grant references on table "public"."crypto_address" to "authenticated";

grant select on table "public"."crypto_address" to "authenticated";

grant trigger on table "public"."crypto_address" to "authenticated";

grant truncate on table "public"."crypto_address" to "authenticated";

grant update on table "public"."crypto_address" to "authenticated";

grant delete on table "public"."crypto_address" to "service_role";

grant insert on table "public"."crypto_address" to "service_role";

grant references on table "public"."crypto_address" to "service_role";

grant select on table "public"."crypto_address" to "service_role";

grant trigger on table "public"."crypto_address" to "service_role";

grant truncate on table "public"."crypto_address" to "service_role";

grant update on table "public"."crypto_address" to "service_role";

grant delete on table "public"."document" to "anon";

grant insert on table "public"."document" to "anon";

grant references on table "public"."document" to "anon";

grant select on table "public"."document" to "anon";

grant trigger on table "public"."document" to "anon";

grant truncate on table "public"."document" to "anon";

grant update on table "public"."document" to "anon";

grant delete on table "public"."document" to "authenticated";

grant insert on table "public"."document" to "authenticated";

grant references on table "public"."document" to "authenticated";

grant select on table "public"."document" to "authenticated";

grant trigger on table "public"."document" to "authenticated";

grant truncate on table "public"."document" to "authenticated";

grant update on table "public"."document" to "authenticated";

grant delete on table "public"."document" to "service_role";

grant insert on table "public"."document" to "service_role";

grant references on table "public"."document" to "service_role";

grant select on table "public"."document" to "service_role";

grant trigger on table "public"."document" to "service_role";

grant truncate on table "public"."document" to "service_role";

grant update on table "public"."document" to "service_role";

grant delete on table "public"."document_signatory" to "anon";

grant insert on table "public"."document_signatory" to "anon";

grant references on table "public"."document_signatory" to "anon";

grant select on table "public"."document_signatory" to "anon";

grant trigger on table "public"."document_signatory" to "anon";

grant truncate on table "public"."document_signatory" to "anon";

grant update on table "public"."document_signatory" to "anon";

grant delete on table "public"."document_signatory" to "authenticated";

grant insert on table "public"."document_signatory" to "authenticated";

grant references on table "public"."document_signatory" to "authenticated";

grant select on table "public"."document_signatory" to "authenticated";

grant trigger on table "public"."document_signatory" to "authenticated";

grant truncate on table "public"."document_signatory" to "authenticated";

grant update on table "public"."document_signatory" to "authenticated";

grant delete on table "public"."document_signatory" to "service_role";

grant insert on table "public"."document_signatory" to "service_role";

grant references on table "public"."document_signatory" to "service_role";

grant select on table "public"."document_signatory" to "service_role";

grant trigger on table "public"."document_signatory" to "service_role";

grant truncate on table "public"."document_signatory" to "service_role";

grant update on table "public"."document_signatory" to "service_role";

grant delete on table "public"."email_address" to "anon";

grant insert on table "public"."email_address" to "anon";

grant references on table "public"."email_address" to "anon";

grant select on table "public"."email_address" to "anon";

grant trigger on table "public"."email_address" to "anon";

grant truncate on table "public"."email_address" to "anon";

grant update on table "public"."email_address" to "anon";

grant delete on table "public"."email_address" to "authenticated";

grant insert on table "public"."email_address" to "authenticated";

grant references on table "public"."email_address" to "authenticated";

grant select on table "public"."email_address" to "authenticated";

grant trigger on table "public"."email_address" to "authenticated";

grant truncate on table "public"."email_address" to "authenticated";

grant update on table "public"."email_address" to "authenticated";

grant delete on table "public"."email_address" to "service_role";

grant insert on table "public"."email_address" to "service_role";

grant references on table "public"."email_address" to "service_role";

grant select on table "public"."email_address" to "service_role";

grant trigger on table "public"."email_address" to "service_role";

grant truncate on table "public"."email_address" to "service_role";

grant update on table "public"."email_address" to "service_role";

grant delete on table "public"."investor_application" to "anon";

grant insert on table "public"."investor_application" to "anon";

grant references on table "public"."investor_application" to "anon";

grant select on table "public"."investor_application" to "anon";

grant trigger on table "public"."investor_application" to "anon";

grant truncate on table "public"."investor_application" to "anon";

grant update on table "public"."investor_application" to "anon";

grant delete on table "public"."investor_application" to "authenticated";

grant insert on table "public"."investor_application" to "authenticated";

grant references on table "public"."investor_application" to "authenticated";

grant select on table "public"."investor_application" to "authenticated";

grant trigger on table "public"."investor_application" to "authenticated";

grant truncate on table "public"."investor_application" to "authenticated";

grant update on table "public"."investor_application" to "authenticated";

grant delete on table "public"."investor_application" to "service_role";

grant insert on table "public"."investor_application" to "service_role";

grant references on table "public"."investor_application" to "service_role";

grant select on table "public"."investor_application" to "service_role";

grant trigger on table "public"."investor_application" to "service_role";

grant truncate on table "public"."investor_application" to "service_role";

grant update on table "public"."investor_application" to "service_role";

grant delete on table "public"."jurisdiction" to "anon";

grant insert on table "public"."jurisdiction" to "anon";

grant references on table "public"."jurisdiction" to "anon";

grant select on table "public"."jurisdiction" to "anon";

grant trigger on table "public"."jurisdiction" to "anon";

grant truncate on table "public"."jurisdiction" to "anon";

grant update on table "public"."jurisdiction" to "anon";

grant delete on table "public"."jurisdiction" to "authenticated";

grant insert on table "public"."jurisdiction" to "authenticated";

grant references on table "public"."jurisdiction" to "authenticated";

grant select on table "public"."jurisdiction" to "authenticated";

grant trigger on table "public"."jurisdiction" to "authenticated";

grant truncate on table "public"."jurisdiction" to "authenticated";

grant update on table "public"."jurisdiction" to "authenticated";

grant delete on table "public"."jurisdiction" to "service_role";

grant insert on table "public"."jurisdiction" to "service_role";

grant references on table "public"."jurisdiction" to "service_role";

grant select on table "public"."jurisdiction" to "service_role";

grant trigger on table "public"."jurisdiction" to "service_role";

grant truncate on table "public"."jurisdiction" to "service_role";

grant update on table "public"."jurisdiction" to "service_role";

grant delete on table "public"."legal_entity" to "anon";

grant insert on table "public"."legal_entity" to "anon";

grant references on table "public"."legal_entity" to "anon";

grant select on table "public"."legal_entity" to "anon";

grant trigger on table "public"."legal_entity" to "anon";

grant truncate on table "public"."legal_entity" to "anon";

grant update on table "public"."legal_entity" to "anon";

grant delete on table "public"."legal_entity" to "authenticated";

grant insert on table "public"."legal_entity" to "authenticated";

grant references on table "public"."legal_entity" to "authenticated";

grant select on table "public"."legal_entity" to "authenticated";

grant trigger on table "public"."legal_entity" to "authenticated";

grant truncate on table "public"."legal_entity" to "authenticated";

grant update on table "public"."legal_entity" to "authenticated";

grant delete on table "public"."legal_entity" to "service_role";

grant insert on table "public"."legal_entity" to "service_role";

grant references on table "public"."legal_entity" to "service_role";

grant select on table "public"."legal_entity" to "service_role";

grant trigger on table "public"."legal_entity" to "service_role";

grant truncate on table "public"."legal_entity" to "service_role";

grant update on table "public"."legal_entity" to "service_role";

grant delete on table "public"."legal_entity_relationship" to "anon";

grant insert on table "public"."legal_entity_relationship" to "anon";

grant references on table "public"."legal_entity_relationship" to "anon";

grant select on table "public"."legal_entity_relationship" to "anon";

grant trigger on table "public"."legal_entity_relationship" to "anon";

grant truncate on table "public"."legal_entity_relationship" to "anon";

grant update on table "public"."legal_entity_relationship" to "anon";

grant delete on table "public"."legal_entity_relationship" to "authenticated";

grant insert on table "public"."legal_entity_relationship" to "authenticated";

grant references on table "public"."legal_entity_relationship" to "authenticated";

grant select on table "public"."legal_entity_relationship" to "authenticated";

grant trigger on table "public"."legal_entity_relationship" to "authenticated";

grant truncate on table "public"."legal_entity_relationship" to "authenticated";

grant update on table "public"."legal_entity_relationship" to "authenticated";

grant delete on table "public"."legal_entity_relationship" to "service_role";

grant insert on table "public"."legal_entity_relationship" to "service_role";

grant references on table "public"."legal_entity_relationship" to "service_role";

grant select on table "public"."legal_entity_relationship" to "service_role";

grant trigger on table "public"."legal_entity_relationship" to "service_role";

grant truncate on table "public"."legal_entity_relationship" to "service_role";

grant update on table "public"."legal_entity_relationship" to "service_role";

grant delete on table "public"."linked_account" to "anon";

grant insert on table "public"."linked_account" to "anon";

grant references on table "public"."linked_account" to "anon";

grant select on table "public"."linked_account" to "anon";

grant trigger on table "public"."linked_account" to "anon";

grant truncate on table "public"."linked_account" to "anon";

grant update on table "public"."linked_account" to "anon";

grant delete on table "public"."linked_account" to "authenticated";

grant insert on table "public"."linked_account" to "authenticated";

grant references on table "public"."linked_account" to "authenticated";

grant select on table "public"."linked_account" to "authenticated";

grant trigger on table "public"."linked_account" to "authenticated";

grant truncate on table "public"."linked_account" to "authenticated";

grant update on table "public"."linked_account" to "authenticated";

grant delete on table "public"."linked_account" to "service_role";

grant insert on table "public"."linked_account" to "service_role";

grant references on table "public"."linked_account" to "service_role";

grant select on table "public"."linked_account" to "service_role";

grant trigger on table "public"."linked_account" to "service_role";

grant truncate on table "public"."linked_account" to "service_role";

grant update on table "public"."linked_account" to "service_role";

grant delete on table "public"."notification_configuration" to "anon";

grant insert on table "public"."notification_configuration" to "anon";

grant references on table "public"."notification_configuration" to "anon";

grant select on table "public"."notification_configuration" to "anon";

grant trigger on table "public"."notification_configuration" to "anon";

grant truncate on table "public"."notification_configuration" to "anon";

grant update on table "public"."notification_configuration" to "anon";

grant delete on table "public"."notification_configuration" to "authenticated";

grant insert on table "public"."notification_configuration" to "authenticated";

grant references on table "public"."notification_configuration" to "authenticated";

grant select on table "public"."notification_configuration" to "authenticated";

grant trigger on table "public"."notification_configuration" to "authenticated";

grant truncate on table "public"."notification_configuration" to "authenticated";

grant update on table "public"."notification_configuration" to "authenticated";

grant delete on table "public"."notification_configuration" to "service_role";

grant insert on table "public"."notification_configuration" to "service_role";

grant references on table "public"."notification_configuration" to "service_role";

grant select on table "public"."notification_configuration" to "service_role";

grant trigger on table "public"."notification_configuration" to "service_role";

grant truncate on table "public"."notification_configuration" to "service_role";

grant update on table "public"."notification_configuration" to "service_role";

grant delete on table "public"."offering" to "anon";

grant insert on table "public"."offering" to "anon";

grant references on table "public"."offering" to "anon";

grant select on table "public"."offering" to "anon";

grant trigger on table "public"."offering" to "anon";

grant truncate on table "public"."offering" to "anon";

grant update on table "public"."offering" to "anon";

grant delete on table "public"."offering" to "authenticated";

grant insert on table "public"."offering" to "authenticated";

grant references on table "public"."offering" to "authenticated";

grant select on table "public"."offering" to "authenticated";

grant trigger on table "public"."offering" to "authenticated";

grant truncate on table "public"."offering" to "authenticated";

grant update on table "public"."offering" to "authenticated";

grant delete on table "public"."offering" to "service_role";

grant insert on table "public"."offering" to "service_role";

grant references on table "public"."offering" to "service_role";

grant select on table "public"."offering" to "service_role";

grant trigger on table "public"."offering" to "service_role";

grant truncate on table "public"."offering" to "service_role";

grant update on table "public"."offering" to "service_role";

grant delete on table "public"."offering_description_text" to "anon";

grant insert on table "public"."offering_description_text" to "anon";

grant references on table "public"."offering_description_text" to "anon";

grant select on table "public"."offering_description_text" to "anon";

grant trigger on table "public"."offering_description_text" to "anon";

grant truncate on table "public"."offering_description_text" to "anon";

grant update on table "public"."offering_description_text" to "anon";

grant delete on table "public"."offering_description_text" to "authenticated";

grant insert on table "public"."offering_description_text" to "authenticated";

grant references on table "public"."offering_description_text" to "authenticated";

grant select on table "public"."offering_description_text" to "authenticated";

grant trigger on table "public"."offering_description_text" to "authenticated";

grant truncate on table "public"."offering_description_text" to "authenticated";

grant update on table "public"."offering_description_text" to "authenticated";

grant delete on table "public"."offering_description_text" to "service_role";

grant insert on table "public"."offering_description_text" to "service_role";

grant references on table "public"."offering_description_text" to "service_role";

grant select on table "public"."offering_description_text" to "service_role";

grant trigger on table "public"."offering_description_text" to "service_role";

grant truncate on table "public"."offering_description_text" to "service_role";

grant update on table "public"."offering_description_text" to "service_role";

grant delete on table "public"."offering_distribution" to "anon";

grant insert on table "public"."offering_distribution" to "anon";

grant references on table "public"."offering_distribution" to "anon";

grant select on table "public"."offering_distribution" to "anon";

grant trigger on table "public"."offering_distribution" to "anon";

grant truncate on table "public"."offering_distribution" to "anon";

grant update on table "public"."offering_distribution" to "anon";

grant delete on table "public"."offering_distribution" to "authenticated";

grant insert on table "public"."offering_distribution" to "authenticated";

grant references on table "public"."offering_distribution" to "authenticated";

grant select on table "public"."offering_distribution" to "authenticated";

grant trigger on table "public"."offering_distribution" to "authenticated";

grant truncate on table "public"."offering_distribution" to "authenticated";

grant update on table "public"."offering_distribution" to "authenticated";

grant delete on table "public"."offering_distribution" to "service_role";

grant insert on table "public"."offering_distribution" to "service_role";

grant references on table "public"."offering_distribution" to "service_role";

grant select on table "public"."offering_distribution" to "service_role";

grant trigger on table "public"."offering_distribution" to "service_role";

grant truncate on table "public"."offering_distribution" to "service_role";

grant update on table "public"."offering_distribution" to "service_role";

grant delete on table "public"."offering_participant" to "anon";

grant insert on table "public"."offering_participant" to "anon";

grant references on table "public"."offering_participant" to "anon";

grant select on table "public"."offering_participant" to "anon";

grant trigger on table "public"."offering_participant" to "anon";

grant truncate on table "public"."offering_participant" to "anon";

grant update on table "public"."offering_participant" to "anon";

grant delete on table "public"."offering_participant" to "authenticated";

grant insert on table "public"."offering_participant" to "authenticated";

grant references on table "public"."offering_participant" to "authenticated";

grant select on table "public"."offering_participant" to "authenticated";

grant trigger on table "public"."offering_participant" to "authenticated";

grant truncate on table "public"."offering_participant" to "authenticated";

grant update on table "public"."offering_participant" to "authenticated";

grant delete on table "public"."offering_participant" to "service_role";

grant insert on table "public"."offering_participant" to "service_role";

grant references on table "public"."offering_participant" to "service_role";

grant select on table "public"."offering_participant" to "service_role";

grant trigger on table "public"."offering_participant" to "service_role";

grant truncate on table "public"."offering_participant" to "service_role";

grant update on table "public"."offering_participant" to "service_role";

grant delete on table "public"."offering_smart_contract_set" to "anon";

grant insert on table "public"."offering_smart_contract_set" to "anon";

grant references on table "public"."offering_smart_contract_set" to "anon";

grant select on table "public"."offering_smart_contract_set" to "anon";

grant trigger on table "public"."offering_smart_contract_set" to "anon";

grant truncate on table "public"."offering_smart_contract_set" to "anon";

grant update on table "public"."offering_smart_contract_set" to "anon";

grant delete on table "public"."offering_smart_contract_set" to "authenticated";

grant insert on table "public"."offering_smart_contract_set" to "authenticated";

grant references on table "public"."offering_smart_contract_set" to "authenticated";

grant select on table "public"."offering_smart_contract_set" to "authenticated";

grant trigger on table "public"."offering_smart_contract_set" to "authenticated";

grant truncate on table "public"."offering_smart_contract_set" to "authenticated";

grant update on table "public"."offering_smart_contract_set" to "authenticated";

grant delete on table "public"."offering_smart_contract_set" to "service_role";

grant insert on table "public"."offering_smart_contract_set" to "service_role";

grant references on table "public"."offering_smart_contract_set" to "service_role";

grant select on table "public"."offering_smart_contract_set" to "service_role";

grant trigger on table "public"."offering_smart_contract_set" to "service_role";

grant truncate on table "public"."offering_smart_contract_set" to "service_role";

grant update on table "public"."offering_smart_contract_set" to "service_role";

grant delete on table "public"."organization" to "anon";

grant insert on table "public"."organization" to "anon";

grant references on table "public"."organization" to "anon";

grant select on table "public"."organization" to "anon";

grant trigger on table "public"."organization" to "anon";

grant truncate on table "public"."organization" to "anon";

grant update on table "public"."organization" to "anon";

grant delete on table "public"."organization" to "authenticated";

grant insert on table "public"."organization" to "authenticated";

grant references on table "public"."organization" to "authenticated";

grant select on table "public"."organization" to "authenticated";

grant trigger on table "public"."organization" to "authenticated";

grant truncate on table "public"."organization" to "authenticated";

grant update on table "public"."organization" to "authenticated";

grant delete on table "public"."organization" to "service_role";

grant insert on table "public"."organization" to "service_role";

grant references on table "public"."organization" to "service_role";

grant select on table "public"."organization" to "service_role";

grant trigger on table "public"."organization" to "service_role";

grant truncate on table "public"."organization" to "service_role";

grant update on table "public"."organization" to "service_role";

grant delete on table "public"."organization_user" to "anon";

grant insert on table "public"."organization_user" to "anon";

grant references on table "public"."organization_user" to "anon";

grant select on table "public"."organization_user" to "anon";

grant trigger on table "public"."organization_user" to "anon";

grant truncate on table "public"."organization_user" to "anon";

grant update on table "public"."organization_user" to "anon";

grant delete on table "public"."organization_user" to "authenticated";

grant insert on table "public"."organization_user" to "authenticated";

grant references on table "public"."organization_user" to "authenticated";

grant select on table "public"."organization_user" to "authenticated";

grant trigger on table "public"."organization_user" to "authenticated";

grant truncate on table "public"."organization_user" to "authenticated";

grant update on table "public"."organization_user" to "authenticated";

grant delete on table "public"."organization_user" to "service_role";

grant insert on table "public"."organization_user" to "service_role";

grant references on table "public"."organization_user" to "service_role";

grant select on table "public"."organization_user" to "service_role";

grant trigger on table "public"."organization_user" to "service_role";

grant truncate on table "public"."organization_user" to "service_role";

grant update on table "public"."organization_user" to "service_role";

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";

grant delete on table "public"."real_estate_property" to "anon";

grant insert on table "public"."real_estate_property" to "anon";

grant references on table "public"."real_estate_property" to "anon";

grant select on table "public"."real_estate_property" to "anon";

grant trigger on table "public"."real_estate_property" to "anon";

grant truncate on table "public"."real_estate_property" to "anon";

grant update on table "public"."real_estate_property" to "anon";

grant delete on table "public"."real_estate_property" to "authenticated";

grant insert on table "public"."real_estate_property" to "authenticated";

grant references on table "public"."real_estate_property" to "authenticated";

grant select on table "public"."real_estate_property" to "authenticated";

grant trigger on table "public"."real_estate_property" to "authenticated";

grant truncate on table "public"."real_estate_property" to "authenticated";

grant update on table "public"."real_estate_property" to "authenticated";

grant delete on table "public"."real_estate_property" to "service_role";

grant insert on table "public"."real_estate_property" to "service_role";

grant references on table "public"."real_estate_property" to "service_role";

grant select on table "public"."real_estate_property" to "service_role";

grant trigger on table "public"."real_estate_property" to "service_role";

grant truncate on table "public"."real_estate_property" to "service_role";

grant update on table "public"."real_estate_property" to "service_role";

grant delete on table "public"."real_estate_property_image" to "anon";

grant insert on table "public"."real_estate_property_image" to "anon";

grant references on table "public"."real_estate_property_image" to "anon";

grant select on table "public"."real_estate_property_image" to "anon";

grant trigger on table "public"."real_estate_property_image" to "anon";

grant truncate on table "public"."real_estate_property_image" to "anon";

grant update on table "public"."real_estate_property_image" to "anon";

grant delete on table "public"."real_estate_property_image" to "authenticated";

grant insert on table "public"."real_estate_property_image" to "authenticated";

grant references on table "public"."real_estate_property_image" to "authenticated";

grant select on table "public"."real_estate_property_image" to "authenticated";

grant trigger on table "public"."real_estate_property_image" to "authenticated";

grant truncate on table "public"."real_estate_property_image" to "authenticated";

grant update on table "public"."real_estate_property_image" to "authenticated";

grant delete on table "public"."real_estate_property_image" to "service_role";

grant insert on table "public"."real_estate_property_image" to "service_role";

grant references on table "public"."real_estate_property_image" to "service_role";

grant select on table "public"."real_estate_property_image" to "service_role";

grant trigger on table "public"."real_estate_property_image" to "service_role";

grant truncate on table "public"."real_estate_property_image" to "service_role";

grant update on table "public"."real_estate_property_image" to "service_role";

grant delete on table "public"."share_order" to "anon";

grant insert on table "public"."share_order" to "anon";

grant references on table "public"."share_order" to "anon";

grant select on table "public"."share_order" to "anon";

grant trigger on table "public"."share_order" to "anon";

grant truncate on table "public"."share_order" to "anon";

grant update on table "public"."share_order" to "anon";

grant delete on table "public"."share_order" to "authenticated";

grant insert on table "public"."share_order" to "authenticated";

grant references on table "public"."share_order" to "authenticated";

grant select on table "public"."share_order" to "authenticated";

grant trigger on table "public"."share_order" to "authenticated";

grant truncate on table "public"."share_order" to "authenticated";

grant update on table "public"."share_order" to "authenticated";

grant delete on table "public"."share_order" to "service_role";

grant insert on table "public"."share_order" to "service_role";

grant references on table "public"."share_order" to "service_role";

grant select on table "public"."share_order" to "service_role";

grant trigger on table "public"."share_order" to "service_role";

grant truncate on table "public"."share_order" to "service_role";

grant update on table "public"."share_order" to "service_role";

grant delete on table "public"."share_transfer_event" to "anon";

grant insert on table "public"."share_transfer_event" to "anon";

grant references on table "public"."share_transfer_event" to "anon";

grant select on table "public"."share_transfer_event" to "anon";

grant trigger on table "public"."share_transfer_event" to "anon";

grant truncate on table "public"."share_transfer_event" to "anon";

grant update on table "public"."share_transfer_event" to "anon";

grant delete on table "public"."share_transfer_event" to "authenticated";

grant insert on table "public"."share_transfer_event" to "authenticated";

grant references on table "public"."share_transfer_event" to "authenticated";

grant select on table "public"."share_transfer_event" to "authenticated";

grant trigger on table "public"."share_transfer_event" to "authenticated";

grant truncate on table "public"."share_transfer_event" to "authenticated";

grant update on table "public"."share_transfer_event" to "authenticated";

grant delete on table "public"."share_transfer_event" to "service_role";

grant insert on table "public"."share_transfer_event" to "service_role";

grant references on table "public"."share_transfer_event" to "service_role";

grant select on table "public"."share_transfer_event" to "service_role";

grant trigger on table "public"."share_transfer_event" to "service_role";

grant truncate on table "public"."share_transfer_event" to "service_role";

grant update on table "public"."share_transfer_event" to "service_role";

grant delete on table "public"."smart_contract" to "anon";

grant insert on table "public"."smart_contract" to "anon";

grant references on table "public"."smart_contract" to "anon";

grant select on table "public"."smart_contract" to "anon";

grant trigger on table "public"."smart_contract" to "anon";

grant truncate on table "public"."smart_contract" to "anon";

grant update on table "public"."smart_contract" to "anon";

grant delete on table "public"."smart_contract" to "authenticated";

grant insert on table "public"."smart_contract" to "authenticated";

grant references on table "public"."smart_contract" to "authenticated";

grant select on table "public"."smart_contract" to "authenticated";

grant trigger on table "public"."smart_contract" to "authenticated";

grant truncate on table "public"."smart_contract" to "authenticated";

grant update on table "public"."smart_contract" to "authenticated";

grant delete on table "public"."smart_contract" to "service_role";

grant insert on table "public"."smart_contract" to "service_role";

grant references on table "public"."smart_contract" to "service_role";

grant select on table "public"."smart_contract" to "service_role";

grant trigger on table "public"."smart_contract" to "service_role";

grant truncate on table "public"."smart_contract" to "service_role";

grant update on table "public"."smart_contract" to "service_role";

grant delete on table "public"."whitelist_transaction" to "anon";

grant insert on table "public"."whitelist_transaction" to "anon";

grant references on table "public"."whitelist_transaction" to "anon";

grant select on table "public"."whitelist_transaction" to "anon";

grant trigger on table "public"."whitelist_transaction" to "anon";

grant truncate on table "public"."whitelist_transaction" to "anon";

grant update on table "public"."whitelist_transaction" to "anon";

grant delete on table "public"."whitelist_transaction" to "authenticated";

grant insert on table "public"."whitelist_transaction" to "authenticated";

grant references on table "public"."whitelist_transaction" to "authenticated";

grant select on table "public"."whitelist_transaction" to "authenticated";

grant trigger on table "public"."whitelist_transaction" to "authenticated";

grant truncate on table "public"."whitelist_transaction" to "authenticated";

grant update on table "public"."whitelist_transaction" to "authenticated";

grant delete on table "public"."whitelist_transaction" to "service_role";

grant insert on table "public"."whitelist_transaction" to "service_role";

grant references on table "public"."whitelist_transaction" to "service_role";

grant select on table "public"."whitelist_transaction" to "service_role";

grant trigger on table "public"."whitelist_transaction" to "service_role";

grant truncate on table "public"."whitelist_transaction" to "service_role";

grant update on table "public"."whitelist_transaction" to "service_role";


  create policy "Admins and editors can delete addresses"
  on "public"."address"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = address.legal_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can insert addresses"
  on "public"."address"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = address.legal_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update addresses"
  on "public"."address"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = address.legal_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = address.legal_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Public can select addresses"
  on "public"."address"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can delete crypto addresses"
  on "public"."crypto_address"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = crypto_address.legal_entity_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can insert crypto addresses"
  on "public"."crypto_address"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = crypto_address.legal_entity_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can update crypto addresses"
  on "public"."crypto_address"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = crypto_address.legal_entity_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))))
with check ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = crypto_address.legal_entity_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Public can view crypto addresses"
  on "public"."crypto_address"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert documents"
  on "public"."document"
  as permissive
  for insert
  to public
with check (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = document.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = document.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))));



  create policy "Admins and editors can update documents"
  on "public"."document"
  as permissive
  for update
  to public
using (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = document.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = document.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))))
with check (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = document.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = document.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))));



  create policy "Admins can delete documents"
  on "public"."document"
  as permissive
  for delete
  to public
using (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = document.owner_id) AND public.is_organization_admin(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = document.offering_id) AND public.is_organization_admin(le.organization_id, auth.uid()))))));



  create policy "Public can select documents"
  on "public"."document"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert document signatories"
  on "public"."document_signatory"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.document d
     JOIN public.legal_entity le ON ((le.id = d.owner_id)))
  WHERE ((d.id = document_signatory.document_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update document signatories"
  on "public"."document_signatory"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.document d
     JOIN public.legal_entity le ON ((le.id = d.owner_id)))
  WHERE ((d.id = document_signatory.document_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (public.document d
     JOIN public.legal_entity le ON ((le.id = d.owner_id)))
  WHERE ((d.id = document_signatory.document_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins can delete document signatories"
  on "public"."document_signatory"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.document d
     JOIN public.legal_entity le ON ((le.id = d.owner_id)))
  WHERE ((d.id = document_signatory.document_id) AND public.is_organization_admin(le.organization_id, auth.uid())))));



  create policy "Viewers can select document signatories"
  on "public"."document_signatory"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.document d
     JOIN public.legal_entity le ON ((le.id = d.owner_id)))
  WHERE ((d.id = document_signatory.document_id) AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())))));



  create policy "Admins and editors can delete email addresses"
  on "public"."email_address"
  as permissive
  for delete
  to public
using (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Admins and editors can insert email addresses"
  on "public"."email_address"
  as permissive
  for insert
  to public
with check (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Admins and editors can update email addresses"
  on "public"."email_address"
  as permissive
  for update
  to public
using (public.is_organization_admin_or_editor(organization_id, auth.uid()))
with check (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Public can select email addresses"
  on "public"."email_address"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert investor applications"
  on "public"."investor_application"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM ((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((op.id = investor_application.offering_participant_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update investor applications"
  on "public"."investor_application"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((op.id = investor_application.offering_participant_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM ((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((op.id = investor_application.offering_participant_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins can delete investor applications"
  on "public"."investor_application"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((op.id = investor_application.offering_participant_id) AND public.is_organization_admin(le.organization_id, auth.uid())))));



  create policy "Public can insert investor applications"
  on "public"."investor_application"
  as permissive
  for insert
  to public
with check (true);



  create policy "Viewers can select investor applications"
  on "public"."investor_application"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((op.id = investor_application.offering_participant_id) AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())))));



  create policy "Admins and editors can delete jurisdictions"
  on "public"."jurisdiction"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can insert jurisdictions"
  on "public"."jurisdiction"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can update jurisdictions"
  on "public"."jurisdiction"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Everyone can view jurisdictions"
  on "public"."jurisdiction"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert legal entities"
  on "public"."legal_entity"
  as permissive
  for insert
  to public
with check (public.is_organization_admin_or_editor_for_legal_entity(organization_id, auth.uid()));



  create policy "Editors and admins can update legal entities"
  on "public"."legal_entity"
  as permissive
  for update
  to public
using (public.is_organization_admin_or_editor_for_legal_entity(organization_id, auth.uid()));



  create policy "Only admins can delete legal entities"
  on "public"."legal_entity"
  as permissive
  for delete
  to public
using (public.is_organization_admin_for_legal_entity(organization_id, auth.uid()));



  create policy "Public can view legal entities"
  on "public"."legal_entity"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can delete legal entity relationships"
  on "public"."legal_entity_relationship"
  as permissive
  for delete
  to public
using (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.parent_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.child_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))));



  create policy "Admins and editors can insert legal entity relationships"
  on "public"."legal_entity_relationship"
  as permissive
  for insert
  to public
with check (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.parent_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.child_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))));



  create policy "Admins and editors can update legal entity relationships"
  on "public"."legal_entity_relationship"
  as permissive
  for update
  to public
using (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.parent_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.child_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))))
with check (((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.parent_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = legal_entity_relationship.child_entity_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid()))))));



  create policy "Public can select legal entity relationships"
  on "public"."legal_entity_relationship"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can delete linked accounts"
  on "public"."linked_account"
  as permissive
  for delete
  to public
using (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Admins and editors can insert linked accounts"
  on "public"."linked_account"
  as permissive
  for insert
  to public
with check (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Admins and editors can update linked accounts"
  on "public"."linked_account"
  as permissive
  for update
  to public
using (public.is_organization_admin_or_editor(organization_id, auth.uid()))
with check (public.is_organization_admin_or_editor(organization_id, auth.uid()));



  create policy "Public can select linked accounts"
  on "public"."linked_account"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert notification configurations"
  on "public"."notification_configuration"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.id = notification_configuration.organization_user_id) AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())))));



  create policy "Admins and editors can update notification configurations"
  on "public"."notification_configuration"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.id = notification_configuration.organization_user_id) AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.id = notification_configuration.organization_user_id) AND public.is_organization_admin_or_editor(ou.organization_id, auth.uid())))));



  create policy "Admins can delete notification configurations"
  on "public"."notification_configuration"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.id = notification_configuration.organization_user_id) AND public.is_organization_admin(ou.organization_id, auth.uid())))));



  create policy "Viewers can select notification configurations"
  on "public"."notification_configuration"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.organization_user ou
  WHERE ((ou.id = notification_configuration.organization_user_id) AND public.is_organization_viewer_or_better(ou.organization_id, auth.uid())))));



  create policy "Admins and editors can insert offerings"
  on "public"."offering"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (le.id = offering.offering_entity_id)))));



  create policy "Admins and editors can update offerings"
  on "public"."offering"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (le.id = offering.offering_entity_id)))));



  create policy "Only admins can delete offerings"
  on "public"."offering"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND ('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) AND (le.id = offering.offering_entity_id)))));



  create policy "Organization members can view organization offerings"
  on "public"."offering"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (le.id = offering.offering_entity_id)))));



  create policy "Public can view public offerings"
  on "public"."offering"
  as permissive
  for select
  to public
using ((is_public = true));



  create policy "Admins and editors can delete offering description text"
  on "public"."offering_description_text"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (o.id = offering_description_text.offering_id)))));



  create policy "Admins and editors can insert offering description text"
  on "public"."offering_description_text"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (o.id = offering_description_text.offering_id)))));



  create policy "Admins and editors can update offering description text"
  on "public"."offering_description_text"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (o.id = offering_description_text.offering_id)))));



  create policy "Everyone can view offering description text"
  on "public"."offering_description_text"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert offering distributions"
  on "public"."offering_distribution"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_distribution.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update offering distributions"
  on "public"."offering_distribution"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_distribution.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_distribution.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins can delete offering distributions"
  on "public"."offering_distribution"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_distribution.offering_id) AND public.is_organization_admin(le.organization_id, auth.uid())))));



  create policy "Public can select offering distributions"
  on "public"."offering_distribution"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can insert offering participants"
  on "public"."offering_participant"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_participant.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update offering participants"
  on "public"."offering_participant"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_participant.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_participant.offering_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins can delete offering participants"
  on "public"."offering_participant"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_participant.offering_id) AND public.is_organization_admin(le.organization_id, auth.uid())))));



  create policy "Public can view offering participants"
  on "public"."offering_participant"
  as permissive
  for select
  to public
using (true);



  create policy "Viewers can select offering participants"
  on "public"."offering_participant"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
  WHERE ((o.id = offering_participant.offering_id) AND public.is_organization_viewer_or_better(le.organization_id, auth.uid())))));



  create policy "Admins and editors can delete offering smart contract sets"
  on "public"."offering_smart_contract_set"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((o.id = offering_smart_contract_set.offering_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can insert offering smart contract sets"
  on "public"."offering_smart_contract_set"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((o.id = offering_smart_contract_set.offering_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can update offering smart contract sets"
  on "public"."offering_smart_contract_set"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((o.id = offering_smart_contract_set.offering_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))))
with check ((EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((o.id = offering_smart_contract_set.offering_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Public can view offering smart contract sets"
  on "public"."offering_smart_contract_set"
  as permissive
  for select
  to public
using (true);



  create policy "Authenticated users can create organizations"
  on "public"."organization"
  as permissive
  for insert
  to public
with check ((auth.uid() IS NOT NULL));



  create policy "Authenticated users can view newly created organizations"
  on "public"."organization"
  as permissive
  for select
  to public
using (((auth.uid() IS NOT NULL) AND public.organization_has_no_members(id) AND (created_at > (now() - '00:05:00'::interval))));



  create policy "Organization admins can update organization"
  on "public"."organization"
  as permissive
  for update
  to public
using ((id IN ( SELECT organization_user.organization_id
   FROM public.organization_user
  WHERE ((organization_user.user_id = auth.uid()) AND ('ADMIN'::public.organization_permission_type = ANY (organization_user.permissions))))));



  create policy "Organization members can view organization"
  on "public"."organization"
  as permissive
  for select
  to public
using ((id IN ( SELECT organization_user.organization_id
   FROM public.organization_user
  WHERE (organization_user.user_id = auth.uid()))));



  create policy "Public can view public organizations"
  on "public"."organization"
  as permissive
  for select
  to public
using ((is_public = true));



  create policy "Organization admins can delete organization_user"
  on "public"."organization_user"
  as permissive
  for delete
  to public
using ((public.is_organization_admin(organization_id, auth.uid()) AND (user_id <> auth.uid())));



  create policy "Organization admins can insert organization_user"
  on "public"."organization_user"
  as permissive
  for insert
  to public
with check (public.is_organization_admin(organization_id, auth.uid()));



  create policy "Organization admins can update organization_user"
  on "public"."organization_user"
  as permissive
  for update
  to public
using (public.is_organization_admin(organization_id, auth.uid()));



  create policy "Organization members can view organization users"
  on "public"."organization_user"
  as permissive
  for select
  to public
using (public.is_organization_member(organization_id, auth.uid()));



  create policy "Users can delete own organization_user if multiple memberships"
  on "public"."organization_user"
  as permissive
  for delete
  to public
using (((user_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.organization_user ou2
  WHERE ((ou2.user_id = auth.uid()) AND (ou2.id <> organization_user.id))))));



  create policy "Users can insert own organization_user"
  on "public"."organization_user"
  as permissive
  for insert
  to public
with check ((user_id = auth.uid()));



  create policy "Users can view own organization_user records"
  on "public"."organization_user"
  as permissive
  for select
  to public
using ((user_id = auth.uid()));



  create policy "Users and org peers can view profiles"
  on "public"."profile"
  as permissive
  for select
  to public
using (((auth.uid() = id) OR (EXISTS ( SELECT 1
   FROM (public.organization_user ou_requestor
     JOIN public.organization_user ou_target ON ((ou_target.organization_id = ou_requestor.organization_id)))
  WHERE ((ou_requestor.user_id = auth.uid()) AND (ou_target.user_id = profile.id) AND (('VIEWER'::public.organization_permission_type = ANY (ou_requestor.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou_requestor.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou_requestor.permissions))))))));



  create policy "Users can insert own profile"
  on "public"."profile"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users can update own profile"
  on "public"."profile"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Admins and editors can delete real estate properties"
  on "public"."real_estate_property"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = real_estate_property.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can insert real estate properties"
  on "public"."real_estate_property"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = real_estate_property.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Admins and editors can update real estate properties"
  on "public"."real_estate_property"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = real_estate_property.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.legal_entity le
  WHERE ((le.id = real_estate_property.owner_id) AND public.is_organization_admin_or_editor(le.organization_id, auth.uid())))));



  create policy "Public can select real estate properties"
  on "public"."real_estate_property"
  as permissive
  for select
  to public
using (true);



  create policy "Admins can delete share orders"
  on "public"."share_order"
  as permissive
  for delete
  to public
using (public.is_any_organization_admin(auth.uid()));



  create policy "Public can insert share orders"
  on "public"."share_order"
  as permissive
  for insert
  to public
with check (true);



  create policy "Public can select share orders"
  on "public"."share_order"
  as permissive
  for select
  to public
using (true);



  create policy "Admins can delete share transfer events"
  on "public"."share_transfer_event"
  as permissive
  for delete
  to public
using (public.is_any_organization_admin(auth.uid()));



  create policy "Public can insert share transfer events"
  on "public"."share_transfer_event"
  as permissive
  for insert
  to public
with check (true);



  create policy "Public can select share transfer events"
  on "public"."share_transfer_event"
  as permissive
  for select
  to public
using (true);



  create policy "Admins and editors can delete smart contracts"
  on "public"."smart_contract"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = smart_contract.owner_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can insert smart contracts"
  on "public"."smart_contract"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = smart_contract.owner_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Admins and editors can update smart contracts"
  on "public"."smart_contract"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = smart_contract.owner_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))))
with check ((EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((le.id = smart_contract.owner_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Public can view smart contracts"
  on "public"."smart_contract"
  as permissive
  for select
  to public
using (true);



  create policy "Organization admins and editors can add whitelist transactions"
  on "public"."whitelist_transaction"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM (((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((op.id = whitelist_transaction.offering_participant_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));



  create policy "Organization admins and editors can view whitelist transactions"
  on "public"."whitelist_transaction"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (((public.offering_participant op
     JOIN public.offering o ON ((o.id = op.offering_id)))
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((op.id = whitelist_transaction.offering_participant_id) AND (ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions)))))));


CREATE TRIGGER update_address_updated_at BEFORE UPDATE ON public.address FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crypto_address_updated_at BEFORE UPDATE ON public.crypto_address FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.document FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_signatory_updated_at BEFORE UPDATE ON public.document_signatory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_address_updated_at BEFORE UPDATE ON public.email_address FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investor_application_updated_at BEFORE UPDATE ON public.investor_application FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_entity_updated_at BEFORE UPDATE ON public.legal_entity FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_linked_account_updated_at BEFORE UPDATE ON public.linked_account FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_configuration_updated_at BEFORE UPDATE ON public.notification_configuration FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offering_updated_at BEFORE UPDATE ON public.offering FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offering_description_text_updated_at BEFORE UPDATE ON public.offering_description_text FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offering_distribution_updated_at BEFORE UPDATE ON public.offering_distribution FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offering_participant_updated_at BEFORE UPDATE ON public.offering_participant FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offering_smart_contract_set_updated_at BEFORE UPDATE ON public.offering_smart_contract_set FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organization_updated_at BEFORE UPDATE ON public.organization FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organization_users_updated_at BEFORE UPDATE ON public.organization_user FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_real_estate_property_updated_at BEFORE UPDATE ON public.real_estate_property FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_share_order_updated_at BEFORE UPDATE ON public.share_order FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_share_transfer_event_updated_at BEFORE UPDATE ON public.share_transfer_event FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_smart_contract_updated_at BEFORE UPDATE ON public.smart_contract FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_whitelist_transaction_updated_at BEFORE UPDATE ON public.whitelist_transaction FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Admins and editors can delete entity assets"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'entity-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (objects.name ~~ ((le.id)::text || '/re/%'::text)))))));



  create policy "Admins and editors can delete offering assets"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Admins and editors can update entity assets"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'entity-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (objects.name ~~ ((le.id)::text || '/re/%'::text)))))))
with check (((bucket_id = 'entity-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (objects.name ~~ ((le.id)::text || '/re/%'::text)))))));



  create policy "Admins and editors can update offering assets"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))))
with check (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Admins and editors can upload entity assets"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'entity-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.legal_entity le
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))) AND (objects.name ~~ ((le.id)::text || '/re/%'::text)))))));



  create policy "Admins and editors can upload offering assets"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'offering-assets'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) OR ('EDITOR'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Admins can delete offering documents"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'offering-documents'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND ('ADMIN'::public.organization_permission_type = ANY (ou.permissions)) AND (o.name ~~ ((o.id)::text || '/docs/%'::text)))))));



  create policy "Anyone can read offering documents"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'offering-documents'::text));



  create policy "Anyone can read organization assets"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'organization-assets'::text));



  create policy "Editors and admins can delete organization assets"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'organization-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.organization o
     JOIN public.organization_user ou ON ((ou.organization_id = o.id)))
  WHERE ((ou.user_id = auth.uid()) AND (('EDITOR'::public.organization_permission_type = ANY (ou.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Editors and admins can update organization assets"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'organization-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.organization o
     JOIN public.organization_user ou ON ((ou.organization_id = o.id)))
  WHERE ((ou.user_id = auth.uid()) AND (('EDITOR'::public.organization_permission_type = ANY (ou.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou.permissions))))))))
with check (((bucket_id = 'organization-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.organization o
     JOIN public.organization_user ou ON ((ou.organization_id = o.id)))
  WHERE ((ou.user_id = auth.uid()) AND (('EDITOR'::public.organization_permission_type = ANY (ou.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Editors and admins can upload organization assets"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'organization-assets'::text) AND (EXISTS ( SELECT 1
   FROM (public.organization o
     JOIN public.organization_user ou ON ((ou.organization_id = o.id)))
  WHERE ((ou.user_id = auth.uid()) AND (('EDITOR'::public.organization_permission_type = ANY (ou.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou.permissions))))))));



  create policy "Editors, managers, and admins can upload offering documents"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'offering-documents'::text) AND (EXISTS ( SELECT 1
   FROM ((public.offering o
     JOIN public.legal_entity le ON ((le.id = o.offering_entity_id)))
     JOIN public.organization_user ou ON ((ou.organization_id = le.organization_id)))
  WHERE ((ou.user_id = auth.uid()) AND (('EDITOR'::public.organization_permission_type = ANY (ou.permissions)) OR ('ADMIN'::public.organization_permission_type = ANY (ou.permissions))) AND (o.name ~~ ((o.id)::text || '/docs/%'::text)))))));



  create policy "Everyone can read offering assets"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'offering-assets'::text));



  create policy "Public can read entity assets"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'entity-assets'::text));



INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('organization-assets', 'organization-assets', true),
  ('offering-assets', 'offering-assets', true),
  ('entity-assets', 'entity-assets', true)
ON CONFLICT (id) DO NOTHING;