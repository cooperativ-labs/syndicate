/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string };
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string };
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any };
  /** A date without time information */
  Date: { input: string; output: string };
  /** A date and time */
  Datetime: { input: string; output: string };
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string };
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any };
  /** A time without date information */
  Time: { input: string; output: string };
  /** A universally unique identifier */
  UUID: { input: string; output: string };
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars["BigFloat"]["input"]>;
  gt?: InputMaybe<Scalars["BigFloat"]["input"]>;
  gte?: InputMaybe<Scalars["BigFloat"]["input"]>;
  in?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["BigFloat"]["input"]>;
  lte?: InputMaybe<Scalars["BigFloat"]["input"]>;
  neq?: InputMaybe<Scalars["BigFloat"]["input"]>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars["BigInt"]["input"]>;
  gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  neq?: InputMaybe<Scalars["BigInt"]["input"]>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars["Date"]["input"]>;
  gt?: InputMaybe<Scalars["Date"]["input"]>;
  gte?: InputMaybe<Scalars["Date"]["input"]>;
  in?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Date"]["input"]>;
  lte?: InputMaybe<Scalars["Date"]["input"]>;
  neq?: InputMaybe<Scalars["Date"]["input"]>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Date"]["input"]>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars["Datetime"]["input"]>;
  gt?: InputMaybe<Scalars["Datetime"]["input"]>;
  gte?: InputMaybe<Scalars["Datetime"]["input"]>;
  in?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Datetime"]["input"]>;
  lte?: InputMaybe<Scalars["Datetime"]["input"]>;
  neq?: InputMaybe<Scalars["Datetime"]["input"]>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
};

