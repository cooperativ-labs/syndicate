import { getWalletClient, waitForTransaction } from '@wagmi/core';
import { dividendBytecode, shareBytecode, swapBytecode } from './bytecode';
import { dividendContractABI, shareContractABI, swapContractABI } from './generated';
import { String0x } from './helpersChain';

const deployContract = async (account, abi, bytecode, chain, args) => {
  const walletClient = getWalletClient();

  const hash = await (
    await walletClient
  ).deployContract({
    account,
    abi,
    bytecode,
    chain,
    args,
  });

  const data = await waitForTransaction({
    hash: hash,
  });

  return data;
};

export const deployShareContract = async (userWalletAddress: String0x, chain) => {
  const args = [];
  const data = await deployContract(userWalletAddress, shareContractABI, shareBytecode, chain, args);
  return data;
};

export const deploySwapContract = async (
  userWalletAddress: String0x,
  chain,
  shareTokenAddress: String0x,
  paymentTokenAddress: String0x
) => {
  const args = [shareTokenAddress, paymentTokenAddress];
  const data = await deployContract(userWalletAddress, swapContractABI, swapBytecode, chain, args);
  return data;
};

export const deployDividendContract = async (userWalletAddress: String0x, chain, shareTokenAddress: String0x) => {
  const reclaimTime = 1;
  const args = [shareTokenAddress, reclaimTime];
  const data = await deployContract(userWalletAddress, dividendContractABI, dividendBytecode, chain, args);
  return data;
};
