import gql from 'graphql-tag';
import { CORE_DOCUMENT_FIELDS } from './fragments';

export const GET_DOCUMENT_EDITORS = gql`
  query GetDocumentEditors($fileId: String!) {
    queryDocument(filter: { fileId: { allofterms: $fileId } }) {
      owner {
        organization {
          users(filter: { permissions: { in: [EDITOR, ADMIN] } }) {
            user {
              id
            }
          }
        }
      }
    }
  }
`;

export const ADD_OFFERING_DOCUMENT = gql`
  ${CORE_DOCUMENT_FIELDS}
  mutation AddOfferingDocument(
    $offeringId: ID!
    $ownerEntityId: ID!
    $offeringUniqueId: String!
    $currentDate: DateTime!
    $title: String!
    $fileId: String!
    $docUrl: String!
    $docType: DocumentType!
    $format: DocumentFormat!
  ) {
    addDocument(
      input: {
        title: $title
        url: $docUrl
        fileId: $fileId
        creationDate: $currentDate
        lastUpdate: $currentDate
        type: $docType
        format: $format
        offering: { id: $offeringId }
        owner: { id: $ownerEntityId }
        offeringUniqueId: $offeringUniqueId
      }
      upsert: true
    ) {
      document {
        ...documentData
      }
    }
    updateOffering(input: { filter: { id: [$offeringId] }, set: { lastUpdate: $currentDate } }) {
      offering {
        id
        lastUpdate
        documents {
          id
        }
      }
    }
  }
`;

export const REMOVE_OFFERING_DOCUMENT = gql`
  mutation RemoveOfferingDocument($offeringId: [ID!], $documentId: ID!, $currentDate: DateTime) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        remove: { documents: { id: $documentId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      offering {
        id
        documents {
          id
        }
      }
    }
    deleteDocument(filter: { id: [$documentId] }) {
      msg
    }
  }
`;
