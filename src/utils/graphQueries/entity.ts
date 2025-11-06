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
    $organizationId: BigInt!
    $legalName: String!
    $type: legal_entity_type! # required
    $jurCountry: String!
    $jurProvince: String
    $operatingCurrency: currency_code!
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
        ...LegalEntityFields
        organization_id
      }
    }
  }
`;

export const ADD_ENTITY_OWNER = gql`
  mutation AddEntityOwner($addEntityOwner: UUID!, $ownedEntityId: UUID!) {
    insertIntolegal_entity_relationshipCollection(
      objects: [
        {
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
  mutation RemoveEntityOwner($removeEntityOwner: UUID!, $ownedEntityId: UUID!) {
    deleteFromlegal_entity_relationshipCollection(
      filter: {
        and: [
          { parent_entity_id: { eq: $removeEntityOwner } }
          { child_entity_id: { eq: $ownedEntityId } }
        ]
      }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const UPDATE_ENTITY_INFORMATION = gql`
  mutation UpdateEntityInformation(
    $entityId: UUID!
    $legalName: String!
    $displayName: String!
    $jurCountry: String!
    $jurProvince: String
    $operatingCurrencyCode: currency_code!
    $taxId: String
  ) {
    updatelegal_entityCollection(
      filter: { id: { eq: $entityId } }
      set: {
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
      set: { display_name: $displayName, legal_name: $legalName }
    ) {
      affectedCount
      records {
        id
        legal_name
        display_name
      }
    }
    updateaddressCollection(
      filter: { legal_entity_id: { eq: $entityId } }
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
    $lat: BigFloat
    $lng: BigFloat
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
  mutation RemoveEntityAddress($entityId: UUID!, $geoAddressId: UUID!) {
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
    $protocol: crypto_address_protocol!
    $type: crypto_address_type!
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
  mutation RemoveEntityWallet($entityId: UUID!, $walletAddress: String!) {
    deleteFromcrypto_addressCollection(filter: { address: { eq: $walletAddress } }) {
      affectedCount
    }
  }
`;
