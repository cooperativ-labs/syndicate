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
    $userId: ID!
    $fullName: String!
    $displayName: String!
    $type: LegalEntityType!
    $image: String
    $website: String
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
    $userTitle: String
  ) {
    addLegalEntity(
      input: [
        {
          creationDate: $currentDate
          lastUpdate: $currentDate
          users: { permissions: ADMIN, user: { id: $userId }, title: $userTitle }
          type: $type
          displayName: $displayName
          fullName: $fullName
          publicFacing: false
          profileImage: $image
          website: $website
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
        users {
          user {
            id
          }
        }
      }
    }
  }
`;

export const ADD_ENTITY_OWNER = gql`
  mutation AddEntityOwner($currentDate: DateTime!, $gpEntityId: ID!, $ownedEntityId: [ID!]) {
    updateLegalEntity(
      input: { filter: { id: $ownedEntityId }, set: { lastUpdate: $currentDate, owners: { id: $gpEntityId } } }
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

export const ADD_LEGAL_ENTITY_USER = gql`
  mutation AddLegalEntityUser(
    $userId: ID!
    $currentDate: DateTime!
    $entityId: ID!
    $title: String
    $permissions: [LegalEntityPermissionType!]
  ) {
    updateLegalEntity(
      input: {
        filter: { id: [$entityId] }
        set: { lastUpdate: $currentDate, users: { permissions: $permissions, title: $title, user: { id: $userId } } }
      }
    ) {
      legalEntity {
        id
        users {
          user {
            id
          }
        }
      }
    }
  }
`;

export const REMOVE_LEGAL_ENTITY_USER = gql`
  mutation RemoveLegalEntityUser($entityId: [ID!], $LegalEntityUserId: ID!, $userId: ID!, $currentDate: DateTime) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { users: { id: $LegalEntityUserId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
        users {
          id
        }
      }
    }
    updateUser(input: { filter: { id: [$userId] }, remove: { legalEntities: { id: $LegalEntityUserId } } }) {
      numUids
      user {
        id
        legalEntities {
          id
        }
      }
    }
    deleteLegalEntityUser(filter: { id: [$LegalEntityUserId] }) {
      msg
    }
  }
`;

export const UPDATE_PERSONAL_INFORMATION = gql`
  mutation UpdateEntity(
    $currentDate: DateTime!
    $entityId: [ID!]
    $fullName: String!
    $displayName: String!
    $image: String
    $publicFacing: Boolean
    $description: String
    $expertiseAdd: [String]
    $expertiseRemove: [String]
    $interestsAdd: [String]
    $interestsRemove: [String]
  ) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { interests: $interestsRemove, expertise: $expertiseRemove }
        set: {
          lastUpdate: $currentDate
          displayName: $displayName
          fullName: $fullName
          profileImage: $image
          publicFacing: $publicFacing
          description: $description
          interests: $interestsAdd
          expertise: $expertiseAdd
        }
      }
    ) {
      legalEntity {
        id
        fullName
        displayName
        publicFacing
        description
        expertise
        interests
      }
    }
  }
`;

export const UPDATE_ENTITY_INFORMATION = gql`
  mutation UpdateEntity(
    $currentDate: DateTime!
    $entityId: [ID!]
    $fullName: String!
    $displayName: String!
    $image: String
    $bannerImage: String
    $publicFacing: Boolean
    $description: String
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
          fullName: $fullName
          profileImage: $image
          bannerImage: $bannerImage
          publicFacing: $publicFacing
          description: $description
          jurisdiction: $jurisdiction
          operatingCurrency: { code: $operatingCurrency }
          taxId: $taxId
        }
      }
    ) {
      legalEntity {
        id
        fullName
        displayName
        publicFacing
        description
        jurisdiction
        profileImage
        bannerImage
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
    $fullName: String!
    $displayName: String!
    $profileImage: String
    $publicFacing: Boolean
    $description: String
    $expertiseAdd: [String]
    $expertiseRemove: [String]
    $interestsAdd: [String]
    $interestsRemove: [String]
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
        remove: { interests: $interestsRemove, expertise: $expertiseRemove }
        set: {
          lastUpdate: $currentDate
          displayName: $displayName
          fullName: $fullName
          profileImage: $profileImage
          publicFacing: $publicFacing
          jurisdiction: $jurisdiction
          description: $description
          interests: $interestsAdd
          expertise: $expertiseAdd
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
        fullName
        displayName
        publicFacing
        description
        expertise
        interests
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
        users {
          id
          user {
            id
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

// USER EMAIL

export const ADD_ENTITY_EMAIL = gql`
  mutation AddUserEmail($entityId: ID!, $address: String!, $name: String, $description: String, $isPublic: Boolean) {
    addEmailAddress(
      input: {
        address: $address
        owner: { id: $entityId }
        name: $name
        description: $description
        isPublic: $isPublic
      }
    ) {
      emailAddress {
        address
        owner {
          id
          emailAddresses {
            address
          }
        }
      }
    }
  }
`;

export const REMOVE_ENTITY_EMAIL = gql`
  mutation RemoveEntityEmail($entityId: [ID!], $emailAddress: String!, $currentDate: DateTime) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { emailAddresses: { address: $emailAddress } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
        emailAddresses {
          address
        }
      }
    }
    deleteEmailAddress(filter: { address: { eq: $emailAddress } }) {
      msg
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateUserEmail($address: String!, $name: String, $description: String, $isPublic: Boolean) {
    updateEmailAddress(
      input: {
        filter: { address: { eq: $address } }
        set: { name: $name, description: $description, isPublic: $isPublic }
      }
    ) {
      emailAddress {
        id
        name
        address
        isPublic
        name
        description
        owner {
          id
        }
      }
    }
  }
`;

//USER SOCIAL

export const ADD_ENTITY_SOCIAL_ACCOUNTS = gql`
  mutation ($entityId: [ID!], $url: String!, $type: LinkedAccountType!, $currentDate: DateTime!) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: { linkedAccounts: { url: $url, type: $type }, lastUpdate: $currentDate }
      }
    ) {
      legalEntity {
        id
        displayName
        fullName
        linkedAccounts {
          id
          url
          type
          verified
          hidden
          owner {
            id
          }
        }
      }
    }
  }
`;

export const REMOVE_ENTITY_SOCIAL_ACCOUNT = gql`
  mutation RemoveEntitySocialAccount($entityId: [ID!], $socialId: ID!, $currentDate: DateTime!) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        remove: { linkedAccounts: { id: $socialId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
        linkedAccounts {
          id
        }
      }
    }
    deleteLinkedAccount(filter: { id: [$socialId] }) {
      msg
    }
  }
`;

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
