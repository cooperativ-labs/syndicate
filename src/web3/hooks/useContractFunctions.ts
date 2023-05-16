export const useGetContractParticipants = (saleId: number) => {};

export const sendShares = (saleId: number) => {};

export const getSale = (saleId: number) => {};
export const useSale = () => {
  const submitOffer = (saleId: number) => {};
  const useCancelSale = (saleId: number) => {};
  const approveSwap = (saleId: number) => {};
  const claimProceeds = (saleId: number) => {};
};

export const useDistributions = () => {
  const submitDistribution = (saleId: number) => {};
  const claimDistribution = (saleId: number) => {};
};

export const useContractPermissions = () => {
  const addWhitelistMember = (address) => {};
  const removeWhitelistMember = (address) => {};
  const addManager = (address) => {};
  const removeManager = (address) => {};
  const transferOwnership = (newOwnerAddress) => {};
};

export const useContractDocuments = () => {
  const setDocument = (name, hash) => {};
  const removeDocument = (name) => {};
};
