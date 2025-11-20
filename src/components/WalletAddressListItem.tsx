import { cn } from '@src/lib/utils';
import { MatchSupportedChains } from '@src/web3/wagmi';
import { Form, Formik } from 'formik';
import { Pencil, X } from 'lucide-react';
import React, { FC, useState } from 'react';
import { useAccount } from 'wagmi';

import Checkbox from './form-components/Checkbox';
import Input from './form-components/Inputs';
import { MarkPublic } from './form-components/ListItemButtons';
import FormattedCryptoAddress from './FormattedCryptoAddress';
import { CryptoAddress, CryptoAddressType } from '@/types';
import { deleteCryptoAddressById, updateCryptoAddress } from '@src/utils/actions/cryptoActions';

type WalletAddressListItemProps = {
  wallet: CryptoAddress;
  withEdit?: boolean;
};

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ wallet, withEdit }) => {
  const { legal_entity_id, id, name, type, chain_id, address, description, is_public } = wallet;
  const [editOn, setEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const { address: userWalletAddress } = useAccount();

  const getChainLogo = (chainId: number | null) => {
    return (
      <div className="flex">
        only:{' '}
        {MatchSupportedChains(chainId)?.icon ? (
          <div>
            <img
              src={MatchSupportedChains(chainId)?.icon}
              className="ml-1 h-6"
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

  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className="p-3 border-2 rounded-lg col-span-8">
        <div className="flex justify-between">
          {name}{' '}
          {type === CryptoAddressType.CONTRACT ? (
            getChainLogo(chain_id)
          ) : (
            <div> all EVM chains</div>
          )}{' '}
          {withEdit && (
            <div className="items-center">
              <MarkPublic isPublic={is_public} />
            </div>
          )}
        </div>
        <div className="md:w-auto mt-3">
          <FormattedCryptoAddress
            chainId={chain_id}
            address={address}
            className="text-large font-bold"
            withCopy
            showFull
          />
        </div>
        {description && <div className="mt-1 text-sm text-gray-700">{description}</div>}

        {editOn && (
          <div className="bg-cLightBlue bg-opacity-10 rounded-lg p-4 mt-6">
            <Formik
              initialValues={{
                is_public: is_public,
                name: name
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                updateCryptoAddress({
                  id: id,
                  name: values.name,
                  isPublic: values.is_public,
                  revalidationPath: {
                    path: '/profile',
                    type: 'layout'
                  }
                });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="flex flex-col">
                  <div className="grid grid-cols-4 gap-3 md:gap-8 items-center">
                    <Input
                      className={`bg-opacity-0 w-full col-span-3`}
                      required
                      labelText="Name"
                      name="name"
                      placeholder="Personal"
                    />

                    <Checkbox
                      className="col-span-1"
                      fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                      name="isPublic"
                      checked={values.isPublic}
                      labelText="Public"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-4 rounded p-2"
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
            <div>
              <button
                className={cn(
                  userWalletAddress === wallet.address
                    ? 'bg-gray-300 hover:bg-gray-300 text-gray-700'
                    : 'bg-red-900 hover:bg-red-800 text-white',
                  'font-bold uppercase mt-4 rounded p-2 w-full'
                )}
                disabled={userWalletAddress === wallet.address}
                aria-label="remove wallet from account"
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
        <div className="flex col-span-1 justify-center">
          <button aria-label="edit address info" onClick={() => setEditOn(!editOn)}>
            {editOn ? (
              <X className="text-xl text-gray-600 mr-2" />
            ) : (
              <Pencil className="text-xl text-gray-600 mr-2" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletAddressListItem;
