import cn from 'classnames';
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { LinkedAccountType } from 'types';

type SocialLinkItemProps = {
  type: LinkedAccountType | null | undefined;
  url: string | null | undefined;
  className?: string;
};

const SocialLinkItem: FC<SocialLinkItemProps> = ({ type, url, className }) => {
  const iconType =
    type === LinkedAccountType.Phone || type === LinkedAccountType.Email || type === LinkedAccountType.Website
      ? 'fas'
      : 'fab';
  if (url) {
    return (
      <a href={url}>
        <div
          className={cn(
            className ? className : 'flex max-w-min py-1 pl-2 pr-2 m-1s text-xl text-gray-700 items-center rounded-full'
          )}
        >
          <FontAwesomeIcon
            icon={[iconType, getSocialAccountOption(type)?.icon as IconName]}
            // className="text-lg text-gray-100 mr-2"
          />
        </div>
      </a>
    );
  }
  return <></>;
};

export default SocialLinkItem;
