import gql from 'graphql-tag';

export const CORE_LINKED_ACCOUNT_FIELDS = gql`
  fragment linkedAccountsData on LinkedAccount {
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
  fragment addressData on Address {
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
  fragment documentData on Document {
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
  fragment applicationData on InvestorApplication {
    id
    creationDate
    applicationDoc {
      ...documentData
    }
  }
`;

export const CORE_PURCHASE_REQUEST_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}
  fragment purchaseRequestData on PurchaseRequest {
    id
    creationDate
    numUnits
    relatedOffering {
      id
      name
    }
    purchaser {
      id
      legalName
    }
    purchaseDocument {
      ...documentData
    }
  }
`;

export const SMART_CONTRACT_FIELDS = gql`
  fragment smartContractData on SmartContract {
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
  }
`;

export const CORE_INVESTMENT_OFFERING_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}

  fragment offeringDetailsData on OfferingDetails {
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
  fragment rePropertyData on RealEstateProperty {
    id
    propertyType
    investmentStatus
    address {
      ...addressData
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

export const CORE_WAITLIST_MEMBER_FIELDS = gql`
  ${CORE_APPLICATION_FIELDS}
  fragment waitlistMemberData on WaitlistMember {
    id
    name
    minPledge
    maxPledge
    nonUS
    investorApplication {
      ...applicationData
    }
  }
`;

export const CORE_INVESTMENT_PARTICIPANT_FIELDS = gql`
  ${CORE_APPLICATION_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment participantData on OfferingParticipant {
    id
    addressOfferingId
    walletAddress
    chainId
    permitted
    name
    jurisdiction {
      id
      country
      province
    }
    externalId
    minPledge
    maxPledge
    investorApplication {
      ...applicationData
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
          }
        }
      }
      details {
        ...offeringDetailsData
      }
    }
  }
`;

export const CORE_ENTITY_FIELDS = gql`
  ${CORE_ADDRESS_FIELDS}
  ${CORE_DOCUMENT_FIELDS}
  ${CORE_RE_PROPERTY_FIELDS}
  ${CORE_PURCHASE_REQUEST_FIELDS}
  ${SMART_CONTRACT_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment entityData on LegalEntity {
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
      }
    }
    owners {
      id
      legalName
      displayName
      purpose
      addresses {
        ...addressData
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
          ...offeringDetailsData
        }
        sales {
          price
        }
      }
      organization {
        id
      }
    }

    addresses {
      ...addressData
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
      ...documentData
    }
    documentsSigned {
      id
      signature
      document {
        ...documentData
      }
    }
    offerings {
      id
      name
      image
      brandColor
      website
      details {
        ...offeringDetailsData
      }
      participants {
        id
        walletAddress
      }
      purchaseRequests {
        ...purchaseRequestData
      }
      distributions {
        id
        date
        amount
        hasClaimed
        transactionId
      }
    }
    smartContracts {
      ...smartContractData
    }
    realEstateProperties {
      ...rePropertyData
    }
    type
  }
`;

export const CORE_OFFERING_FIELDS = gql`
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  ${CORE_ENTITY_FIELDS}
  ${CORE_INVESTMENT_PARTICIPANT_FIELDS}
  ${CORE_WAITLIST_MEMBER_FIELDS}
  ${CORE_PURCHASE_REQUEST_FIELDS}
  ${SMART_CONTRACT_FIELDS}
  ${CORE_APPLICATION_FIELDS}
  fragment offeringData on Offering {
    id
    name
    isPublic
    accessCode
    waitlistOn
    waitlistMembers {
      ...waitlistMemberData
    }
    image
    bannerImage
    primaryVideo
    brandColor
    lightBrand
    website
    shortDescription
    smartContracts {
      ...smartContractData
    }
    sharingImage {
      id
      url
      label
      fileId
    }
    shortDescription

    details {
      ...offeringDetailsData
    }
    profileDescriptions {
      id
      section
      title
      text
      order
      offering {
        id
      }
    }
    offeringEntity {
      ...entityData
    }
    purchaseRequests {
      ...purchaseRequestData
    }
    sales {
      id
      numShares
      price
      minUnits
      maxUnits
      visible
      smartContractId
      initiator
      relatedOffering {
        id
      }
    }
    participants {
      ...participantData
    }
    distributions {
      id
      date
      amount
      hasClaimed
      transactionId
    }
    documents {
      ...documentData
    }
  }
`;

export const CORE_ORGANIZATION_FIELDS = gql`
  ${CORE_LINKED_ACCOUNT_FIELDS}
  ${CORE_OFFERING_FIELDS}
  fragment organizationData on Organization {
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
      ...linkedAccountsData
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
        ...offeringData
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
  fragment userData on User {
    id
    id
    organizations {
      organization {
        ...entityData
      }
    }
  }
`;

export const CORE_DOCUMENT_SIGNATORY_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}
  fragment documentSignatoryData on DocumentSignatory {
    id
    document {
      ...documentData
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
