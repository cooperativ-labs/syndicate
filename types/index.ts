import { Constants, Database } from "@/types/database.types";

export type RealEstateProperty =
  Database["public"]["Tables"]["real_estate_property"]["Row"];
export type CryptoAddress =
  Database["public"]["Tables"]["crypto_address"]["Row"];
export type SmartContract =
  Database["public"]["Tables"]["smart_contract"]["Row"];
export type Organization = Database["public"]["Tables"]["organization"]["Row"];
export type LegalEntity = Database["public"]["Tables"]["legal_entity"]["Row"];
export type Offering = Database["public"]["Tables"]["offering"]["Row"];
export type OrganizationUser =
  Database["public"]["Tables"]["organization_user"]["Row"];
export type Address = Database["public"]["Tables"]["address"]["Row"];
export type OfferingParticipant =
  Database["public"]["Tables"]["offering_participant"]["Row"];
export type Document = Database["public"]["Tables"]["document"]["Row"];
export type LinkedAccount =
  Database["public"]["Tables"]["linked_account"]["Row"];
export type EmailAddress = Database["public"]["Tables"]["email_address"]["Row"];
export type NotificationConfiguration =
  Database["public"]["Tables"]["notification_configuration"]["Row"];
export type OfferingDescriptionText =
  Database["public"]["Tables"]["offering_description_text"]["Row"];
export type ShareOrder = Database["public"]["Tables"]["share_order"]["Row"];

export type Image = {
  id: string;
  label: string;
  url: string | null;
  created_at: string;
  updated_at: string;
  // metadata: {
  //   width: number;
  //   height: number;
  //   format: string;
  //   size: number;
  // };
};
export type InvestorApplication =
  Database["public"]["Tables"]["investor_application"]["Row"];
export type ShareTransferEvent =
  Database["public"]["Tables"]["share_transfer_event"]["Row"];
export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Jurisdiction = Database["public"]["Tables"]["jurisdiction"]["Row"];
export type OfferingDistribution =
  Database["public"]["Tables"]["offering_distribution"]["Row"];
export type WhitelistTransaction =
  Database["public"]["Tables"]["whitelist_transaction"]["Row"];
export type RevalidationPath = {
  path: string;
  type?: "page" | "layout" | undefined;
};

export type SmartContractWithCryptoAddress = SmartContract & {
  cryptoAddress: CryptoAddress;
};
export type OfferingSmartContractSet = {
  id: string;
  swapContract: SmartContractWithCryptoAddress;
  distributionContract: SmartContractWithCryptoAddress;
  shareContract: SmartContractWithCryptoAddress;
};

export type RealEstatePropertyWithAddress = RealEstateProperty & {
  address: Address | null;
};

export type RealEstatePropertyWithAssets = RealEstatePropertyWithAddress & {
  // documents: { id: string; label: string; url: string; created_at: string }[];
  images: Image[];
};

// =========== ORGANIZATION USER ================
export type BaseOrganizationUser = {
  id: string;
  user_id: string;
  permissions: OrganizationPermissionTypes[] | undefined | null;
};

export type OrganizationUserWithProfile = OrganizationUser & {
  profile: Profile;
};

export type EnrichedOfferingParticipant = OfferingParticipant & {
  investorApplication?: InvestorApplication & {
    applicationDoc: Document;
  };
  jurisdiction?: Jurisdiction;
  whitelistTransactions: WhitelistTransaction[];
};

// =========== OFFERING ================

export type OfferingWithParticipants = Offering & {
  participants: (OfferingParticipant & {
    walletAddress?: string;
  })[];
};

export type OfferingWithLegalEntity = OfferingWithParticipants & {
  legalEntity: LegalEntityWithAddresses & {
    owners: { legal_name: string }[];
  };
};

export type OfferingFull =
  & OfferingWithParticipants
  & OfferingWithLegalEntity
  & {
    // images: Image[];
    descriptions: OfferingDescriptionText[];
    offeringSmartContracts: OfferingSmartContractSet | null;
    distributions: OfferingDistribution[];
    participants: EnrichedOfferingParticipant[];
  };

// =========== LEGAL ENTITY ================
export type LegalEntityWithAddresses = LegalEntity & {
  addresses: Address[];
};

export type LegalEntityWithOffering = LegalEntityWithAddresses & {
  organizationId: string;
  offerings: OfferingWithParticipants[];
};

