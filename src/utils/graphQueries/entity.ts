import { gql } from "@apollo/client";

import { CORE_ENTITY_FIELDS } from "./fragments";

export const GET_ENTITY = gql`
  ${CORE_ENTITY_FIELDS}
  query GetEntity($id: UUID!) {
    legal_entityCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...LegalEntityFields
        }
      }
    }
  }
`;

export const ADD_ENTITY = gql`
  ${CORE_ENTITY_FIELDS}
  mutation AddLegalEntity(
    $currentDate: Datetime!
    $organizationId: UUID!
    $legalName: String!
    $type: LegalEntityType!
    $jurCountry: String!
    $jurProvince: String
    $operatingCurrency: CurrencyCode!
    $entityPurpose: String
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    insertIntolegal_entityCollection(
      objects: [
        {
          created_at: $currentDate
          updated_at: $currentDate
          organization_id: $organizationId
          type: $type
          legal_name: $legalName
          display_name: $legalName
          operating_currency: $operatingCurrency
          purpose: $entityPurpose
        }
      ]
    ) {
      affectedCount
      records {
        ...entityData
        organization_id
      }
    }
  }
`;

export const ADD_ENTITY_OWNER = gql`
  mutation AddEntityOwner($currentDate: Datetime!, $addEntityOwner: UUID!, $ownedEntityId: UUID!) {
    insertIntolegal_entity_relationshipCollection(
      objects: [
        {
          created_at: $currentDate
          parent_entity_id: $addEntityOwner
          child_entity_id: $ownedEntityId
          relationship_type: "OWNER"
        }
      ]
    ) {
      affectedCount
      records {
        id
        parent_entity_id
        child_entity_id
      }
    }
  }
`;

export const REMOVE_ENTITY_OWNER = gql`
  mutation RemoveEntityOwner(
    $currentDate: Datetime!
    $removeEntityOwner: UUID!
    $ownedEntityId: UUID!
  ) {
    updatelgal_entityCollection(
      filter: { id: { eq: $ownedEntityId } }
      set: { updated_at: $currentDate }
    ) {
      affectedCount
      records { id }
    }
    deleteFromlegal_entity_relationshipCollection(
      filter: {
        and: [
          { parent_entity_id: { eq: $removeEntityOwner } },
          { child_entity_id: { eq: $ownedEntityId } }
        ]
      }
    ) {
      affectedCount
    }
  }
`;

export const UPDATE_ENTITY_INFORMATION = gql`
  mutation UpdateEntityInformation(
    $currentDate: Datetime!
    $entityId: UUID!
    $legalName: String!
    $displayName: String!
    $jurCountry: String!
    $jurProvince: String
    $operatingCurrencyCode: CurrencyCode!
    $taxId: String
  ) {
    updatelegal_entityCollection(
      filter: { id: { eq: $entityId } }
      set: {
        updated_at: $currentDate
        display_name: $displayName
        legal_name: $legalName
        operating_currency: $operatingCurrencyCode
        tax_id: $taxId
      }
    ) {
      affectedCount
      records {
        id
        legal_name
        display_name
        operating_currency
      }
    }
  }
`;

export const UPDATE_ENTITY_WITH_ADDRESS = gql`
  mutation UpdateEntityWithAddress(
    $currentDate: Datetime!
    $entityId: UUID!
    $legalName: String!
    $displayName: String!
    $jurCountry: String!
    $jurProvince: String
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    updatelegal_entityCollection(
      filter: { id: { eq: $entityId } }
      set: { updated_at: $currentDate, display_name: $displayName, legal_name: $legalName }
    ) {
      affectedCount
      records {
        id
        legal_name
        display_name
      }
    }
  }
`;

// --------------- Address ----------------

export const ADD_ENTITY_ADDRESS = gql`
  mutation AddAddress(
    $entityId: UUID!
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
    $lat: Float
    $lng: Float
  ) {
    insertIntoaddressCollection(
      objects: [
        {
          legal_entity_id: $entityId
          label: $addressLabel
          line1: $addressLine1
          line2: $addressLine2
          line3: $addressLine3
          city: $city
          state_province: $stateProvince
          postal_code: $postalCode
          country: $country
          lat: $lat
          lng: $lng
        }
      ]
    ) {
      affectedCount
      records {
        id
        label
        line1
      }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress(
    $addressId: UUID!
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    updateaddressCollection(
      filter: { id: { eq: $addressId } }
      set: {
        label: $addressLabel
        line1: $addressLine1
        line2: $addressLine2
        line3: $addressLine3
        city: $city
        state_province: $stateProvince
        postal_code: $postalCode
        country: $country
      }
    ) {
      affectedCount
      records {
        id
        label
        line1
      }
    }
  }
`;

export const REMOVE_ENTITY_ADDRESS = gql`
  mutation RemoveEntityAddress($currentDate: Datetime!, $entityId: UUID!, $geoAddressId: UUID!) {
    updatelegal_entityCollection(
      filter: { id: { eq: $entityId } }
      set: { updated_at: $currentDate }
    ) {
      affectedCount
      records {
        id
      }
    }
    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {
      affectedCount
    }
  }
`;

// ENTITY WALLETS

export const UPDATE_ENTITY_WALLETS = gql`
  mutation UpdateEntityWallets(
    $entityId: UUID!
    $name: String
    $walletAddress: String!
    $protocol: CryptoAddressProtocol!
    $type: CryptoAddressType!
    $chainId: Int
  ) {
    insertIntocrypto_addressCollection(
      objects: [
        {
          legal_entity_id: $entityId
          name: $name
          address: $walletAddress
          protocol: $protocol
          type: $type
          chain_id: $chainId
          is_public: true
        }
      ]
    ) {
      affectedCount
      records {
        id
        name
        address
        chain_id
        type
      }
    }
  }
`;

export const REMOVE_ENTITY_WALLET = gql`
  mutation RemoveEntityWallet($entityId: UUID!, $walletAddress: String!, $currentDate: Datetime!) {
    updatelegal_entityCollection(
      filter: { id: { eq: $entityId } }
      set: { updated_at: $currentDate }
    ) {
      affectedCount
      records {
        id
      }
    }
    deleteFromcrypto_addressCollection(filter: { address: { eq: $walletAddress } }) {
      affectedCount
    }
  }
`;
