import axios from 'axios';
import { Address, CurrencyCode, LegalEntity, Offering } from 'types';
import { entityNotHuman } from '@src/utils/helpersUserAndEntity';
import {
  GenerateInvestorApplicationSummary,
  GenerateSubscriptionAgreementSuitabilityAttestation,
  GenerateSubscriptionPurchaseAttestation,
} from '@src/utils/helpersAgreement';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useAsync } from 'react-use';
type AgreementText = {
  custom: string;
  standard: string;
};

type AgreementContentType = {
  isCompany: boolean;
  walletAddress: string;
  numUnitsPurchase: number | undefined;
  purchaseMethod: string;
  minPledge?: number;
  maxPledge?: number;
  pricePerUnit?: number;
  investmentCurrency?: CurrencyCode;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
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
};

export const GeneratedApplicationText = (
  agreementContent: AgreementContentType,
  // isNonHuman: boolean,
  offering: Offering,
  purchaserAddressLine1: string | undefined,
  purchaserAddressLine2: string,
  purchaserCity: string,
  purchaserStateProvince: string,
  purchaserPostalCode: string,
  purchaserCountry: string

  // applicationSummaryText: string,
  // applicantSuitabilityAttestationText: string,
  // applicantPurchaseAttestationText: string
) => {
  const applicationSummary = `/assets/subscription-agreement/application-summary.md`;
  const getApplicationSummary = async (): Promise<AgreementText['standard']> =>
    axios.get(applicationSummary).then((resp) => resp.data);
  const { value: applicationSummaryText } = useAsync(getApplicationSummary, []);

  const applicantSuitabilityAttestation = `/assets/subscription-agreement/applicant-suitability-attestation.md`;
  const getApplicantSuitability = async (): Promise<AgreementText['standard']> =>
    axios.get(applicantSuitabilityAttestation).then((resp) => resp.data);
  const { value: applicantSuitabilityAttestationText } = useAsync(getApplicantSuitability, []);

  const applicantPurchaseAttestation = `/assets/subscription-agreement/applicant-purchase-attestation.md`;
  const getApplicantPurchaseAttestation = async (): Promise<AgreementText['standard']> =>
    axios.get(applicantPurchaseAttestation).then((resp) => resp.data);
  const { value: applicantPurchaseAttestationText } = useAsync(getApplicantPurchaseAttestation, []);

  const risks = `/assets/subscription-agreement/risks-disclosure.md`;
  const getRisks = async (): Promise<AgreementText['standard']> => axios.get(risks).then((resp) => resp.data);
  const { value: risksText } = useAsync(getRisks, []);

  const considerations = `/assets/subscription-agreement/considerations-disclosure.md`;
  const getConsiderations = async (): Promise<AgreementText['standard']> =>
    axios.get(considerations).then((resp) => resp.data);
  const { value: considerationsText } = useAsync(getConsiderations, []);

  const offeringEntity = offering.offeringEntity;
  const offeringPrice = offering.details?.priceStart;
  const offeringCurrency = offering.details?.investmentCurrency.code;
  // const contractAddress = cryptoAddress.address;

  const {
    isCompany,
    walletAddress,
    numUnitsPurchase,
    purchaseMethod,
    purchaserEntityName,
    purchaserEntityManager,
    purchaserEntityManagerTitle,
    minPledge,
    maxPledge,
    enteringAgent,
    dateSigned,
    signature,
    purchaserEmail,
    purchaserPhone,
    taxId,
    purchaserEntityJurisdiction,
    purchaserAge,
    purchaserPrincipleResidence,
    purchaserResidenceHistory,
    purchaserTaxState,
    purchaserAccredited,
    purchaserAccreditedType,
    purchaserAccreditedTypeOther,
    purchaserNetWorth,
    purchaserIncome,
    purchaserIsWithOfferingCompany,
    purchaserSophisticated,
    purchaserSophisticatedSelf,
    purchaserNonUs,
    purchaserExperienceFinancial,
    purchaserExperienceSecurities,
    purchaserExperienceLLCs,
    purchaserExperienceOther,
    purchaserPriorRelationship,
    workingWithAdvisor,
    advisorRelationship,
    advisorFullName,
    advisorEmail,
    advisorPhone,
    advisor_addressLine1,
    advisor_addressLine2,
    advisor_addressLine3,
    advisor_city,
    advisor_stateProvince,
    advisor_postalCode,
    advisor_country,
  } = agreementContent;

  const ApplicationSummary = GenerateInvestorApplicationSummary(
    {
      isNonHuman: isCompany,
      offeringEntityName: offeringEntity?.legalName,
      purchaserEntityName: purchaserEntityName,
      purchaserEntityManager: purchaserEntityManager,
      purchaserEntityManagerTitle: purchaserEntityManagerTitle,
      purchaserPhone: purchaserPhone,
      purchaserEmail: purchaserEmail,
      purchaserEntityAddressLine1: purchaserAddressLine1,
      purchaserEntityAddressLine2: purchaserAddressLine2,
      purchaserEntityAddressCity: purchaserCity,
      purchaserEntityAddressStateProvince: purchaserStateProvince,
      purchaserEntityAddressPostalCode: purchaserPostalCode,
      purchaserEntityAddressCountry: purchaserCountry,
      purchaserTaxState: purchaserTaxState,
      taxId: taxId,
      purchaseMethod: purchaseMethod,
    },
    applicationSummaryText ?? ''
  );

  const ApplicationSuitability = GenerateSubscriptionAgreementSuitabilityAttestation(
    {
      walletAddress: walletAddress,
      dateSigned: dateSigned && getHumanDate(dateSigned),
      signature: signature,
      isNonHuman: isCompany,
      purchaserEntityManager: purchaserEntityManager,
      purchaserEntityManagerTitle: purchaserEntityManagerTitle,
      offeringEntityName: offeringEntity?.legalName,
      purchaserEntityName: purchaserEntityName,
      purchaserAge: purchaserAge ? numberWithCommas(purchaserAge) : '',
      purchaserPrincipleResidence: purchaserPrincipleResidence,
      purchaserResidenceHistory: purchaserResidenceHistory,
      purchaserTaxState: purchaserTaxState,
      purchaserAccredited: purchaserAccredited,
      purchaserNetWorth: purchaserNetWorth,
      purchaserIncome: purchaserIncome,
      purchaserAccreditedType: purchaserAccredited ? purchaserAccreditedType : '',
      purchaserAccreditedTypeOther: purchaserAccredited ? purchaserAccreditedTypeOther : '',
      purchaserSophisticated: purchaserSophisticated,
      purchaserSophisticatedSelf: purchaserSophisticated && purchaserSophisticatedSelf,
      purchaserExperienceFinancial: purchaserAccredited ? purchaserExperienceFinancial : '',
      purchaserExperienceSecurities: purchaserExperienceSecurities,
      purchaserExperienceLLCs: purchaserExperienceLLCs,
      purchaserExperienceOther: purchaserExperienceOther,
      purchaserNonUs: purchaserNonUs,
      purchaserIsWithOfferingCompany: purchaserIsWithOfferingCompany,
      purchaserPriorRelationship: purchaserPriorRelationship,
      workingWithAdvisor: workingWithAdvisor,
      advisorRelationship: advisorRelationship,
      advisorFullName: advisorFullName,
      advisorEmail: advisorEmail,
      advisorPhone: advisorPhone,
      advisor_addressLine1: advisor_addressLine1,
      advisor_addressLine2: advisor_addressLine2,
      advisor_addressLine3: advisor_addressLine3,
      advisor_city: advisor_city,
      advisor_stateProvince: advisor_stateProvince,
      advisor_postalCode: advisor_postalCode,
      advisor_country: advisor_country,
      maxPledge: maxPledge,
      minPledge: minPledge,
      pricePerUnit: offering.details?.priceStart,
      investmentCurrency: getCurrencyOption(offering.details?.investmentCurrency)?.symbol,
    },
    applicantSuitabilityAttestationText ?? ''
  );

  const PurchaseAttestation = GenerateSubscriptionPurchaseAttestation(
    {
      isNonHuman: isCompany,
      offeringEntityName: offeringEntity?.legalName,
      numUnitsPurchase: numUnitsPurchase ? numberWithCommas(numUnitsPurchase) : '',
      offeringPrice: offeringPrice ? numberWithCommas(offeringPrice / 100) : '',
      purchasePrice:
        numUnitsPurchase && offeringPrice ? numberWithCommas((numUnitsPurchase * offeringPrice) / 100) : '',
      purchaseCurrency: offeringCurrency as string,
      purchaseMethod: purchaseMethod,
      purchaserEntityName: purchaserEntityName,
      purchaserEntityManager: purchaserEntityManager,
      purchaserEntityManagerTitle: purchaserEntityManagerTitle,
      purchaserPhone: purchaserPhone,
      purchaserEmail: purchaserEmail,
      purchaserEntityAddressLine1: purchaserAddressLine1,
      purchaserEntityAddressLine2: purchaserAddressLine2,
      purchaserEntityAddressCity: purchaserCity,
      purchaserEntityAddressStateProvince: purchaserStateProvince,
      purchaserEntityAddressPostalCode: purchaserPostalCode,
      purchaserEntityAddressCountry: purchaserCountry,
      purchaserEntityJurisdiction: purchaserEntityJurisdiction,
      taxId: taxId,
      enteringAgent: enteringAgent,
      dateSigned: dateSigned && getHumanDate(dateSigned),
      signature: signature,
      walletAddress: walletAddress,
    },
    applicantPurchaseAttestationText ?? ''
  );
  const all = ApplicationSummary + ApplicationSuitability + PurchaseAttestation;
  return { ApplicationSummary, ApplicationSuitability, PurchaseAttestation, all };
};
