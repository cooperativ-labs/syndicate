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
import { CREATE_SALE, DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, OfferingParticipant } from 'types';

import { submitSwap } from '@src/web3/contractSwapCalls';
import { useAccount, useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

type PostAskFormProps = {
  offering: Offering;
  swapContractAddress: String0x;
  partitions: String0x[];
  paymentTokenAddress: String0x;
  walletAddress: string;
  myShares: number;
  permittedEntity: OfferingParticipant;
  isContractOwner: boolean;
  offeringMin: number;
  sharesOutstanding: number;
  currentSalePrice: number;
  setModal: (x: boolean) => void;
  refetchAllContracts: () => void;
};

const PostAskForm: FC<PostAskFormProps> = ({
  offering,
  walletAddress,
  swapContractAddress,
  partitions,
  paymentTokenAddress,
  myShares,
  permittedEntity,
  isContractOwner,
  offeringMin,
  sharesOutstanding,
  currentSalePrice,
  setModal,
  refetchAllContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const [createSale, { data, error }] = useMutation(CREATE_SALE);
  const [deleteSaleObject, { data: dataDelete, error: errorDelete }] = useMutation(DELETE_SALE);
  const { id, name, details, documents, offeringEntity } = offering;
  const sharesIssued = details?.numUnits;

  const outstanding = sharesOutstanding ?? 0;
  const sharesUnissued = sharesIssued - outstanding;

  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnitsToSell, price) => {
    return numberWithCommas(offerCalculator(parseInt(numUnitsToSell, 10), price));
  };

  return (
    <>
      <Formik
        initialValues={{
          numUnitsToSell: null,
          price: currentSalePrice,
          approvalRequired: false,
          minUnits: undefined,
          maxUnits: undefined,
          partition: partitions[0],
          toc: true,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.numUnitsToSell) {
            errors.numUnitsToSell = 'You must choose a number of shares to sell.';
          }
          if (isContractOwner) {
            if (values.maxUnits > values.numUnitsToSell) {
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
          } else if (values.numUnitsToSell > myShares) {
            errors.numUnitsToSell = `You cannot sell more than ${myShares} shares.`;
            if (!values.approvalRequired) {
              errors.approvalRequired = 'You must confirm that you understand that offerer approval is required.';
            }
            if (values.toc === true) {
              errors.toc = "You must accept this offering's Terms & Conditions";
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const isAsk = true;
          const isIssuance = false;
          const isErc20Payment = true;
          await submitSwap({
            numShares: values.numUnitsToSell,
            price: values.price,
            partition: values.partition,
            minUnits: values.minUnits,
            maxUnits: values.maxUnits,
            swapContractAddress: swapContractAddress,
            visible: false,
            toc: values.toc,
            bacDecimals: getCurrencyById(paymentTokenAddress).decimals,
            offeringId: offering.id,
            isContractOwner: isContractOwner,
            isAsk: isAsk,
            isIssuance: isIssuance,
            isErc20Payment: isErc20Payment,
            setButtonStep: setButtonStep,
            createSale: createSale,
            refetchAllContracts,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <div className="mt-4 mb-2">
              <div className={defaultFieldLabelClass}> Selling wallet:</div>
              <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="font-semibold" />
            </div>
            <div className="mt-4 mb-2">
              <div className={defaultFieldLabelClass}> Selling entity:</div>
              <div className="font-semibold"> {permittedEntity?.name}</div>
            </div>
            <hr className="my-6" />
            {!isContractOwner && myShares < 1 ? (
              <div>You do not have any shares to sell </div>
            ) : (
              <>
                <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Sale`}</h2>
                {/* <OfferingSummaryPanel offering={offering} /> */}
                <div className="md:grid grid-cols-3 gap-3">
                  <Input
                    className={cn(defaultFieldDiv, 'col-span-2')}
                    labelText={`How many shares would you like to sell? (${
                      isContractOwner ? sharesUnissued : myShares
                    } available)`}
                    name="numUnitsToSell"
                    type="number"
                    placeholder="e.g. 80"
                    required
                  />
                  <Input
                    className={cn(defaultFieldDiv, 'col-span-2')}
                    labelText={`At what price per share? (${
                      details.investmentCurrency && getCurrencyOption(details.investmentCurrency).symbol
                    })`}
                    name="price"
                    type="number"
                    placeholder="e.g. 200"
                    required
                  />
                  <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total Sale:">
                    <>
                      {values.numUnitsToSell &&
                        `${saleAmountString(values.numUnitsToSell, values.price)} ${
                          details.investmentCurrency && getCurrencyOption(details.investmentCurrency).symbol
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
                              {permittedEntity?.name} {`accepts this offering's Terms and Conditions`}
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
                    {tocOpen && (
                      <div className="my-2 p-4 rounded-md bg-slate-100">
                        <PresentLegalText text={documents[0].text} />
                        <div className="flex">
                          <StandardButton
                            className="mt-5"
                            outlined
                            onClick={(e) => {
                              e.preventDefault();
                              DownloadFile(documents[0].text, `${name} - Terms & Conditions.md`);
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
                        labelText={`${permittedEntity?.name} understands that this sale requires approval from ${offeringEntity.legalName}.`}
                      />
                    </div>
                  </>
                )}
                <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
                  <LoadingButtonText
                    state={buttonStep}
                    idleText={`${isContractOwner ? 'Sell' : 'Propose sale of'} ${values.numUnitsToSell ?? ''} shares ${
                      values.numUnitsToSell
                        ? `for ${saleAmountString(values.numUnitsToSell, values.price)} ${
                            getCurrencyOption(details.investmentCurrency).symbol
                          } `
                        : ''
                    }`}
                    submittingText="Creating sale..."
                    confirmedText="Confirmed!"
                    failedText="Transaction failed"
                    rejectedText="You rejected the transaction. Click here to try again."
                  />
                </FormButton>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PostAskForm;
