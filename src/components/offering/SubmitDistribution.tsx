import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { ADD_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import { String0x } from '@src/web3/helpersChain';

import SetAllowanceForm from '../investor/tradingForms/SetAllowanceForm';
import { dividendContractABI } from '@src/web3/generated';
import { erc20ABI, useAccount, useContractRead, useContractReads } from 'wagmi';
import { submitDistribution } from '@src/web3/contractDistributionCall';
import { useMutation } from '@apollo/client';

type SubmitDistributionProps = {
  distributionContractAddress: String0x;
  distributionTokenDecimals: number;
  distributionTokenAddress: String0x;
  partitions: String0x[];
  offeringId: string;
  // refetchMainContracts: () => void;
};
const SubmitDistribution: FC<SubmitDistributionProps> = ({
  distributionContractAddress,
  distributionTokenDecimals,
  distributionTokenAddress,
  partitions,
  offeringId,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addDistribution, { data, error }] = useMutation(ADD_DISTRIBUTION);

  const handleAddDistribution = () => {
    addDistribution({
      variables: {
        offeringId: offeringId,
        transactionHash: '0x2f5c3962440f03a0181099238f3689e5155b5e6a03a8382f2d50da902d89b5d7',
        contractIndex: 0,
      },
    });
  };

  const { data: reads } = useContractReads({
    contracts: [
      {
        address: distributionTokenAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [userWalletAddress, distributionContractAddress],
      },
      {
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'sharesToken',
      },
    ],
  });

  // if (data) {
  //   refetchMainContracts();
  // }

  return (
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
        await submitDistribution({
          distributionContractAddress,
          amount: parseInt(values.amount, 10),
          distributionTokenDecimals,
          distributionTokenAddress,
          partition: values.partition,
          offeringId: offeringId,

          setButtonStep,
          addDistribution,
        });
      }}
    >
      {({ isSubmitting, values }) => (
        <>
          <SetAllowanceForm
            paymentTokenAddress={distributionTokenAddress}
            paymentTokenDecimals={distributionTokenDecimals}
            spenderAddress={distributionContractAddress}
            amount={parseInt(values.amount, 10)}
            refetchAllowance={() => {}}
          />
          <Form className="flex flex-col gap relative">
            <Input
              className={defaultFieldDiv}
              labelText="Amount to distribute"
              name="amount"
              type="number"
              placeholder="2000"
              required
            />
            <div className="mt-4" />
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={`Distribute funds to shareholders`}
                submittingText="Submitting..."
                confirmedText="Confirmed!"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </FormButton>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SubmitDistribution;
