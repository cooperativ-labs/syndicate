alter table "public"."offering" alter column investment_currency type "public"."currency_code" using investment_currency::text::"public"."currency_code";

alter table "public"."offering" alter column "investment_currency" drop not null;


