import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NewClassInputs from '@src/components/form-components/NewClassInputs';
import NonInput from '@src/components/form-components/NonInput';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { addContractPartition, AddContractPartitionParams } from '@src/utils/actions/cryptoActions';
import { createOrder, CreateOrderParams, CreateOrderResult } from '@src/utils/actions/orderActions';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { Form, Formik } from 'formik';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAccount } from 'wagmi';
import { PostInitialSaleProps } from './offering-actions-types';

type WithAdditionalProps = PostInitialSaleProps & {
  sharesIssued: number | null;
  priceStart: number | null;
  offeringId: string;
  shareContractId: string;
  swapContractAddress: String0x;
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
  refetchOfferingInfo
}) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const handleCreateOrder = async (params: CreateOrderParams): Promise<CreateOrderResult> => {
    const result = await createOrder(params);
    return result;
  };

  const handleAddPartition = async (params: AddContractPartitionParams) => {
    const result = await addContractPartition(params);
    return result;
  };

  const sharesRemaining = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });

  const formButtonText = (values: { numShares: string }) => {
    const numShares = parseInt(values.numShares, 10);
    if (!sharesIssued) {
      return;
    }
    return `Offer ${
      numShares
        ? `${numShares} out of ${sharesIssued} (${(numShares / sharesIssued) * 100}%) for sale`
        : 'shares'
    } `;
  };

  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnits: string, price: number | undefined) => {
    if (!price) return '0';
    return numberWithCommas(offerCalculator(parseInt(numUnits, 10), price));
  };

  return (
    <Formik
      initialValues={{
        numShares: '',
        price: priceStart,
        minUnits: '',
        maxUnits: '',
        partition: partitions[0],
        newPartition: ''
      }}
      validate={values => {
        const errors: any = {}; /** @TODO : Shape */

        const numShares = parseInt(values.numShares, 10);
        const maxUnits = parseInt(values.maxUnits, 10);
        const minUnits = parseInt(values.minUnits, 10);

        if (!numShares) {
          errors.numShares = 'Please indicate how many shares you want to send';
        } else if (numShares > sharesRemaining) {
          errors.numShares = `You only have ${sharesRemaining} remaining shares to send.`;
        }
        if (maxUnits && numShares && maxUnits > numShares) {
          errors.maxUnits = 'Maximum must be less then the total shares listed for sale';
        }
        if (
          (maxUnits && minUnits && maxUnits < 1) ||
          (maxUnits && minUnits && maxUnits < minUnits)
        ) {
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
        if (!values.numShares || !values.price || !userWalletAddress) {
          setSubmitting(false);
          return;
        }
        try {
          await submitSwap({
            userWalletAddress,
            numShares: parseInt(values.numShares, 10),
            price: values.price,
            partition: values.partition,
            newPartition: values.newPartition,
            minUnits: parseInt(values.minUnits, 10),
            maxUnits: parseInt(values.maxUnits, 10),
            visible: false,
            swapContractAddress: swapContractAddress,
            shareContractId: shareContractId,
            paymentTokenDecimals: paymentTokenDecimals as number,
            offeringId: offeringId,
            isContractOwner: isContractOwner,
            isAsk: isAsk,
            isIssuance: isIssuance,
            isErc20Payment: isErc20Payment,
            setButtonStep: setButtonStep,
            createOrder: handleCreateOrder,
            addPartition: handleAddPartition,
            refetchAllContracts,
            refetchOfferingInfo
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
                  values.price &&
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

          <hr className="bg-grey-600 my-3 mb-4" />
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <LoadingButtonChain
              type="submit"
              disabled={isSubmitting || buttonStep === 'step1'}
              state={buttonStep}
              idleText={formButtonText(values) as string}
              step1Text="Creating sale..."
              confirmedText="Confirmed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PostInitialSale;
