import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import Select from '../form-components/Select';
import toast from 'react-hot-toast';
import { ADD_WHITELIST_MEMBER } from '@src/utils/dGraphQueries/offering';
import { ContractAddressType, createPartition } from '@src/web3/helpersChain';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { OfferingParticipant } from 'types';
import { presentAddress } from '../FormattedCryptoAddress';
import { sendShares } from '@src/web3/contractFunctionCalls';
import { useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

export type SendSharesProps = {
  sharesIssued: number;
  sharesOutstanding: number;
  offeringId: string;
  contractId: string;
  offeringParticipants: OfferingParticipant[];
  partitions: ContractAddressType[];
  refetch: () => void;
  setRecallContract: Dispatch<SetStateAction<string>>;
};
const SendShares: FC<SendSharesProps> = ({
  sharesIssued,
  sharesOutstanding,
  offeringId,
  contractId,
  offeringParticipants,
  partitions,
  refetch,
  setRecallContract,
}) => {
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addWhitelistObject, { data, error }] = useMutation(ADD_WHITELIST_MEMBER);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  if (data) {
    refetch();
  }

  const sharesRemaining = sharesIssued - sharesOutstanding;

  const formButtonText = (values) => {
    const recipient = values.existingRecipient === 'new' ? values.newRecipient : values.existingRecipient;
    if (recipient) {
      return `Send ${
        values.numShares
          ? `${values.numShares} out of ${sharesIssued} (${(values.numShares / sharesIssued) * 100}%)`
          : ''
      } shares to ${presentAddress(recipient)}`;
    }
    return 'Send shares';
  };

  return (
    <Formik
      initialValues={{
        numShares: null,
        existingRecipient: '',
        newRecipient: '',
        partition: partitions[0] ?? createPartition('Class A'),
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (values.numShares > sharesRemaining) {
          errors.numShares = `You only have ${sharesRemaining} remaining shares to send.`;
        }
        if (!values.existingRecipient) {
          if (!values.newRecipient) {
            errors.existingRecipient = 'Please indicate who you want to send shares to';
          }
        }
        if (values.existingRecipient === 'new') {
          if (!values.newRecipient) {
            errors.newRecipient = 'Please indicate who you want to send shares to';
          }
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const recipient = values.existingRecipient === 'new' ? values.newRecipient : values.existingRecipient;
        const partition = values.partition;
        const transactionDetails = await sendShares(
          contractId as ContractAddressType,
          offeringId,
          values.numShares,
          recipient as ContractAddressType,
          chainId,
          setButtonStep,
          setRecallContract,
          addWhitelistObject,
          partition
        );
        if (transactionDetails.hash) {
          toast.success(
            `${values.numShares} shares sent to ${presentAddress(recipient)}. Transaction hash: ${
              transactionDetails.hash
            }`
          );
        }
        setTransactionDetails(transactionDetails);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={'mt-3'} name={'existingRecipient'} labelText="Investor's wallet address">
            <option value="">Select recipient</option>

            {offeringParticipants.map((participant, i) => {
              return (
                <option key={i} value={participant.walletAddress}>
                  {participant.name
                    ? `${participant.name} (${participant.walletAddress.slice(-4)})`
                    : presentAddress(participant.walletAddress)}
                </option>
              );
            })}
            <hr className="bg-grey-400" />
            <option value="new">+ Add new investor</option>
          </Select>
          {values.existingRecipient === 'new' && (
            <Input
              className={defaultFieldDiv}
              labelText="New investor's wallet address"
              name="newRecipient"
              type="text"
              placeholder="0x531518975607FE8867fd5F39e9a3754F1fc38276"
              // required
            />
          )}
          <Input
            className={defaultFieldDiv}
            labelText={`Number of shares to send (${sharesRemaining} remaining )`}
            name="numShares"
            type="number"
            placeholder="40"
            // required
          />
          <hr className="bg-grey-600 my-3 mb-4" />

          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={formButtonText(values)}
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

export default SendShares;
