import { SmartContract, SmartContractType } from 'types';

const contractIsSameChain = (contract: SmartContract, chainId: number): boolean => {
  return contract?.cryptoAddress.chainId === chainId;
};
export const getAvailableContracts = (unestablishedSmartContracts: SmartContract[], chainId: number) => {
  let availableContracts = [];
  unestablishedSmartContracts.map((contract) => {
    if (contractIsSameChain(contract, chainId) && !contract.established) {
      availableContracts.push(contract);
    }
  });
  return availableContracts;
};

export const getEstablishedContracts = (smartContracts: SmartContract[], chainId: number) => {
  let establishedContracts = [];
  smartContracts.map((contract) => {
    if (contractIsSameChain(contract, chainId) && contract.established && contract?.type === SmartContractType.Share) {
      establishedContracts.push(contract);
    }
  });
  return establishedContracts;
};

export const getSwapContracts = (smartContracts: SmartContract[], chainId: number) => {
  let swapContracts = [];
  smartContracts.map((contract) => {
    if (contractIsSameChain(contract, chainId) && contract?.type === SmartContractType.Swap) {
      swapContracts.push(contract);
    }
  });
  return swapContracts;
};
