import gql from 'graphql-tag';
import { CORE_RE_PROPERTY_FIELDS } from './fragments';

export const GET_RE_PROPERTY = gql`
  ${CORE_RE_PROPERTY_FIELDS}
  query GetRealEstateProperty($id: ID!) {
    getRealEstateProperty(id: $id) {
      ...rePropertyData
    }
  }
`;

export const ADD_RE_PROPERTY_INFO = gql`
  mutation AddRePropertyInfo(
    $currentDate: DateTime!
    $entityId: [ID!]
    $propertyType: RealEstatePropertyType!
    $investmentStatus: AssetStatus!
    $amenitiesDescription: String
    $description: String
    $downPayment: Int
    $lenderFees: Int
    $closingCosts: Int
    $addressLine1: String
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
    $lat: Float!
    $lng: Float!
  ) {
    updateLegalEntity(
      input: {
        filter: { id: $entityId }
        set: {
          lastUpdate: $currentDate
          realEstateProperties: {
            creationDate: $currentDate
            lastUpdate: $currentDate
            propertyType: $propertyType
            investmentStatus: $investmentStatus
            address: {
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
            amenitiesDescription: $amenitiesDescription
            description: $description
            # images: [{ url: $imageUrl }]
            downPayment: $downPayment
            lenderFees: $lenderFees
            closingCosts: $closingCosts
          }
        }
      }
    ) {
      legalEntity {
        id
        fullName
        realEstateProperties {
          id
          investmentStatus
        }
      }
    }
  }
`;

export const UPDATE_RE_PROPERTY_INFO = gql`
  mutation UpdateRePropertyInfo(
    $currentDate: DateTime!
    $rePropertyId: [ID!]
    $propertyType: RealEstatePropertyType!
    $investmentStatus: AssetStatus!
    $amenitiesDescription: String
    $description: String
    $assetValue: Int
    $assetValueNote: String
    $downPayment: Int
    $lenderFees: Int
    $closingCosts: Int
    $loanAmount: Int
  ) {
    updateRealEstateProperty(
      input: {
        filter: { id: $rePropertyId }
        set: {
          lastUpdate: $currentDate
          propertyType: $propertyType
          investmentStatus: $investmentStatus
          amenitiesDescription: $amenitiesDescription
          description: $description
          assetValue: $assetValue
          assetValueNote: $assetValueNote
          downPayment: $downPayment
          lenderFees: $lenderFees
          closingCosts: $closingCosts
          loan: $loanAmount
        }
      }
    ) {
      realEstateProperty {
        id
        investmentStatus
        amenitiesDescription
        description
        assetValue
        assetValueNote
        downPayment
        lenderFees
        closingCosts
        loan
        owner {
          id
          offerings {
            id
          }
        }
      }
    }
  }
`;

// TO DO: cascaded delete associated images - not yet a GraphQL feature of Dgraph
export const REMOVE_ENTITY_PROPERTY = gql`
  mutation RemoveReProperty($currentDate: DateTime, $ownerId: [ID!], $propertyId: ID!) {
    updateLegalEntity(
      input: {
        filter: { id: $ownerId }
        remove: { realEstateProperties: { id: $propertyId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      legalEntity {
        id
      }
    }
    deleteRealEstateProperty(filter: { id: [$propertyId] }) {
      msg
    }
  }
`;

// --------------- Address ----------------

export const ADD_PROPERTY_ADDRESS = gql`
  mutation AddPropertyAddress(
    $propertyId: [ID!]
    $addressLabel: String
    $addressLine1: String!
    $addressLine2: String
    $addressLine3: String
    $city: String!
    $stateProvince: String
    $postalCode: String
    $country: String!
  ) {
    updateRealEstateProperty(
      input: {
        filter: { id: $propertyId }
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
          }
          lastUpdate: $currentDate
        }
      }
    ) {
      realEstateProperty {
        id
        address {
          id
          label
          line1
        }
      }
    }
  }
`;

export const REMOVE_PROPERTY_ADDRESS = gql`
  mutation RemoveAddress($propertyId: [ID!], $geoAddressId: ID!) {
    updateRealEstateProperty(
      input: {
        filter: { id: $propertyId }
        remove: { address: { id: $geoAddressId } }
        set: { lastUpdate: $currentDate }
      }
    ) {
      numUids
      realEstateProperty {
        id
      }
    }
    deleteAddress(filter: { id: $geoAddressId }) {
      msg
    }
  }
`;

// --------------- Image ----------------

export const ADD_PROPERTY_IMAGE = gql`
  mutation AddPropertyImage(
    $currentDate: DateTime!
    $propertyId: [ID!]
    $url: String!
    $label: String
    $fileId: String
  ) {
    updateRealEstateProperty(
      input: {
        filter: { id: $propertyId }
        set: { lastUpdate: $currentDate, images: { url: $url, label: $label, fileId: $fileId } }
      }
    ) {
      realEstateProperty {
        id
        images {
          id
          label
          url
          fileId
        }
      }
    }
  }
`;

export const REMOVE_PROPERTY_IMAGE = gql`
  mutation RemoveAddress($currentDate: DateTime!, $propertyId: [ID!], $imageId: ID!) {
    updateRealEstateProperty(
      input: { filter: { id: $propertyId }, remove: { images: { id: $imageId } }, set: { lastUpdate: $currentDate } }
    ) {
      numUids
      realEstateProperty {
        id
        images {
          id
        }
      }
    }
    deleteImage(filter: { id: [$imageId] }) {
      msg
      image {
        id
      }
    }
  }
`;
