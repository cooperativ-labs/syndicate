import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import PresentLegalText from './PresentLegalText';
import React, { FC, useState } from 'react';
import router from 'next/router';
import { ADD_LEGAL_SHARE_LINK, ADD_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { CurrencyCode, Maybe, SmartContract } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { getBaseUrl } from '@src/utils/helpersURL';
import { hashBytes32FromString, StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { setDocument } from '@src/web3/contractShareCalls';
import { useAccount, useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

type LinkLegalFormProps = {
  setAgreementContent: any;
  availableContract: SmartContract;
  bacValue: CurrencyCode | undefined;
  bacName: string | undefined;
  bacId: string | undefined;
  agreement: string;
  spvEntityName: Maybe<string> | undefined;
  offeringId: string;
  entityId: string;
  organizationId: string;
};

const LinkLegalForm: FC<LinkLegalFormProps> = ({
  setAgreementContent,
  availableContract,
  agreement,
  spvEntityName,
  offeringId,
  entityId,
  organizationId,
}) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [addLegalLink, { data: agreementData, error: agreementError }] = useMutation(ADD_LEGAL_SHARE_LINK);
  const [addOfferingParticipant, { data: participantData, error: participantError }] =
    useMutation(ADD_OFFERING_PARTICIPANT);

  const agreementHash = hashBytes32FromString(agreement);

  if (agreementError && !alerted) {
    alert(`Oops. Looks like something went wrong: ${agreementError.message}`);
    setAlerted(true);
  }

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const createDocHash = async (signature: string) => {
    setButtonStep('step1');
    const handleEstablish = async () => {
      try {
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
            signature: signature,
          },
        });
        await addOfferingParticipant({
          variables: {
            currentDate: currentDate,
            addressOfferingId: userWalletAddress + offeringId,
            offeringId: offeringId,
            name: spvEntityName,
            walletAddress: userWalletAddress,
            chainId: chainId,
          },
        });

        setButtonStep('confirmed');
        router.push(`${getBaseUrl()}/offerings/${offeringId}`);
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    };
    const docTitle = `Token Link Agreement`;
    const uri = `${getBaseUrl()}/offerings/${offeringId}`;

    await setDocument({
      docName: docTitle,
      text: agreement,
      shareContractAddress: availableContract.cryptoAddress.address as String0x,
      setButtonStep,
      callback: handleEstablish,
      uri,
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
          await createDocHash(values.signature);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col">
            <div className="mb-5">
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
            <div className="text-sm text-blue-900 font-semibold text-opacity-80 mt-4">Agreement Hash (Keccak-256)</div>
            <div className="text-sm break-all">{agreementHash}</div>
            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4"
            >
              <LoadingButtonText
                state={buttonStep}
                idleText="Sign"
                step1Text="Signing (check status in your wallet)"
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
