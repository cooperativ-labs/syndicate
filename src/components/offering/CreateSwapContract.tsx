import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { createSwapContract } from '@src/utils/actions/cryptoActions';
import { updateInvestmentCurrency } from '@src/utils/actions/offeringActions';
import { bacOptions, getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { deploySwapContract } from '@src/web3/contractFactory';
import { setContractOperator } from '@src/web3/contractShareCalls';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { useAccount, useChainId } from 'wagmi';

import { useWalletContext } from '@/contexts/WalletContext';
import { CurrencyCodeType, OfferingSmartContractSet, SmartContractType } from '@/types';

import Button, { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { defaultFieldDiv } from '../form-components/Inputs';
import Select from '../form-components/Select';

type CreateSwapContractProps = {
  contractSet: OfferingSmartContractSet;
  investmentCurrency: CurrencyCodeType;
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
  const { setWalletActionLockModalOpen } = useWalletContext();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress } = useAccount();

  const chainId = useChainId();
  const { chain } = useAccount();

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
      setWalletActionLockModalOpen(true);
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
          contractSetId: contractSet.id
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
      setWalletActionLockModalOpen(false);
    },
    [userWalletAddress, shareContractAddress, chainId]
  );

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
          This contract will allow you to sell shares and to manage trading amongst your whitelisted
          investors.
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
                if (!values.investmentCurrencyAddress) {
                  errors.investmentCurrencyAddress =
                    'You must choose a currency to use for buying and selling shares';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (
                  values.investmentCurrencyAddress !==
                  getCurrencyOption(investmentCurrency)?.address
                ) {
                  window.confirm(
                    `Note that changing the currency here will also change it on the offering's profile.`
                  );
                }

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
                <Button
                  className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
                  type="submit"
                >
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
