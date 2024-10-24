import cn from 'classnames';
import Link from 'next/link';

import NavLink from './NavLink';
import React, { FC } from 'react';
import { useWindowSize } from 'react-use';

const standardClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

const MarketingNav: FC = () => {
  const windowSize = useWindowSize();
  return (
    <div
      className="py-2 px-2 pr-4 mt-2 md:mt-4 h-14 z-30 flex mx-auto justify-between self-center items-center "
      style={{ maxWidth: '1580px' }}
    >
      <div className="ml-1 justify-start flex items-center">
        <img
          src="/assets/images/branding/cooperativ/symbol_dark_blue.svg"
          alt="logo"
          width={windowSize.width < 768 ? '50' : '70'}
        />
      </div>
      <div className="flex justify-end items-center">
        <NavLink link="https://medium.com/cooperativ" external text="Blog" />
        <span className="flex items-center">
          <Link href="/">
            <div className={cn(standardClass, 'p-1 px-2 md:p-2 md:px-4 font-semibold rounded-full relative md:mr-2')}>
              Open App
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default MarketingNav;
