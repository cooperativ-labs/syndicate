import { getWagmiConfig } from '@src/web3/wagmi';
import { deployContract } from '@wagmi/core';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { Chain } from 'wagmi/chains';

import { dividendBytecode, shareBytecode, swapBytecode } from './bytecode';
import { dividendContractABI, shareContractABI, swapContractABI } from './generated';
import { String0x } from './helpersChain';

type DeployContractBaseProps = {
  account: String0x;
  chain:
    | (Chain & {
        unsupported?: boolean | undefined;
      })
    | undefined;
};

const contractDeployer = async ({
  account,
  abi,
  bytecode,
  chain,
  args
}: DeployContractBaseProps & { abi: any; bytecode: any; args: any[] }) => {
  const config = getWagmiConfig();

  const hash = await deployContract(config, {
    account,
    abi,
    bytecode,
    args
  });

  if (!hash) throw new Error('No hash returned from deploy contract');
  const data = await waitForTransactionReceipt(config, {
    hash: hash
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
  const data = await contractDeployer({
    account: userWalletAddress,
    abi: shareContractABI,
    bytecode: shareBytecode,
    chain,
    args
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
  const data = await contractDeployer({
    account: userWalletAddress,
    abi: swapContractABI,
    bytecode: swapBytecode,
    chain,
    args
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
  const data = await contractDeployer({
    account: userWalletAddress,
    abi: dividendContractABI,
    bytecode: dividendBytecode,
    chain,
    args
  });
  return data;
};
