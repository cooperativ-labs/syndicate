import * as backendCtc from '../../../web3/ABI';
import axios from 'axios';
import Checkbox from '@src/components/form-components/Checkbox';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv, defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import NonInput from '../../form-components/NonInput';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, OfferingParticipant, OfferingSale } from 'types';

import { acceptOffer, acceptOrder, completeSwap } from '@src/web3/contractFunctionCalls';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId } from 'wagmi';
import { useAsync, useAsyncFn } from 'react-use';

export type SharePurchaseRequestProps = {
  offering: Offering;
  sale: OfferingSale;
  price: number;
  saleQty: number;
  soldQty: number;
  myBacBalance: number;
  swapContractAddress: String0x;
  permittedEntity: OfferingParticipant;

  setRecallContract: Dispatch<SetStateAction<string>>;
};

const SharePurchaseRequest: FC<SharePurchaseRequestProps> = ({
  offering,
  sale,
  price,
  myBacBalance,
  swapContractAddress,
  permittedEntity,

  setRecallContract,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disclosuresOpen, setDisclosuresOpen] = useState<boolean>(false);
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  const standardSaleDisclosures = `/assets/sale/disclosures.md`;
  const getStandardSaleDisclosuresText = async (): Promise<string> =>
    axios.get(standardSaleDisclosures).then((resp) => resp.data);
  const { value: standardSaleDisclosuresText } = useAsync(getStandardSaleDisclosuresText, []);

  const purchaseCalculator = (numUnits: number) => {
    return numUnits * price;
  };

  const purchaseString = (numUnitsPurchase) => {
    return numberWithCommas(purchaseCalculator(parseInt(numUnitsPurchase, 10)));
  };

  return (
    <>
      <Formik
        initialValues={{
          numUnitsPurchase: null,
          disclosures: false,
          toc: false,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.numUnitsPurchase) {
            errors.numUnitsPurchase = 'You must choose a number of shares to purchase.';
            if (sale.minUnits) {
            } else if (values.numUnitsPurchase < sale.minUnits) {
              errors.numUnitsPurchase = `You must purchase at least ${sale.minUnits} shares.`;
            } else if (values.numUnitsPurchase > sale.maxUnits) {
              errors.numUnitsPurchase = `You cannot purchase more than ${sale.maxUnits} shares`;
            }
          }
          if (!values.disclosures) {
            errors.disclosures = "You must confirm that you have read this offering's disclosures";
          }
          if (!values.toc) {
            errors.toc = "You must accept this offering's Terms & Conditions";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await acceptOrder({
            swapContractAddress: swapContractAddress,
            orderId: sale.orderId,
            amount: values.numUnitsPurchase,
            setButtonStep: setButtonStep,
          });
          // await acceptOffer(swapContractAddress, sale.orderId, setButtonStep);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <div className="md:grid grid-cols-3 gap-3">
              <Input
                className={cn(defaultFieldDiv, 'col-span-2')}
                labelText="How many units would you like to purchase?"
                name="numUnitsPurchase"
                type="number"
                placeholder="e.g. 80"
                required
              />
              <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Purchase Price:">
                <>
                  {values.numUnitsPurchase &&
                    `${purchaseString(values.numUnitsPurchase)} ${
                      offering.details.investmentCurrency &&
                      getCurrencyOption(offering.details.investmentCurrency).symbol
                    }`}
                </>
              </NonInput>
              <div className="col-span-2" />
              <div className="col-span-1 text-xs pl-2">{`Current balance: ${numberWithCommas(myBacBalance)}`}</div>
            </div>
            <hr className="my-6" />
            {/* Disclosures */}
            <div className="mb-3">
              <Checkbox
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                name="disclosures"
                checked={values.disclosures}
                sideLabel
                labelText={
                  <button
                    className="text-sm text-gray-700 hover:underline "
                    aria-label="review application"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisclosuresOpen(!disclosuresOpen);
                      setTocOpen(false);
                    }}
                  >
                    <div className="flex">
                      {permittedEntity?.name} {`has read this offering's Risks & Considerations`}
                      <div className="ml-2">
                        {disclosuresOpen ? (
                          <FontAwesomeIcon icon="chevron-up" />
                        ) : (
                          <FontAwesomeIcon icon="chevron-down" />
                        )}
                      </div>
                    </div>
                  </button>
                }
              />
            </div>
            {disclosuresOpen && (
              <div className="my-2 p-4 rounded-md bg-slate-100">
                <PresentLegalText text={standardSaleDisclosuresText} />
                <div className="flex">
                  <StandardButton
                    className="mt-5"
                    outlined
                    onClick={(e) => {
                      e.preventDefault();
                      DownloadFile(
                        standardSaleDisclosuresText,
                        `${offering.name} - Download Risks & Considerations.md`
                      );
                    }}
                    text="Download Risks & Considerations"
                  />
                  <StandardButton
                    className="md:ml-3 mt-5"
                    outlined
                    onClick={(e) => {
                      e.preventDefault();
                      setDisclosuresOpen(false);
                    }}
                    text="Close"
                  />
                </div>
              </div>
            )}
            {/* TOC SECTION */}
            <div className="mb-5">
              <Checkbox
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                name="toc"
                checked={values.toc}
                sideLabel
                labelText={
                  <button
                    className="text-sm text text-gray-700 hover:underline "
                    aria-label="review application"
                    onClick={(e) => {
                      e.preventDefault();
                      setTocOpen(!tocOpen);
                      setDisclosuresOpen(false);
                    }}
                  >
                    <div className="flex">
                      <div className="">
                        {permittedEntity?.name} {`accepts this offering's Terms and Conditions`}
                      </div>
                      <div className="ml-2">
                        {tocOpen ? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}
                      </div>
                    </div>
                  </button>
                }
              />
            </div>
            {tocOpen && (
              <div className="my-2 p-4 rounded-md bg-slate-100">
                <PresentLegalText text={offering.documents[0].text} />
                <div className="flex">
                  <StandardButton
                    className="mt-5"
                    outlined
                    onClick={(e) => {
                      e.preventDefault();
                      DownloadFile(offering.documents[0].text, `${offering.name} - Terms & Conditions.md`);
                    }}
                    text="Download Terms & Conditions"
                  />
                  <StandardButton
                    className="md:ml-3 mt-5"
                    outlined
                    onClick={(e) => {
                      e.preventDefault();
                      setTocOpen(false);
                    }}
                    text="Close"
                  />
                </div>
              </div>
            )}
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={`Purchase ${values.numUnitsPurchase ?? ''} shares ${
                  values.numUnitsPurchase
                    ? `for ${purchaseString(values.numUnitsPurchase)} ${
                        getCurrencyOption(offering.details.investmentCurrency).symbol
                      } `
                    : ''
                }`}
                submittingText="Purchasing..."
                confirmedText="Confirmed!"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </FormButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SharePurchaseRequest;
