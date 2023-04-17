import gql from 'graphql-tag';
import { CORE_OFFERING_FIELDS } from './fragments';

export const ADD_OFFERING = gql`
  ${CORE_OFFERING_FIELDS}
  mutation AddOffering(
    $currentDate: DateTime!
    $userId: ID!
    $managingEntityId: ID!
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
          waitlistOn: true
          name: $name
          shortDescription: $shortDescription
          brandColor: $brandColor
          website: $website
          image: $image
          offeringUsers: [{ user: { id: $userId }, roles: ADMIN }]
          offeringEntity: { id: $offeringEntityId, profileImage: $image }
        }
      ]
    ) {
      offering {
        ...offeringData
      }
    }
    updateLegalEntity(
      input: {
        filter: { id: [$offeringEntityId] }
        set: { lastUpdate: $currentDate, owners: { id: $managingEntityId } }
      }
    ) {
      legalEntity {
        id
        fullName
        subsidiaries {
          id
          offerings {
            id
          }
        }
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
            investmentCurrency: { code: $investmentCurrencyCode }
            distributionCurrency: { code: $distributionCurrencyCode }
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

export const ADD_LEGAL_SHARE_LINK = gql`
  mutation AddLegalLink(
    $offeringId: [ID!]
    $entityId: ID!
    $smartContractId: ID!
    $currentDate: DateTime
    $agreementTitle: String!
    $agreementText: String!
    $documentOfferingUniqueId: String!
    $signature: String!
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          lastUpdate: $currentDate
          smartContracts: { id: $smartContractId }
          waitlistOn: false
          documents: {
            title: $agreementTitle
            text: $agreementText
            date: $currentDate
            type: SHARE_LINK
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
      entity {
        id
        fullName
      }
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
    $permitted: Boolean!
  ) {
    addOfferingParticipant(
      input: {
        lastUpdate: $currentDate
        addressOfferingId: $addressOfferingId
        name: $name
        offering: { id: $offeringId }
        walletAddress: $walletAddress
        permitted: $permitted
      } # upsert: true
    ) {
      offeringParticipant {
        id
        name
        entity {
          id
        }
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
    $nonUS: Boolean
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
        permitted: false
        minPledge: $minPledge
        maxPledge: $maxPledge
        nonUS: $nonUS
        investorApplication: {
          creationDate: $currentDate
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
    $name: String
    $offering: ID!
    $externalId: String
  ) {
    addOfferingParticipant(
      input: {
        lastUpdate: $currentDate
        addressOfferingId: $addressOfferingId
        walletAddress: $walletAddress
        name: $name
        permitted: true
        offering: { id: $offering }
        externalId: $externalId
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
    $permitted: Boolean!
  ) {
    updateOfferingParticipant(
      input: {
        filter: { id: $id }
        set: { lastUpdate: $currentDate, name: $name, externalId: $externalId, permitted: $permitted }
      }
    ) {
      offeringParticipant {
        id
        walletAddress
        externalId
        name
        offering {
          id
        }
      }
    }
  }
`;

// ======== TEMPORARY =============
export const ADD_OFFERING_WAITLIST_MEMBER = gql`
  mutation AddOfferingWaitlistMember(
    $currentDate: DateTime!
    $dateSigned: DateTime!
    $name: String
    $minPledge: Int
    $maxPledge: Int
    $nonUS: Boolean
    $offeringId: ID!
    $offeringEntityId: ID!
    $offeringUniqueId: String!
    $walletAddress: String
    $applicationText: String!
    $applicationTitle: String!
    $signature: String!
  ) {
    addWaitlistMember(
      input: {
        lastUpdate: $currentDate
        name: $name
        offering: { id: $offeringId }
        walletAddress: $walletAddress
        minPledge: $minPledge
        maxPledge: $maxPledge
        nonUS: $nonUS
        investorApplication: {
          creationDate: $currentDate
          applicationDoc: {
            creationDate: $currentDate
            title: $applicationTitle
            text: $applicationText
            date: $currentDate
            type: AGREEMENT
            owner: { id: $offeringEntityId }
            offeringUniqueId: $offeringUniqueId
            lastUpdate: $currentDate
            signatories: { signature: $signature, date: $dateSigned, archived: false }
          }
        }
      }
    ) {
      waitlistMember {
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

export const REMOVE_WAITLIST_OBJECT = gql`
  mutation RemoveWaitlistMember($offeringId: [ID!], $id: ID!, $currentDate: DateTime) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { waitlistMembers: { id: $id } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      offering {
        id
        waitlistMembers {
          id
        }
      }
    }
    deleteWaitlistMember(filter: { id: [$id] }) {
      msg
    }
  }
`;

export const REMOVE_WHITELIST_OBJECT = gql`
  mutation RemoveOfferingParticipant($offeringId: [ID!], $id: ID!, $currentDate: DateTime) {
    updateOffering(
      input: { filter: { id: $offeringId }, remove: { participants: { id: $id } }, set: { lastUpdate: $currentDate } }
    ) {
      numUids
      offering {
        id
        participants {
          id
        }
      }
    }
    deleteOfferingParticipant(filter: { id: [$id] }) {
      msg
    }
  }
`;

export const ADD_DISTRIBUTION = gql`
  mutation UpdateOffering($currentDate: DateTime!, $offeringId: [ID!], $amount: Int!, $transactionId: String) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: { distributions: { date: $currentDate, amount: $amount, transactionId: $transactionId } }
      }
    ) {
      offering {
        id
        distributions {
          id
          amount
          date
        }
      }
    }
  }
`;

export const UPDATE_DISTRIBUTION = gql`
  mutation UpdateOfferingDistribution($currentDate: DateTime!, $distributionId: [ID!], $claimantAddress: String) {
    updateOfferingDistribution(
      input: { filter: { id: $distributionId }, set: { date: $currentDate, hasClaimed: [$claimantAddress] } }
    ) {
      offeringDistribution {
        id
        amount
        date
        hasClaimed
      }
    }
  }
`;

export const UPDATE_CONTRACT_STATUS = gql`
  mutation UpdateContractStatus($offeringId: [ID!], $smartContractId: ID!, $established: Boolean) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: { smartContracts: { id: $smartContractId, set: { established: $established } } }
      }
    ) {
      offering {
        smartContracts {
          id
          established
        }
      }
    }
    updateSmartContract(input: { filter: { id: [$smartContractId] }, set: { established: $established } }) {
      smartContract {
        id
        established
      }
    }
  }
`;

// =========== SALE ================

// export const CREATE_SALE = gql`
//   mutation UpdateOffering(
//     $currentDate: DateTime!
//     $offeringId: [ID!]
//     $smartContractId: String!
//     $numShares: Int!
//     $minUnits: Int
//     $maxUnits: Int
//     $price: Int!
//     $visible: Boolean
//   ) {
//     updateOffering(
//       input: {
//         filter: { id: $offeringId }
//         set: {
//           sales: {
//             creationDate: $currentDate
//             lastUpdate: $currentDate
//             smartContractId: $smartContractId
//             numShares: $numShares
//             minUnits: $minUnits
//             maxUnits: $maxUnits
//             price: $price
//             visible: $visible
//           }
//         }
//       }
//     ) {
//       offering {
//         id
//         sales {
//           id
//           numShares
//           price
//           creationDate
//         }
//       }
//     }
//   }
// `;

export const CREATE_SALE = gql`
  mutation UpdateOffering(
    $currentDate: DateTime!
    $offeringId: [ID!]
    $smartContractId: String!
    $isBid: Boolean
    $numShares: Int!
    $minUnits: Int
    $maxUnits: Int
    $price: Int!
    $visible: Boolean
    $initiator: String
  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: {
          sales: {
            creationDate: $currentDate
            lastUpdate: $currentDate
            smartContractId: $smartContractId
            isBid: $isBid
            initiator: $initiator
            numShares: $numShares
            minUnits: $minUnits
            maxUnits: $maxUnits
            price: $price
            visible: $visible
          }
        }
      }
    ) {
      offering {
        id
        sales {
          id
          numShares
          price
          initiator
          creationDate
        }
      }
    }
  }
`;

export const UPDATE_SALE = gql`
  mutation UpdateSale($currentDate: DateTime!, $saleId: [ID!], $visible: Boolean) {
    updateOfferingSale(input: { filter: { id: $saleId }, set: { lastUpdate: $currentDate, visible: $visible } }) {
      offeringSale {
        id
        numShares
        price
        lastUpdate
        initiator
        visible
      }
    }
  }
`;

export const DELETE_SALE = gql`
  mutation RemoveOfferingSale($offeringId: [ID!], $saleId: ID!, $currentDate: DateTime) {
    updateOffering(
      input: { filter: { id: $offeringId }, remove: { sales: { id: $saleId } }, set: { lastUpdate: $currentDate } }
    ) {
      numUids
      offering {
        id
      }
    }
    deleteOfferingSale(filter: { id: [$saleId] }) {
      msg
    }
  }
`;

// =========== SALE ================

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