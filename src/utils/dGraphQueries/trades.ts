import gql from 'graphql-tag';

export const RETRIEVE_ISSUANCES_AND_TRADES = gql`
  query RetrieveIssuances($shareContractAddress: String!) {
    queryShareIssuanceTrade(filter: { shareContractAddress: { anyofterms: $shareContractAddress } }) {
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

export const ADD_ISSUANCE_OR_TRADE = gql`
  mutation AddIssuance(
    $shareContractAddress: String!
    $recipientAddress: String!
    $senderAddress: String!
    $amount: Int!
    $price: Int
    $transactionHash: String!
    $partition: String!
    $type: ShareIssuanceTradeType!
  ) {
    addShareIssuanceTrade(
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
      shareIssuanceTrade {
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
    $offeringId: ID!
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
          relatedOffering: { id: $offeringId }
          creationDate: $currentDate
          contractIndex: $contractIndex
          lastUpdate: $currentDate
          swapContractAddress: $swapContractAddress
          minUnits: $minUnits
          maxUnits: $maxUnits
          visible: $visible
          initiator: $initiator
          transactionHash: $transactionHash
        }
      ]
    ) {
      shareOrder {
        id
        creationDate
        contractIndex
        initiator
        transactionHash
        relatedOffering {
          id
          orders {
            id
          }
        }
      }
    }
  }
`;

export const RETRIEVE_SALES = gql`
  query RetrieveIssuances($swapContractAddress: String!) {
    queryShareOrder(filter: { swapContractAddress: { anyofterms: $swapContractAddress } }) {
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

export const UPDATE_ORDER = gql`
  mutation UpdateSale($currentDate: DateTime!, $orderId: ID!, $visible: Boolean) {
    updateShareOrder(input: { filter: { id: [$orderId] }, set: { lastUpdate: $currentDate, visible: $visible } }) {
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
        relatedOffering {
          id
          orders {
            id
          }
        }
      }
    }
  }
`;
