export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Int64: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']['output']>;
  expires_at?: Maybe<Scalars['Int64']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  id_token?: Maybe<Scalars['String']['output']>;
  id_token_expires_in?: Maybe<Scalars['Int64']['output']>;
  not_before?: Maybe<Scalars['Int64']['output']>;
  profile_info?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerAccountId?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  refresh_token_expires_in?: Maybe<Scalars['Int64']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  session_state?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type AccountUserArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type AccountAggregateResult = {
  __typename?: 'AccountAggregateResult';
  access_tokenMax?: Maybe<Scalars['String']['output']>;
  access_tokenMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  expires_atAvg?: Maybe<Scalars['Float']['output']>;
  expires_atMax?: Maybe<Scalars['Int64']['output']>;
  expires_atMin?: Maybe<Scalars['Int64']['output']>;
  expires_atSum?: Maybe<Scalars['Int64']['output']>;
  id_tokenMax?: Maybe<Scalars['String']['output']>;
  id_tokenMin?: Maybe<Scalars['String']['output']>;
  id_token_expires_inAvg?: Maybe<Scalars['Float']['output']>;
  id_token_expires_inMax?: Maybe<Scalars['Int64']['output']>;
  id_token_expires_inMin?: Maybe<Scalars['Int64']['output']>;
  id_token_expires_inSum?: Maybe<Scalars['Int64']['output']>;
  not_beforeAvg?: Maybe<Scalars['Float']['output']>;
  not_beforeMax?: Maybe<Scalars['Int64']['output']>;
  not_beforeMin?: Maybe<Scalars['Int64']['output']>;
  not_beforeSum?: Maybe<Scalars['Int64']['output']>;
  profile_infoMax?: Maybe<Scalars['String']['output']>;
  profile_infoMin?: Maybe<Scalars['String']['output']>;
  providerAccountIdMax?: Maybe<Scalars['String']['output']>;
  providerAccountIdMin?: Maybe<Scalars['String']['output']>;
  providerMax?: Maybe<Scalars['String']['output']>;
  providerMin?: Maybe<Scalars['String']['output']>;
  refresh_tokenMax?: Maybe<Scalars['String']['output']>;
  refresh_tokenMin?: Maybe<Scalars['String']['output']>;
  refresh_token_expires_inAvg?: Maybe<Scalars['Float']['output']>;
  refresh_token_expires_inMax?: Maybe<Scalars['Int64']['output']>;
  refresh_token_expires_inMin?: Maybe<Scalars['Int64']['output']>;
  refresh_token_expires_inSum?: Maybe<Scalars['Int64']['output']>;
  scopeMax?: Maybe<Scalars['String']['output']>;
  scopeMin?: Maybe<Scalars['String']['output']>;
  session_stateMax?: Maybe<Scalars['String']['output']>;
  session_stateMin?: Maybe<Scalars['String']['output']>;
  token_typeMax?: Maybe<Scalars['String']['output']>;
  token_typeMin?: Maybe<Scalars['String']['output']>;
  typeMax?: Maybe<Scalars['String']['output']>;
  typeMin?: Maybe<Scalars['String']['output']>;
};

export type AccountFilter = {
  and?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  has?: InputMaybe<Array<InputMaybe<AccountHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<AccountFilter>;
  or?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  provider?: InputMaybe<StringHashFilter>;
  providerAccountId?: InputMaybe<StringHashFilter>;
};

export enum AccountHasFilter {
  AccessToken = 'access_token',
  ExpiresAt = 'expires_at',
  IdToken = 'id_token',
  IdTokenExpiresIn = 'id_token_expires_in',
  NotBefore = 'not_before',
  ProfileInfo = 'profile_info',
  Provider = 'provider',
  ProviderAccountId = 'providerAccountId',
  RefreshToken = 'refresh_token',
  RefreshTokenExpiresIn = 'refresh_token_expires_in',
  Scope = 'scope',
  SessionState = 'session_state',
  TokenType = 'token_type',
  Type = 'type',
  User = 'user'
}

export type AccountOrder = {
  asc?: InputMaybe<AccountOrderable>;
  desc?: InputMaybe<AccountOrderable>;
  then?: InputMaybe<AccountOrder>;
};

export enum AccountOrderable {
  AccessToken = 'access_token',
  ExpiresAt = 'expires_at',
  IdToken = 'id_token',
  IdTokenExpiresIn = 'id_token_expires_in',
  NotBefore = 'not_before',
  ProfileInfo = 'profile_info',
  Provider = 'provider',
  ProviderAccountId = 'providerAccountId',
  RefreshToken = 'refresh_token',
  RefreshTokenExpiresIn = 'refresh_token_expires_in',
  Scope = 'scope',
  SessionState = 'session_state',
  TokenType = 'token_type',
  Type = 'type'
}

export type AccountPatch = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Int64']['input']>;
  id_token?: InputMaybe<Scalars['String']['input']>;
  id_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  not_before?: InputMaybe<Scalars['Int64']['input']>;
  profile_info?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  refresh_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  session_state?: InputMaybe<Scalars['String']['input']>;
  token_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type AccountRef = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Int64']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_token?: InputMaybe<Scalars['String']['input']>;
  id_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  not_before?: InputMaybe<Scalars['Int64']['input']>;
  profile_info?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  refresh_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  session_state?: InputMaybe<Scalars['String']['input']>;
  token_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type AddAccountInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Int64']['input']>;
  id_token?: InputMaybe<Scalars['String']['input']>;
  id_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  not_before?: InputMaybe<Scalars['Int64']['input']>;
  profile_info?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  refresh_token_expires_in?: InputMaybe<Scalars['Int64']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  session_state?: InputMaybe<Scalars['String']['input']>;
  token_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type AddAccountPayload = {
  __typename?: 'AddAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddAccountPayloadAccountArgs = {
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};

export type AddAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  line3?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
};

export type AddAddressPayload = {
  __typename?: 'AddAddressPayload';
  address?: Maybe<Array<Maybe<Address>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddAddressPayloadAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AddressOrder>;
};

export type AddCryptoAddressInput = {
  address: Scalars['String']['input'];
  chainId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  protocol?: InputMaybe<CryptoAddressProtocol>;
  type?: InputMaybe<CryptoAddressType>;
};

export type AddCryptoAddressPayload = {
  __typename?: 'AddCryptoAddressPayload';
  cryptoAddress?: Maybe<Array<Maybe<CryptoAddress>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddCryptoAddressPayloadCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CryptoAddressOrder>;
};

export type AddDocumentInput = {
  access?: InputMaybe<DocumentAccessType>;
  creationDate: Scalars['DateTime']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<DocumentFormat>;
  lastUpdate: Scalars['DateTime']['input'];
  offering?: InputMaybe<OfferingRef>;
  offeringUniqueId: Scalars['String']['input'];
  owner?: InputMaybe<LegalEntityRef>;
  signatories?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  smartContract?: InputMaybe<SmartContractRef>;
  text?: InputMaybe<Scalars['String']['input']>;
  thumbnailImage?: InputMaybe<ImageRef>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<DocumentType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AddDocumentPayload = {
  __typename?: 'AddDocumentPayload';
  document?: Maybe<Array<Maybe<Document>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddDocumentPayloadDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};

export type AddDocumentSignatoryInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  document: DocumentRef;
  legalEntity?: InputMaybe<LegalEntityRef>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signerAddress?: InputMaybe<Scalars['String']['input']>;
};

export type AddDocumentSignatoryPayload = {
  __typename?: 'AddDocumentSignatoryPayload';
  documentSignatory?: Maybe<Array<Maybe<DocumentSignatory>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddDocumentSignatoryPayloadDocumentSignatoryArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};

export type AddEmailAddressInput = {
  address: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<OrganizationRef>;
};

export type AddEmailAddressPayload = {
  __typename?: 'AddEmailAddressPayload';
  emailAddress?: Maybe<Array<Maybe<EmailAddress>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddEmailAddressPayloadEmailAddressArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmailAddressOrder>;
};

export type AddImageInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type AddImagePayload = {
  __typename?: 'AddImagePayload';
  image?: Maybe<Array<Maybe<Image>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddImagePayloadImageArgs = {
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ImageOrder>;
};

export type AddInvestorApplicationInput = {
  applicationDoc: DocumentRef;
  creationDate: Scalars['DateTime']['input'];
  lastUpdate: Scalars['DateTime']['input'];
  offeringParticipant: OfferingParticipantRef;
};

export type AddInvestorApplicationPayload = {
  __typename?: 'AddInvestorApplicationPayload';
  investorApplication?: Maybe<Array<Maybe<InvestorApplication>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddInvestorApplicationPayloadInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InvestorApplicationOrder>;
};

export type AddJurisdictionInput = {
  country: Scalars['String']['input'];
  province?: InputMaybe<Scalars['String']['input']>;
};

export type AddJurisdictionPayload = {
  __typename?: 'AddJurisdictionPayload';
  jurisdiction?: Maybe<Array<Maybe<Jurisdiction>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddJurisdictionPayloadJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JurisdictionOrder>;
};

export type AddLegalEntityInput = {
  addresses?: InputMaybe<Array<InputMaybe<AddressRef>>>;
  creationDate: Scalars['DateTime']['input'];
  displayName?: InputMaybe<Scalars['String']['input']>;
  documentsOwned?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  documentsSigned?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate: Scalars['DateTime']['input'];
  legalName?: InputMaybe<Scalars['String']['input']>;
  offerings?: InputMaybe<Array<InputMaybe<OfferingRef>>>;
  operatingCurrency?: InputMaybe<CurrencyCode>;
  organization: OrganizationRef;
  owners?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  purpose?: InputMaybe<Scalars['String']['input']>;
  realEstateProperties?: InputMaybe<Array<InputMaybe<RealEstatePropertyRef>>>;
  smartContracts?: InputMaybe<Array<InputMaybe<SmartContractRef>>>;
  subsidiaries?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  type: LegalEntityType;
  walletAddresses?: InputMaybe<Array<InputMaybe<CryptoAddressRef>>>;
};

export type AddLegalEntityPayload = {
  __typename?: 'AddLegalEntityPayload';
  legalEntity?: Maybe<Array<Maybe<LegalEntity>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddLegalEntityPayloadLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};

export type AddLinkedAccountInput = {
  accountProvidedId?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  organization: OrganizationRef;
  type?: InputMaybe<LinkedAccountType>;
  url: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AddLinkedAccountPayload = {
  __typename?: 'AddLinkedAccountPayload';
  linkedAccount?: Maybe<Array<Maybe<LinkedAccount>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddLinkedAccountPayloadLinkedAccountArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LinkedAccountOrder>;
};

export type AddNotificationConfigurationInput = {
  notificationMethod: NotificationMethod;
  notificationRecipientType: NotificationRecipientType;
  notificationSubject: NotificationSubject;
  organizationUser: OrganizationUserRef;
};

export type AddNotificationConfigurationPayload = {
  __typename?: 'AddNotificationConfigurationPayload';
  notificationConfiguration?: Maybe<Array<Maybe<NotificationConfiguration>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddNotificationConfigurationPayloadNotificationConfigurationArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AddOfferingDescriptionTextInput = {
  creationDate: Scalars['DateTime']['input'];
  lastUpdate: Scalars['DateTime']['input'];
  offering?: InputMaybe<OfferingRef>;
  order: Scalars['Int']['input'];
  section: OfferingTabSection;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AddOfferingDescriptionTextPayload = {
  __typename?: 'AddOfferingDescriptionTextPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDescriptionText?: Maybe<Array<Maybe<OfferingDescriptionText>>>;
};


export type AddOfferingDescriptionTextPayloadOfferingDescriptionTextArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDescriptionTextOrder>;
};

export type AddOfferingDetailsInput = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  adminExpense?: InputMaybe<Scalars['Int']['input']>;
  capRate?: InputMaybe<Scalars['Int']['input']>;
  cocReturn?: InputMaybe<Scalars['Int']['input']>;
  customOnboardingLink?: InputMaybe<Scalars['String']['input']>;
  distributionCurrency?: InputMaybe<CurrencyCode>;
  distributionDescription?: InputMaybe<Scalars['String']['input']>;
  distributionFrequency?: InputMaybe<Scalars['Int']['input']>;
  distributionPeriod?: InputMaybe<DistributionPeriodType>;
  investmentCurrency: CurrencyCode;
  maxInvestors?: InputMaybe<Scalars['Int']['input']>;
  maxRaise?: InputMaybe<Scalars['Int64']['input']>;
  maxUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  minInvestors?: InputMaybe<Scalars['Int']['input']>;
  minRaise?: InputMaybe<Scalars['Int64']['input']>;
  minUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  numUnits?: InputMaybe<Scalars['Int']['input']>;
  offering: OfferingRef;
  preferredReturn?: InputMaybe<Scalars['Int']['input']>;
  priceStart?: InputMaybe<Scalars['Int']['input']>;
  projectedAppreciation?: InputMaybe<Scalars['Int']['input']>;
  projectedIrr?: InputMaybe<Scalars['Int']['input']>;
  projectedIrrMax?: InputMaybe<Scalars['Int']['input']>;
  raisePeriod?: InputMaybe<Scalars['Int']['input']>;
  raiseStart?: InputMaybe<Scalars['DateTime']['input']>;
  stage?: InputMaybe<OfferingStage>;
  targetEquityMultiple?: InputMaybe<Scalars['Int']['input']>;
  targetEquityMultipleMax?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<OfferingDetailsType>;
  unitName?: InputMaybe<UnitName>;
};

export type AddOfferingDetailsPayload = {
  __typename?: 'AddOfferingDetailsPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDetails?: Maybe<Array<Maybe<OfferingDetails>>>;
};


export type AddOfferingDetailsPayloadOfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDetailsOrder>;
};

export type AddOfferingDistributionInput = {
  contractIndex: Scalars['Int']['input'];
  transactionHash: Scalars['String']['input'];
};

export type AddOfferingDistributionPayload = {
  __typename?: 'AddOfferingDistributionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDistribution?: Maybe<Array<Maybe<OfferingDistribution>>>;
};


export type AddOfferingDistributionPayloadOfferingDistributionArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDistributionOrder>;
};

export type AddOfferingInput = {
  accessCode?: InputMaybe<Scalars['String']['input']>;
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  creationDate: Scalars['DateTime']['input'];
  details?: InputMaybe<OfferingDetailsRef>;
  distributions?: InputMaybe<Array<InputMaybe<OfferingDistributionRef>>>;
  documents?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate: Scalars['DateTime']['input'];
  lightBrand?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  offeringEntity: LegalEntityRef;
  participants?: InputMaybe<Array<InputMaybe<OfferingParticipantRef>>>;
  primaryVideo?: InputMaybe<Scalars['String']['input']>;
  profileDescriptions?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextRef>>>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  smartContractSets?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetRef>>>;
  waitlistOn?: InputMaybe<Scalars['Boolean']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type AddOfferingParticipantInput = {
  addressOfferingId: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  creationDate: Scalars['DateTime']['input'];
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  investorApplication?: InputMaybe<InvestorApplicationRef>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate: Scalars['DateTime']['input'];
  maxPledge?: InputMaybe<Scalars['Int']['input']>;
  minPledge?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offering: OfferingRef;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  walletAddress: Scalars['String']['input'];
  whitelistTransactions?: InputMaybe<Array<InputMaybe<WhitelistTransactionRef>>>;
};

export type AddOfferingParticipantPayload = {
  __typename?: 'AddOfferingParticipantPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringParticipant?: Maybe<Array<Maybe<OfferingParticipant>>>;
};


export type AddOfferingParticipantPayloadOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingParticipantOrder>;
};

export type AddOfferingPayload = {
  __typename?: 'AddOfferingPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offering?: Maybe<Array<Maybe<Offering>>>;
};


export type AddOfferingPayloadOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingOrder>;
};

export type AddOfferingSmartContractSetInput = {
  distributionContract?: InputMaybe<SmartContractRef>;
  offering?: InputMaybe<OfferingRef>;
  shareContract?: InputMaybe<SmartContractRef>;
  swapContract?: InputMaybe<SmartContractRef>;
};

export type AddOfferingSmartContractSetPayload = {
  __typename?: 'AddOfferingSmartContractSetPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringSmartContractSet?: Maybe<Array<Maybe<OfferingSmartContractSet>>>;
};


export type AddOfferingSmartContractSetPayloadOfferingSmartContractSetArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AddOrganizationInput = {
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  creationDate: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  emailAddresses?: InputMaybe<Array<InputMaybe<EmailAddressRef>>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate: Scalars['DateTime']['input'];
  legalEntities?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  linkedAccounts?: InputMaybe<Array<InputMaybe<LinkedAccountRef>>>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<OrganizationUserRef>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type AddOrganizationPayload = {
  __typename?: 'AddOrganizationPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  organization?: Maybe<Array<Maybe<Organization>>>;
};


export type AddOrganizationPayloadOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrganizationOrder>;
};

export type AddOrganizationUserInput = {
  notificationConfigurations?: InputMaybe<Array<InputMaybe<NotificationConfigurationRef>>>;
  organization: OrganizationRef;
  permissions?: InputMaybe<Array<OrganizationPermissionType>>;
  user: UserRef;
};

export type AddOrganizationUserPayload = {
  __typename?: 'AddOrganizationUserPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  organizationUser?: Maybe<Array<Maybe<OrganizationUser>>>;
};


export type AddOrganizationUserPayloadOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AddRealEstatePropertyInput = {
  address?: InputMaybe<AddressRef>;
  amenitiesDescription?: InputMaybe<Scalars['String']['input']>;
  assetValue?: InputMaybe<Scalars['Int']['input']>;
  assetValueNote?: InputMaybe<Scalars['String']['input']>;
  closingCosts?: InputMaybe<Scalars['Int']['input']>;
  creationDate: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  downPayment?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageRef>>>;
  investmentStatus?: InputMaybe<AssetStatus>;
  lastUpdate: Scalars['DateTime']['input'];
  lenderFees?: InputMaybe<Scalars['Int']['input']>;
  loan?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  propertyType: RealEstatePropertyType;
};

export type AddRealEstatePropertyPayload = {
  __typename?: 'AddRealEstatePropertyPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  realEstateProperty?: Maybe<Array<Maybe<RealEstateProperty>>>;
};


export type AddRealEstatePropertyPayloadRealEstatePropertyArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RealEstatePropertyOrder>;
};

export type AddSessionInput = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type AddSessionPayload = {
  __typename?: 'AddSessionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  session?: Maybe<Array<Maybe<Session>>>;
};


export type AddSessionPayloadSessionArgs = {
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SessionOrder>;
};

export type AddShareOrderInput = {
  archived: Scalars['Boolean']['input'];
  contractIndex: Scalars['Int']['input'];
  creationDate: Scalars['DateTime']['input'];
  initiator: Scalars['String']['input'];
  lastUpdate: Scalars['DateTime']['input'];
  maxUnits?: InputMaybe<Scalars['Int']['input']>;
  minUnits?: InputMaybe<Scalars['Int']['input']>;
  swapContractAddress: Scalars['String']['input'];
  transactionHash: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AddShareOrderPayload = {
  __typename?: 'AddShareOrderPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  shareOrder?: Maybe<Array<Maybe<ShareOrder>>>;
};


export type AddShareOrderPayloadShareOrderArgs = {
  filter?: InputMaybe<ShareOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareOrderOrder>;
};

export type AddShareTransferEventInput = {
  amount: Scalars['Int']['input'];
  archived: Scalars['Boolean']['input'];
  currencyCode?: InputMaybe<CurrencyCode>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  partition: Scalars['String']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
  recipientAddress: Scalars['String']['input'];
  senderAddress: Scalars['String']['input'];
  shareContractAddress: Scalars['String']['input'];
  transactionHash: Scalars['String']['input'];
  type: ShareTransferEventType;
};

export type AddShareTransferEventPayload = {
  __typename?: 'AddShareTransferEventPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  shareTransferEvent?: Maybe<Array<Maybe<ShareTransferEvent>>>;
};


export type AddShareTransferEventPayloadShareTransferEventArgs = {
  filter?: InputMaybe<ShareTransferEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareTransferEventOrder>;
};

export type AddSmartContractInput = {
  backingToken?: InputMaybe<CurrencyCode>;
  cryptoAddress: CryptoAddressRef;
  document?: InputMaybe<DocumentRef>;
  established?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numTokensAuthorized?: InputMaybe<Scalars['Int64']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  partitions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subType?: InputMaybe<Scalars['String']['input']>;
  type: SmartContractType;
};

export type AddSmartContractPayload = {
  __typename?: 'AddSmartContractPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  smartContract?: Maybe<Array<Maybe<SmartContract>>>;
};


export type AddSmartContractPayloadSmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SmartContractOrder>;
};

