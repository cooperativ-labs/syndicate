import { SmartContract } from 'types';

export const GetAvailableContracts = (unestablishedSmartContracts: SmartContract[], chainId) => {
  let availableContracts = [];
  unestablishedSmartContracts.map((contract) => {
    if (contract?.cryptoAddress.chainId === chainId && !contract.established) {
      availableContracts.push(contract);
    }
  });
  return availableContracts;
};

export const GetEstablishedContracts = (smartContracts: SmartContract[], chainId) => {
  let establishedContracts = [];
  smartContracts.map((contract) => {
    if (contract?.cryptoAddress.chainId === chainId && contract.established) {
      establishedContracts.push(contract);
    }
  });
  return establishedContracts;
};
