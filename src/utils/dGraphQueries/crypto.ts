import gql from 'graphql-tag';

export const CHECK_WALLET_EXIST = () => {
  return gql`
    query ($address: String!) {
      getCryptoAddress(address: $address) {
        address
      }
    }
  `;
};

export const GET_CRYPTO_ADDRESS = gql`
  query GetCryptoAddress($walletAddress: String!) {
    getCryptoAddress(address: $walletAddress) {
      id
      address
      owner {
        id
        fullName
      }
    }
  }
`;

export const UPDATE_CRYPTO_ADDRESS = gql`
  mutation UpdateCryptoAddress($id: [ID!], $name: String, $isPublic: Boolean) {
    updateCryptoAddress(input: { filter: { id: $id }, set: { name: $name, isPublic: $isPublic } }) {
      cryptoAddress {
        id
        name
        address
        isPublic
        description
        owner {
          id
          fullName
        }
      }
    }
  }
`;

export const ADD_CONTRACT_PARTITION = gql`
  mutation AddContractPartition($id: [ID!], $partition: String) {
    updateSmartContract(input: { filter: { id: $id }, set: { partitions: [$partition] } }) {
      smartContract {
        id
        partitions
        owner {
          id
        }
      }
    }
  }
`;

export const CREATE_SHARE_CONTRACT = gql`
  mutation AddShareContract(
    $cryptoAddress: String!
    $chainId: Int!
    $type: SmartContractType!
    $protocol: CryptoAddressProtocol
    $ownerId: ID!
  ) {
    addSmartContract(
      input: [
        {
          cryptoAddress: {
            address: $cryptoAddress
            type: CONTRACT
            chainId: $chainId
            protocol: $protocol
            owner: { id: $ownerId }
          }
          owner: { id: $ownerId }
          type: $type
          established: false
        }
      ]
    ) {
      smartContract {
        id

        owner {
          id
          smartContracts {
            id
          }
          organization {
            id
          }
        }
        cryptoAddress {
          id
          address
          chainId
        }
      }
    }
  }
`;

export const CREATE_SWAP_CONTRACT = gql`
  mutation AddSwapContract(
    $cryptoAddress: String!
    $chainId: Int!
    $backingToken: CurrencyCode
    $type: SmartContractType!
    $protocol: CryptoAddressProtocol
    $ownerId: ID!
    $contractSetId: ID!
  ) {
    updateOfferingSmartContractSet(
      input: {
        filter: { id: [$contractSetId] }
        set: {
          swapContract: {
            cryptoAddress: {
              address: $cryptoAddress
              type: CONTRACT
              chainId: $chainId
              protocol: $protocol
              owner: { id: $ownerId }
            }
            owner: { id: $ownerId }
            backingToken: $backingToken
            type: $type
            established: false
          }
        }
      }
    ) {
      offeringSmartContractSet {
        id
        swapContract {
          id
        }
        offering {
          id
          details {
            investmentCurrency {
              code
            }
          }
        }
      }
    }
  }
`;

export const CREATE_DISTRIBUTION_CONTRACT = gql`
  mutation AddDistributionContract(
    $cryptoAddress: String!
    $chainId: Int!
    $type: SmartContractType!
    $protocol: CryptoAddressProtocol
    $ownerId: ID!
    $contractSetId: ID!
  ) {
    updateOfferingSmartContractSet(
      input: {
        filter: { id: [$contractSetId] }
        set: {
          distributionContract: {
            cryptoAddress: {
              address: $cryptoAddress
              type: CONTRACT
              chainId: $chainId
              protocol: $protocol
              owner: { id: $ownerId }
            }
            owner: { id: $ownerId }
            type: $type
            established: false
          }
        }
      }
    ) {
      offeringSmartContractSet {
        id
        distributionContract {
          id
        }
        offering {
          id
        }
      }
    }
  }
`;

export const UPDATE_UNESTABLISHED_SMART_CONTRACT = gql`
  mutation updateSmartContract($id: [ID!], $established: Boolean) {
    updateSmartContract(input: { filter: { id: $id }, set: { established: $established } }) {
      smartContract {
        id
        owner {
          id
          fullName
          offerings {
            id
          }
        }
      }
    }
  }
`;
