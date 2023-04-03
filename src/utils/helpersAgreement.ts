import fileDownload from 'js-file-download';
import { CurrencyCode } from 'types';

export const GetSignatoriesFromAgreement = (agreement) => {
  return agreement.signatories.map((signatories) => {
    return signatories;
  });
};

export function DownloadFile(content: string, fileName: string) {
  fileDownload(content, fileName);
}

type AgreementBase = {
  contractAddress: string;
  chainName: string;
  bacName: string;
  bacAddress: string;
  isNotMainnet: boolean;
  [key: string]: any;
};

type LegalLinkAgreementBaseType = AgreementBase & {
  spvEntityName: string;
  gpEntityName: string;
  signature: string;
};

export const GenerateLegalLink = (props: LegalLinkAgreementBaseType, legalText: string): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

type PpmAgreementBaseType = LegalLinkAgreementBaseType & {
  operatingCurrency: string;
  maxInvestors: string;
  minInvestors: string;
  maxRaise: string;
  minRaise: string;
  raiseStart: string;
  raisePeriod: string;
  additionalInfo: string;
  distributionPeriod: string;
  distributionFrequency: string;
  distributionCurrency: string;
  distributionDescription: string;
  adminExpense: string;
};

export type GeneratePpmAgreementType = PpmAgreementBaseType & {
  organizationName: string;
  organizationLegalName: string;

  agreementCurrency: string;
};

export const GeneratePPM = (props: GeneratePpmAgreementType, legalText: string): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

// ### INVESTOR APPLICATION

type InvestorApplicationBaseType = {
  isNonHuman: boolean;
  offeringEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
};

export type InvestorApplicationSummaryType = InvestorApplicationBaseType & {
  offeringEntityName: string;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
  purchaserPhone: string;
  purchaserEmail: string;
  purchaserEntityAddressLine1: string;
  purchaserEntityAddressLine2: string;
  purchaserEntityAddressCity: string;
  purchaserEntityAddressStateProvince: string;
  purchaserEntityAddressPostalCode: string;
  purchaserEntityAddressCountry: string;
  purchaserTaxState: string;
  taxId: string;
  purchaseMethod: string;
};
export const GenerateInvestorApplicationSummary = (props: InvestorApplicationSummaryType, legalText: string): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

export type SubscriptionAgreementSuitabilityAttestationType = InvestorApplicationBaseType & {
  purchaserEntityName: string;
  purchaserAge: string;
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
  walletAddress: string;
  minPledge: number;
  maxPledge: number;
  pricePerUnit: number;
  investmentCurrency: string;
  dateSigned: string;
  signature: string;
};
export const GenerateSubscriptionAgreementSuitabilityAttestation = (
  props: SubscriptionAgreementSuitabilityAttestationType,
  legalText: string
): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

export type SubscriptionPurchaseAttestationType = InvestorApplicationBaseType & {
  isNonHuman: boolean;
  walletAddress: string;
  offeringEntityName: string;
  purchaserEntityName: string;
  purchaserEntityManager: string;
  purchaserEntityManagerTitle: string;
  purchaserPhone: string;
  purchaserEmail: string;
  purchaserEntityAddressLine1: string;
  purchaserEntityAddressLine2: string;
  purchaserEntityAddressCity: string;
  purchaserEntityAddressStateProvince: string;
  purchaserEntityAddressPostalCode: string;
  purchaserEntityAddressCountry: string;
  purchaserEntityJurisdiction: string;
  taxId: string;
  numUnitsPurchase: string;
  offeringPrice: string;
  purchasePrice: string;
  purchaseCurrency: string;
  purchaseMethod: string;
  enteringAgent: string;
  dateSigned: string;
  signature: string;
};

export const GenerateSubscriptionPurchaseAttestation = (
  props: SubscriptionPurchaseAttestationType,
  legalText: string
): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));

export type SubscriptionAgreementType = SubscriptionAgreementSuitabilityAttestationType &
  SubscriptionPurchaseAttestationType &
  InvestorApplicationSummaryType;

export const GenerateSubscriptionAgreement = (props: SubscriptionAgreementType, legalText: string): string =>
  Object.entries(props)
    .reduce((acc, value) => acc.split(`{{ ${value[0]} }}`).join(`${value[1]}`), legalText)
    .replace(/{% (.+):\n([^%]+)%}/gm, (match, cond: string, value: string) => (props[cond] ? value : ''));
