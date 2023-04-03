import gql from 'graphql-tag';
import { CORE_PROJECT_ENTITY_FIELDS, CORE_PROJECT_INFO_FIELDS } from './fragments';

export const GET_ID_FROM_SLUG = gql`
  query GetIdFromSlug($projectSlug: String!) {
    getProject(slug: $slug) {
      slug
      ID
    }
  }
`;

export const GET_PROJECT = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  ${CORE_PROJECT_ENTITY_FIELDS}
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      slug
      info {
        ...projectInfoData
      }
      projectEntity {
        ...projectEntityData
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  ${CORE_PROJECT_ENTITY_FIELDS}
  mutation AddProject(
    $currentDate: DateTime!
    $userId: ID!
    $userTitle: String
    $owningOrganizationId: ID!
    $name: String!
    $entityDisplayName: String
    $entityName: String!
    $category: ProjectInfoCategory
    $shortDescription: String
    $website: String
    $entityType: LegalEntityType!
    $operatingCurrency: CurrencyCode!
    $jurisdiction: String!
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String
  ) {
    addProject(
      input: [
        {
          name: $name
          lastUpdate: $currentDate
          info: {
            creationDate: $currentDate
            category: $category
            shortDescription: $shortDescription
            website: $website
          }
          projectUsers: [{ user: { id: $userId }, roles: ADMIN }]
          projectEntity: [
            {
              lastUpdate: $currentDate
              archived: false
              linkedEntity: {
                type: $entityType
                displayName: $entityDisplayName
                fullName: $entityName
                operatingCurrency: { code: $operatingCurrency }
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
                users: { user: { id: $userId }, permissions: ADMIN, title: $userTitle }
                owners: { id: $owningOrganizationId }
              }
            }
          ]
        }
      ]
    ) {
      project {
        id
        name
        info {
          ...projectInfoData
        }
        projectEntity {
          ...projectEntityData
        }
      }
    }
  }
`;

export const UPDATE_PROJECT_MAIN_INFO = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  mutation UpdateProjectInfo(
    $currentDate: DateTime
    $projectSlug: String!
    $projectName: String!
    $projectInfoId: [ID!]
    $category: ProjectInfoCategory
    $logo: String
    $shortDescription: String
    $brandColor: String
    $lightBrand: Boolean
    $progress: ProjectInfoProgress
    $intention: ProjectInfoIntention
    $website: String
    $videoURL: String
    $pitchDeck: String
  ) {
    updateProject(input: { filter: { id: { eq: $id } }, set: { name: $projectName, lastUpdate: $currentDate } }) {
      project {
        id
        name
        slug
        lastUpdate
      }
    }
    updateProjectInfo(
      input: {
        filter: { id: $projectInfoId }
        set: {
          category: $category
          logo: $logo
          shortDescription: $shortDescription
          brandColor: $brandColor
          lightBrand: $lightBrand
          progress: $progress
          intention: $intention
          website: $website
          videoURL: $videoURL
          pitchDeck: $pitchDeck
        }
      }
    ) {
      projectInfo {
        ...projectInfoData
      }
    }
  }
`;

export const UPDATE_PROJECT_FULL_DESCRIPTION = gql`
  ${CORE_PROJECT_INFO_FIELDS}
  mutation UpdateProjectFullDescription(
    $description: String!
    $currentDate: DateTime
    $projectId: String!
    $projectInfoId: [ID!]
  ) {
    updateProject(input: { filter: { id: { eq: $projectId } }, set: { lastUpdate: $currentDate } }) {
      project {
        id
        name
        slug
        lastUpdate
      }
    }
    updateProjectInfo(input: { filter: { id: $projectInfoId }, set: { generalDescription: $description } }) {
      projectInfo {
        ...projectInfoData
      }
    }
  }
`;

export const ADD_PROJECT_DOCUMENT = gql`
  mutation AddProjectInfoDocument(
    $projectInfoId: [ID!]
    $title: String
    $url: String
    $type: ProjectInfoDocumentType
    $hidden: Boolean
  ) {
    updateProjectInfo(
      input: {
        filter: { id: $projectInfoId }
        set: { documents: { title: $title, url: $url, type: $type, hidden: $hidden } }
      }
    ) {
      numUids
      projectInfo {
        id
        documents {
          id
          title
          type
        }
      }
    }
  }
`;

export const REMOVE_PROJECT_DOCUMENT = gql`
  mutation RemoveProjectInfoDocument($projectInfoId: [ID!], $documentId: ID!) {
    updateProjectInfo(input: { filter: { id: $projectInfoId }, remove: { documents: { id: $id } } }) {
      numUids
      projectInfo {
        id
      }
    }
  }
  mutation DeleteProjectInfoDocument($documentId: ID!) {
    deleteProjectInfoDocument(filter: { id: $id }) {
      msg
    }
  }
`;

export const UPDATE_PROJECT_DOCUMENT = gql`
  mutation UpdateProjectInfoDocument(
    $documentId: [ID!]
    $title: String
    $url: String
    $type: ProjectInfoDocumentType
    $hidden: Boolean
  ) {
    updateProjectInfoDocument(
      input: { filter: { id: $documentId }, set: { title: $title, url: $url, type: $type, hidden: $hidden } }
    ) {
      numUids
      projectInfoDocument {
        id
        title
        type
      }
    }
  }
`;
