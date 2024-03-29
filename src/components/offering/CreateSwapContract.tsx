import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_SWAP_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { CurrencyCode, Maybe, OfferingSmartContractSet, SmartContractType } from 'types';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import Select from '../form-components/Select';
import WalletActionIndicator, { WalletActionStepType } from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { defaultFieldDiv } from '../form-components/Inputs';
import { deploySwapContract } from '@src/web3/contractFactory';
import { Form, Formik } from 'formik';
import { setContractOperator } from '@src/web3/contractShareCalls';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { UPDATE_INVESTMENT_CURRENCY } from '@src/utils/dGraphQueries/offering';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateSwapContractProps = {
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  investmentCurrency: CurrencyCode | null | undefined;
  contractOwnerEntityId: string | undefined;
  offeringDetailsId: string | undefined;
};

const CreateSwapContract: FC<CreateSwapContractProps> = ({
  contractSet,
  investmentCurrency,
  contractOwnerEntityId,
  offeringDetailsId,
}) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress } = useAccount();
  const [addSwapContract, { data, error }] = useMutation(CREATE_SWAP_CONTRACT);
  const [updateInvestmentCurrency] = useMutation(UPDATE_INVESTMENT_CURRENCY);
  const chainId = useChainId();
  const { chain } = useNetwork();
  const [alerted, setAlerted] = useState(false);

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async (paymentTokenAddress) => {
      setButtonStep('step1');
      const protocol = MatchSupportedChains(chainId)?.protocol;
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        const contract = await deploySwapContract(userWalletAddress, chain, shareContractAddress, paymentTokenAddress);
        if (!contract.contractAddress) {
          throw new Error('no contract address');
        }
        setButtonStep('step2');
        await setContractOperator({
          shareContractAddress,
          operator: contract.contractAddress,
          setButtonStep,
          refetch: () => {},
        });
        // Make this update the offering instead so that we can add the smart contract to the offering and update the investment currency
        await addSwapContract({
          variables: {
            offeringId: contractSet?.offering?.id,
            cryptoAddress: contract.contractAddress,
            chainId: chainId,
            backingToken: getCurrencyById(paymentTokenAddress)?.value,
            type: SmartContractType.Swap,
            protocol: protocol,
            ownerId: contractOwnerEntityId,
            contractSetId: contractSet?.id,
          },
        });
        const newCurrencyCode = getCurrencyById(paymentTokenAddress)?.value;
        if (newCurrencyCode !== investmentCurrency) {
          await updateInvestmentCurrency({
            variables: {
              offeringDetailsId: offeringDetailsId,
              investmentCurrencyCode: newCurrencyCode,
            },
          });
        }
        setButtonStep('confirmed');
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [userWalletAddress, shareContractAddress, chainId]
  );

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <>
      <WalletActionModal open={buttonStep === 'step1' || buttonStep === 'step2'}>
        <WalletActionIndicator
          step={buttonStep}
          step1Text="Deploying swap contract"
          step1SubText="The swap contract will allow you to manage trades between investors."
          step2Text="Setting contract operator"
          step2SubText="This allows the swap contract to transfer shares."
        />
      </WalletActionModal>

      <div>
        <h1 className="font-semibold text-lg">Deploy trading contract</h1>
        <p className="text-sm text-gray-500">
          This contract will allow you to sell shares and to manage trading amongst your whitelisted investors.
        </p>
        <div>
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <Formik
              initialValues={{
                investmentCurrencyAddress: getCurrencyOption(investmentCurrency)?.address,
              }}
              validate={(values) => {
                const errors: any = {}; /** @TODO : Shape */
                if (!values.investmentCurrencyAddress) {
                  errors.investmentCurrencyAddress = 'You must choose a currency to use for buying and selling shares';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (values.investmentCurrencyAddress !== getCurrencyOption(investmentCurrency)?.address) {
                  window.confirm(`Note that changing the currency here will also change it on the offering's profile.`);
                }
                setAlerted(false);
                setSubmitting(true);
                deploy(values.investmentCurrencyAddress);
                setSubmitting(false);
              }}
            >
              <Form className="flex flex-col gap relative">
                <Select
                  className={defaultFieldDiv}
                  required
                  name="investmentCurrencyAddress"
                  labelText="Payment for shares will be accepted in"
                >
                  {chainBacs.map((option, i) => {
                    return (
                      <option key={i} value={option.address}>
                        {option.symbol}
                      </option>
                    );
                  })}
                </Select>
                <Button className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium" type="submit">
                  <LoadingButtonText
                    state={buttonStep}
                    idleText={`Publish trading contract on ${chainName}`}
                    step1Text="Deploying (check status in your wallet)"
                    step2Text="Setting contract operator"
                    confirmedText="Confirmed!"
                    failedText="Transaction failed"
                    rejectedText="You rejected the transaction. Click here to try again."
                  />
                </Button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateSwapContract;
