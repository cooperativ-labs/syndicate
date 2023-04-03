import React, { FC } from 'react';
import useWindowSize from '@hooks/useWindowSize';

const FeatureItem: FC<{ image: string; title: string; subtitle: string; description: string; reverse?: boolean }> = ({
  image,
  title,
  subtitle,
  description,
  reverse,
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  const imageItem = (
    <div className={'col-span-3 rounded-lg shadow-lg bg-white p-4'}>
      <img src={image} />
    </div>
  );

  const textItem = (
    <div className={'col-span-2'}>
      <h1 className="text-3xl mb-4 mt-8 font-bold">{title}</h1>
      <h3 className="text-gray-700 mb-4 font-bold">{subtitle}</h3>
      <div className=" mb-10">{description}</div>
    </div>
  );

  return reverse && !isMobile ? (
    <div className="md:grid grid-cols-5 gap-16">
      {imageItem}
      {textItem}
    </div>
  ) : (
    <div className="md:grid grid-cols-5 gap-16">
      {textItem}
      {imageItem}
    </div>
  );
};

const PermissionedExchangeSection: FC = () => {
  return (
    <div className="md:py-10 pb-10 md:pb-20 px-4 bg-cLightCream">
      <div className="flex-col min-h-full mx-auto pt-10" style={{ maxWidth: '1000px' }}>
        <div className="flex flex-col md:mx-4 gap-8 md:gap-20">
          <FeatureItem
            reverse
            image="/assets/images/screenshots/link-offering.png"
            title="Link your syndication."
            subtitle="You can tokenize all or just part of a traditional offering."
            description="You don't have to tokenize your whole offering. Cooperativ makes it easy to tokenize as many shares as you need, while still running a traditional syndication."
          />
          <FeatureItem
            image="/assets/images/screenshots/approve-investor.png"
            title="Approve investors."
            subtitle="Your investors can use our customizable application form."
            description="Most jurisdictions require you to vet potential investors before letting them purchase securities. Our built-in forms let you collect the information necessary to confirm that applicants are eligible to invest."
          />
          <FeatureItem
            reverse
            image="/assets/images/screenshots/sale-form.png"
            title="Sell shares."
            subtitle="You create a sale and your investors can instantly purchase shares."
            description="You shouldn't have to nag your investors to wire funds, and your investors should be able to invest in seconds. With Cooperativ, you can create a sale and your investors can instantly purchase shares."
          />
          <FeatureItem
            image="/assets/images/screenshots/distribute-shares.png"
            title="Issue distributions."
            subtitle="Funds are automatically distributed to shareholders pro-rata."
            description="No need to collect or update payment information. Just send the funds you want to distribute to the smart contract, and it will automatically conduct distributions."
          />

          <FeatureItem
            reverse
            image="/assets/images/screenshots/sale-list.png"
            title="Let your investors trade."
            subtitle="Your investors can sell shares to others on your whitelist."
            description="Our trading interface offers an easy, compliant way to offload shares, but only with your approval."
          />
        </div>
      </div>
    </div>
  );
};

export default PermissionedExchangeSection;
