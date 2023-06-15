import BannerImage from '@src/components/organization/BannerImage';
import OfferingCard from '@src/components/offering/OfferingCard';
import React, { FC } from 'react';
import SocialLinkItem from '@src/components/SocialLinkItem';
import { LinkedAccountType, Organization } from 'types';

type OrganizationProfileProps = {
  organization: Organization;
};

const OrganizationProfile: FC<OrganizationProfileProps> = ({ organization }) => {
  const { name, emailAddresses, phone, logo, bannerImage, linkedAccounts, website, description, legalEntities } =
    organization;

  const offerings =
    legalEntities &&
    legalEntities
      .map((entity) => {
        return entity?.offerings;
      })
      .flat();

  return (
    <div className="flex min-h-screen ">
      <div className="w-full pb-20">
        {/* <div className="md:mx-6 ">
          <NavBar organizationLogo={logo} organizationName={name} />
        </div> */}
        <BannerImage imageUrl={bannerImage as string} />

        <div className="md:mx-auto " style={{ maxWidth: '1280px' }}>
          <div className="mx-4 ">
            <div className="flex justify-between">
              <div>
                <div className="-mt-12 md:-mt-20 h-20 w-20 md:h-36 md:w-36 bg-gray-200 border-2 border-white rounded-lg drop-shadow-md overflow-hidden">
                  <img src={logo as string} />
                </div>
                <div className="font-ubuntu text-3xl font-semibold mt-6">{name}</div>
                <div className="md:w-64">
                  {/* <EntityAddressPanel offeringEntity={organization} owners={organization.owners} /> */}
                </div>
              </div>
              <div>
                {linkedAccounts && linkedAccounts.length > 0 && (
                  <div>
                    <div className="flex pt-4 justify-end">
                      {linkedAccounts.map((account, i) => {
                        return (
                          <div key={i}>
                            <SocialLinkItem type={account?.type} url={account?.url} />
                          </div>
                        );
                      })}
                      {emailAddresses && emailAddresses.length > 0 && (
                        <SocialLinkItem type={LinkedAccountType.Email} url={`mailto:${emailAddresses[0]?.address}`} />
                      )}
                      <SocialLinkItem type={LinkedAccountType.Phone} url={phone} />
                      <SocialLinkItem type={LinkedAccountType.Website} url={website} />
                    </div>
                    <hr className="my-2 mb-6" />
                  </div>
                )}
                {description}
              </div>
            </div>

            <hr className="my-10" />
            <div className="flex flex-col md:flex-row md:flex-wrap justify center gap-5">
              {offerings?.map((offering, i) => {
                return (
                  <div key={i}>
                    <OfferingCard offering={offering} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