export type AddUserInput = {
  accounts?: InputMaybe<Array<InputMaybe<AccountRef>>>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<Array<InputMaybe<OrganizationUserRef>>>;
  sessions?: InputMaybe<Array<InputMaybe<SessionRef>>>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type AddUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export type AddVerificationTokenInput = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type AddVerificationTokenPayload = {
  __typename?: 'AddVerificationTokenPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  verificationToken?: Maybe<Array<Maybe<VerificationToken>>>;
};


export type AddVerificationTokenPayloadVerificationTokenArgs = {
  filter?: InputMaybe<VerificationTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<VerificationTokenOrder>;
};

export type AddWhitelistTransactionInput = {
  offeringParticipant: OfferingParticipantRef;
  transactionHash: Scalars['String']['input'];
  type: WhitelistTransactionType;
};

export type AddWhitelistTransactionPayload = {
  __typename?: 'AddWhitelistTransactionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  whitelistTransaction?: Maybe<Array<Maybe<WhitelistTransaction>>>;
};


export type AddWhitelistTransactionPayloadWhitelistTransactionArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WhitelistTransactionOrder>;
};

/** ENTITY MODEL */
export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  line3?: Maybe<Scalars['String']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  owner?: Maybe<LegalEntity>;
  postalCode?: Maybe<Scalars['String']['output']>;
  stateProvince?: Maybe<Scalars['String']['output']>;
};


/** ENTITY MODEL */
export type AddressOwnerArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};

export type AddressAggregateResult = {
  __typename?: 'AddressAggregateResult';
  cityMax?: Maybe<Scalars['String']['output']>;
  cityMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  countryMax?: Maybe<Scalars['String']['output']>;
  countryMin?: Maybe<Scalars['String']['output']>;
  labelMax?: Maybe<Scalars['String']['output']>;
  labelMin?: Maybe<Scalars['String']['output']>;
  latAvg?: Maybe<Scalars['Float']['output']>;
  latMax?: Maybe<Scalars['Float']['output']>;
  latMin?: Maybe<Scalars['Float']['output']>;
  latSum?: Maybe<Scalars['Float']['output']>;
  line1Max?: Maybe<Scalars['String']['output']>;
  line1Min?: Maybe<Scalars['String']['output']>;
  line2Max?: Maybe<Scalars['String']['output']>;
  line2Min?: Maybe<Scalars['String']['output']>;
  line3Max?: Maybe<Scalars['String']['output']>;
  line3Min?: Maybe<Scalars['String']['output']>;
  lngAvg?: Maybe<Scalars['Float']['output']>;
  lngMax?: Maybe<Scalars['Float']['output']>;
  lngMin?: Maybe<Scalars['Float']['output']>;
  lngSum?: Maybe<Scalars['Float']['output']>;
  postalCodeMax?: Maybe<Scalars['String']['output']>;
  postalCodeMin?: Maybe<Scalars['String']['output']>;
  stateProvinceMax?: Maybe<Scalars['String']['output']>;
  stateProvinceMin?: Maybe<Scalars['String']['output']>;
};

export type AddressFilter = {
  and?: InputMaybe<Array<InputMaybe<AddressFilter>>>;
  has?: InputMaybe<Array<InputMaybe<AddressHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<AddressFilter>;
  or?: InputMaybe<Array<InputMaybe<AddressFilter>>>;
};

export enum AddressHasFilter {
  City = 'city',
  Country = 'country',
  Label = 'label',
  Lat = 'lat',
  Line1 = 'line1',
  Line2 = 'line2',
  Line3 = 'line3',
  Lng = 'lng',
  Owner = 'owner',
  PostalCode = 'postalCode',
  StateProvince = 'stateProvince'
}

export type AddressOrder = {
  asc?: InputMaybe<AddressOrderable>;
  desc?: InputMaybe<AddressOrderable>;
  then?: InputMaybe<AddressOrder>;
};

export enum AddressOrderable {
  City = 'city',
  Country = 'country',
  Label = 'label',
  Lat = 'lat',
  Line1 = 'line1',
  Line2 = 'line2',
  Line3 = 'line3',
  Lng = 'lng',
  PostalCode = 'postalCode',
  StateProvince = 'stateProvince'
}

export type AddressPatch = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  line3?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
};

export type AddressRef = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  line3?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
};

/** REAL ESTATE PROPERTY MODEL */
export enum AssetStatus {
  Closed = 'CLOSED',
  DueDiligence = 'DUE_DILIGENCE',
  ForSale = 'FOR_SALE',
  Identified = 'IDENTIFIED',
  InNegotiation = 'IN_NEGOTIATION',
  UnderContract = 'UNDER_CONTRACT'
}

export type AuthRule = {
  and?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  not?: InputMaybe<AuthRule>;
  or?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  rule?: InputMaybe<Scalars['String']['input']>;
};

export type ContainsFilter = {
  point?: InputMaybe<PointRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type CryptoAddress = {
  __typename?: 'CryptoAddress';
  address: Scalars['String']['output'];
  chainId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<LegalEntity>;
  protocol?: Maybe<CryptoAddressProtocol>;
  type?: Maybe<CryptoAddressType>;
};


export type CryptoAddressOwnerArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};

export type CryptoAddressAggregateResult = {
  __typename?: 'CryptoAddressAggregateResult';
  addressMax?: Maybe<Scalars['String']['output']>;
  addressMin?: Maybe<Scalars['String']['output']>;
  chainIdAvg?: Maybe<Scalars['Float']['output']>;
  chainIdMax?: Maybe<Scalars['Int']['output']>;
  chainIdMin?: Maybe<Scalars['Int']['output']>;
  chainIdSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  descriptionMax?: Maybe<Scalars['String']['output']>;
  descriptionMin?: Maybe<Scalars['String']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
};

export type CryptoAddressFilter = {
  address?: InputMaybe<StringHashFilter>;
  and?: InputMaybe<Array<InputMaybe<CryptoAddressFilter>>>;
  has?: InputMaybe<Array<InputMaybe<CryptoAddressHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<CryptoAddressFilter>;
  or?: InputMaybe<Array<InputMaybe<CryptoAddressFilter>>>;
};

export enum CryptoAddressHasFilter {
  Address = 'address',
  ChainId = 'chainId',
  Description = 'description',
  IsPublic = 'isPublic',
  Name = 'name',
  Owner = 'owner',
  Protocol = 'protocol',
  Type = 'type'
}

export type CryptoAddressOrder = {
  asc?: InputMaybe<CryptoAddressOrderable>;
  desc?: InputMaybe<CryptoAddressOrderable>;
  then?: InputMaybe<CryptoAddressOrder>;
};

export enum CryptoAddressOrderable {
  Address = 'address',
  ChainId = 'chainId',
  Description = 'description',
  Name = 'name'
}

export type CryptoAddressPatch = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  protocol?: InputMaybe<CryptoAddressProtocol>;
  type?: InputMaybe<CryptoAddressType>;
};

/** CRYPTO MODEL  */
export enum CryptoAddressProtocol {
  Ada = 'ADA',
  Algo = 'ALGO',
  Btc = 'BTC',
  Eth = 'ETH'
}

export type CryptoAddressRef = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  protocol?: InputMaybe<CryptoAddressProtocol>;
  type?: InputMaybe<CryptoAddressType>;
};

export enum CryptoAddressType {
  Contract = 'CONTRACT',
  Wallet = 'WALLET'
}

/** CURRENCY */
export enum CurrencyCode {
  Ada = 'ADA',
  AlgoUsdc = 'ALGO_USDC',
  AlgoUsdcTest = 'ALGO_USDC_TEST_',
  Aud = 'AUD',
  BaseDai = 'BASE_DAI',
  BaseDaiTest = 'BASE_DAI_TEST_',
  BaseUsdc = 'BASE_USDC',
  BaseUsdcTest = 'BASE_USDC_TEST_',
  Btc = 'BTC',
  Cad = 'CAD',
  Cc = 'CC',
  Dai = 'DAI',
  DaiLocalTest = 'DAI_LOCAL_TEST_',
  DaiPolTest = 'DAI_POL_TEST_',
  DaiTest = 'DAI_TEST_',
  Eth = 'ETH',
  Eur = 'EUR',
  Gbp = 'GBP',
  Kyd = 'KYD',
  Pol = 'POL',
  PoSDai = 'PoS_DAI',
  PoSUsdc = 'PoS_USDC',
  RealShare = 'REAL_SHARE',
  Usd = 'USD',
  Usdc = 'USDC',
  UsdcLocalTest = 'USDC_LOCAL_TEST_',
  UsdcPolTest = 'USDC_POL_TEST_',
  UsdcTest = 'USDC_TEST_'
}

export type CustomHttp = {
  body?: InputMaybe<Scalars['String']['input']>;
  forwardHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  graphql?: InputMaybe<Scalars['String']['input']>;
  introspectionHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  method: HttpMethod;
  mode?: InputMaybe<Mode>;
  secretHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  skipIntrospection?: InputMaybe<Scalars['Boolean']['input']>;
  url: Scalars['String']['input'];
};

export type DateTimeFilter = {
  between?: InputMaybe<DateTimeRange>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  ge?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  le?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime']['input'];
  min: Scalars['DateTime']['input'];
};

export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteAccountPayloadAccountArgs = {
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};

export type DeleteAddressPayload = {
  __typename?: 'DeleteAddressPayload';
  address?: Maybe<Array<Maybe<Address>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteAddressPayloadAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AddressOrder>;
};

export type DeleteCryptoAddressPayload = {
  __typename?: 'DeleteCryptoAddressPayload';
  cryptoAddress?: Maybe<Array<Maybe<CryptoAddress>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteCryptoAddressPayloadCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CryptoAddressOrder>;
};

export type DeleteDocumentPayload = {
  __typename?: 'DeleteDocumentPayload';
  document?: Maybe<Array<Maybe<Document>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteDocumentPayloadDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};

export type DeleteDocumentSignatoryPayload = {
  __typename?: 'DeleteDocumentSignatoryPayload';
  documentSignatory?: Maybe<Array<Maybe<DocumentSignatory>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteDocumentSignatoryPayloadDocumentSignatoryArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};

export type DeleteEmailAddressPayload = {
  __typename?: 'DeleteEmailAddressPayload';
  emailAddress?: Maybe<Array<Maybe<EmailAddress>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteEmailAddressPayloadEmailAddressArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmailAddressOrder>;
};

export type DeleteImagePayload = {
  __typename?: 'DeleteImagePayload';
  image?: Maybe<Array<Maybe<Image>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteImagePayloadImageArgs = {
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ImageOrder>;
};

export type DeleteInvestorApplicationPayload = {
  __typename?: 'DeleteInvestorApplicationPayload';
  investorApplication?: Maybe<Array<Maybe<InvestorApplication>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteInvestorApplicationPayloadInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InvestorApplicationOrder>;
};

export type DeleteJurisdictionPayload = {
  __typename?: 'DeleteJurisdictionPayload';
  jurisdiction?: Maybe<Array<Maybe<Jurisdiction>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteJurisdictionPayloadJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JurisdictionOrder>;
};

export type DeleteLegalEntityPayload = {
  __typename?: 'DeleteLegalEntityPayload';
  legalEntity?: Maybe<Array<Maybe<LegalEntity>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteLegalEntityPayloadLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};

export type DeleteLinkedAccountPayload = {
  __typename?: 'DeleteLinkedAccountPayload';
  linkedAccount?: Maybe<Array<Maybe<LinkedAccount>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteLinkedAccountPayloadLinkedAccountArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LinkedAccountOrder>;
};

export type DeleteNotificationConfigurationPayload = {
  __typename?: 'DeleteNotificationConfigurationPayload';
  msg?: Maybe<Scalars['String']['output']>;
  notificationConfiguration?: Maybe<Array<Maybe<NotificationConfiguration>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteNotificationConfigurationPayloadNotificationConfigurationArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteOfferingDescriptionTextPayload = {
  __typename?: 'DeleteOfferingDescriptionTextPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDescriptionText?: Maybe<Array<Maybe<OfferingDescriptionText>>>;
};


export type DeleteOfferingDescriptionTextPayloadOfferingDescriptionTextArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDescriptionTextOrder>;
};

export type DeleteOfferingDetailsPayload = {
  __typename?: 'DeleteOfferingDetailsPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDetails?: Maybe<Array<Maybe<OfferingDetails>>>;
};


export type DeleteOfferingDetailsPayloadOfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDetailsOrder>;
};

export type DeleteOfferingDistributionPayload = {
  __typename?: 'DeleteOfferingDistributionPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDistribution?: Maybe<Array<Maybe<OfferingDistribution>>>;
};


export type DeleteOfferingDistributionPayloadOfferingDistributionArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDistributionOrder>;
};

export type DeleteOfferingParticipantPayload = {
  __typename?: 'DeleteOfferingParticipantPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringParticipant?: Maybe<Array<Maybe<OfferingParticipant>>>;
};


export type DeleteOfferingParticipantPayloadOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingParticipantOrder>;
};

export type DeleteOfferingPayload = {
  __typename?: 'DeleteOfferingPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offering?: Maybe<Array<Maybe<Offering>>>;
};


export type DeleteOfferingPayloadOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingOrder>;
};

export type DeleteOfferingSmartContractSetPayload = {
  __typename?: 'DeleteOfferingSmartContractSetPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringSmartContractSet?: Maybe<Array<Maybe<OfferingSmartContractSet>>>;
};


export type DeleteOfferingSmartContractSetPayloadOfferingSmartContractSetArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  organization?: Maybe<Array<Maybe<Organization>>>;
};


export type DeleteOrganizationPayloadOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrganizationOrder>;
};

export type DeleteOrganizationUserPayload = {
  __typename?: 'DeleteOrganizationUserPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  organizationUser?: Maybe<Array<Maybe<OrganizationUser>>>;
};


export type DeleteOrganizationUserPayloadOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteRealEstatePropertyPayload = {
  __typename?: 'DeleteRealEstatePropertyPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  realEstateProperty?: Maybe<Array<Maybe<RealEstateProperty>>>;
};


export type DeleteRealEstatePropertyPayloadRealEstatePropertyArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RealEstatePropertyOrder>;
};

export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  session?: Maybe<Array<Maybe<Session>>>;
};


export type DeleteSessionPayloadSessionArgs = {
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SessionOrder>;
};

export type DeleteShareOrderPayload = {
  __typename?: 'DeleteShareOrderPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  shareOrder?: Maybe<Array<Maybe<ShareOrder>>>;
};


export type DeleteShareOrderPayloadShareOrderArgs = {
  filter?: InputMaybe<ShareOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareOrderOrder>;
};

export type DeleteShareTransferEventPayload = {
  __typename?: 'DeleteShareTransferEventPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  shareTransferEvent?: Maybe<Array<Maybe<ShareTransferEvent>>>;
};


export type DeleteShareTransferEventPayloadShareTransferEventArgs = {
  filter?: InputMaybe<ShareTransferEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareTransferEventOrder>;
};

export type DeleteSmartContractPayload = {
  __typename?: 'DeleteSmartContractPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  smartContract?: Maybe<Array<Maybe<SmartContract>>>;
};


export type DeleteSmartContractPayloadSmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SmartContractOrder>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type DeleteUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export type DeleteVerificationTokenPayload = {
  __typename?: 'DeleteVerificationTokenPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  verificationToken?: Maybe<Array<Maybe<VerificationToken>>>;
};


export type DeleteVerificationTokenPayloadVerificationTokenArgs = {
  filter?: InputMaybe<VerificationTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<VerificationTokenOrder>;
};

export type DeleteWhitelistTransactionPayload = {
  __typename?: 'DeleteWhitelistTransactionPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  whitelistTransaction?: Maybe<Array<Maybe<WhitelistTransaction>>>;
};


export type DeleteWhitelistTransactionPayloadWhitelistTransactionArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WhitelistTransactionOrder>;
};

export enum DgraphIndex {
  Bool = 'bool',
  Day = 'day',
  Exact = 'exact',
  Float = 'float',
  Fulltext = 'fulltext',
  Geo = 'geo',
  Hash = 'hash',
  Hnsw = 'hnsw',
  Hour = 'hour',
  Int = 'int',
  Int64 = 'int64',
  Month = 'month',
  Regexp = 'regexp',
  Term = 'term',
  Trigram = 'trigram',
  Year = 'year'
}

export enum DistributionPeriodType {
  Day = 'DAY',
  Described = 'DESCRIBED',
  Month = 'MONTH',
  None = 'NONE',
  Quarter = 'QUARTER',
  Unspecified = 'UNSPECIFIED',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Document = {
  __typename?: 'Document';
  access?: Maybe<DocumentAccessType>;
  creationDate: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  format?: Maybe<DocumentFormat>;
  id: Scalars['ID']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  offering?: Maybe<Offering>;
  offeringUniqueId: Scalars['String']['output'];
  owner?: Maybe<LegalEntity>;
  signatories?: Maybe<Array<Maybe<DocumentSignatory>>>;
  signatoriesAggregate?: Maybe<DocumentSignatoryAggregateResult>;
  smartContract?: Maybe<SmartContract>;
  text?: Maybe<Scalars['String']['output']>;
  thumbnailImage?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DocumentType>;
  url?: Maybe<Scalars['String']['output']>;
};


export type DocumentOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};


export type DocumentOwnerArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type DocumentSignatoriesArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};


export type DocumentSignatoriesAggregateArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
};


export type DocumentSmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};


export type DocumentThumbnailImageArgs = {
  filter?: InputMaybe<ImageFilter>;
};

export enum DocumentAccessType {
  Owner = 'OWNER',
  Public = 'PUBLIC',
  Signatory = 'SIGNATORY',
  Token = 'TOKEN'
}

export type DocumentAggregateResult = {
  __typename?: 'DocumentAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  dateMax?: Maybe<Scalars['DateTime']['output']>;
  dateMin?: Maybe<Scalars['DateTime']['output']>;
  fileIdMax?: Maybe<Scalars['String']['output']>;
  fileIdMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  offeringUniqueIdMax?: Maybe<Scalars['String']['output']>;
  offeringUniqueIdMin?: Maybe<Scalars['String']['output']>;
  textMax?: Maybe<Scalars['String']['output']>;
  textMin?: Maybe<Scalars['String']['output']>;
  titleMax?: Maybe<Scalars['String']['output']>;
  titleMin?: Maybe<Scalars['String']['output']>;
  urlMax?: Maybe<Scalars['String']['output']>;
  urlMin?: Maybe<Scalars['String']['output']>;
};

export type DocumentFilter = {
  and?: InputMaybe<Array<InputMaybe<DocumentFilter>>>;
  fileId?: InputMaybe<StringTermFilter>;
  has?: InputMaybe<Array<InputMaybe<DocumentHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<DocumentFilter>;
  offeringUniqueId?: InputMaybe<StringHashFilter>;
  or?: InputMaybe<Array<InputMaybe<DocumentFilter>>>;
};

/** PRIMARY	MODEL ================================================================== */
export enum DocumentFormat {
  Excel = 'EXCEL',
  Github = 'GITHUB',
  GoogleDoc = 'GOOGLE_DOC',
  GoogleDrive = 'GOOGLE_DRIVE',
  GoogleSheet = 'GOOGLE_SHEET',
  GoogleSlide = 'GOOGLE_SLIDE',
  Markdown = 'MARKDOWN',
  Notion = 'NOTION',
  Other = 'OTHER',
  Pdf = 'PDF',
  Powerpoint = 'POWERPOINT',
  Video = 'VIDEO',
  WordDoc = 'WORD_DOC'
}

export enum DocumentHasFilter {
  Access = 'access',
  CreationDate = 'creationDate',
  Date = 'date',
  FileId = 'fileId',
  Format = 'format',
  LastUpdate = 'lastUpdate',
  Offering = 'offering',
  OfferingUniqueId = 'offeringUniqueId',
  Owner = 'owner',
  Signatories = 'signatories',
  SmartContract = 'smartContract',
  Text = 'text',
  ThumbnailImage = 'thumbnailImage',
  Title = 'title',
  Type = 'type',
  Url = 'url'
}

export type DocumentOrder = {
  asc?: InputMaybe<DocumentOrderable>;
  desc?: InputMaybe<DocumentOrderable>;
  then?: InputMaybe<DocumentOrder>;
};

export enum DocumentOrderable {
  CreationDate = 'creationDate',
  Date = 'date',
  FileId = 'fileId',
  LastUpdate = 'lastUpdate',
  OfferingUniqueId = 'offeringUniqueId',
  Text = 'text',
  Title = 'title',
  Url = 'url'
}

