import * as backendCtc from '../../web3/index.main';
import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import PresentLegalText from './PresentLegalText';
import React, { FC, useContext, useState } from 'react';
import router from 'next/router';
import { ADD_LEGAL_SHARE_LINK, ADD_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { ReachContext } from '@src/SetReachContext';
import { sha256 } from 'js-sha256';
import { LegalEntity, SmartContract } from 'types';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useMutation } from '@apollo/client';

type LinkLegalFormProps = {
  setAgreementContent: any;
  availableContract: SmartContract;
  bacValue: string;
  bacName: string;
  bacId: string;
  agreement: string;
  spvEntityName: string;
  offeringId: string;
  entityId: string;
};

const LinkLegalForm: FC<LinkLegalFormProps> = ({
  setAgreementContent,
  availableContract,
  bacValue,
  bacName,
  bacId,
  agreement,
  spvEntityName,
  offeringId,
  entityId,
}) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { reachAcc, userWalletAddress } = useContext(ReachContext);
  const [addLegalLink, { data: agreementData, error: agreementError }] = useMutation(ADD_LEGAL_SHARE_LINK);
  const [addOfferingParticipant, { data: participantData, error: participantError }] =
    useMutation(ADD_OFFERING_PARTICIPANT);

  const agreementHash = sha256(agreement);

  if (agreementError && !alerted) {
    alert(`Oops. Looks like something went wrong: ${agreementError.message}`);
    setLoadingModal(false);
    setAlerted(true);
  }

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const docHash = async (values) => {
    const ctc = reachAcc.contract(backendCtc, availableContract.cryptoAddress.address);
    const docTitle = `Token Share Link - ${spvEntityName}`;
    const call = async (f) => {
      try {
        await f();
        await addLegalLink({
          variables: {
            currentDate: currentDate,
            documentOfferingUniqueId: offeringId + docTitle,
            offeringId: offeringId,
            entityId: entityId,
            agreementText: agreement,
            smartContractId: availableContract.id,
            // minUnits: values.minUnits,
            // priceStart: parseInt(values.initialPrice, 10),
            // maxRaise: values.numUnits * parseInt(values.initialPrice, 10),
            agreementTitle: docTitle,
            signature: values.signature,
          },
        });
        await addOfferingParticipant({
          variables: {
            currentDate: currentDate,
            addressOfferingId: userWalletAddress + offeringId,
            offeringId: offeringId,
            name: spvEntityName,
            applicantId: entityId,
            walletAddress: userWalletAddress,
            permitted: false,
          },
        });

        setButtonStep('confirmed');
        router.push(`/offerings/${offeringId}`);
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    };
    const apis = ctc.a;
    call(async () => {
      const apiReturn = await apis.docHash(agreementHash);
      return apiReturn;
    });
  };

  return (
    <div className="bg-gray-100 pt-8 p-4 md:p-8 min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 ">
      <Formik
        initialValues={{
          signature: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          // setAgreementContent(spvEntityName, gpEntityName, bacName, bacId, chainName, values.signature);
          setAgreementContent({ signature: values.signature });

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setAlerted(false);
          setSubmitting(true);
          setButtonStep('submitting');
          setLoadingModal(true);
          await docHash(values);
          setSubmitting(false);
          setLoadingModal(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col">
            <div className="md:hidden">
              <PresentLegalText text={agreement} />
            </div>
            <Input
              className={defaultFieldDiv}
              name="signature"
              type="text"
              placeholder="e.g. Type your full legal name to sign"
              labelText="Signature"
              required
            />
            <div className="text-sm text-blue-900 font-semibold text-opacity-80 mt-4">SHA-256 Hash</div>
            <div className="text-sm break-all">{agreementHash}</div>
            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4"
            >
              <LoadingButtonText
                state={buttonStep}
                idleText="Sign"
                submittingText="Signing (this could take a sec)"
                confirmedText="Confirmed!"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </FormButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LinkLegalForm;
