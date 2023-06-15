import Button from '../buttons/Button';
import cn from 'classnames';
import React, { FC, useContext } from 'react';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { MatchSupportedChains } from '@src/web3/connectors';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId, useNetwork } from 'wagmi';

export const networkIcon = (chainId: number, walletAddress: string) => {
  if (!walletAddress) {
    return 'bg-white border-2 border-gray-300';
  }

  return MatchSupportedChains(chainId)?.icon;
};

export const networkColor = (chainId: number | undefined, walletAddress: String0x | undefined) => {
  const color = MatchSupportedChains(chainId)?.color;
  if (!walletAddress) {
    return 'bg-white border-2 border-gray-300';
  }
  switch (chainId) {
    case 1:
      return `bg-${color} hover:text-black`;
    case 3:
      return `bg-${color} hover:text-black`;
    case 5:
      return `bg-${color} hover:text-black`;
    case 137:
      return `bg-${color} hover:text-black`;
    case 80001:
      return `bg-${color} hover:text-black`;
    case undefined:
      return 'bg-gray-300 border-2 border-gray-300';
    default:
      return 'bg-cRed hover:text-black';
  }
};
type NetworkIndicatorDotProps = {
  chainId: number | undefined;
  walletAddress: String0x | undefined;
};

export const NetworkIndicatorDot: FC<NetworkIndicatorDotProps> = ({ chainId, walletAddress }) => {
  return <div className={cn(networkColor(chainId, walletAddress), 'flex rounded-full h-3 w-3 mr-1')} />;
};

const NetworkIndicator: FC = () => {
  const chainId = useChainId();
  const { address: userWalletAddress } = useAccount();

  // const whichWallet = `with ${user?.walletAddresses.find((userWallet) => userWallet.address === walletAddress)?.name}`;

  const hoverColor = `hover:${networkColor(chainId, userWalletAddress)}`;
  const ChainName = () => {
    if (!userWalletAddress) {
      return 'Click here to connect a wallet';
    }
    switch (chainId) {
      case 1:
        return `Ethereum`;
      case 3:
        return 'Test Transactions Only';
      case 5:
        return 'Test Transactions Only';
      case 137:
        return `Polygon`;
      case 80001:
        return 'Test Transactions Only';
      case undefined:
        return 'Click here to connect a wallet';
      default:
        return 'Incompatible Network';
    }
  };
  return (
    <Button className="focus:outline-none">
      <div
        className={cn(
          hoverColor,
          'flex items-center rounded-full border-2 border-gray-300 p-1 text-xs font-semibold text-gray-600'
        )}
      >
        <div className=" mx-auto px-2">{ChainName()}</div>
        <NetworkIndicatorDot chainId={chainId} walletAddress={userWalletAddress} />
      </div>
    </Button>
  );
};

export default NetworkIndicator;
