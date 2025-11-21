import { SmartContract, SmartContractType, SmartContractWithCryptoAddress } from '@/types';

const contractIsSameChain = (
  contract: SmartContractWithCryptoAddress,
  chainId: number
): boolean => {
  return contract?.cryptoAddress.chain_id === chainId;
};

export const getAvailableContracts = ({
  shareContracts,
  chainId
}: {
  shareContracts: SmartContractWithCryptoAddress[];
  chainId: number;
}) => {
  return shareContracts.find(contract => {
    if (
      contractIsSameChain(contract, chainId) &&
      !contract?.established &&
      contract?.type === SmartContractType.ERC1410
    ) {
      return contract;
    }
  });
};

// export const getEstablishedContracts = (smartContracts: SmartContract[], chainId: number) => {
//   return smartContracts.map((contract) => {
//     if (contractIsSameChain(contract, chainId) && contract.established && contract?.type === SmartContractType.Share) {
//       return contract;
//     }
//   });
// };

// export const getSwapContracts = (smartContracts: SmartContract[], chainId: number) => {
//   return smartContracts.map((contract) => {
//     if (contractIsSameChain(contract, chainId) && contract?.type === SmartContractType.Swap) {
//       return contract;
//     }
//   });
// };
