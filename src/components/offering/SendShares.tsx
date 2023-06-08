import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, use, useState } from 'react';
import Select from '../form-components/Select';
import toast from 'react-hot-toast';

import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { OfferingParticipant } from 'types';

import { addressWithENS, addressWithoutEns, splitAddress, String0x } from '@src/web3/helpersChain';
import { sendShares } from '@src/web3/contractShareCalls';

import NewClassInputs from '../form-components/NewClassInputs';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { ADD_ISSUANCE_OR_TRADE } from '@src/utils/dGraphQueries/trades';
import { useAccount } from 'wagmi';
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
  const { address: userWalletAddress } = useAccount();
  const [recipient, setRecipient] = useState<string | String0x>('');
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addPartition, { error: partitionError }] = useMutation(ADD_CONTRACT_PARTITION);
  const [addIssuance, { error: issuanceError }] = useMutation(ADD_ISSUANCE_OR_TRADE);

  const sharesRemaining = sharesIssued - sharesOutstanding;

  const formButtonText = (values: { numShares: number; recipient: string | String0x }) => {
    const recipient = values.recipient;
    if (recipient) {
      return `Send ${
        values.numShares
          ? `${values.numShares} out of ${sharesIssued} (${(values.numShares / sharesIssued) * 100}%)`
          : ''
        // } shares to`;
      } shares to ${addressWithENS({ address: recipient })}`;
    }
    return 'Send shares';
  };

  return (
    <Formik
      initialValues={{
        numShares: '',
        recipient: '' as String0x,
        partition: partitions[0],
        newPartition: '',
      }}
      validate={(values) => {
        setRecipient(values.recipient);
        const errors: any = {}; /** @TODO : Shape */
        if (!values.numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (parseInt(values.numShares, 10) > sharesRemaining) {
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
        const transactionDetails = await sendShares({
          shareContractAddress,
          shareContractId,
          numShares: parseInt(values.numShares, 10),
          recipient: values.recipient,
          sender: userWalletAddress,
          partition: values.partition,
          newPartition: values.newPartition,
          addIssuance,
          setButtonStep,
          addPartition,
        });
        if (transactionDetails) {
          toast.success(
            `${values.numShares} shares sent to ${addressWithENS({
              address: recipient,
            })}. Transaction hash: ${splitAddress(transactionDetails.transactionHash)}`
          );
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Select className={'mt-3'} name={'recipient'} labelText="Investor's wallet address">
            <option value="">Select recipient</option>

            {offeringParticipants.map((participant, i) => {
              const presentableAddress = addressWithoutEns({
                address: participant.walletAddress,
                userName: participant.name,
              });
              return (
                <option key={i} value={participant.walletAddress}>
                  {presentableAddress}
                </option>
              );
            })}
          </Select>

          <NewClassInputs partitions={partitions} values={values} />

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
              idleText={formButtonText({ numShares: parseInt(values.numShares, 10), recipient: values.recipient })}
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
