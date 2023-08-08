import gql from 'graphql-tag';
import { CORE_OFFERING_FIELDS } from './fragments';

export const ADD_OFFERING = gql`
  ${CORE_OFFERING_FIELDS}
  mutation AddOffering(
    $currentDate: DateTime!
    $offeringEntityId: ID!
    $name: String!
    $brandColor: String
    $image: String
    $shortDescription: String
    $website: String
  ) {
    addOffering(
      input: [
        {
          creationDate: $currentDate
          lastUpdate: $currentDate
          waitlistOn: false
          name: $name
          shortDescription: $shortDescription
          brandColor: $brandColor
          website: $website
          image: $image
          offeringEntity: { id: $offeringEntityId }
        }
      ]
    ) {
      offering {
        ...offeringData
      }
    }
  }
`;

export const GET_OFFERING = gql`
  ${CORE_OFFERING_FIELDS}
  query GetOffering($id: ID!) {
    getOffering(id: $id) {
      ...offeringData
    }
  }
`;

export const UPDATE_OFFERING_PROFILE = gql`
  mutation UpdateOffering(
    $offeringId: [ID!]
    $currentDate: DateTime!
    $name: String!
    $brandColor: String
    $lightBrand: Boolean
    $image: String
    $bannerImage: String
    $primaryVideo: String
    $website: String
    $shortDescription: String
    $isPublic: Boolean
    $accessCode: String
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          lastUpdate: $currentDate
          name: $name
          brandColor: $brandColor
          lightBrand: $lightBrand
          image: $image
          bannerImage: $bannerImage
          primaryVideo: $primaryVideo
          website: $website
          shortDescription: $shortDescription
          isPublic: $isPublic
          accessCode: $accessCode
        }
      }
    ) {
      offering {
        id
        name
        brandColor
        website
        isPublic
        image
        bannerImage
        primaryVideo
        accessCode
      }
    }
  }
`;

export const UPDATE_OFFERING_FINANCIAL = gql`
  mutation UpdateOffering(
    $offeringDetailsId: [ID!]
    $stage: OfferingStage
    $maxRaise: Int64
    $minRaise: Int64
    $maxInvestors: Int
    $minInvestors: Int
    $minUnitsPerInvestor: Int
    $maxUnitsPerInvestor: Int
    $raiseStart: DateTime
    $raisePeriod: Int
    $additionalInfo: String
    $distributionPeriod: DistributionPeriodType
    $distributionFrequency: Int
    $distributionDescription: String
    $adminExpense: Int
    $projectedIrr: Int
    $projectedIrrMax: Int
    $preferredReturn: Int
    $targetEquityMultiple: Int
    $targetEquityMultipleMax: Int
    $cocReturn: Int
    $projectedAppreciation: Int
    $capRate: Int
  ) {
    updateOfferingDetails(
      input: {
        filter: { id: $offeringDetailsId }
        set: {
          stage: $stage
          maxRaise: $maxRaise
          minRaise: $minRaise
          minUnitsPerInvestor: $minUnitsPerInvestor
          maxUnitsPerInvestor: $maxUnitsPerInvestor
          maxInvestors: $maxInvestors
          minInvestors: $minInvestors
          raiseStart: $raiseStart
          raisePeriod: $raisePeriod
          additionalInfo: $additionalInfo
          distributionPeriod: $distributionPeriod
          distributionFrequency: $distributionFrequency
          distributionDescription: $distributionDescription
          adminExpense: $adminExpense
          projectedIrr: $projectedIrr
          projectedIrrMax: $projectedIrrMax
          preferredReturn: $preferredReturn
          targetEquityMultiple: $targetEquityMultiple
          targetEquityMultipleMax: $targetEquityMultipleMax
          cocReturn: $cocReturn
          projectedAppreciation: $projectedAppreciation
          capRate: $capRate
        }
      }
    ) {
      offeringDetails {
        id
        stage
        maxRaise
        minRaise
        minUnitsPerInvestor
        maxUnitsPerInvestor
        maxInvestors
        minInvestors
        raiseStart
        raisePeriod
        additionalInfo
        distributionPeriod
        distributionFrequency
        distributionDescription
        adminExpense
        projectedIrr
        projectedIrrMax
        preferredReturn
        targetEquityMultiple
        targetEquityMultipleMax
        cocReturn
        projectedAppreciation
        capRate
      }
    }
  }
`;

