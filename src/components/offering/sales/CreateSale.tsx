import * as backendCtc from '../../../web3/ABI';
import Checkbox from '@src/components/form-components/Checkbox';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { CREATE_SALE } from '@src/utils/dGraphQueries/offering';
import { Currency, OfferingParticipant } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MakePeraConnect as MakePeraConnect } from '@reach-sh/stdlib';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ReachContext } from '@src/SetReachContext';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

export type CreateSaleProps = {
  sharesIssued: number;
  sharesOutstanding: number;
  offeringId: string;
  shareContractId: string;
  offeringMin: number;
  priceStart: number;
  currency: Currency;
  refetch: () => void;
  setRecallContract: Dispatch<SetStateAction<string>>;
};
const CreateSale: FC<CreateSaleProps> = ({
  sharesIssued,
  sharesOutstanding,
  offeringId,
  offeringMin,
  priceStart,
  currency,
  shareContractId,
  refetch,
  setRecallContract,
}) => {
  const { reachLib, userWalletAddress } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [createSaleObject, { data, error }] = useMutation(CREATE_SALE);

  if (data) {
    refetch();
  }
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
    return numberWithCommas(saleCalculator(price, parseInt(numShares, 10)));
  };
  const [, createSale] = useAsyncFn(
    async (numShares: number, price: number, minUnits: number, maxUnits: number, visible: boolean) => {
      setButtonStep('submitting');
      // const reach = await loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
      reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MakePeraConnect }));
      const acc = await reachLib.getDefaultAccount();
      const ctc = acc.contract(backendCtc, shareContractId);
      const call = async (f) => {
        try {
          await f();
          await createSaleObject({
            variables: {
              currentDate: currentDate,
              initiator: userWalletAddress,
              offeringId: offeringId,
              smartshareContractId: shareContractId,
              numShares: numShares,
              minUnits: minUnits,
              maxUnits: maxUnits,
              price: price,
              visible: visible,
            },
          });
          setRecallContract('createSale');
          setButtonStep('confirmed');
        } catch (e) {
          StandardChainErrorHandling(e, setButtonStep);
        }
      };
      const apis = ctc.a;
      call(async () => {
        const apiReturn = await apis.initSwap(loadStdlib(process.env).parseCurrency(numShares), price, true);
        return apiReturn;
      });
    }
  );

  return (
    <Formik
      initialValues={{
        numShares: undefined,
        price: priceStart,
        minUnits: undefined,
        maxUnits: undefined,
        visible: true,
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
        await createSale(values.numShares, values.price, values.minUnits, values.maxUnits, values.visible);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
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
              labelText={`Price (${getCurrencyOption(currency).symbol})`}
              name="price"
              type="number"
              placeholder="1300"
              required
            />
            <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total sale:">
              <>
                {values.numShares &&
                  `${saleString(values.numShares, values.price)} ${currency && getCurrencyOption(currency).symbol}`}
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

export default CreateSale;
