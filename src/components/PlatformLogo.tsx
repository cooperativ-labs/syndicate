import Link from 'next/link';
import React from 'react';
import { FC } from 'react';
import { useWindowSize } from 'react-use';

type PlatformLogoProps = {
  onlySymbol?: boolean;
};

const PlatformLogo: FC<PlatformLogoProps> = ({ onlySymbol }) => {
  const windowSize = useWindowSize();

  const logo =
    process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? '/reizen/logo.png' : '/cooperativ/logo.svg';
  const symbolLogo =
    process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? '/reizen/favicon.ico' : '/cooperativ/symbol.svg';

  const isSmall = windowSize.width < 768 || onlySymbol;
  return (
    <Link href='/'>
      <img
        src={isSmall ? symbolLogo : logo}
        alt='logo'
        width={isSmall ? '40' : '140'}
        className='mr-4'
      />
    </Link>
  );
};

export default PlatformLogo;
