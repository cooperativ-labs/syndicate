import Checkbox from './form-components/Checkbox';
import cn from 'classnames';
import FormattedCryptoAddress from './FormattedCryptoAddress';
import Input from './form-components/Inputs';
import React, { FC, useState } from 'react';
import { CryptoAddress, CryptoAddressType, Maybe } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { MarkPublic } from './form-components/ListItemButtons';
import { MatchSupportedChains } from '@src/web3/connectors';
import { REMOVE_ENTITY_WALLET } from '@src/utils/dGraphQueries/entity';
import { UPDATE_CRYPTO_ADDRESS } from '@src/utils/dGraphQueries/crypto';
import { useAccount } from 'wagmi';
import { useMutation } from '@apollo/client';

type WalletAddressListItemProps = {
  wallet: CryptoAddress;
  withEdit?: boolean;
};

const WalletAddressListItem: FC<WalletAddressListItemProps> = ({ wallet, withEdit }) => {
  const { owner, id, name, type, chainId, address, description, isPublic } = wallet;
  const [editOn, setEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const { address: userWalletAddress } = useAccount();
  const [updateCryptoAddress, { error }] = useMutation(UPDATE_CRYPTO_ADDRESS);
  const [deleteWallet, { data, error: deleteError }] = useMutation(REMOVE_ENTITY_WALLET);

  if ((error || deleteError) && !alerted) {
    setAlerted(true);
    alert(`Oops, looks like something went wrong. ${error?.message}`);
  }
  const getChainLogo = (chainId: Maybe<number> | undefined) => {
    return (
      <div className="flex">
        only:{' '}
        {MatchSupportedChains(chainId)?.icon ? (
          <div>
            <img src={MatchSupportedChains(chainId)?.icon} className="ml-1 h-6" alt={name as string} />{' '}
          </div>
        ) : (
          MatchSupportedChains(chainId)?.name
        )}{' '}
      </div>
    );
  };

  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className="p-3 border-2 rounded-lg col-span-8">
        <div className="flex justify-between">
          {name} {type === CryptoAddressType.Contract ? getChainLogo(chainId) : <div> all EVM chains</div>}{' '}
          {withEdit && (
            <div className="items-center">
              <MarkPublic isPublic={isPublic} />
            </div>
          )}
        </div>
        <div className="md:w-auto mt-3">
          <FormattedCryptoAddress
            chainId={chainId}
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
                isPublic: isPublic,
                name: name,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                updateCryptoAddress({
                  variables: {
                    id: id,
                    name: values.name,
                    isPublic: values.isPublic,
                  },
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
                onClick={() => deleteWallet({ variables: { entityId: owner?.id, walletAddress: wallet.address } })}
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
              <FontAwesomeIcon icon="times" className="text-xl text-gray-600 mr-2" />
            ) : (
              <FontAwesomeIcon icon="pen" className="text-xl text-gray-600 mr-2" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletAddressListItem;