export type LegalEntityWithJurisdiction = LegalEntityWithOffering & {
  jurisdiction: Jurisdiction;
};

export type LegalEntityWithSubsidiaries = LegalEntityWithJurisdiction & {
  subsidiaries: LegalEntityWithJurisdiction[];
  owners: LegalEntityWithJurisdiction[];
};

export type LegalEntityFull = LegalEntityWithSubsidiaries & {
  offerings: OfferingFull[];
  participants: OfferingParticipant & {
    walletAddress?: string;
    emailAddress?: string;
  }[];
  organization: {
    id: string;
    organizationUsers: BaseOrganizationUser[];
  };
};

// =========== ORGANIZATION ================
export type OrganizationWithUsers = Organization & {
  organizationUsers: BaseOrganizationUser[];
};

export type OrganizationWithLegalEntities = OrganizationWithUsers & {
  legalEntities: LegalEntityWithOffering[];
};

export type OrganizationComplete = OrganizationWithUsers & {
  legalEntities: LegalEntityFull[];
  linkedAccounts: LinkedAccount[];
  emailAddresses: EmailAddress[];
  organizationUsers: OrganizationUserWithProfile[];
};

// ENUM types

export type OrganizationPermissionTypes =
  Database["public"]["Enums"]["organization_permission_type"];
export const OrganizationPermissionType = Object.fromEntries(
  (Constants.public.Enums
    .organization_permission_type as readonly OrganizationPermissionTypes[])
    .map((c) => [c, c] as const),
) as { [K in OrganizationPermissionTypes]: K };

export type CurrencyCodeType = Database["public"]["Enums"]["currency_code"];
export const CurrencyCode = Object.fromEntries(
  (Constants.public.Enums.currency_code as readonly CurrencyCodeType[]).map((
    c,
  ) => [c, c] as const),
) as { [K in CurrencyCodeType]: K };

export type OfferingTabSectionTypes =
  Database["public"]["Enums"]["offering_tab_section"];
export const OfferingTabSection = Object.fromEntries(
  (Constants.public.Enums
    .offering_tab_section as readonly OfferingTabSectionTypes[]).map((c) =>
      [c, c] as const
    ),
) as { [K in OfferingTabSectionTypes]: K };

export type LinkedAccountTypes =
  Database["public"]["Enums"]["linked_account_type"];
export const LinkedAccountType = Object.fromEntries(
  (Constants.public.Enums.linked_account_type as readonly LinkedAccountTypes[])
    .map((c) => [c, c] as const),
) as { [K in LinkedAccountTypes]: K };

export type NotificationSubjectTypes =
  Database["public"]["Enums"]["notification_subject"];
export const NotificationSubject = Object.fromEntries(
  (Constants.public.Enums
    .notification_subject as readonly NotificationSubjectTypes[]).map((c) =>
      [c, c] as const
    ),
) as { [K in NotificationSubjectTypes]: K };

export type NotificationRecipientTypes =
  Database["public"]["Enums"]["notification_recipient_type"];
export const NotificationRecipientType = Object.fromEntries(
  (Constants.public.Enums
    .notification_recipient_type as readonly NotificationRecipientTypes[]).map((
      c,
    ) => [c, c] as const),
) as { [K in NotificationRecipientTypes]: K };

export type NotificationMethodTypes =
  Database["public"]["Enums"]["notification_method"];
export const NotificationMethod = Object.fromEntries(
  (Constants.public.Enums
    .notification_method as readonly NotificationMethodTypes[]).map((c) =>
      [c, c] as const
    ),
) as { [K in NotificationMethodTypes]: K };

export type DocumentFormatType = Database["public"]["Enums"]["document_format"];
export const DocumentFormat = Object.fromEntries(
  (Constants.public.Enums.document_format as readonly DocumentFormatType[]).map(
    (c) => [c, c] as const,
  ),
) as { [K in DocumentFormatType]: K };

export type DistributionPeriodTypes =
  Database["public"]["Enums"]["distribution_period_type"];
export const DistributionPeriodType = Object.fromEntries(
  (Constants.public.Enums
    .distribution_period_type as readonly DistributionPeriodTypes[]).map((c) =>
      [c, c] as const
    ),
) as { [K in DistributionPeriodTypes]: K };

export type OfferingTypes = Database["public"]["Enums"]["offering_type"];
export const OfferingType = Object.fromEntries(
  (Constants.public.Enums.offering_type as readonly OfferingTypes[]).map((c) =>
    [c, c] as const
  ),
) as { [K in OfferingTypes]: K };

