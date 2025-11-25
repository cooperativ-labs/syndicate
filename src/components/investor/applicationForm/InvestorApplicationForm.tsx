'use client';

import AddressAutoComplete, { type AddressType } from '@address-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import FormCard from '@src/components/cards/FormCard';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { addOfferingParticipantWithApplication } from '@src/utils/actions/offeringActions';
import { checkDateInPast } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useChainId, useConnection } from 'wagmi';

import type { Offering, OfferingWithLegalEntity } from '@/types';

import AdditionalApplicationFields from './AdditionalApplicationFields';
import AdvisorFields from './AdvisorFields';
import { CheckboxField, TextField } from './FormControls';
import InvestorApplicationPledgeFields from './InvestorApplicationPledgeFields';
import PrimaryApplicationFields from './PrimaryApplicationFields';
import PurchaserSummaryDisplay from './PurchaserSummaryDisplay';
import { GeneratedApplicationText } from './SummaryGenerator';

type InvestorApplicationFormProps = {
  offering: OfferingWithLegalEntity;
};

export type InvestorFormInputsType = {
  isCompany: boolean;
  walletAddress: string;
  offeringEntityManager: string;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
  numUnitsPurchase: number | undefined;
  purchaseMethod: string;
  purchaserTitle: string;
  enteringAgent: string;
  dateSigned: string;
  signature: string;
  purchaserAddressLine1: string;
  purchaserAddressLine2: string;
  purchaserCity: string;
  purchaserStateProvince: string;
  purchaserPostalCode: string;
  purchaserCountry: string;
  purchaserEmail: string;
  purchaserPhone: string;
  taxId: string;
  purchaserEntityJurisdiction: string;
  purchaserAge: number | undefined;
  purchaserPrincipleResidence: string;
  purchaserResidenceHistory: string;
  purchaserTaxState: string;
  purchaserAccredited: boolean;
  purchaserAccreditedType: string;
  purchaserAccreditedTypeOther: string;
  purchaserNetWorth: boolean;
  purchaserIncome: boolean;
  purchaserIsWithOfferingCompany: string;
  purchaserSophisticated: boolean;
  purchaserSophisticatedSelf: boolean;
  purchaserNonUs: boolean;
  purchaserExperienceFinancial: string;
  purchaserExperienceSecurities: string;
  purchaserExperienceLLCs: string;
  purchaserExperienceOther: string;
  purchaserPriorRelationship: string;
  workingWithAdvisor: boolean;
  advisorRelationship: string;
  advisorFullName: string;
  advisorEmail: string;
  advisorPhone: string;
  advisor_addressLine1: string;
  advisor_addressLine2: string;
  advisor_addressLine3: string;
  advisor_city: string;
  advisor_stateProvince: string;
  advisor_postalCode: string;
  advisor_country: string;
  minPledge: number | undefined;
  maxPledge: number | undefined;
};

const defaultFormValues: InvestorFormInputsType = {
  isCompany: false,
  walletAddress: '',
  offeringEntityManager: '',
  purchaserEntityName: '',
  purchaserEntityManager: '',
  purchaserEntityManagerTitle: '',
  numUnitsPurchase: undefined,
  purchaseMethod: '',
  purchaserTitle: '',
  enteringAgent: '',
  dateSigned: '',
  signature: '',
  purchaserAddressLine1: '',
  purchaserAddressLine2: '',
  purchaserCity: '',
  purchaserStateProvince: '',
  purchaserPostalCode: '',
  purchaserCountry: '',
  purchaserEmail: '',
  purchaserPhone: '',
  taxId: '',
  purchaserEntityJurisdiction: '',
  purchaserAge: undefined,
  purchaserPrincipleResidence: '',
  purchaserResidenceHistory: '',
  purchaserTaxState: '',
  purchaserAccredited: false,
  purchaserAccreditedType: '',
  purchaserAccreditedTypeOther: '',
  purchaserNetWorth: false,
  purchaserIncome: false,
  purchaserIsWithOfferingCompany: '',
  purchaserSophisticated: false,
  purchaserSophisticatedSelf: false,
  purchaserNonUs: false,
  purchaserExperienceFinancial: '',
  purchaserExperienceSecurities: '',
  purchaserExperienceLLCs: '',
  purchaserExperienceOther: '',
  purchaserPriorRelationship: '',
  workingWithAdvisor: false,
  advisorRelationship: '',
  advisorFullName: '',
  advisorEmail: '',
  advisorPhone: '',
  advisor_addressLine1: '',
  advisor_addressLine2: '',
  advisor_addressLine3: '',
  advisor_city: '',
  advisor_stateProvince: '',
  advisor_postalCode: '',
  advisor_country: '',
  minPledge: undefined,
  maxPledge: undefined
};

