import Checkbox from '@src/components/form-components/Checkbox';
import Input, {
  defaultFieldDiv,
  defaultFieldLabelClass
} from '@src/components/form-components/Inputs';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import { Button } from '@src/components/ui/button';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import { cn } from '@src/lib/utils';
import { getOfferingDocumentsById } from '@src/utils/actions/offeringActions';
import { createOrder } from '@src/utils/actions/orderActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { Form, Formik } from 'formik';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';

import { Document, OfferingFull } from '@/types';

import NonInput from '../../form-components/NonInput';

import { PostBidAskFormProps } from './offering-actions-types';

type WithAdditionalProps = PostBidAskFormProps & {
  walletAddress: string;
  swapContractAddress: String0x;
  offeringMin: number | null;
  documents: Document[] | undefined;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
  refetchAllContracts: () => void;
};

const PostBidAskForm: FC<WithAdditionalProps> = ({
  offering,
  walletAddress,
  swapContractAddress,
  swapApprovalsEnabled,
  partitions,
  paymentTokenDecimals,
  myShareQty,
  isContractOwner,
  sharesOutstanding,
  currentSalePrice,
  documents,
  setModal,
  refetchAllContracts,
  refetchOfferingInfo
}) => {
  if (!paymentTokenDecimals) {
    throw new Error('Payment token decimals are required (PostBidAskForm)');
  }
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const [isAsk, setIsAsk] = useState<boolean>(true);
  const {
    name,
    num_units: sharesIssued,
    investment_currency: investmentCurrency,
    offeringSmartContracts: { shareContract }
  } = offering;

  const sharesUnissued = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });
  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnits: string, price: number | undefined) => {
    if (!price) return '0';
    return numberWithCommas(offerCalculator(parseInt(numUnits, 10), price), 2);
  };

  const showSharesAvailable = `(${myShareQty} available)`;

  return (
    <>
      <Formik
        initialValues={{
          numUnits: null,
          price: currentSalePrice,
          approvalRequired: false,
          minUnits: undefined,
          maxUnits: undefined,
          partition: partitions[0],
          toc: false
        }}
        validate={values => {
          const errors: any = {}; /** @TODO : Shape */
          const { numUnits, price, approvalRequired, minUnits, maxUnits, toc } = values;
          if (!numUnits) {
            errors.numUnits = `You must choose a number of shares to ${isAsk ? 'sell' : 'buy'}.`;
          }

          if (isContractOwner) {
            if (maxUnits && numUnits && maxUnits > numUnits) {
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
          }
          if (isAsk && numUnits && myShareQty && numUnits > myShareQty) {
            errors.numUnits = `You cannot sell more than ${myShareQty} shares.`;
          }
          if (!isAsk && numUnits && sharesUnissued && numUnits > sharesUnissued) {
            errors.numUnits = `You cannot buy more than ${sharesUnissued} shares.`;
          }

          if (!isContractOwner && !approvalRequired) {
            errors.approvalRequired =
              'You must confirm that you understand that offerer approval is required.';
          }
          if (!isContractOwner && toc === false) {
            errors.toc = "You must accept this offering's Terms & Conditions";
          }
          console.log(errors);
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const isIssuance = false;
          const isErc20Payment = true;
          if (!values.numUnits || !values.price || !userWalletAddress) {
            setSubmitting(false);
            return;
          }
          await submitSwap({
            userWalletAddress,
            shareContractId: shareContract.id.toString(),
            numShares: values.numUnits,
            price: values.price,
            partition: values.partition,
            minUnits: values.minUnits,
            maxUnits: values.maxUnits,
            swapContractAddress: swapContractAddress,
            visible: !swapApprovalsEnabled,
            toc: values.toc,
            paymentTokenDecimals: paymentTokenDecimals as number,
            offeringId: offering.id.toString(),
            isContractOwner: isContractOwner,
            isAsk: isAsk,
            isIssuance: isIssuance,
            isErc20Payment: isErc20Payment,
            setButtonStep: setButtonStep,
            createOrder: createOrder,
            refetchAllContracts,
            refetchOfferingInfo
          });
          setModal('shareSaleList');

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <>
            <Button className="w-full p-2 border-2 rounded-md" onClick={() => setIsAsk(!isAsk)}>
              {`Switch to ${isAsk ? 'Bid' : 'Ask'}`}
            </Button>

            <Form className="">
              <div className="mt-4 mb-2">
                <div
                  className={defaultFieldLabelClass}
                >{`${isAsk ? 'Selling' : 'Buying'} wallet:`}</div>
                <FormattedCryptoAddress
                  chainId={chainId}
                  address={walletAddress}
                  className="font-semibold"
                />
              </div>
              <hr className="my-6" />
              {!isContractOwner && myShareQty && myShareQty < 1 && isAsk ? (
                <div>You do not have any shares to sell </div>
              ) : (
                <>
                  <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`${isAsk ? 'Sale' : 'Purchase'}`}</h2>
                  {/* <OfferingSummaryPanel offering={offering} /> */}
                  <div className="md:grid grid-cols-3 gap-3">
                    <Input
                      className={cn(defaultFieldDiv, 'col-span-2')}
                      labelText={`How many shares would you like to ${
                        isAsk ? `sell? ${showSharesAvailable}` : 'buy?'
                      } `}
                      name="numUnits"
                      type="number"
                      placeholder="e.g. 80"
                      required
                    />
                    <Input
                      className={cn(defaultFieldDiv, 'col-span-2')}
                      labelText={`At what price per share? (${
                        investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                      })`}
                      name="price"
                      type="number"
                      placeholder="e.g. 2000"
                      required
                    />
                    <NonInput
                      className={`${defaultFieldDiv} col-span-1 pl-1`}
                      labelText={`Total ${isAsk ? 'Sale' : 'Purchase'}:`}
                    >
                      <>
                        {values.numUnits &&
                          `${saleAmountString(values.numUnits, values.price)} ${
                            investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                          }`}
                      </>
                    </NonInput>
                  </div>
                  <hr className="my-6 mt-8" />
                  {isContractOwner && (
                    <div>
                      <div className="grid md:grid-cols-2 gap-3 my-6">
                        <Input
                          className={`${defaultFieldDiv} col-span-1`}
                          labelText="Minimum purchase in shares"
                          name="minUnits"
                          type="number"
                          placeholder="e.g. 10"
                        />
                        <Input
                          className={`${defaultFieldDiv} col-span-1`}
                          labelText="Maximum purchase in shares"
                          name="maxUnits"
                          type="number"
                          placeholder="e.g. 120"
                        />
                      </div>
                      <hr className="my-6 mt-8" />{' '}
                    </div>
                  )}

                  {/* TOC SECTION */}
                  {!isContractOwner && (
                    <>
                      <div className="mb-3">
                        <Checkbox
                          fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                          name="toc"
                          checked={values.toc}
                          sideLabel
                          labelText={
                            <button
                              className="text-sm  text-gray-700 hover:underline "
                              aria-label="review application"
                              onClick={e => {
                                e.preventDefault();
                                setTocOpen(!tocOpen);
                              }}
                            >
                              <div className="flex text-left">
                                {`I accept this offering's Terms and Conditions`}
                                <div className="ml-2">
                                  {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                              </div>
                            </button>
                          }
                        />
                      </div>
                      {tocOpen && documents && (
                        <div className="my-2 p-4 rounded-md bg-slate-100">
                          <PresentLegalText text={documents[0]?.text} />
                          <div className="flex">
                            <Button
                              variant="outline"
                              className="mt-5"
                              onClick={e => {
                                e.preventDefault();
                                DownloadFile(
                                  documents[0]?.text as string,
                                  `${name} - Terms & Conditions.md`
                                );
                              }}
                            >
                              Download Terms & Conditions
                            </Button>
                            <Button
                              variant="outline"
                              className="md:ml-3 mt-5"
                              onClick={e => {
                                e.preventDefault();
                                setTocOpen(false);
                              }}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="mb-5">
                        <Checkbox
                          fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                          fieldLabelClass="font-bold text-sm text-gray-600"
                          name="approvalRequired"
                          checked={values.approvalRequired}
                          sideLabel
                          labelText={`I understand that this ${isAsk ? 'sale' : 'purchase'} requires approval from ${
                            offering.legalEntity.legal_name
                          }.`}
                        />
                      </div>
                    </>
                  )}

                  <LoadingButtonChain
                    type="submit"
                    disabled={isSubmitting || buttonStep === 'step1'}
                    state={buttonStep}
                    idleText={`${
                      isContractOwner
                        ? `${isAsk ? 'Sell' : 'Propose to purchase'}`
                        : `Propose ${isAsk ? 'sale' : 'purchase'} of`
                    } ${values.numUnits ?? ''} shares ${
                      values.numUnits
                        ? `for ${saleAmountString(values.numUnits, values.price)} ${
                            investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                          } `
                        : ''
                    }`}
                    step1Text="Creating sale..."
                    confirmedText="Confirmed!"
                    failedText="Transaction failed"
                    rejectedText="You rejected the transaction. Click here to try again."
                  />
                </>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default PostBidAskForm;
