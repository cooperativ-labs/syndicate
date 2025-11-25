import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import {
  createDistributionContract,
  CreateDistributionContractParams
} from '@src/utils/actions/cryptoActions';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { deployDividendContract } from '@src/web3/contractFactory';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { useChainId, useConnection } from 'wagmi';

import { ApplicationStoreProps, store } from '@/contexts/store';
import { useWalletContext } from '@/contexts/WalletContext';
import {
  CurrencyCode,
  CurrencyCodeType,
  OfferingSmartContractSet,
  Protocol,
  SmartContractType
} from '@/types';

type FormData = {
  investmentCurrencyAddress: string | undefined;
};

type CreateDistributionContractFormProps = {
  investmentCurrencyAddress: string | undefined;
  deploy: (paymentTokenAddress: string | undefined) => void;
  buttonStep: LoadingButtonStateType;
  chainName: string | undefined;
};

const CreateDistributionContractForm: FC<CreateDistributionContractFormProps> = ({
  investmentCurrencyAddress,
  deploy,
  buttonStep,
  chainName
}) => {
  const { handleSubmit } = useForm<FormData>({
    defaultValues: {
      investmentCurrencyAddress
    }
  });

  const onSubmit = async (data: FormData) => {
    deploy(data.investmentCurrencyAddress);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap relative'>
      <LoadingButtonChain
        type='submit'
        state={buttonStep}
        idleText={`Publish distribution contract on ${chainName}`}
        step1Text='Deploying (check status in your wallet)'
        confirmedText='Confirmed!'
        failedText='Transaction failed'
        rejectedText='You rejected the transaction. Click here to try again.'
      />
    </form>
  );
};

type CreateDistributionContractProps = {
  contractSet: OfferingSmartContractSet;
  investmentCurrency: CurrencyCodeType;
  contractOwnerEntityId: string;
};

const CreateDistributionContract: FC<CreateDistributionContractProps> = ({
  contractSet,
  investmentCurrency,
  contractOwnerEntityId
}) => {
  const { setWalletActionLockModalOpen } = useWalletContext();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useConnection();

  const handleAddDistributionContract = async (params: CreateDistributionContractParams) => {
    const result = await createDistributionContract(params);
    return result;
  };
  const chainId = useChainId();
  const { chain } = useConnection();

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const chainBacs = bacOptions.filter(bac => bac.chainId === chainId);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async paymentTokenAddress => {
      setButtonStep('step1');
      const protocol = MatchSupportedChains(chainId)?.protocol;
      if (!protocol) {
        throw new Error('No protocol found');
      }
      setWalletActionLockModalOpen(true);
      try {
        const contract = await deployDividendContract(
          userWalletAddress,
          chain,
          shareContractAddress
        );
        if (!contract.contractAddress) {
          throw new Error('No contract address found');
        }
        await handleAddDistributionContract({
          cryptoAddress: contract.contractAddress,
          type: SmartContractType.DISTRIBUTION,
          ownerId: contractOwnerEntityId,
          contractSetId: contractSet.id,
          protocol: protocol as Protocol,
          chainId: chainId,
          revalidationPath: {
            path: '[organizationId]/offering/[offeringId]',
            type: 'page'
          }
        });

        setButtonStep('confirmed');
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
      setWalletActionLockModalOpen(false);
    },
    [userWalletAddress, shareContractAddress, chainId]
  );

  return (
    <div>
      <h1 className='font-semibold text-lg'>Deploy distribution contract</h1>
      <p className='text-sm text-gray-500 mb-4'>
        This contract will allow you to distribute dividends to your shareholders.
      </p>
      <div>
        {!userWalletAddress ? (
          <ChooseConnectorButton buttonText={'Connect Wallet'} />
        ) : (
          <CreateDistributionContractForm
            investmentCurrencyAddress={getCurrencyOption(investmentCurrency)?.address}
            deploy={deploy}
            buttonStep={buttonStep}
            chainName={chainName}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDistributionContract;
