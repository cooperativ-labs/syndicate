import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { ADD_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { ReachContext } from '@src/SetReachContext';
import { String0x } from '@src/web3/helpersChain';

import { useMutation } from '@apollo/client';

type SubmitDistributionProps = {
  shareContractAddress: String0x;
  refetchMainContracts: () => void;
};
const SubmitDistribution: FC<SubmitDistributionProps> = ({ shareContractAddress, refetchMainContracts }) => {
  const { reachAcc } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addDistribution, { data, error }] = useMutation(ADD_DISTRIBUTION);

  if (data) {
    refetchMainContracts();
  }

  return (
    <Formik
      initialValues={{
        amount: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.amount) {
          errors.type = 'Please indicate how many shares you want to send';
        }
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await submitDistribution(
          reachAcc,
          shareContractAddress,
          values.amount,
          setButtonStep,
          refetchMainContracts,
          addDistribution
        );
      }}
    >
      {({ isSubmitting, values }) => (
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
      )}
    </Formik>
  );
};

export default SubmitDistribution;
