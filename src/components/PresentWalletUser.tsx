i;
import { GET_CRYPTO_ADDRESS } from '@src/utils/graphQueries/crypto';
import { Check } from 'lucide-react';
import React, { FC, useState } from 'react';

type PresentWalletUserProps = {
  walletAddress: string;
  className?: string;
  withCopy?: boolean;
};
const PresentWalletUser: FC<PresentWalletUserProps> = ({ walletAddress, className, withCopy }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { data } = useQuery(GET_CRYPTO_ADDRESS, {
    variables: { walletAddress: walletAddress }
  });
  const userFullName = data?.getCryptoAddress?.owner.fullName;
  return (
    <div className={className}>
      {userFullName}{' '}
      {withCopy && (
        <button
          className="ml-1"
          onClick={() => {
            navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <div className="border-2 rounded-md text-xs p-1 text-gray-500">copy address</div>
          )}
        </button>
      )}
    </div>
  );
};

export default PresentWalletUser;
