import { gql } from '@apollo/client';

import { CORE_DOCUMENT_FIELDS } from './fragments';

export const GET_DOCUMENT_EDITORS = gql`
  query GetDocumentEditors($fileId: String!) {
    documentCollection(filter: { file_id: { eq: $fileId } }) {
      edges {
        node {
          legal_entity {
            organization {
              organization_userCollection {
                edges {
                  node {
                    user_id
                    permissions
                  }
                }
              }
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
    $offeringId: UUID!
    $entityId: UUID!
    $offeringUniqueId: String!
    $title: String!
    $fileId: String!
    $docUrl: String!
    $docType: document_type!
    $format: document_format!
  ) {
    insertIntodocumentCollection(
      objects: [{
        title: $title,
        url: $docUrl,
        file_id: $fileId,
        type: $docType,
        format: $format,
        offering_id: $offeringId,
        owner_id: $entityId,
        offering_unique_id: $offeringUniqueId
      }]
    ) {
      affectedCount
      records {
        ...DocumentFields
      }
    }
    updateofferingCollection(
      filter: { id: { eq: $offeringId } }
      set: { updated_at: now() }
    ) {
      affectedCount
      records {
        id
        updated_at
      }
    }
  }
`;

export const REMOVE_OFFERING_DOCUMENT = gql`
  mutation RemoveOfferingDocument($offeringId: UUID!, $documentId: UUID!) {
    updateofferingCollection(
      filter: { id: { eq: $offeringId } }
      set: { updated_at: now() }
    ) {
      affectedCount
      records {
        id
        updated_at
      }
    }
    deleteFromdocumentCollection(filter: { id: [$documentId] }) {
      affectedCount
    }
  }
`;
