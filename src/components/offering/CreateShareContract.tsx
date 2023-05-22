import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { CREATE_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import { deployShareContract } from '@src/web3/contractFactory';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateShareContractProps = {
  contractCreatorId: string;
  entityName: string;
  investmentCurrency: Currency;
};

const CreateShareContract: FC<CreateShareContractProps> = ({ contractCreatorId, investmentCurrency }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const chainId = useChainId();
  const { chain } = useNetwork();

  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_SMART_CONTRACT);
  const [alerted, setAlerted] = useState(false);
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(async () => {
    setButtonStep('submitting');
    const protocol = MatchSupportedChains(chainId).protocol;
    dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
    try {
      const contract = await deployShareContract(userWalletAddress, chain);
      await addUnestablishedSmartContract({
        variables: {
          cryptoAddress: contract.contractAddress,
          chainId: chainId,
          type: SmartContractType.Share,
          protocol: protocol,
          owner: contractCreatorId,
        },
      });
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
    dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
  }, [userWalletAddress, chainId]);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <div>
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

export default CreateShareContract;
