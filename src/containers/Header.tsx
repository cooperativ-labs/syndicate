'use client';

import useWindowSize from '@hooks/useWindowSize';
import { cn } from '@src/lib/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { useAsync } from 'react-use';

import { Image, Offering, OfferingFull, RealEstatePropertyWithAddress } from '@/types';

import { getBaseUrl } from '../utils/helpersURL';

import Container from './Layouts/Container';

type HeaderProps = {
  offering: OfferingFull;
  small?: boolean;
  offeringPropertyImages: Image[] | undefined;
};

const Header: React.FunctionComponent<HeaderProps> = ({
  offering,
  small,
  offeringPropertyImages
}) => {
  const windowSize = useWindowSize();
  const { id, name, offering_entity_id, legalEntity, banner_image } = offering;

  const shareURL = `${getBaseUrl()}/${id}`;

  const desktopHeight = small ? 'h-64' : 'h-96';
  const mobileHeight = small ? 'h-24' : 'h-32';
  const imageBannerHeight =
    windowSize.width && windowSize.width < 768 ? mobileHeight : desktopHeight;

  return (
    <header data-test="molecule-header" className={cn('w-full relative overflow-hidden')}>
      <Container fullWidth className="bg-slate-500 object-cover w-full absolute ">
        {banner_image ? (
          <div className={cn(imageBannerHeight, 'flex overflow-hidden w-full')}>
            <img className={'object-cover object-center w-full'} src={banner_image} />
          </div>
        ) : offeringPropertyImages && offeringPropertyImages.length > 0 ? (
          <div
            className={cn(
              'grid w-full',
              `grid-cols-${offeringPropertyImages.slice(-4).length}`,
              imageBannerHeight
            )}
          >
            {offeringPropertyImages.slice(-4).map((image, i) => {
              return (
                <div key={i} className={cn(imageBannerHeight, 'flex overflow-hidden col-span-1')}>
                  {image && (
                    <img className={'object-cover object-center w-full'} src={image.url ?? ''} />
                  )}
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