export type RealEstatePropertyTypes =
  Database["public"]["Enums"]["real_estate_property_type"];
export const RealEstatePropertyType = Object.fromEntries(
  (Constants.public.Enums
    .real_estate_property_type as readonly RealEstatePropertyTypes[]).map((c) =>
      [c, c] as const
    ),
) as { [K in RealEstatePropertyTypes]: K };

export type DocumentTypes = Database["public"]["Enums"]["document_type"];
export const DocumentType = Object.fromEntries(
  (Constants.public.Enums.document_type as readonly DocumentTypes[]).map((c) =>
    [c, c] as const
  ),
) as { [K in DocumentTypes]: K };

export type LegalEntityTypes = Database["public"]["Enums"]["legal_entity_type"];
export const LegalEntityType = Object.fromEntries(
  (Constants.public.Enums.legal_entity_type as readonly LegalEntityTypes[]).map(
    (c) => [c, c] as const,
  ),
) as { [K in LegalEntityTypes]: K };

export type SmartContractTypes =
  Database["public"]["Enums"]["smart_contract_type"];
export const SmartContractType = Object.fromEntries(
  (Constants.public.Enums.smart_contract_type as readonly SmartContractTypes[])
    .map((c) => [c, c] as const),
) as { [K in SmartContractTypes]: K };

export type ShareTransferEventTypes =
  Database["public"]["Enums"]["share_transfer_event_type"];
export const ShareTransferEventType = Object.fromEntries(
  (Constants.public.Enums
    .share_transfer_event_type as readonly ShareTransferEventTypes[])
    .map((c) => [c, c] as const),
) as { [K in ShareTransferEventTypes]: K };

export type whitelistTransactionTypes =
  Database["public"]["Enums"]["whitelist_transaction_type"];
export const WhitelistTransactionType = Object.fromEntries(
  (Constants.public.Enums
    .whitelist_transaction_type as readonly whitelistTransactionTypes[])
    .map((c) => [c, c] as const),
) as { [K in whitelistTransactionTypes]: K };

export type documentAccessTypes =
  Database["public"]["Enums"]["document_access_type"];
export const DocumentAccessType = Object.fromEntries(
  (Constants.public.Enums
    .document_access_type as readonly documentAccessTypes[])
    .map((c) => [c, c] as const),
) as { [K in documentAccessTypes]: K };

export type CryptoAddressTypes =
  Database["public"]["Enums"]["crypto_address_type"];
export const CryptoAddressType = Object.fromEntries(
  (Constants.public.Enums
    .crypto_address_type as readonly CryptoAddressTypes[])
    .map((c) => [c, c] as const),
) as { [K in CryptoAddressTypes]: K };

export type OrganizationUserPermissionTypes =
  Database["public"]["Enums"]["organization_permission_type"];
export const OrganizationUserPermission = Object.fromEntries(
  (Constants.public.Enums
    .organization_permission_type as readonly OrganizationUserPermissionTypes[])
    .map((c) => [c, c] as const),
) as { [K in OrganizationUserPermissionTypes]: K };
export type Protocol = Database["public"]["Enums"]["crypto_address_protocol"];
export const CryptoAddressProtocol = Object.fromEntries(
  (Constants.public.Enums
    .crypto_address_protocol as readonly Protocol[])
    .map((c) => [c, c] as const),
) as { [K in Protocol]: K };
export type InvestmentStatusType = Database["public"]["Enums"]["asset_status"];
export const InvestmentStatus = Object.fromEntries(
  (Constants.public.Enums
    .asset_status as readonly InvestmentStatusType[])
    .map((c) => [c, c] as const),
) as { [K in InvestmentStatusType]: K };

export type OfferingStageTypes = Database["public"]["Enums"]["offering_stage"];
export const OfferingStage = Object.fromEntries(
  (Constants.public.Enums
    .offering_stage as readonly OfferingStageTypes[])
    .map((c) => [c, c] as const),
) as { [K in OfferingStageTypes]: K };
export type AssetStatusTypes = Database["public"]["Enums"]["asset_status"];
export const AssetStatus = Object.fromEntries(
  (Constants.public.Enums
    .asset_status as readonly AssetStatusTypes[])
    .map((c) => [c, c] as const),
) as { [K in AssetStatusTypes]: K };