export type DocumentPatch = {
  access?: InputMaybe<DocumentAccessType>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<DocumentFormat>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offering?: InputMaybe<OfferingRef>;
  offeringUniqueId?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  signatories?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  smartContract?: InputMaybe<SmartContractRef>;
  text?: InputMaybe<Scalars['String']['input']>;
  thumbnailImage?: InputMaybe<ImageRef>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<DocumentType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentRef = {
  access?: InputMaybe<DocumentAccessType>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<DocumentFormat>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offering?: InputMaybe<OfferingRef>;
  offeringUniqueId?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  signatories?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  smartContract?: InputMaybe<SmartContractRef>;
  text?: InputMaybe<Scalars['String']['input']>;
  thumbnailImage?: InputMaybe<ImageRef>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<DocumentType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentSignatory = {
  __typename?: 'DocumentSignatory';
  archived?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  document: Document;
  id: Scalars['ID']['output'];
  legalEntity?: Maybe<LegalEntity>;
  signature?: Maybe<Scalars['String']['output']>;
  signerAddress?: Maybe<Scalars['String']['output']>;
};


export type DocumentSignatoryDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type DocumentSignatoryLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};

export type DocumentSignatoryAggregateResult = {
  __typename?: 'DocumentSignatoryAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  dateMax?: Maybe<Scalars['DateTime']['output']>;
  dateMin?: Maybe<Scalars['DateTime']['output']>;
  signatureMax?: Maybe<Scalars['String']['output']>;
  signatureMin?: Maybe<Scalars['String']['output']>;
  signerAddressMax?: Maybe<Scalars['String']['output']>;
  signerAddressMin?: Maybe<Scalars['String']['output']>;
};

export type DocumentSignatoryFilter = {
  and?: InputMaybe<Array<InputMaybe<DocumentSignatoryFilter>>>;
  has?: InputMaybe<Array<InputMaybe<DocumentSignatoryHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<DocumentSignatoryFilter>;
  or?: InputMaybe<Array<InputMaybe<DocumentSignatoryFilter>>>;
};

export enum DocumentSignatoryHasFilter {
  Archived = 'archived',
  Date = 'date',
  Document = 'document',
  LegalEntity = 'legalEntity',
  Signature = 'signature',
  SignerAddress = 'signerAddress'
}

export type DocumentSignatoryOrder = {
  asc?: InputMaybe<DocumentSignatoryOrderable>;
  desc?: InputMaybe<DocumentSignatoryOrderable>;
  then?: InputMaybe<DocumentSignatoryOrder>;
};

export enum DocumentSignatoryOrderable {
  Date = 'date',
  Signature = 'signature',
  SignerAddress = 'signerAddress'
}

export type DocumentSignatoryPatch = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  document?: InputMaybe<DocumentRef>;
  legalEntity?: InputMaybe<LegalEntityRef>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signerAddress?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentSignatoryRef = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  document?: InputMaybe<DocumentRef>;
  id?: InputMaybe<Scalars['ID']['input']>;
  legalEntity?: InputMaybe<LegalEntityRef>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signerAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum DocumentType {
  Agreement = 'AGREEMENT',
  Disclosure = 'DISCLOSURE',
  FinancialStatement = 'FINANCIAL_STATEMENT',
  General = 'GENERAL',
  OfferingDocument = 'OFFERING_DOCUMENT',
  OperatingAgreement = 'OPERATING_AGREEMENT',
  Other = 'OTHER',
  Ppm = 'PPM',
  RegFiling = 'REG_FILING',
  ShareLink = 'SHARE_LINK'
}

export type EmailAddress = {
  __typename?: 'EmailAddress';
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
};


export type EmailAddressOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};

export type EmailAddressAggregateResult = {
  __typename?: 'EmailAddressAggregateResult';
  addressMax?: Maybe<Scalars['String']['output']>;
  addressMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  descriptionMax?: Maybe<Scalars['String']['output']>;
  descriptionMin?: Maybe<Scalars['String']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
};

export type EmailAddressFilter = {
  address?: InputMaybe<StringHashFilter>;
  and?: InputMaybe<Array<InputMaybe<EmailAddressFilter>>>;
  has?: InputMaybe<Array<InputMaybe<EmailAddressHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<EmailAddressFilter>;
  or?: InputMaybe<Array<InputMaybe<EmailAddressFilter>>>;
};

export enum EmailAddressHasFilter {
  Address = 'address',
  Description = 'description',
  IsPublic = 'isPublic',
  Name = 'name',
  Organization = 'organization'
}

export type EmailAddressOrder = {
  asc?: InputMaybe<EmailAddressOrderable>;
  desc?: InputMaybe<EmailAddressOrderable>;
  then?: InputMaybe<EmailAddressOrder>;
};

export enum EmailAddressOrderable {
  Address = 'address',
  Description = 'description',
  Name = 'name'
}

export type EmailAddressPatch = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<OrganizationRef>;
};

export type EmailAddressRef = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<OrganizationRef>;
};

export type FloatFilter = {
  between?: InputMaybe<FloatRange>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
};

export type FloatRange = {
  max: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
};

export type GenerateMutationParams = {
  add?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GenerateQueryParams = {
  aggregate?: InputMaybe<Scalars['Boolean']['input']>;
  get?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT'
}

export type Image = {
  __typename?: 'Image';
  fileId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ImageAggregateResult = {
  __typename?: 'ImageAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  fileIdMax?: Maybe<Scalars['String']['output']>;
  fileIdMin?: Maybe<Scalars['String']['output']>;
  labelMax?: Maybe<Scalars['String']['output']>;
  labelMin?: Maybe<Scalars['String']['output']>;
  urlMax?: Maybe<Scalars['String']['output']>;
  urlMin?: Maybe<Scalars['String']['output']>;
};

export type ImageFilter = {
  and?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  has?: InputMaybe<Array<InputMaybe<ImageHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<ImageFilter>;
  or?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
};

export enum ImageHasFilter {
  FileId = 'fileId',
  Label = 'label',
  Url = 'url'
}

export type ImageOrder = {
  asc?: InputMaybe<ImageOrderable>;
  desc?: InputMaybe<ImageOrderable>;
  then?: InputMaybe<ImageOrder>;
};

export enum ImageOrderable {
  FileId = 'fileId',
  Label = 'label',
  Url = 'url'
}

export type ImagePatch = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ImageRef = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Int64Filter = {
  between?: InputMaybe<Int64Range>;
  eq?: InputMaybe<Scalars['Int64']['input']>;
  ge?: InputMaybe<Scalars['Int64']['input']>;
  gt?: InputMaybe<Scalars['Int64']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int64']['input']>>>;
  le?: InputMaybe<Scalars['Int64']['input']>;
  lt?: InputMaybe<Scalars['Int64']['input']>;
};

export type Int64Range = {
  max: Scalars['Int64']['input'];
  min: Scalars['Int64']['input'];
};

export type IntFilter = {
  between?: InputMaybe<IntRange>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
};

export type IntRange = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};

export type IntersectsFilter = {
  multiPolygon?: InputMaybe<MultiPolygonRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type InvestorApplication = {
  __typename?: 'InvestorApplication';
  applicationDoc: Document;
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  offeringParticipant: OfferingParticipant;
};


export type InvestorApplicationApplicationDocArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type InvestorApplicationOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
};

export type InvestorApplicationAggregateResult = {
  __typename?: 'InvestorApplicationAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
};

export type InvestorApplicationFilter = {
  and?: InputMaybe<Array<InputMaybe<InvestorApplicationFilter>>>;
  has?: InputMaybe<Array<InputMaybe<InvestorApplicationHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<InvestorApplicationFilter>;
  or?: InputMaybe<Array<InputMaybe<InvestorApplicationFilter>>>;
};

export enum InvestorApplicationHasFilter {
  ApplicationDoc = 'applicationDoc',
  CreationDate = 'creationDate',
  LastUpdate = 'lastUpdate',
  OfferingParticipant = 'offeringParticipant'
}

export type InvestorApplicationOrder = {
  asc?: InputMaybe<InvestorApplicationOrderable>;
  desc?: InputMaybe<InvestorApplicationOrderable>;
  then?: InputMaybe<InvestorApplicationOrder>;
};

export enum InvestorApplicationOrderable {
  CreationDate = 'creationDate',
  LastUpdate = 'lastUpdate'
}

export type InvestorApplicationPatch = {
  applicationDoc?: InputMaybe<DocumentRef>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offeringParticipant?: InputMaybe<OfferingParticipantRef>;
};

export type InvestorApplicationRef = {
  applicationDoc?: InputMaybe<DocumentRef>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offeringParticipant?: InputMaybe<OfferingParticipantRef>;
};

export type Jurisdiction = {
  __typename?: 'Jurisdiction';
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  province?: Maybe<Scalars['String']['output']>;
};

export type JurisdictionAggregateResult = {
  __typename?: 'JurisdictionAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  countryMax?: Maybe<Scalars['String']['output']>;
  countryMin?: Maybe<Scalars['String']['output']>;
  provinceMax?: Maybe<Scalars['String']['output']>;
  provinceMin?: Maybe<Scalars['String']['output']>;
};

export type JurisdictionFilter = {
  and?: InputMaybe<Array<InputMaybe<JurisdictionFilter>>>;
  has?: InputMaybe<Array<InputMaybe<JurisdictionHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<JurisdictionFilter>;
  or?: InputMaybe<Array<InputMaybe<JurisdictionFilter>>>;
};

export enum JurisdictionHasFilter {
  Country = 'country',
  Province = 'province'
}

export type JurisdictionOrder = {
  asc?: InputMaybe<JurisdictionOrderable>;
  desc?: InputMaybe<JurisdictionOrderable>;
  then?: InputMaybe<JurisdictionOrder>;
};

export enum JurisdictionOrderable {
  Country = 'country',
  Province = 'province'
}

export type JurisdictionPatch = {
  country?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type JurisdictionRef = {
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type LegalEntity = {
  __typename?: 'LegalEntity';
  addresses?: Maybe<Array<Maybe<Address>>>;
  addressesAggregate?: Maybe<AddressAggregateResult>;
  creationDate: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  documentsOwned?: Maybe<Array<Maybe<Document>>>;
  documentsOwnedAggregate?: Maybe<DocumentAggregateResult>;
  documentsSigned?: Maybe<Array<Maybe<DocumentSignatory>>>;
  documentsSignedAggregate?: Maybe<DocumentSignatoryAggregateResult>;
  id: Scalars['ID']['output'];
  jurisdiction?: Maybe<Jurisdiction>;
  lastUpdate: Scalars['DateTime']['output'];
  legalName?: Maybe<Scalars['String']['output']>;
  offerings?: Maybe<Array<Maybe<Offering>>>;
  offeringsAggregate?: Maybe<OfferingAggregateResult>;
  operatingCurrency?: Maybe<CurrencyCode>;
  organization: Organization;
  owners?: Maybe<Array<Maybe<LegalEntity>>>;
  ownersAggregate?: Maybe<LegalEntityAggregateResult>;
  purpose?: Maybe<Scalars['String']['output']>;
  realEstateProperties?: Maybe<Array<Maybe<RealEstateProperty>>>;
  realEstatePropertiesAggregate?: Maybe<RealEstatePropertyAggregateResult>;
  smartContracts?: Maybe<Array<Maybe<SmartContract>>>;
  smartContractsAggregate?: Maybe<SmartContractAggregateResult>;
  subsidiaries?: Maybe<Array<Maybe<LegalEntity>>>;
  subsidiariesAggregate?: Maybe<LegalEntityAggregateResult>;
  taxId?: Maybe<Scalars['String']['output']>;
  type: LegalEntityType;
  walletAddresses?: Maybe<Array<Maybe<CryptoAddress>>>;
  walletAddressesAggregate?: Maybe<CryptoAddressAggregateResult>;
};


export type LegalEntityAddressesArgs = {
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AddressOrder>;
};


export type LegalEntityAddressesAggregateArgs = {
  filter?: InputMaybe<AddressFilter>;
};


export type LegalEntityDocumentsOwnedArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};


export type LegalEntityDocumentsOwnedAggregateArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type LegalEntityDocumentsSignedArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};


export type LegalEntityDocumentsSignedAggregateArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
};


export type LegalEntityJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
};


export type LegalEntityOfferingsArgs = {
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingOrder>;
};


export type LegalEntityOfferingsAggregateArgs = {
  filter?: InputMaybe<OfferingFilter>;
};


export type LegalEntityOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};


export type LegalEntityOwnersArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};


export type LegalEntityOwnersAggregateArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type LegalEntityRealEstatePropertiesArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RealEstatePropertyOrder>;
};


export type LegalEntityRealEstatePropertiesAggregateArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
};


export type LegalEntitySmartContractsArgs = {
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SmartContractOrder>;
};


export type LegalEntitySmartContractsAggregateArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};


export type LegalEntitySubsidiariesArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};


export type LegalEntitySubsidiariesAggregateArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type LegalEntityWalletAddressesArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CryptoAddressOrder>;
};


export type LegalEntityWalletAddressesAggregateArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
};

export type LegalEntityAggregateResult = {
  __typename?: 'LegalEntityAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  displayNameMax?: Maybe<Scalars['String']['output']>;
  displayNameMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  legalNameMax?: Maybe<Scalars['String']['output']>;
  legalNameMin?: Maybe<Scalars['String']['output']>;
  purposeMax?: Maybe<Scalars['String']['output']>;
  purposeMin?: Maybe<Scalars['String']['output']>;
  taxIdMax?: Maybe<Scalars['String']['output']>;
  taxIdMin?: Maybe<Scalars['String']['output']>;
};

export type LegalEntityFilter = {
  and?: InputMaybe<Array<InputMaybe<LegalEntityFilter>>>;
  displayName?: InputMaybe<StringFullTextFilter>;
  has?: InputMaybe<Array<InputMaybe<LegalEntityHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  legalName?: InputMaybe<StringFullTextFilter>;
  not?: InputMaybe<LegalEntityFilter>;
  or?: InputMaybe<Array<InputMaybe<LegalEntityFilter>>>;
};

export enum LegalEntityHasFilter {
  Addresses = 'addresses',
  CreationDate = 'creationDate',
  DisplayName = 'displayName',
  DocumentsOwned = 'documentsOwned',
  DocumentsSigned = 'documentsSigned',
  Jurisdiction = 'jurisdiction',
  LastUpdate = 'lastUpdate',
  LegalName = 'legalName',
  Offerings = 'offerings',
  OperatingCurrency = 'operatingCurrency',
  Organization = 'organization',
  Owners = 'owners',
  Purpose = 'purpose',
  RealEstateProperties = 'realEstateProperties',
  SmartContracts = 'smartContracts',
  Subsidiaries = 'subsidiaries',
  TaxId = 'taxId',
  Type = 'type',
  WalletAddresses = 'walletAddresses'
}

export type LegalEntityOrder = {
  asc?: InputMaybe<LegalEntityOrderable>;
  desc?: InputMaybe<LegalEntityOrderable>;
  then?: InputMaybe<LegalEntityOrder>;
};

export enum LegalEntityOrderable {
  CreationDate = 'creationDate',
  DisplayName = 'displayName',
  LastUpdate = 'lastUpdate',
  LegalName = 'legalName',
  Purpose = 'purpose',
  TaxId = 'taxId'
}

export type LegalEntityPatch = {
  addresses?: InputMaybe<Array<InputMaybe<AddressRef>>>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  documentsOwned?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  documentsSigned?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  offerings?: InputMaybe<Array<InputMaybe<OfferingRef>>>;
  operatingCurrency?: InputMaybe<CurrencyCode>;
  organization?: InputMaybe<OrganizationRef>;
  owners?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  purpose?: InputMaybe<Scalars['String']['input']>;
  realEstateProperties?: InputMaybe<Array<InputMaybe<RealEstatePropertyRef>>>;
  smartContracts?: InputMaybe<Array<InputMaybe<SmartContractRef>>>;
  subsidiaries?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LegalEntityType>;
  walletAddresses?: InputMaybe<Array<InputMaybe<CryptoAddressRef>>>;
};

export type LegalEntityRef = {
  addresses?: InputMaybe<Array<InputMaybe<AddressRef>>>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  documentsOwned?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  documentsSigned?: InputMaybe<Array<InputMaybe<DocumentSignatoryRef>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  offerings?: InputMaybe<Array<InputMaybe<OfferingRef>>>;
  operatingCurrency?: InputMaybe<CurrencyCode>;
  organization?: InputMaybe<OrganizationRef>;
  owners?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  purpose?: InputMaybe<Scalars['String']['input']>;
  realEstateProperties?: InputMaybe<Array<InputMaybe<RealEstatePropertyRef>>>;
  smartContracts?: InputMaybe<Array<InputMaybe<SmartContractRef>>>;
  subsidiaries?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LegalEntityType>;
  walletAddresses?: InputMaybe<Array<InputMaybe<CryptoAddressRef>>>;
};

export enum LegalEntityType {
  Corporation = 'CORPORATION',
  Individual = 'INDIVIDUAL',
  Llc = 'LLC',
  UnincorporatedAssociation = 'UNINCORPORATED_ASSOCIATION'
}

export type LinkedAccount = {
  __typename?: 'LinkedAccount';
  accountProvidedId?: Maybe<Scalars['String']['output']>;
  hidden?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  organization: Organization;
  type?: Maybe<LinkedAccountType>;
  url: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};


export type LinkedAccountOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};

export type LinkedAccountAggregateResult = {
  __typename?: 'LinkedAccountAggregateResult';
  accountProvidedIdMax?: Maybe<Scalars['String']['output']>;
  accountProvidedIdMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  urlMax?: Maybe<Scalars['String']['output']>;
  urlMin?: Maybe<Scalars['String']['output']>;
  usernameMax?: Maybe<Scalars['String']['output']>;
  usernameMin?: Maybe<Scalars['String']['output']>;
};

export type LinkedAccountFilter = {
  and?: InputMaybe<Array<InputMaybe<LinkedAccountFilter>>>;
  has?: InputMaybe<Array<InputMaybe<LinkedAccountHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<LinkedAccountFilter>;
  or?: InputMaybe<Array<InputMaybe<LinkedAccountFilter>>>;
  username?: InputMaybe<StringTermFilter>;
};

export enum LinkedAccountHasFilter {
  AccountProvidedId = 'accountProvidedId',
  Hidden = 'hidden',
  Organization = 'organization',
  Type = 'type',
  Url = 'url',
  Username = 'username',
  Verified = 'verified'
}

export type LinkedAccountOrder = {
  asc?: InputMaybe<LinkedAccountOrderable>;
  desc?: InputMaybe<LinkedAccountOrderable>;
  then?: InputMaybe<LinkedAccountOrder>;
};

export enum LinkedAccountOrderable {
  AccountProvidedId = 'accountProvidedId',
  Url = 'url',
  Username = 'username'
}

