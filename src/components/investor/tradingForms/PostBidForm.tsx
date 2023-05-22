import * as backendCtc from '../../../web3/ABI';

import Checkbox from '@src/components/form-components/Checkbox';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv, defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import NonInput from '../../form-components/NonInput';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { CREATE_SALE } from '@src/utils/dGraphQueries/offering';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, OfferingParticipant, OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';

import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAsync, useAsyncFn } from 'react-use';
import { useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

type PostBidFormProps = {
  offering: Offering;
  shareContractId: string;
  walletAddress: string;
  offeringMin: number;
  permittedEntity: OfferingParticipant;
  setModal: (boolean) => void;
  setRecallContract: Dispatch<SetStateAction<string>>;
};

// THIS FORM IS UNUSED AT THIS TIME BECAUSE WE DON'T OFFER A BID FUNCTION YET

const PostBidForm: FC<PostBidFormProps> = ({
  offering,
  walletAddress,
  shareContractId,
  offeringMin,
  permittedEntity,
  setModal,
  setRecallContract,
}) => {
  const { reachLib } = useContext(ReachContext);
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const [createBidObject, { data, error }] = useMutation(CREATE_SALE);

  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };

  const saleAmountString = (numUnitsToBid, price) => {
    return numberWithCommas(offerCalculator(parseInt(numUnitsToBid, 10), price));
  };

  const [, submitOffer] = useAsyncFn(async (numShares: number, price: number) => {
    setButtonStep('submitting');
    // const reach = await loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
    // reach.setWalletFallback(reach.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
    const acc = await reachLib.getDefaultAccount();
    const ctc = acc.contract(backendCtc, shareContractId);
    const call = async (f) => {
      try {
        if (numShares > offeringMin) {
          throw Error;
        }
        // await f();
        await createBidObject({
          variables: {
            currentDate: currentDate,
            offeringId: offering.id,
            smartshareContractId: shareContractId,
            isBid: true,
            creator: permittedEntity.id,
            numShares: numShares,
            price: price,
            visible: true,
          },
        });
        setButtonStep('confirmed');
        setRecallContract('submitPurchase');
        alert(`You have purchased ${numShares} shares.`);
        setModal(false);
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    };
    // const apis = ctc.a;
    // call(async () => {
    //   const apiReturn = await apis.buyOS(loadStdlib(process.env).parseCurrency(numShares));
    //   return apiReturn;
    // });
  });

  return (
    <>
      <Formik
        initialValues={{
          numUnitsToBid: null,
          price: null,
          approvalRequired: false,
          toc: false,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.numUnitsToBid) {
            errors.numUnitsToBid = 'You must choose a number of shares for which to bid.';
          } else if (values.numUnitsToBid > offeringMin) {
            errors.numUnitsToBid = `You cannot bid for less than ${offeringMin} shares.`;
          }
          if (!values.approvalRequired) {
            errors.approvalRequired = 'You must confirm that you understand that offerer approval is required.';
          }
          if (!values.toc) {
            errors.toc = "You must accept this offering's Terms & Conditions";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await submitOffer(values.numUnitsToBid, values.price);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <div className="mt-4 mb-2">
              <div className={defaultFieldLabelClass}> Bidding wallet:</div>
              <FormattedCryptoAddress chainId={chainId} address={walletAddress} className="font-semibold" />
            </div>
            <div className="mt-4 mb-2">
              <div className={defaultFieldLabelClass}> Bidding entity:</div>
              <div className="font-semibold"> {permittedEntity?.name}</div>
            </div>
            <hr className="my-6" />
            <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Bid`}</h2>
            <div className="md:grid grid-cols-3 gap-3">
              <Input
                className={cn(defaultFieldDiv, 'col-span-2')}
                labelText="How many units would you like to bid for?"
                name="numUnitsToBid"
                type="number"
                placeholder="e.g. 80"
                required
              />
              <Input
                className={cn(defaultFieldDiv, 'col-span-2')}
                labelText={`At what price per share? ${
                  offering.details.investmentCurrency && getCurrencyOption(offering.details.investmentCurrency).symbol
                }`}
                name="price"
                type="number"
                placeholder="e.g. 200"
                required
              />
              <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total Sale:">
                <>
                  {values.numUnitsToBid &&
                    `${saleAmountString(values.numUnitsToBid, values.price)} ${
                      offering.details.investmentCurrency &&
                      getCurrencyOption(offering.details.investmentCurrency).symbol
                    }`}
                </>
              </NonInput>
              <div className="col-span-2" />
              {/* <div className="col-span-1 text-xs pl-2">{`Current balance: ${numberWithCommas(myBacBalance)}`}</div> */}
            </div>
            <hr className="my-6" />

            {/* TOC SECTION */}
            <div className="mb-3">
              <Checkbox
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                name="toc"
                checked={values.toc}
                sideLabel
                labelText={
                  <button
                    className="text-sm text-gray-700 hover:underline "
                    aria-label="review application"
                    onClick={(e) => {
                      e.preventDefault();
                      setTocOpen(!tocOpen);
                    }}
                  >
                    <div className="flex">
                      {permittedEntity?.name} {`accepts this offering's Terms and Conditions`}
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
            <div className="mb-5">
              <Checkbox
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-non"
                fieldLabelClass="font-bold text-sm text-gray-600"
                name="approvalRequired"
                checked={values.approvalRequired}
                sideLabel
                labelText={`${permittedEntity?.name} understands that this sale requires approval from ${offering.offeringEntity.legalName}.`}
              />
            </div>
            <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
              <LoadingButtonText
                state={buttonStep}
                idleText={`Propose bid for ${values.numUnitsToBid ?? ''} shares ${
                  values.numUnitsToBid
                    ? `for ${saleAmountString(values.numUnitsToBid, values.price)} ${
                        getCurrencyOption(offering.details.investmentCurrency).symbol
                      } `
                    : ''
                }`}
                submittingText="Creating bid..."
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

export default PostBidForm;
