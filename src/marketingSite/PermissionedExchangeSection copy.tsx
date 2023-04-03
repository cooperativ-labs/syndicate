import React, { FC } from 'react';

const permissionedExchangeExplainer = (
  <div className="mt-5">
    <h1 className="text-xl md:text-3xl mb-4 mt-3 font-bold">What is Real Asset Syndicator? </h1>
    <h3 className="text-gray-700 mb-4 font-bold">
      {`    A a way to tokenize your syndication while maintaining control of who can invest.`}
    </h3>
    <div className=" mb-10">
      {`You approve each of your investors. They can then purchase assets you issue into your syndication's exchange and
      trade those assets with other approved investors. You can set initial lockup periods to meet common compliance
      requirements, and you set additional conditions, like right of first refusal, for any trade that takes place.`}
    </div>
    <h1 className="text-xl md:text-3xl mb-4 mt-8 font-bold">How do I approve investors?</h1>
    <h3 className="text-gray-700 mb-4 font-bold">Your investors can use our customizable application form.</h3>
    <div className=" mb-10">
      {` Most jurisdictions require you to vet potential investors before letting them purchase securities. Our built-in
      forms let you collect the information necessary to confirm that applicants are eligible to invest.`}
    </div>
    <h1 className="text-xl md:text-3xl mb-4 mt-8 font-bold">What about traditional investors? </h1>
    <h3 className="text-gray-700 mb-4 font-bold">We are building this platform for them, too.</h3>
    <div className=" mb-10">
      {` Web3-savvy users will always be able to use Real Asset Syndicator with their own wallets, but for everyone else,
      we are building a way to invest without ever touching a seed-phrase. They will even be able to invest using their
      IRA accounts.`}
    </div>
  </div>
);

const PermissionedExchangeSection: FC = () => {
  return (
    <div className="md:py-10 pb-10 md:pb-20 px-4 bg-cLightCream">
      <div className="flex-col min-h-full mx-auto pt-10" style={{ maxWidth: '1280px' }}>
        <div className="hidden md:inline md:mx-4 ">
          <div className="md:mx-4 grid grid-cols-2 gap-20">
            <div className="rounded-lg shadow-lg">
              <img src="/assets/images/screenshots/create_syndication_screenshot.png" />
            </div>
            {permissionedExchangeExplainer}
          </div>
        </div>
        <div className="md:hidden">
          <div className="p-4 mx-4">{permissionedExchangeExplainer}</div>
          <img src="/assets/images/screenshots/create_syndication_screenshot.png" />
        </div>
      </div>
    </div>
  );
};

export default PermissionedExchangeSection;