export type LinkedAccountPatch = {
  accountProvidedId?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  organization?: InputMaybe<OrganizationRef>;
  type?: InputMaybe<LinkedAccountType>;
  url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LinkedAccountRef = {
  accountProvidedId?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<OrganizationRef>;
  type?: InputMaybe<LinkedAccountType>;
  url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LinkedAccountType {
  Discord = 'DISCORD',
  Dribbble = 'DRIBBBLE',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Medium = 'MEDIUM',
  Mirror = 'MIRROR',
  Other = 'OTHER',
  Phone = 'PHONE',
  Soundcloud = 'SOUNDCLOUD',
  Substack = 'SUBSTACK',
  Telegram = 'TELEGRAM',
  Twitter = 'TWITTER',
  Website = 'WEBSITE',
  Youtube = 'YOUTUBE'
}

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount?: Maybe<AddAccountPayload>;
  addAddress?: Maybe<AddAddressPayload>;
  addCryptoAddress?: Maybe<AddCryptoAddressPayload>;
  addDocument?: Maybe<AddDocumentPayload>;
  addDocumentSignatory?: Maybe<AddDocumentSignatoryPayload>;
  addEmailAddress?: Maybe<AddEmailAddressPayload>;
  addImage?: Maybe<AddImagePayload>;
  addInvestorApplication?: Maybe<AddInvestorApplicationPayload>;
  addJurisdiction?: Maybe<AddJurisdictionPayload>;
  addLegalEntity?: Maybe<AddLegalEntityPayload>;
  addLinkedAccount?: Maybe<AddLinkedAccountPayload>;
  addNotificationConfiguration?: Maybe<AddNotificationConfigurationPayload>;
  addOffering?: Maybe<AddOfferingPayload>;
  addOfferingDescriptionText?: Maybe<AddOfferingDescriptionTextPayload>;
  addOfferingDetails?: Maybe<AddOfferingDetailsPayload>;
  addOfferingDistribution?: Maybe<AddOfferingDistributionPayload>;
  addOfferingParticipant?: Maybe<AddOfferingParticipantPayload>;
  addOfferingSmartContractSet?: Maybe<AddOfferingSmartContractSetPayload>;
  addOrganization?: Maybe<AddOrganizationPayload>;
  addOrganizationUser?: Maybe<AddOrganizationUserPayload>;
  addRealEstateProperty?: Maybe<AddRealEstatePropertyPayload>;
  addSession?: Maybe<AddSessionPayload>;
  addShareOrder?: Maybe<AddShareOrderPayload>;
  addShareTransferEvent?: Maybe<AddShareTransferEventPayload>;
  addSmartContract?: Maybe<AddSmartContractPayload>;
  addUser?: Maybe<AddUserPayload>;
  addVerificationToken?: Maybe<AddVerificationTokenPayload>;
  addWhitelistTransaction?: Maybe<AddWhitelistTransactionPayload>;
  deleteAccount?: Maybe<DeleteAccountPayload>;
  deleteAddress?: Maybe<DeleteAddressPayload>;
  deleteCryptoAddress?: Maybe<DeleteCryptoAddressPayload>;
  deleteDocument?: Maybe<DeleteDocumentPayload>;
  deleteDocumentSignatory?: Maybe<DeleteDocumentSignatoryPayload>;
  deleteEmailAddress?: Maybe<DeleteEmailAddressPayload>;
  deleteImage?: Maybe<DeleteImagePayload>;
  deleteInvestorApplication?: Maybe<DeleteInvestorApplicationPayload>;
  deleteJurisdiction?: Maybe<DeleteJurisdictionPayload>;
  deleteLegalEntity?: Maybe<DeleteLegalEntityPayload>;
  deleteLinkedAccount?: Maybe<DeleteLinkedAccountPayload>;
  deleteNotificationConfiguration?: Maybe<DeleteNotificationConfigurationPayload>;
  deleteOffering?: Maybe<DeleteOfferingPayload>;
  deleteOfferingDescriptionText?: Maybe<DeleteOfferingDescriptionTextPayload>;
  deleteOfferingDetails?: Maybe<DeleteOfferingDetailsPayload>;
  deleteOfferingDistribution?: Maybe<DeleteOfferingDistributionPayload>;
  deleteOfferingParticipant?: Maybe<DeleteOfferingParticipantPayload>;
  deleteOfferingSmartContractSet?: Maybe<DeleteOfferingSmartContractSetPayload>;
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  deleteOrganizationUser?: Maybe<DeleteOrganizationUserPayload>;
  deleteRealEstateProperty?: Maybe<DeleteRealEstatePropertyPayload>;
  deleteSession?: Maybe<DeleteSessionPayload>;
  deleteShareOrder?: Maybe<DeleteShareOrderPayload>;
  deleteShareTransferEvent?: Maybe<DeleteShareTransferEventPayload>;
  deleteSmartContract?: Maybe<DeleteSmartContractPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteVerificationToken?: Maybe<DeleteVerificationTokenPayload>;
  deleteWhitelistTransaction?: Maybe<DeleteWhitelistTransactionPayload>;
  updateAccount?: Maybe<UpdateAccountPayload>;
  updateAddress?: Maybe<UpdateAddressPayload>;
  updateCryptoAddress?: Maybe<UpdateCryptoAddressPayload>;
  updateDocument?: Maybe<UpdateDocumentPayload>;
  updateDocumentSignatory?: Maybe<UpdateDocumentSignatoryPayload>;
  updateEmailAddress?: Maybe<UpdateEmailAddressPayload>;
  updateImage?: Maybe<UpdateImagePayload>;
  updateInvestorApplication?: Maybe<UpdateInvestorApplicationPayload>;
  updateJurisdiction?: Maybe<UpdateJurisdictionPayload>;
  updateLegalEntity?: Maybe<UpdateLegalEntityPayload>;
  updateLinkedAccount?: Maybe<UpdateLinkedAccountPayload>;
  updateNotificationConfiguration?: Maybe<UpdateNotificationConfigurationPayload>;
  updateOffering?: Maybe<UpdateOfferingPayload>;
  updateOfferingDescriptionText?: Maybe<UpdateOfferingDescriptionTextPayload>;
  updateOfferingDetails?: Maybe<UpdateOfferingDetailsPayload>;
  updateOfferingDistribution?: Maybe<UpdateOfferingDistributionPayload>;
  updateOfferingParticipant?: Maybe<UpdateOfferingParticipantPayload>;
  updateOfferingSmartContractSet?: Maybe<UpdateOfferingSmartContractSetPayload>;
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  updateOrganizationUser?: Maybe<UpdateOrganizationUserPayload>;
  updateRealEstateProperty?: Maybe<UpdateRealEstatePropertyPayload>;
  updateSession?: Maybe<UpdateSessionPayload>;
  updateShareOrder?: Maybe<UpdateShareOrderPayload>;
  updateShareTransferEvent?: Maybe<UpdateShareTransferEventPayload>;
  updateSmartContract?: Maybe<UpdateSmartContractPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  updateVerificationToken?: Maybe<UpdateVerificationTokenPayload>;
  updateWhitelistTransaction?: Maybe<UpdateWhitelistTransactionPayload>;
};


export type MutationAddAccountArgs = {
  input: Array<AddAccountInput>;
};


export type MutationAddAddressArgs = {
  input: Array<AddAddressInput>;
};


export type MutationAddCryptoAddressArgs = {
  input: Array<AddCryptoAddressInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddDocumentArgs = {
  input: Array<AddDocumentInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddDocumentSignatoryArgs = {
  input: Array<AddDocumentSignatoryInput>;
};


export type MutationAddEmailAddressArgs = {
  input: Array<AddEmailAddressInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddImageArgs = {
  input: Array<AddImageInput>;
};


export type MutationAddInvestorApplicationArgs = {
  input: Array<AddInvestorApplicationInput>;
};


export type MutationAddJurisdictionArgs = {
  input: Array<AddJurisdictionInput>;
};


export type MutationAddLegalEntityArgs = {
  input: Array<AddLegalEntityInput>;
};


export type MutationAddLinkedAccountArgs = {
  input: Array<AddLinkedAccountInput>;
};


export type MutationAddNotificationConfigurationArgs = {
  input: Array<AddNotificationConfigurationInput>;
};


export type MutationAddOfferingArgs = {
  input: Array<AddOfferingInput>;
};


export type MutationAddOfferingDescriptionTextArgs = {
  input: Array<AddOfferingDescriptionTextInput>;
};


export type MutationAddOfferingDetailsArgs = {
  input: Array<AddOfferingDetailsInput>;
};


export type MutationAddOfferingDistributionArgs = {
  input: Array<AddOfferingDistributionInput>;
};


export type MutationAddOfferingParticipantArgs = {
  input: Array<AddOfferingParticipantInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddOfferingSmartContractSetArgs = {
  input: Array<AddOfferingSmartContractSetInput>;
};


export type MutationAddOrganizationArgs = {
  input: Array<AddOrganizationInput>;
};


export type MutationAddOrganizationUserArgs = {
  input: Array<AddOrganizationUserInput>;
};


export type MutationAddRealEstatePropertyArgs = {
  input: Array<AddRealEstatePropertyInput>;
};


export type MutationAddSessionArgs = {
  input: Array<AddSessionInput>;
};


export type MutationAddShareOrderArgs = {
  input: Array<AddShareOrderInput>;
};


export type MutationAddShareTransferEventArgs = {
  input: Array<AddShareTransferEventInput>;
};


export type MutationAddSmartContractArgs = {
  input: Array<AddSmartContractInput>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
};


export type MutationAddVerificationTokenArgs = {
  input: Array<AddVerificationTokenInput>;
};


export type MutationAddWhitelistTransactionArgs = {
  input: Array<AddWhitelistTransactionInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAccountArgs = {
  filter: AccountFilter;
};


export type MutationDeleteAddressArgs = {
  filter: AddressFilter;
};


export type MutationDeleteCryptoAddressArgs = {
  filter: CryptoAddressFilter;
};


export type MutationDeleteDocumentArgs = {
  filter: DocumentFilter;
};


export type MutationDeleteDocumentSignatoryArgs = {
  filter: DocumentSignatoryFilter;
};


export type MutationDeleteEmailAddressArgs = {
  filter: EmailAddressFilter;
};


export type MutationDeleteImageArgs = {
  filter: ImageFilter;
};


export type MutationDeleteInvestorApplicationArgs = {
  filter: InvestorApplicationFilter;
};


export type MutationDeleteJurisdictionArgs = {
  filter: JurisdictionFilter;
};


export type MutationDeleteLegalEntityArgs = {
  filter: LegalEntityFilter;
};


export type MutationDeleteLinkedAccountArgs = {
  filter: LinkedAccountFilter;
};


export type MutationDeleteNotificationConfigurationArgs = {
  filter: NotificationConfigurationFilter;
};


export type MutationDeleteOfferingArgs = {
  filter: OfferingFilter;
};


export type MutationDeleteOfferingDescriptionTextArgs = {
  filter: OfferingDescriptionTextFilter;
};


export type MutationDeleteOfferingDetailsArgs = {
  filter: OfferingDetailsFilter;
};


export type MutationDeleteOfferingDistributionArgs = {
  filter: OfferingDistributionFilter;
};


export type MutationDeleteOfferingParticipantArgs = {
  filter: OfferingParticipantFilter;
};


export type MutationDeleteOfferingSmartContractSetArgs = {
  filter: OfferingSmartContractSetFilter;
};


export type MutationDeleteOrganizationArgs = {
  filter: OrganizationFilter;
};


export type MutationDeleteOrganizationUserArgs = {
  filter: OrganizationUserFilter;
};


export type MutationDeleteRealEstatePropertyArgs = {
  filter: RealEstatePropertyFilter;
};


export type MutationDeleteSessionArgs = {
  filter: SessionFilter;
};


export type MutationDeleteShareOrderArgs = {
  filter: ShareOrderFilter;
};


export type MutationDeleteShareTransferEventArgs = {
  filter: ShareTransferEventFilter;
};


export type MutationDeleteSmartContractArgs = {
  filter: SmartContractFilter;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationDeleteVerificationTokenArgs = {
  filter: VerificationTokenFilter;
};


export type MutationDeleteWhitelistTransactionArgs = {
  filter: WhitelistTransactionFilter;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateCryptoAddressArgs = {
  input: UpdateCryptoAddressInput;
};


export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentInput;
};


export type MutationUpdateDocumentSignatoryArgs = {
  input: UpdateDocumentSignatoryInput;
};


export type MutationUpdateEmailAddressArgs = {
  input: UpdateEmailAddressInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateImageInput;
};


export type MutationUpdateInvestorApplicationArgs = {
  input: UpdateInvestorApplicationInput;
};


export type MutationUpdateJurisdictionArgs = {
  input: UpdateJurisdictionInput;
};


export type MutationUpdateLegalEntityArgs = {
  input: UpdateLegalEntityInput;
};


export type MutationUpdateLinkedAccountArgs = {
  input: UpdateLinkedAccountInput;
};


export type MutationUpdateNotificationConfigurationArgs = {
  input: UpdateNotificationConfigurationInput;
};


export type MutationUpdateOfferingArgs = {
  input: UpdateOfferingInput;
};


export type MutationUpdateOfferingDescriptionTextArgs = {
  input: UpdateOfferingDescriptionTextInput;
};


export type MutationUpdateOfferingDetailsArgs = {
  input: UpdateOfferingDetailsInput;
};


export type MutationUpdateOfferingDistributionArgs = {
  input: UpdateOfferingDistributionInput;
};


export type MutationUpdateOfferingParticipantArgs = {
  input: UpdateOfferingParticipantInput;
};


export type MutationUpdateOfferingSmartContractSetArgs = {
  input: UpdateOfferingSmartContractSetInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateOrganizationUserArgs = {
  input: UpdateOrganizationUserInput;
};


export type MutationUpdateRealEstatePropertyArgs = {
  input: UpdateRealEstatePropertyInput;
};


export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};


export type MutationUpdateShareOrderArgs = {
  input: UpdateShareOrderInput;
};


export type MutationUpdateShareTransferEventArgs = {
  input: UpdateShareTransferEventInput;
};


export type MutationUpdateSmartContractArgs = {
  input: UpdateSmartContractInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateVerificationTokenArgs = {
  input: UpdateVerificationTokenInput;
};


export type MutationUpdateWhitelistTransactionArgs = {
  input: UpdateWhitelistTransactionInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float']['input'];
};

export type NotificationConfiguration = {
  __typename?: 'NotificationConfiguration';
  id: Scalars['ID']['output'];
  notificationMethod: NotificationMethod;
  notificationRecipientType: NotificationRecipientType;
  notificationSubject: NotificationSubject;
  organizationUser: OrganizationUser;
};


export type NotificationConfigurationOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
};

export type NotificationConfigurationAggregateResult = {
  __typename?: 'NotificationConfigurationAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
};

export type NotificationConfigurationFilter = {
  and?: InputMaybe<Array<InputMaybe<NotificationConfigurationFilter>>>;
  has?: InputMaybe<Array<InputMaybe<NotificationConfigurationHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<NotificationConfigurationFilter>;
  or?: InputMaybe<Array<InputMaybe<NotificationConfigurationFilter>>>;
};

export enum NotificationConfigurationHasFilter {
  NotificationMethod = 'notificationMethod',
  NotificationRecipientType = 'notificationRecipientType',
  NotificationSubject = 'notificationSubject',
  OrganizationUser = 'organizationUser'
}

export type NotificationConfigurationPatch = {
  notificationMethod?: InputMaybe<NotificationMethod>;
  notificationRecipientType?: InputMaybe<NotificationRecipientType>;
  notificationSubject?: InputMaybe<NotificationSubject>;
  organizationUser?: InputMaybe<OrganizationUserRef>;
};

export type NotificationConfigurationRef = {
  id?: InputMaybe<Scalars['ID']['input']>;
  notificationMethod?: InputMaybe<NotificationMethod>;
  notificationRecipientType?: InputMaybe<NotificationRecipientType>;
  notificationSubject?: InputMaybe<NotificationSubject>;
  organizationUser?: InputMaybe<OrganizationUserRef>;
};

export enum NotificationMethod {
  Email = 'EMAIL'
}

export enum NotificationRecipientType {
  Manager = 'MANAGER',
  Participant = 'PARTICIPANT'
}

export enum NotificationSubject {
  NewOrderLive = 'NEW_ORDER_LIVE',
  OfferingDistribution = 'OFFERING_DISTRIBUTION',
  ProceedsClaim = 'PROCEEDS_CLAIM',
  TradeExecution = 'TRADE_EXECUTION',
  TransactionRequest = 'TRANSACTION_REQUEST',
  WhitelistApproval = 'WHITELIST_APPROVAL'
}

export type Offering = {
  __typename?: 'Offering';
  accessCode?: Maybe<Scalars['String']['output']>;
  bannerImage?: Maybe<Scalars['String']['output']>;
  brandColor?: Maybe<Scalars['String']['output']>;
  creationDate: Scalars['DateTime']['output'];
  details?: Maybe<OfferingDetails>;
  distributions?: Maybe<Array<Maybe<OfferingDistribution>>>;
  distributionsAggregate?: Maybe<OfferingDistributionAggregateResult>;
  documents?: Maybe<Array<Maybe<Document>>>;
  documentsAggregate?: Maybe<DocumentAggregateResult>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  lastUpdate: Scalars['DateTime']['output'];
  lightBrand?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  offeringEntity: LegalEntity;
  participants?: Maybe<Array<Maybe<OfferingParticipant>>>;
  participantsAggregate?: Maybe<OfferingParticipantAggregateResult>;
  primaryVideo?: Maybe<Scalars['String']['output']>;
  profileDescriptions?: Maybe<Array<Maybe<OfferingDescriptionText>>>;
  profileDescriptionsAggregate?: Maybe<OfferingDescriptionTextAggregateResult>;
  sharingImage?: Maybe<Image>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  smartContractSets?: Maybe<Array<Maybe<OfferingSmartContractSet>>>;
  smartContractSetsAggregate?: Maybe<OfferingSmartContractSetAggregateResult>;
  waitlistOn?: Maybe<Scalars['Boolean']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};


export type OfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
};


export type OfferingDistributionsArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDistributionOrder>;
};


export type OfferingDistributionsAggregateArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
};


export type OfferingDocumentsArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};


export type OfferingDocumentsAggregateArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type OfferingOfferingEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type OfferingParticipantsArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingParticipantOrder>;
};


export type OfferingParticipantsAggregateArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
};


export type OfferingProfileDescriptionsArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDescriptionTextOrder>;
};


export type OfferingProfileDescriptionsAggregateArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
};


export type OfferingSharingImageArgs = {
  filter?: InputMaybe<ImageFilter>;
};


export type OfferingSmartContractSetsArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OfferingSmartContractSetsAggregateArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
};

export type OfferingAggregateResult = {
  __typename?: 'OfferingAggregateResult';
  accessCodeMax?: Maybe<Scalars['String']['output']>;
  accessCodeMin?: Maybe<Scalars['String']['output']>;
  bannerImageMax?: Maybe<Scalars['String']['output']>;
  bannerImageMin?: Maybe<Scalars['String']['output']>;
  brandColorMax?: Maybe<Scalars['String']['output']>;
  brandColorMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  imageMax?: Maybe<Scalars['String']['output']>;
  imageMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
  primaryVideoMax?: Maybe<Scalars['String']['output']>;
  primaryVideoMin?: Maybe<Scalars['String']['output']>;
  shortDescriptionMax?: Maybe<Scalars['String']['output']>;
  shortDescriptionMin?: Maybe<Scalars['String']['output']>;
  websiteMax?: Maybe<Scalars['String']['output']>;
  websiteMin?: Maybe<Scalars['String']['output']>;
};

export type OfferingDescriptionText = {
  __typename?: 'OfferingDescriptionText';
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  offering?: Maybe<Offering>;
  order: Scalars['Int']['output'];
  section: OfferingTabSection;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type OfferingDescriptionTextOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};

export type OfferingDescriptionTextAggregateResult = {
  __typename?: 'OfferingDescriptionTextAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  orderAvg?: Maybe<Scalars['Float']['output']>;
  orderMax?: Maybe<Scalars['Int']['output']>;
  orderMin?: Maybe<Scalars['Int']['output']>;
  orderSum?: Maybe<Scalars['Int']['output']>;
  textMax?: Maybe<Scalars['String']['output']>;
  textMin?: Maybe<Scalars['String']['output']>;
  titleMax?: Maybe<Scalars['String']['output']>;
  titleMin?: Maybe<Scalars['String']['output']>;
};

export type OfferingDescriptionTextFilter = {
  and?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OfferingDescriptionTextFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextFilter>>>;
};

export enum OfferingDescriptionTextHasFilter {
  CreationDate = 'creationDate',
  LastUpdate = 'lastUpdate',
  Offering = 'offering',
  Order = 'order',
  Section = 'section',
  Text = 'text',
  Title = 'title'
}

export type OfferingDescriptionTextOrder = {
  asc?: InputMaybe<OfferingDescriptionTextOrderable>;
  desc?: InputMaybe<OfferingDescriptionTextOrderable>;
  then?: InputMaybe<OfferingDescriptionTextOrder>;
};

export enum OfferingDescriptionTextOrderable {
  CreationDate = 'creationDate',
  LastUpdate = 'lastUpdate',
  Order = 'order',
  Text = 'text',
  Title = 'title'
}

