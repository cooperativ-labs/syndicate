import Checkbox from '@src/components/form-components/Checkbox';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv, defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import NonInput from '../../form-components/NonInput';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { bytes32FromString, String0x } from '@src/web3/helpersChain';

import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { Maybe, Offering, OfferingParticipant } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';

import { CREATE_ORDER } from '@src/utils/dGraphQueries/orders';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { useAccount, useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

export type PostBidAskFormProps = {
  offering: Offering;
  swapApprovalsEnabled: Maybe<boolean> | undefined;
  partitions: String0x[];
  paymentTokenDecimals: Maybe<number> | undefined;
  myShareQty: number | undefined;
  isContractOwner: boolean;
  sharesOutstanding: number | undefined;
  currentSalePrice: Maybe<number> | undefined;
  refetchOfferingInfo: () => void;
};

type WithAdditionalProps = PostBidAskFormProps & {
  walletAddress: string;
  swapContractAddress: String0x;
  offeringMin: Maybe<number> | undefined;
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
  offeringMin,
  sharesOutstanding,
  currentSalePrice,
  setModal,
  refetchAllContracts,
  refetchOfferingInfo,
}) => {
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const [isAsk, setIsAsk] = useState<boolean>(true);
  const [createOrder, { data, error }] = useMutation(CREATE_ORDER);
  const { name, details, documents, offeringEntity } = offering;
  const sharesIssued = details?.numUnits;

  const sharesUnissued = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });
  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnits: string, price: Maybe<number> | undefined) => {
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
          toc: false,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          const { numUnits, price, approvalRequired, minUnits, maxUnits, toc } = values;
          if (!numUnits) {
            errors.numUnits = `You must choose a number of shares to ${isAsk ? 'sell' : 'buy'}.`;
          }

          if (isContractOwner) {
            if (maxUnits && numUnits && maxUnits > numUnits) {
              errors.maxUnits = 'Maximum must be less then the total shares listed for sale';
            }
            if ((maxUnits && minUnits && maxUnits < 1) || (maxUnits && minUnits && maxUnits < minUnits)) {
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
            errors.approvalRequired = 'You must confirm that you understand that offerer approval is required.';
          }
          if (!isContractOwner && toc === false) {
            errors.toc = "You must accept this offering's Terms & Conditions";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const isIssuance = false;
          const isErc20Payment = true;
          if (!values.numUnits || !values.price) {
            setSubmitting(false);
            return;
          }
          await submitSwap({
            numShares: values.numUnits,
            price: values.price,
            partition: values.partition,
            minUnits: values.minUnits,
            maxUnits: values.maxUnits,
            swapContractAddress: swapContractAddress,
            visible: !swapApprovalsEnabled,
            toc: values.toc,
            paymentTokenDecimals: paymentTokenDecimals as number,
            offeringId: offering.id,
            isContractOwner: isContractOwner,
            isAsk: isAsk,
            isIssuance: isIssuance,
            isErc20Payment: isErc20Payment,
            setButtonStep: setButtonStep,
            createOrder: createOrder,
            refetchAllContracts,
            refetchOfferingInfo,
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
                <div className={defaultFieldLabelClass}>{`${isAsk ? 'Selling' : 'Buying'} wallet:`}</div>
                <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="font-semibold" />
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
                        details?.investmentCurrency && getCurrencyOption(details?.investmentCurrency)?.symbol
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
                            details?.investmentCurrency && getCurrencyOption(details?.investmentCurrency)?.symbol
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
                              onClick={(e) => {
                                e.preventDefault();
                                setTocOpen(!tocOpen);
                              }}
                            >
                              <div className="flex text-left">
                                {`I accept this offering's Terms and Conditions`}
                                <div className="ml-2">
                                  {tocOpen ? (
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
                      {tocOpen && documents && (
                        <div className="my-2 p-4 rounded-md bg-slate-100">
                          <PresentLegalText text={documents[0]?.text} />
                          <div className="flex">
                            <StandardButton
                              className="mt-5"
                              outlined
                              onClick={(e) => {
                                e.preventDefault();
                                DownloadFile(documents[0]?.text as string, `${name} - Terms & Conditions.md`);
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
                      <div className="mb-5">
                        <Checkbox
                          fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                          fieldLabelClass="font-bold text-sm text-gray-600"
                          name="approvalRequired"
                          checked={values.approvalRequired}
                          sideLabel
                          labelText={`I understand that this ${isAsk ? 'sale' : 'purchase'} requires approval from ${
                            offeringEntity?.legalName
                          }.`}
                        />
                      </div>
                    </>
                  )}
                  <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
                    <LoadingButtonText
                      state={buttonStep}
                      idleText={`${
                        isContractOwner
                          ? `${isAsk ? 'Sell' : 'Propose to purchase'}`
                          : `Propose ${isAsk ? 'sale' : 'purchase'} of`
                      } ${values.numUnits ?? ''} shares ${
                        values.numUnits
                          ? `for ${saleAmountString(values.numUnits, values.price)} ${
                              getCurrencyOption(details?.investmentCurrency)?.symbol
                            } `
                          : ''
                      }`}
                      step1Text="Creating sale..."
                      confirmedText="Confirmed!"
                      failedText="Transaction failed"
                      rejectedText="You rejected the transaction. Click here to try again."
                    />
                  </FormButton>
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
