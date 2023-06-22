import axios from 'axios';
import Checkbox from '@src/components/form-components/Checkbox';
import cn from 'classnames';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '../../form-components/NonInput';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import React, { FC, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { acceptOrder, setAllowance } from '@src/web3/contractSwapCalls';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { floatWithCommas, numberWithCommas } from '@src/utils/helpersMoney';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { Offering, ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';

import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import { getIsAllowanceSufficient } from '@src/utils/helpersAllowance';
import { isMetaMask } from '@src/web3/connectors';
import { toNormalNumber } from '@src/web3/util';
import { useAsync } from 'react-use';

export type SharePurchaseRequestProps = {
  offering: Offering;
  order: ShareOrder;
  price: number;
  swapContractAddress: String0x;
  txnApprovalsEnabled: boolean;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  refetchAllContracts: () => void;
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
  order,
  price,
  myBacBalance,
  swapContractAddress,
  txnApprovalsEnabled,
  paymentTokenAddress,
  paymentTokenDecimals,
  refetchAllContracts,
  callFillOrder,
}) => {
  const { address: userWalletAddress, connector } = useAccount();

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

  //ABSTRACT THE ALLOWANCE BIT

  const { data: allowanceData, refetch } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress],
  });

  // ABSTRACT THIS OUT

  const handleAllowance = async (allowanceRequiredForPurchase: number) => {
    await setAllowance({
      paymentTokenAddress,
      paymentTokenDecimals,
      spenderAddress: swapContractAddress,
      amount: allowanceRequiredForPurchase,
      setButtonStep,
    });
    refetch();
  };

  const handlePurchaseRequest = async (values: any) => {
    const amountToBuy = values.numUnitsPurchase;
    if (txnApprovalsEnabled) {
      setButtonStep('step1');
      await acceptOrder({
        swapContractAddress: swapContractAddress,
        contractIndex: order.contractIndex,
        amount: amountToBuy,
        offeringId: offering.id,
        organization: offering.offeringEntity?.organization,
        refetchAllContracts: refetchAllContracts,
        setButtonStep: setButtonStep,
      });
    } else {
      const allowance = toNormalNumber(allowanceData, paymentTokenDecimals);
      const allowanceRequiredForPurchase = amountToBuy * price;
      const isAllowanceSufficient = getIsAllowanceSufficient(allowance, allowanceRequiredForPurchase);
      if (!isAllowanceSufficient) {
        setButtonStep('step1');
        await handleAllowance(allowanceRequiredForPurchase);
        setButtonStep('step2');
        await callFillOrder({
          amount: amountToBuy,
          setButtonStep: setButtonStep,
        });
        setButtonStep('confirmed');
      } else if (isAllowanceSufficient) {
        setButtonStep('step2');
        await callFillOrder({
          amount: amountToBuy,
          setButtonStep: setButtonStep,
        });
        setButtonStep('confirmed');
      }
    }
    setButtonStep('idle');
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
          if (!values.numUnitsPurchase) {
            const numUnitsPurchase = parseInt(values.numUnitsPurchase, 10);
            errors.numUnitsPurchase = 'You must choose a number of shares to purchase.';
            if (order.minUnits) {
              if (numUnitsPurchase && numUnitsPurchase < order.minUnits) {
                errors.numUnitsPurchase = `You must purchase at least ${order.minUnits} shares.`;
              } else if (numUnitsPurchase && order.maxUnits && numUnitsPurchase > order.maxUnits) {
                errors.numUnitsPurchase = `You cannot purchase more than ${order.maxUnits} shares`;
              }
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
          handlePurchaseRequest(values);
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
                idleText={`${txnApprovalsEnabled ? 'Request to p' : 'P'}urchase ${
                  values.numUnitsPurchase ?? ''
                } shares ${
                  values.numUnitsPurchase
                    ? `for ${purchaseString(values.numUnitsPurchase)} ${
                        getCurrencyOption(offering.details?.investmentCurrency)?.symbol
                      } `
                    : ''
                }`}
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
