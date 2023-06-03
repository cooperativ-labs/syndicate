import { bytesToString, hexToBytes, stringToHex } from 'viem';
import { keccak256, toHex } from 'viem';
import toast from 'react-hot-toast';
import { Document } from 'types';

export type String0x = `0x${string}`;

export const stringFromBytes32 = (bytes32: String0x) => {
  const bytes = hexToBytes(bytes32);
  const string = bytesToString(bytes, { size: 32 });
  return string;
};
export const bytes32FromString = (string) => {
  const bytes = stringToHex(string, { size: 32 });
  return bytes;
};

export const hashBytes32FromString = (string: string) => keccak256(toHex(string));

export const getHashTextPairs = (data: any, agreementTexts: Document[]) => {
  const hashes = data.map((doc) => {
    return doc.result[1];
  });
  const textHashPairs = agreementTexts.map((doc, i) => {
    const hash = hashes.find((hash) => hashBytes32FromString(doc.text) === hash);
    return { hash: hash, text: doc.text };
  });
  return textHashPairs;
};

export const normalizeEthAddress = (address: String0x) => {
  return address?.toLowerCase() as String0x;
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
  if (error.message.includes('address already whitelisted')) {
    return { code: 1000, message: 'User is already on the whitelist' };
  }
  if (error.message.includes('User rejected the request')) {
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
  if (error.message.includes('address not whitelisted')) {
    return { code: 6000, message: 'This address not on the whitelist.' };
  }
  return { code: null, message: error };
};

export const StandardChainErrorHandling = (error, setButtonStep?, recipient?) => {
  const errorCode = ChainErrorResponses(error).code;
  const errorMessage = ChainErrorResponses(error).message;

  if (recipient && errorCode === 1000) {
    setButtonStep('failed');
    toast(`${recipient} is already whitelisted).`);
    return;
  }
  if (errorCode === 2000) {
    setButtonStep && setButtonStep('rejected');
    return;
  }
  if (errorCode === 6000) {
    toast.error(`${recipient} ${errorMessage}.`);
  } else {
    setButtonStep && setButtonStep('failed');
    alert(`${errorMessage}`);
  }
  return { code: errorCode, message: errorMessage };
};
