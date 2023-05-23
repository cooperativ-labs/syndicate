import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { ADD_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { ReachContext } from '@src/SetReachContext';
import { String0x } from '@src/web3/helpersChain';
import { submitDistribution } from '@src/web3/reachCalls';
import { useMutation } from '@apollo/client';

type SubmitDistributionProps = {
  shareContractAddress: String0x;
  refetch: () => void;
  setRecallContract: Dispatch<SetStateAction<string>>;
};
const SubmitDistribution: FC<SubmitDistributionProps> = ({ shareContractAddress, refetch, setRecallContract }) => {
  const { reachAcc } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addDistribution, { data, error }] = useMutation(ADD_DISTRIBUTION);

  if (data) {
    refetch();
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
          setRecallContract,
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