export enum FilterIs {
  NotNull = "NOT_NULL",
  Null = "NULL"
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  neq?: InputMaybe<Scalars["Float"]["input"]>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Float"]["input"]>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars["ID"]["input"]>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  neq?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: "Mutation";
  /** Deletes zero or more records from the `address` collection */
  deleteFromaddressCollection: AddressDeleteResponse;
  /** Deletes zero or more records from the `crypto_address` collection */
  deleteFromcrypto_addressCollection: CryptoAddressDeleteResponse;
  /** Deletes zero or more records from the `document` collection */
  deleteFromdocumentCollection: DocumentDeleteResponse;
  /** Deletes zero or more records from the `document_signatory` collection */
  deleteFromdocument_signatoryCollection: DocumentSignatoryDeleteResponse;
  /** Deletes zero or more records from the `email_address` collection */
  deleteFromemail_addressCollection: EmailAddressDeleteResponse;
  /** Deletes zero or more records from the `image` collection */
  deleteFromimageCollection: ImageDeleteResponse;
  /** Deletes zero or more records from the `investor_application` collection */
  deleteFrominvestor_applicationCollection: InvestorApplicationDeleteResponse;
  /** Deletes zero or more records from the `jurisdiction` collection */
  deleteFromjurisdictionCollection: JurisdictionDeleteResponse;
  /** Deletes zero or more records from the `legal_entity` collection */
  deleteFromlegal_entityCollection: LegalEntityDeleteResponse;
  /** Deletes zero or more records from the `legal_entity_relationship` collection */
  deleteFromlegal_entity_relationshipCollection: LegalEntityRelationshipDeleteResponse;
  /** Deletes zero or more records from the `linked_account` collection */
  deleteFromlinked_accountCollection: LinkedAccountDeleteResponse;
  /** Deletes zero or more records from the `notification_configuration` collection */
  deleteFromnotification_configurationCollection: NotificationConfigurationDeleteResponse;
  /** Deletes zero or more records from the `offering` collection */
  deleteFromofferingCollection: OfferingDeleteResponse;
  /** Deletes zero or more records from the `offering_description_text` collection */
  deleteFromoffering_description_textCollection: OfferingDescriptionTextDeleteResponse;
  /** Deletes zero or more records from the `offering_detail` collection */
  deleteFromoffering_detailCollection: OfferingDetailDeleteResponse;
  /** Deletes zero or more records from the `offering_distribution` collection */
  deleteFromoffering_distributionCollection: OfferingDistributionDeleteResponse;
  /** Deletes zero or more records from the `offering_participant` collection */
  deleteFromoffering_participantCollection: OfferingParticipantDeleteResponse;
  /** Deletes zero or more records from the `offering_smart_contract_set` collection */
  deleteFromoffering_smart_contract_setCollection: OfferingSmartContractSetDeleteResponse;
  /** Deletes zero or more records from the `organization` collection */
  deleteFromorganizationCollection: OrganizationDeleteResponse;
  /** Deletes zero or more records from the `organization_user` collection */
  deleteFromorganization_userCollection: OrganizationUserDeleteResponse;
  /** Deletes zero or more records from the `profile` collection */
  deleteFromprofileCollection: ProfileDeleteResponse;
  /** Deletes zero or more records from the `real_estate_property` collection */
  deleteFromreal_estate_propertyCollection: RealEstatePropertyDeleteResponse;
  /** Deletes zero or more records from the `real_estate_property_image` collection */
  deleteFromreal_estate_property_imageCollection: RealEstatePropertyImageDeleteResponse;
  /** Deletes zero or more records from the `share_order` collection */
  deleteFromshare_orderCollection: ShareOrderDeleteResponse;
  /** Deletes zero or more records from the `share_transfer_event` collection */
  deleteFromshare_transfer_eventCollection: ShareTransferEventDeleteResponse;
  /** Deletes zero or more records from the `smart_contract` collection */
  deleteFromsmart_contractCollection: SmartContractDeleteResponse;
  /** Deletes zero or more records from the `whitelist_transaction` collection */
  deleteFromwhitelist_transactionCollection: WhitelistTransactionDeleteResponse;
  /** Adds one or more `address` records to the collection */
  insertIntoaddressCollection?: Maybe<AddressInsertResponse>;
  /** Adds one or more `crypto_address` records to the collection */
  insertIntocrypto_addressCollection?: Maybe<CryptoAddressInsertResponse>;
  /** Adds one or more `document` records to the collection */
  insertIntodocumentCollection?: Maybe<DocumentInsertResponse>;
  /** Adds one or more `document_signatory` records to the collection */
  insertIntodocument_signatoryCollection?: Maybe<DocumentSignatoryInsertResponse>;
  /** Adds one or more `email_address` records to the collection */
  insertIntoemail_addressCollection?: Maybe<EmailAddressInsertResponse>;
  /** Adds one or more `image` records to the collection */
  insertIntoimageCollection?: Maybe<ImageInsertResponse>;
  /** Adds one or more `investor_application` records to the collection */
  insertIntoinvestor_applicationCollection?: Maybe<InvestorApplicationInsertResponse>;
  /** Adds one or more `jurisdiction` records to the collection */
  insertIntojurisdictionCollection?: Maybe<JurisdictionInsertResponse>;
  /** Adds one or more `legal_entity` records to the collection */
  insertIntolegal_entityCollection?: Maybe<LegalEntityInsertResponse>;
  /** Adds one or more `legal_entity_relationship` records to the collection */
  insertIntolegal_entity_relationshipCollection?: Maybe<LegalEntityRelationshipInsertResponse>;
  /** Adds one or more `linked_account` records to the collection */
  insertIntolinked_accountCollection?: Maybe<LinkedAccountInsertResponse>;
  /** Adds one or more `notification_configuration` records to the collection */
  insertIntonotification_configurationCollection?: Maybe<NotificationConfigurationInsertResponse>;
  /** Adds one or more `offering` records to the collection */
  insertIntoofferingCollection?: Maybe<OfferingInsertResponse>;
  /** Adds one or more `offering_description_text` records to the collection */
  insertIntooffering_description_textCollection?: Maybe<OfferingDescriptionTextInsertResponse>;
  /** Adds one or more `offering_detail` records to the collection */
  insertIntooffering_detailCollection?: Maybe<OfferingDetailInsertResponse>;
  /** Adds one or more `offering_distribution` records to the collection */
  insertIntooffering_distributionCollection?: Maybe<OfferingDistributionInsertResponse>;
  /** Adds one or more `offering_participant` records to the collection */
  insertIntooffering_participantCollection?: Maybe<OfferingParticipantInsertResponse>;
  /** Adds one or more `offering_smart_contract_set` records to the collection */
  insertIntooffering_smart_contract_setCollection?: Maybe<OfferingSmartContractSetInsertResponse>;
  /** Adds one or more `organization` records to the collection */
  insertIntoorganizationCollection?: Maybe<OrganizationInsertResponse>;
  /** Adds one or more `organization_user` records to the collection */
  insertIntoorganization_userCollection?: Maybe<OrganizationUserInsertResponse>;
  /** Adds one or more `profile` records to the collection */
  insertIntoprofileCollection?: Maybe<ProfileInsertResponse>;
  /** Adds one or more `real_estate_property` records to the collection */
  insertIntoreal_estate_propertyCollection?: Maybe<RealEstatePropertyInsertResponse>;
  /** Adds one or more `real_estate_property_image` records to the collection */
  insertIntoreal_estate_property_imageCollection?: Maybe<RealEstatePropertyImageInsertResponse>;
  /** Adds one or more `share_order` records to the collection */
  insertIntoshare_orderCollection?: Maybe<ShareOrderInsertResponse>;
  /** Adds one or more `share_transfer_event` records to the collection */
  insertIntoshare_transfer_eventCollection?: Maybe<ShareTransferEventInsertResponse>;
  /** Adds one or more `smart_contract` records to the collection */
  insertIntosmart_contractCollection?: Maybe<SmartContractInsertResponse>;
  /** Adds one or more `whitelist_transaction` records to the collection */
  insertIntowhitelist_transactionCollection?: Maybe<WhitelistTransactionInsertResponse>;
  /** Updates zero or more records in the `address` collection */
  updateaddressCollection: AddressUpdateResponse;
  /** Updates zero or more records in the `crypto_address` collection */
  updatecrypto_addressCollection: CryptoAddressUpdateResponse;
  /** Updates zero or more records in the `document` collection */
  updatedocumentCollection: DocumentUpdateResponse;
  /** Updates zero or more records in the `document_signatory` collection */
  updatedocument_signatoryCollection: DocumentSignatoryUpdateResponse;
  /** Updates zero or more records in the `email_address` collection */
  updateemail_addressCollection: EmailAddressUpdateResponse;
  /** Updates zero or more records in the `image` collection */
  updateimageCollection: ImageUpdateResponse;
  /** Updates zero or more records in the `investor_application` collection */
  updateinvestor_applicationCollection: InvestorApplicationUpdateResponse;
  /** Updates zero or more records in the `jurisdiction` collection */
  updatejurisdictionCollection: JurisdictionUpdateResponse;
  /** Updates zero or more records in the `legal_entity` collection */
  updatelegal_entityCollection: LegalEntityUpdateResponse;
  /** Updates zero or more records in the `legal_entity_relationship` collection */
  updatelegal_entity_relationshipCollection: LegalEntityRelationshipUpdateResponse;
  /** Updates zero or more records in the `linked_account` collection */
  updatelinked_accountCollection: LinkedAccountUpdateResponse;
  /** Updates zero or more records in the `notification_configuration` collection */
  updatenotification_configurationCollection: NotificationConfigurationUpdateResponse;
  /** Updates zero or more records in the `offering` collection */
  updateofferingCollection: OfferingUpdateResponse;
  /** Updates zero or more records in the `offering_description_text` collection */
  updateoffering_description_textCollection: OfferingDescriptionTextUpdateResponse;
  /** Updates zero or more records in the `offering_detail` collection */
  updateoffering_detailCollection: OfferingDetailUpdateResponse;
  /** Updates zero or more records in the `offering_distribution` collection */
  updateoffering_distributionCollection: OfferingDistributionUpdateResponse;
  /** Updates zero or more records in the `offering_participant` collection */
  updateoffering_participantCollection: OfferingParticipantUpdateResponse;
  /** Updates zero or more records in the `offering_smart_contract_set` collection */
  updateoffering_smart_contract_setCollection: OfferingSmartContractSetUpdateResponse;
  /** Updates zero or more records in the `organization` collection */
  updateorganizationCollection: OrganizationUpdateResponse;
  /** Updates zero or more records in the `organization_user` collection */
  updateorganization_userCollection: OrganizationUserUpdateResponse;
  /** Updates zero or more records in the `profile` collection */
  updateprofileCollection: ProfileUpdateResponse;
  /** Updates zero or more records in the `real_estate_property` collection */
  updatereal_estate_propertyCollection: RealEstatePropertyUpdateResponse;
  /** Updates zero or more records in the `real_estate_property_image` collection */
  updatereal_estate_property_imageCollection: RealEstatePropertyImageUpdateResponse;
  /** Updates zero or more records in the `share_order` collection */
  updateshare_orderCollection: ShareOrderUpdateResponse;
  /** Updates zero or more records in the `share_transfer_event` collection */
  updateshare_transfer_eventCollection: ShareTransferEventUpdateResponse;
  /** Updates zero or more records in the `smart_contract` collection */
  updatesmart_contractCollection: SmartContractUpdateResponse;
  /** Updates zero or more records in the `whitelist_transaction` collection */
  updatewhitelist_transactionCollection: WhitelistTransactionUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromaddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<AddressFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromcryptoAddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<CryptoAddressFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromdocumentCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<DocumentFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromdocumentSignatoryCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<DocumentSignatoryFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromemailAddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<EmailAddressFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromimageCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ImageFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrominvestorApplicationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<InvestorApplicationFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromjurisdictionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<JurisdictionFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromlegalEntityCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LegalEntityFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromlegalEntityRelationshipCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LegalEntityRelationshipFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromlinkedAccountCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LinkedAccountFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromnotificationConfigurationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<NotificationConfigurationFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingDescriptionTextCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingDetailCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDetailFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingDistributionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDistributionFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingParticipantCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingParticipantFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromofferingSmartContractSetCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromorganizationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrganizationFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromorganizationUserCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrganizationUserFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofileCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProfileFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromrealEstatePropertyCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<RealEstatePropertyFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromrealEstatePropertyImageCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<RealEstatePropertyImageFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromshareOrderCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ShareOrderFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromshareTransferEventCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ShareTransferEventFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromsmartContractCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<SmartContractFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromwhitelistTransactionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<WhitelistTransactionFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoaddressCollectionArgs = {
  objects: Array<AddressInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntocryptoAddressCollectionArgs = {
  objects: Array<CryptoAddressInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntodocumentCollectionArgs = {
  objects: Array<DocumentInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntodocumentSignatoryCollectionArgs = {
  objects: Array<DocumentSignatoryInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoemailAddressCollectionArgs = {
  objects: Array<EmailAddressInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoimageCollectionArgs = {
  objects: Array<ImageInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoinvestorApplicationCollectionArgs = {
  objects: Array<InvestorApplicationInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntojurisdictionCollectionArgs = {
  objects: Array<JurisdictionInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntolegalEntityCollectionArgs = {
  objects: Array<LegalEntityInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntolegalEntityRelationshipCollectionArgs = {
  objects: Array<LegalEntityRelationshipInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntolinkedAccountCollectionArgs = {
  objects: Array<LinkedAccountInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntonotificationConfigurationCollectionArgs = {
  objects: Array<NotificationConfigurationInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingCollectionArgs = {
  objects: Array<OfferingInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingDescriptionTextCollectionArgs = {
  objects: Array<OfferingDescriptionTextInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingDetailCollectionArgs = {
  objects: Array<OfferingDetailInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingDistributionCollectionArgs = {
  objects: Array<OfferingDistributionInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingParticipantCollectionArgs = {
  objects: Array<OfferingParticipantInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoofferingSmartContractSetCollectionArgs = {
  objects: Array<OfferingSmartContractSetInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoorganizationCollectionArgs = {
  objects: Array<OrganizationInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoorganizationUserCollectionArgs = {
  objects: Array<OrganizationUserInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofileCollectionArgs = {
  objects: Array<ProfileInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntorealEstatePropertyCollectionArgs = {
  objects: Array<RealEstatePropertyInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntorealEstatePropertyImageCollectionArgs = {
  objects: Array<RealEstatePropertyImageInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoshareOrderCollectionArgs = {
  objects: Array<ShareOrderInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoshareTransferEventCollectionArgs = {
  objects: Array<ShareTransferEventInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntosmartContractCollectionArgs = {
  objects: Array<SmartContractInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntowhitelistTransactionCollectionArgs = {
  objects: Array<WhitelistTransactionInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateaddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<AddressFilter>;
  set: AddressUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatecryptoAddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<CryptoAddressFilter>;
  set: CryptoAddressUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatedocumentCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<DocumentFilter>;
  set: DocumentUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatedocumentSignatoryCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<DocumentSignatoryFilter>;
  set: DocumentSignatoryUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateemailAddressCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<EmailAddressFilter>;
  set: EmailAddressUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateimageCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ImageFilter>;
  set: ImageUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateinvestorApplicationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<InvestorApplicationFilter>;
  set: InvestorApplicationUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatejurisdictionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<JurisdictionFilter>;
  set: JurisdictionUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatelegalEntityCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LegalEntityFilter>;
  set: LegalEntityUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatelegalEntityRelationshipCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LegalEntityRelationshipFilter>;
  set: LegalEntityRelationshipUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatelinkedAccountCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<LinkedAccountFilter>;
  set: LinkedAccountUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatenotificationConfigurationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<NotificationConfigurationFilter>;
  set: NotificationConfigurationUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingFilter>;
  set: OfferingUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingDescriptionTextCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  set: OfferingDescriptionTextUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingDetailCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDetailFilter>;
  set: OfferingDetailUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingDistributionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingDistributionFilter>;
  set: OfferingDistributionUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingParticipantCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingParticipantFilter>;
  set: OfferingParticipantUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateofferingSmartContractSetCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  set: OfferingSmartContractSetUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateorganizationCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrganizationFilter>;
  set: OrganizationUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateorganizationUserCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrganizationUserFilter>;
  set: OrganizationUserUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofileCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProfileFilter>;
  set: ProfileUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdaterealEstatePropertyCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<RealEstatePropertyFilter>;
  set: RealEstatePropertyUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdaterealEstatePropertyImageCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<RealEstatePropertyImageFilter>;
  set: RealEstatePropertyImageUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateshareOrderCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ShareOrderFilter>;
  set: ShareOrderUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateshareTransferEventCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ShareTransferEventFilter>;
  set: ShareTransferEventUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatesmartContractCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<SmartContractFilter>;
  set: SmartContractUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatewhitelistTransactionCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<WhitelistTransactionFilter>;
  set: WhitelistTransactionUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars["ID"]["output"];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars["Opaque"]["input"]>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = "AscNullsFirst",
  /** Ascending order, nulls last */
  AscNullsLast = "AscNullsLast",
  /** Descending order, nulls first */
  DescNullsFirst = "DescNullsFirst",
  /** Descending order, nulls last */
  DescNullsLast = "DescNullsLast"
}

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

/** The root type for querying data */
export type Query = {
  __typename?: "Query";
  /** A pagable collection of type `address` */
  addressCollection?: Maybe<AddressConnection>;
  /** A pagable collection of type `crypto_address` */
  crypto_addressCollection?: Maybe<CryptoAddressConnection>;
  /** A pagable collection of type `document` */
  documentCollection?: Maybe<DocumentConnection>;
  /** A pagable collection of type `document_signatory` */
  document_signatoryCollection?: Maybe<DocumentSignatoryConnection>;
  /** A pagable collection of type `email_address` */
  email_addressCollection?: Maybe<EmailAddressConnection>;
  /** A pagable collection of type `image` */
  imageCollection?: Maybe<ImageConnection>;
  /** A pagable collection of type `investor_application` */
  investor_applicationCollection?: Maybe<InvestorApplicationConnection>;
  is_organization_admin?: Maybe<Scalars["Boolean"]["output"]>;
  is_organization_member?: Maybe<Scalars["Boolean"]["output"]>;
  /** A pagable collection of type `jurisdiction` */
  jurisdictionCollection?: Maybe<JurisdictionConnection>;
  /** A pagable collection of type `legal_entity` */
  legal_entityCollection?: Maybe<LegalEntityConnection>;
  /** A pagable collection of type `legal_entity_relationship` */
  legal_entity_relationshipCollection?: Maybe<LegalEntityRelationshipConnection>;
  /** A pagable collection of type `linked_account` */
  linked_accountCollection?: Maybe<LinkedAccountConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `notification_configuration` */
  notification_configurationCollection?: Maybe<NotificationConfigurationConnection>;
  /** A pagable collection of type `offering` */
  offeringCollection?: Maybe<OfferingConnection>;
  /** A pagable collection of type `offering_description_text` */
  offering_description_textCollection?: Maybe<OfferingDescriptionTextConnection>;
  /** A pagable collection of type `offering_detail` */
  offering_detailCollection?: Maybe<OfferingDetailConnection>;
  /** A pagable collection of type `offering_distribution` */
  offering_distributionCollection?: Maybe<OfferingDistributionConnection>;
  /** A pagable collection of type `offering_participant` */
  offering_participantCollection?: Maybe<OfferingParticipantConnection>;
  /** A pagable collection of type `offering_smart_contract_set` */
  offering_smart_contract_setCollection?: Maybe<OfferingSmartContractSetConnection>;
  /** A pagable collection of type `organization` */
  organizationCollection?: Maybe<OrganizationConnection>;
  organization_has_no_members?: Maybe<Scalars["Boolean"]["output"]>;
  /** A pagable collection of type `organization_user` */
  organization_userCollection?: Maybe<OrganizationUserConnection>;
  /** A pagable collection of type `profile` */
  profileCollection?: Maybe<ProfileConnection>;
  /** A pagable collection of type `real_estate_property` */
  real_estate_propertyCollection?: Maybe<RealEstatePropertyConnection>;
  /** A pagable collection of type `real_estate_property_image` */
  real_estate_property_imageCollection?: Maybe<RealEstatePropertyImageConnection>;
  /** A pagable collection of type `share_order` */
  share_orderCollection?: Maybe<ShareOrderConnection>;
  /** A pagable collection of type `share_transfer_event` */
  share_transfer_eventCollection?: Maybe<ShareTransferEventConnection>;
  show_limit?: Maybe<Scalars["Float"]["output"]>;
  /** A pagable collection of type `smart_contract` */
  smart_contractCollection?: Maybe<SmartContractConnection>;
  /** A pagable collection of type `whitelist_transaction` */
  whitelist_transactionCollection?: Maybe<WhitelistTransactionConnection>;
};

/** The root type for querying data */
export type QueryAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
};

/** The root type for querying data */
export type QueryCryptoAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<CryptoAddressOrderBy>>;
};

/** The root type for querying data */
export type QueryDocumentCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};

/** The root type for querying data */
export type QueryDocumentSignatoryCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentSignatoryOrderBy>>;
};

/** The root type for querying data */
export type QueryEmailAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<EmailAddressOrderBy>>;
};

/** The root type for querying data */
export type QueryImageCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ImageFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ImageOrderBy>>;
};

/** The root type for querying data */
export type QueryInvestorApplicationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<InvestorApplicationOrderBy>>;
};

/** The root type for querying data */
export type QueryIsOrganizationAdminArgs = {
  p_organization_id: Scalars["UUID"]["input"];
  p_user_id: Scalars["UUID"]["input"];
};

/** The root type for querying data */
export type QueryIsOrganizationMemberArgs = {
  p_organization_id: Scalars["UUID"]["input"];
  p_user_id: Scalars["UUID"]["input"];
};

/** The root type for querying data */
export type QueryJurisdictionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<JurisdictionFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<JurisdictionOrderBy>>;
};

/** The root type for querying data */
export type QueryLegalEntityCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LegalEntityOrderBy>>;
};

/** The root type for querying data */
export type QueryLegalEntityRelationshipCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LegalEntityRelationshipFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LegalEntityRelationshipOrderBy>>;
};

/** The root type for querying data */
export type QueryLinkedAccountCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LinkedAccountOrderBy>>;
};

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars["ID"]["input"];
};

/** The root type for querying data */
export type QueryNotificationConfigurationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<NotificationConfigurationOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingDescriptionTextCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingDescriptionTextOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingDetailCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingDetailFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingDetailOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingDistributionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingDistributionFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingDistributionOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingParticipantCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingParticipantOrderBy>>;
};

/** The root type for querying data */
export type QueryOfferingSmartContractSetCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingSmartContractSetOrderBy>>;
};

/** The root type for querying data */
export type QueryOrganizationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
};

/** The root type for querying data */
export type QueryOrganizationHasNoMembersArgs = {
  p_organization_id: Scalars["UUID"]["input"];
};

/** The root type for querying data */
export type QueryOrganizationUserCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrganizationUserOrderBy>>;
};

/** The root type for querying data */
export type QueryProfileCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ProfileFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ProfileOrderBy>>;
};

/** The root type for querying data */
export type QueryRealEstatePropertyCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyOrderBy>>;
};

/** The root type for querying data */
export type QueryRealEstatePropertyImageCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyImageFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyImageOrderBy>>;
};

/** The root type for querying data */
export type QueryShareOrderCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ShareOrderFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ShareOrderOrderBy>>;
};

/** The root type for querying data */
export type QueryShareTransferEventCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ShareTransferEventFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ShareTransferEventOrderBy>>;
};

/** The root type for querying data */
export type QuerySmartContractCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<SmartContractOrderBy>>;
};

/** The root type for querying data */
export type QueryWhitelistTransactionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<WhitelistTransactionOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  iregex?: InputMaybe<Scalars["String"]["input"]>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars["String"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["String"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["String"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars["Time"]["input"]>;
  gt?: InputMaybe<Scalars["Time"]["input"]>;
  gte?: InputMaybe<Scalars["Time"]["input"]>;
  in?: InputMaybe<Array<Scalars["Time"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Time"]["input"]>;
  lte?: InputMaybe<Scalars["Time"]["input"]>;
  neq?: InputMaybe<Scalars["Time"]["input"]>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars["Time"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["Time"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["Time"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["Time"]["input"]>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars["UUID"]["input"]>;
  in?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars["UUID"]["input"]>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  contains?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  eq?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
};

export type Address = Node & {
  __typename?: "address";
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  lat?: Maybe<Scalars["BigFloat"]["output"]>;
  legal_entity?: Maybe<LegalEntity>;
  legal_entity_id: Scalars["UUID"]["output"];
  line1?: Maybe<Scalars["String"]["output"]>;
  line2?: Maybe<Scalars["String"]["output"]>;
  line3?: Maybe<Scalars["String"]["output"]>;
  lng?: Maybe<Scalars["BigFloat"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  postal_code?: Maybe<Scalars["String"]["output"]>;
  real_estate_propertyCollection?: Maybe<RealEstatePropertyConnection>;
  state_province?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type AddressRealEstatePropertyCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyOrderBy>>;
};

export type AddressConnection = {
  __typename?: "addressConnection";
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
};

export type AddressDeleteResponse = {
  __typename?: "addressDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Address>;
};

export type AddressEdge = {
  __typename?: "addressEdge";
  cursor: Scalars["String"]["output"];
  node: Address;
};

export type AddressFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<AddressFilter>>;
  city?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  label?: InputMaybe<StringFilter>;
  lat?: InputMaybe<BigFloatFilter>;
  legal_entity_id?: InputMaybe<UuidFilter>;
  line1?: InputMaybe<StringFilter>;
  line2?: InputMaybe<StringFilter>;
  line3?: InputMaybe<StringFilter>;
  lng?: InputMaybe<BigFloatFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<AddressFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<AddressFilter>>;
  postal_code?: InputMaybe<StringFilter>;
  state_province?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type AddressInsertInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  lat?: InputMaybe<Scalars["BigFloat"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  line1?: InputMaybe<Scalars["String"]["input"]>;
  line2?: InputMaybe<Scalars["String"]["input"]>;
  line3?: InputMaybe<Scalars["String"]["input"]>;
  lng?: InputMaybe<Scalars["BigFloat"]["input"]>;
  postal_code?: InputMaybe<Scalars["String"]["input"]>;
  state_province?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type AddressInsertResponse = {
  __typename?: "addressInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Address>;
};

export type AddressOrderBy = {
  city?: InputMaybe<OrderByDirection>;
  country?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  label?: InputMaybe<OrderByDirection>;
  lat?: InputMaybe<OrderByDirection>;
  legal_entity_id?: InputMaybe<OrderByDirection>;
  line1?: InputMaybe<OrderByDirection>;
  line2?: InputMaybe<OrderByDirection>;
  line3?: InputMaybe<OrderByDirection>;
  lng?: InputMaybe<OrderByDirection>;
  postal_code?: InputMaybe<OrderByDirection>;
  state_province?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type AddressUpdateInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  lat?: InputMaybe<Scalars["BigFloat"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  line1?: InputMaybe<Scalars["String"]["input"]>;
  line2?: InputMaybe<Scalars["String"]["input"]>;
  line3?: InputMaybe<Scalars["String"]["input"]>;
  lng?: InputMaybe<Scalars["BigFloat"]["input"]>;
  postal_code?: InputMaybe<Scalars["String"]["input"]>;
  state_province?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type AddressUpdateResponse = {
  __typename?: "addressUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Address>;
};

export enum AssetStatus {
  Closed = "CLOSED",
  DueDiligence = "DUE_DILIGENCE",
  ForSale = "FOR_SALE",
  Identified = "IDENTIFIED",
  InNegotiation = "IN_NEGOTIATION",
  UnderContract = "UNDER_CONTRACT"
}

/** Boolean expression comparing fields on type "asset_status" */
export type AssetStatusFilter = {
  eq?: InputMaybe<AssetStatus>;
  in?: InputMaybe<Array<AssetStatus>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<AssetStatus>;
};

export type CryptoAddress = Node & {
  __typename?: "crypto_address";
  address: Scalars["String"]["output"];
  chain_id?: Maybe<Scalars["Int"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  is_public?: Maybe<Scalars["Boolean"]["output"]>;
  legal_entity?: Maybe<LegalEntity>;
  legal_entity_id: Scalars["UUID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  protocol?: Maybe<CryptoAddressProtocol>;
  smart_contractCollection?: Maybe<SmartContractConnection>;
  type?: Maybe<CryptoAddressType>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type CryptoAddressSmartContractCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<SmartContractOrderBy>>;
};

export type CryptoAddressConnection = {
  __typename?: "crypto_addressConnection";
  edges: Array<CryptoAddressEdge>;
  pageInfo: PageInfo;
};

export type CryptoAddressDeleteResponse = {
  __typename?: "crypto_addressDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<CryptoAddress>;
};

export type CryptoAddressEdge = {
  __typename?: "crypto_addressEdge";
  cursor: Scalars["String"]["output"];
  node: CryptoAddress;
};

export type CryptoAddressFilter = {
  address?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<CryptoAddressFilter>>;
  chain_id?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  is_public?: InputMaybe<BooleanFilter>;
  legal_entity_id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<CryptoAddressFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<CryptoAddressFilter>>;
  protocol?: InputMaybe<CryptoAddressProtocolFilter>;
  type?: InputMaybe<CryptoAddressTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type CryptoAddressInsertInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  chain_id?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  protocol?: InputMaybe<CryptoAddressProtocol>;
  type?: InputMaybe<CryptoAddressType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type CryptoAddressInsertResponse = {
  __typename?: "crypto_addressInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<CryptoAddress>;
};

export type CryptoAddressOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  chain_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_public?: InputMaybe<OrderByDirection>;
  legal_entity_id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  protocol?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type CryptoAddressUpdateInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  chain_id?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  protocol?: InputMaybe<CryptoAddressProtocol>;
  type?: InputMaybe<CryptoAddressType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type CryptoAddressUpdateResponse = {
  __typename?: "crypto_addressUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<CryptoAddress>;
};

export enum CryptoAddressProtocol {
  Ada = "ADA",
  Algo = "ALGO",
  Btc = "BTC",
  Eth = "ETH"
}

/** Boolean expression comparing fields on type "crypto_address_protocol" */
export type CryptoAddressProtocolFilter = {
  eq?: InputMaybe<CryptoAddressProtocol>;
  in?: InputMaybe<Array<CryptoAddressProtocol>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<CryptoAddressProtocol>;
};

export enum CryptoAddressType {
  Contract = "CONTRACT",
  Wallet = "WALLET"
}

/** Boolean expression comparing fields on type "crypto_address_type" */
export type CryptoAddressTypeFilter = {
  eq?: InputMaybe<CryptoAddressType>;
  in?: InputMaybe<Array<CryptoAddressType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<CryptoAddressType>;
};

export enum CurrencyCode {
  Ada = "ADA",
  AlgoUsdc = "ALGO_USDC",
  AlgoUsdcTest = "ALGO_USDC_TEST_",
  Aud = "AUD",
  Btc = "BTC",
  Cad = "CAD",
  Cc = "CC",
  Dai = "DAI",
  DaiMaticTest = "DAI_MATIC_TEST_",
  DaiTest = "DAI_TEST_",
  Eth = "ETH",
  Eur = "EUR",
  Gbp = "GBP",
  Kyd = "KYD",
  Matic = "MATIC",
  PoSDai = "PoS_DAI",
  PoSUsdc = "PoS_USDC",
  RealShare = "REAL_SHARE",
  Usd = "USD",
  Usdc = "USDC",
  UsdcMaticTest = "USDC_MATIC_TEST_",
  UsdcTest = "USDC_TEST_"
}

/** Boolean expression comparing fields on type "currency_code" */
export type CurrencyCodeFilter = {
  eq?: InputMaybe<CurrencyCode>;
  in?: InputMaybe<Array<CurrencyCode>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<CurrencyCode>;
};

export enum DistributionPeriodType {
  Day = "DAY",
  Described = "DESCRIBED",
  Month = "MONTH",
  None = "NONE",
  Quarter = "QUARTER",
  Unspecified = "UNSPECIFIED",
  Week = "WEEK",
  Year = "YEAR"
}

/** Boolean expression comparing fields on type "distribution_period_type" */
export type DistributionPeriodTypeFilter = {
  eq?: InputMaybe<DistributionPeriodType>;
  in?: InputMaybe<Array<DistributionPeriodType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<DistributionPeriodType>;
};

export type Document = Node & {
  __typename?: "document";
  access?: Maybe<DocumentAccessType>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  date?: Maybe<Scalars["Datetime"]["output"]>;
  document_signatoryCollection?: Maybe<DocumentSignatoryConnection>;
  file_id?: Maybe<Scalars["String"]["output"]>;
  format?: Maybe<DocumentFormat>;
  id: Scalars["UUID"]["output"];
  image?: Maybe<Image>;
  investor_applicationCollection?: Maybe<InvestorApplicationConnection>;
  legal_entity?: Maybe<LegalEntity>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering_id?: Maybe<Scalars["UUID"]["output"]>;
  offering_unique_id: Scalars["String"]["output"];
  owner_id: Scalars["UUID"]["output"];
  smart_contractCollection?: Maybe<SmartContractConnection>;
  smart_contract_id?: Maybe<Scalars["UUID"]["output"]>;
  text?: Maybe<Scalars["String"]["output"]>;
  thumbnail_image_id?: Maybe<Scalars["UUID"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<DocumentType>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type DocumentDocumentSignatoryCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentSignatoryOrderBy>>;
};

export type DocumentInvestorApplicationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<InvestorApplicationOrderBy>>;
};

export type DocumentSmartContractCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<SmartContractOrderBy>>;
};

export type DocumentConnection = {
  __typename?: "documentConnection";
  edges: Array<DocumentEdge>;
  pageInfo: PageInfo;
};

export type DocumentDeleteResponse = {
  __typename?: "documentDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Document>;
};

export type DocumentEdge = {
  __typename?: "documentEdge";
  cursor: Scalars["String"]["output"];
  node: Document;
};

export type DocumentFilter = {
  access?: InputMaybe<DocumentAccessTypeFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<DocumentFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DatetimeFilter>;
  file_id?: InputMaybe<StringFilter>;
  format?: InputMaybe<DocumentFormatFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<DocumentFilter>;
  offering_id?: InputMaybe<UuidFilter>;
  offering_unique_id?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<DocumentFilter>>;
  owner_id?: InputMaybe<UuidFilter>;
  smart_contract_id?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
  thumbnail_image_id?: InputMaybe<UuidFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<DocumentTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type DocumentInsertInput = {
  access?: InputMaybe<DocumentAccessType>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  date?: InputMaybe<Scalars["Datetime"]["input"]>;
  file_id?: InputMaybe<Scalars["String"]["input"]>;
  format?: InputMaybe<DocumentFormat>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_unique_id?: InputMaybe<Scalars["String"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  smart_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail_image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<DocumentType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type DocumentInsertResponse = {
  __typename?: "documentInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Document>;
};

export type DocumentOrderBy = {
  access?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  file_id?: InputMaybe<OrderByDirection>;
  format?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  offering_id?: InputMaybe<OrderByDirection>;
  offering_unique_id?: InputMaybe<OrderByDirection>;
  owner_id?: InputMaybe<OrderByDirection>;
  smart_contract_id?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
  thumbnail_image_id?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type DocumentUpdateInput = {
  access?: InputMaybe<DocumentAccessType>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  date?: InputMaybe<Scalars["Datetime"]["input"]>;
  file_id?: InputMaybe<Scalars["String"]["input"]>;
  format?: InputMaybe<DocumentFormat>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_unique_id?: InputMaybe<Scalars["String"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  smart_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail_image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<DocumentType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type DocumentUpdateResponse = {
  __typename?: "documentUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Document>;
};

export enum DocumentAccessType {
  Owner = "OWNER",
  Public = "PUBLIC",
  Signatory = "SIGNATORY",
  Token = "TOKEN"
}

/** Boolean expression comparing fields on type "document_access_type" */
export type DocumentAccessTypeFilter = {
  eq?: InputMaybe<DocumentAccessType>;
  in?: InputMaybe<Array<DocumentAccessType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<DocumentAccessType>;
};

export enum DocumentFormat {
  Excel = "EXCEL",
  Github = "GITHUB",
  GoogleDoc = "GOOGLE_DOC",
  GoogleDrive = "GOOGLE_DRIVE",
  GoogleSheet = "GOOGLE_SHEET",
  GoogleSlide = "GOOGLE_SLIDE",
  Markdown = "MARKDOWN",
  Notion = "NOTION",
  Other = "OTHER",
  Pdf = "PDF",
  Powerpoint = "POWERPOINT",
  Video = "VIDEO",
  WordDoc = "WORD_DOC"
}

/** Boolean expression comparing fields on type "document_format" */
export type DocumentFormatFilter = {
  eq?: InputMaybe<DocumentFormat>;
  in?: InputMaybe<Array<DocumentFormat>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<DocumentFormat>;
};

export type DocumentSignatory = Node & {
  __typename?: "document_signatory";
  archived?: Maybe<Scalars["Boolean"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  date?: Maybe<Scalars["Datetime"]["output"]>;
  document?: Maybe<Document>;
  document_id: Scalars["UUID"]["output"];
  id: Scalars["UUID"]["output"];
  legal_entity?: Maybe<LegalEntity>;
  legal_entity_id?: Maybe<Scalars["UUID"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  signature?: Maybe<Scalars["String"]["output"]>;
  signer_address?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type DocumentSignatoryConnection = {
  __typename?: "document_signatoryConnection";
  edges: Array<DocumentSignatoryEdge>;
  pageInfo: PageInfo;
};

export type DocumentSignatoryDeleteResponse = {
  __typename?: "document_signatoryDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<DocumentSignatory>;
};

export type DocumentSignatoryEdge = {
  __typename?: "document_signatoryEdge";
  cursor: Scalars["String"]["output"];
  node: DocumentSignatory;
};

export type DocumentSignatoryFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<DocumentSignatoryFilter>>;
  archived?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DatetimeFilter>;
  document_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  legal_entity_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<DocumentSignatoryFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<DocumentSignatoryFilter>>;
  signature?: InputMaybe<StringFilter>;
  signer_address?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type DocumentSignatoryInsertInput = {
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  date?: InputMaybe<Scalars["Datetime"]["input"]>;
  document_id?: InputMaybe<Scalars["UUID"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  signature?: InputMaybe<Scalars["String"]["input"]>;
  signer_address?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type DocumentSignatoryInsertResponse = {
  __typename?: "document_signatoryInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<DocumentSignatory>;
};

export type DocumentSignatoryOrderBy = {
  archived?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  document_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  legal_entity_id?: InputMaybe<OrderByDirection>;
  signature?: InputMaybe<OrderByDirection>;
  signer_address?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type DocumentSignatoryUpdateInput = {
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  date?: InputMaybe<Scalars["Datetime"]["input"]>;
  document_id?: InputMaybe<Scalars["UUID"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  legal_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  signature?: InputMaybe<Scalars["String"]["input"]>;
  signer_address?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type DocumentSignatoryUpdateResponse = {
  __typename?: "document_signatoryUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<DocumentSignatory>;
};

export enum DocumentType {
  Agreement = "AGREEMENT",
  Disclosure = "DISCLOSURE",
  FinancialStatement = "FINANCIAL_STATEMENT",
  General = "GENERAL",
  OfferingDocument = "OFFERING_DOCUMENT",
  OperatingAgreement = "OPERATING_AGREEMENT",
  Other = "OTHER",
  Ppm = "PPM",
  RegFiling = "REG_FILING",
  ShareLink = "SHARE_LINK"
}

/** Boolean expression comparing fields on type "document_type" */
export type DocumentTypeFilter = {
  eq?: InputMaybe<DocumentType>;
  in?: InputMaybe<Array<DocumentType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<DocumentType>;
};

export type EmailAddress = Node & {
  __typename?: "email_address";
  address: Scalars["String"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  is_public?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  organization?: Maybe<Organization>;
  organization_id: Scalars["UUID"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type EmailAddressConnection = {
  __typename?: "email_addressConnection";
  edges: Array<EmailAddressEdge>;
  pageInfo: PageInfo;
};

export type EmailAddressDeleteResponse = {
  __typename?: "email_addressDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<EmailAddress>;
};

export type EmailAddressEdge = {
  __typename?: "email_addressEdge";
  cursor: Scalars["String"]["output"];
  node: EmailAddress;
};

export type EmailAddressFilter = {
  address?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<EmailAddressFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  is_public?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<EmailAddressFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<EmailAddressFilter>>;
  organization_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type EmailAddressInsertInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type EmailAddressInsertResponse = {
  __typename?: "email_addressInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<EmailAddress>;
};

export type EmailAddressOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_public?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  organization_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type EmailAddressUpdateInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type EmailAddressUpdateResponse = {
  __typename?: "email_addressUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<EmailAddress>;
};

export type Image = Node & {
  __typename?: "image";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  documentCollection?: Maybe<DocumentConnection>;
  file_id?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offeringCollection?: Maybe<OfferingConnection>;
  real_estate_property_imageCollection?: Maybe<RealEstatePropertyImageConnection>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  url: Scalars["String"]["output"];
};

export type ImageDocumentCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};

export type ImageOfferingCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingOrderBy>>;
};

export type ImageRealEstatePropertyImageCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyImageFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyImageOrderBy>>;
};

export type ImageConnection = {
  __typename?: "imageConnection";
  edges: Array<ImageEdge>;
  pageInfo: PageInfo;
};

export type ImageDeleteResponse = {
  __typename?: "imageDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Image>;
};

export type ImageEdge = {
  __typename?: "imageEdge";
  cursor: Scalars["String"]["output"];
  node: Image;
};

export type ImageFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ImageFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  file_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  label?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ImageFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ImageFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type ImageInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  file_id?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type ImageInsertResponse = {
  __typename?: "imageInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Image>;
};

export type ImageOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  file_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  label?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type ImageUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  file_id?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type ImageUpdateResponse = {
  __typename?: "imageUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Image>;
};

export type InvestorApplication = Node & {
  __typename?: "investor_application";
  application_doc_id: Scalars["UUID"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  document?: Maybe<Document>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering_participant?: Maybe<OfferingParticipant>;
  offering_participant_id: Scalars["UUID"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type InvestorApplicationConnection = {
  __typename?: "investor_applicationConnection";
  edges: Array<InvestorApplicationEdge>;
  pageInfo: PageInfo;
};

export type InvestorApplicationDeleteResponse = {
  __typename?: "investor_applicationDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<InvestorApplication>;
};

export type InvestorApplicationEdge = {
  __typename?: "investor_applicationEdge";
  cursor: Scalars["String"]["output"];
  node: InvestorApplication;
};

export type InvestorApplicationFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<InvestorApplicationFilter>>;
  application_doc_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<InvestorApplicationFilter>;
  offering_participant_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<InvestorApplicationFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type InvestorApplicationInsertInput = {
  application_doc_id?: InputMaybe<Scalars["UUID"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_participant_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type InvestorApplicationInsertResponse = {
  __typename?: "investor_applicationInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<InvestorApplication>;
};

export type InvestorApplicationOrderBy = {
  application_doc_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  offering_participant_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type InvestorApplicationUpdateInput = {
  application_doc_id?: InputMaybe<Scalars["UUID"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_participant_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type InvestorApplicationUpdateResponse = {
  __typename?: "investor_applicationUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<InvestorApplication>;
};

export type Jurisdiction = Node & {
  __typename?: "jurisdiction";
  country: Scalars["String"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  legal_entityCollection?: Maybe<LegalEntityConnection>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering_participantCollection?: Maybe<OfferingParticipantConnection>;
  province?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type JurisdictionLegalEntityCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LegalEntityOrderBy>>;
};

export type JurisdictionOfferingParticipantCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingParticipantOrderBy>>;
};

export type JurisdictionConnection = {
  __typename?: "jurisdictionConnection";
  edges: Array<JurisdictionEdge>;
  pageInfo: PageInfo;
};

export type JurisdictionDeleteResponse = {
  __typename?: "jurisdictionDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Jurisdiction>;
};

export type JurisdictionEdge = {
  __typename?: "jurisdictionEdge";
  cursor: Scalars["String"]["output"];
  node: Jurisdiction;
};

export type JurisdictionFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<JurisdictionFilter>>;
  country?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<JurisdictionFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<JurisdictionFilter>>;
  province?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type JurisdictionInsertInput = {
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  province?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type JurisdictionInsertResponse = {
  __typename?: "jurisdictionInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Jurisdiction>;
};

export type JurisdictionOrderBy = {
  country?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  province?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type JurisdictionUpdateInput = {
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  province?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type JurisdictionUpdateResponse = {
  __typename?: "jurisdictionUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Jurisdiction>;
};

export type LegalEntity = Node & {
  __typename?: "legal_entity";
  addressCollection?: Maybe<AddressConnection>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  crypto_addressCollection?: Maybe<CryptoAddressConnection>;
  display_name?: Maybe<Scalars["String"]["output"]>;
  documentCollection?: Maybe<DocumentConnection>;
  document_signatoryCollection?: Maybe<DocumentSignatoryConnection>;
  id: Scalars["UUID"]["output"];
  jurisdiction?: Maybe<Jurisdiction>;
  jurisdiction_id?: Maybe<Scalars["UUID"]["output"]>;
  legal_entity_relationshipCollection?: Maybe<LegalEntityRelationshipConnection>;
  legal_name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offeringCollection?: Maybe<OfferingConnection>;
  operating_currency?: Maybe<CurrencyCode>;
  organization?: Maybe<Organization>;
  organization_id: Scalars["UUID"]["output"];
  purpose?: Maybe<Scalars["String"]["output"]>;
  real_estate_propertyCollection?: Maybe<RealEstatePropertyConnection>;
  smart_contractCollection?: Maybe<SmartContractConnection>;
  tax_id?: Maybe<Scalars["String"]["output"]>;
  type: LegalEntityType;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type LegalEntityAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<AddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
};

export type LegalEntityCryptoAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<CryptoAddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<CryptoAddressOrderBy>>;
};

export type LegalEntityDocumentCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentOrderBy>>;
};

export type LegalEntityDocumentSignatoryCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<DocumentSignatoryFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<DocumentSignatoryOrderBy>>;
};

export type LegalEntityLegalEntityRelationshipCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LegalEntityRelationshipFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LegalEntityRelationshipOrderBy>>;
};

export type LegalEntityOfferingCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingOrderBy>>;
};

export type LegalEntityRealEstatePropertyCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyOrderBy>>;
};

export type LegalEntitySmartContractCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<SmartContractFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<SmartContractOrderBy>>;
};

export type LegalEntityConnection = {
  __typename?: "legal_entityConnection";
  edges: Array<LegalEntityEdge>;
  pageInfo: PageInfo;
};

export type LegalEntityDeleteResponse = {
  __typename?: "legal_entityDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntity>;
};

export type LegalEntityEdge = {
  __typename?: "legal_entityEdge";
  cursor: Scalars["String"]["output"];
  node: LegalEntity;
};

export type LegalEntityFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LegalEntityFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  display_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  jurisdiction_id?: InputMaybe<UuidFilter>;
  legal_name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<LegalEntityFilter>;
  operating_currency?: InputMaybe<CurrencyCodeFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LegalEntityFilter>>;
  organization_id?: InputMaybe<UuidFilter>;
  purpose?: InputMaybe<StringFilter>;
  tax_id?: InputMaybe<StringFilter>;
  type?: InputMaybe<LegalEntityTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type LegalEntityInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  jurisdiction_id?: InputMaybe<Scalars["UUID"]["input"]>;
  legal_name?: InputMaybe<Scalars["String"]["input"]>;
  operating_currency?: InputMaybe<CurrencyCode>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  purpose?: InputMaybe<Scalars["String"]["input"]>;
  tax_id?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<LegalEntityType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type LegalEntityInsertResponse = {
  __typename?: "legal_entityInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntity>;
};

export type LegalEntityOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  display_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  jurisdiction_id?: InputMaybe<OrderByDirection>;
  legal_name?: InputMaybe<OrderByDirection>;
  operating_currency?: InputMaybe<OrderByDirection>;
  organization_id?: InputMaybe<OrderByDirection>;
  purpose?: InputMaybe<OrderByDirection>;
  tax_id?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type LegalEntityUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  jurisdiction_id?: InputMaybe<Scalars["UUID"]["input"]>;
  legal_name?: InputMaybe<Scalars["String"]["input"]>;
  operating_currency?: InputMaybe<CurrencyCode>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  purpose?: InputMaybe<Scalars["String"]["input"]>;
  tax_id?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<LegalEntityType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type LegalEntityUpdateResponse = {
  __typename?: "legal_entityUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntity>;
};

export type LegalEntityRelationship = Node & {
  __typename?: "legal_entity_relationship";
  child_entity_id: Scalars["UUID"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  legal_entity?: Maybe<LegalEntity>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  parent_entity_id: Scalars["UUID"]["output"];
  relationship_type: Scalars["String"]["output"];
};

export type LegalEntityRelationshipConnection = {
  __typename?: "legal_entity_relationshipConnection";
  edges: Array<LegalEntityRelationshipEdge>;
  pageInfo: PageInfo;
};

export type LegalEntityRelationshipDeleteResponse = {
  __typename?: "legal_entity_relationshipDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntityRelationship>;
};

export type LegalEntityRelationshipEdge = {
  __typename?: "legal_entity_relationshipEdge";
  cursor: Scalars["String"]["output"];
  node: LegalEntityRelationship;
};

export type LegalEntityRelationshipFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LegalEntityRelationshipFilter>>;
  child_entity_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<LegalEntityRelationshipFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LegalEntityRelationshipFilter>>;
  parent_entity_id?: InputMaybe<UuidFilter>;
  relationship_type?: InputMaybe<StringFilter>;
};

export type LegalEntityRelationshipInsertInput = {
  child_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  parent_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  relationship_type?: InputMaybe<Scalars["String"]["input"]>;
};

export type LegalEntityRelationshipInsertResponse = {
  __typename?: "legal_entity_relationshipInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntityRelationship>;
};

export type LegalEntityRelationshipOrderBy = {
  child_entity_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  parent_entity_id?: InputMaybe<OrderByDirection>;
  relationship_type?: InputMaybe<OrderByDirection>;
};

export type LegalEntityRelationshipUpdateInput = {
  child_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  parent_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  relationship_type?: InputMaybe<Scalars["String"]["input"]>;
};

export type LegalEntityRelationshipUpdateResponse = {
  __typename?: "legal_entity_relationshipUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LegalEntityRelationship>;
};

export enum LegalEntityType {
  Corporation = "CORPORATION",
  Individual = "INDIVIDUAL",
  Llc = "LLC",
  UnincorporatedAssociation = "UNINCORPORATED_ASSOCIATION"
}

/** Boolean expression comparing fields on type "legal_entity_type" */
export type LegalEntityTypeFilter = {
  eq?: InputMaybe<LegalEntityType>;
  in?: InputMaybe<Array<LegalEntityType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<LegalEntityType>;
};

export type LinkedAccount = Node & {
  __typename?: "linked_account";
  account_provided_id?: Maybe<Scalars["String"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  hidden?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  organization?: Maybe<Organization>;
  organization_id: Scalars["UUID"]["output"];
  type?: Maybe<LinkedAccountType>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  url: Scalars["String"]["output"];
  username?: Maybe<Scalars["String"]["output"]>;
  verified?: Maybe<Scalars["Boolean"]["output"]>;
};

export type LinkedAccountConnection = {
  __typename?: "linked_accountConnection";
  edges: Array<LinkedAccountEdge>;
  pageInfo: PageInfo;
};

export type LinkedAccountDeleteResponse = {
  __typename?: "linked_accountDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LinkedAccount>;
};

export type LinkedAccountEdge = {
  __typename?: "linked_accountEdge";
  cursor: Scalars["String"]["output"];
  node: LinkedAccount;
};

export type LinkedAccountFilter = {
  account_provided_id?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LinkedAccountFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  hidden?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<LinkedAccountFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LinkedAccountFilter>>;
  organization_id?: InputMaybe<UuidFilter>;
  type?: InputMaybe<LinkedAccountTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
  username?: InputMaybe<StringFilter>;
  verified?: InputMaybe<BooleanFilter>;
};

export type LinkedAccountInsertInput = {
  account_provided_id?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  hidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  type?: InputMaybe<LinkedAccountType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  verified?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type LinkedAccountInsertResponse = {
  __typename?: "linked_accountInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LinkedAccount>;
};

export type LinkedAccountOrderBy = {
  account_provided_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  hidden?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  organization_id?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  verified?: InputMaybe<OrderByDirection>;
};

export type LinkedAccountUpdateInput = {
  account_provided_id?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  hidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  type?: InputMaybe<LinkedAccountType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  verified?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type LinkedAccountUpdateResponse = {
  __typename?: "linked_accountUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<LinkedAccount>;
};

export enum LinkedAccountType {
  Discord = "DISCORD",
  Dribbble = "DRIBBBLE",
  Email = "EMAIL",
  Facebook = "FACEBOOK",
  Github = "GITHUB",
  Instagram = "INSTAGRAM",
  Linkedin = "LINKEDIN",
  Medium = "MEDIUM",
  Mirror = "MIRROR",
  Other = "OTHER",
  Phone = "PHONE",
  Soundcloud = "SOUNDCLOUD",
  Substack = "SUBSTACK",
  Telegram = "TELEGRAM",
  Twitter = "TWITTER",
  Website = "WEBSITE",
  Youtube = "YOUTUBE"
}

/** Boolean expression comparing fields on type "linked_account_type" */
export type LinkedAccountTypeFilter = {
  eq?: InputMaybe<LinkedAccountType>;
  in?: InputMaybe<Array<LinkedAccountType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<LinkedAccountType>;
};

export type NotificationConfiguration = Node & {
  __typename?: "notification_configuration";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  notification_method: NotificationMethod;
  notification_recipient_type: NotificationRecipientType;
  notification_subject: NotificationSubject;
  organization_user?: Maybe<OrganizationUser>;
  organization_user_id: Scalars["UUID"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type NotificationConfigurationConnection = {
  __typename?: "notification_configurationConnection";
  edges: Array<NotificationConfigurationEdge>;
  pageInfo: PageInfo;
};

export type NotificationConfigurationDeleteResponse = {
  __typename?: "notification_configurationDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<NotificationConfiguration>;
};

export type NotificationConfigurationEdge = {
  __typename?: "notification_configurationEdge";
  cursor: Scalars["String"]["output"];
  node: NotificationConfiguration;
};

export type NotificationConfigurationFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotificationConfigurationFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotificationConfigurationFilter>;
  notification_method?: InputMaybe<NotificationMethodFilter>;
  notification_recipient_type?: InputMaybe<NotificationRecipientTypeFilter>;
  notification_subject?: InputMaybe<NotificationSubjectFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotificationConfigurationFilter>>;
  organization_user_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type NotificationConfigurationInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  notification_method?: InputMaybe<NotificationMethod>;
  notification_recipient_type?: InputMaybe<NotificationRecipientType>;
  notification_subject?: InputMaybe<NotificationSubject>;
  organization_user_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type NotificationConfigurationInsertResponse = {
  __typename?: "notification_configurationInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<NotificationConfiguration>;
};

export type NotificationConfigurationOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  notification_method?: InputMaybe<OrderByDirection>;
  notification_recipient_type?: InputMaybe<OrderByDirection>;
  notification_subject?: InputMaybe<OrderByDirection>;
  organization_user_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type NotificationConfigurationUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  notification_method?: InputMaybe<NotificationMethod>;
  notification_recipient_type?: InputMaybe<NotificationRecipientType>;
  notification_subject?: InputMaybe<NotificationSubject>;
  organization_user_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type NotificationConfigurationUpdateResponse = {
  __typename?: "notification_configurationUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<NotificationConfiguration>;
};

export enum NotificationMethod {
  Email = "EMAIL"
}

/** Boolean expression comparing fields on type "notification_method" */
export type NotificationMethodFilter = {
  eq?: InputMaybe<NotificationMethod>;
  in?: InputMaybe<Array<NotificationMethod>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<NotificationMethod>;
};

export enum NotificationRecipientType {
  Manager = "MANAGER",
  Participant = "PARTICIPANT"
}

/** Boolean expression comparing fields on type "notification_recipient_type" */
export type NotificationRecipientTypeFilter = {
  eq?: InputMaybe<NotificationRecipientType>;
  in?: InputMaybe<Array<NotificationRecipientType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<NotificationRecipientType>;
};

export enum NotificationSubject {
  NewOrderLive = "NEW_ORDER_LIVE",
  OfferingDistribution = "OFFERING_DISTRIBUTION",
  ProceedsClaim = "PROCEEDS_CLAIM",
  TradeExecution = "TRADE_EXECUTION",
  TransactionRequest = "TRANSACTION_REQUEST",
  WhitelistApproval = "WHITELIST_APPROVAL"
}

/** Boolean expression comparing fields on type "notification_subject" */
export type NotificationSubjectFilter = {
  eq?: InputMaybe<NotificationSubject>;
  in?: InputMaybe<Array<NotificationSubject>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<NotificationSubject>;
};

export type Offering = Node & {
  __typename?: "offering";
  access_code?: Maybe<Scalars["String"]["output"]>;
  banner_image?: Maybe<Scalars["String"]["output"]>;
  brand_color?: Maybe<Scalars["String"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  image?: Maybe<Image>;
  is_public?: Maybe<Scalars["Boolean"]["output"]>;
  legal_entity?: Maybe<LegalEntity>;
  light_brand?: Maybe<Scalars["Boolean"]["output"]>;
  name: Scalars["String"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering_description_textCollection?: Maybe<OfferingDescriptionTextConnection>;
  offering_detailCollection?: Maybe<OfferingDetailConnection>;
  offering_entity_id: Scalars["UUID"]["output"];
  offering_participantCollection?: Maybe<OfferingParticipantConnection>;
  offering_smart_contract_setCollection?: Maybe<OfferingSmartContractSetConnection>;
  primary_video?: Maybe<Scalars["String"]["output"]>;
  sharing_image_id?: Maybe<Scalars["UUID"]["output"]>;
  short_description?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  waitlist_on?: Maybe<Scalars["Boolean"]["output"]>;
  website?: Maybe<Scalars["String"]["output"]>;
};

export type OfferingOfferingDescriptionTextCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingDescriptionTextFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingDescriptionTextOrderBy>>;
};

export type OfferingOfferingDetailCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingDetailFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingDetailOrderBy>>;
};

export type OfferingOfferingParticipantCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingParticipantFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingParticipantOrderBy>>;
};

export type OfferingOfferingSmartContractSetCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingSmartContractSetOrderBy>>;
};

export type OfferingConnection = {
  __typename?: "offeringConnection";
  edges: Array<OfferingEdge>;
  pageInfo: PageInfo;
};

export type OfferingDeleteResponse = {
  __typename?: "offeringDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Offering>;
};

export type OfferingEdge = {
  __typename?: "offeringEdge";
  cursor: Scalars["String"]["output"];
  node: Offering;
};

export type OfferingFilter = {
  access_code?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingFilter>>;
  banner_image?: InputMaybe<StringFilter>;
  brand_color?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringFilter>;
  is_public?: InputMaybe<BooleanFilter>;
  light_brand?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingFilter>;
  offering_entity_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingFilter>>;
  primary_video?: InputMaybe<StringFilter>;
  sharing_image_id?: InputMaybe<UuidFilter>;
  short_description?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  waitlist_on?: InputMaybe<BooleanFilter>;
  website?: InputMaybe<StringFilter>;
};

export type OfferingInsertInput = {
  access_code?: InputMaybe<Scalars["String"]["input"]>;
  banner_image?: InputMaybe<Scalars["String"]["input"]>;
  brand_color?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  light_brand?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  offering_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  primary_video?: InputMaybe<Scalars["String"]["input"]>;
  sharing_image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  short_description?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  waitlist_on?: InputMaybe<Scalars["Boolean"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type OfferingInsertResponse = {
  __typename?: "offeringInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Offering>;
};

export type OfferingOrderBy = {
  access_code?: InputMaybe<OrderByDirection>;
  banner_image?: InputMaybe<OrderByDirection>;
  brand_color?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image?: InputMaybe<OrderByDirection>;
  is_public?: InputMaybe<OrderByDirection>;
  light_brand?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  offering_entity_id?: InputMaybe<OrderByDirection>;
  primary_video?: InputMaybe<OrderByDirection>;
  sharing_image_id?: InputMaybe<OrderByDirection>;
  short_description?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  waitlist_on?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type OfferingUpdateInput = {
  access_code?: InputMaybe<Scalars["String"]["input"]>;
  banner_image?: InputMaybe<Scalars["String"]["input"]>;
  brand_color?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  light_brand?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  offering_entity_id?: InputMaybe<Scalars["UUID"]["input"]>;
  primary_video?: InputMaybe<Scalars["String"]["input"]>;
  sharing_image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  short_description?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  waitlist_on?: InputMaybe<Scalars["Boolean"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type OfferingUpdateResponse = {
  __typename?: "offeringUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Offering>;
};

export type OfferingDescriptionText = Node & {
  __typename?: "offering_description_text";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering?: Maybe<Offering>;
  offering_id: Scalars["UUID"]["output"];
  order: Scalars["Int"]["output"];
  section: OfferingTabSection;
  text: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type OfferingDescriptionTextConnection = {
  __typename?: "offering_description_textConnection";
  edges: Array<OfferingDescriptionTextEdge>;
  pageInfo: PageInfo;
};

export type OfferingDescriptionTextDeleteResponse = {
  __typename?: "offering_description_textDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDescriptionText>;
};

export type OfferingDescriptionTextEdge = {
  __typename?: "offering_description_textEdge";
  cursor: Scalars["String"]["output"];
  node: OfferingDescriptionText;
};

export type OfferingDescriptionTextFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingDescriptionTextFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingDescriptionTextFilter>;
  offering_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingDescriptionTextFilter>>;
  order?: InputMaybe<IntFilter>;
  section?: InputMaybe<OfferingTabSectionFilter>;
  text?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type OfferingDescriptionTextInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  section?: InputMaybe<OfferingTabSection>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDescriptionTextInsertResponse = {
  __typename?: "offering_description_textInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDescriptionText>;
};

export type OfferingDescriptionTextOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  offering_id?: InputMaybe<OrderByDirection>;
  order?: InputMaybe<OrderByDirection>;
  section?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type OfferingDescriptionTextUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  section?: InputMaybe<OfferingTabSection>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDescriptionTextUpdateResponse = {
  __typename?: "offering_description_textUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDescriptionText>;
};

export type OfferingDetail = Node & {
  __typename?: "offering_detail";
  additional_info?: Maybe<Scalars["String"]["output"]>;
  admin_expense?: Maybe<Scalars["Int"]["output"]>;
  cap_rate?: Maybe<Scalars["Int"]["output"]>;
  coc_return?: Maybe<Scalars["Int"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  custom_onboarding_link?: Maybe<Scalars["String"]["output"]>;
  distribution_currency?: Maybe<CurrencyCode>;
  distribution_description?: Maybe<Scalars["String"]["output"]>;
  distribution_frequency?: Maybe<Scalars["Int"]["output"]>;
  distribution_period?: Maybe<DistributionPeriodType>;
  id: Scalars["UUID"]["output"];
  investment_currency: CurrencyCode;
  max_investors?: Maybe<Scalars["Int"]["output"]>;
  max_raise?: Maybe<Scalars["BigInt"]["output"]>;
  max_units_per_investor?: Maybe<Scalars["Int"]["output"]>;
  min_investors?: Maybe<Scalars["Int"]["output"]>;
  min_raise?: Maybe<Scalars["BigInt"]["output"]>;
  min_units_per_investor?: Maybe<Scalars["Int"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  num_units?: Maybe<Scalars["Int"]["output"]>;
  offering?: Maybe<Offering>;
  offering_id: Scalars["UUID"]["output"];
  preferred_return?: Maybe<Scalars["Int"]["output"]>;
  price_start?: Maybe<Scalars["Int"]["output"]>;
  projected_appreciation?: Maybe<Scalars["Int"]["output"]>;
  projected_irr?: Maybe<Scalars["Int"]["output"]>;
  projected_irr_max?: Maybe<Scalars["Int"]["output"]>;
  raise_period?: Maybe<Scalars["Int"]["output"]>;
  raise_start?: Maybe<Scalars["Datetime"]["output"]>;
  stage?: Maybe<OfferingStage>;
  target_equity_multiple?: Maybe<Scalars["Int"]["output"]>;
  target_equity_multiple_max?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<OfferingDetailsType>;
  unit_name?: Maybe<UnitName>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type OfferingDetailConnection = {
  __typename?: "offering_detailConnection";
  edges: Array<OfferingDetailEdge>;
  pageInfo: PageInfo;
};

export type OfferingDetailDeleteResponse = {
  __typename?: "offering_detailDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDetail>;
};

export type OfferingDetailEdge = {
  __typename?: "offering_detailEdge";
  cursor: Scalars["String"]["output"];
  node: OfferingDetail;
};

export type OfferingDetailFilter = {
  additional_info?: InputMaybe<StringFilter>;
  admin_expense?: InputMaybe<IntFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingDetailFilter>>;
  cap_rate?: InputMaybe<IntFilter>;
  coc_return?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  custom_onboarding_link?: InputMaybe<StringFilter>;
  distribution_currency?: InputMaybe<CurrencyCodeFilter>;
  distribution_description?: InputMaybe<StringFilter>;
  distribution_frequency?: InputMaybe<IntFilter>;
  distribution_period?: InputMaybe<DistributionPeriodTypeFilter>;
  id?: InputMaybe<UuidFilter>;
  investment_currency?: InputMaybe<CurrencyCodeFilter>;
  max_investors?: InputMaybe<IntFilter>;
  max_raise?: InputMaybe<BigIntFilter>;
  max_units_per_investor?: InputMaybe<IntFilter>;
  min_investors?: InputMaybe<IntFilter>;
  min_raise?: InputMaybe<BigIntFilter>;
  min_units_per_investor?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingDetailFilter>;
  num_units?: InputMaybe<IntFilter>;
  offering_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingDetailFilter>>;
  preferred_return?: InputMaybe<IntFilter>;
  price_start?: InputMaybe<IntFilter>;
  projected_appreciation?: InputMaybe<IntFilter>;
  projected_irr?: InputMaybe<IntFilter>;
  projected_irr_max?: InputMaybe<IntFilter>;
  raise_period?: InputMaybe<IntFilter>;
  raise_start?: InputMaybe<DatetimeFilter>;
  stage?: InputMaybe<OfferingStageFilter>;
  target_equity_multiple?: InputMaybe<IntFilter>;
  target_equity_multiple_max?: InputMaybe<IntFilter>;
  type?: InputMaybe<OfferingDetailsTypeFilter>;
  unit_name?: InputMaybe<UnitNameFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type OfferingDetailInsertInput = {
  additional_info?: InputMaybe<Scalars["String"]["input"]>;
  admin_expense?: InputMaybe<Scalars["Int"]["input"]>;
  cap_rate?: InputMaybe<Scalars["Int"]["input"]>;
  coc_return?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  custom_onboarding_link?: InputMaybe<Scalars["String"]["input"]>;
  distribution_currency?: InputMaybe<CurrencyCode>;
  distribution_description?: InputMaybe<Scalars["String"]["input"]>;
  distribution_frequency?: InputMaybe<Scalars["Int"]["input"]>;
  distribution_period?: InputMaybe<DistributionPeriodType>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  investment_currency?: InputMaybe<CurrencyCode>;
  max_investors?: InputMaybe<Scalars["Int"]["input"]>;
  max_raise?: InputMaybe<Scalars["BigInt"]["input"]>;
  max_units_per_investor?: InputMaybe<Scalars["Int"]["input"]>;
  min_investors?: InputMaybe<Scalars["Int"]["input"]>;
  min_raise?: InputMaybe<Scalars["BigInt"]["input"]>;
  min_units_per_investor?: InputMaybe<Scalars["Int"]["input"]>;
  num_units?: InputMaybe<Scalars["Int"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  preferred_return?: InputMaybe<Scalars["Int"]["input"]>;
  price_start?: InputMaybe<Scalars["Int"]["input"]>;
  projected_appreciation?: InputMaybe<Scalars["Int"]["input"]>;
  projected_irr?: InputMaybe<Scalars["Int"]["input"]>;
  projected_irr_max?: InputMaybe<Scalars["Int"]["input"]>;
  raise_period?: InputMaybe<Scalars["Int"]["input"]>;
  raise_start?: InputMaybe<Scalars["Datetime"]["input"]>;
  stage?: InputMaybe<OfferingStage>;
  target_equity_multiple?: InputMaybe<Scalars["Int"]["input"]>;
  target_equity_multiple_max?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<OfferingDetailsType>;
  unit_name?: InputMaybe<UnitName>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDetailInsertResponse = {
  __typename?: "offering_detailInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDetail>;
};

export type OfferingDetailOrderBy = {
  additional_info?: InputMaybe<OrderByDirection>;
  admin_expense?: InputMaybe<OrderByDirection>;
  cap_rate?: InputMaybe<OrderByDirection>;
  coc_return?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  custom_onboarding_link?: InputMaybe<OrderByDirection>;
  distribution_currency?: InputMaybe<OrderByDirection>;
  distribution_description?: InputMaybe<OrderByDirection>;
  distribution_frequency?: InputMaybe<OrderByDirection>;
  distribution_period?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  investment_currency?: InputMaybe<OrderByDirection>;
  max_investors?: InputMaybe<OrderByDirection>;
  max_raise?: InputMaybe<OrderByDirection>;
  max_units_per_investor?: InputMaybe<OrderByDirection>;
  min_investors?: InputMaybe<OrderByDirection>;
  min_raise?: InputMaybe<OrderByDirection>;
  min_units_per_investor?: InputMaybe<OrderByDirection>;
  num_units?: InputMaybe<OrderByDirection>;
  offering_id?: InputMaybe<OrderByDirection>;
  preferred_return?: InputMaybe<OrderByDirection>;
  price_start?: InputMaybe<OrderByDirection>;
  projected_appreciation?: InputMaybe<OrderByDirection>;
  projected_irr?: InputMaybe<OrderByDirection>;
  projected_irr_max?: InputMaybe<OrderByDirection>;
  raise_period?: InputMaybe<OrderByDirection>;
  raise_start?: InputMaybe<OrderByDirection>;
  stage?: InputMaybe<OrderByDirection>;
  target_equity_multiple?: InputMaybe<OrderByDirection>;
  target_equity_multiple_max?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  unit_name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type OfferingDetailUpdateInput = {
  additional_info?: InputMaybe<Scalars["String"]["input"]>;
  admin_expense?: InputMaybe<Scalars["Int"]["input"]>;
  cap_rate?: InputMaybe<Scalars["Int"]["input"]>;
  coc_return?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  custom_onboarding_link?: InputMaybe<Scalars["String"]["input"]>;
  distribution_currency?: InputMaybe<CurrencyCode>;
  distribution_description?: InputMaybe<Scalars["String"]["input"]>;
  distribution_frequency?: InputMaybe<Scalars["Int"]["input"]>;
  distribution_period?: InputMaybe<DistributionPeriodType>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  investment_currency?: InputMaybe<CurrencyCode>;
  max_investors?: InputMaybe<Scalars["Int"]["input"]>;
  max_raise?: InputMaybe<Scalars["BigInt"]["input"]>;
  max_units_per_investor?: InputMaybe<Scalars["Int"]["input"]>;
  min_investors?: InputMaybe<Scalars["Int"]["input"]>;
  min_raise?: InputMaybe<Scalars["BigInt"]["input"]>;
  min_units_per_investor?: InputMaybe<Scalars["Int"]["input"]>;
  num_units?: InputMaybe<Scalars["Int"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  preferred_return?: InputMaybe<Scalars["Int"]["input"]>;
  price_start?: InputMaybe<Scalars["Int"]["input"]>;
  projected_appreciation?: InputMaybe<Scalars["Int"]["input"]>;
  projected_irr?: InputMaybe<Scalars["Int"]["input"]>;
  projected_irr_max?: InputMaybe<Scalars["Int"]["input"]>;
  raise_period?: InputMaybe<Scalars["Int"]["input"]>;
  raise_start?: InputMaybe<Scalars["Datetime"]["input"]>;
  stage?: InputMaybe<OfferingStage>;
  target_equity_multiple?: InputMaybe<Scalars["Int"]["input"]>;
  target_equity_multiple_max?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<OfferingDetailsType>;
  unit_name?: InputMaybe<UnitName>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDetailUpdateResponse = {
  __typename?: "offering_detailUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDetail>;
};

export enum OfferingDetailsType {
  Crypto = "CRYPTO",
  Other = "OTHER",
  PrivateEquity = "PRIVATE_EQUITY",
  RealEstate = "REAL_ESTATE",
  VentureCapital = "VENTURE_CAPITAL"
}

/** Boolean expression comparing fields on type "offering_details_type" */
export type OfferingDetailsTypeFilter = {
  eq?: InputMaybe<OfferingDetailsType>;
  in?: InputMaybe<Array<OfferingDetailsType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OfferingDetailsType>;
};

export type OfferingDistribution = Node & {
  __typename?: "offering_distribution";
  contract_index: Scalars["Int"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  transaction_hash: Scalars["String"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type OfferingDistributionConnection = {
  __typename?: "offering_distributionConnection";
  edges: Array<OfferingDistributionEdge>;
  pageInfo: PageInfo;
};

export type OfferingDistributionDeleteResponse = {
  __typename?: "offering_distributionDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDistribution>;
};

export type OfferingDistributionEdge = {
  __typename?: "offering_distributionEdge";
  cursor: Scalars["String"]["output"];
  node: OfferingDistribution;
};

export type OfferingDistributionFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingDistributionFilter>>;
  contract_index?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingDistributionFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingDistributionFilter>>;
  transaction_hash?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type OfferingDistributionInsertInput = {
  contract_index?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDistributionInsertResponse = {
  __typename?: "offering_distributionInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDistribution>;
};

export type OfferingDistributionOrderBy = {
  contract_index?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  transaction_hash?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type OfferingDistributionUpdateInput = {
  contract_index?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingDistributionUpdateResponse = {
  __typename?: "offering_distributionUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingDistribution>;
};

export type OfferingParticipant = Node & {
  __typename?: "offering_participant";
  address_offering_id: Scalars["String"]["output"];
  chain_id: Scalars["Int"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  email_address?: Maybe<Scalars["String"]["output"]>;
  external_id?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  investor_applicationCollection?: Maybe<InvestorApplicationConnection>;
  jurisdiction?: Maybe<Jurisdiction>;
  jurisdiction_id?: Maybe<Scalars["UUID"]["output"]>;
  max_pledge?: Maybe<Scalars["Int"]["output"]>;
  min_pledge?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering?: Maybe<Offering>;
  offering_id: Scalars["UUID"]["output"];
  paid?: Maybe<Scalars["Boolean"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  wallet_address: Scalars["String"]["output"];
  whitelist_transactionCollection?: Maybe<WhitelistTransactionConnection>;
};

export type OfferingParticipantInvestorApplicationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<InvestorApplicationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<InvestorApplicationOrderBy>>;
};

export type OfferingParticipantWhitelistTransactionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<WhitelistTransactionFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<WhitelistTransactionOrderBy>>;
};

export type OfferingParticipantConnection = {
  __typename?: "offering_participantConnection";
  edges: Array<OfferingParticipantEdge>;
  pageInfo: PageInfo;
};

export type OfferingParticipantDeleteResponse = {
  __typename?: "offering_participantDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingParticipant>;
};

export type OfferingParticipantEdge = {
  __typename?: "offering_participantEdge";
  cursor: Scalars["String"]["output"];
  node: OfferingParticipant;
};

export type OfferingParticipantFilter = {
  address_offering_id?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingParticipantFilter>>;
  chain_id?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  email_address?: InputMaybe<StringFilter>;
  external_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  jurisdiction_id?: InputMaybe<UuidFilter>;
  max_pledge?: InputMaybe<IntFilter>;
  min_pledge?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingParticipantFilter>;
  offering_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingParticipantFilter>>;
  paid?: InputMaybe<BooleanFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  wallet_address?: InputMaybe<StringFilter>;
};

export type OfferingParticipantInsertInput = {
  address_offering_id?: InputMaybe<Scalars["String"]["input"]>;
  chain_id?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  email_address?: InputMaybe<Scalars["String"]["input"]>;
  external_id?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  jurisdiction_id?: InputMaybe<Scalars["UUID"]["input"]>;
  max_pledge?: InputMaybe<Scalars["Int"]["input"]>;
  min_pledge?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  paid?: InputMaybe<Scalars["Boolean"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  wallet_address?: InputMaybe<Scalars["String"]["input"]>;
};

export type OfferingParticipantInsertResponse = {
  __typename?: "offering_participantInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingParticipant>;
};

export type OfferingParticipantOrderBy = {
  address_offering_id?: InputMaybe<OrderByDirection>;
  chain_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  email_address?: InputMaybe<OrderByDirection>;
  external_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  jurisdiction_id?: InputMaybe<OrderByDirection>;
  max_pledge?: InputMaybe<OrderByDirection>;
  min_pledge?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  offering_id?: InputMaybe<OrderByDirection>;
  paid?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  wallet_address?: InputMaybe<OrderByDirection>;
};

export type OfferingParticipantUpdateInput = {
  address_offering_id?: InputMaybe<Scalars["String"]["input"]>;
  chain_id?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  email_address?: InputMaybe<Scalars["String"]["input"]>;
  external_id?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  jurisdiction_id?: InputMaybe<Scalars["UUID"]["input"]>;
  max_pledge?: InputMaybe<Scalars["Int"]["input"]>;
  min_pledge?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  paid?: InputMaybe<Scalars["Boolean"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  wallet_address?: InputMaybe<Scalars["String"]["input"]>;
};

export type OfferingParticipantUpdateResponse = {
  __typename?: "offering_participantUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingParticipant>;
};

export type OfferingSmartContractSet = Node & {
  __typename?: "offering_smart_contract_set";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  distribution_contract_id?: Maybe<Scalars["UUID"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering?: Maybe<Offering>;
  offering_id: Scalars["UUID"]["output"];
  share_contract_id?: Maybe<Scalars["UUID"]["output"]>;
  smart_contract?: Maybe<SmartContract>;
  swap_contract_id?: Maybe<Scalars["UUID"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type OfferingSmartContractSetConnection = {
  __typename?: "offering_smart_contract_setConnection";
  edges: Array<OfferingSmartContractSetEdge>;
  pageInfo: PageInfo;
};

export type OfferingSmartContractSetDeleteResponse = {
  __typename?: "offering_smart_contract_setDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingSmartContractSet>;
};

export type OfferingSmartContractSetEdge = {
  __typename?: "offering_smart_contract_setEdge";
  cursor: Scalars["String"]["output"];
  node: OfferingSmartContractSet;
};

export type OfferingSmartContractSetFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OfferingSmartContractSetFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  distribution_contract_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OfferingSmartContractSetFilter>;
  offering_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OfferingSmartContractSetFilter>>;
  share_contract_id?: InputMaybe<UuidFilter>;
  swap_contract_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type OfferingSmartContractSetInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  distribution_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  share_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  swap_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingSmartContractSetInsertResponse = {
  __typename?: "offering_smart_contract_setInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingSmartContractSet>;
};

export type OfferingSmartContractSetOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  distribution_contract_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  offering_id?: InputMaybe<OrderByDirection>;
  share_contract_id?: InputMaybe<OrderByDirection>;
  swap_contract_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type OfferingSmartContractSetUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  distribution_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  offering_id?: InputMaybe<Scalars["UUID"]["input"]>;
  share_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  swap_contract_id?: InputMaybe<Scalars["UUID"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type OfferingSmartContractSetUpdateResponse = {
  __typename?: "offering_smart_contract_setUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OfferingSmartContractSet>;
};

export enum OfferingStage {
  Closed = "CLOSED",
  DueDiligence = "DUE_DILIGENCE",
  Identified = "IDENTIFIED",
  InNegotiation = "IN_NEGOTIATION",
  Locked = "LOCKED",
  Sale = "SALE"
}

/** Boolean expression comparing fields on type "offering_stage" */
export type OfferingStageFilter = {
  eq?: InputMaybe<OfferingStage>;
  in?: InputMaybe<Array<OfferingStage>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OfferingStage>;
};

export enum OfferingTabSection {
  Details = "DETAILS",
  Disclosures = "DISCLOSURES",
  Financials = "FINANCIALS",
  OfferorInfo = "OFFEROR_INFO",
  Terms = "TERMS"
}

/** Boolean expression comparing fields on type "offering_tab_section" */
export type OfferingTabSectionFilter = {
  eq?: InputMaybe<OfferingTabSection>;
  in?: InputMaybe<Array<OfferingTabSection>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OfferingTabSection>;
};

export type Organization = Node & {
  __typename?: "organization";
  banner_image?: Maybe<Scalars["String"]["output"]>;
  brand_color?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  creation_date?: Maybe<Scalars["Datetime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  email_addressCollection?: Maybe<EmailAddressConnection>;
  id: Scalars["UUID"]["output"];
  is_public?: Maybe<Scalars["Boolean"]["output"]>;
  legal_entityCollection?: Maybe<LegalEntityConnection>;
  linked_accountCollection?: Maybe<LinkedAccountConnection>;
  logo?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  organization_userCollection?: Maybe<OrganizationUserConnection>;
  phone?: Maybe<Scalars["String"]["output"]>;
  short_description?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  website?: Maybe<Scalars["String"]["output"]>;
};

export type OrganizationEmailAddressCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<EmailAddressFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<EmailAddressOrderBy>>;
};

export type OrganizationLegalEntityCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LegalEntityFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LegalEntityOrderBy>>;
};

export type OrganizationLinkedAccountCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<LinkedAccountFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<LinkedAccountOrderBy>>;
};

export type OrganizationOrganizationUserCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrganizationUserFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrganizationUserOrderBy>>;
};

export type OrganizationConnection = {
  __typename?: "organizationConnection";
  edges: Array<OrganizationEdge>;
  pageInfo: PageInfo;
};

export type OrganizationDeleteResponse = {
  __typename?: "organizationDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Organization>;
};

export type OrganizationEdge = {
  __typename?: "organizationEdge";
  cursor: Scalars["String"]["output"];
  node: Organization;
};

export type OrganizationFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OrganizationFilter>>;
  banner_image?: InputMaybe<StringFilter>;
  brand_color?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  creation_date?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  is_public?: InputMaybe<BooleanFilter>;
  logo?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OrganizationFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OrganizationFilter>>;
  phone?: InputMaybe<StringFilter>;
  short_description?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  website?: InputMaybe<StringFilter>;
};

export type OrganizationInsertInput = {
  banner_image?: InputMaybe<Scalars["String"]["input"]>;
  brand_color?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  creation_date?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  logo?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  short_description?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type OrganizationInsertResponse = {
  __typename?: "organizationInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Organization>;
};

export type OrganizationOrderBy = {
  banner_image?: InputMaybe<OrderByDirection>;
  brand_color?: InputMaybe<OrderByDirection>;
  country?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  creation_date?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_public?: InputMaybe<OrderByDirection>;
  logo?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  short_description?: InputMaybe<OrderByDirection>;
  slug?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type OrganizationUpdateInput = {
  banner_image?: InputMaybe<Scalars["String"]["input"]>;
  brand_color?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  creation_date?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  is_public?: InputMaybe<Scalars["Boolean"]["input"]>;
  logo?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  short_description?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type OrganizationUpdateResponse = {
  __typename?: "organizationUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Organization>;
};

export enum OrganizationPermissionType {
  Admin = "ADMIN",
  Auditor = "AUDITOR",
  Editor = "EDITOR",
  Viewer = "VIEWER"
}

/** Boolean expression comparing fields on type "organization_permission_type" */
export type OrganizationPermissionTypeFilter = {
  eq?: InputMaybe<OrganizationPermissionType>;
  in?: InputMaybe<Array<OrganizationPermissionType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OrganizationPermissionType>;
};

export type OrganizationUser = Node & {
  __typename?: "organization_user";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  notification_configurationCollection?: Maybe<NotificationConfigurationConnection>;
  organization?: Maybe<Organization>;
  organization_id: Scalars["UUID"]["output"];
  permissions?: Maybe<Array<Maybe<OrganizationPermissionType>>>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  user_id: Scalars["UUID"]["output"];
};

export type OrganizationUserNotificationConfigurationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<NotificationConfigurationFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<NotificationConfigurationOrderBy>>;
};

export type OrganizationUserConnection = {
  __typename?: "organization_userConnection";
  edges: Array<OrganizationUserEdge>;
  pageInfo: PageInfo;
};

export type OrganizationUserDeleteResponse = {
  __typename?: "organization_userDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OrganizationUser>;
};

export type OrganizationUserEdge = {
  __typename?: "organization_userEdge";
  cursor: Scalars["String"]["output"];
  node: OrganizationUser;
};

export type OrganizationUserFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OrganizationUserFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OrganizationUserFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OrganizationUserFilter>>;
  organization_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type OrganizationUserInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<OrganizationPermissionType>>>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  user_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type OrganizationUserInsertResponse = {
  __typename?: "organization_userInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OrganizationUser>;
};

export type OrganizationUserOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  organization_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type OrganizationUserUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  organization_id?: InputMaybe<Scalars["UUID"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<OrganizationPermissionType>>>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  user_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type OrganizationUserUpdateResponse = {
  __typename?: "organization_userUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<OrganizationUser>;
};

export enum OrganizationUserRole {
  Advisor = "ADVISOR",
  BoardMember = "BOARD_MEMBER",
  Investor = "INVESTOR",
  Partner = "PARTNER",
  Supporter = "SUPPORTER",
  Team = "TEAM"
}

/** Boolean expression comparing fields on type "organization_user_role" */
export type OrganizationUserRoleFilter = {
  eq?: InputMaybe<OrganizationUserRole>;
  in?: InputMaybe<Array<OrganizationUserRole>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OrganizationUserRole>;
};

export type Profile = Node & {
  __typename?: "profile";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type ProfileConnection = {
  __typename?: "profileConnection";
  edges: Array<ProfileEdge>;
  pageInfo: PageInfo;
};

export type ProfileDeleteResponse = {
  __typename?: "profileDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileEdge = {
  __typename?: "profileEdge";
  cursor: Scalars["String"]["output"];
  node: Profile;
};

export type ProfileFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfileFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfileFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfileFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ProfileInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ProfileInsertResponse = {
  __typename?: "profileInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ProfileUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ProfileUpdateResponse = {
  __typename?: "profileUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type RealEstateProperty = Node & {
  __typename?: "real_estate_property";
  address?: Maybe<Address>;
  address_id?: Maybe<Scalars["UUID"]["output"]>;
  amenities_description?: Maybe<Scalars["String"]["output"]>;
  asset_value?: Maybe<Scalars["Int"]["output"]>;
  asset_value_note?: Maybe<Scalars["String"]["output"]>;
  closing_costs?: Maybe<Scalars["Int"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  down_payment?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["UUID"]["output"];
  investment_status?: Maybe<AssetStatus>;
  legal_entity?: Maybe<LegalEntity>;
  lender_fees?: Maybe<Scalars["Int"]["output"]>;
  loan?: Maybe<Scalars["Int"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  owner_id: Scalars["UUID"]["output"];
  property_type: RealEstatePropertyType;
  real_estate_property_imageCollection?: Maybe<RealEstatePropertyImageConnection>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type RealEstatePropertyRealEstatePropertyImageCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<RealEstatePropertyImageFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<RealEstatePropertyImageOrderBy>>;
};

export type RealEstatePropertyConnection = {
  __typename?: "real_estate_propertyConnection";
  edges: Array<RealEstatePropertyEdge>;
  pageInfo: PageInfo;
};

export type RealEstatePropertyDeleteResponse = {
  __typename?: "real_estate_propertyDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstateProperty>;
};

export type RealEstatePropertyEdge = {
  __typename?: "real_estate_propertyEdge";
  cursor: Scalars["String"]["output"];
  node: RealEstateProperty;
};

export type RealEstatePropertyFilter = {
  address_id?: InputMaybe<UuidFilter>;
  amenities_description?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RealEstatePropertyFilter>>;
  asset_value?: InputMaybe<IntFilter>;
  asset_value_note?: InputMaybe<StringFilter>;
  closing_costs?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  down_payment?: InputMaybe<IntFilter>;
  id?: InputMaybe<UuidFilter>;
  investment_status?: InputMaybe<AssetStatusFilter>;
  lender_fees?: InputMaybe<IntFilter>;
  loan?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RealEstatePropertyFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RealEstatePropertyFilter>>;
  owner_id?: InputMaybe<UuidFilter>;
  property_type?: InputMaybe<RealEstatePropertyTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type RealEstatePropertyInsertInput = {
  address_id?: InputMaybe<Scalars["UUID"]["input"]>;
  amenities_description?: InputMaybe<Scalars["String"]["input"]>;
  asset_value?: InputMaybe<Scalars["Int"]["input"]>;
  asset_value_note?: InputMaybe<Scalars["String"]["input"]>;
  closing_costs?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  down_payment?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  investment_status?: InputMaybe<AssetStatus>;
  lender_fees?: InputMaybe<Scalars["Int"]["input"]>;
  loan?: InputMaybe<Scalars["Int"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  property_type?: InputMaybe<RealEstatePropertyType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type RealEstatePropertyInsertResponse = {
  __typename?: "real_estate_propertyInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstateProperty>;
};

export type RealEstatePropertyOrderBy = {
  address_id?: InputMaybe<OrderByDirection>;
  amenities_description?: InputMaybe<OrderByDirection>;
  asset_value?: InputMaybe<OrderByDirection>;
  asset_value_note?: InputMaybe<OrderByDirection>;
  closing_costs?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  down_payment?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  investment_status?: InputMaybe<OrderByDirection>;
  lender_fees?: InputMaybe<OrderByDirection>;
  loan?: InputMaybe<OrderByDirection>;
  owner_id?: InputMaybe<OrderByDirection>;
  property_type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type RealEstatePropertyUpdateInput = {
  address_id?: InputMaybe<Scalars["UUID"]["input"]>;
  amenities_description?: InputMaybe<Scalars["String"]["input"]>;
  asset_value?: InputMaybe<Scalars["Int"]["input"]>;
  asset_value_note?: InputMaybe<Scalars["String"]["input"]>;
  closing_costs?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  down_payment?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  investment_status?: InputMaybe<AssetStatus>;
  lender_fees?: InputMaybe<Scalars["Int"]["input"]>;
  loan?: InputMaybe<Scalars["Int"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  property_type?: InputMaybe<RealEstatePropertyType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type RealEstatePropertyUpdateResponse = {
  __typename?: "real_estate_propertyUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstateProperty>;
};

export type RealEstatePropertyImage = Node & {
  __typename?: "real_estate_property_image";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  image?: Maybe<Image>;
  image_id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  property_id: Scalars["UUID"]["output"];
  real_estate_property?: Maybe<RealEstateProperty>;
};

export type RealEstatePropertyImageConnection = {
  __typename?: "real_estate_property_imageConnection";
  edges: Array<RealEstatePropertyImageEdge>;
  pageInfo: PageInfo;
};

export type RealEstatePropertyImageDeleteResponse = {
  __typename?: "real_estate_property_imageDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstatePropertyImage>;
};

export type RealEstatePropertyImageEdge = {
  __typename?: "real_estate_property_imageEdge";
  cursor: Scalars["String"]["output"];
  node: RealEstatePropertyImage;
};

export type RealEstatePropertyImageFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RealEstatePropertyImageFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RealEstatePropertyImageFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RealEstatePropertyImageFilter>>;
  property_id?: InputMaybe<UuidFilter>;
};

export type RealEstatePropertyImageInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  property_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type RealEstatePropertyImageInsertResponse = {
  __typename?: "real_estate_property_imageInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstatePropertyImage>;
};

export type RealEstatePropertyImageOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image_id?: InputMaybe<OrderByDirection>;
  property_id?: InputMaybe<OrderByDirection>;
};

export type RealEstatePropertyImageUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  image_id?: InputMaybe<Scalars["UUID"]["input"]>;
  property_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type RealEstatePropertyImageUpdateResponse = {
  __typename?: "real_estate_property_imageUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<RealEstatePropertyImage>;
};

export enum RealEstatePropertyType {
  Commercial = "COMMERCIAL",
  LandOnly = "LAND_ONLY",
  MultiFamily = "MULTI_FAMILY",
  SelfStorage = "SELF_STORAGE",
  SingleFamily = "SINGLE_FAMILY"
}

/** Boolean expression comparing fields on type "real_estate_property_type" */
export type RealEstatePropertyTypeFilter = {
  eq?: InputMaybe<RealEstatePropertyType>;
  in?: InputMaybe<Array<RealEstatePropertyType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<RealEstatePropertyType>;
};

export type ShareOrder = Node & {
  __typename?: "share_order";
  archived?: Maybe<Scalars["Boolean"]["output"]>;
  contract_index: Scalars["Int"]["output"];
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  id: Scalars["UUID"]["output"];
  initiator: Scalars["String"]["output"];
  max_units?: Maybe<Scalars["Int"]["output"]>;
  min_units?: Maybe<Scalars["Int"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  swap_contract_address: Scalars["String"]["output"];
  transaction_hash: Scalars["String"]["output"];
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  visible?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ShareOrderConnection = {
  __typename?: "share_orderConnection";
  edges: Array<ShareOrderEdge>;
  pageInfo: PageInfo;
};

export type ShareOrderDeleteResponse = {
  __typename?: "share_orderDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareOrder>;
};

export type ShareOrderEdge = {
  __typename?: "share_orderEdge";
  cursor: Scalars["String"]["output"];
  node: ShareOrder;
};

export type ShareOrderFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ShareOrderFilter>>;
  archived?: InputMaybe<BooleanFilter>;
  contract_index?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  initiator?: InputMaybe<StringFilter>;
  max_units?: InputMaybe<IntFilter>;
  min_units?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ShareOrderFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ShareOrderFilter>>;
  swap_contract_address?: InputMaybe<StringFilter>;
  transaction_hash?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  visible?: InputMaybe<BooleanFilter>;
};

export type ShareOrderInsertInput = {
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  contract_index?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  initiator?: InputMaybe<Scalars["String"]["input"]>;
  max_units?: InputMaybe<Scalars["Int"]["input"]>;
  min_units?: InputMaybe<Scalars["Int"]["input"]>;
  swap_contract_address?: InputMaybe<Scalars["String"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  visible?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ShareOrderInsertResponse = {
  __typename?: "share_orderInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareOrder>;
};

export type ShareOrderOrderBy = {
  archived?: InputMaybe<OrderByDirection>;
  contract_index?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  initiator?: InputMaybe<OrderByDirection>;
  max_units?: InputMaybe<OrderByDirection>;
  min_units?: InputMaybe<OrderByDirection>;
  swap_contract_address?: InputMaybe<OrderByDirection>;
  transaction_hash?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  visible?: InputMaybe<OrderByDirection>;
};

export type ShareOrderUpdateInput = {
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  contract_index?: InputMaybe<Scalars["Int"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  initiator?: InputMaybe<Scalars["String"]["input"]>;
  max_units?: InputMaybe<Scalars["Int"]["input"]>;
  min_units?: InputMaybe<Scalars["Int"]["input"]>;
  swap_contract_address?: InputMaybe<Scalars["String"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  visible?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ShareOrderUpdateResponse = {
  __typename?: "share_orderUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareOrder>;
};

export type ShareTransferEvent = Node & {
  __typename?: "share_transfer_event";
  amount: Scalars["Int"]["output"];
  archived?: Maybe<Scalars["Boolean"]["output"]>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  currency_code?: Maybe<CurrencyCode>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  order_index?: Maybe<Scalars["Int"]["output"]>;
  partition: Scalars["String"]["output"];
  price?: Maybe<Scalars["String"]["output"]>;
  recipient_address: Scalars["String"]["output"];
  sender_address: Scalars["String"]["output"];
  share_contract_address: Scalars["String"]["output"];
  transaction_hash: Scalars["String"]["output"];
  type: ShareTransferEventType;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type ShareTransferEventConnection = {
  __typename?: "share_transfer_eventConnection";
  edges: Array<ShareTransferEventEdge>;
  pageInfo: PageInfo;
};

export type ShareTransferEventDeleteResponse = {
  __typename?: "share_transfer_eventDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareTransferEvent>;
};

export type ShareTransferEventEdge = {
  __typename?: "share_transfer_eventEdge";
  cursor: Scalars["String"]["output"];
  node: ShareTransferEvent;
};

export type ShareTransferEventFilter = {
  amount?: InputMaybe<IntFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ShareTransferEventFilter>>;
  archived?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  currency_code?: InputMaybe<CurrencyCodeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ShareTransferEventFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ShareTransferEventFilter>>;
  order_index?: InputMaybe<IntFilter>;
  partition?: InputMaybe<StringFilter>;
  price?: InputMaybe<StringFilter>;
  recipient_address?: InputMaybe<StringFilter>;
  sender_address?: InputMaybe<StringFilter>;
  share_contract_address?: InputMaybe<StringFilter>;
  transaction_hash?: InputMaybe<StringFilter>;
  type?: InputMaybe<ShareTransferEventTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ShareTransferEventInsertInput = {
  amount?: InputMaybe<Scalars["Int"]["input"]>;
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  currency_code?: InputMaybe<CurrencyCode>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  order_index?: InputMaybe<Scalars["Int"]["input"]>;
  partition?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["String"]["input"]>;
  recipient_address?: InputMaybe<Scalars["String"]["input"]>;
  sender_address?: InputMaybe<Scalars["String"]["input"]>;
  share_contract_address?: InputMaybe<Scalars["String"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ShareTransferEventType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ShareTransferEventInsertResponse = {
  __typename?: "share_transfer_eventInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareTransferEvent>;
};

export type ShareTransferEventOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  archived?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  currency_code?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  order_index?: InputMaybe<OrderByDirection>;
  partition?: InputMaybe<OrderByDirection>;
  price?: InputMaybe<OrderByDirection>;
  recipient_address?: InputMaybe<OrderByDirection>;
  sender_address?: InputMaybe<OrderByDirection>;
  share_contract_address?: InputMaybe<OrderByDirection>;
  transaction_hash?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ShareTransferEventUpdateInput = {
  amount?: InputMaybe<Scalars["Int"]["input"]>;
  archived?: InputMaybe<Scalars["Boolean"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  currency_code?: InputMaybe<CurrencyCode>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  order_index?: InputMaybe<Scalars["Int"]["input"]>;
  partition?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["String"]["input"]>;
  recipient_address?: InputMaybe<Scalars["String"]["input"]>;
  sender_address?: InputMaybe<Scalars["String"]["input"]>;
  share_contract_address?: InputMaybe<Scalars["String"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ShareTransferEventType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ShareTransferEventUpdateResponse = {
  __typename?: "share_transfer_eventUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<ShareTransferEvent>;
};

export enum ShareTransferEventType {
  Approval = "APPROVAL",
  Disapproval = "DISAPPROVAL",
  Forced = "FORCED",
  Issuance = "ISSUANCE",
  Trade = "TRADE",
  Transfer = "TRANSFER"
}

/** Boolean expression comparing fields on type "share_transfer_event_type" */
export type ShareTransferEventTypeFilter = {
  eq?: InputMaybe<ShareTransferEventType>;
  in?: InputMaybe<Array<ShareTransferEventType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<ShareTransferEventType>;
};

export type SmartContract = Node & {
  __typename?: "smart_contract";
  backing_token?: Maybe<CurrencyCode>;
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  crypto_address?: Maybe<CryptoAddress>;
  crypto_address_id: Scalars["UUID"]["output"];
  document?: Maybe<Document>;
  document_id?: Maybe<Scalars["UUID"]["output"]>;
  established?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["UUID"]["output"];
  legal_entity?: Maybe<LegalEntity>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  num_tokens_authorized?: Maybe<Scalars["BigInt"]["output"]>;
  offering_smart_contract_setCollection?: Maybe<OfferingSmartContractSetConnection>;
  owner_id: Scalars["UUID"]["output"];
  partitions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  sub_type?: Maybe<Scalars["String"]["output"]>;
  type: SmartContractType;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type SmartContractOfferingSmartContractSetCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OfferingSmartContractSetFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OfferingSmartContractSetOrderBy>>;
};

export type SmartContractConnection = {
  __typename?: "smart_contractConnection";
  edges: Array<SmartContractEdge>;
  pageInfo: PageInfo;
};

export type SmartContractDeleteResponse = {
  __typename?: "smart_contractDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<SmartContract>;
};

export type SmartContractEdge = {
  __typename?: "smart_contractEdge";
  cursor: Scalars["String"]["output"];
  node: SmartContract;
};

export type SmartContractFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<SmartContractFilter>>;
  backing_token?: InputMaybe<CurrencyCodeFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  crypto_address_id?: InputMaybe<UuidFilter>;
  document_id?: InputMaybe<UuidFilter>;
  established?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<SmartContractFilter>;
  num_tokens_authorized?: InputMaybe<BigIntFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<SmartContractFilter>>;
  owner_id?: InputMaybe<UuidFilter>;
  partitions?: InputMaybe<StringListFilter>;
  sub_type?: InputMaybe<StringFilter>;
  type?: InputMaybe<SmartContractTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type SmartContractInsertInput = {
  backing_token?: InputMaybe<CurrencyCode>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  crypto_address_id?: InputMaybe<Scalars["UUID"]["input"]>;
  document_id?: InputMaybe<Scalars["UUID"]["input"]>;
  established?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  num_tokens_authorized?: InputMaybe<Scalars["BigInt"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  partitions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sub_type?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<SmartContractType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type SmartContractInsertResponse = {
  __typename?: "smart_contractInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<SmartContract>;
};

export type SmartContractOrderBy = {
  backing_token?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  crypto_address_id?: InputMaybe<OrderByDirection>;
  document_id?: InputMaybe<OrderByDirection>;
  established?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  num_tokens_authorized?: InputMaybe<OrderByDirection>;
  owner_id?: InputMaybe<OrderByDirection>;
  sub_type?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type SmartContractUpdateInput = {
  backing_token?: InputMaybe<CurrencyCode>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  crypto_address_id?: InputMaybe<Scalars["UUID"]["input"]>;
  document_id?: InputMaybe<Scalars["UUID"]["input"]>;
  established?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  num_tokens_authorized?: InputMaybe<Scalars["BigInt"]["input"]>;
  owner_id?: InputMaybe<Scalars["UUID"]["input"]>;
  partitions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sub_type?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<SmartContractType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type SmartContractUpdateResponse = {
  __typename?: "smart_contractUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<SmartContract>;
};

export enum SmartContractType {
  C2 = "C2",
  C3 = "C3",
  Distribution = "DISTRIBUTION",
  Erc20 = "ERC20",
  Erc1410 = "ERC1410",
  Other = "OTHER",
  Swap = "SWAP"
}

/** Boolean expression comparing fields on type "smart_contract_type" */
export type SmartContractTypeFilter = {
  eq?: InputMaybe<SmartContractType>;
  in?: InputMaybe<Array<SmartContractType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<SmartContractType>;
};

export enum UnitName {
  MembershipInterest = "MEMBERSHIP_INTEREST",
  Share = "SHARE",
  Token = "TOKEN",
  Unit = "UNIT"
}

/** Boolean expression comparing fields on type "unit_name" */
export type UnitNameFilter = {
  eq?: InputMaybe<UnitName>;
  in?: InputMaybe<Array<UnitName>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<UnitName>;
};

export type WhitelistTransaction = Node & {
  __typename?: "whitelist_transaction";
  created_at?: Maybe<Scalars["Datetime"]["output"]>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  offering_participant?: Maybe<OfferingParticipant>;
  offering_participant_id: Scalars["UUID"]["output"];
  transaction_hash: Scalars["String"]["output"];
  type: WhitelistTransactionType;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type WhitelistTransactionConnection = {
  __typename?: "whitelist_transactionConnection";
  edges: Array<WhitelistTransactionEdge>;
  pageInfo: PageInfo;
};

export type WhitelistTransactionDeleteResponse = {
  __typename?: "whitelist_transactionDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<WhitelistTransaction>;
};

export type WhitelistTransactionEdge = {
  __typename?: "whitelist_transactionEdge";
  cursor: Scalars["String"]["output"];
  node: WhitelistTransaction;
};

export type WhitelistTransactionFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<WhitelistTransactionFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<WhitelistTransactionFilter>;
  offering_participant_id?: InputMaybe<UuidFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<WhitelistTransactionFilter>>;
  transaction_hash?: InputMaybe<StringFilter>;
  type?: InputMaybe<WhitelistTransactionTypeFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type WhitelistTransactionInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  offering_participant_id?: InputMaybe<Scalars["UUID"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<WhitelistTransactionType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type WhitelistTransactionInsertResponse = {
  __typename?: "whitelist_transactionInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<WhitelistTransaction>;
};

export type WhitelistTransactionOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  offering_participant_id?: InputMaybe<OrderByDirection>;
  transaction_hash?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type WhitelistTransactionUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  offering_participant_id?: InputMaybe<Scalars["UUID"]["input"]>;
  transaction_hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<WhitelistTransactionType>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type WhitelistTransactionUpdateResponse = {
  __typename?: "whitelist_transactionUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<WhitelistTransaction>;
};

export enum WhitelistTransactionType {
  Add = "ADD",
  Remove = "REMOVE"
}

/** Boolean expression comparing fields on type "whitelist_transaction_type" */
export type WhitelistTransactionTypeFilter = {
  eq?: InputMaybe<WhitelistTransactionType>;
  in?: InputMaybe<Array<WhitelistTransactionType>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<WhitelistTransactionType>;
};

export type GetCryptoAddressQueryVariables = Exact<{
  walletAddress: Scalars["String"]["input"];
}>;

export type GetCryptoAddressQuery = {
  __typename: "Query";
  crypto_addressCollection?: {
    __typename: "crypto_addressConnection";
    edges: Array<{
      __typename: "crypto_addressEdge";
      node: {
        __typename: "crypto_address";
        id: string;
        address: string;
        legal_entity?: {
          __typename: "legal_entity";
          id: string;
          legal_name?: string | null;
        } | null;
      };
    }>;
  } | null;
};

export type UpdateCryptoAddressMutationVariables = Exact<{
  id: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateCryptoAddressMutation = {
  __typename: "Mutation";
  updatecrypto_addressCollection: {
    __typename: "crypto_addressUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "crypto_address";
      id: string;
      name?: string | null;
      address: string;
      is_public?: boolean | null;
      description?: string | null;
      legal_entity_id: string;
    }>;
  };
};

export type AddContractPartitionMutationVariables = Exact<{
  id: Scalars["UUID"]["input"];
  partition: Scalars["String"]["input"];
}>;

export type AddContractPartitionMutation = {
  __typename: "Mutation";
  updatesmart_contractCollection: {
    __typename: "smart_contractUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "smart_contract";
      id: string;
      partitions?: Array<string | null> | null;
      owner_id: string;
    }>;
  };
};

export type AddShareContractMutationVariables = Exact<{
  cryptoAddressId: Scalars["UUID"]["input"];
  ownerId: Scalars["UUID"]["input"];
  type: SmartContractType;
}>;

export type AddShareContractMutation = {
  __typename: "Mutation";
  insertIntosmart_contractCollection?: {
    __typename: "smart_contractInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "smart_contract";
      id: string;
      owner_id: string;
      crypto_address_id: string;
      type: SmartContractType;
      established?: boolean | null;
    }>;
  } | null;
};

export type AddSwapContractMutationVariables = Exact<{
  contractSetId: Scalars["UUID"]["input"];
  swapContractId: Scalars["UUID"]["input"];
}>;

export type AddSwapContractMutation = {
  __typename: "Mutation";
  updateoffering_smart_contract_setCollection: {
    __typename: "offering_smart_contract_setUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "offering_smart_contract_set";
      id: string;
      swap_contract_id?: string | null;
      offering_id: string;
    }>;
  };
};

export type AddDistributionContractMutationVariables = Exact<{
  contractSetId: Scalars["UUID"]["input"];
  distributionContractId: Scalars["UUID"]["input"];
}>;

export type AddDistributionContractMutation = {
  __typename: "Mutation";
  updateoffering_smart_contract_setCollection: {
    __typename: "offering_smart_contract_setUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "offering_smart_contract_set";
      id: string;
      distribution_contract_id?: string | null;
      offering_id: string;
    }>;
  };
};

export type UpdateSmartContractMutationVariables = Exact<{
  id: Scalars["UUID"]["input"];
  established?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateSmartContractMutation = {
  __typename: "Mutation";
  updatesmart_contractCollection: {
    __typename: "smart_contractUpdateResponse";
    affectedCount: number;
    records: Array<{ __typename: "smart_contract"; id: string; owner_id: string }>;
  };
};

export type LinkedAccountFieldsFragment = {
  __typename: "linked_account";
  id: string;
  account_provided_id?: string | null;
  username?: string | null;
  url: string;
  type?: LinkedAccountType | null;
  verified?: boolean | null;
  hidden?: boolean | null;
  organization_id: string;
} & { " $fragmentName"?: "LinkedAccountFieldsFragment" };

export type AddressFieldsFragment = {
  __typename: "address";
  id: string;
  label?: string | null;
  line1?: string | null;
  line2?: string | null;
  line3?: string | null;
  city: string;
  state_province?: string | null;
  postal_code?: string | null;
  country: string;
  lat?: string | null;
  lng?: string | null;
  legal_entity_id: string;
} & { " $fragmentName"?: "AddressFieldsFragment" };

export type DocumentFieldsFragment = {
  __typename: "document";
  id: string;
  title?: string | null;
  file_id?: string | null;
  date?: string | null;
  format?: DocumentFormat | null;
  type?: DocumentType | null;
  text?: string | null;
  url?: string | null;
  thumbnail_image_id?: string | null;
  owner_id: string;
  access?: DocumentAccessType | null;
  offering_id?: string | null;
  offering_unique_id: string;
} & { " $fragmentName"?: "DocumentFieldsFragment" };

export type ApplicationFieldsFragment = {
  __typename: "investor_application";
  id: string;
  offering_participant_id: string;
  application_doc_id: string;
} & { " $fragmentName"?: "ApplicationFieldsFragment" };

export type SmartContractFieldsFragment = {
  __typename: "smart_contract";
  id: string;
  crypto_address_id: string;
  type: SmartContractType;
  num_tokens_authorized?: string | null;
  backing_token?: CurrencyCode | null;
  owner_id: string;
  established?: boolean | null;
  partitions?: Array<string | null> | null;
} & { " $fragmentName"?: "SmartContractFieldsFragment" };

export type SmartContractSetFieldsFragment = {
  __typename: "offering_smart_contract_set";
  id: string;
  offering_id: string;
  share_contract_id?: string | null;
  swap_contract_id?: string | null;
  distribution_contract_id?: string | null;
} & { " $fragmentName"?: "SmartContractSetFieldsFragment" };

export type OfferingDetailsFieldsFragment = {
  __typename: "offering_detail";
  id: string;
  type?: OfferingDetailsType | null;
  custom_onboarding_link?: string | null;
  stage?: OfferingStage | null;
  investment_currency: CurrencyCode;
  num_units?: number | null;
  min_units_per_investor?: number | null;
  max_units_per_investor?: number | null;
  max_raise?: string | null;
  min_raise?: string | null;
  price_start?: number | null;
  max_investors?: number | null;
  min_investors?: number | null;
  raise_start?: string | null;
  raise_period?: number | null;
  additional_info?: string | null;
  distribution_period?: DistributionPeriodType | null;
  distribution_frequency?: number | null;
  distribution_currency?: CurrencyCode | null;
  distribution_description?: string | null;
  admin_expense?: number | null;
  projected_irr?: number | null;
  projected_irr_max?: number | null;
  target_equity_multiple?: number | null;
  target_equity_multiple_max?: number | null;
  preferred_return?: number | null;
  coc_return?: number | null;
  projected_appreciation?: number | null;
  cap_rate?: number | null;
} & { " $fragmentName"?: "OfferingDetailsFieldsFragment" };

export type RealEstatePropertyFieldsFragment = {
  __typename: "real_estate_property";
  id: string;
  property_type: RealEstatePropertyType;
  investment_status?: AssetStatus | null;
  address_id?: string | null;
  amenities_description?: string | null;
  description?: string | null;
  asset_value?: number | null;
  asset_value_note?: string | null;
  loan?: number | null;
  down_payment?: number | null;
  lender_fees?: number | null;
  closing_costs?: number | null;
  owner_id: string;
} & { " $fragmentName"?: "RealEstatePropertyFieldsFragment" };

export type OfferingParticipantFieldsFragment = {
  __typename: "offering_participant";
  id: string;
  address_offering_id: string;
  wallet_address: string;
  chain_id: number;
  name?: string | null;
  external_id?: string | null;
  min_pledge?: number | null;
  max_pledge?: number | null;
  offering_id: string;
} & { " $fragmentName"?: "OfferingParticipantFieldsFragment" };

export type LegalEntityFieldsFragment = {
  __typename: "legal_entity";
  id: string;
  tax_id?: string | null;
  display_name?: string | null;
  legal_name?: string | null;
  purpose?: string | null;
  jurisdiction_id?: string | null;
  operating_currency?: CurrencyCode | null;
  organization_id: string;
  type: LegalEntityType;
} & { " $fragmentName"?: "LegalEntityFieldsFragment" };

export type OfferingFieldsFragment = {
  __typename: "offering";
  id: string;
  name: string;
  is_public?: boolean | null;
  access_code?: string | null;
  waitlist_on?: boolean | null;
  banner_image?: string | null;
  primary_video?: string | null;
  brand_color?: string | null;
  light_brand?: boolean | null;
  website?: string | null;
  short_description?: string | null;
  image?: {
    __typename: "image";
    id: string;
    url: string;
    label?: string | null;
    file_id?: string | null;
  } | null;
} & { " $fragmentName"?: "OfferingFieldsFragment" };

export type OrganizationFieldsFragment = {
  __typename: "organization";
  id: string;
  name?: string | null;
  description?: string | null;
  logo?: string | null;
  brand_color?: string | null;
  banner_image?: string | null;
  website?: string | null;
  is_public?: boolean | null;
  phone?: string | null;
  country?: string | null;
} & { " $fragmentName"?: "OrganizationFieldsFragment" };

export type UserFieldsFragment = { __typename: "profile"; id: string } & {
  " $fragmentName"?: "UserFieldsFragment";
};

export type DocumentSignatoryFieldsFragment = {
  __typename: "document_signatory";
  id: string;
  document_id: string;
  signer_address?: string | null;
  legal_entity_id?: string | null;
} & { " $fragmentName"?: "DocumentSignatoryFieldsFragment" };

export type RetrieveTransferEventsQueryVariables = Exact<{
  shareContractAddress: Scalars["String"]["input"];
}>;

export type RetrieveTransferEventsQuery = {
  __typename: "Query";
  share_transfer_eventCollection?: {
    __typename: "share_transfer_eventConnection";
    edges: Array<{
      __typename: "share_transfer_eventEdge";
      node: {
        __typename: "share_transfer_event";
        id: string;
        share_contract_address: string;
        order_index?: number | null;
        recipient_address: string;
        sender_address: string;
        amount: number;
        price?: string | null;
        currency_code?: CurrencyCode | null;
        transaction_hash: string;
        partition: string;
        type: ShareTransferEventType;
      };
    }>;
  } | null;
};

export type AddTransferEventMutationVariables = Exact<{
  shareContractAddress: Scalars["String"]["input"];
  orderIndex?: InputMaybe<Scalars["Int"]["input"]>;
  recipientAddress: Scalars["String"]["input"];
  senderAddress: Scalars["String"]["input"];
  amount: Scalars["Int"]["input"];
  price?: InputMaybe<Scalars["String"]["input"]>;
  currencyCode?: InputMaybe<CurrencyCode>;
  transactionHash: Scalars["String"]["input"];
  partition: Scalars["String"]["input"];
  type: ShareTransferEventType;
}>;

export type AddTransferEventMutation = {
  __typename: "Mutation";
  insertIntoshare_transfer_eventCollection?: {
    __typename: "share_transfer_eventInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "share_transfer_event";
      id: string;
      share_contract_address: string;
      order_index?: number | null;
      recipient_address: string;
      sender_address: string;
      amount: number;
      price?: string | null;
      currency_code?: CurrencyCode | null;
      transaction_hash: string;
      partition: string;
      type: ShareTransferEventType;
    }>;
  } | null;
};

export type AddDistributionMutationVariables = Exact<{
  transactionHash: Scalars["String"]["input"];
  contractIndex: Scalars["Int"]["input"];
}>;

export type AddDistributionMutation = {
  __typename: "Mutation";
  insertIntooffering_distributionCollection?: {
    __typename: "offering_distributionInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "offering_distribution";
      id: string;
      transaction_hash: string;
      contract_index: number;
    }>;
  } | null;
};

export type UpdateOfferingDistributionMutationVariables = Exact<{
  distributionId: Scalars["UUID"]["input"];
  contractIndex: Scalars["Int"]["input"];
}>;

export type UpdateOfferingDistributionMutation = {
  __typename: "Mutation";
  updateoffering_distributionCollection: {
    __typename: "offering_distributionUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "offering_distribution";
      id: string;
      transaction_hash: string;
      contract_index: number;
    }>;
  };
};

export type UpdateContractStatusMutationVariables = Exact<{
  smartshareContractId: Scalars["UUID"]["input"];
  established?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateContractStatusMutation = {
  __typename: "Mutation";
  updatesmart_contractCollection: {
    __typename: "smart_contractUpdateResponse";
    affectedCount: number;
    records: Array<{ __typename: "smart_contract"; id: string; established?: boolean | null }>;
  };
};

export type CreateOrderMutationVariables = Exact<{
  contractIndex: Scalars["Int"]["input"];
  swapContractAddress: Scalars["String"]["input"];
  minUnits?: InputMaybe<Scalars["Int"]["input"]>;
  maxUnits?: InputMaybe<Scalars["Int"]["input"]>;
  visible: Scalars["Boolean"]["input"];
  initiator: Scalars["String"]["input"];
  transactionHash: Scalars["String"]["input"];
}>;

export type CreateOrderMutation = {
  __typename: "Mutation";
  insertIntoshare_orderCollection?: {
    __typename: "share_orderInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "share_order";
      id: string;
      contract_index: number;
      initiator: string;
      transaction_hash: string;
    }>;
  } | null;
};

export type RetrieveOrdersQueryVariables = Exact<{
  swapContractAddress: Scalars["String"]["input"];
}>;

export type RetrieveOrdersQuery = {
  __typename: "Query";
  share_orderCollection?: {
    __typename: "share_orderConnection";
    edges: Array<{
      __typename: "share_orderEdge";
      node: {
        __typename: "share_order";
        id: string;
        contract_index: number;
        initiator: string;
        transaction_hash: string;
        swap_contract_address: string;
        min_units?: number | null;
        max_units?: number | null;
        visible?: boolean | null;
        archived?: boolean | null;
      };
    }>;
  } | null;
};

export type UpdateSaleMutationVariables = Exact<{
  orderId: Scalars["UUID"]["input"];
  visible: Scalars["Boolean"]["input"];
  archived: Scalars["Boolean"]["input"];
}>;

export type UpdateSaleMutation = {
  __typename: "Mutation";
  updateshare_orderCollection: {
    __typename: "share_orderUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "share_order";
      id: string;
      visible?: boolean | null;
      archived?: boolean | null;
    }>;
  };
};

export type RemoveShareOrderMutationVariables = Exact<{
  orderId: Scalars["UUID"]["input"];
}>;

export type RemoveShareOrderMutation = {
  __typename: "Mutation";
  deleteFromshare_orderCollection: {
    __typename: "share_orderDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "share_order"; id: string }>;
  };
};

export type GetOrganizationQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type GetOrganizationQuery = {
  __typename: "Query";
  organizationCollection?: {
    __typename: "organizationConnection";
    edges: Array<{
      __typename: "organizationEdge";
      node: { __typename: "organization" } & {
        " $fragmentRefs"?: { OrganizationFieldsFragment: OrganizationFieldsFragment };
      };
    }>;
  } | null;
};

export type AddOrganizationMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  logo?: InputMaybe<Scalars["String"]["input"]>;
  shortDescription?: InputMaybe<Scalars["String"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type AddOrganizationMutation = {
  __typename: "Mutation";
  insertIntoorganizationCollection?: {
    __typename: "organizationInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "organization";
      id: string;
      name?: string | null;
      is_public?: boolean | null;
      logo?: string | null;
      website?: string | null;
      country?: string | null;
      short_description?: string | null;
    }>;
  } | null;
};

export type AddOrganizationUserMutationVariables = Exact<{
  userId: Scalars["UUID"]["input"];
  organizationId: Scalars["UUID"]["input"];
  permission?: InputMaybe<
    Array<InputMaybe<OrganizationPermissionType>> | InputMaybe<OrganizationPermissionType>
  >;
}>;

export type AddOrganizationUserMutation = {
  __typename: "Mutation";
  insertIntoorganization_userCollection?: {
    __typename: "organization_userInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "organization_user";
      id: string;
      user_id: string;
      organization_id: string;
      permissions?: Array<OrganizationPermissionType | null> | null;
    }>;
  } | null;
};

export type RemoveOrganizationUserMutationVariables = Exact<{
  organizationUserId: Scalars["UUID"]["input"];
}>;

export type RemoveOrganizationUserMutation = {
  __typename: "Mutation";
  deleteFromorganization_userCollection: {
    __typename: "organization_userDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "organization_user"; id: string }>;
  };
};

export type UpdateOrganizationMutationVariables = Exact<{
  organizationId: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
  logo?: InputMaybe<Scalars["String"]["input"]>;
  bannerImage?: InputMaybe<Scalars["String"]["input"]>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  shortDescription?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateOrganizationMutation = {
  __typename: "Mutation";
  updateorganizationCollection: {
    __typename: "organizationUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "organization";
      id: string;
      name?: string | null;
      is_public?: boolean | null;
      description?: string | null;
      country?: string | null;
      logo?: string | null;
      banner_image?: string | null;
    }>;
  };
};

export type AddNotificationRuleMutationVariables = Exact<{
  organizationUserId: Scalars["UUID"]["input"];
  notificationRecipientType: NotificationRecipientType;
  notificationMethod: NotificationMethod;
  notificationSubject: NotificationSubject;
}>;

export type AddNotificationRuleMutation = {
  __typename: "Mutation";
  insertIntonotification_configurationCollection?: {
    __typename: "notification_configurationInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "notification_configuration";
      id: string;
      notification_recipient_type: NotificationRecipientType;
      notification_method: NotificationMethod;
      notification_subject: NotificationSubject;
      organization_user_id: string;
    }>;
  } | null;
};

export type RemoveNotificationRuleMutationVariables = Exact<{
  notificationConfigurationId: Scalars["UUID"]["input"];
}>;

export type RemoveNotificationRuleMutation = {
  __typename: "Mutation";
  deleteFromnotification_configurationCollection: {
    __typename: "notification_configurationDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "notification_configuration"; id: string }>;
  };
};

export type AddUserEmailMutationVariables = Exact<{
  organizationId: Scalars["UUID"]["input"];
  address: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type AddUserEmailMutation = {
  __typename: "Mutation";
  insertIntoemail_addressCollection?: {
    __typename: "email_addressInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "email_address";
      id: string;
      address: string;
      organization_id: string;
    }>;
  } | null;
};

export type RemoveOrganizationEmailMutationVariables = Exact<{
  emailAddress: Scalars["String"]["input"];
}>;

export type RemoveOrganizationEmailMutation = {
  __typename: "Mutation";
  deleteFromemail_addressCollection: {
    __typename: "email_addressDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "email_address"; id: string }>;
  };
};

export type UpdateUserEmailMutationVariables = Exact<{
  address: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateUserEmailMutation = {
  __typename: "Mutation";
  updateemail_addressCollection: {
    __typename: "email_addressUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "email_address";
      id: string;
      name?: string | null;
      address: string;
      is_public?: boolean | null;
      description?: string | null;
      organization_id: string;
    }>;
  };
};

export type AddOrganizationSocialAccountsMutationVariables = Exact<{
  organizationId: Scalars["UUID"]["input"];
  url: Scalars["String"]["input"];
  type: LinkedAccountType;
}>;

export type AddOrganizationSocialAccountsMutation = {
  __typename: "Mutation";
  insertIntolinked_accountCollection?: {
    __typename: "linked_accountInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "linked_account";
      id: string;
      organization_id: string;
      url: string;
      type?: LinkedAccountType | null;
      verified?: boolean | null;
      hidden?: boolean | null;
    }>;
  } | null;
};

export type RemoveOrganizationSocialAccountMutationVariables = Exact<{
  socialId: Scalars["UUID"]["input"];
}>;

export type RemoveOrganizationSocialAccountMutation = {
  __typename: "Mutation";
  deleteFromlinked_accountCollection: {
    __typename: "linked_accountDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "linked_account"; id: string }>;
  };
};

export type GetRealEstatePropertyQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type GetRealEstatePropertyQuery = {
  __typename: "Query";
  real_estate_propertyCollection?: {
    __typename: "real_estate_propertyConnection";
    edges: Array<{
      __typename: "real_estate_propertyEdge";
      node: { __typename: "real_estate_property" } & {
        " $fragmentRefs"?: { RealEstatePropertyFieldsFragment: RealEstatePropertyFieldsFragment };
      };
    }>;
  } | null;
};

export type AddRePropertyInfoMutationVariables = Exact<{
  entityId: Scalars["UUID"]["input"];
  propertyType: RealEstatePropertyType;
  investmentStatus: AssetStatus;
  amenitiesDescription?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  downPayment?: InputMaybe<Scalars["Int"]["input"]>;
  lenderFees?: InputMaybe<Scalars["Int"]["input"]>;
  closingCosts?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type AddRePropertyInfoMutation = {
  __typename: "Mutation";
  insertIntoreal_estate_propertyCollection?: {
    __typename: "real_estate_propertyInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "real_estate_property";
      id: string;
      investment_status?: AssetStatus | null;
    }>;
  } | null;
};

export type UpdateRePropertyInfoMutationVariables = Exact<{
  rePropertyId: Scalars["UUID"]["input"];
  propertyType: RealEstatePropertyType;
  investmentStatus: AssetStatus;
  amenitiesDescription?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  assetValue?: InputMaybe<Scalars["Int"]["input"]>;
  assetValueNote?: InputMaybe<Scalars["String"]["input"]>;
  downPayment?: InputMaybe<Scalars["Int"]["input"]>;
  lenderFees?: InputMaybe<Scalars["Int"]["input"]>;
  closingCosts?: InputMaybe<Scalars["Int"]["input"]>;
  loanAmount?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type UpdateRePropertyInfoMutation = {
  __typename: "Mutation";
  updatereal_estate_propertyCollection: {
    __typename: "real_estate_propertyUpdateResponse";
    affectedCount: number;
    records: Array<{
      __typename: "real_estate_property";
      id: string;
      investment_status?: AssetStatus | null;
      amenities_description?: string | null;
      description?: string | null;
      asset_value?: number | null;
      asset_value_note?: string | null;
      down_payment?: number | null;
      lender_fees?: number | null;
      closing_costs?: number | null;
      loan?: number | null;
      owner_id: string;
    }>;
  };
};

export type RemoveRePropertyMutationVariables = Exact<{
  propertyId: Scalars["UUID"]["input"];
}>;

export type RemoveRePropertyMutation = {
  __typename: "Mutation";
  deleteFromreal_estate_propertyCollection: {
    __typename: "real_estate_propertyDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "real_estate_property"; id: string }>;
  };
};

export type AddPropertyAddressMutationVariables = Exact<{
  propertyId: Scalars["UUID"]["input"];
  addressLabel?: InputMaybe<Scalars["String"]["input"]>;
  addressLine1: Scalars["String"]["input"];
  addressLine2?: InputMaybe<Scalars["String"]["input"]>;
  addressLine3?: InputMaybe<Scalars["String"]["input"]>;
  city: Scalars["String"]["input"];
  stateProvince?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  country: Scalars["String"]["input"];
}>;

export type AddPropertyAddressMutation = {
  __typename: "Mutation";
  insertIntoaddressCollection?: {
    __typename: "addressInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "address";
      id: string;
      label?: string | null;
      line1?: string | null;
    }>;
  } | null;
};

export type RemovePropertyAddressMutationVariables = Exact<{
  geoAddressId: Scalars["UUID"]["input"];
}>;

export type RemovePropertyAddressMutation = {
  __typename: "Mutation";
  deleteFromaddressCollection: {
    __typename: "addressDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "address"; id: string }>;
  };
};

export type AddPropertyImageMutationVariables = Exact<{
  url: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  fileId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type AddPropertyImageMutation = {
  __typename: "Mutation";
  insertIntoimageCollection?: {
    __typename: "imageInsertResponse";
    affectedCount: number;
    records: Array<{
      __typename: "image";
      id: string;
      label?: string | null;
      url: string;
      file_id?: string | null;
    }>;
  } | null;
};

export type RemovePropertyImageMutationVariables = Exact<{
  imageId: Scalars["UUID"]["input"];
}>;

export type RemovePropertyImageMutation = {
  __typename: "Mutation";
  deleteFromimageCollection: {
    __typename: "imageDeleteResponse";
    affectedCount: number;
    records: Array<{ __typename: "image"; id: string }>;
  };
};

export type GetUserProfileQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type GetUserProfileQuery = {
  __typename: "Query";
  profileCollection?: {
    __typename: "profileConnection";
    edges: Array<{
      __typename: "profileEdge";
      node: { __typename: "profile"; id: string; name?: string | null; image?: string | null };
    }>;
  } | null;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type GetUserQuery = {
  __typename: "Query";
  profileCollection?: {
    __typename: "profileConnection";
    edges: Array<{
      __typename: "profileEdge";
      node: { __typename: "profile"; id: string; name?: string | null };
    }>;
  } | null;
  organization_userCollection?: {
    __typename: "organization_userConnection";
    edges: Array<{
      __typename: "organization_userEdge";
      node: {
        __typename: "organization_user";
        organization?:
          | ({ __typename: "organization" } & {
              " $fragmentRefs"?: { OrganizationFieldsFragment: OrganizationFieldsFragment };
            })
          | null;
      };
    }>;
  } | null;
};

export type GetUserRoleQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type GetUserRoleQuery = {
  __typename: "Query";
  organization_userCollection?: {
    __typename: "organization_userConnection";
    edges: Array<{
      __typename: "organization_userEdge";
      node: {
        __typename: "organization_user";
        permissions?: Array<OrganizationPermissionType | null> | null;
        organization?:
          | ({ __typename: "organization" } & {
              " $fragmentRefs"?: { OrganizationFieldsFragment: OrganizationFieldsFragment };
            })
          | null;
      };
    }>;
  } | null;
};

export const LinkedAccountFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LinkedAccountFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "linked_account" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "account_provided_id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "verified" } },
          { kind: "Field", name: { kind: "Name", value: "hidden" } },
          { kind: "Field", name: { kind: "Name", value: "organization_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LinkedAccountFieldsFragment, unknown>;
export const AddressFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AddressFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "address" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "line1" } },
          { kind: "Field", name: { kind: "Name", value: "line2" } },
          { kind: "Field", name: { kind: "Name", value: "line3" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "state_province" } },
          { kind: "Field", name: { kind: "Name", value: "postal_code" } },
          { kind: "Field", name: { kind: "Name", value: "country" } },
          { kind: "Field", name: { kind: "Name", value: "lat" } },
          { kind: "Field", name: { kind: "Name", value: "lng" } },
          { kind: "Field", name: { kind: "Name", value: "legal_entity_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddressFieldsFragment, unknown>;
export const DocumentFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DocumentFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "document" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "file_id" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "format" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "text" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "thumbnail_image_id" } },
          { kind: "Field", name: { kind: "Name", value: "owner_id" } },
          { kind: "Field", name: { kind: "Name", value: "access" } },
          { kind: "Field", name: { kind: "Name", value: "offering_id" } },
          { kind: "Field", name: { kind: "Name", value: "offering_unique_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DocumentFieldsFragment, unknown>;
export const ApplicationFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ApplicationFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "investor_application" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "offering_participant_id" } },
          { kind: "Field", name: { kind: "Name", value: "application_doc_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ApplicationFieldsFragment, unknown>;
export const SmartContractFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "SmartContractFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "smart_contract" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "crypto_address_id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "num_tokens_authorized" } },
          { kind: "Field", name: { kind: "Name", value: "backing_token" } },
          { kind: "Field", name: { kind: "Name", value: "owner_id" } },
          { kind: "Field", name: { kind: "Name", value: "established" } },
          { kind: "Field", name: { kind: "Name", value: "partitions" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SmartContractFieldsFragment, unknown>;
export const SmartContractSetFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "SmartContractSetFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "offering_smart_contract_set" }
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "offering_id" } },
          { kind: "Field", name: { kind: "Name", value: "share_contract_id" } },
          { kind: "Field", name: { kind: "Name", value: "swap_contract_id" } },
          { kind: "Field", name: { kind: "Name", value: "distribution_contract_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SmartContractSetFieldsFragment, unknown>;
export const OfferingDetailsFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OfferingDetailsFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "offering_detail" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "custom_onboarding_link" } },
          { kind: "Field", name: { kind: "Name", value: "stage" } },
          { kind: "Field", name: { kind: "Name", value: "investment_currency" } },
          { kind: "Field", name: { kind: "Name", value: "num_units" } },
          { kind: "Field", name: { kind: "Name", value: "min_units_per_investor" } },
          { kind: "Field", name: { kind: "Name", value: "max_units_per_investor" } },
          { kind: "Field", name: { kind: "Name", value: "max_raise" } },
          { kind: "Field", name: { kind: "Name", value: "min_raise" } },
          { kind: "Field", name: { kind: "Name", value: "price_start" } },
          { kind: "Field", name: { kind: "Name", value: "max_investors" } },
          { kind: "Field", name: { kind: "Name", value: "min_investors" } },
          { kind: "Field", name: { kind: "Name", value: "raise_start" } },
          { kind: "Field", name: { kind: "Name", value: "raise_period" } },
          { kind: "Field", name: { kind: "Name", value: "additional_info" } },
          { kind: "Field", name: { kind: "Name", value: "distribution_period" } },
          { kind: "Field", name: { kind: "Name", value: "distribution_frequency" } },
          { kind: "Field", name: { kind: "Name", value: "distribution_currency" } },
          { kind: "Field", name: { kind: "Name", value: "distribution_description" } },
          { kind: "Field", name: { kind: "Name", value: "admin_expense" } },
          { kind: "Field", name: { kind: "Name", value: "projected_irr" } },
          { kind: "Field", name: { kind: "Name", value: "projected_irr_max" } },
          { kind: "Field", name: { kind: "Name", value: "target_equity_multiple" } },
          { kind: "Field", name: { kind: "Name", value: "target_equity_multiple_max" } },
          { kind: "Field", name: { kind: "Name", value: "preferred_return" } },
          { kind: "Field", name: { kind: "Name", value: "coc_return" } },
          { kind: "Field", name: { kind: "Name", value: "projected_appreciation" } },
          { kind: "Field", name: { kind: "Name", value: "cap_rate" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<OfferingDetailsFieldsFragment, unknown>;
export const RealEstatePropertyFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RealEstatePropertyFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "real_estate_property" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "property_type" } },
          { kind: "Field", name: { kind: "Name", value: "investment_status" } },
          { kind: "Field", name: { kind: "Name", value: "address_id" } },
          { kind: "Field", name: { kind: "Name", value: "amenities_description" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "asset_value" } },
          { kind: "Field", name: { kind: "Name", value: "asset_value_note" } },
          { kind: "Field", name: { kind: "Name", value: "loan" } },
          { kind: "Field", name: { kind: "Name", value: "down_payment" } },
          { kind: "Field", name: { kind: "Name", value: "lender_fees" } },
          { kind: "Field", name: { kind: "Name", value: "closing_costs" } },
          { kind: "Field", name: { kind: "Name", value: "owner_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RealEstatePropertyFieldsFragment, unknown>;
export const OfferingParticipantFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OfferingParticipantFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "offering_participant" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "address_offering_id" } },
          { kind: "Field", name: { kind: "Name", value: "wallet_address" } },
          { kind: "Field", name: { kind: "Name", value: "chain_id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "external_id" } },
          { kind: "Field", name: { kind: "Name", value: "min_pledge" } },
          { kind: "Field", name: { kind: "Name", value: "max_pledge" } },
          { kind: "Field", name: { kind: "Name", value: "offering_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<OfferingParticipantFieldsFragment, unknown>;
export const LegalEntityFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LegalEntityFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "legal_entity" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "tax_id" } },
          { kind: "Field", name: { kind: "Name", value: "display_name" } },
          { kind: "Field", name: { kind: "Name", value: "legal_name" } },
          { kind: "Field", name: { kind: "Name", value: "purpose" } },
          { kind: "Field", name: { kind: "Name", value: "jurisdiction_id" } },
          { kind: "Field", name: { kind: "Name", value: "operating_currency" } },
          { kind: "Field", name: { kind: "Name", value: "organization_id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<LegalEntityFieldsFragment, unknown>;
export const OfferingFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OfferingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "offering" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          { kind: "Field", name: { kind: "Name", value: "access_code" } },
          { kind: "Field", name: { kind: "Name", value: "waitlist_on" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "image" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "file_id" } }
              ]
            }
          },
          { kind: "Field", name: { kind: "Name", value: "banner_image" } },
          { kind: "Field", name: { kind: "Name", value: "primary_video" } },
          { kind: "Field", name: { kind: "Name", value: "brand_color" } },
          { kind: "Field", name: { kind: "Name", value: "light_brand" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "short_description" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<OfferingFieldsFragment, unknown>;
export const OrganizationFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrganizationFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "organization" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "logo" } },
          { kind: "Field", name: { kind: "Name", value: "brand_color" } },
          { kind: "Field", name: { kind: "Name", value: "banner_image" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
          { kind: "Field", name: { kind: "Name", value: "country" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<OrganizationFieldsFragment, unknown>;
export const UserFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "profile" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const DocumentSignatoryFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DocumentSignatoryFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "document_signatory" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "document_id" } },
          { kind: "Field", name: { kind: "Name", value: "signer_address" } },
          { kind: "Field", name: { kind: "Name", value: "legal_entity_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DocumentSignatoryFieldsFragment, unknown>;
export const GetCryptoAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCryptoAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "walletAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "crypto_addressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "walletAddress" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "address" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "legal_entity" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "__typename" } },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "legal_name" } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCryptoAddressQuery, GetCryptoAddressQueryVariables>;
export const UpdateCryptoAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCryptoAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "isPublic" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updatecrypto_addressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: { kind: "Variable", name: { kind: "Name", value: "name" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "is_public" },
                      value: { kind: "Variable", name: { kind: "Name", value: "isPublic" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "address" } },
                      { kind: "Field", name: { kind: "Name", value: "is_public" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "legal_entity_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCryptoAddressMutation, UpdateCryptoAddressMutationVariables>;
export const AddContractPartitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddContractPartition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "partition" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updatesmart_contractCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "partitions" },
                      value: {
                        kind: "ListValue",
                        values: [{ kind: "Variable", name: { kind: "Name", value: "partition" } }]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "partitions" } },
                      { kind: "Field", name: { kind: "Name", value: "owner_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddContractPartitionMutation, AddContractPartitionMutationVariables>;
export const AddShareContractDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddShareContract" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cryptoAddressId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ownerId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "smart_contract_type" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntosmart_contractCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "crypto_address_id" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "cryptoAddressId" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "owner_id" },
                          value: { kind: "Variable", name: { kind: "Name", value: "ownerId" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "type" },
                          value: { kind: "Variable", name: { kind: "Name", value: "type" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "established" },
                          value: { kind: "BooleanValue", value: false }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "owner_id" } },
                      { kind: "Field", name: { kind: "Name", value: "crypto_address_id" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "established" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddShareContractMutation, AddShareContractMutationVariables>;
export const AddSwapContractDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddSwapContract" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "contractSetId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "swapContractId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateoffering_smart_contract_setCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "contractSetId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "swap_contract_id" },
                      value: { kind: "Variable", name: { kind: "Name", value: "swapContractId" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "swap_contract_id" } },
                      { kind: "Field", name: { kind: "Name", value: "offering_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddSwapContractMutation, AddSwapContractMutationVariables>;
export const AddDistributionContractDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddDistributionContract" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "contractSetId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "distributionContractId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateoffering_smart_contract_setCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "contractSetId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "distribution_contract_id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "distributionContractId" }
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "distribution_contract_id" } },
                      { kind: "Field", name: { kind: "Name", value: "offering_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AddDistributionContractMutation,
  AddDistributionContractMutationVariables
>;
export const UpdateSmartContractDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSmartContract" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "established" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updatesmart_contractCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "established" },
                      value: { kind: "Variable", name: { kind: "Name", value: "established" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "owner_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateSmartContractMutation, UpdateSmartContractMutationVariables>;
export const RetrieveTransferEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RetrieveTransferEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "shareContractAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "share_transfer_eventCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "share_contract_address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "shareContractAddress" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "share_contract_address" }
                            },
                            { kind: "Field", name: { kind: "Name", value: "order_index" } },
                            { kind: "Field", name: { kind: "Name", value: "recipient_address" } },
                            { kind: "Field", name: { kind: "Name", value: "sender_address" } },
                            { kind: "Field", name: { kind: "Name", value: "amount" } },
                            { kind: "Field", name: { kind: "Name", value: "price" } },
                            { kind: "Field", name: { kind: "Name", value: "currency_code" } },
                            { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
                            { kind: "Field", name: { kind: "Name", value: "partition" } },
                            { kind: "Field", name: { kind: "Name", value: "type" } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RetrieveTransferEventsQuery, RetrieveTransferEventsQueryVariables>;
export const AddTransferEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddTransferEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "shareContractAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderIndex" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "recipientAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "senderAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "amount" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "price" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "currencyCode" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "currency_code" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "transactionHash" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "partition" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "share_transfer_event_type" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoshare_transfer_eventCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "share_contract_address" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "shareContractAddress" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "order_index" },
                          value: { kind: "Variable", name: { kind: "Name", value: "orderIndex" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "recipient_address" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "recipientAddress" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "sender_address" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "senderAddress" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "amount" },
                          value: { kind: "Variable", name: { kind: "Name", value: "amount" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "price" },
                          value: { kind: "Variable", name: { kind: "Name", value: "price" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "currency_code" },
                          value: { kind: "Variable", name: { kind: "Name", value: "currencyCode" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "transaction_hash" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "transactionHash" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "partition" },
                          value: { kind: "Variable", name: { kind: "Name", value: "partition" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "type" },
                          value: { kind: "Variable", name: { kind: "Name", value: "type" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "archived" },
                          value: { kind: "BooleanValue", value: false }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "share_contract_address" } },
                      { kind: "Field", name: { kind: "Name", value: "order_index" } },
                      { kind: "Field", name: { kind: "Name", value: "recipient_address" } },
                      { kind: "Field", name: { kind: "Name", value: "sender_address" } },
                      { kind: "Field", name: { kind: "Name", value: "amount" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      { kind: "Field", name: { kind: "Name", value: "currency_code" } },
                      { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
                      { kind: "Field", name: { kind: "Name", value: "partition" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddTransferEventMutation, AddTransferEventMutationVariables>;
export const AddDistributionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddDistribution" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "transactionHash" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "contractIndex" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntooffering_distributionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "transaction_hash" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "transactionHash" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "contract_index" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "contractIndex" }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
                      { kind: "Field", name: { kind: "Name", value: "contract_index" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddDistributionMutation, AddDistributionMutationVariables>;
export const UpdateOfferingDistributionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateOfferingDistribution" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "distributionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "contractIndex" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateoffering_distributionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "distributionId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "contract_index" },
                      value: { kind: "Variable", name: { kind: "Name", value: "contractIndex" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
                      { kind: "Field", name: { kind: "Name", value: "contract_index" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  UpdateOfferingDistributionMutation,
  UpdateOfferingDistributionMutationVariables
>;
export const UpdateContractStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateContractStatus" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "smartshareContractId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "established" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updatesmart_contractCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "smartshareContractId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "established" },
                      value: { kind: "Variable", name: { kind: "Name", value: "established" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "established" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateContractStatusMutation, UpdateContractStatusMutationVariables>;
export const CreateOrderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateOrder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "contractIndex" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "swapContractAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "minUnits" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "maxUnits" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "visible" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "initiator" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "transactionHash" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoshare_orderCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "contract_index" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "contractIndex" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "swap_contract_address" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "swapContractAddress" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "min_units" },
                          value: { kind: "Variable", name: { kind: "Name", value: "minUnits" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "max_units" },
                          value: { kind: "Variable", name: { kind: "Name", value: "maxUnits" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "initiator" },
                          value: { kind: "Variable", name: { kind: "Name", value: "initiator" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "transaction_hash" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "transactionHash" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "visible" },
                          value: { kind: "Variable", name: { kind: "Name", value: "visible" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "archived" },
                          value: { kind: "BooleanValue", value: false }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "contract_index" } },
                      { kind: "Field", name: { kind: "Name", value: "initiator" } },
                      { kind: "Field", name: { kind: "Name", value: "transaction_hash" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const RetrieveOrdersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RetrieveOrders" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "swapContractAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "share_orderCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "swap_contract_address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "swapContractAddress" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "contract_index" } },
                            { kind: "Field", name: { kind: "Name", value: "initiator" } },
                            { kind: "Field", name: { kind: "Name", value: "transaction_hash" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "swap_contract_address" }
                            },
                            { kind: "Field", name: { kind: "Name", value: "min_units" } },
                            { kind: "Field", name: { kind: "Name", value: "max_units" } },
                            { kind: "Field", name: { kind: "Name", value: "visible" } },
                            { kind: "Field", name: { kind: "Name", value: "archived" } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RetrieveOrdersQuery, RetrieveOrdersQueryVariables>;
export const UpdateSaleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSale" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "visible" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "archived" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateshare_orderCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "orderId" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "archived" },
                      value: { kind: "Variable", name: { kind: "Name", value: "archived" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visible" },
                      value: { kind: "Variable", name: { kind: "Name", value: "visible" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "visible" } },
                      { kind: "Field", name: { kind: "Name", value: "archived" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const RemoveShareOrderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveShareOrder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromshare_orderCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "orderId" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveShareOrderMutation, RemoveShareOrderMutationVariables>;
export const GetOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organizationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "OrganizationFields" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrganizationFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "organization" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "logo" } },
          { kind: "Field", name: { kind: "Name", value: "brand_color" } },
          { kind: "Field", name: { kind: "Name", value: "banner_image" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
          { kind: "Field", name: { kind: "Name", value: "country" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const AddOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "logo" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "shortDescription" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "website" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "country" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoorganizationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "name" },
                          value: { kind: "Variable", name: { kind: "Name", value: "name" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "is_public" },
                          value: { kind: "BooleanValue", value: false }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "logo" },
                          value: { kind: "Variable", name: { kind: "Name", value: "logo" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "website" },
                          value: { kind: "Variable", name: { kind: "Name", value: "website" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "country" },
                          value: { kind: "Variable", name: { kind: "Name", value: "country" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "short_description" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "shortDescription" }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "is_public" } },
                      { kind: "Field", name: { kind: "Name", value: "logo" } },
                      { kind: "Field", name: { kind: "Name", value: "website" } },
                      { kind: "Field", name: { kind: "Name", value: "country" } },
                      { kind: "Field", name: { kind: "Name", value: "short_description" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddOrganizationMutation, AddOrganizationMutationVariables>;
export const AddOrganizationUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddOrganizationUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "permission" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "organization_permission_type" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoorganization_userCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "user_id" },
                          value: { kind: "Variable", name: { kind: "Name", value: "userId" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "organization_id" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "organizationId" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "permissions" },
                          value: { kind: "Variable", name: { kind: "Name", value: "permission" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "user_id" } },
                      { kind: "Field", name: { kind: "Name", value: "organization_id" } },
                      { kind: "Field", name: { kind: "Name", value: "permissions" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddOrganizationUserMutation, AddOrganizationUserMutationVariables>;
export const RemoveOrganizationUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveOrganizationUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationUserId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromorganization_userCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "organizationUserId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  RemoveOrganizationUserMutation,
  RemoveOrganizationUserMutationVariables
>;
export const UpdateOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "logo" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "bannerImage" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "isPublic" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "shortDescription" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "country" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateorganizationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "organizationId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: { kind: "Variable", name: { kind: "Name", value: "name" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "logo" },
                      value: { kind: "Variable", name: { kind: "Name", value: "logo" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "banner_image" },
                      value: { kind: "Variable", name: { kind: "Name", value: "bannerImage" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "is_public" },
                      value: { kind: "Variable", name: { kind: "Name", value: "isPublic" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "short_description" },
                      value: { kind: "Variable", name: { kind: "Name", value: "shortDescription" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "description" },
                      value: { kind: "Variable", name: { kind: "Name", value: "description" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "country" },
                      value: { kind: "Variable", name: { kind: "Name", value: "country" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "is_public" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "country" } },
                      { kind: "Field", name: { kind: "Name", value: "logo" } },
                      { kind: "Field", name: { kind: "Name", value: "banner_image" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const AddNotificationRuleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddNotificationRule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationUserId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notificationRecipientType" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "notification_recipient_type" }
            }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "notificationMethod" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "notification_method" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "notificationSubject" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "notification_subject" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntonotification_configurationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "organization_user_id" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "organizationUserId" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "notification_recipient_type" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "notificationRecipientType" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "notification_method" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "notificationMethod" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "notification_subject" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "notificationSubject" }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "notification_recipient_type" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "notification_method" } },
                      { kind: "Field", name: { kind: "Name", value: "notification_subject" } },
                      { kind: "Field", name: { kind: "Name", value: "organization_user_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddNotificationRuleMutation, AddNotificationRuleMutationVariables>;
export const RemoveNotificationRuleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveNotificationRule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notificationConfigurationId" }
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromnotification_configurationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "notificationConfigurationId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  RemoveNotificationRuleMutation,
  RemoveNotificationRuleMutationVariables
>;
export const AddUserEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddUserEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "isPublic" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoemail_addressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "organization_id" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "organizationId" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "address" },
                          value: { kind: "Variable", name: { kind: "Name", value: "address" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "name" },
                          value: { kind: "Variable", name: { kind: "Name", value: "name" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "description" },
                          value: { kind: "Variable", name: { kind: "Name", value: "description" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "is_public" },
                          value: { kind: "Variable", name: { kind: "Name", value: "isPublic" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "address" } },
                      { kind: "Field", name: { kind: "Name", value: "organization_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddUserEmailMutation, AddUserEmailMutationVariables>;
export const RemoveOrganizationEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveOrganizationEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "emailAddress" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromemail_addressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "emailAddress" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  RemoveOrganizationEmailMutation,
  RemoveOrganizationEmailMutationVariables
>;
export const UpdateUserEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "isPublic" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateemail_addressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "address" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "address" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: { kind: "Variable", name: { kind: "Name", value: "name" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "description" },
                      value: { kind: "Variable", name: { kind: "Name", value: "description" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "is_public" },
                      value: { kind: "Variable", name: { kind: "Name", value: "isPublic" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "address" } },
                      { kind: "Field", name: { kind: "Name", value: "is_public" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "organization_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>;
export const AddOrganizationSocialAccountsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddOrganizationSocialAccounts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "linked_account_type" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntolinked_accountCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "organization_id" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "organizationId" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "url" },
                          value: { kind: "Variable", name: { kind: "Name", value: "url" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "type" },
                          value: { kind: "Variable", name: { kind: "Name", value: "type" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "organization_id" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "verified" } },
                      { kind: "Field", name: { kind: "Name", value: "hidden" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AddOrganizationSocialAccountsMutation,
  AddOrganizationSocialAccountsMutationVariables
>;
export const RemoveOrganizationSocialAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveOrganizationSocialAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "socialId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromlinked_accountCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "socialId" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  RemoveOrganizationSocialAccountMutation,
  RemoveOrganizationSocialAccountMutationVariables
>;
export const GetRealEstatePropertyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRealEstateProperty" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "real_estate_propertyCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "RealEstatePropertyFields" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RealEstatePropertyFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "real_estate_property" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "property_type" } },
          { kind: "Field", name: { kind: "Name", value: "investment_status" } },
          { kind: "Field", name: { kind: "Name", value: "address_id" } },
          { kind: "Field", name: { kind: "Name", value: "amenities_description" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "asset_value" } },
          { kind: "Field", name: { kind: "Name", value: "asset_value_note" } },
          { kind: "Field", name: { kind: "Name", value: "loan" } },
          { kind: "Field", name: { kind: "Name", value: "down_payment" } },
          { kind: "Field", name: { kind: "Name", value: "lender_fees" } },
          { kind: "Field", name: { kind: "Name", value: "closing_costs" } },
          { kind: "Field", name: { kind: "Name", value: "owner_id" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetRealEstatePropertyQuery, GetRealEstatePropertyQueryVariables>;
export const AddRePropertyInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddRePropertyInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "entityId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "propertyType" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "real_estate_property_type" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "investmentStatus" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "asset_status" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "amenitiesDescription" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "downPayment" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "lenderFees" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "closingCosts" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoreal_estate_propertyCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "owner_id" },
                          value: { kind: "Variable", name: { kind: "Name", value: "entityId" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "property_type" },
                          value: { kind: "Variable", name: { kind: "Name", value: "propertyType" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "investment_status" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "investmentStatus" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "amenities_description" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "amenitiesDescription" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "description" },
                          value: { kind: "Variable", name: { kind: "Name", value: "description" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "down_payment" },
                          value: { kind: "Variable", name: { kind: "Name", value: "downPayment" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "lender_fees" },
                          value: { kind: "Variable", name: { kind: "Name", value: "lenderFees" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "closing_costs" },
                          value: { kind: "Variable", name: { kind: "Name", value: "closingCosts" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "investment_status" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddRePropertyInfoMutation, AddRePropertyInfoMutationVariables>;
export const UpdateRePropertyInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRePropertyInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rePropertyId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "propertyType" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "real_estate_property_type" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "investmentStatus" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "asset_status" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "amenitiesDescription" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "assetValue" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "assetValueNote" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "downPayment" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "lenderFees" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "closingCosts" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "loanAmount" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updatereal_estate_propertyCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "rePropertyId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "property_type" },
                      value: { kind: "Variable", name: { kind: "Name", value: "propertyType" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "investment_status" },
                      value: { kind: "Variable", name: { kind: "Name", value: "investmentStatus" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "amenities_description" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "amenitiesDescription" }
                      }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "description" },
                      value: { kind: "Variable", name: { kind: "Name", value: "description" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "asset_value" },
                      value: { kind: "Variable", name: { kind: "Name", value: "assetValue" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "asset_value_note" },
                      value: { kind: "Variable", name: { kind: "Name", value: "assetValueNote" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "down_payment" },
                      value: { kind: "Variable", name: { kind: "Name", value: "downPayment" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "lender_fees" },
                      value: { kind: "Variable", name: { kind: "Name", value: "lenderFees" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "closing_costs" },
                      value: { kind: "Variable", name: { kind: "Name", value: "closingCosts" } }
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "loan" },
                      value: { kind: "Variable", name: { kind: "Name", value: "loanAmount" } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "investment_status" } },
                      { kind: "Field", name: { kind: "Name", value: "amenities_description" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "asset_value" } },
                      { kind: "Field", name: { kind: "Name", value: "asset_value_note" } },
                      { kind: "Field", name: { kind: "Name", value: "down_payment" } },
                      { kind: "Field", name: { kind: "Name", value: "lender_fees" } },
                      { kind: "Field", name: { kind: "Name", value: "closing_costs" } },
                      { kind: "Field", name: { kind: "Name", value: "loan" } },
                      { kind: "Field", name: { kind: "Name", value: "owner_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateRePropertyInfoMutation, UpdateRePropertyInfoMutationVariables>;
export const RemoveRePropertyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveReProperty" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "propertyId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromreal_estate_propertyCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "propertyId" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveRePropertyMutation, RemoveRePropertyMutationVariables>;
export const AddPropertyAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddPropertyAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "propertyId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "addressLabel" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "addressLine1" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "addressLine2" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "addressLine3" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "stateProvince" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "postalCode" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "country" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoaddressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "label" },
                          value: { kind: "Variable", name: { kind: "Name", value: "addressLabel" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "line1" },
                          value: { kind: "Variable", name: { kind: "Name", value: "addressLine1" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "line2" },
                          value: { kind: "Variable", name: { kind: "Name", value: "addressLine2" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "line3" },
                          value: { kind: "Variable", name: { kind: "Name", value: "addressLine3" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "city" },
                          value: { kind: "Variable", name: { kind: "Name", value: "city" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "state_province" },
                          value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "stateProvince" }
                          }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "postal_code" },
                          value: { kind: "Variable", name: { kind: "Name", value: "postalCode" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "country" },
                          value: { kind: "Variable", name: { kind: "Name", value: "country" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "line1" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddPropertyAddressMutation, AddPropertyAddressMutationVariables>;
export const RemovePropertyAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemovePropertyAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "geoAddressId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromaddressCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "geoAddressId" }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemovePropertyAddressMutation, RemovePropertyAddressMutationVariables>;
export const AddPropertyImageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddPropertyImage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
          }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "label" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fileId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "insertIntoimageCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "url" },
                          value: { kind: "Variable", name: { kind: "Name", value: "url" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "label" },
                          value: { kind: "Variable", name: { kind: "Name", value: "label" } }
                        },
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "file_id" },
                          value: { kind: "Variable", name: { kind: "Name", value: "fileId" } }
                        }
                      ]
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "file_id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AddPropertyImageMutation, AddPropertyImageMutationVariables>;
export const RemovePropertyImageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemovePropertyImage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "imageId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFromimageCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "imageId" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "affectedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "records" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemovePropertyImageMutation, RemovePropertyImageMutationVariables>;
export const GetUserProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "profileCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "image" } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "profileCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization_userCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "__typename" } },
                                  {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "OrganizationFields" }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrganizationFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "organization" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "logo" } },
          { kind: "Field", name: { kind: "Name", value: "brand_color" } },
          { kind: "Field", name: { kind: "Name", value: "banner_image" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
          { kind: "Field", name: { kind: "Name", value: "country" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization_userCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: { kind: "Variable", name: { kind: "Name", value: "id" } }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            { kind: "Field", name: { kind: "Name", value: "permissions" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "__typename" } },
                                  {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "OrganizationFields" }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrganizationFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "organization" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "logo" } },
          { kind: "Field", name: { kind: "Name", value: "brand_color" } },
          { kind: "Field", name: { kind: "Name", value: "banner_image" } },
          { kind: "Field", name: { kind: "Name", value: "website" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
          { kind: "Field", name: { kind: "Name", value: "country" } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserRoleQuery, GetUserRoleQueryVariables>;
