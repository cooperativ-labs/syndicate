import gql from 'graphql-tag';
import { CORE_ENTITY_FIELDS } from './fragments';

export const GET_ENTITY = gql`
  ${CORE_ENTITY_FIELDS}
  query GetEntity($id: ID!) {
    getLegalEntity(id: $id) {
      ...entityData
    }
  }
`;

export const ADD_ENTITY = gql`
  ${CORE_ENTITY_FIELDS}
  mutation AddLegalEntity(
    $currentDate: DateTime!
    $organizationId: ID!
    $legalName: String!
    $type: LegalEntityType!
    $jurisdiction: String!
    $operatingCurrency: CurrencyCode!
    $supLegalText: String
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    addLegalEntity(
      input: [
        {
          creationDate: $currentDate
          lastUpdate: $currentDate
          organization: { id: $organizationId }
          type: $type
          legalName: $legalName
          displayName: $legalName
          jurisdiction: $jurisdiction
          operatingCurrency: { code: $operatingCurrency }
          supplementaryLegalText: $supLegalText
          addresses: {
            label: $addressLabel
            line1: $addressLine1
            line2: $addressLine2
            line3: $addressLine3
            city: $city
            stateProvince: $stateProvince
            postalCode: $postalCode
            country: $country
          }
        }
      ]
    ) {
      legalEntity {
        ...entityData
        organization {
          id
          users {
            user {
              id
            }
          }
        }
      }
    }
  }
`;

export const ADD_ENTITY_OWNER = gql`
  mutation AddEntityOwner($currentDate: DateTime!, $addEntityOwner: ID!, $ownedEntityId: [ID!]) {
    updateLegalEntity(
      input: { filter: { id: $ownedEntityId }, set: { lastUpdate: $currentDate, owners: { id: $addEntityOwner } } }
    ) {
      legalEntity {
        id
        legalName
        owners {
          id
          subsidiaries {
            id
          }
        }
      }
    }
  }
`;

export const REMOVE_ENTITY_OWNER = gql`
  mutation RemoveEntityOwner($currentDate: DateTime!, $removeEntityOwner: ID!, $ownedEntityId: ID!) {
    updateLegalEntity(
      input: {
        filter: { id: [$ownedEntityId] }
        set: { lastUpdate: $currentDate }
        remove: { owners: { id: $removeEntityOwner } }
      }
    ) {
      legalEntity {
        id
        owners {
          id
        }
      }
    }
  }
`;

export const UPDATE_ENTITY_INFORMATION = gql`
  mutation UpdateEntity(
    $currentDate: DateTime!
    $entityId: [ID!]
    $legalName: String!
    $displayName: String!
    $jurisdiction: String!
    $operatingCurrency: CurrencyCode!
    $taxId: String
  ) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: {
          lastUpdate: $currentDate
          displayName: $displayName
          legalName: $legalName
          jurisdiction: $jurisdiction
          operatingCurrency: { code: $operatingCurrency }
          taxId: $taxId
        }
      }
    ) {
      legalEntity {
        id
        legalName
        displayName
        jurisdiction
        operatingCurrency {
          code
        }
      }
    }
  }
`;

export const UPDATE_ENTITY_WITH_ADDRESS = gql`
  mutation UpdateEntity(
    $currentDate: DateTime!
    $entityId: [ID!]
    $legalName: String!
    $displayName: String!
    $jurisdiction: String!
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: {
          lastUpdate: $currentDate
          displayName: $displayName
          legalName: $legalName
          jurisdiction: $jurisdiction
          addresses: {
            label: $addressLabel
            line1: $addressLine1
            line2: $addressLine2
            line3: $addressLine3
            city: $city
            stateProvince: $stateProvince
            postalCode: $postalCode
            country: $country
          }
        }
      }
    ) {
      legalEntity {
        id
        legalName
        displayName
      }
    }
  }
`;

// --------------- Address ----------------

export const ADD_ENTITY_ADDRESS = gql`
  mutation AddAddress(
    $entityId: [ID!]
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
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: {
          addresses: {
            label: $addressLabel
            line1: $addressLine1
            line2: $addressLine2
            line3: $addressLine3
            city: $city
            stateProvince: $stateProvince
            postalCode: $postalCode
            country: $country
            lat: $lat
            lng: $lng
          }
        }
      }
    ) {
      legalEntity {
        id
        addresses {
          id
          label
          line1
        }
        organization {
          users {
            id
            user {
              id
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress(
    $addressId: [ID!]
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    updateAddress(
      input: {
        filter: { id: $addressId }
        set: {
          label: $addressLabel
          line1: $addressLine1
          line2: $addressLine2
          line3: $addressLine3
          city: $city
          stateProvince: $stateProvince
          postalCode: $postalCode
          country: $country
        }
      }
    ) {
      address {
        id
        label
        line1
      }
    }
  }
`;

export const REMOVE_ENTITY_ADDRESS = gql`
  mutation RemoveAddress($currentDate: DateTime!, $entityId: [ID!], $geoAddressId: ID!) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { addresses: { id: $geoAddressId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
        addresses {
          line1
        }
      }
    }
    deleteAddress(filter: { id: [$geoAddressId] }) {
      msg
    }
  }
`;

// ENTITY WALLETS

export const UPDATE_ENTITY_WALLETS = gql`
  mutation UpdateEntityWallets(
    $entityId: [ID!]
    $name: String
    $walletAddress: String!
    $protocol: CryptoAddressProtocol!
    $type: CryptoAddressType!
    $chainId: Int
  ) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: {
          lastUpdate: $currentDate
          walletAddresses: {
            name: $name
            address: $walletAddress
            protocol: $protocol
            type: $type
            chainId: $chainId
            isPublic: true
          }
        }
      }
    ) {
      legalEntity {
        id
        displayName
        walletAddresses {
          name
          type
          address
          chainId
        }
      }
    }
  }
`;

export const REMOVE_ENTITY_WALLET = gql`
  mutation RemoveEntityWallet($entityId: [ID!], $walletAddress: String!) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { walletAddresses: { address: $walletAddress } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
        walletAddresses {
          address
        }
      }
    }
    deleteCryptoAddress(filter: { address: { eq: $walletAddress } }) {
      msg
    }
  }
`;
