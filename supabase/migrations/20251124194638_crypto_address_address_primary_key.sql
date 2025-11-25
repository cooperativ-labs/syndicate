-- Migration: Change crypto_address primary key from id (uuid) to address (text)

-- Step 1: Drop foreign key constraint from smart_contract.crypto_address_id
ALTER TABLE public.smart_contract 
DROP CONSTRAINT IF EXISTS smart_contract_crypto_address_id_fkey;

-- Step 2: Add a temporary text column to hold the address values
ALTER TABLE public.smart_contract 
ADD COLUMN crypto_address_id_temp text;

-- Step 3: Update the temporary column with address values from crypto_address table
UPDATE public.smart_contract sc
SET crypto_address_id_temp = ca.address
FROM public.crypto_address ca
WHERE sc.crypto_address_id::uuid = ca.id;

-- Step 4: Drop the old uuid column
ALTER TABLE public.smart_contract 
DROP COLUMN crypto_address_id;

-- Step 5: Rename the temporary column to crypto_address_id
ALTER TABLE public.smart_contract 
RENAME COLUMN crypto_address_id_temp TO crypto_address_id;

-- Step 6: Make the column NOT NULL (since it was required before)
ALTER TABLE public.smart_contract 
ALTER COLUMN crypto_address_id SET NOT NULL;

-- Step 7: Drop primary key and unique constraint on crypto_address
ALTER TABLE public.crypto_address 
DROP CONSTRAINT IF EXISTS crypto_address_pkey;

ALTER TABLE public.crypto_address 
DROP CONSTRAINT IF EXISTS crypto_address_address_key;

-- Step 8: Drop the id column from crypto_address
ALTER TABLE public.crypto_address 
DROP COLUMN IF EXISTS id;

-- Step 9: Add primary key on address
ALTER TABLE public.crypto_address 
ADD CONSTRAINT crypto_address_pkey PRIMARY KEY (address);

-- Step 10: Recreate foreign key with new column type
ALTER TABLE public.smart_contract 
ADD CONSTRAINT smart_contract_crypto_address_id_fkey 
FOREIGN KEY (crypto_address_id) 
REFERENCES public.crypto_address(address) 
ON DELETE CASCADE;

-- Step 11: Drop index on address (primary key automatically creates an index)
DROP INDEX IF EXISTS idx_crypto_address_address;

