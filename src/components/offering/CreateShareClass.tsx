import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import { deployContract } from '@src/web3/contractFactory';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateShareClassProps = {
  contractCreatorId: string;
  entityName: string;
  investmentCurrency: Currency;
};

const CreateShareClass: FC<CreateShareClassProps> = ({ contractCreatorId, entityName, investmentCurrency }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const chainId = useChainId();
  const { chain } = useNetwork();

  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const [alerted, setAlerted] = useState(false);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(async () => {
    setButtonStep('submitting');
    const backingTokenAddress = getCurrencyOption(investmentCurrency).address;
    const protocol = MatchSupportedChains(chainId).protocol;
    dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    try {
      const contract = await deployContract(userWalletAddress, chain);
      await addUnestablishedSmartContract({
        variables: {
          cryptoAddress: contract.contractAddress,
          chainId: chainId,
          backingToken: investmentCurrency.code,
          type: SmartContractType.ExchangeManager,
          protocol: protocol,
          owner: contractCreatorId,
        },
      });
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
    dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
  }, [chainId]);

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
          <Button className="rounded-lg p-3 bg-blue-500 text-white" onClick={() => deploy()}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Publish Class to ${chainName}`}
              submittingText="Deploying - This can take time. Please do not refresh."
              confirmedText="Confirmed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
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

export default CreateShareClass;
