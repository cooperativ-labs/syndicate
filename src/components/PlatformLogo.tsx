import Link from 'next/link';
import React from 'react';
import { FC } from 'react';
import { useWindowSize } from 'react-use';

type PlatformLogoProps = {
  onlySymbol?: boolean;
};

const PlatformLogo: FC<PlatformLogoProps> = ({ onlySymbol }) => {
  const windowSize = useWindowSize();
  const fullLogo =
    process.env.NEXT_PUBLIC_CLIENT === 'reizen'
      ? '/assets/images/branding/reizen/reizen_logo.png'
      : '/assets/images/branding/cooperativ/full_dark_blue.svg';
  const symbolLogo =
    process.env.NEXT_PUBLIC_CLIENT === 'reizen'
      ? '/assets/images/branding/reizen/reizen_logo_small.png'
      : '/assets/images/branding/cooperativ/symbol_dark_blue.svg';

  const isSmall = windowSize.width < 768 || onlySymbol;
  return (
    <Link href="/">
      <img src={isSmall ? symbolLogo : fullLogo} alt="logo" width={isSmall ? '50' : '200'} className="mr-4" />
    </Link>
  );
};

export default PlatformLogo;
