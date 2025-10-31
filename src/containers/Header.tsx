'use client';

import { Offering } from '@gql/graphql';
import useWindowSize from '@hooks/useWindowSize';
import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { getBaseUrl } from '../utils/helpersURL';

import Container from './Layouts/Container';

type HeaderProps = {
  offering: Offering;
  small?: boolean;
};

const Header: React.FunctionComponent<HeaderProps> = ({ offering, small }) => {
  const windowSize = useWindowSize();
  const { id, name, bannerImage, brandColor, lightBrand } = offering;

  const shareURL = `${getBaseUrl()}/${id}`;

  const offeringImages = offering.offeringEntity?.realEstateProperties
    ?.map(property => property?.images)
    .flat();

  const desktopHeight = small ? 'h-64' : 'h-96';
  const mobileHeight = small ? 'h-24' : 'h-32';
  const imageBannerHeight =
    windowSize.width && windowSize.width < 768 ? mobileHeight : desktopHeight;

  return (
    <header data-test="molecule-header" className={cn('w-full relative overflow-hidden')}>
      <Container fullWidth className="bg-slate-500 object-cover w-full absolute ">
        {bannerImage ? (
          <div className={cn(imageBannerHeight, 'flex overflow-hidden w-full')}>
            <img className={'object-cover object-center w-full'} src={bannerImage} />
          </div>
        ) : offeringImages && offeringImages.length > 0 ? (
          <div
            className={cn(
              'grid w-full',
              `grid-cols-${offeringImages.slice(-4).length}`,
              imageBannerHeight
            )}
          >
            {offeringImages.slice(-4).map((image, i) => {
              return (
                <div key={i} className={cn(imageBannerHeight, 'flex overflow-hidden col-span-1')}>
                  {image && <img className={'object-cover object-center w-full'} src={image.url} />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-32 " />
        )}
      </Container>
      <div
        className={cn(
          imageBannerHeight,
          'flex backdrop-opacity-10 backdrop-invert w-full bg-gray-800/30 items-center'
        )}
      />
    </header>
  );
};

export default Header;

{
  /* <div className="absolute top-4 right-2 md:static opacity-20 md:opacity-60  md:flex grow justify-end shrink-0 z-0">
<RoundedImage
  src={logo ? logo : '/assets/images/logos/company-placeholder.jpeg'}
  className={cn([!primaryHeader && windowSize.width < 768 ? 'hidden' : 'max-w-xxs'])}
/>
</div> */
}
