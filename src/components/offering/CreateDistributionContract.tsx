import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import {
  createDistributionContract,
  CreateDistributionContractParams
} from '@src/utils/actions/cryptoActions';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { deployDividendContract } from '@src/web3/contractFactory';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import { Form, Formik } from 'formik';
import React, { FC, useContext, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { useAccount, useChainId } from 'wagmi';

import { ApplicationStoreProps, store } from '@/contexts/store';
import { useWalletContext } from '@/contexts/WalletContext';
import {
  CurrencyCode,
  CurrencyCodeType,
  OfferingSmartContractSet,
  SmartContractType
} from '@/types';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

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
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { setWalletActionLockModalOpen } = useWalletContext();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();

  const handleAddDistributionContract = async (params: CreateDistributionContractParams) => {
    const result = await createDistributionContract(params);
    return result;
  };
  const chainId = useChainId();
  const { chain } = useAccount();

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

        await handleAddDistributionContract({
          cryptoAddress: contract.contractAddress,
          type: SmartContractType.DISTRIBUTION,
          ownerId: contractOwnerEntityId,
          contractSetId: contractSet.id,
          protocol: protocol,
          chainId: chainId
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
              investmentCurrencyAddress: getCurrencyOption(investmentCurrency)?.address
            }}
            validate={values => {
              const errors: any = {}; /** @TODO : Shape */
              // if (!values.investmentCurrencyAddress) {
              //   errors.investmentCurrencyAddress = 'You must choose a currency to use for buying and selling shares';
              // }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
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
              <Button
                className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
                type="submit"
              >
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