export type OfferingDescriptionTextPatch = {
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offering?: InputMaybe<OfferingRef>;
  order?: InputMaybe<Scalars['Int']['input']>;
  section?: InputMaybe<OfferingTabSection>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingDescriptionTextRef = {
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  offering?: InputMaybe<OfferingRef>;
  order?: InputMaybe<Scalars['Int']['input']>;
  section?: InputMaybe<OfferingTabSection>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingDetails = {
  __typename?: 'OfferingDetails';
  additionalInfo?: Maybe<Scalars['String']['output']>;
  adminExpense?: Maybe<Scalars['Int']['output']>;
  capRate?: Maybe<Scalars['Int']['output']>;
  cocReturn?: Maybe<Scalars['Int']['output']>;
  customOnboardingLink?: Maybe<Scalars['String']['output']>;
  distributionCurrency?: Maybe<CurrencyCode>;
  distributionDescription?: Maybe<Scalars['String']['output']>;
  distributionFrequency?: Maybe<Scalars['Int']['output']>;
  distributionPeriod?: Maybe<DistributionPeriodType>;
  id: Scalars['ID']['output'];
  investmentCurrency: CurrencyCode;
  maxInvestors?: Maybe<Scalars['Int']['output']>;
  maxRaise?: Maybe<Scalars['Int64']['output']>;
  maxUnitsPerInvestor?: Maybe<Scalars['Int']['output']>;
  minInvestors?: Maybe<Scalars['Int']['output']>;
  minRaise?: Maybe<Scalars['Int64']['output']>;
  minUnitsPerInvestor?: Maybe<Scalars['Int']['output']>;
  numUnits?: Maybe<Scalars['Int']['output']>;
  offering: Offering;
  preferredReturn?: Maybe<Scalars['Int']['output']>;
  priceStart?: Maybe<Scalars['Int']['output']>;
  projectedAppreciation?: Maybe<Scalars['Int']['output']>;
  projectedIrr?: Maybe<Scalars['Int']['output']>;
  projectedIrrMax?: Maybe<Scalars['Int']['output']>;
  raisePeriod?: Maybe<Scalars['Int']['output']>;
  raiseStart?: Maybe<Scalars['DateTime']['output']>;
  stage?: Maybe<OfferingStage>;
  targetEquityMultiple?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleMax?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<OfferingDetailsType>;
  unitName?: Maybe<UnitName>;
};


export type OfferingDetailsOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};

export type OfferingDetailsAggregateResult = {
  __typename?: 'OfferingDetailsAggregateResult';
  additionalInfoMax?: Maybe<Scalars['String']['output']>;
  additionalInfoMin?: Maybe<Scalars['String']['output']>;
  adminExpenseAvg?: Maybe<Scalars['Float']['output']>;
  adminExpenseMax?: Maybe<Scalars['Int']['output']>;
  adminExpenseMin?: Maybe<Scalars['Int']['output']>;
  adminExpenseSum?: Maybe<Scalars['Int']['output']>;
  capRateAvg?: Maybe<Scalars['Float']['output']>;
  capRateMax?: Maybe<Scalars['Int']['output']>;
  capRateMin?: Maybe<Scalars['Int']['output']>;
  capRateSum?: Maybe<Scalars['Int']['output']>;
  cocReturnAvg?: Maybe<Scalars['Float']['output']>;
  cocReturnMax?: Maybe<Scalars['Int']['output']>;
  cocReturnMin?: Maybe<Scalars['Int']['output']>;
  cocReturnSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  customOnboardingLinkMax?: Maybe<Scalars['String']['output']>;
  customOnboardingLinkMin?: Maybe<Scalars['String']['output']>;
  distributionDescriptionMax?: Maybe<Scalars['String']['output']>;
  distributionDescriptionMin?: Maybe<Scalars['String']['output']>;
  distributionFrequencyAvg?: Maybe<Scalars['Float']['output']>;
  distributionFrequencyMax?: Maybe<Scalars['Int']['output']>;
  distributionFrequencyMin?: Maybe<Scalars['Int']['output']>;
  distributionFrequencySum?: Maybe<Scalars['Int']['output']>;
  maxInvestorsAvg?: Maybe<Scalars['Float']['output']>;
  maxInvestorsMax?: Maybe<Scalars['Int']['output']>;
  maxInvestorsMin?: Maybe<Scalars['Int']['output']>;
  maxInvestorsSum?: Maybe<Scalars['Int']['output']>;
  maxRaiseAvg?: Maybe<Scalars['Float']['output']>;
  maxRaiseMax?: Maybe<Scalars['Int64']['output']>;
  maxRaiseMin?: Maybe<Scalars['Int64']['output']>;
  maxRaiseSum?: Maybe<Scalars['Int64']['output']>;
  maxUnitsPerInvestorAvg?: Maybe<Scalars['Float']['output']>;
  maxUnitsPerInvestorMax?: Maybe<Scalars['Int']['output']>;
  maxUnitsPerInvestorMin?: Maybe<Scalars['Int']['output']>;
  maxUnitsPerInvestorSum?: Maybe<Scalars['Int']['output']>;
  minInvestorsAvg?: Maybe<Scalars['Float']['output']>;
  minInvestorsMax?: Maybe<Scalars['Int']['output']>;
  minInvestorsMin?: Maybe<Scalars['Int']['output']>;
  minInvestorsSum?: Maybe<Scalars['Int']['output']>;
  minRaiseAvg?: Maybe<Scalars['Float']['output']>;
  minRaiseMax?: Maybe<Scalars['Int64']['output']>;
  minRaiseMin?: Maybe<Scalars['Int64']['output']>;
  minRaiseSum?: Maybe<Scalars['Int64']['output']>;
  minUnitsPerInvestorAvg?: Maybe<Scalars['Float']['output']>;
  minUnitsPerInvestorMax?: Maybe<Scalars['Int']['output']>;
  minUnitsPerInvestorMin?: Maybe<Scalars['Int']['output']>;
  minUnitsPerInvestorSum?: Maybe<Scalars['Int']['output']>;
  numUnitsAvg?: Maybe<Scalars['Float']['output']>;
  numUnitsMax?: Maybe<Scalars['Int']['output']>;
  numUnitsMin?: Maybe<Scalars['Int']['output']>;
  numUnitsSum?: Maybe<Scalars['Int']['output']>;
  preferredReturnAvg?: Maybe<Scalars['Float']['output']>;
  preferredReturnMax?: Maybe<Scalars['Int']['output']>;
  preferredReturnMin?: Maybe<Scalars['Int']['output']>;
  preferredReturnSum?: Maybe<Scalars['Int']['output']>;
  priceStartAvg?: Maybe<Scalars['Float']['output']>;
  priceStartMax?: Maybe<Scalars['Int']['output']>;
  priceStartMin?: Maybe<Scalars['Int']['output']>;
  priceStartSum?: Maybe<Scalars['Int']['output']>;
  projectedAppreciationAvg?: Maybe<Scalars['Float']['output']>;
  projectedAppreciationMax?: Maybe<Scalars['Int']['output']>;
  projectedAppreciationMin?: Maybe<Scalars['Int']['output']>;
  projectedAppreciationSum?: Maybe<Scalars['Int']['output']>;
  projectedIrrAvg?: Maybe<Scalars['Float']['output']>;
  projectedIrrMax?: Maybe<Scalars['Int']['output']>;
  projectedIrrMaxAvg?: Maybe<Scalars['Float']['output']>;
  projectedIrrMaxMax?: Maybe<Scalars['Int']['output']>;
  projectedIrrMaxMin?: Maybe<Scalars['Int']['output']>;
  projectedIrrMaxSum?: Maybe<Scalars['Int']['output']>;
  projectedIrrMin?: Maybe<Scalars['Int']['output']>;
  projectedIrrSum?: Maybe<Scalars['Int']['output']>;
  raisePeriodAvg?: Maybe<Scalars['Float']['output']>;
  raisePeriodMax?: Maybe<Scalars['Int']['output']>;
  raisePeriodMin?: Maybe<Scalars['Int']['output']>;
  raisePeriodSum?: Maybe<Scalars['Int']['output']>;
  raiseStartMax?: Maybe<Scalars['DateTime']['output']>;
  raiseStartMin?: Maybe<Scalars['DateTime']['output']>;
  targetEquityMultipleAvg?: Maybe<Scalars['Float']['output']>;
  targetEquityMultipleMax?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleMaxAvg?: Maybe<Scalars['Float']['output']>;
  targetEquityMultipleMaxMax?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleMaxMin?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleMaxSum?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleMin?: Maybe<Scalars['Int']['output']>;
  targetEquityMultipleSum?: Maybe<Scalars['Int']['output']>;
};

export type OfferingDetailsFilter = {
  and?: InputMaybe<Array<InputMaybe<OfferingDetailsFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingDetailsHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OfferingDetailsFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingDetailsFilter>>>;
};

export enum OfferingDetailsHasFilter {
  AdditionalInfo = 'additionalInfo',
  AdminExpense = 'adminExpense',
  CapRate = 'capRate',
  CocReturn = 'cocReturn',
  CustomOnboardingLink = 'customOnboardingLink',
  DistributionCurrency = 'distributionCurrency',
  DistributionDescription = 'distributionDescription',
  DistributionFrequency = 'distributionFrequency',
  DistributionPeriod = 'distributionPeriod',
  InvestmentCurrency = 'investmentCurrency',
  MaxInvestors = 'maxInvestors',
  MaxRaise = 'maxRaise',
  MaxUnitsPerInvestor = 'maxUnitsPerInvestor',
  MinInvestors = 'minInvestors',
  MinRaise = 'minRaise',
  MinUnitsPerInvestor = 'minUnitsPerInvestor',
  NumUnits = 'numUnits',
  Offering = 'offering',
  PreferredReturn = 'preferredReturn',
  PriceStart = 'priceStart',
  ProjectedAppreciation = 'projectedAppreciation',
  ProjectedIrr = 'projectedIrr',
  ProjectedIrrMax = 'projectedIrrMax',
  RaisePeriod = 'raisePeriod',
  RaiseStart = 'raiseStart',
  Stage = 'stage',
  TargetEquityMultiple = 'targetEquityMultiple',
  TargetEquityMultipleMax = 'targetEquityMultipleMax',
  Type = 'type',
  UnitName = 'unitName'
}

export type OfferingDetailsOrder = {
  asc?: InputMaybe<OfferingDetailsOrderable>;
  desc?: InputMaybe<OfferingDetailsOrderable>;
  then?: InputMaybe<OfferingDetailsOrder>;
};

export enum OfferingDetailsOrderable {
  AdditionalInfo = 'additionalInfo',
  AdminExpense = 'adminExpense',
  CapRate = 'capRate',
  CocReturn = 'cocReturn',
  CustomOnboardingLink = 'customOnboardingLink',
  DistributionDescription = 'distributionDescription',
  DistributionFrequency = 'distributionFrequency',
  MaxInvestors = 'maxInvestors',
  MaxRaise = 'maxRaise',
  MaxUnitsPerInvestor = 'maxUnitsPerInvestor',
  MinInvestors = 'minInvestors',
  MinRaise = 'minRaise',
  MinUnitsPerInvestor = 'minUnitsPerInvestor',
  NumUnits = 'numUnits',
  PreferredReturn = 'preferredReturn',
  PriceStart = 'priceStart',
  ProjectedAppreciation = 'projectedAppreciation',
  ProjectedIrr = 'projectedIrr',
  ProjectedIrrMax = 'projectedIrrMax',
  RaisePeriod = 'raisePeriod',
  RaiseStart = 'raiseStart',
  TargetEquityMultiple = 'targetEquityMultiple',
  TargetEquityMultipleMax = 'targetEquityMultipleMax'
}

export type OfferingDetailsPatch = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  adminExpense?: InputMaybe<Scalars['Int']['input']>;
  capRate?: InputMaybe<Scalars['Int']['input']>;
  cocReturn?: InputMaybe<Scalars['Int']['input']>;
  customOnboardingLink?: InputMaybe<Scalars['String']['input']>;
  distributionCurrency?: InputMaybe<CurrencyCode>;
  distributionDescription?: InputMaybe<Scalars['String']['input']>;
  distributionFrequency?: InputMaybe<Scalars['Int']['input']>;
  distributionPeriod?: InputMaybe<DistributionPeriodType>;
  investmentCurrency?: InputMaybe<CurrencyCode>;
  maxInvestors?: InputMaybe<Scalars['Int']['input']>;
  maxRaise?: InputMaybe<Scalars['Int64']['input']>;
  maxUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  minInvestors?: InputMaybe<Scalars['Int']['input']>;
  minRaise?: InputMaybe<Scalars['Int64']['input']>;
  minUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  numUnits?: InputMaybe<Scalars['Int']['input']>;
  offering?: InputMaybe<OfferingRef>;
  preferredReturn?: InputMaybe<Scalars['Int']['input']>;
  priceStart?: InputMaybe<Scalars['Int']['input']>;
  projectedAppreciation?: InputMaybe<Scalars['Int']['input']>;
  projectedIrr?: InputMaybe<Scalars['Int']['input']>;
  projectedIrrMax?: InputMaybe<Scalars['Int']['input']>;
  raisePeriod?: InputMaybe<Scalars['Int']['input']>;
  raiseStart?: InputMaybe<Scalars['DateTime']['input']>;
  stage?: InputMaybe<OfferingStage>;
  targetEquityMultiple?: InputMaybe<Scalars['Int']['input']>;
  targetEquityMultipleMax?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<OfferingDetailsType>;
  unitName?: InputMaybe<UnitName>;
};

export type OfferingDetailsRef = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  adminExpense?: InputMaybe<Scalars['Int']['input']>;
  capRate?: InputMaybe<Scalars['Int']['input']>;
  cocReturn?: InputMaybe<Scalars['Int']['input']>;
  customOnboardingLink?: InputMaybe<Scalars['String']['input']>;
  distributionCurrency?: InputMaybe<CurrencyCode>;
  distributionDescription?: InputMaybe<Scalars['String']['input']>;
  distributionFrequency?: InputMaybe<Scalars['Int']['input']>;
  distributionPeriod?: InputMaybe<DistributionPeriodType>;
  id?: InputMaybe<Scalars['ID']['input']>;
  investmentCurrency?: InputMaybe<CurrencyCode>;
  maxInvestors?: InputMaybe<Scalars['Int']['input']>;
  maxRaise?: InputMaybe<Scalars['Int64']['input']>;
  maxUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  minInvestors?: InputMaybe<Scalars['Int']['input']>;
  minRaise?: InputMaybe<Scalars['Int64']['input']>;
  minUnitsPerInvestor?: InputMaybe<Scalars['Int']['input']>;
  numUnits?: InputMaybe<Scalars['Int']['input']>;
  offering?: InputMaybe<OfferingRef>;
  preferredReturn?: InputMaybe<Scalars['Int']['input']>;
  priceStart?: InputMaybe<Scalars['Int']['input']>;
  projectedAppreciation?: InputMaybe<Scalars['Int']['input']>;
  projectedIrr?: InputMaybe<Scalars['Int']['input']>;
  projectedIrrMax?: InputMaybe<Scalars['Int']['input']>;
  raisePeriod?: InputMaybe<Scalars['Int']['input']>;
  raiseStart?: InputMaybe<Scalars['DateTime']['input']>;
  stage?: InputMaybe<OfferingStage>;
  targetEquityMultiple?: InputMaybe<Scalars['Int']['input']>;
  targetEquityMultipleMax?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<OfferingDetailsType>;
  unitName?: InputMaybe<UnitName>;
};

export enum OfferingDetailsType {
  Crypto = 'CRYPTO',
  Other = 'OTHER',
  PrivateEquity = 'PRIVATE_EQUITY',
  RealEstate = 'REAL_ESTATE',
  VentureCapital = 'VENTURE_CAPITAL'
}

export type OfferingDistribution = {
  __typename?: 'OfferingDistribution';
  contractIndex: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  transactionHash: Scalars['String']['output'];
};

export type OfferingDistributionAggregateResult = {
  __typename?: 'OfferingDistributionAggregateResult';
  contractIndexAvg?: Maybe<Scalars['Float']['output']>;
  contractIndexMax?: Maybe<Scalars['Int']['output']>;
  contractIndexMin?: Maybe<Scalars['Int']['output']>;
  contractIndexSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  transactionHashMax?: Maybe<Scalars['String']['output']>;
  transactionHashMin?: Maybe<Scalars['String']['output']>;
};

export type OfferingDistributionFilter = {
  and?: InputMaybe<Array<InputMaybe<OfferingDistributionFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingDistributionHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OfferingDistributionFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingDistributionFilter>>>;
};

export enum OfferingDistributionHasFilter {
  ContractIndex = 'contractIndex',
  TransactionHash = 'transactionHash'
}

export type OfferingDistributionOrder = {
  asc?: InputMaybe<OfferingDistributionOrderable>;
  desc?: InputMaybe<OfferingDistributionOrderable>;
  then?: InputMaybe<OfferingDistributionOrder>;
};

export enum OfferingDistributionOrderable {
  ContractIndex = 'contractIndex',
  TransactionHash = 'transactionHash'
}

export type OfferingDistributionPatch = {
  contractIndex?: InputMaybe<Scalars['Int']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingDistributionRef = {
  contractIndex?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingFilter = {
  and?: InputMaybe<Array<InputMaybe<OfferingFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<StringFullTextFilter>;
  not?: InputMaybe<OfferingFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingFilter>>>;
};

export enum OfferingHasFilter {
  AccessCode = 'accessCode',
  BannerImage = 'bannerImage',
  BrandColor = 'brandColor',
  CreationDate = 'creationDate',
  Details = 'details',
  Distributions = 'distributions',
  Documents = 'documents',
  Image = 'image',
  IsPublic = 'isPublic',
  LastUpdate = 'lastUpdate',
  LightBrand = 'lightBrand',
  Name = 'name',
  OfferingEntity = 'offeringEntity',
  Participants = 'participants',
  PrimaryVideo = 'primaryVideo',
  ProfileDescriptions = 'profileDescriptions',
  SharingImage = 'sharingImage',
  ShortDescription = 'shortDescription',
  SmartContractSets = 'smartContractSets',
  WaitlistOn = 'waitlistOn',
  Website = 'website'
}

export type OfferingOrder = {
  asc?: InputMaybe<OfferingOrderable>;
  desc?: InputMaybe<OfferingOrderable>;
  then?: InputMaybe<OfferingOrder>;
};

export enum OfferingOrderable {
  AccessCode = 'accessCode',
  BannerImage = 'bannerImage',
  BrandColor = 'brandColor',
  CreationDate = 'creationDate',
  Image = 'image',
  LastUpdate = 'lastUpdate',
  Name = 'name',
  PrimaryVideo = 'primaryVideo',
  ShortDescription = 'shortDescription',
  Website = 'website'
}

export type OfferingParticipant = {
  __typename?: 'OfferingParticipant';
  addressOfferingId: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  creationDate: Scalars['DateTime']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  investorApplication?: Maybe<InvestorApplication>;
  jurisdiction?: Maybe<Jurisdiction>;
  lastUpdate: Scalars['DateTime']['output'];
  maxPledge?: Maybe<Scalars['Int']['output']>;
  minPledge?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  offering: Offering;
  paid?: Maybe<Scalars['Boolean']['output']>;
  walletAddress: Scalars['String']['output'];
  whitelistTransactions?: Maybe<Array<Maybe<WhitelistTransaction>>>;
  whitelistTransactionsAggregate?: Maybe<WhitelistTransactionAggregateResult>;
};


export type OfferingParticipantInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
};


export type OfferingParticipantJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
};


export type OfferingParticipantOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};


export type OfferingParticipantWhitelistTransactionsArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WhitelistTransactionOrder>;
};


export type OfferingParticipantWhitelistTransactionsAggregateArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
};

export type OfferingParticipantAggregateResult = {
  __typename?: 'OfferingParticipantAggregateResult';
  addressOfferingIdMax?: Maybe<Scalars['String']['output']>;
  addressOfferingIdMin?: Maybe<Scalars['String']['output']>;
  chainIdAvg?: Maybe<Scalars['Float']['output']>;
  chainIdMax?: Maybe<Scalars['Int']['output']>;
  chainIdMin?: Maybe<Scalars['Int']['output']>;
  chainIdSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  emailAddressMax?: Maybe<Scalars['String']['output']>;
  emailAddressMin?: Maybe<Scalars['String']['output']>;
  externalIdMax?: Maybe<Scalars['String']['output']>;
  externalIdMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  maxPledgeAvg?: Maybe<Scalars['Float']['output']>;
  maxPledgeMax?: Maybe<Scalars['Int']['output']>;
  maxPledgeMin?: Maybe<Scalars['Int']['output']>;
  maxPledgeSum?: Maybe<Scalars['Int']['output']>;
  minPledgeAvg?: Maybe<Scalars['Float']['output']>;
  minPledgeMax?: Maybe<Scalars['Int']['output']>;
  minPledgeMin?: Maybe<Scalars['Int']['output']>;
  minPledgeSum?: Maybe<Scalars['Int']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
  walletAddressMax?: Maybe<Scalars['String']['output']>;
  walletAddressMin?: Maybe<Scalars['String']['output']>;
};

export type OfferingParticipantFilter = {
  addressOfferingId?: InputMaybe<StringHashFilter>;
  and?: InputMaybe<Array<InputMaybe<OfferingParticipantFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingParticipantHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OfferingParticipantFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingParticipantFilter>>>;
  walletAddress?: InputMaybe<StringFullTextFilter>;
};

export enum OfferingParticipantHasFilter {
  AddressOfferingId = 'addressOfferingId',
  ChainId = 'chainId',
  CreationDate = 'creationDate',
  EmailAddress = 'emailAddress',
  ExternalId = 'externalId',
  InvestorApplication = 'investorApplication',
  Jurisdiction = 'jurisdiction',
  LastUpdate = 'lastUpdate',
  MaxPledge = 'maxPledge',
  MinPledge = 'minPledge',
  Name = 'name',
  Offering = 'offering',
  Paid = 'paid',
  WalletAddress = 'walletAddress',
  WhitelistTransactions = 'whitelistTransactions'
}

