import { Maybe, SmartContract, SmartContractType } from 'types';

const contractIsSameChain = (contract: Maybe<SmartContract>, chainId: number): boolean => {
  return contract?.cryptoAddress.chainId === chainId;
};
export const getAvailableContracts = (unestablishedSmartContracts: Maybe<SmartContract>[], chainId: number) => {
  return unestablishedSmartContracts.find((contract) => {
    if (
      contractIsSameChain(contract, chainId) &&
      !contract?.established &&
      contract?.type === SmartContractType.Erc1410
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
