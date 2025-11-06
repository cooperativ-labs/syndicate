'use client';

import { SupportedChains } from '@src/web3/wagmi';
import { useAccount } from 'wagmi';

import AlertBanner from './AlertBanner';

export default function ChainCompatibilityAlert() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME;
  const { isConnected, chain } = useAccount();
  return (
    <AlertBanner
      color="red-600"
      show={isConnected && chain !== SupportedChains[0]}
      text={` The blockchain you are using is not compatible with ${projectName}. Please switch to Sepolia for testing or Mainnet or Polygon for real transactions`}
    />
  );
}
