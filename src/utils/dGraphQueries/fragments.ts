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
    offeringParticipant {
      id
    }
    applicationDoc {
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
    backingToken
    owner {
      id
    }
    established
    partitions
  }
`;

export const SMART_CONTRACT_SET_FIELDS = gql`
  ${SMART_CONTRACT_FIELDS}
  fragment smartContractSetData on OfferingSmartContractSet {
    id
    offering {
      id
    }
    shareContract {
      ...smartContractData
    }
    swapContract {
      ...smartContractData
    }
    distributionContract {
      ...smartContractData
    }
  }
`;

export const CORE_INVESTMENT_OFFERING_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}

  fragment offeringDetailsData on OfferingDetails {
    id
    type
    customOnboardingLink
    stage
    investmentCurrency
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
    distributionCurrency
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
      operatingCurrency
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
  fragment participantData on OfferingParticipant {
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
        ...offeringDetailsData
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
    operatingCurrency
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

      distributions {
        id
        contractIndex
        transactionHash
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

  ${SMART_CONTRACT_SET_FIELDS}
  ${CORE_APPLICATION_FIELDS}
  fragment offeringData on Offering {
    id
    name
    isPublic
    accessCode
    waitlistOn

    image
    bannerImage
    primaryVideo
    brandColor
    lightBrand
    website
    shortDescription
    smartContractSets {
      ...smartContractSetData
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
      ...participantData
    }
    distributions {
      id
      contractIndex
      transactionHash
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
