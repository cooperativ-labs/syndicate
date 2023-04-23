import Link from 'next/link';
import { FC } from 'react';
import { useWindowSize } from 'react-use';

type CooperativLogoProps = {
  onlySymbol?: boolean;
};

const CooperativLogo: FC<CooperativLogoProps> = ({ onlySymbol }) => {
  const windowSize = useWindowSize();

  const isSmall = windowSize.width < 768 || onlySymbol;
  return (
    <Link href="/">
      <img
        src={isSmall ? '/assets/images/branding/symbol_dark_blue.svg' : '/assets/images/branding/full_dark_blue.svg'}
        alt="logo"
        width={isSmall ? '40' : '140'}
        className="mr-4"
      />
    </Link>
  );
};

export default CooperativLogo;
