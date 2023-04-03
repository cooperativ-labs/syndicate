import cn from 'classnames';
import React, { FC, useContext, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { CryptoAddressProtocol } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAlgorand, MatchSupportedChains } from '@src/web3/connectors';
import { ReachContext } from '@src/SetReachContext';

type FormattedCryptoAddressProps = {
  chainId: number;
  address: string;
  label?: string;
  withCopy?: boolean;
  className?: string;
  showFull?: boolean;
  lookupType?: 'address' | 'tx';
  userName?: string;
  isYou?: boolean;
};

const FormattedCryptoAddress: FC<FormattedCryptoAddressProps> = ({
  label,
  chainId,
  address,
  withCopy,
  className,
  showFull,
  lookupType,
  userName,
  isYou,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const chain = chainId && MatchSupportedChains(chainId);
  const blockExplorer = chain?.blockExplorer;
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width > 768;
  if (!address) {
    return <></>;
  }

  const formURL = (chainId, lookupType) => {
    const type = lookupType === 'tx' ? 'tx' : isAlgorand(chainId) ? 'application' : 'address';
    const url = `${blockExplorer}/${lookupType ? type : 'address'}/${address}`;
    return url;
  };

  const presentAddress = userName
    ? `${isYou ? 'You' : userName} (${address.slice(-4)})`
    : `${address.slice(0, 7)}... ${address.slice(-4)}`;

  return (
    <span className={cn('flex', [className ? className : 'text-sm text-gray-700'])}>
      <a target="_blank" rel="noreferrer" href={formURL(chainId, lookupType)}>
        {label}{' '}
        {showFull && isDesktop ? address : <span className="hover:underline whitespace-nowrap">{presentAddress}</span>}
      </a>
      {withCopy && (
        <button
          className="ml-2"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          {copied ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="copy" />}
        </button>
      )}
    </span>
  );
};

export default FormattedCryptoAddress;
