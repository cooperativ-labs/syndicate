import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@src/components/ui/checkbox';
import { Field, FieldContent, FieldError, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { cn } from '@src/lib/utils';
import { deleteCryptoAddressById, updateCryptoAddress } from '@src/utils/actions/cryptoActions';
import { MatchSupportedChains } from '@src/web3/wagmi';
import { Pencil, X } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useConnection } from 'wagmi';
import { z } from 'zod';

import { CryptoAddress, CryptoAddressType } from '@/types';

import { MarkPublic } from './form-components/ListItemButtons';
import FormattedCryptoAddress from './FormattedCryptoAddress';

type WalletAddressListItemProps = {
  wallet: CryptoAddress;
  withEdit?: boolean;
};

const updateWalletSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  isPublic: z.boolean()
});

type WalletFormValues = z.infer<typeof updateWalletSchema>;

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ wallet, withEdit }) => {
  const { legal_entity_id, id, name, type, chain_id, address, description, is_public } = wallet;
  const [editOn, setEditOn] = useState<boolean>(false);
  const { address: userWalletAddress } = useConnection();
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting }
  } = useForm<WalletFormValues>({
    resolver: zodResolver(updateWalletSchema),
    defaultValues: {
      name: name ?? '',
      isPublic: Boolean(is_public)
    }
  });

  useEffect(() => {
    reset({
      name: name ?? '',
      isPublic: Boolean(is_public)
    });
  }, [name, is_public, reset]);

  const getChainLogo = (chainId: number | null) => {
    return (
      <div className='flex'>
        only:{' '}
        {MatchSupportedChains(chainId)?.icon ? (
          <div>
            <img
              src={MatchSupportedChains(chainId)?.icon}
              className='ml-1 h-6'
              alt={name as string}
            />{' '}
          </div>
        ) : (
          MatchSupportedChains(chainId)?.name
        )}{' '}
      </div>
    );
  };

  const handleDeleteCryptoAddress = async () => {
    await deleteCryptoAddressById({
      id: id,
      revalidationPath: { path: '/profile', type: 'layout' }
    });
  };

  const onSubmit = async (values: WalletFormValues) => {
    await updateCryptoAddress({
      id: id,
      name: values.name,
      isPublic: values.isPublic,
      revalidationPath: {
        path: '/profile',
        type: 'layout'
      }
    });
  };

  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className='p-3 border-2 rounded-lg col-span-8'>
        <div className='flex justify-between'>
          {name}{' '}
          {type === CryptoAddressType.CONTRACT ? (
            getChainLogo(chain_id)
          ) : (
            <div> all EVM chains</div>
          )}{' '}
          {withEdit && (
            <div className='items-center'>
              <MarkPublic isPublic={is_public} />
            </div>
          )}
        </div>
        <div className='md:w-auto mt-3'>
          <FormattedCryptoAddress
            chainId={chain_id}
            address={address}
            className='text-large font-bold'
            withCopy
            showFull
          />
        </div>
        {description && <div className='mt-1 text-sm text-gray-700'>{description}</div>}

        {editOn && (
          <div className='bg-cLightBlue bg-opacity-10 rounded-lg p-4 mt-6'>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-4 gap-3 md:gap-8 items-center'>
                <Field className='col-span-3'>
                  <FieldLabel htmlFor={`wallet-name-${id}`}>Name</FieldLabel>
                  <FieldContent>
                    <Input
                      id={`wallet-name-${id}`}
                      placeholder='Personal'
                      aria-invalid={Boolean(errors.name)}
                      {...register('name')}
                    />
                    <FieldError errors={errors.name ? [errors.name] : undefined} />
                  </FieldContent>
                </Field>
                <Field className='col-span-1'>
                  <FieldLabel htmlFor={`wallet-public-${id}`}>Public</FieldLabel>
                  <FieldContent>
                    <Controller
                      control={control}
                      name='isPublic'
                      render={({ field }) => (
                        <Checkbox
                          id={`wallet-public-${id}`}
                          checked={field.value}
                          onCheckedChange={checked => field.onChange(Boolean(checked))}
                          aria-label='toggle wallet visibility'
                        />
                      )}
                    />
                    <FieldError errors={errors.isPublic ? [errors.isPublic] : undefined} />
                  </FieldContent>
                </Field>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-4 rounded p-2'
              >
                Save
              </button>
            </form>
            <div>
              <button
                className={cn(
                  userWalletAddress === wallet.address
                    ? 'bg-gray-300 hover:bg-gray-300 text-gray-700'
                    : 'bg-red-900 hover:bg-red-800 text-white',
                  'font-bold uppercase mt-4 rounded p-2 w-full'
                )}
                disabled={userWalletAddress === wallet.address}
                aria-label='remove wallet from account'
                onClick={handleDeleteCryptoAddress}
              >
                {userWalletAddress === wallet.address
                  ? 'You cannot remove your login wallet'
                  : 'Remove this wallet from my account'}
              </button>
            </div>
          </div>
        )}
      </div>
      {withEdit && (
        <div className='flex col-span-1 justify-center'>
          <button aria-label='edit address info' onClick={() => setEditOn(!editOn)}>
            {editOn ? (
              <X className='text-xl text-gray-600 mr-2' />
            ) : (
              <Pencil className='text-xl text-gray-600 mr-2' />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletAddressListItem;
