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

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

type CreateShareContractProps = {
  contractCreatorId: string;
};

const CreateShareContract: FC<CreateShareContractProps> = ({ contractCreatorId }) => {
  const { setWalletActionLockModalOpen } = useWalletContext();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const chainId = useChainId();
  const { chain } = useAccount();

  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(async () => {
    setButtonStep('step1');
    const protocol = MatchSupportedChains(chainId)?.protocol;
    if (!protocol) {
      throw new Error('No protocol found');
    }
    setWalletActionLockModalOpen(true);
    try {
      const contract = await deployShareContract(userWalletAddress, chain);
      await createShareContract({
        cryptoAddress: contract.contractAddress,
        type: SmartContractType.ERC1410,
        ownerId: contractCreatorId,
        chainId: chainId,
        protocol: protocol
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
            <LoadingButtonText
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
