import { gql } from "@apollo/client";

export const CORE_LINKED_ACCOUNT_FIELDS = gql`
  fragment LinkedAccountFields on linked_account {
    id
    account_provided_id
    username
    url
    type
    verified
    hidden
    organization_id
  }
`;

export const CORE_ADDRESS_FIELDS = gql`
  fragment AddressFields on address {
    id
    label
    line1
    line2
    line3
    city
    state_province
    postal_code
    country
    lat
    lng
    legal_entity_id
  }
`;

export const CORE_DOCUMENT_FIELDS = gql`
  fragment DocumentFields on document {
    id
    title
    file_id
    date
    format
    type
    text
    url
    thumbnail_image_id
    owner_id
    access
    offering_id
    offering_unique_id
  }
`;

export const CORE_APPLICATION_FIELDS = gql`
  fragment ApplicationFields on investor_application {
    id
    offering_participant_id
    application_doc_id
  }
`;

export const SMART_CONTRACT_FIELDS = gql`
  fragment SmartContractFields on smart_contract {
    id
    crypto_address_id
    type
    num_tokens_authorized
    backing_token
    owner_id
    established
    partitions
  }
`;

export const SMART_CONTRACT_SET_FIELDS = gql`
  ${SMART_CONTRACT_FIELDS}
  fragment SmartContractSetFields on offering_smart_contract_set {
    id
    offering_id
    share_contract_id
    swap_contract_id
    distribution_contract_id
  }
`;

export const CORE_INVESTMENT_OFFERING_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}

  fragment OfferingDetailsFields on offering_detail {
    id
    type
    custom_onboarding_link
    stage
    investment_currency
    num_units
    min_units_per_investor
    max_units_per_investor
    max_raise
    min_raise
    price_start
    max_investors
    min_investors
    raise_start
    raise_period
    additional_info
    distribution_period
    distribution_frequency
    distribution_currency
    distribution_description
    admin_expense
    projected_irr
    projected_irr_max
    target_equity_multiple
    target_equity_multiple_max
    preferred_return
    coc_return
    projected_appreciation
    cap_rate
  }
`;

export const CORE_RE_PROPERTY_FIELDS = gql`
  ${CORE_ADDRESS_FIELDS}
  fragment RealEstatePropertyFields on real_estate_property {
    id
    property_type
    investment_status
    address_id
    amenities_description
    description
    asset_value
    asset_value_note
    loan
    down_payment
    lender_fees
    closing_costs
    owner_id
  }
`;

export const CORE_INVESTMENT_PARTICIPANT_FIELDS = gql`
  ${CORE_APPLICATION_FIELDS}
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  fragment OfferingParticipantFields on offering_participant {
    id
    address_offering_id
    wallet_address
    chain_id
    name
    external_id
    min_pledge
    max_pledge
    offering_id
  }
`;

export const CORE_ENTITY_FIELDS = gql`
  fragment LegalEntityFields on legal_entity {
    id
    tax_id
    display_name
    legal_name
    purpose
    jurisdiction_id
    operating_currency
    organization_id
    type
  }
`;

export const CORE_OFFERING_FIELDS = gql`
  ${CORE_INVESTMENT_OFFERING_FIELDS}
  ${CORE_ENTITY_FIELDS}
  ${CORE_INVESTMENT_PARTICIPANT_FIELDS}
  ${SMART_CONTRACT_SET_FIELDS}
  ${CORE_APPLICATION_FIELDS}
  fragment OfferingFields on offering {
    id
    name
    is_public
    access_code
    waitlist_on
    image {
      id
      url
      label
      file_id
    }
    banner_image
    primary_video
    brand_color
    light_brand
    website
    short_description
  }
`;

export const CORE_ORGANIZATION_FIELDS = gql`
  ${CORE_LINKED_ACCOUNT_FIELDS}
  ${CORE_OFFERING_FIELDS}
  fragment OrganizationFields on organization {
    id
    name
    description
    logo
    brand_color
    banner_image
    website
    is_public
    phone
    country
  }
`;

export const CORE_USER_FIELDS = gql`
  ${CORE_ENTITY_FIELDS}
  fragment UserFields on profile {
    id
  }
`;

export const CORE_DOCUMENT_SIGNATORY_FIELDS = gql`
  ${CORE_DOCUMENT_FIELDS}
  fragment DocumentSignatoryFields on document_signatory {
    id
    document_id
    signer_address
    legal_entity_id
  }
`;