export type OfferingParticipantOrder = {
  asc?: InputMaybe<OfferingParticipantOrderable>;
  desc?: InputMaybe<OfferingParticipantOrderable>;
  then?: InputMaybe<OfferingParticipantOrder>;
};

export enum OfferingParticipantOrderable {
  AddressOfferingId = 'addressOfferingId',
  ChainId = 'chainId',
  CreationDate = 'creationDate',
  EmailAddress = 'emailAddress',
  ExternalId = 'externalId',
  LastUpdate = 'lastUpdate',
  MaxPledge = 'maxPledge',
  MinPledge = 'minPledge',
  Name = 'name',
  WalletAddress = 'walletAddress'
}

export type OfferingParticipantPatch = {
  addressOfferingId?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  investorApplication?: InputMaybe<InvestorApplicationRef>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  maxPledge?: InputMaybe<Scalars['Int']['input']>;
  minPledge?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offering?: InputMaybe<OfferingRef>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  whitelistTransactions?: InputMaybe<Array<InputMaybe<WhitelistTransactionRef>>>;
};

export type OfferingParticipantRef = {
  addressOfferingId?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  investorApplication?: InputMaybe<InvestorApplicationRef>;
  jurisdiction?: InputMaybe<JurisdictionRef>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  maxPledge?: InputMaybe<Scalars['Int']['input']>;
  minPledge?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offering?: InputMaybe<OfferingRef>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  whitelistTransactions?: InputMaybe<Array<InputMaybe<WhitelistTransactionRef>>>;
};

export type OfferingPatch = {
  accessCode?: InputMaybe<Scalars['String']['input']>;
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  details?: InputMaybe<OfferingDetailsRef>;
  distributions?: InputMaybe<Array<InputMaybe<OfferingDistributionRef>>>;
  documents?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  lightBrand?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offeringEntity?: InputMaybe<LegalEntityRef>;
  participants?: InputMaybe<Array<InputMaybe<OfferingParticipantRef>>>;
  primaryVideo?: InputMaybe<Scalars['String']['input']>;
  profileDescriptions?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextRef>>>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  smartContractSets?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetRef>>>;
  waitlistOn?: InputMaybe<Scalars['Boolean']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingRef = {
  accessCode?: InputMaybe<Scalars['String']['input']>;
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  details?: InputMaybe<OfferingDetailsRef>;
  distributions?: InputMaybe<Array<InputMaybe<OfferingDistributionRef>>>;
  documents?: InputMaybe<Array<InputMaybe<DocumentRef>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  lightBrand?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offeringEntity?: InputMaybe<LegalEntityRef>;
  participants?: InputMaybe<Array<InputMaybe<OfferingParticipantRef>>>;
  primaryVideo?: InputMaybe<Scalars['String']['input']>;
  profileDescriptions?: InputMaybe<Array<InputMaybe<OfferingDescriptionTextRef>>>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  smartContractSets?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetRef>>>;
  waitlistOn?: InputMaybe<Scalars['Boolean']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type OfferingSmartContractSet = {
  __typename?: 'OfferingSmartContractSet';
  distributionContract?: Maybe<SmartContract>;
  id: Scalars['ID']['output'];
  offering?: Maybe<Offering>;
  shareContract?: Maybe<SmartContract>;
  swapContract?: Maybe<SmartContract>;
};


export type OfferingSmartContractSetDistributionContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};


export type OfferingSmartContractSetOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};


export type OfferingSmartContractSetShareContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};


export type OfferingSmartContractSetSwapContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};

export type OfferingSmartContractSetAggregateResult = {
  __typename?: 'OfferingSmartContractSetAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
};

export type OfferingSmartContractSetFilter = {
  and?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OfferingSmartContractSetFilter>;
  or?: InputMaybe<Array<InputMaybe<OfferingSmartContractSetFilter>>>;
};

export enum OfferingSmartContractSetHasFilter {
  DistributionContract = 'distributionContract',
  Offering = 'offering',
  ShareContract = 'shareContract',
  SwapContract = 'swapContract'
}

export type OfferingSmartContractSetPatch = {
  distributionContract?: InputMaybe<SmartContractRef>;
  offering?: InputMaybe<OfferingRef>;
  shareContract?: InputMaybe<SmartContractRef>;
  swapContract?: InputMaybe<SmartContractRef>;
};

export type OfferingSmartContractSetRef = {
  distributionContract?: InputMaybe<SmartContractRef>;
  id?: InputMaybe<Scalars['ID']['input']>;
  offering?: InputMaybe<OfferingRef>;
  shareContract?: InputMaybe<SmartContractRef>;
  swapContract?: InputMaybe<SmartContractRef>;
};

export enum OfferingStage {
  Closed = 'CLOSED',
  DueDiligence = 'DUE_DILIGENCE',
  Identified = 'IDENTIFIED',
  InNegotiation = 'IN_NEGOTIATION',
  Locked = 'LOCKED',
  Sale = 'SALE'
}

/** OFFERING MODEL */
export enum OfferingTabSection {
  Details = 'DETAILS',
  Disclosures = 'DISCLOSURES',
  Financials = 'FINANCIALS',
  OfferorInfo = 'OFFEROR_INFO',
  Terms = 'TERMS'
}

export type Organization = {
  __typename?: 'Organization';
  bannerImage?: Maybe<Scalars['String']['output']>;
  brandColor?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailAddresses?: Maybe<Array<Maybe<EmailAddress>>>;
  emailAddressesAggregate?: Maybe<EmailAddressAggregateResult>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  lastUpdate: Scalars['DateTime']['output'];
  legalEntities?: Maybe<Array<Maybe<LegalEntity>>>;
  legalEntitiesAggregate?: Maybe<LegalEntityAggregateResult>;
  linkedAccounts?: Maybe<Array<Maybe<LinkedAccount>>>;
  linkedAccountsAggregate?: Maybe<LinkedAccountAggregateResult>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  sharingImage?: Maybe<Image>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<OrganizationUser>>;
  usersAggregate?: Maybe<OrganizationUserAggregateResult>;
  website?: Maybe<Scalars['String']['output']>;
};


export type OrganizationEmailAddressesArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmailAddressOrder>;
};


export type OrganizationEmailAddressesAggregateArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
};


export type OrganizationLegalEntitiesArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};


export type OrganizationLegalEntitiesAggregateArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type OrganizationLinkedAccountsArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LinkedAccountOrder>;
};


export type OrganizationLinkedAccountsAggregateArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
};


export type OrganizationSharingImageArgs = {
  filter?: InputMaybe<ImageFilter>;
};


export type OrganizationUsersArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OrganizationUsersAggregateArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
};

export type OrganizationAggregateResult = {
  __typename?: 'OrganizationAggregateResult';
  bannerImageMax?: Maybe<Scalars['String']['output']>;
  bannerImageMin?: Maybe<Scalars['String']['output']>;
  brandColorMax?: Maybe<Scalars['String']['output']>;
  brandColorMin?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  countryMax?: Maybe<Scalars['String']['output']>;
  countryMin?: Maybe<Scalars['String']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  descriptionMax?: Maybe<Scalars['String']['output']>;
  descriptionMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  logoMax?: Maybe<Scalars['String']['output']>;
  logoMin?: Maybe<Scalars['String']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
  phoneMax?: Maybe<Scalars['String']['output']>;
  phoneMin?: Maybe<Scalars['String']['output']>;
  shortDescriptionMax?: Maybe<Scalars['String']['output']>;
  shortDescriptionMin?: Maybe<Scalars['String']['output']>;
  slugMax?: Maybe<Scalars['String']['output']>;
  slugMin?: Maybe<Scalars['String']['output']>;
  websiteMax?: Maybe<Scalars['String']['output']>;
  websiteMin?: Maybe<Scalars['String']['output']>;
};

export type OrganizationFilter = {
  and?: InputMaybe<Array<InputMaybe<OrganizationFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OrganizationHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<StringFullTextFilter>;
  not?: InputMaybe<OrganizationFilter>;
  or?: InputMaybe<Array<InputMaybe<OrganizationFilter>>>;
  slug?: InputMaybe<StringTermFilter>;
};

export enum OrganizationHasFilter {
  BannerImage = 'bannerImage',
  BrandColor = 'brandColor',
  Country = 'country',
  CreationDate = 'creationDate',
  Description = 'description',
  EmailAddresses = 'emailAddresses',
  IsPublic = 'isPublic',
  LastUpdate = 'lastUpdate',
  LegalEntities = 'legalEntities',
  LinkedAccounts = 'linkedAccounts',
  Logo = 'logo',
  Name = 'name',
  Phone = 'phone',
  SharingImage = 'sharingImage',
  ShortDescription = 'shortDescription',
  Slug = 'slug',
  Users = 'users',
  Website = 'website'
}

export type OrganizationOrder = {
  asc?: InputMaybe<OrganizationOrderable>;
  desc?: InputMaybe<OrganizationOrderable>;
  then?: InputMaybe<OrganizationOrder>;
};

export enum OrganizationOrderable {
  BannerImage = 'bannerImage',
  BrandColor = 'brandColor',
  Country = 'country',
  CreationDate = 'creationDate',
  Description = 'description',
  LastUpdate = 'lastUpdate',
  Logo = 'logo',
  Name = 'name',
  Phone = 'phone',
  ShortDescription = 'shortDescription',
  Slug = 'slug',
  Website = 'website'
}

export type OrganizationPatch = {
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailAddresses?: InputMaybe<Array<InputMaybe<EmailAddressRef>>>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  legalEntities?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  linkedAccounts?: InputMaybe<Array<InputMaybe<LinkedAccountRef>>>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<OrganizationUserRef>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export enum OrganizationPermissionType {
  Admin = 'ADMIN',
  Auditor = 'AUDITOR',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type OrganizationPermissionType_Hash = {
  eq?: InputMaybe<OrganizationPermissionType>;
  in?: InputMaybe<Array<InputMaybe<OrganizationPermissionType>>>;
};

export type OrganizationRef = {
  bannerImage?: InputMaybe<Scalars['String']['input']>;
  brandColor?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailAddresses?: InputMaybe<Array<InputMaybe<EmailAddressRef>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  legalEntities?: InputMaybe<Array<InputMaybe<LegalEntityRef>>>;
  linkedAccounts?: InputMaybe<Array<InputMaybe<LinkedAccountRef>>>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  sharingImage?: InputMaybe<ImageRef>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<OrganizationUserRef>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationUser = {
  __typename?: 'OrganizationUser';
  id: Scalars['ID']['output'];
  notificationConfigurations?: Maybe<Array<Maybe<NotificationConfiguration>>>;
  notificationConfigurationsAggregate?: Maybe<NotificationConfigurationAggregateResult>;
  organization: Organization;
  permissions?: Maybe<Array<OrganizationPermissionType>>;
  user: User;
};


export type OrganizationUserNotificationConfigurationsArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OrganizationUserNotificationConfigurationsAggregateArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
};


export type OrganizationUserOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};


export type OrganizationUserUserArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type OrganizationUserAggregateResult = {
  __typename?: 'OrganizationUserAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
};

export type OrganizationUserFilter = {
  and?: InputMaybe<Array<InputMaybe<OrganizationUserFilter>>>;
  has?: InputMaybe<Array<InputMaybe<OrganizationUserHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<OrganizationUserFilter>;
  or?: InputMaybe<Array<InputMaybe<OrganizationUserFilter>>>;
  permissions?: InputMaybe<OrganizationPermissionType_Hash>;
};

export enum OrganizationUserHasFilter {
  NotificationConfigurations = 'notificationConfigurations',
  Organization = 'organization',
  Permissions = 'permissions',
  User = 'user'
}

export type OrganizationUserPatch = {
  notificationConfigurations?: InputMaybe<Array<InputMaybe<NotificationConfigurationRef>>>;
  organization?: InputMaybe<OrganizationRef>;
  permissions?: InputMaybe<Array<OrganizationPermissionType>>;
  user?: InputMaybe<UserRef>;
};

export type OrganizationUserRef = {
  id?: InputMaybe<Scalars['ID']['input']>;
  notificationConfigurations?: InputMaybe<Array<InputMaybe<NotificationConfigurationRef>>>;
  organization?: InputMaybe<OrganizationRef>;
  permissions?: InputMaybe<Array<OrganizationPermissionType>>;
  user?: InputMaybe<UserRef>;
};

export enum OrganizationUserRole {
  Advisor = 'ADVISOR',
  BoardMember = 'BOARD_MEMBER',
  Investor = 'INVESTOR',
  Partner = 'PARTNER',
  Supporter = 'SUPPORTER',
  Team = 'TEAM'
}

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PointGeoFilter = {
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  contains?: InputMaybe<ContainsFilter>;
  intersects?: InputMaybe<IntersectsFilter>;
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  aggregateAccount?: Maybe<AccountAggregateResult>;
  aggregateAddress?: Maybe<AddressAggregateResult>;
  aggregateCryptoAddress?: Maybe<CryptoAddressAggregateResult>;
  aggregateDocument?: Maybe<DocumentAggregateResult>;
  aggregateDocumentSignatory?: Maybe<DocumentSignatoryAggregateResult>;
  aggregateEmailAddress?: Maybe<EmailAddressAggregateResult>;
  aggregateImage?: Maybe<ImageAggregateResult>;
  aggregateInvestorApplication?: Maybe<InvestorApplicationAggregateResult>;
  aggregateJurisdiction?: Maybe<JurisdictionAggregateResult>;
  aggregateLegalEntity?: Maybe<LegalEntityAggregateResult>;
  aggregateLinkedAccount?: Maybe<LinkedAccountAggregateResult>;
  aggregateNotificationConfiguration?: Maybe<NotificationConfigurationAggregateResult>;
  aggregateOffering?: Maybe<OfferingAggregateResult>;
  aggregateOfferingDescriptionText?: Maybe<OfferingDescriptionTextAggregateResult>;
  aggregateOfferingDetails?: Maybe<OfferingDetailsAggregateResult>;
  aggregateOfferingDistribution?: Maybe<OfferingDistributionAggregateResult>;
  aggregateOfferingParticipant?: Maybe<OfferingParticipantAggregateResult>;
  aggregateOfferingSmartContractSet?: Maybe<OfferingSmartContractSetAggregateResult>;
  aggregateOrganization?: Maybe<OrganizationAggregateResult>;
  aggregateOrganizationUser?: Maybe<OrganizationUserAggregateResult>;
  aggregateRealEstateProperty?: Maybe<RealEstatePropertyAggregateResult>;
  aggregateSession?: Maybe<SessionAggregateResult>;
  aggregateShareOrder?: Maybe<ShareOrderAggregateResult>;
  aggregateShareTransferEvent?: Maybe<ShareTransferEventAggregateResult>;
  aggregateSmartContract?: Maybe<SmartContractAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  aggregateVerificationToken?: Maybe<VerificationTokenAggregateResult>;
  aggregateWhitelistTransaction?: Maybe<WhitelistTransactionAggregateResult>;
  getAccount?: Maybe<Account>;
  getAddress?: Maybe<Address>;
  getCryptoAddress?: Maybe<CryptoAddress>;
  getDocument?: Maybe<Document>;
  getDocumentSignatory?: Maybe<DocumentSignatory>;
  getEmailAddress?: Maybe<EmailAddress>;
  getImage?: Maybe<Image>;
  getInvestorApplication?: Maybe<InvestorApplication>;
  getJurisdiction?: Maybe<Jurisdiction>;
  getLegalEntity?: Maybe<LegalEntity>;
  getLinkedAccount?: Maybe<LinkedAccount>;
  getNotificationConfiguration?: Maybe<NotificationConfiguration>;
  getOffering?: Maybe<Offering>;
  getOfferingDescriptionText?: Maybe<OfferingDescriptionText>;
  getOfferingDetails?: Maybe<OfferingDetails>;
  getOfferingDistribution?: Maybe<OfferingDistribution>;
  getOfferingParticipant?: Maybe<OfferingParticipant>;
  getOfferingSmartContractSet?: Maybe<OfferingSmartContractSet>;
  getOrganization?: Maybe<Organization>;
  getOrganizationUser?: Maybe<OrganizationUser>;
  getRealEstateProperty?: Maybe<RealEstateProperty>;
  getSession?: Maybe<Session>;
  getShareOrder?: Maybe<ShareOrder>;
  getShareTransferEvent?: Maybe<ShareTransferEvent>;
  getSmartContract?: Maybe<SmartContract>;
  getUser?: Maybe<User>;
  getVerificationToken?: Maybe<VerificationToken>;
  getWhitelistTransaction?: Maybe<WhitelistTransaction>;
  queryAccount?: Maybe<Array<Maybe<Account>>>;
  queryAddress?: Maybe<Array<Maybe<Address>>>;
  queryCryptoAddress?: Maybe<Array<Maybe<CryptoAddress>>>;
  queryDocument?: Maybe<Array<Maybe<Document>>>;
  queryDocumentSignatory?: Maybe<Array<Maybe<DocumentSignatory>>>;
  queryEmailAddress?: Maybe<Array<Maybe<EmailAddress>>>;
  queryImage?: Maybe<Array<Maybe<Image>>>;
  queryInvestorApplication?: Maybe<Array<Maybe<InvestorApplication>>>;
  queryJurisdiction?: Maybe<Array<Maybe<Jurisdiction>>>;
  queryLegalEntity?: Maybe<Array<Maybe<LegalEntity>>>;
  queryLinkedAccount?: Maybe<Array<Maybe<LinkedAccount>>>;
  queryNotificationConfiguration?: Maybe<Array<Maybe<NotificationConfiguration>>>;
  queryOffering?: Maybe<Array<Maybe<Offering>>>;
  queryOfferingDescriptionText?: Maybe<Array<Maybe<OfferingDescriptionText>>>;
  queryOfferingDetails?: Maybe<Array<Maybe<OfferingDetails>>>;
  queryOfferingDistribution?: Maybe<Array<Maybe<OfferingDistribution>>>;
  queryOfferingParticipant?: Maybe<Array<Maybe<OfferingParticipant>>>;
  queryOfferingSmartContractSet?: Maybe<Array<Maybe<OfferingSmartContractSet>>>;
  queryOrganization?: Maybe<Array<Maybe<Organization>>>;
  queryOrganizationUser?: Maybe<Array<Maybe<OrganizationUser>>>;
  queryRealEstateProperty?: Maybe<Array<Maybe<RealEstateProperty>>>;
  querySession?: Maybe<Array<Maybe<Session>>>;
  queryShareOrder?: Maybe<Array<Maybe<ShareOrder>>>;
  queryShareTransferEvent?: Maybe<Array<Maybe<ShareTransferEvent>>>;
  querySmartContract?: Maybe<Array<Maybe<SmartContract>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  queryVerificationToken?: Maybe<Array<Maybe<VerificationToken>>>;
  queryWhitelistTransaction?: Maybe<Array<Maybe<WhitelistTransaction>>>;
};


export type QueryAggregateAccountArgs = {
  filter?: InputMaybe<AccountFilter>;
};


export type QueryAggregateAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
};


export type QueryAggregateCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
};


export type QueryAggregateDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type QueryAggregateDocumentSignatoryArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
};


export type QueryAggregateEmailAddressArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
};


export type QueryAggregateImageArgs = {
  filter?: InputMaybe<ImageFilter>;
};


export type QueryAggregateInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
};


export type QueryAggregateJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
};


export type QueryAggregateLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};


export type QueryAggregateLinkedAccountArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
};


export type QueryAggregateNotificationConfigurationArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
};


export type QueryAggregateOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
};


export type QueryAggregateOfferingDescriptionTextArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
};


export type QueryAggregateOfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
};


export type QueryAggregateOfferingDistributionArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
};


export type QueryAggregateOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
};


export type QueryAggregateOfferingSmartContractSetArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
};


export type QueryAggregateOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};


export type QueryAggregateOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
};


export type QueryAggregateRealEstatePropertyArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
};


export type QueryAggregateSessionArgs = {
  filter?: InputMaybe<SessionFilter>;
};


export type QueryAggregateShareOrderArgs = {
  filter?: InputMaybe<ShareOrderFilter>;
};


export type QueryAggregateShareTransferEventArgs = {
  filter?: InputMaybe<ShareTransferEventFilter>;
};


export type QueryAggregateSmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
};


export type QueryAggregateUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type QueryAggregateVerificationTokenArgs = {
  filter?: InputMaybe<VerificationTokenFilter>;
};


export type QueryAggregateWhitelistTransactionArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
};


