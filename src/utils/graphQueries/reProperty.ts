import { gql } from "@apollo/client";

import { CORE_RE_PROPERTY_FIELDS } from "./fragments";

export const GET_RE_PROPERTY = gql`
  ${CORE_RE_PROPERTY_FIELDS}
  query GetRealEstateProperty($id: UUID!) {
    real_estate_propertyCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...RealEstatePropertyFields
        }
      }
    }
  }
`;

export const ADD_RE_PROPERTY_INFO = gql`
  mutation AddRePropertyInfo(
    $entityId: UUID!
    $propertyType: real_estate_property_type!
    $investmentStatus: asset_status!
    $amenitiesDescription: String
    $description: String
    $downPayment: Int
    $lenderFees: Int
    $closingCosts: Int
  ) {
    insertIntoreal_estate_propertyCollection(
      objects: [
        {
          owner_id: $entityId
          property_type: $propertyType
          investment_status: $investmentStatus
          amenities_description: $amenitiesDescription
          description: $description
          down_payment: $downPayment
          lender_fees: $lenderFees
          closing_costs: $closingCosts
        }
      ]
    ) {
      affectedCount
      records {
        id
        investment_status
      }
    }
  }
`;

export const UPDATE_RE_PROPERTY_INFO = gql`
  mutation UpdateRePropertyInfo(
    $rePropertyId: UUID!
    $propertyType: real_estate_property_type!
    $investmentStatus: asset_status!
    $amenitiesDescription: String
    $description: String
    $assetValue: Int
    $assetValueNote: String
    $downPayment: Int
    $lenderFees: Int
    $closingCosts: Int
    $loanAmount: Int
  ) {
    updatereal_estate_propertyCollection(
      filter: { id: { eq: $rePropertyId } }
      set: {
        property_type: $propertyType
        investment_status: $investmentStatus
        amenities_description: $amenitiesDescription
        description: $description
        asset_value: $assetValue
        asset_value_note: $assetValueNote
        down_payment: $downPayment
        lender_fees: $lenderFees
        closing_costs: $closingCosts
        loan: $loanAmount
      }
    ) {
      affectedCount
      records {
        id
        investment_status
        amenities_description
        description
        asset_value
        asset_value_note
        down_payment
        lender_fees
        closing_costs
        loan
        owner_id
      }
    }
  }
`;

// TO DO: cascaded delete associated images - not yet a GraphQL feature of Dgraph
export const REMOVE_ENTITY_PROPERTY = gql`
  mutation RemoveReProperty($propertyId: UUID!) {
    deleteFromreal_estate_propertyCollection(filter: { id: { eq: $propertyId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;

// --------------- Address ----------------

export const ADD_PROPERTY_ADDRESS = gql`
  mutation AddPropertyAddress(
    $propertyId: UUID!
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    insertIntoaddressCollection(
      objects: [
        {
          label: $addressLabel
          line1: $addressLine1
          line2: $addressLine2
          line3: $addressLine3
          city: $city
          state_province: $stateProvince
          postal_code: $postalCode
          country: $country
        }
      ]
    ) {
      affectedCount
      records {
        id
        label
        line1
      }
    }
  }
`;

export const REMOVE_PROPERTY_ADDRESS = gql`
  mutation RemovePropertyAddress($geoAddressId: UUID!) {
    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;

// --------------- Image ----------------

export const ADD_PROPERTY_IMAGE = gql`
  mutation AddPropertyImage($url: String!, $label: String, $fileId: String) {
    insertIntoimageCollection(objects: [{ url: $url, label: $label, file_id: $fileId }]) {
      affectedCount
      records {
        id
        label
        url
        file_id
      }
    }
  }
`;

export const REMOVE_PROPERTY_IMAGE = gql`
  mutation RemovePropertyImage($imageId: UUID!) {
    deleteFromimageCollection(filter: { id: { eq: $imageId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;
