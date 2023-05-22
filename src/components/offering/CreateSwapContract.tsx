import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import Select from '../form-components/Select';
import { defaultFieldDiv } from '../form-components/Inputs';
import { deploySwapContract } from '@src/web3/contractFactory';
import { Form, Formik } from 'formik';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateSwapContractProps = {
  shareContractId: string;
  investmentCurrency: Currency;
  contractOwnerEntityId: string;
  offeringId: string;
  onContractCreated: () => void;
};

const CreateSwapContract: FC<CreateSwapContractProps> = ({
  shareContractId,
  investmentCurrency,
  contractOwnerEntityId,
  offeringId,
}) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const chainId = useChainId();
  const { chain } = useNetwork();

  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);

  const [addSwapContract, { data, error }] = useMutation(CREATE_SMART_CONTRACT);
  const [alerted, setAlerted] = useState(false);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async (paymentTokenAddress) => {
      setButtonStep('submitting');
      const protocol = MatchSupportedChains(chainId).protocol;
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        const contract = await deploySwapContract(userWalletAddress, chain, shareContractId, paymentTokenAddress);
        // Make this update the offering instead so that we can add the smart contract to the offering and update the investment currency
        await addSwapContract({
          variables: {
            cryptoAddress: contract.contractAddress,
            chainId: chainId,
            backingToken: investmentCurrency.code,
            type: SmartContractType.Swap,
            protocol: protocol,
            owner: contractOwnerEntityId,
            offering: offeringId,
          },
        });
        setButtonStep('confirmed');
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    },
    [userWalletAddress, shareContractId, chainId]
  );

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <div>
      <div className="font-semibold text-lg">Contract currency: {getCurrencyOption(investmentCurrency).symbol}</div>
      <div className="text-sm text-gray-700 mb-4">
        {`Funds will be accepted and distributions will be paid in ${getCurrencyOption(investmentCurrency).symbol}`}
      </div>

      <div>
        {!userWalletAddress ? (
          <ChooseConnectorButton buttonText={'Connect Wallet'} />
        ) : (
          <Formik
            initialValues={{
              investmentCurrencyAddress: getCurrencyOption(investmentCurrency).address,
            }}
            validate={(values) => {
              const errors: any = {}; /** @TODO : Shape */
              if (!values.investmentCurrencyAddress) {
                errors.investmentCurrencyAddress = 'You must choose a currency to use for buying and selling shares';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setAlerted(false);
              setSubmitting(true);
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col gap relative">
              <Select
                className={defaultFieldDiv}
                required
                name="investmentCurrencyCode"
                labelText="Distributions will be paid in"
              >
                {chainBacs.map((option, i) => {
                  return (
                    <option key={i} value={option.address}>
                      {option.symbol}
                    </option>
                  );
                })}
              </Select>
              <Button className="rounded-lg p-3 bg-blue-500 text-white" type="submit">
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`Publish trading contract on ${chainName}`}
                  submittingText="Deploying - This can take time. Please do not refresh."
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
  );

  // return (
  //   <Formik
  //     validate={(values) => {
  //       const errors: any = {}; /** @TODO : Shape */
  //     }}
  //     onSubmit={async (values, { setSubmitting }) => {
  //       setSubmitting(true);
  //       await deploy(investmentCurrency);
  //       setSubmitting(false);
  //     }}
  //   >
  //     {({ isSubmitting }) => <Form className="flex flex-col gap relative"></Form>}
  //   </Formik>
  // );
};

export default CreateSwapContract;
