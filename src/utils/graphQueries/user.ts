import { gql } from "@apollo/client";

import {
  CORE_ENTITY_FIELDS,
  CORE_INVESTMENT_OFFERING_FIELDS,
  CORE_ORGANIZATION_FIELDS,
  CORE_USER_FIELDS,
  SMART_CONTRACT_FIELDS
} from "./fragments";

export const GET_USERS = gql`
  query {
    queryUser {
      id
      name
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: UUID!) {
    profileCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          id
          name
          image
        }
      }
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
  query GetUserFromEmail($emailAddress: String!) {
    queryUser(filter: { email: { eq: $emailAddress } }) {
      id
      email
      name
    }
  }
`;

export const GET_USER = gql`
  ${CORE_ORGANIZATION_FIELDS}
  ${SMART_CONTRACT_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  query GetUser($id: ID!) {
    queryUser(filter: { id: [$id] }) {
      id
      name
      organizations {
        organization {
          ...OrganizationFields
        }
      }
    }
  }
`;

export const GET_USER_PERMISSIONS = gql`
  query GetUserRole($id: ID!) {
    queryUser(filter: { id: [$id] }) {
      organizations {
        permissions
        organization {
          id
        }
      }
    }
  }
`;

export const ADD_USER_WITH_TWITTER = gql`
  ${CORE_USER_FIELDS}
  mutation AddUserWithTwitter(
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
        ...UserFields
      }
    }
  }
`;

export const ADD_USER_WITH_EMAIL = gql`
  ${CORE_USER_FIELDS}
  mutation AddUserWithEmail(
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
        ...UserFields
      }
    }
  }
`;

export const ADD_USER_WITH_WALLET = gql`
  ${CORE_USER_FIELDS}
  mutation AddUserWithWallet(
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
        ...UserFields
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${CORE_USER_FIELDS}
  mutation UpdateUser(
    $id: ID!
    $currentDate: DateTime!
    $name: String!
    $email: String
    $image: String
  ) {
    updateUser(
      input: {
        filter: { id: [$id] }
        set: { name: $name, email: $email, image: $image, lastUpdate: $currentDate }
      }
    ) {
      user {
        ...UserFields
      }
    }
  }
`;
