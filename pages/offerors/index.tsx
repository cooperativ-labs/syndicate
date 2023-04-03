import MarketingNav from '@src/marketingSite/MarketingNav';
import React, { FC } from 'react';
import SyndicationExplorer from '@src/pages/SyndicationExplorer';
import { Head } from 'next/document';
import { NextPage } from 'next/types';

const ExplorePage: NextPage = () => {
  //send all syndications into explorer
  return (
    <div data-test="component-explore" className="h-full flex-col w-full">
      <div>
        <MarketingNav />
        <SyndicationExplorer />
      </div>
    </div>
  );
};

export default ExplorePage;

//Need to load data here
