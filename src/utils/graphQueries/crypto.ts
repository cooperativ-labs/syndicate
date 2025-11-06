// export const CHECK_WALLET_EXIST = () => {
//   return gql`
//     query ($address: String!) {
//       crypto_addressCollection(filter: { address: { eq: $address } }) {
//         edges {
//           node {
//             address
//           }
//         }
//       }
//     }
//   `;
// };

export const GET_CRYPTO_ADDRESS = gql`
  query GetCryptoAddress($walletAddress: String!) {
    crypto_addressCollection(filter: { address: { eq: $walletAddress } }) {
      edges {
        node {
          id
          address
          legal_entity {
            id
            legal_name
          }
        }
      }
    }
  }
`;

export const UPDATE_CRYPTO_ADDRESS = gql`
  mutation UpdateCryptoAddress($id: UUID!, $name: String, $isPublic: Boolean) {
    updatecrypto_addressCollection(
      filter: { id: { eq: $id } }
      set: { name: $name, is_public: $isPublic }
    ) {
      affectedCount
      records {
        id
        name
        address
        is_public
        description
        legal_entity_id
      }
    }
  }
`;

export const ADD_CONTRACT_PARTITION = gql`
  mutation AddContractPartition($id: UUID!, $partition: String!) {
    updatesmart_contractCollection(filter: { id: { eq: $id } }, set: { partitions: [$partition] }) {
      affectedCount
      records {
        id
        partitions
        owner_id
      }
    }
  }
`;

export const CREATE_SHARE_CONTRACT = gql`
  mutation AddShareContract($cryptoAddressId: UUID!, $ownerId: UUID!, $type: smart_contract_type!) {
    insertIntosmart_contractCollection(
      objects: [
        { crypto_address_id: $cryptoAddressId, owner_id: $ownerId, type: $type, established: false }
      ]
    ) {
      affectedCount
      records {
        id
        owner_id
        crypto_address_id
        type
        established
      }
    }
  }
`;

export const CREATE_SWAP_CONTRACT = gql`
  mutation AddSwapContract($contractSetId: UUID!, $swapContractId: UUID!) {
    updateoffering_smart_contract_setCollection(
      filter: { id: { eq: $contractSetId } }
      set: { swap_contract_id: $swapContractId }
    ) {
      affectedCount
      records {
        id
        swap_contract_id
        offering_id
      }
    }
  }
`;

export const CREATE_DISTRIBUTION_CONTRACT = gql`
  mutation AddDistributionContract($contractSetId: UUID!, $distributionContractId: UUID!) {
    updateoffering_smart_contract_setCollection(
      filter: { id: { eq: $contractSetId } }
      set: { distribution_contract_id: $distributionContractId }
    ) {
      affectedCount
      records {
        id
        distribution_contract_id
        offering_id
      }
    }
  }
`;

export const UPDATE_UNESTABLISHED_SMART_CONTRACT = gql`
  mutation UpdateSmartContract($id: UUID!, $established: Boolean) {
    updatesmart_contractCollection(
      filter: { id: { eq: $id } }
      set: { established: $established }
    ) {
      affectedCount
      records {
        id
        owner_id
      }
    }
  }
`;
