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

export const CREATE_SMART_CONTRACT = gql`
  mutation AddSmartContract(
    $cryptoAddress: String!
    $chainId: Int!
    $backingToken: CurrencyCode
    $numTokens: Int64
    $type: SmartContractType!
    $protocol: CryptoAddressProtocol
    $owner: ID!
    $offering: ID
  ) {
    addSmartContract(
      input: [
        {
          cryptoAddress: {
            address: $cryptoAddress
            type: CONTRACT
            chainId: $chainId
            protocol: $protocol
            owner: { id: $owner }
          }
          owner: { id: $owner }
          smartContracts: { id: $smartshareContractId }
          numTokensAuthorized: $numTokens
          backingToken: { code: $backingToken }
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
