alter table "public"."offering_smart_contract_set" drop constraint "offering_smart_contract_set_distribution_contract_id_fkey";

alter table "public"."offering_smart_contract_set" drop constraint "offering_smart_contract_set_share_contract_id_fkey";

alter table "public"."offering_smart_contract_set" drop constraint "offering_smart_contract_set_swap_contract_id_fkey";

alter table "public"."smart_contract" drop constraint "smart_contract_crypto_address_id_fkey";

alter table "public"."offering_smart_contract_set" drop constraint "offering_smart_contract_set_pkey";

alter table "public"."smart_contract" drop constraint "smart_contract_pkey";

drop index if exists "public"."offering_smart_contract_set_pkey";

drop index if exists "public"."smart_contract_pkey";

alter table "public"."offering_smart_contract_set" drop column "distribution_contract_id";

alter table "public"."offering_smart_contract_set" drop column "id";

alter table "public"."offering_smart_contract_set" drop column "share_contract_id";

alter table "public"."offering_smart_contract_set" drop column "swap_contract_id";

alter table "public"."offering_smart_contract_set" add column "distribution_contract_address" text;

alter table "public"."offering_smart_contract_set" add column "share_contract_address" text;

alter table "public"."offering_smart_contract_set" add column "swap_contract_address" text;

alter table "public"."smart_contract" drop column "id";

CREATE UNIQUE INDEX offering_smart_contract_set_offering_id_key ON public.offering_smart_contract_set USING btree (offering_id);

CREATE UNIQUE INDEX smart_contract_crypto_address_id_key ON public.smart_contract USING btree (crypto_address_id);

CREATE UNIQUE INDEX smart_contract_pkey ON public.smart_contract USING btree (crypto_address_id);

alter table "public"."smart_contract" add constraint "smart_contract_pkey" PRIMARY KEY using index "smart_contract_pkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_distribution_contract_address_fkey" FOREIGN KEY (distribution_contract_address) REFERENCES public.smart_contract(crypto_address_id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_distribution_contract_address_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_offering_id_key" UNIQUE using index "offering_smart_contract_set_offering_id_key";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_share_contract_address_fkey" FOREIGN KEY (share_contract_address) REFERENCES public.smart_contract(crypto_address_id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_share_contract_address_fkey";

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_swap_contract_address_fkey" FOREIGN KEY (swap_contract_address) REFERENCES public.smart_contract(crypto_address_id) not valid;

alter table "public"."offering_smart_contract_set" validate constraint "offering_smart_contract_set_swap_contract_address_fkey";

alter table "public"."smart_contract" add constraint "smart_contract_crypto_address_id_key" UNIQUE using index "smart_contract_crypto_address_id_key";

alter table "public"."smart_contract" add constraint "smart_contract_crypto_address_id_fkey" FOREIGN KEY (crypto_address_id) REFERENCES public.crypto_address(address) not valid;

alter table "public"."smart_contract" validate constraint "smart_contract_crypto_address_id_fkey";


