import BannerImage from '@src/components/entity/BannerImage';
import Container from '@src/containers/Layouts/Container';
import EntityAddressPanel from '@src/components/offering/EntityAddressPanel';
import NavBar from '@src/containers/NavigationBar';
import OfferingCard from '@src/components/offering/OfferingCard';
import React, { FC } from 'react';
import SocialLinkItem from '@src/components/SocialLinkItem';
import { LegalEntity, LinkedAccountType } from 'types';

type GpProfileProps = {
  entity: LegalEntity;
};

const GpProfile: FC<GpProfileProps> = ({ entity }) => {
  const {
    id,
    displayName,
    emailAddresses,
    phone,
    fullName,
    profileImage,
    bannerImage,
    subsidiaries,
    linkedAccounts,
    website,
    description,
  } = entity;

  const offerings = subsidiaries
    .map((entity) => {
      return entity.offerings;
    })
    .flat();

  return (
    <div className="flex">
      <div className="w-full pb-20">
        {/* <div className="md:mx-6 ">
          <NavBar entityLogo={profileImage} entityName={displayName} />
        </div> */}
        <BannerImage imageUrl={bannerImage} />
        {/* <Container> */}
        <div className="mx-4 md:mx-auto " style={{ maxWidth: '1280px' }}>
          <div className="flex justify-between">
            <div>
              <div className="-mt-12 md:-mt-20 h-20 w-20 md:h-36 md:w-36 bg-gray-200 border-2 border-white rounded-lg drop-shadow-md overflow-hidden">
                <img src={profileImage} />
              </div>
              <div className="font-ubuntu text-3xl font-semibold mt-6">{displayName}</div>
              <div className="md:w-64">
                <EntityAddressPanel offeringEntity={entity} owners={entity.owners} />
              </div>
            </div>
            <div>
              {linkedAccounts.length > 0 && (
                <div>
                  <div className="flex pt-4 justify-end">
                    {linkedAccounts.map((account, i) => {
                      return (
                        <div key={i}>
                          <SocialLinkItem type={account.type} url={account.url} />
                        </div>
                      );
                    })}
                    {emailAddresses.length > 0 && (
                      <SocialLinkItem type={LinkedAccountType.Email} url={`mailto:${emailAddresses[0].address}`} />
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
            {offerings.map((offering, i) => {
              return (
                <div key={i}>
                  <OfferingCard offering={offering} gpId={id} />
                </div>
              );
            })}
          </div>
        </div>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default GpProfile;
