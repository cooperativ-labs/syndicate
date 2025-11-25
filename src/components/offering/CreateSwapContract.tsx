import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { updateInvestmentCurrency } from '@src/utils/actions/offeringProfileActions';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { deploySwapContract } from '@src/web3/contractFactory';
import { setContractOperator } from '@src/web3/contractShareCalls';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { useChainId, useConnection } from 'wagmi';
import { z } from 'zod';

import { CurrencyCodeType, OfferingSmartContractSet, SmartContractType } from '@/types';

import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
const deploySchema = z.object({
  investmentCurrencyAddress: z
    .string()
    .min(1, 'You must choose a currency to use for buying and selling shares')
});

type DeployFormValues = z.infer<typeof deploySchema>;
type ChainCurrencyOption = (typeof bacOptions)[number];
import { createSwapContract } from '@src/utils/actions/cryptoActions';

type CreateSwapContractProps = {
  contractSet: OfferingSmartContractSet | null;
  investmentCurrency: CurrencyCodeType | null;
  contractOwnerEntityId: string;
  offeringId: string;
  organizationId: string;
};

const CreateSwapContract: FC<CreateSwapContractProps> = ({
  contractSet,
  investmentCurrency,
  contractOwnerEntityId,
  offeringId,
  organizationId
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress } = useConnection();

  const chainId = useChainId();
  const { chain } = useConnection();
  const defaultCurrencyAddress = useMemo(
    () => getCurrencyOption(investmentCurrency)?.address ?? '',
    [investmentCurrency]
  );

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const chainBacs = bacOptions.filter(bac => bac.chainId === chainId);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async paymentTokenAddress => {
      setButtonStep('step1');
      const protocol = MatchSupportedChains(chainId)?.protocol;
      const backingToken = getCurrencyById(paymentTokenAddress)?.value;
      if (!protocol || !backingToken) {
        throw new Error('No protocol or backing token found');
      }

      if (!contractSet) {
        throw new Error('No contract set found');
      }

      try {
        const contract = await deploySwapContract(
          userWalletAddress,
          chain,
          shareContractAddress,
          paymentTokenAddress
        );
        if (!contract.contractAddress) {
          throw new Error('no contract address');
        }
        setButtonStep('step2');
        await setContractOperator({
          shareContractAddress,
          operator: contract.contractAddress,
          setButtonStep,
          refetch: () => {}
        });
        // Make this update the offering instead so that we can add the smart contract to the offering and update the investment currency
        await createSwapContract({
          offeringId: offeringId,
          cryptoAddress: contract.contractAddress,
          chainId: chainId,
          backingToken: backingToken,
          type: SmartContractType.SWAP,
          protocol: protocol,
          ownerId: contractOwnerEntityId,
          contractSetId: contractSet.id,
          revalidationPath: {
            path: '[organizationId]/offering/[offeringId]',
            type: 'page'
          }
        });
        const newCurrencyCode = backingToken;
        if (newCurrencyCode !== investmentCurrency) {
          await updateInvestmentCurrency({
            organizationId: organizationId,
            offeringId: offeringId,
            investmentCurrencyCode: newCurrencyCode
          });
        }
        setButtonStep('confirmed');
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
        console.error(`Error creating swap contract: ${e}`);
      }
    },
    [userWalletAddress, shareContractAddress, chainId]
  );
  if (!contractSet) {
    return null;
  }

  return (
    <>
      <WalletActionModal open={buttonStep === 'step1' || buttonStep === 'step2'}>
        <WalletActionIndicator
          step={buttonStep}
          step1Text='Deploying swap contract'
          step1SubText='The swap contract will allow you to manage trades between investors.'
          step2Text='Setting contract operator'
          step2SubText='This allows the swap contract to transfer shares.'
        />
      </WalletActionModal>

      <div>
        <h1 className='font-semibold text-lg'>Deploy trading contract</h1>
        <p className='text-sm text-gray-500'>
          This contract will allow you to sell shares and to manage trading amongst your whitelisted
          investors.
        </p>
        <div>
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <DeploySwapForm
              buttonStep={buttonStep}
              chainBacs={chainBacs}
              chainName={chainName}
              defaultCurrencyAddress={defaultCurrencyAddress}
              onSubmit={async currency => {
                await deploy(currency);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateSwapContract;

type DeploySwapFormProps = {
  buttonStep: LoadingButtonStateType;
  chainBacs: ChainCurrencyOption[];
  chainName?: string;
  defaultCurrencyAddress: string;
  onSubmit: (currency: string) => Promise<void>;
};

const DeploySwapForm: FC<DeploySwapFormProps> = ({
  buttonStep,
  chainBacs,
  chainName,
  defaultCurrencyAddress,
  onSubmit
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<DeployFormValues>({
    resolver: zodResolver(deploySchema),
    defaultValues: {
      investmentCurrencyAddress: defaultCurrencyAddress
    }
  });

  useEffect(() => {
    reset({ investmentCurrencyAddress: defaultCurrencyAddress });
  }, [defaultCurrencyAddress, reset]);

  const submitHandler = async (values: DeployFormValues) => {
    if (values.investmentCurrencyAddress !== defaultCurrencyAddress) {
      window.confirm(
        `Note that changing the currency here will also change it on the offering's profile.`
      );
    }
    await onSubmit(values.investmentCurrencyAddress);
  };

  return (
    <form className='flex flex-col gap relative' onSubmit={handleSubmit(submitHandler)}>
      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='investmentCurrencyAddress'>
          Payment for shares will be accepted in
        </FieldLabel>
        <FieldContent>
          <select
            id='investmentCurrencyAddress'
            className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
            aria-invalid={Boolean(errors.investmentCurrencyAddress)}
            {...register('investmentCurrencyAddress')}
          >
            <option value=''>Select currency</option>
            {chainBacs.map(option => (
              <option key={option.address} value={option.address}>
                {option.symbol}
              </option>
            ))}
          </select>
          <FieldError
            errors={
              errors.investmentCurrencyAddress ? [errors.investmentCurrencyAddress] : undefined
            }
          />
        </FieldContent>
      </Field>
      <LoadingButtonChain
        type='submit'
        disabled={isSubmitting}
        state={buttonStep}
        idleText={`Publish trading contract on ${chainName}`}
        step1Text='Deploying (check status in your wallet)'
        step2Text='Setting contract operator'
        confirmedText='Confirmed!'
        failedText='Transaction failed'
        rejectedText='You rejected the transaction. Click here to try again.'
      />
    </form>
  );
};
