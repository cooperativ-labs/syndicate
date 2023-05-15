import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import ABI from './ABI';
import { readContracts } from '@wagmi/core';

export const normalizeChainId = (chainId) => {
  return typeof chainId === 'number' ? chainId : parseInt(chainId[2]);
};

export const WalletErrorMessages = {
  NeedToApproveConnection: `Trying to connect to your wallet: you may need to click on your wallet's browser extension to permit it to connect to Cooperativ.`,
  RejectedAttemptToConnect: `It looks like you rejected your wallet's attempt to connect. You can try the action again.`,
  OnIncompatibleChain: `It looks like you are on an incompatible blockchain network. Check your wallet settings to make sure you are using the Ethereum or Ropsten networks`,
};

export const WalletErrorCodes = (error) => {
  switch (error.code) {
    case parseInt('-32002'):
      return WalletErrorMessages.NeedToApproveConnection;
    case 4001:
      return WalletErrorMessages.RejectedAttemptToConnect;
    default:
      return `Error: ${error.message} (check your wallet settings to make sure you are using the Ethereum or Ropsten networks)`;
  }
};

export const ChainErrorResponses = (error) => {
  if (error.message.includes('has not opted in to app')) {
    return { code: 1000, message: 'has not opted in to app' };
  }
  if (error.message.includes('Error: Operation cancelled')) {
    return { code: 2000, message: 'User cancelled operation' };
  }
  if (error.message.includes('underflow on subtracting')) {
    return { code: 3000, message: 'User does not have enough of the asset to complete the transaction.' };
  }
  if (error.message.includes('balance') && error.message.includes('below min')) {
    return { code: 4000, message: 'You do not have enough ALGO to complete the transaction.' };
  }
  if (error.message.includes('hash is immutable')) {
    return { code: 5000, message: 'This contract has already been established.' };
  }
  return { code: null, message: error };
};

export const isValidAddress = (address) => {
  return ethers.utils.isAddress(address);
};

export const StandardChainErrorHandling = (error, setButtonStep?, recipient?) => {
  const errorCode = ChainErrorResponses(error).code;
  const errorMessage = ChainErrorResponses(error).message;
  if (recipient && errorCode === 1000) {
    setButtonStep('failed');
    toast(`${recipient} has not opted into this offering (or is already whitelisted).`);
  }
  if (errorCode === 2000) {
    setButtonStep && setButtonStep('rejected');
  } else {
    setButtonStep && setButtonStep('failed');
    alert(`${errorMessage}`);
  }
};

export async function getContractData(userWalletAddress, contractId) {
  const baseContractInfo = {
    address: contractId as `0x${string}}`,
    abi: ABI,
  };
  try {
    const data = await readContracts({
      contracts: [
        { ...baseContractInfo, functionName: 'owner' },
        {
          ...baseContractInfo,
          functionName: 'isManager',
          args: [userWalletAddress],
        },
        {
          ...baseContractInfo,
          functionName: 'isWhitelisted',
          args: [userWalletAddress],
        },
        {
          ...baseContractInfo,
          functionName: 'balanceOf',
          args: [userWalletAddress],
        },
        { ...baseContractInfo, functionName: 'totalSupply' },
        { ...baseContractInfo, functionName: 'getAllDocuments' },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
