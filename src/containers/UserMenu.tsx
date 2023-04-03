import Button from '@src/components/buttons/Button';
import Card from '@src/components/cards/Card';
import DisconnectButton from '@src/components/buttons/DisconnectButton';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import Link from 'next/link';
import LogoutButton from '@src/components/buttons/LogoutButton';
import React, { FC, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { ReachContext } from '@src/SetReachContext';
import { setChainId } from '@src/web3/connectors';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

type UserMenuProps = {
  authenticatedUser?: boolean;
};

const UserMenu: FC<UserMenuProps> = ({ authenticatedUser }) => {
  const { uuid } = useContext(UserAccountContext);
  const { userWalletAddress, reFetchWallet } = useContext(ReachContext);
  const chainId = setChainId;

  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const userInfo = userData?.queryUser[0].legalEntities[0].legalEntity;

  const [open, setOpen] = useState<boolean>(false);

  const profileImg = userInfo?.profileImage ? userInfo.profileImage : '/assets/images/user-images/placeholder.png';
  return (
    <>
      {open && <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)} />}
      <div className="relative flex flex-col items-center ">
        {authenticatedUser ? (
          <Button
            className={`border-gray-300 hover:border-gray-500
              border-2 focus:outline-none pr-2 flex items-center rounded-full font-semibold text-xs text-gray-700`}
            aria-label={open ? 'expand section' : 'collapse section'}
            onClick={() => setOpen(!open)}
          >
            <div className="pr-2">
              {/* {networkImage !== undefined ? (
              <img src={networkImage} className="p-2 w-8 h-8 bg-gray-200 rounded-full" />
            ) : (
              <div className="py-2 pl-2">
                <NetworkIndicatorDot chainId={chainId} walletAddress={walletAddress} />
              </div>
            )} */}

              <img
                src={profileImg}
                referrerPolicy="no-referrer"
                className="w-8 h-8 border-2 border-white rounded-full"
              />
            </div>
            {userWalletAddress && `Wallet: ${userWalletAddress.slice(-4)}`}
            <div className="p-1 pl-2">
              <FontAwesomeIcon icon="chevron-down" />
            </div>
          </Button>
        ) : (
          <div
            className={`border-gray-300
          border-2 flex items-center rounded-full font-semibold text-xs text-gray-700`}
          >
            <img src={profileImg} referrerPolicy="no-referrer" className="w-8 h-8 border-2 border-white rounded-full" />
          </div>
        )}

        {open && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-40" onClick={() => setOpen(!open)}>
            <Card className="absolute top-10 md:top-12 right-0 p-3 w-56 rounded-xl shadow-lg">
              {userWalletAddress && (
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col items-center">
                    {/* <NetworkIndicator /> */}
                    <div className="mt-3" />
                    <FormattedCryptoAddress chainId={chainId} address={userWalletAddress} withCopy />
                  </div>
                  <div className="hidden md:flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                    <DisconnectButton refetchWallet={reFetchWallet} />
                  </div>
                </div>
              )}

              <hr className="my-5" />
              <div className="flex flex-col items-center mb-3">
                <div className="mt-3" />
                {userInfo?.fullName}
              </div>
              <div className="flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <Link href="/app/account/">Account Settings</Link>
              </div>

              <div className="hidden md:flex flex-col items-center my-1 p-2 justify-center text-sm text-gray-500 hover:bg-gray-200 rounded-lg">
                <LogoutButton />
              </div>
              <div></div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