export const ADD_OFFERING_DETAILS = gql`
  mutation AddOfferingDetails(
    $currentDate: DateTime
    $offeringId: [ID!]
    $offeringDetailsType: OfferingDetailsType!
    $investmentCurrencyCode: CurrencyCode!
    $distributionCurrencyCode: CurrencyCode!
    $numUnits: Int!
    $minUnitsPerInvestor: Int
    $maxUnitsPerInvestor: Int
    $priceStart: Int
    $maxRaise: Int64
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          lastUpdate: $currentDate
          details: {
            type: $offeringDetailsType
            investmentCurrency: $investmentCurrencyCode
            distributionCurrency: $distributionCurrencyCode
            numUnits: $numUnits
            minUnitsPerInvestor: $minUnitsPerInvestor
            maxUnitsPerInvestor: $maxUnitsPerInvestor
            priceStart: $priceStart
            maxRaise: $maxRaise
          }
        }
      }
    ) {
      offering {
        id
        details {
          id
          numUnits
          minUnitsPerInvestor
          maxUnitsPerInvestor
          priceStart
        }
      }
    }
  }
`;

export const UPDATE_INVESTMENT_CURRENCY = gql`
  mutation UpdateInvestmentCurrency($offeringDetailsId: [ID!], $investmentCurrencyCode: CurrencyCode!) {
    updateOfferingDetails(
      input: { filter: { id: $offeringDetailsId }, set: { investmentCurrency: $investmentCurrencyCode } }
    ) {
      offeringDetails {
        id
        investmentCurrency {
          code
        }
        offering {
          id
        }
      }
    }
  }
`;

export const ADD_LEGAL_SHARE_LINK = gql`
  mutation AddLegalLink(
    $currentDate: DateTime
    $documentOfferingUniqueId: String!
    $offeringId: [ID!]
    $entityId: ID!
    $agreementText: String!
    $smartContractId: ID!
    $agreementTitle: String!
    $signature: String!
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          lastUpdate: $currentDate
          smartContractSets: { shareContract: { id: $smartContractId } }
          waitlistOn: false
          documents: {
            title: $agreementTitle
            text: $agreementText
            date: $currentDate
            type: SHARE_LINK
            format: MARKDOWN
            owner: { id: $entityId }
            offeringUniqueId: $documentOfferingUniqueId
            lastUpdate: $currentDate
            creationDate: $currentDate
            signatories: { signature: $signature, date: $currentDate, archived: false, legalEntity: { id: $entityId } }
          }
        }
      }
    ) {
      offering {
        id
        smartContractSets {
          id
          shareContract {
            id
          }
        }
        documents {
          text
        }
        details {
          id
        }
      }
    }
    updateSmartContract(input: { filter: { id: [$smartContractId] }, set: { established: true } }) {
      smartContract {
        id
        established
      }
    }
  }
`;

export const GET_OFFERING_PARTICIPANT = gql`
  ${CORE_OFFERING_FIELDS}
  query GetOfferingParticipant($walletAddress: String!) {
    queryOfferingParticipant(filter: { walletAddress: { alloftext: $walletAddress } }) {
      id
      name
      offering {
        ...offeringData
      }
    }
  }
`;

export const ADD_OFFERING_PARTICIPANT = gql`
  mutation AddOfferingParticipant(
    $currentDate: DateTime!
    $addressOfferingId: String!
    $name: String
    $offeringId: ID!
    $walletAddress: String!
    $chainId: Int!
  ) {
    addOfferingParticipant(
      input: {
        lastUpdate: $currentDate
        creationDate: $currentDate
        addressOfferingId: $addressOfferingId
        name: $name
        offering: { id: $offeringId }
        walletAddress: $walletAddress
        chainId: $chainId
      } # upsert: true
    ) {
      offeringParticipant {
        id
        name
        offering {
          id
        }
      }
    }
  }
`;

export const ADD_OFFERING_PARTICIPANT_WITH_APPLICATION = gql`
  mutation AddOfferingParticipantWithApplication(
    $currentDate: DateTime!
    $dateSigned: DateTime!
    $addressOfferingId: String!
    $name: String
    $offeringId: ID!
    $offeringEntityId: ID!
    $offeringUniqueId: String!
    $walletAddress: String!
    $minPledge: Int
    $maxPledge: Int
    $jurCountry: String
    $jurState: String
    $applicationText: String!
    $applicationTitle: String!
    $signature: String!
  ) {
    addOfferingParticipant(
      input: {
        lastUpdate: $currentDate
        addressOfferingId: $addressOfferingId
        name: $name
        offering: { id: $offeringId }
        walletAddress: $walletAddress
        minPledge: $minPledge
        maxPledge: $maxPledge
        # jurisdiction: { country: $jurCountry, state: $jurState }
        investorApplication: {
          creationDate: $currentDate
          lastUpdate: $currentDate
          applicationDoc: {
            creationDate: $currentDate
            title: $applicationTitle
            text: $applicationText
            date: $currentDate
            type: AGREEMENT
            owner: { id: $offeringEntityId }
            offeringUniqueId: $offeringUniqueId
            lastUpdate: $currentDate
            signatories: { signature: $signature, date: $dateSigned, archived: false, signerAddress: $walletAddress }
          }
        }
      }
      upsert: true
    ) {
      offeringParticipant {
        id
        offering {
          id
        }
        investorApplication {
          id
          applicationDoc {
            id
          }
        }
      }
    }
  }
`;

