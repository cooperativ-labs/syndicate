import gql from 'graphql-tag';
import { CORE_ORGANIZATION_FIELDS } from './fragments';

export const GET_ORGANIZATION = gql`
  ${CORE_ORGANIZATION_FIELDS}
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      ...organizationData
    }
  }
`;

export const ADD_ORGANIZATION = gql`
  ${CORE_ORGANIZATION_FIELDS}
  mutation AddLegalOrganization(
    $currentDate: DateTime!
    $userId: ID!
    $name: String!
    $logo: String
    $shortDescription: String
    $website: String
    $country: String
  ) {
    addOrganization(
      input: [
        {
          creationDate: $currentDate
          lastUpdate: $currentDate
          users: { permissions: ADMIN, user: { id: $userId } }
          name: $name
          isPublic: false
          logo: $logo
          website: $website
          country: $country
          shortDescription: $shortDescription
        }
      ]
    ) {
      organization {
        ...organizationData
        users {
          user {
            id
          }
        }
      }
    }
  }
`;

export const ADD_ORGANIZATION_USER = gql`
  mutation AddOrganizationUser(
    $userId: ID!
    $currentDate: DateTime!
    $organizationId: ID!
    $permission: [OrganizationPermissionType!]
  ) {
    updateOrganization(
      input: {
        filter: { id: [$organizationId] }
        set: { lastUpdate: $currentDate, users: { permissions: $permission, user: { id: $userId } } }
      }
    ) {
      organization {
        id
        users {
          permissions
          user {
            id
          }
        }
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_USER = gql`
  mutation RemoveOrganizationUser($organizationId: [ID!], $organizationUserId: ID!, $currentDate: DateTime) {
    deleteOrganizationUser(filter: { id: [$organizationUserId] }) {
      msg
    }
    updateOrganization(input: { filter: { id: $organizationId }, set: { lastUpdate: $currentDate } }) {
      numUids
      organization {
        id
        users {
          id
        }
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_INFORMATION = gql`
  mutation UpdateOrganization(
    $currentDate: DateTime!
    $organizationId: [ID!]
    $name: String!
    $logo: String
    $bannerImage: String
    $isPublic: Boolean
    $shortDescription: String
    $description: String
    $country: String
  ) {
    updateOrganization(
      input: {
        filter: { id: $organizationId }
        set: {
          lastUpdate: $currentDate
          name: $name
          logo: $logo
          bannerImage: $bannerImage
          isPublic: $isPublic
          shortDescription: $shortDescription
          description: $description
          country: $country
        }
      }
    ) {
      organization {
        id
        name
        isPublic
        description
        country
        logo
        bannerImage
      }
    }
  }
`;

// ----------------Notifications----------------

export const ADD_NOTIFICATION_RULE = gql`
  mutation AddNotificationRule(
    $organizationUserId: ID!
    $notificationRecipientType: NotificationRecipientType!
    $NotificationMethod: NotificationMethod!
    $notificationSubject: NotificationSubject!
  ) {
    addNotificationConfiguration(
      input: {
        organizationUser: { id: $organizationUserId }
        notificationRecipientType: $notificationRecipientType
        notificationMethod: $NotificationMethod
        notificationSubject: $notificationSubject
      }
    ) {
      notificationConfiguration {
        id
        notificationRecipientType
        notificationMethod
        notificationSubject
        organizationUser {
          id
          organization {
            id
            users {
              id
              notificationConfigurations {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_NOTIFICATION_RULE = gql`
  mutation RemoveNotificationRule($organizationUserId: [ID!], $notificationConfigurationId: ID!) {
    updateOrganizationUser(
      input: {
        filter: { id: $organizationUserId }
        remove: { notificationConfigurations: { id: $notificationConfigurationId } }
      }
    ) {
      numUids
      organizationUser {
        id
        organization {
          id
          users {
            id
            notificationConfigurations {
              id
            }
          }
        }
      }
    }
    deleteNotificationConfiguration(filter: { id: [$notificationConfigurationId] }) {
      msg
    }
  }
`;

// --------------- Email ----------------

export const ADD_ORGANIZATION_EMAIL = gql`
  mutation AddUserEmail(
    $organizationId: ID!
    $address: String!
    $name: String
    $description: String
    $isPublic: Boolean
  ) {
    addEmailAddress(
      input: {
        address: $address
        organization: { id: $organizationId }
        name: $name
        description: $description
        isPublic: $isPublic
      }
    ) {
      emailAddress {
        id
        address
        organization {
          id
        }
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_EMAIL = gql`
  mutation RemoveOrganizationEmail($organizationId: [ID!], $emailAddress: String!, $currentDate: DateTime) {
    updateOrganization(
      input: {
        filter: { id: $organizationId }
        remove: { emailAddresses: { address: $emailAddress } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      organization {
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
        organization {
          id
        }
      }
    }
  }
`;

//USER SOCIAL

export const ADD_ORGANIZATION_SOCIAL_ACCOUNTS = gql`
  mutation ($organizationId: [ID!], $url: String!, $type: LinkedAccountType!, $currentDate: DateTime!) {
    updateOrganization(
      input: {
        filter: { id: $organizationId }
        set: { linkedAccounts: { url: $url, type: $type }, lastUpdate: $currentDate }
      }
    ) {
      organization {
        id
        name
        linkedAccounts {
          id
          url
          type
          verified
          hidden
          organization {
            id
          }
        }
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_SOCIAL_ACCOUNT = gql`
  mutation RemoveOrganizationSocialAccount($organizationId: [ID!], $socialId: ID!, $currentDate: DateTime!) {
    updateOrganization(
      input: {
        filter: { id: $organizationId }
        remove: { linkedAccounts: { id: $socialId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      organization {
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
