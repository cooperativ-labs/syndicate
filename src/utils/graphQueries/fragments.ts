import { gql } from "@apollo/client";

export const CORE_LINKED_ACCOUNT_FIELDS = gql`
  fragment LinkedAccountFields on linked_accounts {
    id
    accountProvidedId
    username
    url
    type
    verified
    hidden
    organization {
      id
    }
  }
`;

export const CORE_ADDRESS_FIELDS = gql`
  fragment AddressFields on addresses {
    id
    label
    line1
    line2
    line3
    city
    stateProvince
    postalCode
    country
    lat
    lng
    owner {
      id
      legalName
    }
  }
`;

export const CORE_DOCUMENT_FIELDS = gql`
  fragment DocumentFields on documents {
    id
    title
    fileId
    date
    format
    type
    text
    url
    thumbnailImage {
      id
      label
      url
    }
    owner {
      id
      organization {
        id
        name
      }
    }
    signatories {
      id
    }
    smartContract {
      id
    }
    access
    offering {
      id
    }
    offeringUniqueId
  }
`;

export const CORE_APPLICATION_FIELDS = gql`
  fragment ApplicationFields on investor_applications {
    id
    creationDate
    offeringParticipant {
      id
    }
    applicationDoc {
      ...DocumentFields
    }
  }
`;

export const SMART_CONTRACT_FIELDS = gql`
  fragment SmartContractFields on smart_contracts {
    id
    cryptoAddress {
      id
      address
      protocol
      chainId
      owner {
        id
      }
    }
    type
    numTokensAuthorized
    backingToken {
      code
    }
    owner {
      id
    }
    established
    partitions
  }
`;

export const SMART_CONTRACT_SET_FIELDS = gql`
  ${SMART_CONTRACT_FIELDS}
  fragment SmartContractSetFields on offering_smart_contract_sets {
    id
    offering {
      id
    }
    shareContract {
      ...SmartContractFields
    }
    swapContract {
      ...SmartContractFields
    }
    distributionContract {
      ...SmartContractFields
    }
  }
`;

export const CORE_INVESTMENT_OFFERING_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}

  fragment OfferingDetailsFields on offering_details {
    id
    type
    customOnboardingLink
    stage
    investmentCurrency {
      code
    }
    numUnits
    minUnitsPerInvestor
    maxUnitsPerInvestor
    maxRaise
    minRaise
    priceStart
    maxInvestors
    minInvestors
    raiseStart
    raisePeriod
    additionalInfo
    distributionPeriod
    distributionFrequency
    distributionCurrency {
      code
    }
    distributionDescription
    adminExpense
    projectedIrr
    projectedIrrMax
    targetEquityMultiple
    targetEquityMultipleMax
    preferredReturn
    cocReturn
    projectedAppreciation
    capRate
  }
`;

export const CORE_RE_PROPERTY_FIELDS = gql`
  ${CORE_ADDRESS_FIELDS}
  fragment RealEstatePropertyFields on real_estate_properties {
    id
    propertyType
    investmentStatus
    address {
      ...AddressFields
    }
    amenitiesDescription
    images {
      id
      label
      url
      fileId
    }
    description
    assetValue
    assetValueNote
    loan
    downPayment
    lenderFees
    closingCosts
    owner {
      id
      operatingCurrency {
        code
      }
      offerings {
        id
      }
      organization {
        users {
          user {
            id
          }
        }
      }
    }
  }
