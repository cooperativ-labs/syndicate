import cn from 'classnames';
import React, { FC } from 'react';
import { disconnectWallet } from '@src/web3/connectors';
import { useDisconnect } from 'wagmi';

type DisconnectButtonProps = {
  refetchWallet?: (action: string) => void;
};

const DisconnectButton: FC<DisconnectButtonProps> = ({ refetchWallet }) => {
  const { disconnect } = useDisconnect();
  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;
  return (
    <button
      className={cn(outlinedClass, 'text-xs p-1 px-3 font-semibold rounded-full relative mr-2')}
      onClick={() => {
        disconnectWallet(() => disconnect());
      }}
    >
      Disconnect
    </button>
  );
};

export default DisconnectButton;