export const ADD_WHITELIST_MEMBER = gql`
  mutation AddWhitelistObject(
    $currentDate: DateTime!
    $addressOfferingId: String!
    $walletAddress: String!
    $chainId: Int!
    $name: String
    $offering: ID!
    $externalId: String
    $transactionHash: String
    $type: WhitelistTransactionType!
  ) {
    addOfferingParticipant(
      input: {
        lastUpdate: $currentDate
        creationDate: $currentDate
        addressOfferingId: $addressOfferingId
        walletAddress: $walletAddress
        chainId: $chainId
        name: $name
        offering: { id: $offering }
        externalId: $externalId
        whitelistTransactions: { transactionHash: $transactionHash, type: $type }
      }
      upsert: true
    ) {
      offeringParticipant {
        id
        walletAddress
        name
        externalId
        offering {
          id
          participants {
            id
            walletAddress
            name
          }
        }
      }
    }
  }
`;

export const UPDATE_WHITELIST = gql`
  mutation UpdateWhitelist(
    $currentDate: DateTime!
    $id: [ID!]
    $transactionHash: String!
    $type: WhitelistTransactionType!
  ) {
    updateOfferingParticipant(
      input: {
        filter: { id: $id }
        set: { lastUpdate: $currentDate, whitelistTransactions: { transactionHash: $transactionHash, type: $type } }
      }
    ) {
      offeringParticipant {
        id
        whitelistTransactions {
          transactionHash
          type
        }
        name
        offering {
          id
        }
      }
    }
  }
`;

export const UPDATE_OFFERING_PARTICIPANT = gql`
  mutation UpdateOfferingParticipant(
    $currentDate: DateTime!
    $id: [ID!]
    $name: String
    $externalId: String
    $jurCountry: String!
    $jurProvince: String
  ) {
    updateOfferingParticipant(
      input: {
        filter: { id: $id }
        set: {
          lastUpdate: $currentDate
          name: $name
          jurisdiction: { country: $jurCountry, province: $jurProvince }
          externalId: $externalId
        }
      }
    ) {
      offeringParticipant {
        id
        walletAddress
        externalId
        jurisdiction {
          id
          country
          province
        }
        name
        offering {
          id
        }
      }
    }
  }
`;

export const REMOVE_WHITELIST_OBJECT = gql`
  mutation RemoveOfferingParticipant($offeringId: [ID!], $participantId: ID!, $currentDate: DateTime) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { participants: { id: $participantId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      offering {
        id
        participants {
          id
        }
      }
    }
    deleteOfferingParticipant(filter: { id: [$participantId] }) {
      msg
    }
  }
`;

export const ARCHIVE_OFFERING_PARTICIPANT = gql`
  mutation ArchiveOfferingParticipant($currentDate: DateTime!, $participantId: [ID!]) {
    updateOfferingParticipant(
      input: { filter: { id: $participantId }, set: { lastUpdate: $currentDate, archived: true } }
    ) {
      offeringParticipant {
        id
        archived
      }
    }
  }
`;

export const CREATE_DESCRIPTION_TEXT = gql`
  mutation AddDescriptionText(
    $currentDate: DateTime!
    $offeringId: [ID!]
    $title: String!
    $text: String!
    $section: OfferingTabSection!
    $order: Int!
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          profileDescriptions: {
            creationDate: $currentDate
            lastUpdate: $currentDate
            title: $title
            text: $text
            section: $section
            order: $order
          }
        }
      }
    ) {
      offering {
        id
        profileDescriptions {
          id
        }
      }
    }
  }
`;

export const UPDATE_DESCRIPTION_TEXT = gql`
  mutation UpdateDescriptionText(
    $currentDate: DateTime!
    $descriptionId: [ID!]
    $title: String!
    $text: String!
    $section: OfferingTabSection!
    $order: Int!
  ) {
    updateOfferingDescriptionText(
      input: {
        filter: { id: $descriptionId }
        set: { lastUpdate: $currentDate, title: $title, text: $text, section: $section, order: $order }
      }
    ) {
      offeringDescriptionText {
        id
        text
        title
        section
        order
        offering {
          id
        }
      }
    }
  }
`;

export const DELETE_DESCRIPTION_TEXT = gql`
  mutation DeleteDescriptionText($offeringId: [ID!], $descriptionId: ID!, $currentDate: DateTime) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { profileDescriptions: { id: $descriptionId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      offering {
        id
        profileDescriptions {
          id
        }
      }
    }
    deleteOfferingDescriptionText(filter: { id: [$descriptionId] }) {
      msg
    }
  }
`;
