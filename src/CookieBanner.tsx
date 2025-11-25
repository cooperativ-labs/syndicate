'use client';

import { cn } from '@src/lib/utils';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

import { Button } from './components/ui/button';

const buttonGradient =
  'bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 shadow-lg hover:shadow-2xl focus:shadow-sm';

const CookieBanner: FC<{ handleAnalyticsApproval: () => void }> = ({ handleAnalyticsApproval }) => {
  return (
    <div className='fixed bottom-0 md:bottom-4 md:right-10 md:left-10 z-40 mx-auto w-full md:w-auto bg-neutral-400 p-3 shadow-xl md:rounded-xl cursor-pointer'>
      <div className='flex font-medium text-white text-xs md:text-base mx-auto px-2 justify-between items-center'>
        <span className='mr-3'>
          We use cookies to improve our services. Using this website means you agree to this.{' '}
          <Link href={`${process.env.NEXT_PUBLIC_PRIVACY_URL}`}>
            <span className='underline decoration-cLightBlue'>Privacy Policy</span>
          </Link>
        </span>
        <Button
          className={cn(buttonGradient, 'p-3 px-6 text-sm font-bold rounded-lg')}
          onClick={() => {
            handleAnalyticsApproval();
          }}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
