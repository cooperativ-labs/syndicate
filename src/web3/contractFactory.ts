import { getWalletClient, waitForTransaction } from '@wagmi/core';
import { dividendBytecode, shareBytecode, swapBytecode } from './bytecode';
import { dividendContractABI, shareContractABI, swapContractABI } from './generated';
import { String0x } from './helpersChain';
import { Chain } from 'wagmi';

type DeployContractBaseProps = {
  account: String0x;
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined;
};

const deployContract = async ({
  account,
  abi,
  bytecode,
  chain,
  args,
}: DeployContractBaseProps & { abi: any; bytecode: any; args: any[] }) => {
  const walletClient = getWalletClient();

  const hash = await (
    await walletClient
  )?.deployContract({
    account,
    abi,
    bytecode,
    chain,
    args,
  });

  if (!hash) throw new Error('No hash returned from deploy contract');
  const data = await waitForTransaction({
    hash: hash,
  });

  return data;
};

export const deployShareContract = async (
  userWalletAddress: String0x | undefined,
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined
) => {
  if (!userWalletAddress) throw new Error('No user wallet address provided');
  const args = [] as any;
  const data = await deployContract({
    account: userWalletAddress,
    abi: shareContractABI,
    bytecode: shareBytecode,
    chain,
    args,
  });
  return data;
};

export const deploySwapContract = async (
  userWalletAddress: String0x | undefined,
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined,
  shareTokenAddress: String0x,
  paymentTokenAddress: String0x
) => {
  if (!userWalletAddress) throw new Error('No user wallet address provided');
  const args = [shareTokenAddress, paymentTokenAddress];
  const data = await deployContract({
    account: userWalletAddress,
    abi: swapContractABI,
    bytecode: swapBytecode,
    chain,
    args,
  });
  return data;
};

export const deployDividendContract = async (
  userWalletAddress: String0x | undefined,
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined,
  shareTokenAddress: String0x
) => {
  if (!userWalletAddress) throw new Error('No user wallet address provided');
  const reclaimTime = 1;
  const args = [shareTokenAddress, reclaimTime];
  const data = await deployContract({
    account: userWalletAddress,
    abi: dividendContractABI,
    bytecode: dividendBytecode,
    chain,
    args,
  });
  return data;
};
