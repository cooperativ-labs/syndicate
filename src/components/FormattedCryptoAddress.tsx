import cn from 'classnames';
import React, { FC, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAlgorand, MatchSupportedChains } from '@src/web3/connectors';
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
  const addressForEns: `0x${string}` = address as `0x${string}`;
  const [copied, setCopied] = useState<boolean>(false);
  const { data: ensName } = useEnsName({ address: addressForEns });
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

  const youSplitAddress = `${isYou ? 'You' : userName} (${address.slice(-4)})`;
  const splitAddress = `${address.slice(0, 7)}... ${address.slice(-4)}`;
  const presentAddressOhneENS =
    showFull && isDesktop ? (
      address
    ) : (
      <span className="hover:underline whitespace-nowrap">{userName ? youSplitAddress : splitAddress}</span>
    );

  return (
    <span className={cn('flex', [className ? className : 'text-sm text-gray-700'])}>
      <a target="_blank" rel="noreferrer" href={formURL(chainId, lookupType)}>
        {label}
        {ensName ?? presentAddressOhneENS}
      </a>
      {withCopy && (
        <button
          className="ml-2"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(ensName ?? address);
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