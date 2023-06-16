import cn from 'classnames';
import React, { FC, use, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { addressWithENS, addressWithoutEns, String0x } from '@src/web3/helpersChain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAlgorand, MatchSupportedChains } from '@src/web3/connectors';
import { Maybe } from 'yup';
import { useAsync } from 'react-use';

type FormattedCryptoAddressProps = {
  chainId: Maybe<number> | undefined;
  address: string | String0x | undefined;
  label?: string;
  withCopy?: boolean;
  className?: string;
  showFull?: boolean;
  lookupType?: 'address' | 'tx';
  userName?: Maybe<string> | undefined;
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
  const defaultAddress = addressWithoutEns({ address, isYou, isDesktop: false, userName, showFull });
  const [copied, setCopied] = useState<boolean>(false);
  const [presentedAddress, setPresentedAddress] = useState<string | undefined>(defaultAddress ?? undefined);
  const chain = chainId ? MatchSupportedChains(chainId) : undefined;
  const blockExplorer = chain?.blockExplorer;
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width ? windowSize.width > 768 : false;

  const formURL = (chainId: Maybe<number> | undefined, lookupType?: string) => {
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
      {withCopy && address && (
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
