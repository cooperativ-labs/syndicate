import { gql } from '@apollo/client';

import {
  CORE_ENTITY_FIELDS,
  CORE_INVESTMENT_OFFERING_FIELDS,
  CORE_ORGANIZATION_FIELDS,
  CORE_USER_FIELDS,
  SMART_CONTRACT_FIELDS
} from './fragments';

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

export const GET_USER = gql`
  ${CORE_ORGANIZATION_FIELDS}
  query GetUser($id: UUID!) {
    profileCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          id
          name
        }
      }
    }
    organization_userCollection(filter: { user_id: { eq: $id } }) {
      edges {
        node {
          organization {
            ...OrganizationFields
          }
        }
      }
    }
  }
`;

export const GET_USER_PERMISSIONS = gql`
  query GetUserRole($id: UUID!) {
    organization_userCollection(filter: { user_id: { eq: $id } }) {
      edges {
        node {
          permissions
          organization {
            ...OrganizationFields
          }
        }
      }
    }
  }
`;

// export const ADD_USER_WITH_EMAIL = gql`
//   ${CORE_USER_FIELDS}
//   mutation AddUserWithEmail(
//     $displayName: String!
//     $fullName: String!
//     $emailAddress: String!
//     $profilePhoto: String
//   ) {
//     addUser(
//       input: [
//         {
//           legalEntities: {
//             permissions: ADMIN
//             legalEntity: {
//               displayName: $displayName
//               fullName: $fullName
//               emailAddresses: { address: $emailAddress }
//               profileImage: $profilePhoto
//               publicFacing: true
//               type: INDIVIDUAL
//             }
//           }
//         }
//       ]
//     ) {
//       user {
//         ...UserFields
//       }
//     }
//   }
// `;
