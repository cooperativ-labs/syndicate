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
    project {
      id
    }
    owner {
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
  }
`;

export const CORE_DOCUMENT_FIELDS = gql`
  fragment documentData on Document {
    id
    title
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
      fullName
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

export const CORE_PROJECT_INFO_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}
  ${CORE_LINKED_ACCOUNT_FIELDS}
  fragment projectInfoData on ProjectInfo {
    id
    logo
    shortDescription
    generalDescription
    brandColor
    lightBrand
    website
    linkedAccounts {
      ...linkedAccountsData
    }
    videoURL
    pitchDeck
    sharing {
      image {
        id
        url
        label
      }
    }
    documents {
      ...documentData
    }
  }
`;

export const CORE_PROJECT_FIELDS = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  fragment projectData on Project {
    id
    name
    slug
    info {
      ...projectInfoData
    }
    projectEntity {
      id
    }
  }
`;

export const CORE_INVESTMENT_OFFERING_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}

  fragment offeringDetailsData on OfferingDetails {
    id
    type
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
      users {
        user {
          uuid
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
    walletAddress
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
    permitted
    name
    nonUS
    entity {
      id
      fullName
    }
    externalId
    minPledge
    maxPledge
    investorApplication {
      ...applicationData
    }
    offering {
      id
      details {
        ...offeringDetailsData
      }
    }
  }
`;

export const CORE_ENTITY_FIELDS = gql`
  ${CORE_LINKED_ACCOUNT_FIELDS}
  ${CORE_ADDRESS_FIELDS}
  ${CORE_DOCUMENT_FIELDS}
  ${CORE_PROJECT_INFO_FIELDS}
  ${CORE_PROJECT_FIELDS}
  ${CORE_RE_PROPERTY_FIELDS}
  ${CORE_PURCHASE_REQUEST_FIELDS}
  ${SMART_CONTRACT_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment entityData on LegalEntity {
    id
    taxId
    displayName
    fullName
    description
    jurisdiction
    operatingCurrency {
      code
    }
    profileImage
    bannerImage
    supplementaryLegalText
    website
    publicFacing
    users {
      title
      user {
        uuid
        id
      }
    }
    owners {
      id
      fullName
      displayName
      supplementaryLegalText
      profileImage
      website
      addresses {
        ...addressData
      }
    }
    subsidiaries {
      id
      displayName
      fullName
      description
      jurisdiction
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
    }
    linkedAccounts {
      ...linkedAccountsData
    }
    addresses {
      ...addressData
    }
    expertise
    interests
    phone
    emailAddresses {
      id
      address
      name
      description
      isPublic
      owner {
        id
      }
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
    project {
      ...projectData
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
      offeringUsers {
        id
        user {
          id
        }
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
    sharing {
      image {
        id
        url
        label
      }
      description
    }
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
    offeringUsers {
      id
      user {
        id
        uuid
      }
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

export const CORE_USER_FIELDS = gql`
  ${CORE_ENTITY_FIELDS}
  fragment userData on User {
    id
    uuid
    legalEntities {
      legalEntity {
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
      project {
        id
      }
    }
  }
`;

export const CORE_PROJECT_ENTITY_FIELDS = gql`
  ${CORE_ENTITY_FIELDS}
  fragment projectEntityData on ProjectEntity {
    id
    archived
    project {
      id
      name
      slug
      projectEntity {
        id
      }
    }
    linkedEntity {
      ...entityData
    }
  }
`;
