import * as Yup from 'yup';
import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import React from 'react';
import Select from '@src/components/form-components/Select';
import SetOperatorButton from './SetOperatorButton';
import { ADD_TRANSFER_EVENT } from '@src/utils/dGraphQueries/trades';
import { addressWithoutEns, String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { forceTransfer } from '@src/web3/contractShareCalls';
import { Form, Formik } from 'formik';
import { Maybe, OfferingParticipant } from 'types';
import { readContract } from 'wagmi/actions';
import { shareContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { useAccount, useContractRead } from 'wagmi';
import { useAsync } from 'react-use';
import { useMutation } from '@apollo/client';

type ForceTransferFormProps = {
  shareContractAddress: String0x;
  partitions: String0x[];
  offeringParticipants: Maybe<Maybe<OfferingParticipant>[]> | undefined;
  target: String0x;
  refetchContracts: () => void;
};

const ForceTransferForm = ({
  shareContractAddress,
  partitions,
  offeringParticipants,
  target,
  refetchContracts,
}: ForceTransferFormProps) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = React.useState<LoadingButtonStateType>('idle');
  const [partition, setPartition] = React.useState<String0x>(partitions[0]);
  const [targetBalance, setTargetBalance] = React.useState<number>(0);
  const [addIssuance] = useMutation(ADD_TRANSFER_EVENT);

  const recipientOptions = offeringParticipants?.filter((participant) => {
    return participant?.walletAddress !== target;
  });

  const { data: isOperator, refetch } = useContractRead({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'isOperator',
    args: [userWalletAddress as String0x],
  });

  useAsync(async () => {
    const data = await readContract({
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'balanceOfByPartition',
      args: [partition, target],
    });
    const targetBalance = data ? toNormalNumber(data, shareContractDecimals) : 0;
    setTargetBalance(targetBalance);
  }, [partition, shareContractAddress, target]);

  return (
    <Formik
      initialValues={{ partition: partitions[0], amount: '', recipient: '' }}
      validate={(values) => {
        setPartition(values.partition as String0x);
      }}
      validationSchema={Yup.object().shape({
        partition: Yup.string().required('Required'),
        amount: Yup.number()
          .typeError('Invalid amount')
          .required('Required')
          .positive('Amount must be positive')
          .max(targetBalance, 'Amount cannot exceed target balance'),
        recipient: Yup.string().required('Required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setButtonStep('submitting');
        await forceTransfer({
          shareContractAddress,
          partition: values.partition as String0x,
          amount: parseInt(values.amount, 10),
          target,
          recipient: values.recipient as String0x,
          setButtonStep,
          addIssuance,
          refetchContracts,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
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
          <Input
            className={defaultFieldDiv}
            labelText={`Amount to transfer (${targetBalance} available)`}
            name="amount"
            type="number"
            placeholder="5"
            required
          />

          <Select className={'mt-3'} name={'recipient'} labelText="Receives Shares">
            <option value="">Select recipient</option>

            {recipientOptions?.map((participant, i) => {
              const presentableAddress = addressWithoutEns({
                address: participant?.walletAddress,
                userName: participant?.name,
              });
              return (
                <option key={i} value={participant?.walletAddress}>
                  {presentableAddress}
                </option>
              );
            })}
          </Select>
          {!isOperator ? (
            <SetOperatorButton shareContractAddress={shareContractAddress} refetch={refetch} />
          ) : (
            <Button
              className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              <LoadingButtonText
                state={buttonStep}
                idleText={
                  values.recipient
                    ? `Force Transfer to ${addressWithoutEns({ address: values.recipient })}`
                    : 'Force Transfer'
                }
                submittingText="Transferring..."
                confirmedText="Shares transferred!"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ForceTransferForm;
