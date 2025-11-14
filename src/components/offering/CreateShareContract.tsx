import { Button } from '@src/components/ui/button';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { createShareContract } from '@src/utils/actions/cryptoActions';
import { deployShareContract } from '@src/web3/contractFactory';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { FC, useContext, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { useAccount, useChainId } from 'wagmi';

import { useWalletContext } from '@/contexts/WalletContext';
import { SmartContractType } from '@/types';

type CreateShareContractProps = {
  contractCreatorId: string;
  offeringId: string | number;
};

const CreateShareContract: FC<CreateShareContractProps> = ({ contractCreatorId, offeringId }) => {
  const { setWalletActionLockModalOpen } = useWalletContext();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const { chain, chainId } = useAccount();
  if (!chain || !chainId) {
    throw new Error('No chain id found');
  }

  const chainName = chain.name;

  const [, deploy] = useAsyncFn(async () => {
    setButtonStep('step1');
    const protocol = MatchSupportedChains(chainId)?.protocol;
    if (!protocol) {
      throw new Error('No protocol found');
    }
    setWalletActionLockModalOpen(true);
    try {
      const contract = await deployShareContract(userWalletAddress, chain);
      if (!contract.contractAddress) {
        throw new Error('No contract address found');
      }
      await createShareContract({
        cryptoAddress: contract.contractAddress,
        type: SmartContractType.ERC1410,
        ownerId: contractCreatorId,
        chainId: chainId,
        protocol: protocol,
        offeringId: offeringId,
        revalidationPath: {
          path: `/${contractCreatorId}`,
          type: 'page'
        }
      });
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
    setWalletActionLockModalOpen(false);
  }, [userWalletAddress, chainId]);

  return (
    <div>
      <div>
        {!userWalletAddress ? (
          <ChooseConnectorButton buttonText={'Connect Wallet'} />
        ) : (
          <Button
            className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
            onClick={() => deploy()}
          >
            <LoadingButtonChain
              state={buttonStep}
              idleText={`Create share smart contract on ${chainName}`}
              step1Text="Deploying (check status in your wallet)"
              confirmedText="Confirmed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateShareContract;
