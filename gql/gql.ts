/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  query GetCryptoAddress($walletAddress: String!) {\n    crypto_addressCollection(filter: { address: { eq: $walletAddress } }) {\n      edges {\n        node {\n          id\n          address\n          legal_entity {\n            id\n            legal_name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetCryptoAddressDocument;
  "\n  mutation UpdateCryptoAddress($id: UUID!, $name: String, $isPublic: Boolean) {\n    updatecrypto_addressCollection(\n      filter: { id: { eq: $id } }\n      set: { name: $name, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        legal_entity_id\n      }\n    }\n  }\n": typeof types.UpdateCryptoAddressDocument;
  "\n  mutation AddContractPartition($id: UUID!, $partition: String!) {\n    updatesmart_contractCollection(filter: { id: { eq: $id } }, set: { partitions: [$partition] }) {\n      affectedCount\n      records {\n        id\n        partitions\n        owner_id\n      }\n    }\n  }\n": typeof types.AddContractPartitionDocument;
  "\n  mutation AddShareContract($cryptoAddressId: UUID!, $ownerId: UUID!, $type: smart_contract_type!) {\n    insertIntosmart_contractCollection(\n      objects: [\n        { crypto_address_id: $cryptoAddressId, owner_id: $ownerId, type: $type, established: false }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n        crypto_address_id\n        type\n        established\n      }\n    }\n  }\n": typeof types.AddShareContractDocument;
  "\n  mutation AddSwapContract($contractSetId: UUID!, $swapContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { swap_contract_id: $swapContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        swap_contract_id\n        offering_id\n      }\n    }\n  }\n": typeof types.AddSwapContractDocument;
  "\n  mutation AddDistributionContract($contractSetId: UUID!, $distributionContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { distribution_contract_id: $distributionContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        distribution_contract_id\n        offering_id\n      }\n    }\n  }\n": typeof types.AddDistributionContractDocument;
  "\n  mutation UpdateSmartContract($id: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $id } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n      }\n    }\n  }\n": typeof types.UpdateSmartContractDocument;
  "\n  fragment LinkedAccountFields on linked_account {\n    id\n    account_provided_id\n    username\n    url\n    type\n    verified\n    hidden\n    organization_id\n  }\n": typeof types.LinkedAccountFieldsFragmentDoc;
  "\n  fragment AddressFields on address {\n    id\n    label\n    line1\n    line2\n    line3\n    city\n    state_province\n    postal_code\n    country\n    lat\n    lng\n    legal_entity_id\n  }\n": typeof types.AddressFieldsFragmentDoc;
  "\n  fragment DocumentFields on document {\n    id\n    title\n    file_id\n    date\n    format\n    type\n    text\n    url\n    thumbnail_image_id\n    owner_id\n    access\n    offering_id\n    offering_unique_id\n  }\n": typeof types.DocumentFieldsFragmentDoc;
  "\n  fragment ApplicationFields on investor_application {\n    id\n    offering_participant_id\n    application_doc_id\n  }\n": typeof types.ApplicationFieldsFragmentDoc;
  "\n  fragment SmartContractFields on smart_contract {\n    id\n    crypto_address_id\n    type\n    num_tokens_authorized\n    backing_token\n    owner_id\n    established\n    partitions\n  }\n": typeof types.SmartContractFieldsFragmentDoc;
  "\n  \n  fragment SmartContractSetFields on offering_smart_contract_set {\n    id\n    offering_id\n    share_contract_id\n    swap_contract_id\n    distribution_contract_id\n  }\n": typeof types.SmartContractSetFieldsFragmentDoc;
  "\n  \n\n  fragment OfferingDetailsFields on offering_detail {\n    id\n    type\n    custom_onboarding_link\n    stage\n    investment_currency\n    num_units\n    min_units_per_investor\n    max_units_per_investor\n    max_raise\n    min_raise\n    price_start\n    max_investors\n    min_investors\n    raise_start\n    raise_period\n    additional_info\n    distribution_period\n    distribution_frequency\n    distribution_currency\n    distribution_description\n    admin_expense\n    projected_irr\n    projected_irr_max\n    target_equity_multiple\n    target_equity_multiple_max\n    preferred_return\n    coc_return\n    projected_appreciation\n    cap_rate\n  }\n": typeof types.OfferingDetailsFieldsFragmentDoc;
  "\n  \n  fragment RealEstatePropertyFields on real_estate_property {\n    id\n    property_type\n    investment_status\n    address_id\n    amenities_description\n    description\n    asset_value\n    asset_value_note\n    loan\n    down_payment\n    lender_fees\n    closing_costs\n    owner_id\n  }\n": typeof types.RealEstatePropertyFieldsFragmentDoc;
  "\n  \n  \n  fragment OfferingParticipantFields on offering_participant {\n    id\n    address_offering_id\n    wallet_address\n    chain_id\n    name\n    external_id\n    min_pledge\n    max_pledge\n    offering_id\n  }\n": typeof types.OfferingParticipantFieldsFragmentDoc;
  "\n  fragment LegalEntityFields on legal_entity {\n    id\n    tax_id\n    display_name\n    legal_name\n    purpose\n    jurisdiction_id\n    operating_currency\n    organization_id\n    type\n  }\n": typeof types.LegalEntityFieldsFragmentDoc;
  "\n  \n  \n  \n  \n  \n  fragment OfferingFields on offering {\n    id\n    name\n    is_public\n    access_code\n    waitlist_on\n    image { \n      id, url, label, file_id\n    }\n    banner_image\n    primary_video\n    brand_color\n    light_brand\n    website\n    short_description\n  }\n": typeof types.OfferingFieldsFragmentDoc;
  "\n  \n  \n  fragment OrganizationFields on organization {\n    id\n    name\n    description\n    logo\n    brand_color\n    banner_image\n    website\n    is_public\n    phone\n    country\n  }\n": typeof types.OrganizationFieldsFragmentDoc;
  "\n  \n  fragment UserFields on profile {\n    id\n  }\n": typeof types.UserFieldsFragmentDoc;
  "\n  \n  fragment DocumentSignatoryFields on document_signatory {\n    id\n    document_id\n    signer_address\n    legal_entity_id\n  }\n": typeof types.DocumentSignatoryFieldsFragmentDoc;
  "\n  query RetrieveTransferEvents($shareContractAddress: String!) {\n    share_transfer_eventCollection(\n      filter: { share_contract_address: { eq: $shareContractAddress } }\n    ) {\n      edges {\n        node {\n          id\n          share_contract_address\n          order_index\n          recipient_address\n          sender_address\n          amount\n          price\n          currency_code\n          transaction_hash\n          partition\n          type\n        }\n      }\n    }\n  }\n": typeof types.RetrieveTransferEventsDocument;
  "\n  mutation AddTransferEvent(\n    $shareContractAddress: String!\n    $orderIndex: Int\n    $recipientAddress: String!\n    $senderAddress: String!\n    $amount: Int!\n    $price: String\n    $currencyCode: currency_code\n    $transactionHash: String!\n    $partition: String!\n    $type: share_transfer_event_type!\n  ) {\n    insertIntoshare_transfer_eventCollection(\n      objects: [\n        {\n          share_contract_address: $shareContractAddress\n          order_index: $orderIndex\n          recipient_address: $recipientAddress\n          sender_address: $senderAddress\n          amount: $amount\n          price: $price\n          currency_code: $currencyCode\n          transaction_hash: $transactionHash\n          partition: $partition\n          type: $type\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        share_contract_address\n        order_index\n        recipient_address\n        sender_address\n        amount\n        price\n        currency_code\n        transaction_hash\n        partition\n        type\n      }\n    }\n  }\n": typeof types.AddTransferEventDocument;
  "\n  mutation AddDistribution($transactionHash: String!, $contractIndex: Int!) {\n    insertIntooffering_distributionCollection(\n      objects: [{ transaction_hash: $transactionHash, contract_index: $contractIndex }]\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n": typeof types.AddDistributionDocument;
  "\n  mutation UpdateOfferingDistribution($distributionId: UUID!, $contractIndex: Int!) {\n    updateoffering_distributionCollection(\n      filter: { id: { eq: $distributionId } }\n      set: { contract_index: $contractIndex }\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n": typeof types.UpdateOfferingDistributionDocument;
  "\n  mutation UpdateContractStatus($smartshareContractId: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $smartshareContractId } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        established\n      }\n    }\n  }\n": typeof types.UpdateContractStatusDocument;
  "\n  mutation CreateOrder(\n    $contractIndex: Int!\n    $swapContractAddress: String!\n    $minUnits: Int\n    $maxUnits: Int\n    $visible: Boolean!\n    $initiator: String!\n    $transactionHash: String!\n  ) {\n    insertIntoshare_orderCollection(\n      objects: [\n        {\n          contract_index: $contractIndex\n          swap_contract_address: $swapContractAddress\n          min_units: $minUnits\n          max_units: $maxUnits\n          initiator: $initiator\n          transaction_hash: $transactionHash\n          visible: $visible\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        contract_index\n        initiator\n        transaction_hash\n      }\n    }\n  }\n": typeof types.CreateOrderDocument;
  "\n  query RetrieveOrders($swapContractAddress: String!) {\n    share_orderCollection(filter: { swap_contract_address: { eq: $swapContractAddress } }) {\n      edges {\n        node {\n          id\n          contract_index\n          initiator\n          transaction_hash\n          swap_contract_address\n          min_units\n          max_units\n          visible\n          archived\n        }\n      }\n    }\n  }\n": typeof types.RetrieveOrdersDocument;
  "\n  mutation UpdateSale($orderId: UUID!, $visible: Boolean!, $archived: Boolean!) {\n    updateshare_orderCollection(\n      filter: { id: { eq: $orderId } }\n      set: { archived: $archived, visible: $visible }\n    ) {\n      affectedCount\n      records {\n        id\n        visible\n        archived\n      }\n    }\n  }\n": typeof types.UpdateSaleDocument;
  "\n  mutation RemoveShareOrder($orderId: UUID!) {\n    deleteFromshare_orderCollection(filter: { id: { eq: $orderId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveShareOrderDocument;
  "\n  \n  query GetOrganization($id: UUID!) {\n    organizationCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...OrganizationFields\n        }\n      }\n    }\n  }\n": typeof types.GetOrganizationDocument;
  "\n  mutation AddOrganization(\n    $name: String!\n    $logo: String\n    $shortDescription: String\n    $website: String\n    $country: String\n  ) {\n    insertIntoorganizationCollection(\n      objects: [\n        {\n          name: $name\n          is_public: false\n          logo: $logo\n          website: $website\n          country: $country\n          short_description: $shortDescription\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        logo\n        website\n        country\n        short_description\n      }\n    }\n  }\n": typeof types.AddOrganizationDocument;
  "\n  mutation AddOrganizationUser(\n    $userId: UUID!\n    $organizationId: UUID!\n    $permission: [organization_permission_type]\n  ) {\n    insertIntoorganization_userCollection(\n      objects: [{ user_id: $userId, organization_id: $organizationId, permissions: $permission }]\n    ) {\n      affectedCount\n      records {\n        id\n        user_id\n        organization_id\n        permissions\n      }\n    }\n  }\n": typeof types.AddOrganizationUserDocument;
  "\n  mutation RemoveOrganizationUser($organizationUserId: UUID!) {\n    deleteFromorganization_userCollection(filter: { id: { eq: $organizationUserId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveOrganizationUserDocument;
  "\n  mutation UpdateOrganization(\n    $organizationId: UUID!\n    $name: String!\n    $logo: String\n    $bannerImage: String\n    $isPublic: Boolean\n    $shortDescription: String\n    $description: String\n    $country: String\n  ) {\n    updateorganizationCollection(\n      filter: { id: { eq: $organizationId } }\n      set: {\n        name: $name\n        logo: $logo\n        banner_image: $bannerImage\n        is_public: $isPublic\n        short_description: $shortDescription\n        description: $description\n        country: $country\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        description\n        country\n        logo\n        banner_image\n      }\n    }\n  }\n": typeof types.UpdateOrganizationDocument;
  "\n  mutation AddNotificationRule(\n    $organizationUserId: UUID!\n    $notificationRecipientType: notification_recipient_type!\n    $notificationMethod: notification_method!\n    $notificationSubject: notification_subject!\n  ) {\n    insertIntonotification_configurationCollection(\n      objects: [\n        {\n          organization_user_id: $organizationUserId\n          notification_recipient_type: $notificationRecipientType\n          notification_method: $notificationMethod\n          notification_subject: $notificationSubject\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        notification_recipient_type\n        notification_method\n        notification_subject\n        organization_user_id\n      }\n    }\n  }\n": typeof types.AddNotificationRuleDocument;
  "\n  mutation RemoveNotificationRule($notificationConfigurationId: UUID!) {\n    deleteFromnotification_configurationCollection(\n      filter: { id: { eq: $notificationConfigurationId } }\n    ) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveNotificationRuleDocument;
  "\n  mutation AddUserEmail(\n    $organizationId: UUID!\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    insertIntoemail_addressCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          address: $address\n          name: $name\n          description: $description\n          is_public: $isPublic\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        address\n        organization_id\n      }\n    }\n  }\n": typeof types.AddUserEmailDocument;
  "\n  mutation RemoveOrganizationEmail($emailAddress: String!) {\n    deleteFromemail_addressCollection(filter: { address: { eq: $emailAddress } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveOrganizationEmailDocument;
  "\n  mutation UpdateUserEmail(\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    updateemail_addressCollection(\n      filter: { address: { eq: $address } }\n      set: { name: $name, description: $description, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        organization_id\n      }\n    }\n  }\n": typeof types.UpdateUserEmailDocument;
  "\n  mutation AddOrganizationSocialAccounts(\n    $organizationId: UUID!\n    $url: String!\n    $type: linked_account_type!\n\n  ) {\n    insertIntolinked_accountCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          url: $url\n          type: $type\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        organization_id\n        url\n        type\n        verified\n        hidden\n      }\n    }\n  }\n": typeof types.AddOrganizationSocialAccountsDocument;
  "\n  mutation RemoveOrganizationSocialAccount($socialId: UUID!) {\n    deleteFromlinked_accountCollection(filter: { id: { eq: $socialId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveOrganizationSocialAccountDocument;
  "\n  \n  query GetRealEstateProperty($id: UUID!) {\n    real_estate_propertyCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...RealEstatePropertyFields\n        }\n      }\n    }\n  }\n": typeof types.GetRealEstatePropertyDocument;
  "\n  mutation AddRePropertyInfo(\n    $entityId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n  ) {\n    insertIntoreal_estate_propertyCollection(\n      objects: [\n        {\n          owner_id: $entityId\n          property_type: $propertyType\n          investment_status: $investmentStatus\n          amenities_description: $amenitiesDescription\n          description: $description\n          down_payment: $downPayment\n          lender_fees: $lenderFees\n          closing_costs: $closingCosts\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n      }\n    }\n  }\n": typeof types.AddRePropertyInfoDocument;
  "\n  mutation UpdateRePropertyInfo(\n    $rePropertyId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $assetValue: Int\n    $assetValueNote: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n    $loanAmount: Int\n  ) {\n    updatereal_estate_propertyCollection(\n      filter: { id: { eq: $rePropertyId } }\n      set: {\n        property_type: $propertyType\n        investment_status: $investmentStatus\n        amenities_description: $amenitiesDescription\n        description: $description\n        asset_value: $assetValue\n        asset_value_note: $assetValueNote\n        down_payment: $downPayment\n        lender_fees: $lenderFees\n        closing_costs: $closingCosts\n        loan: $loanAmount\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n        amenities_description\n        description\n        asset_value\n        asset_value_note\n        down_payment\n        lender_fees\n        closing_costs\n        loan\n        owner_id\n      }\n    }\n  }\n": typeof types.UpdateRePropertyInfoDocument;
  "\n  mutation RemoveReProperty($propertyId: UUID!) {\n    deleteFromreal_estate_propertyCollection(filter: { id: { eq: $propertyId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemoveRePropertyDocument;
  "\n  mutation AddPropertyAddress(\n    $propertyId: UUID!\n    $addressLabel: String\n    $addressLine1: String!\n    $addressLine2: String\n    $addressLine3: String\n    $city: String!\n    $stateProvince: String\n    $postalCode: String\n    $country: String!\n  ) {\n    insertIntoaddressCollection(\n      objects: [\n        {\n          label: $addressLabel\n          line1: $addressLine1\n          line2: $addressLine2\n          line3: $addressLine3\n          city: $city\n          state_province: $stateProvince\n          postal_code: $postalCode\n          country: $country\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        label\n        line1\n      }\n    }\n  }\n": typeof types.AddPropertyAddressDocument;
  "\n  mutation RemovePropertyAddress($geoAddressId: UUID!) {\n    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemovePropertyAddressDocument;
  "\n  mutation AddPropertyImage($url: String!, $label: String, $fileId: String) {\n    insertIntoimageCollection(objects: [{ url: $url, label: $label, file_id: $fileId }]) {\n      affectedCount\n      records {\n        id\n        label\n        url\n        file_id\n      }\n    }\n  }\n": typeof types.AddPropertyImageDocument;
  "\n  mutation RemovePropertyImage($imageId: UUID!) {\n    deleteFromimageCollection(filter: { id: { eq: $imageId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n": typeof types.RemovePropertyImageDocument;
  "\n  query GetUserProfile($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n": typeof types.GetUserProfileDocument;
  "\n  \n  query GetUser($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetUserDocument;
  "\n  query GetUserRole($id: UUID!) {\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          permissions\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetUserRoleDocument;
};
const documents: Documents = {
  "\n  query GetCryptoAddress($walletAddress: String!) {\n    crypto_addressCollection(filter: { address: { eq: $walletAddress } }) {\n      edges {\n        node {\n          id\n          address\n          legal_entity {\n            id\n            legal_name\n          }\n        }\n      }\n    }\n  }\n":
    types.GetCryptoAddressDocument,
  "\n  mutation UpdateCryptoAddress($id: UUID!, $name: String, $isPublic: Boolean) {\n    updatecrypto_addressCollection(\n      filter: { id: { eq: $id } }\n      set: { name: $name, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        legal_entity_id\n      }\n    }\n  }\n":
    types.UpdateCryptoAddressDocument,
  "\n  mutation AddContractPartition($id: UUID!, $partition: String!) {\n    updatesmart_contractCollection(filter: { id: { eq: $id } }, set: { partitions: [$partition] }) {\n      affectedCount\n      records {\n        id\n        partitions\n        owner_id\n      }\n    }\n  }\n":
    types.AddContractPartitionDocument,
  "\n  mutation AddShareContract($cryptoAddressId: UUID!, $ownerId: UUID!, $type: smart_contract_type!) {\n    insertIntosmart_contractCollection(\n      objects: [\n        { crypto_address_id: $cryptoAddressId, owner_id: $ownerId, type: $type, established: false }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n        crypto_address_id\n        type\n        established\n      }\n    }\n  }\n":
    types.AddShareContractDocument,
  "\n  mutation AddSwapContract($contractSetId: UUID!, $swapContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { swap_contract_id: $swapContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        swap_contract_id\n        offering_id\n      }\n    }\n  }\n":
    types.AddSwapContractDocument,
  "\n  mutation AddDistributionContract($contractSetId: UUID!, $distributionContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { distribution_contract_id: $distributionContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        distribution_contract_id\n        offering_id\n      }\n    }\n  }\n":
    types.AddDistributionContractDocument,
  "\n  mutation UpdateSmartContract($id: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $id } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n      }\n    }\n  }\n":
    types.UpdateSmartContractDocument,
  "\n  fragment LinkedAccountFields on linked_account {\n    id\n    account_provided_id\n    username\n    url\n    type\n    verified\n    hidden\n    organization_id\n  }\n":
    types.LinkedAccountFieldsFragmentDoc,
  "\n  fragment AddressFields on address {\n    id\n    label\n    line1\n    line2\n    line3\n    city\n    state_province\n    postal_code\n    country\n    lat\n    lng\n    legal_entity_id\n  }\n":
    types.AddressFieldsFragmentDoc,
  "\n  fragment DocumentFields on document {\n    id\n    title\n    file_id\n    date\n    format\n    type\n    text\n    url\n    thumbnail_image_id\n    owner_id\n    access\n    offering_id\n    offering_unique_id\n  }\n":
    types.DocumentFieldsFragmentDoc,
  "\n  fragment ApplicationFields on investor_application {\n    id\n    offering_participant_id\n    application_doc_id\n  }\n":
    types.ApplicationFieldsFragmentDoc,
  "\n  fragment SmartContractFields on smart_contract {\n    id\n    crypto_address_id\n    type\n    num_tokens_authorized\n    backing_token\n    owner_id\n    established\n    partitions\n  }\n":
    types.SmartContractFieldsFragmentDoc,
  "\n  \n  fragment SmartContractSetFields on offering_smart_contract_set {\n    id\n    offering_id\n    share_contract_id\n    swap_contract_id\n    distribution_contract_id\n  }\n":
    types.SmartContractSetFieldsFragmentDoc,
  "\n  \n\n  fragment OfferingDetailsFields on offering_detail {\n    id\n    type\n    custom_onboarding_link\n    stage\n    investment_currency\n    num_units\n    min_units_per_investor\n    max_units_per_investor\n    max_raise\n    min_raise\n    price_start\n    max_investors\n    min_investors\n    raise_start\n    raise_period\n    additional_info\n    distribution_period\n    distribution_frequency\n    distribution_currency\n    distribution_description\n    admin_expense\n    projected_irr\n    projected_irr_max\n    target_equity_multiple\n    target_equity_multiple_max\n    preferred_return\n    coc_return\n    projected_appreciation\n    cap_rate\n  }\n":
    types.OfferingDetailsFieldsFragmentDoc,
  "\n  \n  fragment RealEstatePropertyFields on real_estate_property {\n    id\n    property_type\n    investment_status\n    address_id\n    amenities_description\n    description\n    asset_value\n    asset_value_note\n    loan\n    down_payment\n    lender_fees\n    closing_costs\n    owner_id\n  }\n":
    types.RealEstatePropertyFieldsFragmentDoc,
  "\n  \n  \n  fragment OfferingParticipantFields on offering_participant {\n    id\n    address_offering_id\n    wallet_address\n    chain_id\n    name\n    external_id\n    min_pledge\n    max_pledge\n    offering_id\n  }\n":
    types.OfferingParticipantFieldsFragmentDoc,
  "\n  fragment LegalEntityFields on legal_entity {\n    id\n    tax_id\n    display_name\n    legal_name\n    purpose\n    jurisdiction_id\n    operating_currency\n    organization_id\n    type\n  }\n":
    types.LegalEntityFieldsFragmentDoc,
  "\n  \n  \n  \n  \n  \n  fragment OfferingFields on offering {\n    id\n    name\n    is_public\n    access_code\n    waitlist_on\n    image { \n      id, url, label, file_id\n    }\n    banner_image\n    primary_video\n    brand_color\n    light_brand\n    website\n    short_description\n  }\n":
    types.OfferingFieldsFragmentDoc,
  "\n  \n  \n  fragment OrganizationFields on organization {\n    id\n    name\n    description\n    logo\n    brand_color\n    banner_image\n    website\n    is_public\n    phone\n    country\n  }\n":
    types.OrganizationFieldsFragmentDoc,
  "\n  \n  fragment UserFields on profile {\n    id\n  }\n": types.UserFieldsFragmentDoc,
  "\n  \n  fragment DocumentSignatoryFields on document_signatory {\n    id\n    document_id\n    signer_address\n    legal_entity_id\n  }\n":
    types.DocumentSignatoryFieldsFragmentDoc,
  "\n  query RetrieveTransferEvents($shareContractAddress: String!) {\n    share_transfer_eventCollection(\n      filter: { share_contract_address: { eq: $shareContractAddress } }\n    ) {\n      edges {\n        node {\n          id\n          share_contract_address\n          order_index\n          recipient_address\n          sender_address\n          amount\n          price\n          currency_code\n          transaction_hash\n          partition\n          type\n        }\n      }\n    }\n  }\n":
    types.RetrieveTransferEventsDocument,
  "\n  mutation AddTransferEvent(\n    $shareContractAddress: String!\n    $orderIndex: Int\n    $recipientAddress: String!\n    $senderAddress: String!\n    $amount: Int!\n    $price: String\n    $currencyCode: currency_code\n    $transactionHash: String!\n    $partition: String!\n    $type: share_transfer_event_type!\n  ) {\n    insertIntoshare_transfer_eventCollection(\n      objects: [\n        {\n          share_contract_address: $shareContractAddress\n          order_index: $orderIndex\n          recipient_address: $recipientAddress\n          sender_address: $senderAddress\n          amount: $amount\n          price: $price\n          currency_code: $currencyCode\n          transaction_hash: $transactionHash\n          partition: $partition\n          type: $type\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        share_contract_address\n        order_index\n        recipient_address\n        sender_address\n        amount\n        price\n        currency_code\n        transaction_hash\n        partition\n        type\n      }\n    }\n  }\n":
    types.AddTransferEventDocument,
  "\n  mutation AddDistribution($transactionHash: String!, $contractIndex: Int!) {\n    insertIntooffering_distributionCollection(\n      objects: [{ transaction_hash: $transactionHash, contract_index: $contractIndex }]\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n":
    types.AddDistributionDocument,
  "\n  mutation UpdateOfferingDistribution($distributionId: UUID!, $contractIndex: Int!) {\n    updateoffering_distributionCollection(\n      filter: { id: { eq: $distributionId } }\n      set: { contract_index: $contractIndex }\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n":
    types.UpdateOfferingDistributionDocument,
  "\n  mutation UpdateContractStatus($smartshareContractId: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $smartshareContractId } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        established\n      }\n    }\n  }\n":
    types.UpdateContractStatusDocument,
  "\n  mutation CreateOrder(\n    $contractIndex: Int!\n    $swapContractAddress: String!\n    $minUnits: Int\n    $maxUnits: Int\n    $visible: Boolean!\n    $initiator: String!\n    $transactionHash: String!\n  ) {\n    insertIntoshare_orderCollection(\n      objects: [\n        {\n          contract_index: $contractIndex\n          swap_contract_address: $swapContractAddress\n          min_units: $minUnits\n          max_units: $maxUnits\n          initiator: $initiator\n          transaction_hash: $transactionHash\n          visible: $visible\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        contract_index\n        initiator\n        transaction_hash\n      }\n    }\n  }\n":
    types.CreateOrderDocument,
  "\n  query RetrieveOrders($swapContractAddress: String!) {\n    share_orderCollection(filter: { swap_contract_address: { eq: $swapContractAddress } }) {\n      edges {\n        node {\n          id\n          contract_index\n          initiator\n          transaction_hash\n          swap_contract_address\n          min_units\n          max_units\n          visible\n          archived\n        }\n      }\n    }\n  }\n":
    types.RetrieveOrdersDocument,
  "\n  mutation UpdateSale($orderId: UUID!, $visible: Boolean!, $archived: Boolean!) {\n    updateshare_orderCollection(\n      filter: { id: { eq: $orderId } }\n      set: { archived: $archived, visible: $visible }\n    ) {\n      affectedCount\n      records {\n        id\n        visible\n        archived\n      }\n    }\n  }\n":
    types.UpdateSaleDocument,
  "\n  mutation RemoveShareOrder($orderId: UUID!) {\n    deleteFromshare_orderCollection(filter: { id: { eq: $orderId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveShareOrderDocument,
  "\n  \n  query GetOrganization($id: UUID!) {\n    organizationCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...OrganizationFields\n        }\n      }\n    }\n  }\n":
    types.GetOrganizationDocument,
  "\n  mutation AddOrganization(\n    $name: String!\n    $logo: String\n    $shortDescription: String\n    $website: String\n    $country: String\n  ) {\n    insertIntoorganizationCollection(\n      objects: [\n        {\n          name: $name\n          is_public: false\n          logo: $logo\n          website: $website\n          country: $country\n          short_description: $shortDescription\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        logo\n        website\n        country\n        short_description\n      }\n    }\n  }\n":
    types.AddOrganizationDocument,
  "\n  mutation AddOrganizationUser(\n    $userId: UUID!\n    $organizationId: UUID!\n    $permission: [organization_permission_type]\n  ) {\n    insertIntoorganization_userCollection(\n      objects: [{ user_id: $userId, organization_id: $organizationId, permissions: $permission }]\n    ) {\n      affectedCount\n      records {\n        id\n        user_id\n        organization_id\n        permissions\n      }\n    }\n  }\n":
    types.AddOrganizationUserDocument,
  "\n  mutation RemoveOrganizationUser($organizationUserId: UUID!) {\n    deleteFromorganization_userCollection(filter: { id: { eq: $organizationUserId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveOrganizationUserDocument,
  "\n  mutation UpdateOrganization(\n    $organizationId: UUID!\n    $name: String!\n    $logo: String\n    $bannerImage: String\n    $isPublic: Boolean\n    $shortDescription: String\n    $description: String\n    $country: String\n  ) {\n    updateorganizationCollection(\n      filter: { id: { eq: $organizationId } }\n      set: {\n        name: $name\n        logo: $logo\n        banner_image: $bannerImage\n        is_public: $isPublic\n        short_description: $shortDescription\n        description: $description\n        country: $country\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        description\n        country\n        logo\n        banner_image\n      }\n    }\n  }\n":
    types.UpdateOrganizationDocument,
  "\n  mutation AddNotificationRule(\n    $organizationUserId: UUID!\n    $notificationRecipientType: notification_recipient_type!\n    $notificationMethod: notification_method!\n    $notificationSubject: notification_subject!\n  ) {\n    insertIntonotification_configurationCollection(\n      objects: [\n        {\n          organization_user_id: $organizationUserId\n          notification_recipient_type: $notificationRecipientType\n          notification_method: $notificationMethod\n          notification_subject: $notificationSubject\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        notification_recipient_type\n        notification_method\n        notification_subject\n        organization_user_id\n      }\n    }\n  }\n":
    types.AddNotificationRuleDocument,
  "\n  mutation RemoveNotificationRule($notificationConfigurationId: UUID!) {\n    deleteFromnotification_configurationCollection(\n      filter: { id: { eq: $notificationConfigurationId } }\n    ) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveNotificationRuleDocument,
  "\n  mutation AddUserEmail(\n    $organizationId: UUID!\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    insertIntoemail_addressCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          address: $address\n          name: $name\n          description: $description\n          is_public: $isPublic\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        address\n        organization_id\n      }\n    }\n  }\n":
    types.AddUserEmailDocument,
  "\n  mutation RemoveOrganizationEmail($emailAddress: String!) {\n    deleteFromemail_addressCollection(filter: { address: { eq: $emailAddress } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveOrganizationEmailDocument,
  "\n  mutation UpdateUserEmail(\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    updateemail_addressCollection(\n      filter: { address: { eq: $address } }\n      set: { name: $name, description: $description, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        organization_id\n      }\n    }\n  }\n":
    types.UpdateUserEmailDocument,
  "\n  mutation AddOrganizationSocialAccounts(\n    $organizationId: UUID!\n    $url: String!\n    $type: linked_account_type!\n\n  ) {\n    insertIntolinked_accountCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          url: $url\n          type: $type\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        organization_id\n        url\n        type\n        verified\n        hidden\n      }\n    }\n  }\n":
    types.AddOrganizationSocialAccountsDocument,
  "\n  mutation RemoveOrganizationSocialAccount($socialId: UUID!) {\n    deleteFromlinked_accountCollection(filter: { id: { eq: $socialId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveOrganizationSocialAccountDocument,
  "\n  \n  query GetRealEstateProperty($id: UUID!) {\n    real_estate_propertyCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...RealEstatePropertyFields\n        }\n      }\n    }\n  }\n":
    types.GetRealEstatePropertyDocument,
  "\n  mutation AddRePropertyInfo(\n    $entityId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n  ) {\n    insertIntoreal_estate_propertyCollection(\n      objects: [\n        {\n          owner_id: $entityId\n          property_type: $propertyType\n          investment_status: $investmentStatus\n          amenities_description: $amenitiesDescription\n          description: $description\n          down_payment: $downPayment\n          lender_fees: $lenderFees\n          closing_costs: $closingCosts\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n      }\n    }\n  }\n":
    types.AddRePropertyInfoDocument,
  "\n  mutation UpdateRePropertyInfo(\n    $rePropertyId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $assetValue: Int\n    $assetValueNote: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n    $loanAmount: Int\n  ) {\n    updatereal_estate_propertyCollection(\n      filter: { id: { eq: $rePropertyId } }\n      set: {\n        property_type: $propertyType\n        investment_status: $investmentStatus\n        amenities_description: $amenitiesDescription\n        description: $description\n        asset_value: $assetValue\n        asset_value_note: $assetValueNote\n        down_payment: $downPayment\n        lender_fees: $lenderFees\n        closing_costs: $closingCosts\n        loan: $loanAmount\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n        amenities_description\n        description\n        asset_value\n        asset_value_note\n        down_payment\n        lender_fees\n        closing_costs\n        loan\n        owner_id\n      }\n    }\n  }\n":
    types.UpdateRePropertyInfoDocument,
  "\n  mutation RemoveReProperty($propertyId: UUID!) {\n    deleteFromreal_estate_propertyCollection(filter: { id: { eq: $propertyId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemoveRePropertyDocument,
  "\n  mutation AddPropertyAddress(\n    $propertyId: UUID!\n    $addressLabel: String\n    $addressLine1: String!\n    $addressLine2: String\n    $addressLine3: String\n    $city: String!\n    $stateProvince: String\n    $postalCode: String\n    $country: String!\n  ) {\n    insertIntoaddressCollection(\n      objects: [\n        {\n          label: $addressLabel\n          line1: $addressLine1\n          line2: $addressLine2\n          line3: $addressLine3\n          city: $city\n          state_province: $stateProvince\n          postal_code: $postalCode\n          country: $country\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        label\n        line1\n      }\n    }\n  }\n":
    types.AddPropertyAddressDocument,
  "\n  mutation RemovePropertyAddress($geoAddressId: UUID!) {\n    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemovePropertyAddressDocument,
  "\n  mutation AddPropertyImage($url: String!, $label: String, $fileId: String) {\n    insertIntoimageCollection(objects: [{ url: $url, label: $label, file_id: $fileId }]) {\n      affectedCount\n      records {\n        id\n        label\n        url\n        file_id\n      }\n    }\n  }\n":
    types.AddPropertyImageDocument,
  "\n  mutation RemovePropertyImage($imageId: UUID!) {\n    deleteFromimageCollection(filter: { id: { eq: $imageId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n":
    types.RemovePropertyImageDocument,
  "\n  query GetUserProfile($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n":
    types.GetUserProfileDocument,
  "\n  \n  query GetUser($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n":
    types.GetUserDocument,
  "\n  query GetUserRole($id: UUID!) {\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          permissions\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n":
    types.GetUserRoleDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetCryptoAddress($walletAddress: String!) {\n    crypto_addressCollection(filter: { address: { eq: $walletAddress } }) {\n      edges {\n        node {\n          id\n          address\n          legal_entity {\n            id\n            legal_name\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetCryptoAddress($walletAddress: String!) {\n    crypto_addressCollection(filter: { address: { eq: $walletAddress } }) {\n      edges {\n        node {\n          id\n          address\n          legal_entity {\n            id\n            legal_name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCryptoAddress($id: UUID!, $name: String, $isPublic: Boolean) {\n    updatecrypto_addressCollection(\n      filter: { id: { eq: $id } }\n      set: { name: $name, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        legal_entity_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateCryptoAddress($id: UUID!, $name: String, $isPublic: Boolean) {\n    updatecrypto_addressCollection(\n      filter: { id: { eq: $id } }\n      set: { name: $name, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        legal_entity_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddContractPartition($id: UUID!, $partition: String!) {\n    updatesmart_contractCollection(filter: { id: { eq: $id } }, set: { partitions: [$partition] }) {\n      affectedCount\n      records {\n        id\n        partitions\n        owner_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddContractPartition($id: UUID!, $partition: String!) {\n    updatesmart_contractCollection(filter: { id: { eq: $id } }, set: { partitions: [$partition] }) {\n      affectedCount\n      records {\n        id\n        partitions\n        owner_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddShareContract($cryptoAddressId: UUID!, $ownerId: UUID!, $type: smart_contract_type!) {\n    insertIntosmart_contractCollection(\n      objects: [\n        { crypto_address_id: $cryptoAddressId, owner_id: $ownerId, type: $type, established: false }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n        crypto_address_id\n        type\n        established\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddShareContract($cryptoAddressId: UUID!, $ownerId: UUID!, $type: smart_contract_type!) {\n    insertIntosmart_contractCollection(\n      objects: [\n        { crypto_address_id: $cryptoAddressId, owner_id: $ownerId, type: $type, established: false }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n        crypto_address_id\n        type\n        established\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddSwapContract($contractSetId: UUID!, $swapContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { swap_contract_id: $swapContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        swap_contract_id\n        offering_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddSwapContract($contractSetId: UUID!, $swapContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { swap_contract_id: $swapContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        swap_contract_id\n        offering_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddDistributionContract($contractSetId: UUID!, $distributionContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { distribution_contract_id: $distributionContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        distribution_contract_id\n        offering_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddDistributionContract($contractSetId: UUID!, $distributionContractId: UUID!) {\n    updateoffering_smart_contract_setCollection(\n      filter: { id: { eq: $contractSetId } }\n      set: { distribution_contract_id: $distributionContractId }\n    ) {\n      affectedCount\n      records {\n        id\n        distribution_contract_id\n        offering_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateSmartContract($id: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $id } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateSmartContract($id: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $id } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        owner_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment LinkedAccountFields on linked_account {\n    id\n    account_provided_id\n    username\n    url\n    type\n    verified\n    hidden\n    organization_id\n  }\n"
): (typeof documents)["\n  fragment LinkedAccountFields on linked_account {\n    id\n    account_provided_id\n    username\n    url\n    type\n    verified\n    hidden\n    organization_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AddressFields on address {\n    id\n    label\n    line1\n    line2\n    line3\n    city\n    state_province\n    postal_code\n    country\n    lat\n    lng\n    legal_entity_id\n  }\n"
): (typeof documents)["\n  fragment AddressFields on address {\n    id\n    label\n    line1\n    line2\n    line3\n    city\n    state_province\n    postal_code\n    country\n    lat\n    lng\n    legal_entity_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment DocumentFields on document {\n    id\n    title\n    file_id\n    date\n    format\n    type\n    text\n    url\n    thumbnail_image_id\n    owner_id\n    access\n    offering_id\n    offering_unique_id\n  }\n"
): (typeof documents)["\n  fragment DocumentFields on document {\n    id\n    title\n    file_id\n    date\n    format\n    type\n    text\n    url\n    thumbnail_image_id\n    owner_id\n    access\n    offering_id\n    offering_unique_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ApplicationFields on investor_application {\n    id\n    offering_participant_id\n    application_doc_id\n  }\n"
): (typeof documents)["\n  fragment ApplicationFields on investor_application {\n    id\n    offering_participant_id\n    application_doc_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment SmartContractFields on smart_contract {\n    id\n    crypto_address_id\n    type\n    num_tokens_authorized\n    backing_token\n    owner_id\n    established\n    partitions\n  }\n"
): (typeof documents)["\n  fragment SmartContractFields on smart_contract {\n    id\n    crypto_address_id\n    type\n    num_tokens_authorized\n    backing_token\n    owner_id\n    established\n    partitions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  fragment SmartContractSetFields on offering_smart_contract_set {\n    id\n    offering_id\n    share_contract_id\n    swap_contract_id\n    distribution_contract_id\n  }\n"
): (typeof documents)["\n  \n  fragment SmartContractSetFields on offering_smart_contract_set {\n    id\n    offering_id\n    share_contract_id\n    swap_contract_id\n    distribution_contract_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n\n  fragment OfferingDetailsFields on offering_detail {\n    id\n    type\n    custom_onboarding_link\n    stage\n    investment_currency\n    num_units\n    min_units_per_investor\n    max_units_per_investor\n    max_raise\n    min_raise\n    price_start\n    max_investors\n    min_investors\n    raise_start\n    raise_period\n    additional_info\n    distribution_period\n    distribution_frequency\n    distribution_currency\n    distribution_description\n    admin_expense\n    projected_irr\n    projected_irr_max\n    target_equity_multiple\n    target_equity_multiple_max\n    preferred_return\n    coc_return\n    projected_appreciation\n    cap_rate\n  }\n"
): (typeof documents)["\n  \n\n  fragment OfferingDetailsFields on offering_detail {\n    id\n    type\n    custom_onboarding_link\n    stage\n    investment_currency\n    num_units\n    min_units_per_investor\n    max_units_per_investor\n    max_raise\n    min_raise\n    price_start\n    max_investors\n    min_investors\n    raise_start\n    raise_period\n    additional_info\n    distribution_period\n    distribution_frequency\n    distribution_currency\n    distribution_description\n    admin_expense\n    projected_irr\n    projected_irr_max\n    target_equity_multiple\n    target_equity_multiple_max\n    preferred_return\n    coc_return\n    projected_appreciation\n    cap_rate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  fragment RealEstatePropertyFields on real_estate_property {\n    id\n    property_type\n    investment_status\n    address_id\n    amenities_description\n    description\n    asset_value\n    asset_value_note\n    loan\n    down_payment\n    lender_fees\n    closing_costs\n    owner_id\n  }\n"
): (typeof documents)["\n  \n  fragment RealEstatePropertyFields on real_estate_property {\n    id\n    property_type\n    investment_status\n    address_id\n    amenities_description\n    description\n    asset_value\n    asset_value_note\n    loan\n    down_payment\n    lender_fees\n    closing_costs\n    owner_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  \n  fragment OfferingParticipantFields on offering_participant {\n    id\n    address_offering_id\n    wallet_address\n    chain_id\n    name\n    external_id\n    min_pledge\n    max_pledge\n    offering_id\n  }\n"
): (typeof documents)["\n  \n  \n  fragment OfferingParticipantFields on offering_participant {\n    id\n    address_offering_id\n    wallet_address\n    chain_id\n    name\n    external_id\n    min_pledge\n    max_pledge\n    offering_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment LegalEntityFields on legal_entity {\n    id\n    tax_id\n    display_name\n    legal_name\n    purpose\n    jurisdiction_id\n    operating_currency\n    organization_id\n    type\n  }\n"
): (typeof documents)["\n  fragment LegalEntityFields on legal_entity {\n    id\n    tax_id\n    display_name\n    legal_name\n    purpose\n    jurisdiction_id\n    operating_currency\n    organization_id\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  \n  \n  \n  \n  fragment OfferingFields on offering {\n    id\n    name\n    is_public\n    access_code\n    waitlist_on\n    image { \n      id, url, label, file_id\n    }\n    banner_image\n    primary_video\n    brand_color\n    light_brand\n    website\n    short_description\n  }\n"
): (typeof documents)["\n  \n  \n  \n  \n  \n  fragment OfferingFields on offering {\n    id\n    name\n    is_public\n    access_code\n    waitlist_on\n    image { \n      id, url, label, file_id\n    }\n    banner_image\n    primary_video\n    brand_color\n    light_brand\n    website\n    short_description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  \n  fragment OrganizationFields on organization {\n    id\n    name\n    description\n    logo\n    brand_color\n    banner_image\n    website\n    is_public\n    phone\n    country\n  }\n"
): (typeof documents)["\n  \n  \n  fragment OrganizationFields on organization {\n    id\n    name\n    description\n    logo\n    brand_color\n    banner_image\n    website\n    is_public\n    phone\n    country\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  fragment UserFields on profile {\n    id\n  }\n"
): (typeof documents)["\n  \n  fragment UserFields on profile {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  fragment DocumentSignatoryFields on document_signatory {\n    id\n    document_id\n    signer_address\n    legal_entity_id\n  }\n"
): (typeof documents)["\n  \n  fragment DocumentSignatoryFields on document_signatory {\n    id\n    document_id\n    signer_address\n    legal_entity_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RetrieveTransferEvents($shareContractAddress: String!) {\n    share_transfer_eventCollection(\n      filter: { share_contract_address: { eq: $shareContractAddress } }\n    ) {\n      edges {\n        node {\n          id\n          share_contract_address\n          order_index\n          recipient_address\n          sender_address\n          amount\n          price\n          currency_code\n          transaction_hash\n          partition\n          type\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query RetrieveTransferEvents($shareContractAddress: String!) {\n    share_transfer_eventCollection(\n      filter: { share_contract_address: { eq: $shareContractAddress } }\n    ) {\n      edges {\n        node {\n          id\n          share_contract_address\n          order_index\n          recipient_address\n          sender_address\n          amount\n          price\n          currency_code\n          transaction_hash\n          partition\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddTransferEvent(\n    $shareContractAddress: String!\n    $orderIndex: Int\n    $recipientAddress: String!\n    $senderAddress: String!\n    $amount: Int!\n    $price: String\n    $currencyCode: currency_code\n    $transactionHash: String!\n    $partition: String!\n    $type: share_transfer_event_type!\n  ) {\n    insertIntoshare_transfer_eventCollection(\n      objects: [\n        {\n          share_contract_address: $shareContractAddress\n          order_index: $orderIndex\n          recipient_address: $recipientAddress\n          sender_address: $senderAddress\n          amount: $amount\n          price: $price\n          currency_code: $currencyCode\n          transaction_hash: $transactionHash\n          partition: $partition\n          type: $type\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        share_contract_address\n        order_index\n        recipient_address\n        sender_address\n        amount\n        price\n        currency_code\n        transaction_hash\n        partition\n        type\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddTransferEvent(\n    $shareContractAddress: String!\n    $orderIndex: Int\n    $recipientAddress: String!\n    $senderAddress: String!\n    $amount: Int!\n    $price: String\n    $currencyCode: currency_code\n    $transactionHash: String!\n    $partition: String!\n    $type: share_transfer_event_type!\n  ) {\n    insertIntoshare_transfer_eventCollection(\n      objects: [\n        {\n          share_contract_address: $shareContractAddress\n          order_index: $orderIndex\n          recipient_address: $recipientAddress\n          sender_address: $senderAddress\n          amount: $amount\n          price: $price\n          currency_code: $currencyCode\n          transaction_hash: $transactionHash\n          partition: $partition\n          type: $type\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        share_contract_address\n        order_index\n        recipient_address\n        sender_address\n        amount\n        price\n        currency_code\n        transaction_hash\n        partition\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddDistribution($transactionHash: String!, $contractIndex: Int!) {\n    insertIntooffering_distributionCollection(\n      objects: [{ transaction_hash: $transactionHash, contract_index: $contractIndex }]\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddDistribution($transactionHash: String!, $contractIndex: Int!) {\n    insertIntooffering_distributionCollection(\n      objects: [{ transaction_hash: $transactionHash, contract_index: $contractIndex }]\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateOfferingDistribution($distributionId: UUID!, $contractIndex: Int!) {\n    updateoffering_distributionCollection(\n      filter: { id: { eq: $distributionId } }\n      set: { contract_index: $contractIndex }\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateOfferingDistribution($distributionId: UUID!, $contractIndex: Int!) {\n    updateoffering_distributionCollection(\n      filter: { id: { eq: $distributionId } }\n      set: { contract_index: $contractIndex }\n    ) {\n      affectedCount\n      records {\n        id\n        transaction_hash\n        contract_index\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateContractStatus($smartshareContractId: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $smartshareContractId } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        established\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateContractStatus($smartshareContractId: UUID!, $established: Boolean) {\n    updatesmart_contractCollection(\n      filter: { id: { eq: $smartshareContractId } }\n      set: { established: $established }\n    ) {\n      affectedCount\n      records {\n        id\n        established\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateOrder(\n    $contractIndex: Int!\n    $swapContractAddress: String!\n    $minUnits: Int\n    $maxUnits: Int\n    $visible: Boolean!\n    $initiator: String!\n    $transactionHash: String!\n  ) {\n    insertIntoshare_orderCollection(\n      objects: [\n        {\n          contract_index: $contractIndex\n          swap_contract_address: $swapContractAddress\n          min_units: $minUnits\n          max_units: $maxUnits\n          initiator: $initiator\n          transaction_hash: $transactionHash\n          visible: $visible\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        contract_index\n        initiator\n        transaction_hash\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateOrder(\n    $contractIndex: Int!\n    $swapContractAddress: String!\n    $minUnits: Int\n    $maxUnits: Int\n    $visible: Boolean!\n    $initiator: String!\n    $transactionHash: String!\n  ) {\n    insertIntoshare_orderCollection(\n      objects: [\n        {\n          contract_index: $contractIndex\n          swap_contract_address: $swapContractAddress\n          min_units: $minUnits\n          max_units: $maxUnits\n          initiator: $initiator\n          transaction_hash: $transactionHash\n          visible: $visible\n          archived: false\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        contract_index\n        initiator\n        transaction_hash\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RetrieveOrders($swapContractAddress: String!) {\n    share_orderCollection(filter: { swap_contract_address: { eq: $swapContractAddress } }) {\n      edges {\n        node {\n          id\n          contract_index\n          initiator\n          transaction_hash\n          swap_contract_address\n          min_units\n          max_units\n          visible\n          archived\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query RetrieveOrders($swapContractAddress: String!) {\n    share_orderCollection(filter: { swap_contract_address: { eq: $swapContractAddress } }) {\n      edges {\n        node {\n          id\n          contract_index\n          initiator\n          transaction_hash\n          swap_contract_address\n          min_units\n          max_units\n          visible\n          archived\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateSale($orderId: UUID!, $visible: Boolean!, $archived: Boolean!) {\n    updateshare_orderCollection(\n      filter: { id: { eq: $orderId } }\n      set: { archived: $archived, visible: $visible }\n    ) {\n      affectedCount\n      records {\n        id\n        visible\n        archived\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateSale($orderId: UUID!, $visible: Boolean!, $archived: Boolean!) {\n    updateshare_orderCollection(\n      filter: { id: { eq: $orderId } }\n      set: { archived: $archived, visible: $visible }\n    ) {\n      affectedCount\n      records {\n        id\n        visible\n        archived\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveShareOrder($orderId: UUID!) {\n    deleteFromshare_orderCollection(filter: { id: { eq: $orderId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveShareOrder($orderId: UUID!) {\n    deleteFromshare_orderCollection(filter: { id: { eq: $orderId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetOrganization($id: UUID!) {\n    organizationCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...OrganizationFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetOrganization($id: UUID!) {\n    organizationCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...OrganizationFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddOrganization(\n    $name: String!\n    $logo: String\n    $shortDescription: String\n    $website: String\n    $country: String\n  ) {\n    insertIntoorganizationCollection(\n      objects: [\n        {\n          name: $name\n          is_public: false\n          logo: $logo\n          website: $website\n          country: $country\n          short_description: $shortDescription\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        logo\n        website\n        country\n        short_description\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddOrganization(\n    $name: String!\n    $logo: String\n    $shortDescription: String\n    $website: String\n    $country: String\n  ) {\n    insertIntoorganizationCollection(\n      objects: [\n        {\n          name: $name\n          is_public: false\n          logo: $logo\n          website: $website\n          country: $country\n          short_description: $shortDescription\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        logo\n        website\n        country\n        short_description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddOrganizationUser(\n    $userId: UUID!\n    $organizationId: UUID!\n    $permission: [organization_permission_type]\n  ) {\n    insertIntoorganization_userCollection(\n      objects: [{ user_id: $userId, organization_id: $organizationId, permissions: $permission }]\n    ) {\n      affectedCount\n      records {\n        id\n        user_id\n        organization_id\n        permissions\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddOrganizationUser(\n    $userId: UUID!\n    $organizationId: UUID!\n    $permission: [organization_permission_type]\n  ) {\n    insertIntoorganization_userCollection(\n      objects: [{ user_id: $userId, organization_id: $organizationId, permissions: $permission }]\n    ) {\n      affectedCount\n      records {\n        id\n        user_id\n        organization_id\n        permissions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveOrganizationUser($organizationUserId: UUID!) {\n    deleteFromorganization_userCollection(filter: { id: { eq: $organizationUserId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveOrganizationUser($organizationUserId: UUID!) {\n    deleteFromorganization_userCollection(filter: { id: { eq: $organizationUserId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateOrganization(\n    $organizationId: UUID!\n    $name: String!\n    $logo: String\n    $bannerImage: String\n    $isPublic: Boolean\n    $shortDescription: String\n    $description: String\n    $country: String\n  ) {\n    updateorganizationCollection(\n      filter: { id: { eq: $organizationId } }\n      set: {\n        name: $name\n        logo: $logo\n        banner_image: $bannerImage\n        is_public: $isPublic\n        short_description: $shortDescription\n        description: $description\n        country: $country\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        description\n        country\n        logo\n        banner_image\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateOrganization(\n    $organizationId: UUID!\n    $name: String!\n    $logo: String\n    $bannerImage: String\n    $isPublic: Boolean\n    $shortDescription: String\n    $description: String\n    $country: String\n  ) {\n    updateorganizationCollection(\n      filter: { id: { eq: $organizationId } }\n      set: {\n        name: $name\n        logo: $logo\n        banner_image: $bannerImage\n        is_public: $isPublic\n        short_description: $shortDescription\n        description: $description\n        country: $country\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        is_public\n        description\n        country\n        logo\n        banner_image\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddNotificationRule(\n    $organizationUserId: UUID!\n    $notificationRecipientType: notification_recipient_type!\n    $notificationMethod: notification_method!\n    $notificationSubject: notification_subject!\n  ) {\n    insertIntonotification_configurationCollection(\n      objects: [\n        {\n          organization_user_id: $organizationUserId\n          notification_recipient_type: $notificationRecipientType\n          notification_method: $notificationMethod\n          notification_subject: $notificationSubject\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        notification_recipient_type\n        notification_method\n        notification_subject\n        organization_user_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddNotificationRule(\n    $organizationUserId: UUID!\n    $notificationRecipientType: notification_recipient_type!\n    $notificationMethod: notification_method!\n    $notificationSubject: notification_subject!\n  ) {\n    insertIntonotification_configurationCollection(\n      objects: [\n        {\n          organization_user_id: $organizationUserId\n          notification_recipient_type: $notificationRecipientType\n          notification_method: $notificationMethod\n          notification_subject: $notificationSubject\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        notification_recipient_type\n        notification_method\n        notification_subject\n        organization_user_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveNotificationRule($notificationConfigurationId: UUID!) {\n    deleteFromnotification_configurationCollection(\n      filter: { id: { eq: $notificationConfigurationId } }\n    ) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveNotificationRule($notificationConfigurationId: UUID!) {\n    deleteFromnotification_configurationCollection(\n      filter: { id: { eq: $notificationConfigurationId } }\n    ) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddUserEmail(\n    $organizationId: UUID!\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    insertIntoemail_addressCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          address: $address\n          name: $name\n          description: $description\n          is_public: $isPublic\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        address\n        organization_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddUserEmail(\n    $organizationId: UUID!\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    insertIntoemail_addressCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          address: $address\n          name: $name\n          description: $description\n          is_public: $isPublic\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        address\n        organization_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveOrganizationEmail($emailAddress: String!) {\n    deleteFromemail_addressCollection(filter: { address: { eq: $emailAddress } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveOrganizationEmail($emailAddress: String!) {\n    deleteFromemail_addressCollection(filter: { address: { eq: $emailAddress } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateUserEmail(\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    updateemail_addressCollection(\n      filter: { address: { eq: $address } }\n      set: { name: $name, description: $description, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        organization_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateUserEmail(\n    $address: String!\n    $name: String\n    $description: String\n    $isPublic: Boolean\n  ) {\n    updateemail_addressCollection(\n      filter: { address: { eq: $address } }\n      set: { name: $name, description: $description, is_public: $isPublic }\n    ) {\n      affectedCount\n      records {\n        id\n        name\n        address\n        is_public\n        description\n        organization_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddOrganizationSocialAccounts(\n    $organizationId: UUID!\n    $url: String!\n    $type: linked_account_type!\n\n  ) {\n    insertIntolinked_accountCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          url: $url\n          type: $type\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        organization_id\n        url\n        type\n        verified\n        hidden\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddOrganizationSocialAccounts(\n    $organizationId: UUID!\n    $url: String!\n    $type: linked_account_type!\n\n  ) {\n    insertIntolinked_accountCollection(\n      objects: [\n        {\n          organization_id: $organizationId\n          url: $url\n          type: $type\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        organization_id\n        url\n        type\n        verified\n        hidden\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveOrganizationSocialAccount($socialId: UUID!) {\n    deleteFromlinked_accountCollection(filter: { id: { eq: $socialId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveOrganizationSocialAccount($socialId: UUID!) {\n    deleteFromlinked_accountCollection(filter: { id: { eq: $socialId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetRealEstateProperty($id: UUID!) {\n    real_estate_propertyCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...RealEstatePropertyFields\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetRealEstateProperty($id: UUID!) {\n    real_estate_propertyCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          ...RealEstatePropertyFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddRePropertyInfo(\n    $entityId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n  ) {\n    insertIntoreal_estate_propertyCollection(\n      objects: [\n        {\n          owner_id: $entityId\n          property_type: $propertyType\n          investment_status: $investmentStatus\n          amenities_description: $amenitiesDescription\n          description: $description\n          down_payment: $downPayment\n          lender_fees: $lenderFees\n          closing_costs: $closingCosts\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddRePropertyInfo(\n    $entityId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n  ) {\n    insertIntoreal_estate_propertyCollection(\n      objects: [\n        {\n          owner_id: $entityId\n          property_type: $propertyType\n          investment_status: $investmentStatus\n          amenities_description: $amenitiesDescription\n          description: $description\n          down_payment: $downPayment\n          lender_fees: $lenderFees\n          closing_costs: $closingCosts\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateRePropertyInfo(\n    $rePropertyId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $assetValue: Int\n    $assetValueNote: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n    $loanAmount: Int\n  ) {\n    updatereal_estate_propertyCollection(\n      filter: { id: { eq: $rePropertyId } }\n      set: {\n        property_type: $propertyType\n        investment_status: $investmentStatus\n        amenities_description: $amenitiesDescription\n        description: $description\n        asset_value: $assetValue\n        asset_value_note: $assetValueNote\n        down_payment: $downPayment\n        lender_fees: $lenderFees\n        closing_costs: $closingCosts\n        loan: $loanAmount\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n        amenities_description\n        description\n        asset_value\n        asset_value_note\n        down_payment\n        lender_fees\n        closing_costs\n        loan\n        owner_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateRePropertyInfo(\n    $rePropertyId: UUID!\n    $propertyType: real_estate_property_type!\n    $investmentStatus: asset_status!\n    $amenitiesDescription: String\n    $description: String\n    $assetValue: Int\n    $assetValueNote: String\n    $downPayment: Int\n    $lenderFees: Int\n    $closingCosts: Int\n    $loanAmount: Int\n  ) {\n    updatereal_estate_propertyCollection(\n      filter: { id: { eq: $rePropertyId } }\n      set: {\n        property_type: $propertyType\n        investment_status: $investmentStatus\n        amenities_description: $amenitiesDescription\n        description: $description\n        asset_value: $assetValue\n        asset_value_note: $assetValueNote\n        down_payment: $downPayment\n        lender_fees: $lenderFees\n        closing_costs: $closingCosts\n        loan: $loanAmount\n      }\n    ) {\n      affectedCount\n      records {\n        id\n        investment_status\n        amenities_description\n        description\n        asset_value\n        asset_value_note\n        down_payment\n        lender_fees\n        closing_costs\n        loan\n        owner_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveReProperty($propertyId: UUID!) {\n    deleteFromreal_estate_propertyCollection(filter: { id: { eq: $propertyId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveReProperty($propertyId: UUID!) {\n    deleteFromreal_estate_propertyCollection(filter: { id: { eq: $propertyId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddPropertyAddress(\n    $propertyId: UUID!\n    $addressLabel: String\n    $addressLine1: String!\n    $addressLine2: String\n    $addressLine3: String\n    $city: String!\n    $stateProvince: String\n    $postalCode: String\n    $country: String!\n  ) {\n    insertIntoaddressCollection(\n      objects: [\n        {\n          label: $addressLabel\n          line1: $addressLine1\n          line2: $addressLine2\n          line3: $addressLine3\n          city: $city\n          state_province: $stateProvince\n          postal_code: $postalCode\n          country: $country\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        label\n        line1\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddPropertyAddress(\n    $propertyId: UUID!\n    $addressLabel: String\n    $addressLine1: String!\n    $addressLine2: String\n    $addressLine3: String\n    $city: String!\n    $stateProvince: String\n    $postalCode: String\n    $country: String!\n  ) {\n    insertIntoaddressCollection(\n      objects: [\n        {\n          label: $addressLabel\n          line1: $addressLine1\n          line2: $addressLine2\n          line3: $addressLine3\n          city: $city\n          state_province: $stateProvince\n          postal_code: $postalCode\n          country: $country\n        }\n      ]\n    ) {\n      affectedCount\n      records {\n        id\n        label\n        line1\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemovePropertyAddress($geoAddressId: UUID!) {\n    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemovePropertyAddress($geoAddressId: UUID!) {\n    deleteFromaddressCollection(filter: { id: { eq: $geoAddressId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddPropertyImage($url: String!, $label: String, $fileId: String) {\n    insertIntoimageCollection(objects: [{ url: $url, label: $label, file_id: $fileId }]) {\n      affectedCount\n      records {\n        id\n        label\n        url\n        file_id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddPropertyImage($url: String!, $label: String, $fileId: String) {\n    insertIntoimageCollection(objects: [{ url: $url, label: $label, file_id: $fileId }]) {\n      affectedCount\n      records {\n        id\n        label\n        url\n        file_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemovePropertyImage($imageId: UUID!) {\n    deleteFromimageCollection(filter: { id: { eq: $imageId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RemovePropertyImage($imageId: UUID!) {\n    deleteFromimageCollection(filter: { id: { eq: $imageId } }) {\n      affectedCount\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUserProfile($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetUserProfile($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  \n  query GetUser($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  \n  query GetUser($id: UUID!) {\n    profileCollection(filter: { id: { eq: $id } }, first: 1) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUserRole($id: UUID!) {\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          permissions\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetUserRole($id: UUID!) {\n    organization_userCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          permissions\n          organization {\n            ...OrganizationFields\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
