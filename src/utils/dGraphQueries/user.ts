import gql from 'graphql-tag';
import {
  CORE_USER_FIELDS,
  CORE_ENTITY_FIELDS,
  SMART_CONTRACT_FIELDS,
  CORE_PROJECT_FIELDS,
  CORE_INVESTMENT_OFFERING_FIELDS,
} from './fragments';

export const GET_USERS = gql`
  query {
    queryUser {
      id
      name
    }
  }
`;

export const CHECK_EMAIL_EXISTS = gql`
  query CheckEmailExists($emailAddress: String!) {
    getEmailAddress(address: $address) {
      address
    }
  }
`;

export const GET_USER_FROM_EMAIL = gql`
  ${CORE_USER_FIELDS}
  query GetUserFromEmail($emailAddress: String!) {
    getEmailAddress(address: $address) {
      address
      user {
        ...userData
      }
    }
  }
`;

export const GET_USER = gql`
  ${CORE_ENTITY_FIELDS}
  ${SMART_CONTRACT_FIELDS}
  ${CORE_PROJECT_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  query GetUser($id: ID!) {
    queryUser(filter: { id: [$id] }) {
      id
      name
      projects {
        id
        project {
          ...projectData
        }
      }
      offerings {
        roles
        offering {
          id
          name
          image
          shortDescription
          details {
            ...offeringDetailsData
          }
        }
      }
      legalEntities {
        legalEntity {
          ...entityData
          smartContracts {
            ...smartContractData
          }
        }
      }
    }
  }
`;

export const ADD_USER_WITH_TWITTER = gql`
  ${CORE_USER_FIELDS}
  mutation AddUser(
    $currentDate: DateTime!
    $displayName: String!
    $fullName: String!
    $twitterId: String!
    $twitterUsername: String!
    $twitterUrl: String!
    $profilePhoto: String
  ) {
    addUser(
      input: [
        {
          creationDate: $currentDate
          legalEntities: {
            permissions: ADMIN
            legalEntity: {
              displayName: $displayName
              fullName: $fullName
              linkedAccounts: {
                accountProvidedId: $twitterId
                username: $twitterUsername
                url: $twitterUrl
                type: TWITTER
              }
              profileImage: $profilePhoto
              publicFacing: true
              type: INDIVIDUAL
              creationDate: $currentDate
              lastUpdate: $currentDate
            }
          }
        }
      ]
    ) {
      user {
        ...userData
      }
    }
  }
`;

export const ADD_USER_WITH_EMAIL = gql`
  ${CORE_USER_FIELDS}
  mutation AddUser(
    $currentDate: DateTime!
    $displayName: String!
    $fullName: String!
    $emailAddress: String!
    $profilePhoto: String
  ) {
    addUser(
      input: [
        {
          creationDate: $currentDate
          legalEntities: {
            permissions: ADMIN
            legalEntity: {
              displayName: $displayName
              fullName: $fullName
              emailAddresses: { address: $emailAddress }
              profileImage: $profilePhoto
              publicFacing: true
              type: INDIVIDUAL
              creationDate: $currentDate
              lastUpdate: $currentDate
            }
          }
        }
      ]
    ) {
      user {
        ...userData
      }
    }
  }
`;

export const ADD_USER_WITH_WALLET = gql`
  ${CORE_USER_FIELDS}
  mutation AddUser(
    $currentDate: DateTime!
    $displayName: String!
    $fullName: String!
    $walletAddress: String!
    $walletName: String!
    $chainId: Int!
    $protocol: CryptoAddressProtocol
    $walletType: CryptoAddressType
  ) {
    addUser(
      input: [
        {
          creationDate: $currentDate
          legalEntities: {
            permissions: ADMIN
            legalEntity: {
              displayName: $displayName
              fullName: $fullName
              publicFacing: true
              type: INDIVIDUAL
              creationDate: $currentDate
              lastUpdate: $currentDate
              walletAddresses: {
                name: $walletName
                address: $walletAddress
                protocol: $protocol
                chainId: $chainId
                type: $walletType
                isPublic: false
              }
            }
          }
        }
      ]
    ) {
      user {
        ...userData
      }
    }
  }
`;
