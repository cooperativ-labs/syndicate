import * as backendCtc from '../../web3/index.main';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import FormButton from '../buttons/FormButton';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { Currency, SmartContractType } from 'types';
import { CustomWalletConnectConnector, MatchSupportedChains } from '@src/web3/connectors';
import { ethers } from 'ethers';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ReachContext } from '@src/SetReachContext';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi';
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
  const { chain } = useNetwork();

  const chainId = chain?.id;

  const [addUnestablishedSmartContract, { data, error }] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);
  const protocol = MatchSupportedChains(chainId)?.protocol;
  const chainName = MatchSupportedChains(chainId)?.name;

  useEffect(() => {
    // console.log(window.ethereum);
    console.log(window.ethereum?.isMetaMask);
    // console.log(window.ethereum?.isCoinbaseWallet);
    // console.log(window.ethereum?.isBraveWallet);
    console.log(window.ethereum?.isFrame);
    // console.log(window.ethereum?.isRainbow);
    // console.log(ethers.getDefaultProvider('homestead'));
    // console.log(window.ethereum);
  }, [window]);

  const [, deploy] = useAsyncFn(
    async (backingToken: any) => {
      const backingTokenAddress = getCurrencyOption(backingToken).address;
      const reachLib = loadStdlib({ REACH_CONNECTOR_MODE: 'ETH' });

      const getAccCreator = async () => {
        if (connector.id === 'walletConnect') {
          const provider = new ethers.providers.Web3Provider(await CustomWalletConnectConnector());
          reachLib.setProvider(provider as any);
          return await reachLib.connectAccount(provider.getSigner());
        } else {
          return await reachLib.getDefaultAccount();
        }
      };
      const accCreator = await getAccCreator();
      const ctcCreator = accCreator.contract(backendCtc);

      dispatchWalletActionLockModalOpen({ type: 'TOGGLE_WALLET_ACTION_LOCK' });
      try {
        await accCreator.tokenAccept(backingTokenAddress);
        await backendCtc.Creator(await ctcCreator, {
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
