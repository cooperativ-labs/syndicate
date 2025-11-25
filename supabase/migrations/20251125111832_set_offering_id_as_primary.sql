CREATE UNIQUE INDEX offering_smart_contract_set_pkey ON public.offering_smart_contract_set USING btree (offering_id);

alter table "public"."offering_smart_contract_set" add constraint "offering_smart_contract_set_pkey" PRIMARY KEY using index "offering_smart_contract_set_pkey";


