import Button from '@src/components/buttons/Button';
import Card from '@src/components/cards/Card';
import DisconnectButton from '@src/components/buttons/DisconnectButton';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import Link from 'next/link';
import LogoutButton from '@src/components/buttons/LogoutButton';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChooseConnectorButton from './wallet/ChooseConnectorButton';
import { networkIcon, NetworkIndicatorDot } from '@src/components/indicators/NetworkIndicator';
import { useAccount, useEnsAvatar, useNetwork } from 'wagmi';
import { useSession } from 'next-auth/react';

const UserMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const { chain } = useNetwork();
  const { address: userWalletAddress } = useAccount();

  const networkImage = userWalletAddress && networkIcon(chain.id, userWalletAddress);

  const profileImg = session?.user.image ? session.user.image : '/assets/images/user-images/placeholder.png';
  return (
    <>
      {open && <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)} />}
      <div className="relative flex flex-col items-center ">
        <Button
          className={`border-gray-300 hover:border-gray-500
              border-2 focus:outline-none pr-2 flex items-center rounded-full font-semibold text-xs text-gray-700`}
          aria-label={open ? 'expand section' : 'collapse section'}
          onClick={() => setOpen(!open)}
        >
          <div className="pr-2">
            <img src={profileImg} referrerPolicy="no-referrer" className="w-8 h-8 border-2 border-white rounded-full" />
          </div>
          {userWalletAddress && `Wallet: ${userWalletAddress.slice(-4)}`}
          <div className="p-1 pl-2">
            <FontAwesomeIcon icon="chevron-down" />
          </div>
        </Button>

        {open && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-100" onClick={() => setOpen(!open)}>
            <Card className="absolute top-10 md:top-12 right-0 p-3 pt-5 w-56 bg-white rounded-xl shadow-lg">
              {userWalletAddress ? (
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-center">
                    {networkImage !== undefined ? (
                      <img src={networkImage} className="p-2 w-8 h-8 bg-gray-200 rounded-full" />
                    ) : (
                      <div className="py-2 pl-2">
                        <NetworkIndicatorDot chainId={chain.id} walletAddress={userWalletAddress} />
                      </div>
                    )}

                    <div className="mx-1" />
                    <FormattedCryptoAddress chainId={chain.id} address={userWalletAddress} withCopy />
                  </div>
                  <div className="hidden md:flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                    <DisconnectButton />
                  </div>
                </div>
              ) : (
                <ChooseConnectorButton buttonText={'Connect Wallet'} />
              )}
              {isAuthenticated && (
                <div>
                  <hr className="my-5" />

                  <div className="flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                    <Link href="/account/">Account Settings</Link>
                  </div>

                  <div className="hidden md:flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                    <LogoutButton />
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
