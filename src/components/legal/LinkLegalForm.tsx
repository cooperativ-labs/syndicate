'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { addLegalShareLink, addOfferingParticipant } from '@src/utils/actions/offeringActions';
import { getBaseUrl } from '@src/utils/helpersURL';
import { setDocument } from '@src/web3/contractShareCalls';
import {
  hashBytes32FromString,
  StandardChainErrorHandling,
  String0x
} from '@src/web3/helpersChain';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useChainId, useConnection } from 'wagmi';
import { z } from 'zod';

import {
  CurrencyCode,
  CurrencyCodeType,
  SmartContract,
  SmartContractWithCryptoAddress
} from '@/types';

import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import PresentLegalText from './PresentLegalText';

type LinkLegalFormProps = {
  setAgreementContent: any;
  availableContract: SmartContractWithCryptoAddress;
  bacValue: CurrencyCodeType | undefined;
  bacName: string | undefined;
  bacId: string | undefined;
  agreement: string;
  spvEntityName: string | undefined;
  offeringId: string;
  entityId: string;
};

const signatureSchema = z.object({
  signature: z.string().min(1, 'Signature is required')
});

type SignatureFormValues = z.infer<typeof signatureSchema>;

const LinkLegalForm: FC<LinkLegalFormProps> = ({
  setAgreementContent,
  availableContract,
  agreement,
  spvEntityName,
  offeringId,
  entityId
}) => {
  const router = useRouter();
  const { chosenOrganizationId: organizationId } = useOrganizations();
  const { address: userWalletAddress } = useConnection();
  const chainId = useChainId();

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
          smartContractId: availableContract.crypto_address_id,
          agreementTitle: docTitle
        });
        await addOfferingParticipant({
          addressOfferingId: userWalletAddress + offeringId,
          offeringId: offeringId,
          name: spvEntityName,
          walletAddress: userWalletAddress,
          chainId: chainId
        });

        setButtonStep('confirmed');
        router.push(`/manager/${organizationId}/offerings/${offeringId}`);
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    };
    const docTitle = `Token Link Agreement`;
    const uri = `/manager/${organizationId}/offerings/${offeringId}`;

    await setDocument({
      docName: docTitle,
      text: agreement,
      shareContractAddress: availableContract.cryptoAddress.address as String0x,
      setButtonStep,
      callback: handleEstablish,
      uri
    });
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignatureFormValues>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      signature: ''
    }
  });

  const signatureValue = watch('signature');

  useEffect(() => {
    setAgreementContent({ signature: signatureValue });
  }, [setAgreementContent, signatureValue]);

  const onSubmit = async (values: SignatureFormValues) => {
    await createDocHash(values.signature);
  };

  return (
    <div className='bg-gray-100 pt-8 p-4 md:p-8 min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 '>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <PresentLegalText text={agreement} />
        </div>
        <Field className='pt-3 bg-opacity-0'>
          <FieldLabel htmlFor='link-legal-signature'>Signature</FieldLabel>
          <FieldContent>
            <Input
              id='link-legal-signature'
              placeholder='e.g. Type your full legal name to sign'
              aria-invalid={Boolean(errors.signature)}
              {...register('signature')}
            />
            <FieldError errors={errors.signature ? [errors.signature] : undefined} />
          </FieldContent>
        </Field>
        <div className='text-sm text-blue-900 font-semibold text-opacity-80 mt-4'>
          Agreement Hash (Keccak-256)
        </div>
        <div className='text-sm break-all'>{agreementHash}</div>
        <LoadingButtonChain
          type='submit'
          disabled={isSubmitting}
          className='bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4'
          state={buttonStep}
          idleText='Sign'
          step1Text='Signing (check status in your wallet)'
          confirmedText='Confirmed!'
          rejectedText='You rejected the transaction. Click here to try again.'
        />
      </form>
    </div>
  );
};

export default LinkLegalForm;
