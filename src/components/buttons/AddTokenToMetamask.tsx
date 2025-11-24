// components/AddTokenToMetamask.tsx

import 'wagmi/window';

import { Plus, Wallet } from 'lucide-react';
import React, { useState } from 'react';

interface AddTokenToMetamaskProps {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenImage?: string;
}

const AddTokenToMetamask: React.FC<AddTokenToMetamaskProps> = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage
}) => {
  const [status, setStatus] = useState<string>('');

  const handleClick = async () => {
    const { ethereum } = window as typeof window & {
      ethereum?: {
        request?: (args: { method: string; params?: Record<string, unknown> }) => Promise<unknown>;
      };
    };

    if (ethereum && typeof ethereum !== 'undefined') {
      try {
        await ethereum.request?.({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage
            }
          }
        });
      } catch (error: any) {
        throw new Error(error);
      }
    }
  };

  return (
    <div>
      <button
        className={
          'text-xs font-bold text-slate-200 p-1 px-2 my-1 rounded-full bg-linear-to-r from-cyan-600 to-blue-600 hover:bg-linear-to-l '
        }
        onClick={handleClick}
      >
        <Plus size={14} /> <Wallet size={14} />
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddTokenToMetamask;
