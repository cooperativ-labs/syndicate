import { gql } from '@apollo/client';

import {
  CORE_APPLICATION_FIELDS,
  CORE_ENTITY_FIELDS,
  CORE_INVESTMENT_OFFERING_FIELDS,
  CORE_INVESTMENT_PARTICIPANT_FIELDS,
  CORE_OFFERING_FIELDS,
  SMART_CONTRACT_SET_FIELDS
} from './fragments';

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
          image {
            id
            url
            label
            file_id
          }
          banner_image
          primary_video
          brand_color
          light_brand
          website
          short_description
          offering_smart_contract_set {
            ...SmartContractSetFields
          }
        }
      }
    }
  }
`;

export const GET_ORG_OFFERINGS = gql`
  ${CORE_OFFERING_FIELDS}
  query GetOrgOfferings($organizationId: BigInt!) {
    offeringCollection(
      filter: { offering_entity_id: { legal_entity: { organization_id: { eq: $organizationId } } } }
    ) {
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
        name: $name
        brand_color: $brandColor
        light_brand: $lightBrand
        image: $image
        banner_image: $bannerImage
        primary_video: $primaryVideo
        website: $website
        short_description: $shortDescription
        is_public: $isPublic
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
    $offeringId: UUID!
    $stage: offering_stage
    $maxRaise: Int
    $minRaise: Int
    $maxInvestors: Int
    $minInvestors: Int
    $minUnitsPerInvestor: Int
    $maxUnitsPerInvestor: Int
    $raiseStart: Datetime
    $raisePeriod: Int
    $additionalInfo: String
    $distributionPeriod: distribution_period_type
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
      filter: { id: { eq: $offeringId } }
      set: {
        offering_detail: {
          stage: $stage
          max_raise: $maxRaise
          min_raise: $minRaise
          min_units_per_investor: $minUnitsPerInvestor
          max_units_per_investor: $maxUnitsPerInvestor
          max_investors: $maxInvestors
          min_investors: $minInvestors
          raise_start: $raiseStart
          raise_period: $raisePeriod
          additional_info: $additionalInfo
          distribution_period: $distributionPeriod
          distribution_frequency: $distributionFrequency
          distribution_description: $distributionDescription
          admin_expense: $adminExpense
          projected_irr: $projectedIrr
          projected_irr_max: $projectedIrrMax
          preferred_return: $preferredReturn
          target_equity_multiple: $targetEquityMultiple
          target_equity_multiple_max: $targetEquityMultipleMax
          coc_return: $cocReturn
          projected_appreciation: $projectedAppreciation
          cap_rate: $capRate
        }
      }
    ) {
      affectedCount
      records {
        id
        offering_detail {
          id
          stage
          max_raise
          min_raise
          min_units_per_investor
          max_units_per_investor
          max_investors
          min_investors
          raise_start
          raise_period
          additional_info
          distribution_period
          distribution_frequency
          distribution_description
          admin_expense
          projected_irr
          projected_irr_max
          preferred_return
          target_equity_multiple
          target_equity_multiple_max
          coc_return
          projected_appreciation
          cap_rate
        }
      }
    }
  }
`;

export const ADD_OFFERING_DETAILS = gql`
  mutation AddOfferingDetails(
    $offeringId: UUID!
    $offeringDetailsType: offering_details_type!
    $investmentCurrencyCode: currency_code!
    $distributionCurrencyCode: currency_code!
    $numUnits: Int!
    $minUnitsPerInvestor: Int
    $maxUnitsPerInvestor: Int
    $priceStart: Int
    $maxRaise: Int
  ) {
    insertIntooffering_detailCollection(
      objects: [
        {
          offering_id: $offeringId
          type: $offeringDetailsType
          investment_currency: $investmentCurrencyCode
          distribution_currency: $distributionCurrencyCode
          num_units: $numUnits
          min_units_per_investor: $minUnitsPerInvestor
          max_units_per_investor: $maxUnitsPerInvestor
          price_start: $priceStart
          max_raise: $maxRaise
        }
      ]
    ) {
      affectedCount
      records {
        id
        offering_id
        num_units
        min_units_per_investor
        max_units_per_investor
        price_start
        max_raise
      }
    }
  }
