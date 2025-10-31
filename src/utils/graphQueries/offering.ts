import { gql } from "@apollo/client";

import {
  CORE_APPLICATION_FIELDS,
  CORE_ENTITY_FIELDS,
  CORE_INVESTMENT_OFFERING_FIELDS,
  CORE_INVESTMENT_PARTICIPANT_FIELDS,
  CORE_OFFERING_FIELDS,
  SMART_CONTRACT_SET_FIELDS,
} from "./fragments";

export const ADD_OFFERING = gql`
  ${CORE_OFFERING_FIELDS}
  mutation AddOffering(
    $offeringEntityId: UUID!
    $name: String!
    $brandColor: String
    $image: String
    $shortDescription: String
    $website: String
  ) {
    insertIntoofferingCollection(
      objects: [
        {
          waitlist_on: false
          name: $name
          short_description: $shortDescription
          brand_color: $brandColor
          website: $website
          image: $image
          offering_entity_id: $offeringEntityId
        }
      ]
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const GET_OFFERING = gql`
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  ${CORE_ENTITY_FIELDS}
  ${CORE_INVESTMENT_PARTICIPANT_FIELDS}
  ${SMART_CONTRACT_SET_FIELDS}
  ${CORE_APPLICATION_FIELDS}
  query GetOffering($id: UUID!) {
    offeringCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
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
        }
      }
    }
  }
`;

export const GET_ORG_OFFERINGS = gql`
  ${CORE_OFFERING_FIELDS}
  query GetOrgOfferings($organizationId: ID!) {
    offeringCollection(filter: { organization_id: { eq: $organizationId } }) {
      edges {
        node {
          ...OfferingFields
        }
      }
    }
  }
`;

export const UPDATE_OFFERING_PROFILE = gql`
  mutation UpdateOfferingProfile(
    $offeringId: UUID!
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
    updateofferingCollection(
      filter: { id: { eq: $offeringId } }
      set: {
        name: $name,
        brand_color: $brandColor,
        light_brand: $lightBrand,
        image: $image,
        banner_image: $bannerImage,
        primary_video: $primaryVideo,
        website: $website,
        short_description: $shortDescription,
        is_public: $isPublic,
        access_code: $accessCode
      }
    ) {
      affectedCount
      records {
        id
        name
        brand_color
        website
        is_public
        image
        banner_image
        primary_video
        access_code
      }
    }
  }
`;

export const UPDATE_OFFERING_FINANCIAL = gql`
  mutation UpdateOfferingFinancial(
    $offeringId: [ID!]
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
    updateofferingCollection(
      input: {
        filter: { id: $offeringId }
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

export const UPDATE_INVESTMENT_CURRENCY = gql`
  mutation UpdateInvestmentCurrency(
    $offeringDetailsId: [ID!]
    $investmentCurrencyCode: CurrencyCode!
  ) {
    updateOfferingDetails(
      input: {
        filter: { id: $offeringDetailsId }
        set: { investmentCurrency: { code: $investmentCurrencyCode } }
      }
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
    $currentDate: Datetime!
    $documentOfferingUniqueId: String!
    $offeringId: UUID!
    $entityId: UUID!
    $agreementText: String!
    $smartContractId: UUID!
    $agreementTitle: String!
    $signature: String!
  ) {
    updateofferingCollection(
      filter: { id: { eq: $offeringId } }
      set: {
        offering_smart_contract_sets: { share_contract_id: $smartContractId }
        waitlist_on: false
        documents: {
          title: $agreementTitle
          text: $agreementText
          date: $currentDate
          type: SHARE_LINK
          format: MARKDOWN
          owner_id: $entityId
          offering_unique_id: $documentOfferingUniqueId
          document_signatories: {
            signature: $signature
            date: $currentDate
            archived: false
            legal_entity_id: $entityId
          }
        }
      }
    ) {
      affectedCount
      records {
        id
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
    offering_participantCollection(filter: { wallet_address: { alloftext: $walletAddress } }) {
      edges {
        node {
          id
          name
          offering {
            ...OfferingFields
          }
        }
      }
    }
  }
`;

export const ADD_OFFERING_PARTICIPANT = gql`
  mutation AddOfferingParticipant(
    $addressOfferingId: String!
    $name: String
    $offeringId: ID!
    $walletAddress: String!
    $chainId: Int!
  ) {
    addOfferingParticipant(
      input: {
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
    insertIntooffering_participantCollection(
      objects: {
        address_offering_id: $addressOfferingId
        name: $name
        offering_id: $offeringId
        wallet_address: $walletAddress 
        min_pledge: $minPledge
        max_pledge: $maxPledge
        # jurisdiction: { country: $jurCountry, state: $jurState }
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
    insertIntoinvestor_applicationCollection(
      objects: {
        offering_participant_id: $offeringParticipantId 
        text: $applicationText
        date: $dateSigned
        type: AGREEMENT
        owner_id: $offeringEntityId
        offering_unique_id: $offeringUniqueId 
      }
    ) {
      investorApplication {
        id
      }
    }
    insertIntodocument_signatoryCollection(
      objects: {
        offering_participant_id: $offeringParticipantId
        signature: $signature
        date: $dateSigned
        archived: false
        signer_address: $walletAddress
      }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const ADD_WHITELIST_MEMBER = gql`
  mutation AddWhitelistObject(

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
   
        address_offering_id: $addressOfferingId
        wallet_address: $walletAddress
        chain_id: $chainId
        name: $name
        offering_id: $offering
        external_id: $externalId
        whitelist_transactions: { transaction_hash: $transactionHash, type: $type }
      }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const UPDATE_WHITELIST = gql`
  mutation UpdateWhitelist(

    $id: [ID!]
    $transactionHash: String!
    $type: WhitelistTransactionType!
  ) {
    updateoffering_participantCollection(
      input: {
        filter: { id: $id }
        set: { whitelist_transactions: { transaction_hash: $transactionHash, type: $type } }
      }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const UPDATE_OFFERING_PARTICIPANT = gql`
  mutation UpdateOfferingParticipant(
    $id: [ID!]
    $name: String
    $externalId: String
    $jurCountry: String!
    $jurProvince: String
  ) {
    updateoffering_participantCollection(
      input: {
        filter: { id: $id }
        set: {
       
          name: $name
          jurisdiction: { country: $jurCountry, province: $jurProvince }
          external_id: $externalId
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
  mutation RemoveOfferingParticipant(
    $offeringId: [ID!]
    $participantId: ID!

  ) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { participants: { id: $participantId } }

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
  mutation ArchiveOfferingParticipant($participantId: [ID!]) {
    updateOfferingParticipant(
      input: { filter: { id: $participantId }, set: { archived: true } }
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
    $descriptionId: [ID!]
    $title: String!
    $text: String!
    $section: OfferingTabSection!
    $order: Int!
  ) {
    updateOfferingDescriptionText(
      input: {
        filter: { id: $descriptionId }
        set: {
          title: $title
          text: $text
          section: $section
          order: $order
        }
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
  mutation DeleteDescriptionText($offeringId: [ID!], $descriptionId: ID!) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { profileDescriptions: { id: $descriptionId } }
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
