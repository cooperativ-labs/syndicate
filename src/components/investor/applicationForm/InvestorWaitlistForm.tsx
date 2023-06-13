import AdditionalApplicationFields from './AdditionalApplicationFields';
import AdvisorFields from './AdvisorFields';
import Checkbox from '@src/components/form-components/Checkbox';
import CustomAddressAutocomplete from '@src/components/form-components/CustomAddressAutocomplete';
import Datepicker from '@src/components/form-components/Datepicker';
import EntitySelector from '../../form-components/EntitySelector';
import FormButton from '@src/components/buttons/FormButton';
import FormCard from '../../cards/FormCard';
import FormModal from '@src/containers/FormModal';
import Input, { defaultFieldDiv, defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import InvestorApplicationPledgeFields from './InvestorApplicationPledgeFields';
import NonInput from '@src/components/form-components/NonInput';
import PrimaryApplicationFields from './PrimaryApplicationFields';
import PurchaserSummaryDisplay from './PurchaserSummaryDisplay';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ADD_OFFERING_WAITLIST_MEMBER } from '@src/utils/dGraphQueries/offering';
import { Address, CurrencyCode, LegalEntity, Offering } from 'types';
import { checkDateInPast } from '@src/utils/helpersGeneral';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GeneratedApplicationText } from './SummaryGenerator';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useAccount } from 'wagmi';
import { useMutation, useQuery } from '@apollo/client';

type InvestorWaitlistFormProps = {
  offering: Offering;
};

type InvestorWaitlistFormInputsType = {
  isCompany: boolean;
  walletAddress: string;
  offeringEntityManager: string;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
  numUnitsPurchase: number;
  minPledge: number;
  maxPledge: number;
  pricePerUnit: number;
  investmentCurrency: CurrencyCode;
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
const InvestorWaitlistForm: FC<InvestorWaitlistFormProps> = ({ offering }) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const [addOfferingWaitlistMember, { data: dataWaitlist, error: errorWaitlist }] =
    useMutation(ADD_OFFERING_WAITLIST_MEMBER);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();

  const placeId = inputAddress && inputAddress.value.place_id;
  useEffect(() => {
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

  const [agreementContent, setAgreementContent] = useState<InvestorWaitlistFormInputsType>({
    isCompany: false,
    walletAddress: '',
    offeringEntityManager: '',
    purchaserEntityManager: '',
    purchaserEntityName: '',
    purchaserEntityManagerTitle: '',
    numUnitsPurchase: null,
    minPledge: null,
    maxPledge: null,
    pricePerUnit: offering.details.priceStart,
    investmentCurrency: offering.details.investmentCurrency.code,
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

  if (errorWaitlist && !alerted) {
    setAlerted(true);
    alert(`Oops. Looks like something went wrong: ${errorWaitlist.message}`);
  }

  if (dataWaitlist) {
    alert('Your application has been submitted and you are now on the waitlist.');
  }

  const submitWaitlistApplication = async (values) => {
    const appTitle = `${values.purchaserEntityName}'s requests approval to invest in ${offering.name}`;
    setButtonStep('submitting');
    try {
      await addOfferingWaitlistMember({
        variables: {
          currentDate: currentDate,
          dateSigned: values.dateSigned,
          name: values.purchaserEntityName,
          minPledge: values.minPledge,
          maxPledge: values.maxPledge,
          nonUS: values.purchaserNonUs,
          offeringId: offering.id,
          offeringEntityId: offering.offeringEntity.id,
          offeringUniqueId: offering.id + appTitle,
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
          minPledge: null,
          maxPledge: null,
          pricePerUnit: offering.details.priceStart,
          investmentCurrency: offering.details.investmentCurrency.code,
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
        }}
        validate={(values) => {
          setAgreementContent(values);
          const errors: any = {}; /** @TODO : Shape */
          if (checkDateInPast(values.dateSigned)) {
            errors.dateSigned = 'Signing date cannot be in the past';
          }
          if (values.maxPledge && values.minPledge && values.maxPledge < values.minPledge) {
            errors.maxPledge = 'Max buy must be greater than min buy';
          }
          if (values.minPledge && values.minPledge < offering.details.minUnitsPerInvestor) {
            errors.minPledge = `The minimum for this offering is ${offering.details.minUnitsPerInvestor} shares`;
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await submitWaitlistApplication(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex md:grid grid-cols-2 gap-4 relative">
            <div className="col-span-1">
              <FormCard>
                <h1 className="text-2xl font-medium">Join {offering.name} investor waitlist</h1>
                <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`Purchaser Information`}</h2>

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
                  <>
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
                  </>
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

export default InvestorWaitlistForm;
