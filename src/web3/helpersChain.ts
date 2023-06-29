import { bytesToString, hexToBytes, stringToHex } from 'viem';
import { keccak256, toHex } from 'viem';
import toast from 'react-hot-toast';
import { Document, Maybe } from 'types';
import { fetchEnsAddress, fetchEnsName } from 'wagmi/actions';
import { Dispatch, SetStateAction } from 'react';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

export type String0x = `0x${string}`;

export const stringFromBytes32 = (bytes32: String0x) => {
  const bytes = hexToBytes(bytes32);
  const string = bytesToString(bytes, { size: 32 });
  return string;
};
export const bytes32FromString = (string: string | undefined) => {
  const bytes = stringToHex(string as string, { size: 32 });
  return bytes;
};

export const hashBytes32FromString = (string: Maybe<string> | undefined) =>
  string !== undefined ? keccak256(toHex(string as string)) : undefined;

export const getHashTextPairs = (data: any, agreementTexts: Maybe<Document>[]) => {
  const hashes = data.map((doc: any) => {
    return doc.result[1];
  });
  const textHashPairs = agreementTexts.map((doc, i) => {
    const docText = doc?.text;
    const hash = hashes.find((hash: string) => hashBytes32FromString(docText) === hash);
    return { hash: hash, text: doc?.text };
  });
  return textHashPairs;
};

export const normalizeEthAddress = (address: String0x | string | undefined) => {
  return address?.toLowerCase() as String0x;
};

export const getAddressFromEns = async (input: string | String0x) => {
  let address = input;
  if (input.includes('.eth')) {
    const hexAddress = (await fetchEnsAddress({
      name: input,
      chainId: 1,
    })) as string;
    address = hexAddress;
  }
  return address;
};

type AddressWithoutEnsProps = {
  address: string | String0x | undefined | Maybe<string>;
  isYou?: boolean;
  isDesktop?: boolean;
  userName?: Maybe<string> | undefined;
  showFull?: boolean;
};
export const splitAddress = (address: String0x | string) => `${address?.slice(0, 4)}... ${address?.slice(-4)}`;

export const addressWithoutEns = ({ address, isYou, isDesktop, userName, showFull }: AddressWithoutEnsProps) => {
  if (!address) return undefined;
  const youSplitAddress = `${isYou ? 'You' : userName} (${address?.slice(-4)})`;
  const withoutENS = showFull && isDesktop ? address : userName ? youSplitAddress : splitAddress(address);
  return address ? withoutENS : undefined;
};

export const addressWithENS = async ({ address, isYou, isDesktop, userName, showFull }: AddressWithoutEnsProps) => {
  let ensName = undefined;
  ensName = await fetchEnsName({
    address: address as String0x,
    chainId: 1,
  });
  const withoutENS = addressWithoutEns({ address, isYou, isDesktop, userName, showFull });
  return ensName ?? withoutENS;
};

export const WalletErrorMessages = {
  NeedToApproveConnection: `Trying to connect to your wallet: you may need to click on your wallet's browser extension to permit it to connect to Cooperativ.`,
  RejectedAttemptToConnect: `It looks like you rejected your wallet's attempt to connect. You can try the action again.`,
  OnIncompatibleChain: `It looks like you are on an incompatible blockchain network. Check your wallet settings to make sure you are using the Ethereum or Ropsten networks`,
};

export const WalletErrorCodes = (error: any) => {
  switch (error.code) {
    case parseInt('-32002'):
      return WalletErrorMessages.NeedToApproveConnection;
    case 4001:
      return WalletErrorMessages.RejectedAttemptToConnect;
    default:
      return `Error: ${error.message} (check your wallet settings to make sure you are using the Ethereum or Ropsten networks)`;
  }
};

export const ChainErrorResponses = (error: any, recipient: string | String0x | undefined) => {
  if (error.message.includes('address already whitelisted')) {
    return { code: 1001, message: `${recipient} is already whitelisted).` };
  }
  if (error.message.includes('address not whitelisted')) {
    return { code: 1002, message: `${recipient} is not on the whitelist.` };
  }
  if (error.message.includes('Balance not zero') && error.message.includes('removeFromWhitelist')) {
    return { code: 1003, message: 'This user cannot be removed from the whitelist because they still hold shares.' };
  }
  if (error.message.includes('User rejected the request')) {
    return { code: 2000, message: 'User cancelled operation' };
  }
  // if (error.message.includes('underflow on subtracting')) {
  //   return { code: 3000, message: 'User does not have enough of the asset to complete the transaction.' };
  // }
  // if (error.message.includes('balance') && error.message.includes('below min')) {
  //   return { code: 4001, message: 'You do not have enough ALGO to complete the transaction.' };
  // }
  if (error.message.includes('hash is immutable')) {
    return { code: 5000, message: 'This contract has already been established.' };
  }
  if (error.message.includes('reverted for unknown reason')) {
    return {
      code: 7001,
      message:
        'This transaction was not able to be completed. It is possible that a competing transaction was submitted just before yours.',
    };
  }
  if (error.message.includes('Order already accepted')) {
    return {
      code: 7002,
      message:
        'Another request was submitted before yours. Please wait until the fund manager accepts or rejects that request.',
    };
  }
  return { code: 9999, message: error.message };
};

export const StandardChainErrorHandling = (
  error: any,
  setButtonStep?: Dispatch<SetStateAction<LoadingButtonStateType>>,
  recipient?: String0x
) => {
  const errorCode = ChainErrorResponses(error, recipient).code;
  const errorMessage = ChainErrorResponses(error, recipient).message;

  if (recipient && errorCode === 1001) {
    setButtonStep && setButtonStep('failed');
    toast(errorMessage);
    return;
  }
  if (errorCode === 1002) {
    setButtonStep && setButtonStep('failed');
    toast.error(errorMessage);
    return;
  }
  if (errorCode === 1003) {
    setButtonStep && setButtonStep('failed');
    toast.error(errorMessage);
    return;
  }
  if (errorCode === 2000) {
    setButtonStep && setButtonStep('rejected');
  } else {
    setButtonStep && setButtonStep('failed');
    alert(errorMessage);
  }
  return { code: errorCode, message: errorMessage };
};
