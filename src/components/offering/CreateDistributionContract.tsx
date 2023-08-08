import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';

import React, { FC, useContext, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { CREATE_DISTRIBUTION_CONTRACT, CREATE_SWAP_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { CurrencyCode, Maybe, OfferingSmartContractSet, SmartContractType } from 'types';
import { MatchSupportedChains } from '@src/web3/connectors';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { deployDividendContract } from '@src/web3/contractFactory';
import { Form, Formik } from 'formik';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type CreateDistributionContractProps = {
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  investmentCurrency: CurrencyCode | null | undefined;
  contractOwnerEntityId: string | undefined;
};

const CreateDistributionContract: FC<CreateDistributionContractProps> = ({
  contractSet,
  investmentCurrency,
  contractOwnerEntityId,
}) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchWalletActionLockModalOpen } = applicationStore;
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();
  const [addDistributionContract, { data, error }] = useMutation(CREATE_DISTRIBUTION_CONTRACT);
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
        const contract = await deployDividendContract(userWalletAddress, chain, shareContractAddress);

        await addDistributionContract({
          variables: {
            cryptoAddress: contract.contractAddress,
            chainId: chainId,
            type: SmartContractType.Distribution,
            protocol: protocol,
            ownerId: contractOwnerEntityId,
            contractSetId: contractSet?.id,
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
      <h1 className="font-semibold text-lg">Deploy distribution contract</h1>
      <p className="text-sm text-gray-500 mb-4">
        This contract will allow you to distribute dividends to your shareholders.
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
              // if (!values.investmentCurrencyAddress) {
              //   errors.investmentCurrencyAddress = 'You must choose a currency to use for buying and selling shares';
              // }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setAlerted(false);
              setSubmitting(true);
              deploy(values.investmentCurrencyAddress);
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col gap relative">
              {/* <Select
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
              </Select> */}
              <Button className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium" type="submit">
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`Publish distribution contract on ${chainName}`}
                  step1Text="Deploying (check status in your wallet)"
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
};

export default CreateDistributionContract;
