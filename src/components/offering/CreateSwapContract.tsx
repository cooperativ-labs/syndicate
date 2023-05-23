import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_SWAP_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import Select from '../form-components/Select';
import { defaultFieldDiv } from '../form-components/Inputs';
import { deploySwapContract } from '@src/web3/contractFactory';
import { Form, Formik } from 'formik';
import { profile } from 'console';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateSwapContractProps = {
  shareContractAddress: String0x;
  investmentCurrency: Currency;
  contractOwnerEntityId: string;
  offeringId: string;
  onContractCreated: () => void;
};

const CreateSwapContract: FC<CreateSwapContractProps> = ({
  shareContractAddress,
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

  const [addSwapContract, { data, error }] = useMutation(CREATE_SWAP_CONTRACT);
  const [alerted, setAlerted] = useState(false);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async (paymentTokenAddress) => {
      setButtonStep('submitting');
      const protocol = MatchSupportedChains(chainId).protocol;
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        const contract = await deploySwapContract(userWalletAddress, chain, shareContractAddress, paymentTokenAddress);
        // Make this update the offering instead so that we can add the smart contract to the offering and update the investment currency

        await addSwapContract({
          variables: {
            cryptoAddress: contract.contractAddress,
            chainId: chainId,
            backingToken: getCurrencyById(paymentTokenAddress).value,
            type: SmartContractType.Swap,
            protocol: protocol,
            ownerId: contractOwnerEntityId,
            offeringId: offeringId,
          },
        });
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
              if (values.investmentCurrencyAddress !== getCurrencyOption(investmentCurrency).address) {
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
