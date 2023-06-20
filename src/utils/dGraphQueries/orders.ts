import gql from 'graphql-tag';

export const RETRIEVE_TRANSFER_EVENT = gql`
  query RetrieveTransferEvents($shareContractAddress: String!) {
    queryShareTransferEvent(filter: { shareContractAddress: { anyofterms: $shareContractAddress } }) {
      id
      shareContractAddress
      recipientAddress
      senderAddress
      amount
      price
      transactionHash
      partition
      type
    }
  }
`;

export const ADD_TRANSFER_EVENT = gql`
  mutation AddTransferEvent(
    $shareContractAddress: String!
    $recipientAddress: String!
    $senderAddress: String!
    $amount: Int!
    $price: Int
    $transactionHash: String!
    $partition: String!
    $type: ShareTransferEventType!
  ) {
    addShareTransferEvent(
      input: [
        {
          shareContractAddress: $shareContractAddress
          recipientAddress: $recipientAddress
          senderAddress: $senderAddress
          amount: $amount
          price: $price
          transactionHash: $transactionHash
          partition: $partition
          type: $type
          archived: false
        }
      ]
    ) {
      shareTransferEvent {
        id
        shareContractAddress
        recipientAddress
        senderAddress
        amount
        transactionHash
        partition
        type
      }
    }
  }
`;

export const ADD_DISTRIBUTION = gql`
  mutation UpdateOffering($offeringId: [ID!], $transactionHash: String!, $contractIndex: Int!) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: { distributions: { transactionHash: $transactionHash, contractIndex: $contractIndex } }
      }
    ) {
      offering {
        id
        distributions {
          id
          transactionHash
          contractIndex
        }
      }
    }
  }
`;

export const UPDATE_CONTRACT_INDEX = gql`
  mutation UpdateOfferingDistribution($distributionId: [ID!], $contractIndex: Int!) {
    updateOfferingDistribution(input: { filter: { id: $distributionId }, set: { contractIndex: $contractIndex } }) {
      offeringDistribution {
        id
        transactionHash
        contractIndex
      }
    }
  }
`;

export const UPDATE_CONTRACT_STATUS = gql`
  mutation UpdateContractStatus($offeringId: [ID!], $smartshareContractId: ID!, $established: Boolean) {
    updateOffering(
      input: {
        filter: { id: $offeringId }
        set: { smartContracts: { id: $smartshareContractId, set: { established: $established } } }
      }
    ) {
      offering {
        smartContracts {
          id
          established
        }
      }
    }
    updateSmartContract(input: { filter: { id: [$smartshareContractId] }, set: { established: $established } }) {
      smartContract {
        id
        established
      }
    }
  }
`;

// =========== ORDER ================

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $currentDate: DateTime!
    $contractIndex: Int!
    $swapContractAddress: String!
    $minUnits: Int
    $maxUnits: Int
    $visible: Boolean!
    $initiator: String!
    $transactionHash: String!
  ) {
    addShareOrder(
      input: [
        {
          creationDate: $currentDate
          lastUpdate: $currentDate
          contractIndex: $contractIndex
          swapContractAddress: $swapContractAddress
          minUnits: $minUnits
          maxUnits: $maxUnits
          initiator: $initiator
          transactionHash: $transactionHash
          visible: $visible
          archived: false
        }
      ]
    ) {
      shareOrder {
        id
        creationDate
        contractIndex
        initiator
        transactionHash
      }
    }
  }
`;

export const RETRIEVE_ORDERS = gql`
  query RetrieveOrders($swapContractAddress: String!) {
    queryShareOrder(filter: { swapContractAddress: { anyofterms: $swapContractAddress } }) {
      id
      creationDate
      contractIndex
      initiator
      transactionHash
      swapContractAddress
      minUnits
      maxUnits
      visible
      archived
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateSale($currentDate: DateTime!, $orderId: ID!, $visible: Boolean!, $archived: Boolean!) {
    updateShareOrder(
      input: { filter: { id: [$orderId] }, set: { lastUpdate: $currentDate, archived: $archived, visible: $visible } }
    ) {
      shareOrder {
        id
        lastUpdate
        visible
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation RemoveShareOrder($orderId: [ID!]) {
    # updateOffering(
    #   input: { filter: { id: $offeringId }, remove: { orders: { id: $orderId } }, set: { lastUpdate: $currentDate } }
    # ) {
    #   offering {
    #     id
    #     orders {
    #       id
    #     }
    #   }
    # }
    deleteShareOrder(filter: { id: $orderId }) {
      msg
      numUids
      shareOrder {
        id
      }
    }
  }
`;
