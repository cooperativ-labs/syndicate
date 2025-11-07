'use client';

import { CurrencyCode, CurrencyCodeType, SmartContract } from '@/types';

import { getBaseUrl } from '@src/utils/helpersURL';
import { setDocument } from '@src/web3/contractShareCalls';
import {
  hashBytes32FromString,
  StandardChainErrorHandling,
  String0x
} from '@src/web3/helpersChain';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React, { FC, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';

import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import FormButton from '../buttons/FormButton';
import Input, { defaultFieldDiv } from '../form-components/Inputs';

import PresentLegalText from './PresentLegalText';
import { addLegalShareLink, addOfferingParticipant } from '@src/utils/actions/offeringActions';
import { toast } from 'react-hot-toast';

type LinkLegalFormProps = {
  setAgreementContent: any;
  availableContract: SmartContract;
  bacValue: CurrencyCodeType | undefined;
  bacName: string | undefined;
  bacId: string | undefined;
  agreement: string;
  spvEntityName: string | undefined;
  offeringId: string;
  entityId: string;
};

const LinkLegalForm: FC<LinkLegalFormProps> = ({
  setAgreementContent,
  availableContract,
  agreement,
  spvEntityName,
  offeringId,
  entityId
}) => {
  const router = useRouter();

  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  // const [addLegalLink, { data: agreementData, error: agreementError }] =
  //   useMutation(ADD_LEGAL_SHARE_LINK);
  // const [addOfferingParticipant, { data: participantData, error: participantError }] =
  //   useMutation(ADD_OFFERING_PARTICIPANT);

  const agreementHash = hashBytes32FromString(agreement);

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const createDocHash = async (signature: string) => {
    if (!userWalletAddress) {
      toast.error('Please connect your wallet');
      return;
    }
    setButtonStep('step1');
    const handleEstablish = async () => {
      try {
        await addLegalShareLink({
          documentOfferingUniqueId: offeringId + docTitle,
          offeringId: offeringId,
          entityId: entityId,
          agreementText: agreement,
          smartContractId: availableContract.id,
          // minUnits: values.minUnits,
          // priceStart: parseInt(values.initialPrice, 10),
          // maxRaise: values.numUnits * parseInt(values.initialPrice, 10),
          agreementTitle: docTitle
          // signature: signature
        });
        await addOfferingParticipant({
          addressOfferingId: userWalletAddress + offeringId,
          offeringId: offeringId,
          name: spvEntityName,
          walletAddress: userWalletAddress,
          chainId: chainId
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
      shareContractAddress: availableContract.crypto_address_id as String0x,
      setButtonStep,
      callback: handleEstablish,
      uri
    });
  };

  return (
    <div className="bg-gray-100 pt-8 p-4 md:p-8 min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 ">
      <Formik
        initialValues={{
          signature: ''
        }}
        validate={values => {
          const errors: any = {}; /** @TODO : Shape */
          // setAgreementContent(spvEntityName, gpEntityName, bacName, bacId, chainName, values.signature);
          setAgreementContent({ signature: values.signature });

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
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
            <div className="text-sm text-blue-900 font-semibold text-opacity-80 mt-4">
              Agreement Hash (Keccak-256)
            </div>
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
