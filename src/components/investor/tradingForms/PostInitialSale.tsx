import Checkbox from '@src/components/form-components/Checkbox';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Form, Formik } from 'formik';
import { getCurrencyById } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { Maybe } from 'types';
import { String0x } from '@src/web3/helpersChain';

import NewClassInputs from '@src/components/form-components/NewClassInputs';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { CREATE_ORDER } from '@src/utils/dGraphQueries/orders';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { useAccount } from 'wagmi';
import { useMutation } from '@apollo/client';

export type PostInitialSaleProps = {
  sharesOutstanding: number | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  partitions: String0x[];
  refetchOfferingInfo: () => void;
};

type WithAdditionalProps = PostInitialSaleProps & {
  sharesIssued: Maybe<number> | undefined;
  priceStart: Maybe<number> | undefined;
  offeringId: string;
  shareContractId: string;
  swapContractAddress: String0x | undefined;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
  refetchAllContracts: () => void;
};

const PostInitialSale: FC<WithAdditionalProps> = ({
  sharesIssued,
  sharesOutstanding,
  offeringId,
  priceStart,
  swapContractAddress,
  shareContractId,
  paymentTokenAddress,
  paymentTokenDecimals,
  partitions,
  setModal,
  refetchAllContracts,
  refetchOfferingInfo,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [createOrder, { data, error }] = useMutation(CREATE_ORDER);
  const [addPartition, { data: partitionData, error: partitionError }] = useMutation(ADD_CONTRACT_PARTITION);

  const sharesRemaining = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });

  const formButtonText = (values: { numShares: number | undefined }) => {
    if (!sharesIssued) {
      return;
    }
    return `Offer ${
      values.numShares
        ? `${values.numShares} out of ${sharesIssued} (${(values.numShares / sharesIssued) * 100}%) for sale`
        : 'shares'
    } `;
  };

  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnits: string, price: Maybe<number> | undefined) => {
    if (!price) return '0';
    return numberWithCommas(offerCalculator(parseInt(numUnits, 10), price));
  };

  return (
    <Formik
      initialValues={{
        numShares: undefined,
        price: priceStart,
        minUnits: undefined,
        maxUnits: undefined,
        partition: partitions[0],
        newPartition: '',
        visible: true,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        const { numShares, minUnits, maxUnits } = values;

        if (!numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (numShares > sharesRemaining) {
          errors.numShares = `You only have ${sharesRemaining} remaining shares to send.`;
        }
        if (maxUnits && numShares && maxUnits > numShares) {
          errors.maxUnits = 'Maximum must be less then the total shares listed for sale';
        }
        if ((maxUnits && minUnits && maxUnits < 1) || (maxUnits && minUnits && maxUnits < minUnits)) {
          errors.maxUnits = 'Maximum must be greater than minimum';
        }
        if ((minUnits && minUnits < 1) || (maxUnits && minUnits && minUnits > maxUnits)) {
          errors.minUnits = 'Minimum must be less than maximum';
        }
        if (!values.partition) {
          errors.partition = 'Please select a partition';
        }
        if (values.partition === '0xNew' && !values.newPartition) {
          errors.newPartition = 'Please enter a new partition';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const isContractOwner = true;
        const isAsk = true;
        const isIssuance = true;
        const isErc20Payment = true;
        if (!values.numShares || !values.price) {
          setSubmitting(false);
          return;
        }
        try {
          await submitSwap({
            numShares: values.numShares,
            price: values.price,
            partition: values.partition,
            newPartition: values.newPartition,
            minUnits: values.minUnits,
            maxUnits: values.maxUnits,
            visible: values.visible,
            swapContractAddress: swapContractAddress,
            shareContractId: shareContractId,
            paymentTokenDecimals: paymentTokenDecimals as number,
            offeringId: offeringId,
            isContractOwner: isContractOwner,
            isAsk: isAsk,
            isIssuance: isIssuance,
            isErc20Payment: isErc20Payment,
            setButtonStep: setButtonStep,
            createOrder: createOrder,
            addPartition: addPartition,
            refetchAllContracts,
            refetchOfferingInfo,
          });
          setModal('shareSaleList');
        } catch (e: any) {
          throw new Error(e);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <NewClassInputs partitions={partitions} values={values} />
          <Input
            className={defaultFieldDiv}
            labelText={`Shares to list for sale (${sharesRemaining} available )`}
            name="numShares"
            type="number"
            placeholder="800"
            required
          />
          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={defaultFieldDiv}
              labelText={`Price (${getCurrencyById(paymentTokenAddress)?.symbol})`}
              name="price"
              type="number"
              placeholder="1300"
              required
            />
            <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total sale:">
              <>
                {values.numShares &&
                  `${saleAmountString(values.numShares, values.price)} ${
                    paymentTokenAddress && getCurrencyById(paymentTokenAddress)?.symbol
                  }`}
              </>
            </NonInput>
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Minimum purchase in units"
              name="minUnits"
              type="number"
              placeholder="e.g. 10"
            />
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Maximum purchase in units"
              name="maxUnits"
              type="number"
              placeholder="e.g. 120"
            />
          </div>
          <hr className="my-4" />
          <Checkbox
            fieldClass="text-sm bg-opacity-0 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
            name="visible"
            checked={values.visible}
            sideLabel
            fieldLabelClass="mb-2 text-blue-900 font-semibold text-opacity-80"
            labelText="This sale should be visible to investors"
          />
          <hr className="bg-grey-600 my-3 mb-4" />
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={formButtonText(values) as string}
                submittingText="Creating sale..."
                confirmedText="Confirmed!"
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

export default PostInitialSale;
