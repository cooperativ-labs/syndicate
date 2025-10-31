import { gql } from '@apollo/client';

export const RETRIEVE_TRANSFER_EVENT = gql`
  query RetrieveTransferEvents($shareContractAddress: String!) {
    share_transfer_eventCollection(
      filter: { share_contract_address: { eq: $shareContractAddress } }
    ) {
      edges {
        node {
          id
          share_contract_address
          order_index
          recipient_address
          sender_address
          amount
          price
          currency_code
          transaction_hash
          partition
          type
        }
      }
    }
  }
`;

export const ADD_TRANSFER_EVENT = gql`
  mutation AddTransferEvent(
    $shareContractAddress: String!
    $orderIndex: Int
    $recipientAddress: String!
    $senderAddress: String!
    $amount: Int!
    $price: String
    $currencyCode: currency_code
    $transactionHash: String!
    $partition: String!
    $type: share_transfer_event_type!
  ) {
    insertIntoshare_transfer_eventCollection(
      objects: [
        {
          share_contract_address: $shareContractAddress
          order_index: $orderIndex
          recipient_address: $recipientAddress
          sender_address: $senderAddress
          amount: $amount
          price: $price
          currency_code: $currencyCode
          transaction_hash: $transactionHash
          partition: $partition
          type: $type
          archived: false
        }
      ]
    ) {
      affectedCount
      records {
        id
        share_contract_address
        order_index
        recipient_address
        sender_address
        amount
        price
        currency_code
        transaction_hash
        partition
        type
      }
    }
  }
`;

export const ADD_DISTRIBUTION = gql`
  mutation AddDistribution($transactionHash: String!, $contractIndex: Int!) {
    insertIntooffering_distributionCollection(
      objects: [{ transaction_hash: $transactionHash, contract_index: $contractIndex }]
    ) {
      affectedCount
      records {
        id
        transaction_hash
        contract_index
      }
    }
  }
`;

export const UPDATE_CONTRACT_INDEX = gql`
  mutation UpdateOfferingDistribution($distributionId: UUID!, $contractIndex: Int!) {
    updateoffering_distributionCollection(
      filter: { id: { eq: $distributionId } }
      set: { contract_index: $contractIndex }
    ) {
      affectedCount
      records {
        id
        transaction_hash
        contract_index
      }
    }
  }
`;

export const UPDATE_CONTRACT_STATUS = gql`
  mutation UpdateContractStatus($smartshareContractId: UUID!, $established: Boolean) {
    updatesmart_contractCollection(
      filter: { id: { eq: $smartshareContractId } }
      set: { established: $established }
    ) {
      affectedCount
      records {
        id
        established
      }
    }
  }
`;

// =========== ORDER ================

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $contractIndex: Int!
    $swapContractAddress: String!
    $minUnits: Int
    $maxUnits: Int
    $visible: Boolean!
    $initiator: String!
    $transactionHash: String!
  ) {
    insertIntoshare_orderCollection(
      objects: [
        {
          contract_index: $contractIndex
          swap_contract_address: $swapContractAddress
          min_units: $minUnits
          max_units: $maxUnits
          initiator: $initiator
          transaction_hash: $transactionHash
          visible: $visible
          archived: false
        }
      ]
    ) {
      affectedCount
      records {
        id
        contract_index
        initiator
        transaction_hash
      }
    }
  }
`;

export const RETRIEVE_ORDERS = gql`
  query RetrieveOrders($swapContractAddress: String!) {
    share_orderCollection(filter: { swap_contract_address: { eq: $swapContractAddress } }) {
      edges {
        node {
          id
          contract_index
          initiator
          transaction_hash
          swap_contract_address
          min_units
          max_units
          visible
          archived
        }
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateSale($orderId: UUID!, $visible: Boolean!, $archived: Boolean!) {
    updateshare_orderCollection(
      filter: { id: { eq: $orderId } }
      set: { archived: $archived, visible: $visible }
    ) {
      affectedCount
      records {
        id
        visible
        archived
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation RemoveShareOrder($orderId: UUID!) {
    deleteFromshare_orderCollection(filter: { id: { eq: $orderId } }) {
      affectedCount
      records {
        id
      }
    }
  }
`;
