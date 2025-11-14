import Link from 'next/link';
import React from 'react';
import { FC } from 'react';
import { useWindowSize } from 'react-use';

type PlatformLogoProps = {
  onlySymbol?: boolean;
};

const PlatformLogo: FC<PlatformLogoProps> = ({ onlySymbol }) => {
  const windowSize = useWindowSize();

  const logo = '/assets/images/branding/full_dark_blue.svg';
  const symbolLogo = '/assets/images/branding/symbol_dark_blue.svg';

  const isSmall = windowSize.width < 768 || onlySymbol;
  return (
    <Link href="/">
      <img
        src={isSmall ? symbolLogo : logo}
        alt="logo"
        width={isSmall ? '40' : '140'}
        className="mr-4"
      />
    </Link>
  );
};

export default PlatformLogo;
