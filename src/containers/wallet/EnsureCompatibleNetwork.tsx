import Card from '@src/components/cards/Card';
import { MatchSupportedChains } from '@src/web3/connectors';
import React, { FC } from 'react';

import { useAccount, useChainId } from 'wagmi';
import ChooseConnectorButton from './ChooseConnectorButton';

type EnsureCompatibleNetworkProps = { children: React.ReactNode };

const EnsureCompatibleNetwork: FC<EnsureCompatibleNetworkProps> = ({ children }) => {
  const { isConnected } = useAccount();

  const chainId = useChainId();

  if (!isConnected) {
    return (
      <div className="flex flex-col h-full w-screen items-center justify-center">
        <Card className="md:w-96 rounded-lg mx-4 md:mx-auto mt-4  p-4 ">
          <div className="text-center mb-4">Please connect your wallet.</div>
          <ChooseConnectorButton buttonText={'Connect'} />
        </Card>
      </div>
    );
  } else if (!MatchSupportedChains(chainId)?.contractsSupported) {
    return (
      <div className="flex flex-col h-full w-screen items-center justify-center">
        <Card className="md:w-96 rounded-lg mx-4 md:mx-auto mt-4  p-4 ">
          The blockchain you are using is not compatible with Contributor Credits. Please use{' '}
          <a className="underline font-bold" href="https://sepolia.dev/" target="_blank" rel="noreferrer">
            Sepolia
          </a>{' '}
          for testing and the <strong>Ethereum Mainnet</strong> or{' '}
          <a className="underline font-bold" href="https://chainlist.org/chain/137" target="_blank" rel="noreferrer">
            Polygon
          </a>{' '}
          for real transactions.{' '}
        </Card>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default EnsureCompatibleNetwork;