export type QueryGetAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCryptoAddressArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetDocumentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  offeringUniqueId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDocumentSignatoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEmailAddressArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetImageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvestorApplicationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetJurisdictionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLegalEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLinkedAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetNotificationConfigurationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOfferingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOfferingDescriptionTextArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOfferingDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOfferingDistributionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOfferingParticipantArgs = {
  addressOfferingId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOfferingSmartContractSetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrganizationUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRealEstatePropertyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShareOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetShareTransferEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSmartContractArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetVerificationTokenArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWhitelistTransactionArgs = {
  transactionHash: Scalars['String']['input'];
};


export type QueryQueryAccountArgs = {
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};


export type QueryQueryAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AddressOrder>;
};


export type QueryQueryCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CryptoAddressOrder>;
};


export type QueryQueryDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};


export type QueryQueryDocumentSignatoryArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};


export type QueryQueryEmailAddressArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmailAddressOrder>;
};


export type QueryQueryImageArgs = {
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ImageOrder>;
};


export type QueryQueryInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InvestorApplicationOrder>;
};


export type QueryQueryJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JurisdictionOrder>;
};


export type QueryQueryLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};


export type QueryQueryLinkedAccountArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LinkedAccountOrder>;
};


export type QueryQueryNotificationConfigurationArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryQueryOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingOrder>;
};


export type QueryQueryOfferingDescriptionTextArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDescriptionTextOrder>;
};


export type QueryQueryOfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDetailsOrder>;
};


export type QueryQueryOfferingDistributionArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDistributionOrder>;
};


export type QueryQueryOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingParticipantOrder>;
};


export type QueryQueryOfferingSmartContractSetArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryQueryOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrganizationOrder>;
};


export type QueryQueryOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryQueryRealEstatePropertyArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RealEstatePropertyOrder>;
};


export type QueryQuerySessionArgs = {
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SessionOrder>;
};


export type QueryQueryShareOrderArgs = {
  filter?: InputMaybe<ShareOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareOrderOrder>;
};


export type QueryQueryShareTransferEventArgs = {
  filter?: InputMaybe<ShareTransferEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareTransferEventOrder>;
};


export type QueryQuerySmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SmartContractOrder>;
};


export type QueryQueryUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};


export type QueryQueryVerificationTokenArgs = {
  filter?: InputMaybe<VerificationTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<VerificationTokenOrder>;
};


export type QueryQueryWhitelistTransactionArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WhitelistTransactionOrder>;
};

export type RealEstateProperty = {
  __typename?: 'RealEstateProperty';
  address?: Maybe<Address>;
  amenitiesDescription?: Maybe<Scalars['String']['output']>;
  assetValue?: Maybe<Scalars['Int']['output']>;
  assetValueNote?: Maybe<Scalars['String']['output']>;
  closingCosts?: Maybe<Scalars['Int']['output']>;
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  downPayment?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Maybe<Image>>>;
  imagesAggregate?: Maybe<ImageAggregateResult>;
  investmentStatus?: Maybe<AssetStatus>;
  lastUpdate: Scalars['DateTime']['output'];
  lenderFees?: Maybe<Scalars['Int']['output']>;
  loan?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<LegalEntity>;
  propertyType: RealEstatePropertyType;
};


export type RealEstatePropertyAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
};


export type RealEstatePropertyImagesArgs = {
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ImageOrder>;
};


export type RealEstatePropertyImagesAggregateArgs = {
  filter?: InputMaybe<ImageFilter>;
};


export type RealEstatePropertyOwnerArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};

export type RealEstatePropertyAggregateResult = {
  __typename?: 'RealEstatePropertyAggregateResult';
  amenitiesDescriptionMax?: Maybe<Scalars['String']['output']>;
  amenitiesDescriptionMin?: Maybe<Scalars['String']['output']>;
  assetValueAvg?: Maybe<Scalars['Float']['output']>;
  assetValueMax?: Maybe<Scalars['Int']['output']>;
  assetValueMin?: Maybe<Scalars['Int']['output']>;
  assetValueNoteMax?: Maybe<Scalars['String']['output']>;
  assetValueNoteMin?: Maybe<Scalars['String']['output']>;
  assetValueSum?: Maybe<Scalars['Int']['output']>;
  closingCostsAvg?: Maybe<Scalars['Float']['output']>;
  closingCostsMax?: Maybe<Scalars['Int']['output']>;
  closingCostsMin?: Maybe<Scalars['Int']['output']>;
  closingCostsSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  descriptionMax?: Maybe<Scalars['String']['output']>;
  descriptionMin?: Maybe<Scalars['String']['output']>;
  downPaymentAvg?: Maybe<Scalars['Float']['output']>;
  downPaymentMax?: Maybe<Scalars['Int']['output']>;
  downPaymentMin?: Maybe<Scalars['Int']['output']>;
  downPaymentSum?: Maybe<Scalars['Int']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  lenderFeesAvg?: Maybe<Scalars['Float']['output']>;
  lenderFeesMax?: Maybe<Scalars['Int']['output']>;
  lenderFeesMin?: Maybe<Scalars['Int']['output']>;
  lenderFeesSum?: Maybe<Scalars['Int']['output']>;
  loanAvg?: Maybe<Scalars['Float']['output']>;
  loanMax?: Maybe<Scalars['Int']['output']>;
  loanMin?: Maybe<Scalars['Int']['output']>;
  loanSum?: Maybe<Scalars['Int']['output']>;
};

export type RealEstatePropertyFilter = {
  and?: InputMaybe<Array<InputMaybe<RealEstatePropertyFilter>>>;
  has?: InputMaybe<Array<InputMaybe<RealEstatePropertyHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<RealEstatePropertyFilter>;
  or?: InputMaybe<Array<InputMaybe<RealEstatePropertyFilter>>>;
};

export enum RealEstatePropertyHasFilter {
  Address = 'address',
  AmenitiesDescription = 'amenitiesDescription',
  AssetValue = 'assetValue',
  AssetValueNote = 'assetValueNote',
  ClosingCosts = 'closingCosts',
  CreationDate = 'creationDate',
  Description = 'description',
  DownPayment = 'downPayment',
  Images = 'images',
  InvestmentStatus = 'investmentStatus',
  LastUpdate = 'lastUpdate',
  LenderFees = 'lenderFees',
  Loan = 'loan',
  Owner = 'owner',
  PropertyType = 'propertyType'
}

export type RealEstatePropertyOrder = {
  asc?: InputMaybe<RealEstatePropertyOrderable>;
  desc?: InputMaybe<RealEstatePropertyOrderable>;
  then?: InputMaybe<RealEstatePropertyOrder>;
};

export enum RealEstatePropertyOrderable {
  AmenitiesDescription = 'amenitiesDescription',
  AssetValue = 'assetValue',
  AssetValueNote = 'assetValueNote',
  ClosingCosts = 'closingCosts',
  CreationDate = 'creationDate',
  Description = 'description',
  DownPayment = 'downPayment',
  LastUpdate = 'lastUpdate',
  LenderFees = 'lenderFees',
  Loan = 'loan'
}

export type RealEstatePropertyPatch = {
  address?: InputMaybe<AddressRef>;
  amenitiesDescription?: InputMaybe<Scalars['String']['input']>;
  assetValue?: InputMaybe<Scalars['Int']['input']>;
  assetValueNote?: InputMaybe<Scalars['String']['input']>;
  closingCosts?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  downPayment?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageRef>>>;
  investmentStatus?: InputMaybe<AssetStatus>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  lenderFees?: InputMaybe<Scalars['Int']['input']>;
  loan?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  propertyType?: InputMaybe<RealEstatePropertyType>;
};

export type RealEstatePropertyRef = {
  address?: InputMaybe<AddressRef>;
  amenitiesDescription?: InputMaybe<Scalars['String']['input']>;
  assetValue?: InputMaybe<Scalars['Int']['input']>;
  assetValueNote?: InputMaybe<Scalars['String']['input']>;
  closingCosts?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  downPayment?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageRef>>>;
  investmentStatus?: InputMaybe<AssetStatus>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  lenderFees?: InputMaybe<Scalars['Int']['input']>;
  loan?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  propertyType?: InputMaybe<RealEstatePropertyType>;
};

export enum RealEstatePropertyType {
  Commercial = 'COMMERCIAL',
  LandOnly = 'LAND_ONLY',
  MultiFamily = 'MULTI_FAMILY',
  SelfStorage = 'SELF_STORAGE',
  SingleFamily = 'SINGLE_FAMILY'
}

export type Session = {
  __typename?: 'Session';
  expires?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  sessionToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type SessionUserArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type SessionAggregateResult = {
  __typename?: 'SessionAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  expiresMax?: Maybe<Scalars['DateTime']['output']>;
  expiresMin?: Maybe<Scalars['DateTime']['output']>;
  sessionTokenMax?: Maybe<Scalars['String']['output']>;
  sessionTokenMin?: Maybe<Scalars['String']['output']>;
};

export type SessionFilter = {
  and?: InputMaybe<Array<InputMaybe<SessionFilter>>>;
  has?: InputMaybe<Array<InputMaybe<SessionHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<SessionFilter>;
  or?: InputMaybe<Array<InputMaybe<SessionFilter>>>;
  sessionToken?: InputMaybe<StringHashFilter>;
};

export enum SessionHasFilter {
  Expires = 'expires',
  SessionToken = 'sessionToken',
  User = 'user'
}

export type SessionOrder = {
  asc?: InputMaybe<SessionOrderable>;
  desc?: InputMaybe<SessionOrderable>;
  then?: InputMaybe<SessionOrder>;
};

export enum SessionOrderable {
  Expires = 'expires',
  SessionToken = 'sessionToken'
}

export type SessionPatch = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type SessionRef = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserRef>;
};

export type ShareOrder = {
  __typename?: 'ShareOrder';
  archived: Scalars['Boolean']['output'];
  contractIndex: Scalars['Int']['output'];
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  initiator: Scalars['String']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  maxUnits?: Maybe<Scalars['Int']['output']>;
  minUnits?: Maybe<Scalars['Int']['output']>;
  swapContractAddress: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type ShareOrderAggregateResult = {
  __typename?: 'ShareOrderAggregateResult';
  contractIndexAvg?: Maybe<Scalars['Float']['output']>;
  contractIndexMax?: Maybe<Scalars['Int']['output']>;
  contractIndexMin?: Maybe<Scalars['Int']['output']>;
  contractIndexSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  initiatorMax?: Maybe<Scalars['String']['output']>;
  initiatorMin?: Maybe<Scalars['String']['output']>;
  lastUpdateMax?: Maybe<Scalars['DateTime']['output']>;
  lastUpdateMin?: Maybe<Scalars['DateTime']['output']>;
  maxUnitsAvg?: Maybe<Scalars['Float']['output']>;
  maxUnitsMax?: Maybe<Scalars['Int']['output']>;
  maxUnitsMin?: Maybe<Scalars['Int']['output']>;
  maxUnitsSum?: Maybe<Scalars['Int']['output']>;
  minUnitsAvg?: Maybe<Scalars['Float']['output']>;
  minUnitsMax?: Maybe<Scalars['Int']['output']>;
  minUnitsMin?: Maybe<Scalars['Int']['output']>;
  minUnitsSum?: Maybe<Scalars['Int']['output']>;
  swapContractAddressMax?: Maybe<Scalars['String']['output']>;
  swapContractAddressMin?: Maybe<Scalars['String']['output']>;
  transactionHashMax?: Maybe<Scalars['String']['output']>;
  transactionHashMin?: Maybe<Scalars['String']['output']>;
};

export type ShareOrderFilter = {
  and?: InputMaybe<Array<InputMaybe<ShareOrderFilter>>>;
  has?: InputMaybe<Array<InputMaybe<ShareOrderHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<ShareOrderFilter>;
  or?: InputMaybe<Array<InputMaybe<ShareOrderFilter>>>;
  swapContractAddress?: InputMaybe<StringTermFilter>;
};

export enum ShareOrderHasFilter {
  Archived = 'archived',
  ContractIndex = 'contractIndex',
  CreationDate = 'creationDate',
  Initiator = 'initiator',
  LastUpdate = 'lastUpdate',
  MaxUnits = 'maxUnits',
  MinUnits = 'minUnits',
  SwapContractAddress = 'swapContractAddress',
  TransactionHash = 'transactionHash',
  Visible = 'visible'
}

export type ShareOrderOrder = {
  asc?: InputMaybe<ShareOrderOrderable>;
  desc?: InputMaybe<ShareOrderOrderable>;
  then?: InputMaybe<ShareOrderOrder>;
};

export enum ShareOrderOrderable {
  ContractIndex = 'contractIndex',
  CreationDate = 'creationDate',
  Initiator = 'initiator',
  LastUpdate = 'lastUpdate',
  MaxUnits = 'maxUnits',
  MinUnits = 'minUnits',
  SwapContractAddress = 'swapContractAddress',
  TransactionHash = 'transactionHash'
}

export type ShareOrderPatch = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  contractIndex?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  initiator?: InputMaybe<Scalars['String']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  maxUnits?: InputMaybe<Scalars['Int']['input']>;
  minUnits?: InputMaybe<Scalars['Int']['input']>;
  swapContractAddress?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ShareOrderRef = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  contractIndex?: InputMaybe<Scalars['Int']['input']>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  initiator?: InputMaybe<Scalars['String']['input']>;
  lastUpdate?: InputMaybe<Scalars['DateTime']['input']>;
  maxUnits?: InputMaybe<Scalars['Int']['input']>;
  minUnits?: InputMaybe<Scalars['Int']['input']>;
  swapContractAddress?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ShareTransferEvent = {
  __typename?: 'ShareTransferEvent';
  amount: Scalars['Int']['output'];
  archived: Scalars['Boolean']['output'];
  currencyCode?: Maybe<CurrencyCode>;
  id: Scalars['ID']['output'];
  orderIndex?: Maybe<Scalars['Int']['output']>;
  partition: Scalars['String']['output'];
  price?: Maybe<Scalars['String']['output']>;
  recipientAddress: Scalars['String']['output'];
  senderAddress: Scalars['String']['output'];
  shareContractAddress: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  type: ShareTransferEventType;
};

export type ShareTransferEventAggregateResult = {
  __typename?: 'ShareTransferEventAggregateResult';
  amountAvg?: Maybe<Scalars['Float']['output']>;
  amountMax?: Maybe<Scalars['Int']['output']>;
  amountMin?: Maybe<Scalars['Int']['output']>;
  amountSum?: Maybe<Scalars['Int']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  orderIndexAvg?: Maybe<Scalars['Float']['output']>;
  orderIndexMax?: Maybe<Scalars['Int']['output']>;
  orderIndexMin?: Maybe<Scalars['Int']['output']>;
  orderIndexSum?: Maybe<Scalars['Int']['output']>;
  partitionMax?: Maybe<Scalars['String']['output']>;
  partitionMin?: Maybe<Scalars['String']['output']>;
  priceMax?: Maybe<Scalars['String']['output']>;
  priceMin?: Maybe<Scalars['String']['output']>;
  recipientAddressMax?: Maybe<Scalars['String']['output']>;
  recipientAddressMin?: Maybe<Scalars['String']['output']>;
  senderAddressMax?: Maybe<Scalars['String']['output']>;
  senderAddressMin?: Maybe<Scalars['String']['output']>;
  shareContractAddressMax?: Maybe<Scalars['String']['output']>;
  shareContractAddressMin?: Maybe<Scalars['String']['output']>;
  transactionHashMax?: Maybe<Scalars['String']['output']>;
  transactionHashMin?: Maybe<Scalars['String']['output']>;
};

export type ShareTransferEventFilter = {
  and?: InputMaybe<Array<InputMaybe<ShareTransferEventFilter>>>;
  has?: InputMaybe<Array<InputMaybe<ShareTransferEventHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<ShareTransferEventFilter>;
  or?: InputMaybe<Array<InputMaybe<ShareTransferEventFilter>>>;
  partition?: InputMaybe<StringTermFilter>;
  recipientAddress?: InputMaybe<StringTermFilter>;
  senderAddress?: InputMaybe<StringTermFilter>;
  shareContractAddress?: InputMaybe<StringTermFilter>;
};

export enum ShareTransferEventHasFilter {
  Amount = 'amount',
  Archived = 'archived',
  CurrencyCode = 'currencyCode',
  OrderIndex = 'orderIndex',
  Partition = 'partition',
  Price = 'price',
  RecipientAddress = 'recipientAddress',
  SenderAddress = 'senderAddress',
  ShareContractAddress = 'shareContractAddress',
  TransactionHash = 'transactionHash',
  Type = 'type'
}

export type ShareTransferEventOrder = {
  asc?: InputMaybe<ShareTransferEventOrderable>;
  desc?: InputMaybe<ShareTransferEventOrderable>;
  then?: InputMaybe<ShareTransferEventOrder>;
};

export enum ShareTransferEventOrderable {
  Amount = 'amount',
  OrderIndex = 'orderIndex',
  Partition = 'partition',
  Price = 'price',
  RecipientAddress = 'recipientAddress',
  SenderAddress = 'senderAddress',
  ShareContractAddress = 'shareContractAddress',
  TransactionHash = 'transactionHash'
}

export type ShareTransferEventPatch = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  partition?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  recipientAddress?: InputMaybe<Scalars['String']['input']>;
  senderAddress?: InputMaybe<Scalars['String']['input']>;
  shareContractAddress?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ShareTransferEventType>;
};

export type ShareTransferEventRef = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  id?: InputMaybe<Scalars['ID']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  partition?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  recipientAddress?: InputMaybe<Scalars['String']['input']>;
  senderAddress?: InputMaybe<Scalars['String']['input']>;
  shareContractAddress?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ShareTransferEventType>;
};

/**
 * INDEPENDENT CHAIN DATA	MODEL ==================================================================
 * These nodes are not connected to the main graph, but are used to store data from the chain
 * We may want to set up cooperativ-team-only and wallet-based auth for these nodes
 */
export enum ShareTransferEventType {
  Approval = 'APPROVAL',
  Disapproval = 'DISAPPROVAL',
  Forced = 'FORCED',
  Issuance = 'ISSUANCE',
  Trade = 'TRADE',
  Transfer = 'TRANSFER'
}

export type SmartContract = {
  __typename?: 'SmartContract';
  backingToken?: Maybe<CurrencyCode>;
  cryptoAddress: CryptoAddress;
  document?: Maybe<Document>;
  established?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  numTokensAuthorized?: Maybe<Scalars['Int64']['output']>;
  owner?: Maybe<LegalEntity>;
  partitions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  subType?: Maybe<Scalars['String']['output']>;
  type: SmartContractType;
};


export type SmartContractCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
};


export type SmartContractDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
};


export type SmartContractOwnerArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
};

export type SmartContractAggregateResult = {
  __typename?: 'SmartContractAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
  numTokensAuthorizedAvg?: Maybe<Scalars['Float']['output']>;
  numTokensAuthorizedMax?: Maybe<Scalars['Int64']['output']>;
  numTokensAuthorizedMin?: Maybe<Scalars['Int64']['output']>;
  numTokensAuthorizedSum?: Maybe<Scalars['Int64']['output']>;
  subTypeMax?: Maybe<Scalars['String']['output']>;
  subTypeMin?: Maybe<Scalars['String']['output']>;
};

export type SmartContractFilter = {
  and?: InputMaybe<Array<InputMaybe<SmartContractFilter>>>;
  has?: InputMaybe<Array<InputMaybe<SmartContractHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<SmartContractFilter>;
  or?: InputMaybe<Array<InputMaybe<SmartContractFilter>>>;
};

export enum SmartContractHasFilter {
  BackingToken = 'backingToken',
  CryptoAddress = 'cryptoAddress',
  Document = 'document',
  Established = 'established',
  Name = 'name',
  NumTokensAuthorized = 'numTokensAuthorized',
  Owner = 'owner',
  Partitions = 'partitions',
  SubType = 'subType',
  Type = 'type'
}

export type SmartContractOrder = {
  asc?: InputMaybe<SmartContractOrderable>;
  desc?: InputMaybe<SmartContractOrderable>;
  then?: InputMaybe<SmartContractOrder>;
};

export enum SmartContractOrderable {
  Name = 'name',
  NumTokensAuthorized = 'numTokensAuthorized',
  SubType = 'subType'
}

export type SmartContractPatch = {
  backingToken?: InputMaybe<CurrencyCode>;
  cryptoAddress?: InputMaybe<CryptoAddressRef>;
  document?: InputMaybe<DocumentRef>;
  established?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numTokensAuthorized?: InputMaybe<Scalars['Int64']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  partitions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SmartContractType>;
};

