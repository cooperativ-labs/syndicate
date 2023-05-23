import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import Select from '../form-components/Select';
import toast from 'react-hot-toast';

import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { OfferingParticipant } from 'types';
import { presentAddress } from '../FormattedCryptoAddress';
import { sendShares } from '@src/web3/contractFunctionCalls';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { useMutation } from '@apollo/client';

export type SendSharesProps = {
  sharesIssued: number;
  sharesOutstanding: number;
  shareContractId: string;
  shareContractAddress: String0x;
  offeringParticipants: OfferingParticipant[];
  partitions: String0x[];
};
const SendShares: FC<SendSharesProps> = ({
  sharesIssued,
  sharesOutstanding,
  shareContractAddress,
  shareContractId,
  offeringParticipants,
  partitions,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const [addPartition, { error: partitionError }] = useMutation(ADD_CONTRACT_PARTITION);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  const sharesRemaining = sharesIssued - sharesOutstanding;

  const formButtonText = (values) => {
    const recipient = values.recipient === 'new' ? values.newRecipient : values.recipient;
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
        recipient: '' as String0x,
        partition: partitions[0],
        newPartition: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (values.numShares > sharesRemaining) {
          errors.numShares = `You only have ${sharesRemaining} remaining shares to send.`;
        }
        if (!values.recipient) {
          errors.recipient = 'Please indicate who you want to send shares to';
        }

        if (!values.partition) {
          if (!values.newPartition) {
            errors.partition = 'Please specify a class of shares';
          }
        }
        if (values.partition === '0xNew') {
          if (!values.newPartition) {
            errors.newPartition = 'Please specify a class of shares';
          }
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const transactionDetails = await sendShares(
          shareContractAddress as String0x,
          shareContractId,
          values.numShares,
          values.recipient,
          values.partition,
          values.newPartition,
          setButtonStep,
          addPartition
        );
        if (transactionDetails) {
          toast.success(
            `${values.numShares} shares sent to ${presentAddress(
              values.recipient
            )}. Transaction hash: ${transactionDetails}`
          );
        }
        setTransactionDetails(transactionDetails);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={'mt-3'} name={'recipient'} labelText="Investor's wallet address">
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
          </Select>

          <Select className={'mt-3'} name="partition" labelText="Share class">
            <option value="">Select class</option>

            {partitions.map((partition, i) => {
              return (
                <option key={i} value={partition}>
                  {stringFromBytes32(partition)}
                </option>
              );
            })}
            <hr className="bg-grey-400" />
            <option value="0xNew">+ Add new class</option>
          </Select>
          {values.partition === '0xNew' && (
            <Input
              className={defaultFieldDiv}
              labelText="New class name"
              name="newPartition"
              type="text"
              placeholder="Class A"
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
