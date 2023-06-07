import cn from 'classnames';
import React, { FC, use, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { addressWithENS, String0x } from '@src/web3/helpersChain';
import { fetchEnsName } from 'wagmi/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAlgorand, MatchSupportedChains } from '@src/web3/connectors';
import { useAsync } from 'react-use';
import { useEnsName } from 'wagmi';

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
  const [presentedAddress, setPresentedAddress] = useState<string>('...');
  const chain = chainId && MatchSupportedChains(chainId);
  const blockExplorer = chain?.blockExplorer;
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width > 768;

  if (!address) {
    return <></>;
  }

  const formURL = (chainId: number, lookupType: string) => {
    const type = lookupType === 'tx' ? 'tx' : isAlgorand(chainId) ? 'application' : 'address';
    const url = `${blockExplorer}/${lookupType ? type : 'address'}/${address}`;
    return url;
  };

  useAsync(async () => {
    const presentedAddress = await addressWithENS({ address, isYou, isDesktop, userName, showFull });
    setPresentedAddress(presentedAddress);
  }, [address, isYou, isDesktop, userName, showFull]);

  return (
    <span className={cn('flex', [className ? className : 'text-sm text-gray-700'])}>
      <a target="_blank" rel="noreferrer" href={formURL(chainId, lookupType)}>
        {label}
        <span className="hover:underline whitespace-nowrap">{presentedAddress}</span>
      </a>
      {withCopy && (
        <button
          className="ml-2"
          onClick={(e) => {
            e.stopPropagation();
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
