import { gql } from "@apollo/client";

import { CORE_ORGANIZATION_FIELDS } from "./fragments";

export const GET_ORGANIZATION = gql`
  ${CORE_ORGANIZATION_FIELDS}
  query GetOrganization($id: UUID!) {
    organizationCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...OrganizationFields
        }
      }
    }
  }
`;

export const ADD_ORGANIZATION_USER = gql`
  mutation AddOrganizationUser(
    $userId: UUID!
    $organizationId: UUID!
    $permission: [organization_permission_type]
  ) {
    insertIntoorganization_userCollection(
      objects: [{ user_id: $userId, organization_id: $organizationId, permissions: $permission }]
    ) {
      affectedCount
      records {
        id
        user_id
        organization_id
        permissions
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_USER = gql`
  mutation RemoveOrganizationUser($organizationUserId: UUID!) {
    deleteFromorganization_userCollection(filter: { id: { eq: $organizationUserId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_INFORMATION = gql`
  mutation UpdateOrganization(
    $organizationId: UUID!
    $name: String!
    $logo: String
    $bannerImage: String
    $isPublic: Boolean
    $shortDescription: String
    $description: String
    $country: String
  ) {
    updateorganizationCollection(
      filter: { id: { eq: $organizationId } }
      set: {
        name: $name
        logo: $logo
        banner_image: $bannerImage
        is_public: $isPublic
        short_description: $shortDescription
        description: $description
        country: $country
      }
    ) {
      affectedCount
      records {
        id
        name
        is_public
        description
        country
        logo
        banner_image
      }
    }
  }
`;

// ----------------Notifications----------------

export const ADD_NOTIFICATION_RULE = gql`
  mutation AddNotificationRule(
    $organizationUserId: UUID!
    $notificationRecipientType: notification_recipient_type!
    $notificationMethod: notification_method!
    $notificationSubject: notification_subject!
  ) {
    insertIntonotification_configurationCollection(
      objects: [
        {
          organization_user_id: $organizationUserId
          notification_recipient_type: $notificationRecipientType
          notification_method: $notificationMethod
          notification_subject: $notificationSubject
        }
      ]
    ) {
      affectedCount
      records {
        id
        notification_recipient_type
        notification_method
        notification_subject
        organization_user_id
      }
    }
  }
`;

export const REMOVE_NOTIFICATION_RULE = gql`
  mutation RemoveNotificationRule($notificationConfigurationId: UUID!) {
    deleteFromnotification_configurationCollection(
      filter: { id: { eq: $notificationConfigurationId } }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`;

// --------------- Email ----------------

export const ADD_ORGANIZATION_EMAIL = gql`
  mutation AddUserEmail(
    $organizationId: UUID!
    $address: String!
    $name: String
    $description: String
    $isPublic: Boolean
  ) {
    insertIntoemail_addressCollection(
      objects: [
        {
          organization_id: $organizationId
          address: $address
          name: $name
          description: $description
          is_public: $isPublic
        }
      ]
    ) {
      affectedCount
      records {
        id
        address
        organization_id
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_EMAIL = gql`
  mutation RemoveOrganizationEmail($emailAddress: String!) {
    deleteFromemail_addressCollection(filter: { address: { eq: $emailAddress } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation UpdateUserEmail(
    $address: String!
    $name: String
    $description: String
    $isPublic: Boolean
  ) {
    updateemail_addressCollection(
      filter: { address: { eq: $address } }
      set: { name: $name, description: $description, is_public: $isPublic }
    ) {
      affectedCount
      records {
        id
        name
        address
        is_public
        description
        organization_id
      }
    }
  }
`;

//USER SOCIAL

export const ADD_ORGANIZATION_SOCIAL_ACCOUNTS = gql`
  mutation AddOrganizationSocialAccounts(
    $organizationId: UUID!
    $url: String!
    $type: linked_account_type!
  ) {
    insertIntolinked_accountCollection(
      objects: [{ organization_id: $organizationId, url: $url, type: $type }]
    ) {
      affectedCount
      records {
        id
        organization_id
        url
        type
        verified
        hidden
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_SOCIAL_ACCOUNT = gql`
  mutation RemoveOrganizationSocialAccount($socialId: UUID!) {
    deleteFromlinked_accountCollection(filter: { id: { eq: $socialId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;