const initialAddressState: AddressType = {
  address1: '',
  address2: '',
  address3: '',
  formattedAddress: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  lat: 0,
  lng: 0
};

const InvestorApplicationForm: React.FC<InvestorApplicationFormProps> = ({ offering }) => {
  const router = useRouter();
  const chainId = useChainId();
  const { address: userWalletAddress } = useConnection();

  const legalEntity = offering.legalEntity;

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [address, setAddress] = useState<AddressType>(initialAddressState);
  const [searchInput, setSearchInput] = useState('');

  const form = useForm<InvestorFormInputsType>({ defaultValues: defaultFormValues });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue
  } = form;

  const agreementContent = useWatch({ control }) as InvestorFormInputsType;
  const purchaserEntityName = useWatch({ control, name: 'purchaserEntityName' });
  const workingWithAdvisor = useWatch({ control, name: 'workingWithAdvisor' });

  const latLng =
    address.lat && address.lng
      ? {
          lat: address.lat,
          lng: address.lng
        }
      : null;

  const orgId = legalEntity.organization_id;

  useEffect(() => {
    if (userWalletAddress) {
      setValue('walletAddress', userWalletAddress);
    }
  }, [userWalletAddress, setValue]);

  useEffect(() => {
    setValue('purchaserAddressLine1', address.address1);
    setValue('purchaserAddressLine2', address.address2);
    setValue('purchaserCity', address.city);
    setValue('purchaserStateProvince', address.region);
    setValue('purchaserPostalCode', address.postalCode);
    setValue('purchaserCountry', address.country);
  }, [address, setValue]);

  const ApplicationText = GeneratedApplicationText(
    agreementContent,
    offering,
    address.address1,
    address.address2,
    address.city,
    address.region,
    address.postalCode,
    address.country
  );

  const offerCalculator = (numUnits: number, price: number | undefined) => {
    return price && numUnits * price;
  };
  const saleAmountString = (numUnitsToSell: string, price: number | undefined) => {
    return numberWithCommas(offerCalculator(parseInt(numUnitsToSell, 10), price));
  };

  const handleApplicationSubmit = async (values: InvestorFormInputsType) => {
    if (!userWalletAddress || !chainId) {
      alert('Connect your wallet to apply.');
      return;
    }
    if (checkDateInPast(values.dateSigned)) {
      alert('Signing date cannot be in the past');
      return;
    }
    if (!legalEntity.id) {
      alert('Offering entity missing. Please contact support.');
      return;
    }

    const minPledgeValue = values.minPledge ? Number(values.minPledge) : null;
    const maxPledgeValue = values.maxPledge ? Number(values.maxPledge) : null;
    const applicationTitle = `${values.purchaserEntityName} requests approval to invest in ${offering.name}`;

    setButtonStep('step1');
    try {
      await addOfferingParticipantWithApplication({
        dateSigned: values.dateSigned,
        addressOfferingId: `${userWalletAddress}${offering.id}`,
        name: values.purchaserEntityName,
        offeringId: offering.id,
        offeringEntityId: legalEntity.id,
        offeringUniqueId: `${offering.id}${values.purchaserEntityName}application`,
        walletAddress: userWalletAddress,
        minPledge: minPledgeValue,
        maxPledge: maxPledgeValue,
        applicationText: ApplicationText.all,
        applicationTitle,
        signature: values.signature,
        chainId
      });
      setButtonStep('confirmed');
      if (orgId) {
        router.push(`/${orgId}/offerings/${offering.id}`);
      }
    } catch (error) {
      console.error('Investor application submission failed', error);
      setButtonStep('failed');
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleApplicationSubmit)}
        className='flex md:grid grid-cols-2 gap-4 relative'
      >
        <div className='col-span-1'>
          <FormCard>
            <h1 className='text-2xl font-medium'>Apply to invest in {offering.name}</h1>
            <h2 className='text-xl md:mt-8 text-blue-900 font-semibold'>Purchaser Information</h2>

            <div className='mt-4 mb-2'>
              <Field orientation='horizontal'>
                <FieldLabel>Your wallet:</FieldLabel>
                <FieldContent>
                  {userWalletAddress ? (
                    <FormattedCryptoAddress
                      chainId={chainId}
                      address={userWalletAddress}
                      className='font-semibold'
                    />
                  ) : (
                    <ChooseConnectorButton buttonText='Connect Wallet to Apply' />
                  )}
                </FieldContent>
              </Field>
            </div>

            <FieldGroup>
              <FieldSet>
                <TextField
                  name='purchaserEntityName'
                  label="Purchaser's full legal name"
                  placeholder='e.g. Idris Elba'
                  required
                />
                <CheckboxField
                  name='isCompany'
                  label={`${purchaserEntityName || 'Purchaser'} is a company`}
                />
                <PrimaryApplicationFields />
              </FieldSet>

              {purchaserEntityName && (
                <FieldSet>
                  <Field>
                    <FieldLabel>Purchaser's address *</FieldLabel>
                    <FieldContent>
                      <AddressAutoComplete
                        address={address}
                        setAddress={setAddress}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        dialogTitle="Purchaser's address"
                        placeholder='Search for an address'
                      />
                    </FieldContent>
                  </Field>
                  {latLng && (
                    <div className='mt-4'>
                      <GoogleMap
                        mapContainerStyle={{ height: '300px', width: '100%' }}
                        center={latLng}
                        zoom={14}
                      >
                        <Marker position={latLng} />
                      </GoogleMap>
                    </div>
                  )}

                  <TextField
                    name='purchaserEmail'
                    label="Purchaser's email address"
                    placeholder='e.g. moritz@bonuslife.com'
                    required
                  />
                  <TextField
                    name='purchaserPhone'
                    label="Purchaser's phone number"
                    placeholder='e.g. 401-494-5555'
                    required
                  />

                  <AdditionalApplicationFields offeringEntityName={offering.name} />

                  {workingWithAdvisor && (
                    <div className='bg-gray-100 rounded-lg p-3 mt-6'>
                      <h2 className='text-xl mt-3 text-blue-900 font-semibold'>
                        Advisor Information
                      </h2>
                      <AdvisorFields register={register} errors={errors} />
                    </div>
                  )}
                </FieldSet>
              )}
            </FieldGroup>

            <div className='md:hidden'>
              <hr className='mb-6 mt-10' />
              <h2 className='text-xl text-blue-900 font-semibold'>Summary</h2>
              {purchaserEntityName && (
                <div className='bg-gray-100 rounded-lg p-3 mt-6'>
                  <PurchaserSummaryDisplay
                    summary={ApplicationText.ApplicationSummary}
                    suitabilityAttestation={ApplicationText.ApplicationSuitability}
                    qualificationsPresent
                  />
                </div>
              )}
            </div>

            <hr className='mb-6 mt-10' />
            <InvestorApplicationPledgeFields
              offering={offering}
              saleAmountString={saleAmountString}
            />

            <hr className='mb-6 mt-10' />
            <div className='md:grid grid-cols-3 gap-3'>
              <TextField
                name='signature'
                label='Signature'
                placeholder='Type your full legal name to sign'
                required
              />
              <TextField
                name='dateSigned'
                label='Signing Date'
                type='date'
                required
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />
            </div>

            <hr className='mb-6 mt-10' />
            {userWalletAddress ? (
              <LoadingButtonChain
                type='submit'
                disabled={isSubmitting || buttonStep === 'step1'}
                state={buttonStep}
                idleText={`Apply to become a ${legalEntity.legal_name} investor`}
                step1Text='Applying...'
                step2Text='Setting distribution token...'
                confirmedText='Confirmed!'
                failedText='Transaction failed'
                rejectedText='You rejected the transaction. Click here to try again.'
              />
            ) : (
              <ChooseConnectorButton buttonText='Connect Wallet to Apply' />
            )}
          </FormCard>
        </div>

        <div className='hidden md:flex col-span-1'>
          {purchaserEntityName && (
            <PurchaserSummaryDisplay
              summary={ApplicationText.ApplicationSummary}
              suitabilityAttestation={ApplicationText.ApplicationSuitability}
              qualificationsPresent
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default InvestorApplicationForm;