export type SmartContractRef = {
  backingToken?: InputMaybe<CurrencyCode>;
  cryptoAddress?: InputMaybe<CryptoAddressRef>;
  document?: InputMaybe<DocumentRef>;
  established?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numTokensAuthorized?: InputMaybe<Scalars['Int64']['input']>;
  owner?: InputMaybe<LegalEntityRef>;
  partitions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SmartContractType>;
};

export enum SmartContractType {
  C2 = 'C2',
  C3 = 'C3',
  Distribution = 'DISTRIBUTION',
  Erc20 = 'ERC20',
  Erc1410 = 'ERC1410',
  Other = 'OTHER',
  Swap = 'SWAP'
}

export type StringExactFilter = {
  between?: InputMaybe<StringRange>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
};

export type StringFullTextFilter = {
  alloftext?: InputMaybe<Scalars['String']['input']>;
  anyoftext?: InputMaybe<Scalars['String']['input']>;
};

export type StringHashFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StringRange = {
  max: Scalars['String']['input'];
  min: Scalars['String']['input'];
};

export type StringRegExpFilter = {
  regexp?: InputMaybe<Scalars['String']['input']>;
};

export type StringTermFilter = {
  allofterms?: InputMaybe<Scalars['String']['input']>;
  anyofterms?: InputMaybe<Scalars['String']['input']>;
};

export enum UnitName {
  MembershipInterest = 'MEMBERSHIP_INTEREST',
  Share = 'SHARE',
  Token = 'TOKEN',
  Unit = 'UNIT'
}

export type UpdateAccountInput = {
  filter: AccountFilter;
  remove?: InputMaybe<AccountPatch>;
  set?: InputMaybe<AccountPatch>;
};

export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  account?: Maybe<Array<Maybe<Account>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateAccountPayloadAccountArgs = {
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};

export type UpdateAddressInput = {
  filter: AddressFilter;
  remove?: InputMaybe<AddressPatch>;
  set?: InputMaybe<AddressPatch>;
};

export type UpdateAddressPayload = {
  __typename?: 'UpdateAddressPayload';
  address?: Maybe<Array<Maybe<Address>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateAddressPayloadAddressArgs = {
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AddressOrder>;
};

export type UpdateCryptoAddressInput = {
  filter: CryptoAddressFilter;
  remove?: InputMaybe<CryptoAddressPatch>;
  set?: InputMaybe<CryptoAddressPatch>;
};

export type UpdateCryptoAddressPayload = {
  __typename?: 'UpdateCryptoAddressPayload';
  cryptoAddress?: Maybe<Array<Maybe<CryptoAddress>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateCryptoAddressPayloadCryptoAddressArgs = {
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CryptoAddressOrder>;
};

export type UpdateDocumentInput = {
  filter: DocumentFilter;
  remove?: InputMaybe<DocumentPatch>;
  set?: InputMaybe<DocumentPatch>;
};

export type UpdateDocumentPayload = {
  __typename?: 'UpdateDocumentPayload';
  document?: Maybe<Array<Maybe<Document>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateDocumentPayloadDocumentArgs = {
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentOrder>;
};

export type UpdateDocumentSignatoryInput = {
  filter: DocumentSignatoryFilter;
  remove?: InputMaybe<DocumentSignatoryPatch>;
  set?: InputMaybe<DocumentSignatoryPatch>;
};

export type UpdateDocumentSignatoryPayload = {
  __typename?: 'UpdateDocumentSignatoryPayload';
  documentSignatory?: Maybe<Array<Maybe<DocumentSignatory>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateDocumentSignatoryPayloadDocumentSignatoryArgs = {
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DocumentSignatoryOrder>;
};

export type UpdateEmailAddressInput = {
  filter: EmailAddressFilter;
  remove?: InputMaybe<EmailAddressPatch>;
  set?: InputMaybe<EmailAddressPatch>;
};

export type UpdateEmailAddressPayload = {
  __typename?: 'UpdateEmailAddressPayload';
  emailAddress?: Maybe<Array<Maybe<EmailAddress>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateEmailAddressPayloadEmailAddressArgs = {
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EmailAddressOrder>;
};

export type UpdateImageInput = {
  filter: ImageFilter;
  remove?: InputMaybe<ImagePatch>;
  set?: InputMaybe<ImagePatch>;
};

export type UpdateImagePayload = {
  __typename?: 'UpdateImagePayload';
  image?: Maybe<Array<Maybe<Image>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateImagePayloadImageArgs = {
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ImageOrder>;
};

export type UpdateInvestorApplicationInput = {
  filter: InvestorApplicationFilter;
  remove?: InputMaybe<InvestorApplicationPatch>;
  set?: InputMaybe<InvestorApplicationPatch>;
};

export type UpdateInvestorApplicationPayload = {
  __typename?: 'UpdateInvestorApplicationPayload';
  investorApplication?: Maybe<Array<Maybe<InvestorApplication>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateInvestorApplicationPayloadInvestorApplicationArgs = {
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InvestorApplicationOrder>;
};

export type UpdateJurisdictionInput = {
  filter: JurisdictionFilter;
  remove?: InputMaybe<JurisdictionPatch>;
  set?: InputMaybe<JurisdictionPatch>;
};

export type UpdateJurisdictionPayload = {
  __typename?: 'UpdateJurisdictionPayload';
  jurisdiction?: Maybe<Array<Maybe<Jurisdiction>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateJurisdictionPayloadJurisdictionArgs = {
  filter?: InputMaybe<JurisdictionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JurisdictionOrder>;
};

export type UpdateLegalEntityInput = {
  filter: LegalEntityFilter;
  remove?: InputMaybe<LegalEntityPatch>;
  set?: InputMaybe<LegalEntityPatch>;
};

export type UpdateLegalEntityPayload = {
  __typename?: 'UpdateLegalEntityPayload';
  legalEntity?: Maybe<Array<Maybe<LegalEntity>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateLegalEntityPayloadLegalEntityArgs = {
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LegalEntityOrder>;
};

export type UpdateLinkedAccountInput = {
  filter: LinkedAccountFilter;
  remove?: InputMaybe<LinkedAccountPatch>;
  set?: InputMaybe<LinkedAccountPatch>;
};

export type UpdateLinkedAccountPayload = {
  __typename?: 'UpdateLinkedAccountPayload';
  linkedAccount?: Maybe<Array<Maybe<LinkedAccount>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateLinkedAccountPayloadLinkedAccountArgs = {
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LinkedAccountOrder>;
};

export type UpdateNotificationConfigurationInput = {
  filter: NotificationConfigurationFilter;
  remove?: InputMaybe<NotificationConfigurationPatch>;
  set?: InputMaybe<NotificationConfigurationPatch>;
};

export type UpdateNotificationConfigurationPayload = {
  __typename?: 'UpdateNotificationConfigurationPayload';
  notificationConfiguration?: Maybe<Array<Maybe<NotificationConfiguration>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateNotificationConfigurationPayloadNotificationConfigurationArgs = {
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOfferingDescriptionTextInput = {
  filter: OfferingDescriptionTextFilter;
  remove?: InputMaybe<OfferingDescriptionTextPatch>;
  set?: InputMaybe<OfferingDescriptionTextPatch>;
};

export type UpdateOfferingDescriptionTextPayload = {
  __typename?: 'UpdateOfferingDescriptionTextPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDescriptionText?: Maybe<Array<Maybe<OfferingDescriptionText>>>;
};


export type UpdateOfferingDescriptionTextPayloadOfferingDescriptionTextArgs = {
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDescriptionTextOrder>;
};

export type UpdateOfferingDetailsInput = {
  filter: OfferingDetailsFilter;
  remove?: InputMaybe<OfferingDetailsPatch>;
  set?: InputMaybe<OfferingDetailsPatch>;
};

export type UpdateOfferingDetailsPayload = {
  __typename?: 'UpdateOfferingDetailsPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDetails?: Maybe<Array<Maybe<OfferingDetails>>>;
};


export type UpdateOfferingDetailsPayloadOfferingDetailsArgs = {
  filter?: InputMaybe<OfferingDetailsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDetailsOrder>;
};

export type UpdateOfferingDistributionInput = {
  filter: OfferingDistributionFilter;
  remove?: InputMaybe<OfferingDistributionPatch>;
  set?: InputMaybe<OfferingDistributionPatch>;
};

export type UpdateOfferingDistributionPayload = {
  __typename?: 'UpdateOfferingDistributionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringDistribution?: Maybe<Array<Maybe<OfferingDistribution>>>;
};


export type UpdateOfferingDistributionPayloadOfferingDistributionArgs = {
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingDistributionOrder>;
};

export type UpdateOfferingInput = {
  filter: OfferingFilter;
  remove?: InputMaybe<OfferingPatch>;
  set?: InputMaybe<OfferingPatch>;
};

export type UpdateOfferingParticipantInput = {
  filter: OfferingParticipantFilter;
  remove?: InputMaybe<OfferingParticipantPatch>;
  set?: InputMaybe<OfferingParticipantPatch>;
};

export type UpdateOfferingParticipantPayload = {
  __typename?: 'UpdateOfferingParticipantPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringParticipant?: Maybe<Array<Maybe<OfferingParticipant>>>;
};


export type UpdateOfferingParticipantPayloadOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingParticipantOrder>;
};

export type UpdateOfferingPayload = {
  __typename?: 'UpdateOfferingPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offering?: Maybe<Array<Maybe<Offering>>>;
};


export type UpdateOfferingPayloadOfferingArgs = {
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OfferingOrder>;
};

export type UpdateOfferingSmartContractSetInput = {
  filter: OfferingSmartContractSetFilter;
  remove?: InputMaybe<OfferingSmartContractSetPatch>;
  set?: InputMaybe<OfferingSmartContractSetPatch>;
};

export type UpdateOfferingSmartContractSetPayload = {
  __typename?: 'UpdateOfferingSmartContractSetPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  offeringSmartContractSet?: Maybe<Array<Maybe<OfferingSmartContractSet>>>;
};


export type UpdateOfferingSmartContractSetPayloadOfferingSmartContractSetArgs = {
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrganizationInput = {
  filter: OrganizationFilter;
  remove?: InputMaybe<OrganizationPatch>;
  set?: InputMaybe<OrganizationPatch>;
};

export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  organization?: Maybe<Array<Maybe<Organization>>>;
};


export type UpdateOrganizationPayloadOrganizationArgs = {
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrganizationOrder>;
};

export type UpdateOrganizationUserInput = {
  filter: OrganizationUserFilter;
  remove?: InputMaybe<OrganizationUserPatch>;
  set?: InputMaybe<OrganizationUserPatch>;
};

export type UpdateOrganizationUserPayload = {
  __typename?: 'UpdateOrganizationUserPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  organizationUser?: Maybe<Array<Maybe<OrganizationUser>>>;
};


export type UpdateOrganizationUserPayloadOrganizationUserArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRealEstatePropertyInput = {
  filter: RealEstatePropertyFilter;
  remove?: InputMaybe<RealEstatePropertyPatch>;
  set?: InputMaybe<RealEstatePropertyPatch>;
};

export type UpdateRealEstatePropertyPayload = {
  __typename?: 'UpdateRealEstatePropertyPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  realEstateProperty?: Maybe<Array<Maybe<RealEstateProperty>>>;
};


export type UpdateRealEstatePropertyPayloadRealEstatePropertyArgs = {
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RealEstatePropertyOrder>;
};

export type UpdateSessionInput = {
  filter: SessionFilter;
  remove?: InputMaybe<SessionPatch>;
  set?: InputMaybe<SessionPatch>;
};

export type UpdateSessionPayload = {
  __typename?: 'UpdateSessionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  session?: Maybe<Array<Maybe<Session>>>;
};


export type UpdateSessionPayloadSessionArgs = {
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SessionOrder>;
};

export type UpdateShareOrderInput = {
  filter: ShareOrderFilter;
  remove?: InputMaybe<ShareOrderPatch>;
  set?: InputMaybe<ShareOrderPatch>;
};

export type UpdateShareOrderPayload = {
  __typename?: 'UpdateShareOrderPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  shareOrder?: Maybe<Array<Maybe<ShareOrder>>>;
};


export type UpdateShareOrderPayloadShareOrderArgs = {
  filter?: InputMaybe<ShareOrderFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareOrderOrder>;
};

export type UpdateShareTransferEventInput = {
  filter: ShareTransferEventFilter;
  remove?: InputMaybe<ShareTransferEventPatch>;
  set?: InputMaybe<ShareTransferEventPatch>;
};

export type UpdateShareTransferEventPayload = {
  __typename?: 'UpdateShareTransferEventPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  shareTransferEvent?: Maybe<Array<Maybe<ShareTransferEvent>>>;
};


export type UpdateShareTransferEventPayloadShareTransferEventArgs = {
  filter?: InputMaybe<ShareTransferEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShareTransferEventOrder>;
};

export type UpdateSmartContractInput = {
  filter: SmartContractFilter;
  remove?: InputMaybe<SmartContractPatch>;
  set?: InputMaybe<SmartContractPatch>;
};

export type UpdateSmartContractPayload = {
  __typename?: 'UpdateSmartContractPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  smartContract?: Maybe<Array<Maybe<SmartContract>>>;
};


export type UpdateSmartContractPayloadSmartContractArgs = {
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SmartContractOrder>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  remove?: InputMaybe<UserPatch>;
  set?: InputMaybe<UserPatch>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type UpdateUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export type UpdateVerificationTokenInput = {
  filter: VerificationTokenFilter;
  remove?: InputMaybe<VerificationTokenPatch>;
  set?: InputMaybe<VerificationTokenPatch>;
};

export type UpdateVerificationTokenPayload = {
  __typename?: 'UpdateVerificationTokenPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  verificationToken?: Maybe<Array<Maybe<VerificationToken>>>;
};


export type UpdateVerificationTokenPayloadVerificationTokenArgs = {
  filter?: InputMaybe<VerificationTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<VerificationTokenOrder>;
};

export type UpdateWhitelistTransactionInput = {
  filter: WhitelistTransactionFilter;
  remove?: InputMaybe<WhitelistTransactionPatch>;
  set?: InputMaybe<WhitelistTransactionPatch>;
};

export type UpdateWhitelistTransactionPayload = {
  __typename?: 'UpdateWhitelistTransactionPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  whitelistTransaction?: Maybe<Array<Maybe<WhitelistTransaction>>>;
};


export type UpdateWhitelistTransactionPayloadWhitelistTransactionArgs = {
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WhitelistTransactionOrder>;
};

export type User = {
  __typename?: 'User';
  accounts?: Maybe<Array<Maybe<Account>>>;
  accountsAggregate?: Maybe<AccountAggregateResult>;
  creationDate?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organizations?: Maybe<Array<Maybe<OrganizationUser>>>;
  organizationsAggregate?: Maybe<OrganizationUserAggregateResult>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  sessionsAggregate?: Maybe<SessionAggregateResult>;
};


export type UserAccountsArgs = {
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AccountOrder>;
};


export type UserAccountsAggregateArgs = {
  filter?: InputMaybe<AccountFilter>;
};


export type UserOrganizationsArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserOrganizationsAggregateArgs = {
  filter?: InputMaybe<OrganizationUserFilter>;
};


export type UserSessionsArgs = {
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SessionOrder>;
};


export type UserSessionsAggregateArgs = {
  filter?: InputMaybe<SessionFilter>;
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  creationDateMax?: Maybe<Scalars['DateTime']['output']>;
  creationDateMin?: Maybe<Scalars['DateTime']['output']>;
  emailMax?: Maybe<Scalars['String']['output']>;
  emailMin?: Maybe<Scalars['String']['output']>;
  emailVerifiedMax?: Maybe<Scalars['DateTime']['output']>;
  emailVerifiedMin?: Maybe<Scalars['DateTime']['output']>;
  imageMax?: Maybe<Scalars['String']['output']>;
  imageMin?: Maybe<Scalars['String']['output']>;
  nameMax?: Maybe<Scalars['String']['output']>;
  nameMin?: Maybe<Scalars['String']['output']>;
};

export type UserFilter = {
  and?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  email?: InputMaybe<StringHashFilter>;
  has?: InputMaybe<Array<InputMaybe<UserHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<UserFilter>;
  or?: InputMaybe<Array<InputMaybe<UserFilter>>>;
};

export enum UserHasFilter {
  Accounts = 'accounts',
  CreationDate = 'creationDate',
  Email = 'email',
  EmailVerified = 'emailVerified',
  Image = 'image',
  Name = 'name',
  Organizations = 'organizations',
  Sessions = 'sessions'
}

export type UserOrder = {
  asc?: InputMaybe<UserOrderable>;
  desc?: InputMaybe<UserOrderable>;
  then?: InputMaybe<UserOrder>;
};

export enum UserOrderable {
  CreationDate = 'creationDate',
  Email = 'email',
  EmailVerified = 'emailVerified',
  Image = 'image',
  Name = 'name'
}

export type UserPatch = {
  accounts?: InputMaybe<Array<InputMaybe<AccountRef>>>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<Array<InputMaybe<OrganizationUserRef>>>;
  sessions?: InputMaybe<Array<InputMaybe<SessionRef>>>;
};

export type UserRef = {
  accounts?: InputMaybe<Array<InputMaybe<AccountRef>>>;
  creationDate?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<Array<InputMaybe<OrganizationUserRef>>>;
  sessions?: InputMaybe<Array<InputMaybe<SessionRef>>>;
};

export type VerificationToken = {
  __typename?: 'VerificationToken';
  expires?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type VerificationTokenAggregateResult = {
  __typename?: 'VerificationTokenAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  expiresMax?: Maybe<Scalars['DateTime']['output']>;
  expiresMin?: Maybe<Scalars['DateTime']['output']>;
  identifierMax?: Maybe<Scalars['String']['output']>;
  identifierMin?: Maybe<Scalars['String']['output']>;
  tokenMax?: Maybe<Scalars['String']['output']>;
  tokenMin?: Maybe<Scalars['String']['output']>;
};

export type VerificationTokenFilter = {
  and?: InputMaybe<Array<InputMaybe<VerificationTokenFilter>>>;
  has?: InputMaybe<Array<InputMaybe<VerificationTokenHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  identifier?: InputMaybe<StringHashFilter>;
  not?: InputMaybe<VerificationTokenFilter>;
  or?: InputMaybe<Array<InputMaybe<VerificationTokenFilter>>>;
  token?: InputMaybe<StringHashFilter>;
};

export enum VerificationTokenHasFilter {
  Expires = 'expires',
  Identifier = 'identifier',
  Token = 'token'
}

export type VerificationTokenOrder = {
  asc?: InputMaybe<VerificationTokenOrderable>;
  desc?: InputMaybe<VerificationTokenOrderable>;
  then?: InputMaybe<VerificationTokenOrder>;
};

export enum VerificationTokenOrderable {
  Expires = 'expires',
  Identifier = 'identifier',
  Token = 'token'
}

export type VerificationTokenPatch = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type VerificationTokenRef = {
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type WhitelistTransaction = {
  __typename?: 'WhitelistTransaction';
  offeringParticipant: OfferingParticipant;
  transactionHash: Scalars['String']['output'];
  type: WhitelistTransactionType;
};


export type WhitelistTransactionOfferingParticipantArgs = {
  filter?: InputMaybe<OfferingParticipantFilter>;
};

export type WhitelistTransactionAggregateResult = {
  __typename?: 'WhitelistTransactionAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  transactionHashMax?: Maybe<Scalars['String']['output']>;
  transactionHashMin?: Maybe<Scalars['String']['output']>;
};

export type WhitelistTransactionFilter = {
  and?: InputMaybe<Array<InputMaybe<WhitelistTransactionFilter>>>;
  has?: InputMaybe<Array<InputMaybe<WhitelistTransactionHasFilter>>>;
  not?: InputMaybe<WhitelistTransactionFilter>;
  or?: InputMaybe<Array<InputMaybe<WhitelistTransactionFilter>>>;
  transactionHash?: InputMaybe<StringHashFilter>;
};

export enum WhitelistTransactionHasFilter {
  OfferingParticipant = 'offeringParticipant',
  TransactionHash = 'transactionHash',
  Type = 'type'
}

export type WhitelistTransactionOrder = {
  asc?: InputMaybe<WhitelistTransactionOrderable>;
  desc?: InputMaybe<WhitelistTransactionOrderable>;
  then?: InputMaybe<WhitelistTransactionOrder>;
};

export enum WhitelistTransactionOrderable {
  TransactionHash = 'transactionHash'
}

export type WhitelistTransactionPatch = {
  offeringParticipant?: InputMaybe<OfferingParticipantRef>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<WhitelistTransactionType>;
};

export type WhitelistTransactionRef = {
  offeringParticipant?: InputMaybe<OfferingParticipantRef>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<WhitelistTransactionType>;
};

export enum WhitelistTransactionType {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type WithinFilter = {
  polygon: PolygonRef;
};
