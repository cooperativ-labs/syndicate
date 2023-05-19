import abi, { _bytecode } from './ABI';
import { getWalletClient, waitForTransaction } from '@wagmi/core';

export const deployContract = async (userWalletAddress, chain) => {
  const walletClient = getWalletClient();
  const contractABI = abi;
  const contractBytecode = _bytecode;

  const hash = await (
    await walletClient
  ).deployContract({
    abi: contractABI,
    account: userWalletAddress,
    bytecode: contractBytecode,
    chain,
  });

  const data = await waitForTransaction({
    hash: hash,
  });

  return data;
};
