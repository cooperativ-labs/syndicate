import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { bytes32FromString, String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { Currency, Offering, User } from 'types';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { useMutation } from '@apollo/client';

type NewClassFormProps = {
  shareContractId: string;
};

const NewClassForm: FC<NewClassFormProps> = ({ shareContractId }) => {
  const [addPartition, { error }] = useMutation(ADD_CONTRACT_PARTITION);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  if (error) {
    toast.error(error.message);
  }

  const handleAddShareClass = async (partition) => {
    setButtonStep('submitting');
    await addPartition({
      variables: {
        smartContractId: shareContractId,
        partition: bytes32FromString(partition),
      },
    });
    setButtonStep('confirmed');
  };

  return (
    <Formik
      initialValues={{
        partition: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.partition) {
          errors.partition = 'Please choose a name for the share class.';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        handleAddShareClass(values.partition);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Input
            className={defaultFieldDiv}
            labelText="New class name"
            name="partition"
            type="text"
            placeholder="Class A"
            required
          />
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Add new share class`}
              submittingText="Sending shares..."
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

export default NewClassForm;