`;

export const UPDATE_INVESTMENT_CURRENCY = gql`
  mutation UpdateInvestmentCurrency(
    $offeringDetailsId: UUID!
    $investmentCurrencyCode: currency_code!
  ) {
    updateoffering_detailCollection(
      filter: { id: { eq: $offeringDetailsId } }
      set: { investment_currency: $investmentCurrencyCode }
    ) {
      affectedCount
      records {
        id
        investment_currency
        offering_id
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
    updateofferingCollection(filter: { id: { eq: $offeringId } }, set: { waitlist_on: false }) {
      affectedCount
      records {
        id
      }
    }
    insertIntooffering_smart_contract_setCollection(
      objects: [{ offering_id: $offeringId, share_contract_id: $smartContractId }]
    ) {
      affectedCount
      records {
        id
        offering_id
        share_contract_id
      }
    }
    insertIntodocumentCollection(
      objects: [
        {
          title: $agreementTitle
          text: $agreementText
          date: $currentDate
          type: SHARE_LINK
          format: MARKDOWN
          owner_id: $entityId
          offering_unique_id: $documentOfferingUniqueId
          offering_id: $offeringId
        }
      ]
    ) {
      affectedCount
      records {
        id
        offering_id
      }
    }
    updatesmart_contractCollection(
      filter: { id: { eq: $smartContractId } }
      set: { established: true }
    ) {
      affectedCount
      records {
        id
        established
      }
    }
  }
`;

export const GET_OFFERING_PARTICIPANT = gql`
  ${CORE_OFFERING_FIELDS}
  query GetOfferingParticipant($walletAddress: String!) {
    offering_participantCollection(filter: { wallet_address: { ilike: $walletAddress } }) {
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
    $offeringId: UUID!
    $walletAddress: String!
    $chainId: Int!
  ) {
    insertIntooffering_participantCollection(
      objects: [
        {
          address_offering_id: $addressOfferingId
          name: $name
          offering_id: $offeringId
          wallet_address: $walletAddress
          chain_id: $chainId
        }
      ]
    ) {
      affectedCount
      records {
        id
        name
        offering_id
      }
    }
  }
`;

export const ADD_OFFERING_PARTICIPANT_WITH_APPLICATION = gql`
  mutation AddOfferingParticipantWithApplication(
    $dateSigned: Datetime!
    $addressOfferingId: String!
    $name: String
    $offeringId: UUID!
    $offeringEntityId: UUID!
    $offeringUniqueId: String!
    $walletAddress: String!
    $minPledge: Int
    $maxPledge: Int
    $jurCountry: String
    $jurState: String
    $applicationText: String!
    $applicationTitle: String!
    $signature: String!
    $offeringParticipantId: UUID!
  ) {
    insertIntooffering_participantCollection(
      objects: [
        {
          address_offering_id: $addressOfferingId
          name: $name
          offering_id: $offeringId
          wallet_address: $walletAddress
          min_pledge: $minPledge
          max_pledge: $maxPledge
        }
      ]
    ) {
      affectedCount
      records {
        id
        offering_id
      }
    }
    insertIntoinvestor_applicationCollection(
      objects: [
        {
          offering_participant_id: $offeringParticipantId
          application_doc: {
            text: $applicationText
            date: $dateSigned
            type: AGREEMENT
            owner_id: $offeringEntityId
            offering_unique_id: $offeringUniqueId
            title: $applicationTitle
          }
        }
      ]
    ) {
      affectedCount
      records {
        id
        offering_participant_id
      }
    }
    insertIntodocument_signatoryCollection(
      objects: [
        {
          document_id: $offeringParticipantId
          signature: $signature
          date: $dateSigned
          archived: false
          signer_address: $walletAddress
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

export const ADD_WHITELIST_MEMBER = gql`
  mutation AddWhitelistObject(
    $addressOfferingId: String!
    $walletAddress: String!
    $chainId: Int!
    $name: String
    $offering: UUID!
    $externalId: String
    $transactionHash: String
    $type: whitelist_transaction_type!
  ) {
    insertIntooffering_participantCollection(
      objects: [
        {
          address_offering_id: $addressOfferingId
          wallet_address: $walletAddress
          chain_id: $chainId
          name: $name
          offering_id: $offering
          external_id: $externalId
        }
      ]
    ) {
      affectedCount
      records {
        id
      }
    }
    insertIntowhitelist_transactionCollection(
      objects: [
        { offering_participant_id: $offering, transaction_hash: $transactionHash, type: $type }
      ]
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
    $participantId: UUID!
    $transactionHash: String!
    $type: whitelist_transaction_type!
  ) {
    updatewhitelist_transactionCollection(
      filter: { offering_participant_id: { eq: $participantId } }
      set: { transaction_hash: $transactionHash, type: $type }
    ) {
      affectedCount
      records {
        id
        transaction_hash
        type
      }
    }
  }
`;

export const UPDATE_OFFERING_PARTICIPANT = gql`
  mutation UpdateOfferingParticipant(
    $id: UUID!
    $name: String
    $externalId: String
    $jurCountry: String!
    $jurProvince: String
  ) {
    updateoffering_participantCollection(
      filter: { id: { eq: $id } }
      set: { name: $name, external_id: $externalId, jurisdiction_id: $jurCountry }
    ) {
      affectedCount
      records {
        id
        wallet_address
        external_id
        name
        offering_id
      }
    }
  }
`;

export const REMOVE_WHITELIST_OBJECT = gql`
  mutation RemoveOfferingParticipant($participantId: UUID!) {
    deleteFromoffering_participantCollection(filter: { id: { eq: $participantId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const ARCHIVE_OFFERING_PARTICIPANT = gql`
  mutation ArchiveOfferingParticipant($participantId: UUID!) {
    updateoffering_participantCollection(
      filter: { id: { eq: $participantId } }
      set: { archived: true }
    ) {
      affectedCount
      records {
        id
        archived
      }
    }
  }
`;

export const CREATE_DESCRIPTION_TEXT = gql`
  mutation AddDescriptionText(
    $offeringId: UUID!
    $title: String!
    $text: String!
    $section: offering_tab_section!
    $order: Int!
  ) {
    insertIntooffering_description_textCollection(
      objects: [
        { offering_id: $offeringId, title: $title, text: $text, section: $section, order: $order }
      ]
    ) {
      affectedCount
      records {
        id
        offering_id
        title
        text
        section
        order
      }
    }
  }
`;

export const UPDATE_DESCRIPTION_TEXT = gql`
  mutation UpdateDescriptionText(
    $descriptionId: UUID!
    $title: String!
    $text: String!
    $section: offering_tab_section!
    $order: Int!
  ) {
    updateoffering_description_textCollection(
      filter: { id: { eq: $descriptionId } }
      set: { title: $title, text: $text, section: $section, order: $order }
    ) {
      affectedCount
      records {
        id
        text
        title
        section
        order
        offering_id
      }
    }
  }
`;

export const DELETE_DESCRIPTION_TEXT = gql`
  mutation DeleteDescriptionText($descriptionId: UUID!) {
    deleteFromoffering_description_textCollection(filter: { id: { eq: $descriptionId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;
