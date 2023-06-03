import Checkbox from '@src/components/form-components/Checkbox';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React, { FC, useState } from 'react';
import { CREATE_SALE } from '@src/utils/dGraphQueries/offering';
import { Currency } from 'types';
import { Form, Formik } from 'formik';
import { getCurrencyById } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { String0x } from '@src/web3/helpersChain';

import NewClassInputs from '@src/components/form-components/NewClassInputs';
import { ADD_CONTRACT_PARTITION } from '@src/utils/dGraphQueries/crypto';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { toContractNumber, toNormalNumber } from '@src/web3/util';
import { useAccount } from 'wagmi';
import { useMutation } from '@apollo/client';

export type PostInitialSaleProps = {
  sharesIssued: number;
  sharesOutstanding: number;
  offeringId: string;
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  offeringMin: number;
  priceStart: number;
  shareContractId: string;
  partitions: String0x[];
};
const PostInitialSale: FC<PostInitialSaleProps> = ({
  sharesIssued,
  sharesOutstanding,
  offeringId,
  offeringMin,
  priceStart,
  swapContractAddress,
  shareContractId,
  paymentTokenAddress,
  partitions,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [createSale, { data, error }] = useMutation(CREATE_SALE);
  const [addPartition, { data: partitionData, error: partitionError }] = useMutation(ADD_CONTRACT_PARTITION);

  const sharesRemaining = sharesIssued - sharesOutstanding;

  const formButtonText = (values) => {
    return `Offer ${
      values.numShares
        ? `${values.numShares} out of ${sharesIssued} (${(values.numShares / sharesIssued) * 100}%) for sale`
        : 'shares'
    } `;
  };

  const saleCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };
  const saleString = (numShares, price: number) => {
    return numberWithCommas(saleCalculator(parseInt(numShares, 10), price));
  };

  // // DECIMAL TEST

  // const tokenDecimals = 18; //both shares and payment token
  // const userEnteredShares = 10;
  // const userEnteredPrice = 15;
  // //userTotal = 150

  // const contractShares = toContractNumber(userEnteredShares, tokenDecimals);
  // console.log({ contractShares });
  // //result = 10000000000000000000n

  // const contractPrice = toContractNumber(userEnteredPrice, tokenDecimals);
  // console.log({ contractPrice });
  // //result = 15000000000000000000n

  // const contractTotal = contractShares * contractPrice;
  // console.log({ contractTotal });
  // //result = 150000000000000000000n

  // const backtoUserTotal = toNormalNumber(contractTotal, tokenDecimals);
  // console.log({ backtoUserTotal });
  // //result = 150

  // //END DECIMAL TEST

  return (
    <Formik
      initialValues={{
        numShares: undefined,
        price: priceStart,
        minUnits: undefined,
        maxUnits: undefined,
        visible: true,
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
        if (values.maxUnits > values.numShares) {
          errors.maxUnits = 'Maximum must be less then the total shares listed for sale';
        }
        if (values.maxUnits < 1 || values.maxUnits < values.minUnits) {
          errors.maxUnits = 'Maximum must be greater than minimum';
        }
        if (values.minUnits < 1 || values.minUnits > values.maxUnits) {
          errors.minUnits = 'Minimum must be less than maximum';
        }
        if (values.minUnits < offeringMin) {
          errors.minUnits = `Must be at least ${offeringMin}`;
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const isContractOwner = true;
        const isAsk = true;
        const isIssuance = true;
        const isErc20Payment = true;
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
          bacDecimals: getCurrencyById(paymentTokenAddress).decimals,
          offeringId: offeringId,
          isContractOwner: isContractOwner,
          isAsk: isAsk,
          isIssuance: isIssuance,
          isErc20Payment: isErc20Payment,
          setButtonStep: setButtonStep,
          createSale: createSale,
          addPartition: addPartition,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <NewClassInputs partitions={partitions} values={values} />
          <Input
            className={defaultFieldDiv}
            labelText={`Number of list for sale (${sharesRemaining} available )`}
            name="numShares"
            type="number"
            placeholder="800"
            required
          />
          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={defaultFieldDiv}
              labelText={`Price (${getCurrencyById(paymentTokenAddress).symbol})`}
              name="price"
              type="number"
              placeholder="1300"
              required
            />
            <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total sale:">
              <>
                {values.numShares &&
                  `${saleString(values.numShares, values.price)} ${
                    paymentTokenAddress && getCurrencyById(paymentTokenAddress).symbol
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
                idleText={formButtonText(values)}
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
