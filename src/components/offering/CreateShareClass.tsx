import FormButton from '../buttons/FormButton';
import loadStdlib from '@reach-sh/stdlib';
import React, { FC, useContext, useState } from 'react';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { MatchSupportedChains, setChainId } from '@src/web3/connectors';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';
// import { ALGO_WalletConnect as WalletConnect } from '@reach-sh/stdlib';
import * as backendCtc from '../../web3/index.main';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { ApplicationStoreProps, store } from '@context/store';
import { ReachContext } from '@src/SetReachContext';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';

type CreateShareClassProps = {
  contractCreatorId: string;
  entityName: string;
  investmentCurrency: Currency;
};

const CreateShareClass: FC<CreateShareClassProps> = ({ contractCreatorId, entityName, investmentCurrency }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const { reachLib, userWalletAddress } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const chainId = setChainId;
  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);

  const protocol = MatchSupportedChains(chainId)?.protocol;
  const chainName = MatchSupportedChains(chainId)?.name;

  const [, deploy] = useAsyncFn(
    async (backingToken: any) => {
      const backingTokenAddress = getCurrencyOption(backingToken).address;
      // const stdlib = loadStdlib.loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });

      await reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
      const accCreator = await reachLib.getDefaultAccount();
      const ctcCreator = accCreator.contract(backendCtc);
      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        await accCreator.tokenAccept(backingTokenAddress);
        await backendCtc.Creator(ctcCreator, {
          getParams: (msg) => {
            setButtonStep('submitting');
            return {
              companyName: entityName,
              bT: backingTokenAddress,
              lockSale: false,
              managerAddr: accCreator.getAddress(),
              authorizedST: 1000,
            };
          },
          iDeployed: async () => {
            const deployedCtc = await ctcCreator.getInfo();
            const contractId = `${parseInt(deployedCtc._hex, 16)}`;
            await addUnestablishedSmartContract({
              variables: {
                cryptoAddress: contractId,
                chainId: chainId,
                backingToken: backingToken.code,
                type: SmartContractType.ExchangeManager,
                protocol: protocol,
                owner: contractCreatorId,
              },
            });
            setButtonStep('confirmed');
          },
        });
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    },
    [chainId, contractCreatorId]
  );

  return (
    <Formik
      initialValues={
        {
          // backingToken: '',
        }
      }
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await deploy(investmentCurrency);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <div className="font-semibold text-lg">Contract currency: {getCurrencyOption(investmentCurrency).symbol}</div>
          <div className="text-sm text-gray-700 mb-4">
            {`Funds will be accepted and distributions will be paid in ${getCurrencyOption(investmentCurrency).symbol}`}
          </div>
          {/* <Select className={defaultFieldDiv} required name="backingToken" labelText="Distributions will be paid in">
            <option value="">Select distribution currency</option>;
            {chainBacs.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.symbol}
                </option>
              );
            })}
          </Select> */}
          <div>
            {!userWalletAddress ? (
              <ChooseConnectorButton buttonText={'Connect Wallet'} />
            ) : (
              <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`Publish Class to ${chainName}`}
                  submittingText="Deploying - This can take time. Please do not refresh."
                  confirmedText="Confirmed!"
                  failedText="Transaction failed"
                  rejectedText="You rejected the transaction. Click here to try again."
                />
              </FormButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateShareClass;