`;

export const CORE_INVESTMENT_PARTICIPANT_FIELDS = gql`
  ${CORE_APPLICATION_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment OfferingParticipantFields on offering_participants {
    id
    addressOfferingId
    walletAddress
    chainId

    name
    jurisdiction {
      id
      country
      province
    }
    externalId
    whitelistTransactions {
      transactionHash
      type
    }
    minPledge
    maxPledge
    investorApplication {
      ...ApplicationFields
    }
    offering {
      id
      offeringEntity {
        organization {
          users {
            permissions
            user {
              id
            }
            notificationConfigurations {
              id
              notificationRecipientType
              notificationMethod
              notificationSubject
              organizationUser {
                id
                organization {
                  id
                }
              }
            }
          }
        }
      }
      distributions {
        id
        transactionHash
        contractIndex
      }
      details {
        ...OfferingDetailsFields
      }
    }
  }
`;

export const CORE_ENTITY_FIELDS = gql`
  ${CORE_ADDRESS_FIELDS}
  ${CORE_DOCUMENT_FIELDS}
  ${CORE_RE_PROPERTY_FIELDS}

  ${SMART_CONTRACT_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment LegalEntityFields on legal_entities {
    id
    taxId
    displayName
    legalName
    purpose
    jurisdiction {
      id
      country
      province
    }
    operatingCurrency {
      code
    }
    purpose
    organization {
      id
      name
      logo
      legalEntities {
        id
        legalName
      }
      users {
        id
        permissions
        user {
          id
          name
          email
        }
        notificationConfigurations {
          id
          notificationRecipientType
          notificationMethod
          notificationSubject
          organizationUser {
            id
            organization {
              id
            }
          }
        }
      }
    }
    owners {
      id
      legalName
      displayName
      purpose
      addresses {
        ...AddressFields
      }
      organization {
        id
      }
    }
    subsidiaries {
      id
      displayName
      legalName
      jurisdiction {
        id
        country
        province
      }
      offerings {
        id
        name
        brandColor
        image
        details {
          ...OfferingDetailsFields
        }
        # orders {
        #   swapContractAddress
        #   initiator
        #   contractIndex
        #   transactionHash
        # }
      }
      organization {
        id
      }
    }

    addresses {
      ...AddressFields
    }

    walletAddresses {
      id
      address
      name
      chainId
      description
      isPublic
    }
    documentsOwned {
      ...DocumentFields
    }
    documentsSigned {
      id
      signature
      document {
        ...DocumentFields
      }
    }
    offerings {
      id
      name
      image
      brandColor
      website
      details {
        ...OfferingDetailsFields
      }
      participants {
        id
        walletAddress
      }

      distributions {
        id
        contractIndex
        transactionHash
      }
    }
    smartContracts {
      ...SmartContractFields
    }
    realEstateProperties {
      ...RealEstatePropertyFields
    }
    type
  }
`;

export const CORE_OFFERING_FIELDS = gql`
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  ${CORE_ENTITY_FIELDS}
  ${CORE_INVESTMENT_PARTICIPANT_FIELDS}
  ${SMART_CONTRACT_SET_FIELDS}
  ${CORE_APPLICATION_FIELDS}
  fragment OfferingFields on offerings {
    id
    name
    is_public
    access_code
    waitlist_on
    image
    banner_image
    primary_video
    brand_color
    light_brand
    website
    short_description
    ... on offering_smart_contract_sets {
      ...SmartContractSetFields
    }
    ... on images {
      id
      url
      label
      fileId
    }

    details {
      edges {
        node {
          ...OfferingDetailsFields
        }
      }
    }
    profile_descriptions {
      id
      section
      title
      text
      order
      offering {
        id
      }
    }
    offering_entity {
      edges {
        node {
          ...LegalEntityFields
        }
      }
    }
    # orders {
    #   id
    #   minUnits
    #   maxUnits
    #   visible
    #   swapContractAddress
    #   initiator
    #   contractIndex
    #   transactionHash
    #   relatedOffering {
    #     id
    #   }
    # }
    participants {
      edges {
        node {
          ...OfferingParticipantFields
        }
      }
    }
    distributions {
      id
      contractIndex
      transaction_hash
    }
    documents {
      edges {
        node {
          ...DocumentFields
        }
      }
    }
  }
`;

export const CORE_ORGANIZATION_FIELDS = gql`
  ${CORE_LINKED_ACCOUNT_FIELDS}
  ${CORE_OFFERING_FIELDS}
  fragment OrganizationFields on organizations {
    id
    name
    description
    logo
    brandColor
    bannerImage
    sharingImage {
      id
      url
      label
      fileId
    }
    website
    isPublic
    phone
    country
    linkedAccounts {
      ...LinkedAccountFields
    }
    emailAddresses {
      id
      address
      name
      description
      isPublic
      organization {
        id
      }
    }
    users {
      id
      permissions

      user {
        id
        name
        email
        image
      }
      notificationConfigurations {
        id
        notificationRecipientType
        notificationMethod
        notificationSubject
        organizationUser {
          id
          organization {
            id
          }
        }
      }
    }
    legalEntities {
      id
      legalName
      displayName
      jurisdiction {
        id
        country
        province
      }
      organization {
        id
        slug
      }
      offerings {
        ...OfferingFields
      }
      subsidiaries {
        id
        legalName
        displayName
        organization {
          id
          slug
        }
      }
      owners {
        id
        legalName
        displayName
        organization {
          id
          slug
        }
      }
      organization {
        id
      }
    }
  }
`;

export const CORE_USER_FIELDS = gql`
  ${CORE_ENTITY_FIELDS}
  fragment UserFields on users {
    id
    id
    organizations {
      organization {
        ...LegalEntityFields
      }
    }
  }
`;

export const CORE_DOCUMENT_SIGNATORY_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}
  fragment DocumentSignatoryFields on document_signatories {
    id
    document {
      ...DocumentFields
    }
    signerAddress {
      id
      address
    }
    legalEntity {
      id
    }
  }
`;
