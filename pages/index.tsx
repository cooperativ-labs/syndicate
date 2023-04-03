import Footer from '@src/Footer/Footer';
import Head from 'next/head';
import LandingHeader from '@src/marketingSite/LandingHeader';
import PermissionedExchangeSection from '@src/marketingSite/PermissionedExchangeSection';
import React from 'react';
import { NextPage } from 'next';

const Application: NextPage = () => {
  return (
    <div data-test="component-landing" className="bg-white flex flex-col w-full h-full">
      <Head>
        <title>Real Asset Syndicator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Permissioned Exchange" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Give investors in your real estate syndications a Robinhood-like experience."
        />
        {/* <meta property="og:image" content="/assets/images/share.png" /> */}
        <meta property="og:url" content="https://syndicate.cooperativ.io/" />
        {/** Twitter */}
        <meta name="twitter:title" content="Permissioned Exchange" />
        <meta
          name="twitter:description"
          content="Give investors in your real estate syndications a Robinhood-like experience."
        />
        <meta name="twitter:image" content="/assets/images/share.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <LandingHeader />
      <PermissionedExchangeSection />
      <Footer />
    </div>
  );
};

export default Application;
