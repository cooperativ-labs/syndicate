import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import Select from '../form-components/Select';
import toast from 'react-hot-toast';

import { Currency, CurrencyCode, Maybe, OfferingParticipant } from 'types';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';

import { addressWithoutEns, String0x } from '@src/web3/helpersChain';
import { sendShares } from '@src/web3/contractShareCalls';

import NewClassInputs from '../form-components/NewClassInputs';
import SetOperatorButton from './actions/SetOperatorButton';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { ADD_TRANSFER_EVENT } from '@src/utils/dGraphQueries/orders';
import { adjustUserEnteredDecimalsToMatchCurrency } from '@src/web3/util';
import { bacOptions, fiatOptions, getCurrencyByCode } from '@src/utils/enumConverters';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { shareContractABI } from '@src/web3/generated';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useMutation } from '@apollo/client';

export type SendSharesProps = {
  sharesIssued: Maybe<number> | undefined;
  sharesOutstanding: number | undefined;
  shareContractId: string;
  shareContractAddress: String0x;
  offeringParticipants: Maybe<Maybe<OfferingParticipant>[]> | undefined;
  partitions: String0x[];
  myShareQty: number | undefined;
  investmentCurrency: Currency | undefined;
  currentSalePrice: Maybe<number> | undefined;
  refetchMainContracts: () => void;
};

const SendShares: FC<SendSharesProps> = ({
  sharesIssued,
  sharesOutstanding,
  shareContractAddress,
  shareContractId,
  offeringParticipants,
  partitions,
  myShareQty,
  investmentCurrency,
  currentSalePrice,
  refetchMainContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [addPartition, { error: partitionError }] = useMutation(ADD_CONTRACT_PARTITION);
  const [addIssuance, { error: issuanceError }] = useMutation(ADD_TRANSFER_EVENT);

  const { data: isOperator, refetch } = useContractRead({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'isOperator',
    args: [userWalletAddress as String0x],
  });

  const sharesRemaining = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });
  const purchaseCurrencyOptions = [bacOptions.filter((bac) => bac.chainId === chainId), fiatOptions].flat();

  const formButtonText = (values: { numShares: number; recipient: string | String0x }) => {
    const recipient = addressWithoutEns({ address: values.recipient });
    if (recipient && sharesIssued) {
      return `Send ${
        values.numShares
          ? `${values.numShares} out of ${sharesIssued} (${(values.numShares / sharesIssued) * 100}%)`
          : ''
        // } shares to`;
      } shares to ${recipient}`;
    }
    return 'Send shares';
  };

  return (
    <Formik
      initialValues={{
        isIssuance: 'yes',
        numShares: '',
        price: currentSalePrice,
        currencyCode: investmentCurrency?.code as CurrencyCode,
        recipient: '' as String0x,
        partition: partitions[0],
        newPartition: '',
      }}
      validate={(values) => {
        const paymentTokenDecimals = getCurrencyByCode(values.currencyCode)?.decimals;

        const errors: any = {}; /** @TODO : Shape */
        if (!values.numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (parseInt(values.numShares, 10) > sharesRemaining) {
          errors.numShares = `You only have ${sharesRemaining} remaining shares to send.`;
        }
        if (!values.recipient) {
          errors.recipient = 'Please indicate who you want to send shares to';
        }
        if (!values.price) {
          errors.price = 'Please set a price';
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
        const paymentTokenDecimals = getCurrencyByCode(values.currencyCode)?.decimals;
        setSubmitting(true);
        const isIssuance = values.isIssuance === 'yes' ? true : false;
        try {
          await sendShares({
            shareContractAddress,
            paymentTokenDecimals,
            shareContractId,
            numShares: parseInt(values.numShares, 10),
            price: values.price as number,
            currencyCode: values.currencyCode,
            recipient: values.recipient,
            sender: userWalletAddress as String0x,
            partition: values.partition,
            newPartition: values.newPartition,
            isIssuance,
            addIssuance,
            setButtonStep,
            addPartition,
            refetchMainContracts,
          });
        } catch (e: any) {
          toast.error(`Error sending shares: ${e.message}`);
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          {myShareQty ? (
            <Select className={'mt-3'} name={'isIssuance'} labelText="Send type">
              <option value="yes">Issue new shares</option>
              <option value="no">Transfer held shares</option>
            </Select>
          ) : (
            <></>
          )}
          <Select className={'mt-3'} name={'recipient'} labelText="Investor's wallet address">
            <option value="">Select recipient</option>
            {offeringParticipants?.map((participant, i) => {
              const presentableAddress =
                participant &&
                addressWithoutEns({
                  address: participant.walletAddress,
                  userName: participant.name,
                });
              return (
                <option key={i} value={participant?.walletAddress}>
                  {presentableAddress}
                </option>
              );
            })}
          </Select>

          <NewClassInputs partitions={partitions} values={values} />
          <Input
            className={defaultFieldDiv}
            labelText={`Price per share`}
            name="price"
            type="number"
            placeholder="100"
            required
          />
          {values.isIssuance === 'yes' ? (
            <Select className={'mt-3'} name={'currencyCode'} labelText="Currency">
              <option value="">Currency used for purchase</option>
              {purchaseCurrencyOptions.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.symbol}
                  </option>
                );
              })}
            </Select>
          ) : (
            <></>
          )}

          <Input
            className={defaultFieldDiv}
            labelText={`Number of shares to send (${
              values.isIssuance === 'yes' ? numberWithCommas(sharesRemaining) : numberWithCommas(myShareQty)
            } available )`}
            name="numShares"
            type="number"
            placeholder="40"
            // required
          />
          <hr className="bg-grey-600 my-3 mb-4" />
          {!isOperator && values.isIssuance === 'no' ? (
            <SetOperatorButton shareContractAddress={shareContractAddress} refetch={refetch} />
          ) : (
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={formButtonText({ numShares: parseInt(values.numShares, 10), recipient: values.recipient })}
                step1Text="Sending shares..."
                confirmedText="Sent!"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </FormButton>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SendShares;
