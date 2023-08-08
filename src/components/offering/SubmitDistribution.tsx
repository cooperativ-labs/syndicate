import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, useState } from 'react';

import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

import Select from '../form-components/Select';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { ADD_DISTRIBUTION } from '@src/utils/dGraphQueries/orders';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import { isMetaMask } from '@src/web3/connectors';
import { setAllowance } from '@src/web3/contractSwapCalls';
import { submitDistribution } from '@src/web3/contractDistributionCall';
import { toNormalNumber } from '@src/web3/util';
import { useMutation } from '@apollo/client';

type SubmitDistributionProps = {
  distributionContractAddress: String0x | undefined;
  distributionTokenDecimals: number | undefined;
  distributionTokenAddress: String0x | undefined;
  partitions: String0x[];
  offeringId: string;
  refetchContracts: () => void;
};
const SubmitDistribution: FC<SubmitDistributionProps> = ({
  distributionContractAddress,
  distributionTokenDecimals,
  distributionTokenAddress,
  partitions,
  offeringId,
  refetchContracts,
}) => {
  const { address: userWalletAddress, connector } = useAccount();

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addDistribution, { error }] = useMutation(ADD_DISTRIBUTION);

  const { data: rawAllowance } = useContractRead({
    address: distributionTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, distributionContractAddress as String0x],
  });

  const handleSubmitDistribution = async ({ amount, partition }: any) => {
    const allowance = rawAllowance && toNormalNumber(rawAllowance as bigint, distributionTokenDecimals);
    const allowanceRequiredForPurchase = amount;
    const isAllowanceSufficient = allowance ? allowance >= allowanceRequiredForPurchase : false;

    const callSubmitDistribution = async () => {
      await submitDistribution({
        distributionContractAddress,
        amount: parseInt(amount, 10),
        distributionTokenDecimals,
        distributionTokenAddress,
        partition: partition,
        offeringId: offeringId,
        setButtonStep,
        addDistribution,
      });
    };

    if (!isAllowanceSufficient) {
      setButtonStep('step1');
      await setAllowance({
        paymentTokenAddress: distributionTokenAddress,
        paymentTokenDecimals: distributionTokenDecimals,
        spenderAddress: distributionContractAddress,
        amount: allowanceRequiredForPurchase,
        setButtonStep,
      });
      setButtonStep('step2');
      await callSubmitDistribution();
    } else if (isAllowanceSufficient) {
      setButtonStep('step2');
      await callSubmitDistribution();
    }
    refetchContracts();
  };
  return (
    <>
      <WalletActionModal
        open={buttonStep === 'step1' || buttonStep === 'step2'}
        metaMaskWarning={isMetaMask(connector)}
      >
        <WalletActionIndicator
          step={buttonStep}
          step1Text="Permitting the contract to spend your tokens"
          step1SubText="This will permit the contract to create a distribution"
          step2Text="Submitting distribution"
          step2SubText="This will submit the distribution to the contract"
        />
      </WalletActionModal>

      <Formik
        initialValues={{
          amount: '',
          partition: partitions[0],
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.amount) {
            errors.type = 'Please indicate how many shares you want to send';
          }
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await handleSubmitDistribution(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <>
            <Form className="flex flex-col gap relative">
              <Input
                className={defaultFieldDiv}
                labelText="Amount to distribute"
                name="amount"
                type="number"
                placeholder="2000"
                required
              />
              <Select className={'mt-3'} name="partition" labelText="Share class">
                <option value="">Select class</option>

                {partitions.map((partition, i) => {
                  return (
                    <option key={i} value={partition}>
                      {stringFromBytes32(partition)}
                    </option>
                  );
                })}
              </Select>
              <div className="mt-4" />
              <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`Distribute funds to shareholders`}
                  step1Text="Submitting..."
                  confirmedText="Confirmed!"
                  failedText="Transaction failed"
                  rejectedText="You rejected the transaction. Click here to try again."
                />
              </FormButton>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SubmitDistribution;
