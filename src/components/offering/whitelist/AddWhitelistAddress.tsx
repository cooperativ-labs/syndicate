import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import React, { FC, useState } from 'react';
import { ADD_WHITELIST_MEMBER } from '@src/utils/dGraphQueries/offering';
import { addWhitelistMember } from '@src/web3/contractFunctionCalls';
import { Form, Formik } from 'formik';
import { isAddress } from 'viem';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

export type AddWhitelistAddressProps = {
  contractId: string;
  offeringId: string;
};
const AddWhitelistAddress: FC<AddWhitelistAddressProps> = ({ contractId, offeringId }) => {
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addWhitelistObject, { data, error }] = useMutation(ADD_WHITELIST_MEMBER);
  const [transactionHash, setTransactionHash] = useState<string>('');

  return (
    <Formik
      initialValues={{
        address: '',
        name: '',
        externalId: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.address) {
          errors.address = 'Please enter an address to approve';
        } else if (!isAddress(values.address)) {
          errors.address = 'This is not a valid address.';
        }
        if (!values.name) {
          errors.type = 'Please enter an address to approve';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setButtonStep('submitting');
        setSubmitting(true);
        const transactionHash = await addWhitelistMember(
          contractId as String0x,
          offeringId,
          values.address as String0x,
          chainId,
          values.name,
          values.externalId,
          setButtonStep,
          addWhitelistObject
        );
        setTransactionHash(transactionHash);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <div className="md:grid grid-cols-12 gap-3 ">
            <Input
              className={`${defaultFieldDiv} col-span-6`}
              labelText="Wallet address"
              name="address"
              type="text"
              placeholder="0x531518975607FE8867fd5F39e9a3754F1fc38276"
              required
            />
            <Input
              className={`${defaultFieldDiv} col-span-3`}
              labelText="Name"
              name="name"
              type="text"
              placeholder="Lisa Novak"
              required
            />
            <Input
              className={`${defaultFieldDiv} col-span-3`}
              labelText="external ID"
              name="externalId"
              type="text"
              placeholder="934834 (optional)"
            />
          </div>
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Approve ${values.address}`}
              submittingText="Adding member to whitelist..."
              confirmedText="Added!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddWhitelistAddress;
