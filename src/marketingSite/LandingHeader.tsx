import HighlightBanner from '@src/components/alerts/HighlightBanner';
import MarketingButton from '@src/components/buttons/MarketingButton';

import MarketingNav from './MarketingNav';
import React, { FC } from 'react';

const LandingHeader: FC = () => {
  return (
    <div className="z-30 shadow-md ">
      {/* <HighlightBanner /> */}
      <MarketingNav />
      <div className="flex min-h-full mx-auto justify-center px-4 md:px-8 md:mt-8" style={{ maxWidth: '1280px' }}>
        <div className="my-10 flex flex-col">
          <div className=" max-w-4xl justify-center" style={{ textShadow: '3px 3px 5px #e2e2e2' }}>
            <h1 className="ubuntu text-4xl md:text-6xl mb-4 text-center font-semibold text-cLightBlue ">
              Real Asset Tokenizer
            </h1>
            <div className="text-xl font-medium text-center text-cDarkBlue">
              Let your investors apply to your offering, purchase shares, and trade with your other limited partners
              right from their phone. Built for Reg-D offerings.
            </div>
            <div className="flex flex-col md:flex-row mt-10 mb-8 justify-center items-center">
              {/* <MarketingButton
                className="mx-2 my-2 whitespace-nowrap"
                link="/app"
                text="Open App"
                symbols={
                  <div className="flex justify-center items-center ">
                    {/* <img src="/assets/images/chain-icons/ethereum-eth-logo.svg" className="h-4 mx-1" />
                    <img src="/assets/images/chain-icons/polygon-matic-logo.svg" className="h-4 mx-1" /> 
                    <img src="/assets/images/chain-icons/algorand-algo.svg" className="h-4 mx-1" />
                  </div>
                }
              /> 
              */}
              <MarketingButton
                className="mx-2 my-2 whitespace-nowrap"
                link="https://v9fdzm2x0xa.typeform.com/to/VD3NqJhM"
                external
                text="Tell us about your use-case"
                // symbols={
                //   <div className="flex justify-center items-center ">
                //     {/* <img src="/assets/images/chain-icons/ethereum-eth-logo.svg" className="h-4 mx-1" />
                //     <img src="/assets/images/chain-icons/polygon-matic-logo.svg" className="h-4 mx-1" /> */}
                //     <img src="/assets/images/chain-icons/algorand-algo.svg" className="h-4 mx-1" />
                //   </div>
                // }
              />
              <MarketingButton
                className="mx-2 my-2 whitespace-nowrap"
                outlined
                link="https://www.youtube.com/playlist?list=PLdUGBxGRPWz_n-tWwlKt_o6phKlHsR6CC"
                external
                text="See Cooperativ in Action"
              />
            </div>
            {/* <a href="https://v9fdzm2x0xa.typeform.com/to/wD3gYpJD" rel="noreferrer" target="_blank">
              <div className="text-sm md:text-base text-center text-gray-600 hover:text-gray-900 underline">
                Interested in investing in real estate? Apply to join.
              </div>
            </a> */}
          </div>
        </div>
      </div>
      <div className=" p-2 px-4 border-t-2 border-slate-100  ">
        <div className="flex mx-auto justify-between" style={{ maxWidth: '1280px' }}>
          <div className="flex items-center md:mx-8 text-sm font-medium">
            Proudly building on
            {/* <img src="/assets/images/chain-icons/ethereum-eth-logo.svg" className="h-5 ml-2 mx-1" /> */}
            {/* <img src="/assets/images/chain-icons/polygon-matic-logo.svg" className="h-5 mx-1" /> */}
            <img src="/assets/images/chain-icons/algorand-algo.svg" className="h-5 mx-1" />
          </div>
          {/* <SocialIcons className="md:hidden" /> */}

          <div className="hidden md:flex" style={{ maxWidth: '1280px' }}>
            <a href="https://twitter.com/RealDAO1" target="_blank" rel="noreferrer">
              <div className="flex mt-3 md:mt-0 items-center mx-8 text-sm font-medium" style={{ maxWidth: '1280px' }}>
                Member of Real World Asset Consortium{' '}
                <img src="/assets/images/logos/rwac-logo.jpg" className="h-5 ml-2 mx-1" />{' '}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
