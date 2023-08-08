import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { bytes32FromString } from '@src/web3/helpersChain';
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

  const handleAddShareClass = async (partition: string) => {
    setButtonStep('step1');
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
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Add new share class`}
              step1Text="Sending shares..."
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
