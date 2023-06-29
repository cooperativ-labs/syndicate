import axios from 'axios';
import Checkbox from '@src/components/form-components/Checkbox';
import cn from 'classnames';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '../../form-components/NonInput';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import React, { FC, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { floatWithCommas, numberWithCommas } from '@src/utils/helpersMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { Offering, ShareOrder } from 'types';

import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { useAccount } from 'wagmi';
import { isMetaMask } from '@src/web3/connectors';

import { useAsync } from 'react-use';

export type SharePurchaseRequestProps = {
  offering: Offering;
  order: ShareOrder;
  isAskOrder: boolean;
  price: number;
  txnApprovalsEnabled: boolean;
  shareQtyRemaining: number;
};

type AdditionalSharePurchaseRequestProps = SharePurchaseRequestProps & {
  myBacBalance: string | undefined;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => Promise<void>;
};

const SharePurchaseRequest: FC<AdditionalSharePurchaseRequestProps> = ({
  offering,
  isAskOrder,
  order,
  price,
  myBacBalance,
  txnApprovalsEnabled,
  shareQtyRemaining,
  callFillOrder,
}) => {
  const { connector } = useAccount();

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disclosuresOpen, setDisclosuresOpen] = useState<boolean>(false);
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  const standardSaleDisclosures = `/assets/order/disclosures.md`;
  const getStandardSaleDisclosuresText = async (): Promise<string> =>
    axios.get(standardSaleDisclosures).then((resp) => resp.data);
  const { value: standardSaleDisclosuresText } = useAsync(getStandardSaleDisclosuresText, []);

  const purchaseCalculator = (numUnits: number) => {
    return numUnits * price;
  };

  const purchaseString = (numUnitsPurchase: string | undefined) => {
    if (!numUnitsPurchase) return '0';
    return numberWithCommas(purchaseCalculator(parseInt(numUnitsPurchase, 10)));
  };

  const handlePurchaseSaleRequest = async (values: any) => {
    const amountToBuySell = values.numUnitsPurchase;
    callFillOrder({ amount: amountToBuySell, setButtonStep });
  };

  const formButtonText = (numUnitsPurchase: string) => {
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const action = isAskOrder ? 'purchase' : 'sell';
    const mainText = txnApprovalsEnabled ? `Request to ${action}` : `${capitalizeFirstLetter(action)}`;

    return `${mainText} ${numUnitsPurchase ?? ''} shares ${
      numUnitsPurchase
        ? `for ${purchaseString(numUnitsPurchase)} ${getCurrencyOption(offering.details?.investmentCurrency)?.symbol} `
        : ''
    }`;
  };

  return (
    <>
      {!txnApprovalsEnabled && (
        <WalletActionModal
          open={buttonStep === 'step1' || buttonStep === 'step2'}
          metaMaskWarning={isMetaMask(connector)}
        >
          <WalletActionIndicator
            step={buttonStep}
            step1Text="Setting contract allowance"
            step1SubText="This will allow the contract to spend your tokens on your behalf"
            step2Text="Executing trade"
            step2SubText="This will execute the trade and purchase the shares"
          />
        </WalletActionModal>
      )}

      <Formik
        initialValues={{
          numUnitsPurchase: '',
          disclosures: false,
          toc: false,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          const numUnitsPurchase = parseInt(values.numUnitsPurchase, 10);
          if (!values.numUnitsPurchase) {
            errors.numUnitsPurchase = 'You must choose a number of shares to purchase.';
          }
          if (numUnitsPurchase && numUnitsPurchase > shareQtyRemaining) {
            errors.numUnitsPurchase = `There are only ${shareQtyRemaining} for sale.`;
          }
          if (order.minUnits) {
            if (numUnitsPurchase && numUnitsPurchase < order.minUnits) {
              errors.numUnitsPurchase = `You must purchase at least ${order.minUnits} shares.`;
            } else if (numUnitsPurchase && order.maxUnits && numUnitsPurchase > order.maxUnits) {
              errors.numUnitsPurchase = `You cannot purchase more than ${order.maxUnits} shares`;
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
          if (values.numUnitsPurchase === '') return;
          setSubmitting(true);
          handlePurchaseSaleRequest(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <div className="md:grid grid-cols-3 gap-3">
              <Input
                className={cn(defaultFieldDiv, 'col-span-2')}
                labelText={`How many units would you like to ${isAskOrder ? 'purchase' : 'sell'}? ${
                  isAskOrder ? `(${shareQtyRemaining} available)` : ''
                }`}
                name="numUnitsPurchase"
                type="number"
                placeholder="e.g. 80"
                required
              />
              <NonInput
                className={`${defaultFieldDiv} col-span-1 pl-1`}
                labelText={`${isAskOrder ? 'Purchase' : 'Sale'} Price:`}
              >
                <>
                  {values.numUnitsPurchase &&
                    `${purchaseString(values.numUnitsPurchase)} ${
                      offering.details?.investmentCurrency &&
                      getCurrencyOption(offering.details?.investmentCurrency)?.symbol
                    }`}
                </>
              </NonInput>
              <div className="col-span-2" />
              <div className="col-span-1 text-xs pl-2">{`Current balance: ${floatWithCommas(
                myBacBalance as string
              )}`}</div>
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
                      {`I have read this offering's Risks & Considerations`}
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
                        standardSaleDisclosuresText as string,
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
                      <div className="">{`I accept this offering's Terms and Conditions`}</div>
                      <div className="ml-2">
                        {tocOpen ? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}
                      </div>
                    </div>
                  </button>
                }
              />
            </div>
            {tocOpen && !!offering.documents && (
              <div className="my-2 p-4 rounded-md bg-slate-100">
                <PresentLegalText text={offering.documents[0]?.text} />
                <div className="flex">
                  <StandardButton
                    className="mt-5"
                    outlined
                    onClick={(e) => {
                      e.preventDefault();
                      //@ts-ignore
                      DownloadFile(offering.documents[0]?.text as string, `${offering.name} - Terms & Conditions.md`);
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
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={formButtonText(values.numUnitsPurchase)}
                step1Text={txnApprovalsEnabled ? 'Submitting request' : 'Setting contract allowance...'}
                step2Text="Executing transaction..."
                confirmedText="Executed!"
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
