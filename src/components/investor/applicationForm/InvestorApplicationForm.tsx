import * as backendCtc from '../../../web3/ABI';
import AdditionalApplicationFields from './AdditionalApplicationFields';
import AdvisorFields from './AdvisorFields';
import Checkbox from '@src/components/form-components/Checkbox';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import CustomAddressAutocomplete from '@src/components/form-components/CustomAddressAutocomplete';
import Datepicker from '@src/components/form-components/Datepicker';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import FormCard from '../../cards/FormCard';
import Input, { defaultFieldDiv, defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import InvestorApplicationPledgeFields from './InvestorApplicationPledgeFields';
import PrimaryApplicationFields from './PrimaryApplicationFields';
import PurchaserSummaryDisplay from './PurchaserSummaryDisplay';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ADD_OFFERING_PARTICIPANT_WITH_APPLICATION } from '@src/utils/dGraphQueries/offering';
import { checkDateInPast } from '@src/utils/helpersGeneral';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GeneratedApplicationText } from './SummaryGenerator';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering } from 'types';

import { useAccount, useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

type InvestorApplicationFormProps = {
  offering: Offering;
};

type InvestorFormInputsType = {
  isCompany: boolean;
  walletAddress: string;
  offeringEntityManager: string;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
  numUnitsPurchase: number;
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
  purchaserAge: number;
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
};
const InvestorApplicationForm: FC<InvestorApplicationFormProps> = ({ offering }) => {
  const router = useRouter();
  const chainId = useChainId();
  const { address: userWalletAddress } = useAccount();

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const [addOfferingParticipant, { data, error }] = useMutation(ADD_OFFERING_PARTICIPANT_WITH_APPLICATION);
  const [alerted, setAlerted] = useState<boolean>(false);

  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();

  const placeId = inputAddress && inputAddress.value.place_id;
  useEffect(() => {
    if (placeId) {
      geocodeByPlaceId(placeId)
        .then((results) => {
          setAutocompleteResults(results);
          const lat = results[0]?.geometry.location.lat();
          const lng = results[0]?.geometry.location.lng();
          setLatLang({ lat: lat, lng: lng });
        })
        .catch((error) => {
          return error;
        });
    }
  }, [placeId]);

  const subpremise = autocompleteResults[0]?.address_components.find((x) => x.types.includes('subpremise'))?.long_name;
  const street_number = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('street_number')
  )?.long_name;
  const street_name = autocompleteResults[0]?.address_components.find((x) => x.types.includes('route'))?.long_name;
  const city = autocompleteResults[0]?.address_components.find((x) => x.types.includes('locality'))?.long_name;
  const sublocality = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('sublocality')
  )?.long_name;
  const state = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('administrative_area_level_1')
  )?.long_name;
  const zip = autocompleteResults[0]?.address_components.find((x) => x.types.includes('postal_code'))?.long_name;
  const country = autocompleteResults[0]?.address_components.find((x) => x.types.includes('country'))?.long_name;

  const offerCalculator = (numUnits: number, price: number) => {
    return numUnits * price;
  };
  const saleAmountString = (numUnitsToSell, price) => {
    return numberWithCommas(offerCalculator(parseInt(numUnitsToSell, 10), price));
  };

  const [agreementContent, setAgreementContent] = useState<InvestorFormInputsType>({
    isCompany: false,
    walletAddress: '',
    offeringEntityManager: '',
    purchaserEntityName: '',
    purchaserEntityManager: '',
    purchaserEntityManagerTitle: '',
    numUnitsPurchase: null,
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
    purchaserAge: null,
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
  });

  // if (!user) {
  //   return <></>;
  // }

  if (error && !alerted) {
    setAlerted(true);

    alert(`Oops. Looks like something went wrong: ${error.message}`);
  }

  const orgId = offering.offeringEntity.organization.id;
  if (data) {
    router.push(`${orgId}/offerings/${offering.id}`);
  }

  const submitApplication = async (values) => {
    const appTitle = `${values.purchaserEntityName}'s requests approval to invest in ${offering.name}`;
    setButtonStep('submitting');

    const btBalance = await ctc.views.vBtBal();
    const btID = reachLib.bigNumberToNumber(btBalance[1][1]).toString();
    const call = async (f) => {
      try {
        setButtonStep('step2');
        await acc.tokenAccept(btID);
        setButtonStep('submitting');
        await f();
        await addOfferingParticipant({
          variables: {
            currentDate: currentDate,
            dateSigned: values.dateSigned,
            addressOfferingId: userWalletAddress + offering.id,
            name: values.purchaserEntityName,
            minPledge: values.minPledge,
            maxPledge: values.maxPledge,
            jurCountry: values.jurCountry,
            jurState: values.jurState,
            offeringId: offering.id,
            offeringEntityId: offering.offeringEntity.id,
            offeringUniqueId: offering.id + values.purchasingEntityName + 'application',
            walletAddress: userWalletAddress,
            applicationText: ApplicationText.all,
            applicationTitle: appTitle,
            signature: values.signature,
          },
        });
        setButtonStep('confirmed');
      } catch (e) {
        setButtonStep('failed');
      }
    };
    const apis = ctc.a;
    call(async () => {
      const apiReturn = await apis.optIn();
      //console.log(`wait for it... share tokens allocated...`, apiReturn);
      return apiReturn;
    });
  };

  const ApplicationText = GeneratedApplicationText(
    agreementContent,
    offering,
    `${street_number} ${street_name}`,
    subpremise,
    city ?? sublocality,
    state,
    zip,
    country
  );

  return (
    <>
      <Formik
        initialValues={{
          isCompany: false,
          walletAddress: userWalletAddress,
          offeringEntityManager: '',
          purchaserEntityName: '',
          purchaserEntityManager: '',
          purchaserEntityManagerTitle: '',
          numUnitsPurchase: null,
          purchaseMethod: '',
          purchaserTitle: '',
          enteringAgent: '',
          dateSigned: '',
          signature: '',
          addressAutocomplete: '',
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
          purchaserAge: null,
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
        }}
        validate={(values) => {
          setAgreementContent(values);
          const errors: any = {}; /** @TODO : Shape */
          if (checkDateInPast(values.dateSigned)) {
            errors.dateSigned = 'Signing date cannot be in the past';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          await submitApplication(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex md:grid grid-cols-2 gap-4 relative">
            <div className="col-span-1">
              <FormCard>
                <h1 className="text-2xl font-medium">Apply to invest in {offering.name}</h1>
                <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Purchaser Information`}</h2>

                <div className=" flex mt-4 mb-2 items-center">
                  <div className={defaultFieldLabelClass}> Your wallet:</div>
                  <div className="ml-2">
                    {userWalletAddress ? (
                      <FormattedCryptoAddress chainId={chainId} address={userWalletAddress} className="font-semibold" />
                    ) : (
                      <ChooseConnectorButton buttonText={'Connect Wallet to Apply'} />
                    )}
                  </div>
                </div>
                <Input
                  className={defaultFieldDiv}
                  labelText={`Purchaser's full legal name`}
                  name="purchaserEntityName"
                  placeholder="e.g. Idris Elba"
                  required
                />

                <Checkbox
                  labelText={`${values.purchaserEntityName ? values.purchaserEntityName : 'Purchaser'} is a company`}
                  className="mb-4"
                  fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                  name="isCompany"
                  checked={values.isCompany}
                  sideLabel
                />

                <PrimaryApplicationFields isNonHuman={values.isCompany} />
                {values.purchaserEntityName && (
                  <div className="mt-2">
                    <CustomAddressAutocomplete
                      name="addressAutocomplete"
                      required
                      labelText="Purchaser's address"
                      value={inputAddress}
                      setValue={setInputAddress}
                    />
                    {latLang.lat && (
                      <div className="mt-4">
                        <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
                          <Marker position={latLang} />
                        </GoogleMap>
                      </div>
                    )}

                    <Input
                      className={defaultFieldDiv}
                      labelText={`Purchaser's email address`}
                      name="purchaserEmail"
                      placeholder="e.g. moritz@bonuslife.com"
                      required
                    />
                    <Input
                      className={defaultFieldDiv}
                      labelText={`Purchaser's phone number`}
                      name="purchaserPhone"
                      placeholder="e.g. 401-494-5555"
                      required
                    />
                    <hr className="mb-6 mt-10" />
                    <AdditionalApplicationFields values={values} offeringEntityName={offering.name} />
                    <Checkbox
                      labelText="The purchaser is working with a professional advisor."
                      className=""
                      fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                      name="workingWithAdvisor"
                      checked={values.workingWithAdvisor}
                      sideLabel
                    />
                    {values.workingWithAdvisor && (
                      <div className="bg-gray-100 rounded-lg p-3 mt-6">
                        <h2 className="text-xl mt-3 text-blue-900 font-semibold">{`Advisor's Information`}</h2>
                        <AdvisorFields />
                      </div>
                    )}
                  </div>
                )}

                {/* 
            <FormCard center>
              <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Coinvestor Info`}</h2>

              <Input
                className={defaultFieldDiv}
                name="coinvestorFullName"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="Co-investor full name"
              />
              <Input
                className={defaultFieldDiv}
                name="coinvestorSSN"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="Co-investor SSN"
              />
              <Input
                className={defaultFieldDiv}
                name="coinvestorTaxID"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="Co-investor TaxID"
              />
              <Input
                className={defaultFieldDiv}
                name="coinvestorEmail"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="Co-investor email address"
                required
              />
              <Input
                className={defaultFieldDiv}
                name="coinvestorAddress"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="NEED BETTER ADDRESS HANDLER"
                required
              />
              <Input
                className={defaultFieldDiv}
                name="coinvestorPhone"
                type="text"
                placeholder="e.g. Type your full legal name to sign"
                labelText="Co=investor phone number"
                required
              />
            </FormCard> */}

                <div className="md:hidden">
                  <hr className="mb-6 mt-10" />
                  <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Summary`}</h2>
                  {values.purchaserEntityName && (
                    <div className="bg-gray-100 rounded-lg p-3 mt-6">
                      <div className="mx-auto border-t-1 lg:border-0 col-span-3">
                        <PurchaserSummaryDisplay
                          summary={ApplicationText.ApplicationSummary}
                          suitabilityAttestation={ApplicationText.ApplicationSuitability}
                          qualificationsPresent={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <hr className="mb-6 mt-10" />
                <InvestorApplicationPledgeFields
                  offering={offering}
                  values={values}
                  saleAmountString={saleAmountString}
                />
                <hr className="mb-6 mt-10" />
                <div className="md:grid grid-cols-3 gap-3">
                  <Input
                    className={`${defaultFieldDiv} col-span-2`}
                    labelText="Signature"
                    name="signature"
                    type="text"
                    placeholder="e.g. Type your full legal name to sign"
                    required
                  />
                  <Datepicker name="dateSigned" labelText="Signing Date" className={`${defaultFieldDiv} col-span-1`} />
                  {/* <NonInput className={`pt-3 col-span-1 pl-1`} labelText={'Date'}>
                    {getHumanDate(currentDate)}
                  </NonInput> */}
                </div>
                <hr className="mb-6 mt-10" />
                {userWalletAddress ? (
                  <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
                    <LoadingButtonText
                      state={buttonStep}
                      idleText={`Apply to become a ${offering.offeringEntity.legalName} investor`}
                      submittingText="Applying..."
                      step2Text="Setting distribution token..."
                      confirmedText="Confirmed!"
                      failedText="Transaction failed"
                      rejectedText="You rejected the transaction. Click here to try again."
                    />
                  </FormButton>
                ) : (
                  <ChooseConnectorButton buttonText={'Connect Wallet to Apply'} />
                )}
              </FormCard>
            </div>
            <div className=" hidden md:flex col-span-1">
              {values.purchaserEntityName && (
                <PurchaserSummaryDisplay
                  summary={ApplicationText.ApplicationSummary}
                  suitabilityAttestation={ApplicationText.ApplicationSuitability}
                  qualificationsPresent={true}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InvestorApplicationForm;
