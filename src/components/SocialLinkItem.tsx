import { LinkedAccountType } from '@gql/graphql';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import cn from 'classnames';
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Newspaper,
  Phone as PhoneIcon,
  Send,
  Twitter,
  Youtube
} from 'lucide-react';
import React, { FC } from 'react';

type SocialLinkItemProps = {
  type: LinkedAccountType | null | undefined;
  url: string | null | undefined;
  className?: string;
};

const SocialLinkItem: FC<SocialLinkItemProps> = ({ type, url, className }) => {
  const Icon = (() => {
    const iconName = getSocialAccountOption(type)?.icon;
    switch (iconName) {
      case 'linkedin':
        return Linkedin;
      case 'github':
        return Github;
      case 'dribbble':
        return Dribbble;

      case 'youtube':
        return Youtube;
      case 'soundcloud':
        return Newspaper; // closest generic brand placeholder
      case 'twitter':
        return Twitter;
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'medium':
        return Newspaper;
      case 'telegram':
        return Send;
      case 'envelope':
        return Mail;
      case 'phone':
        return PhoneIcon;
      case 'link':
        return LinkIcon;
      default:
        return LinkIcon;
    }
  })();
  if (url) {
    return (
      <a href={url}>
        <div
          className={cn(
            className
              ? className
              : 'flex max-w-min py-1 pl-2 pr-2 m-1s text-xl text-gray-700 items-center rounded-full'
          )}
        >
          <Icon />
        </div>
      </a>
    );
  }
  return <></>;
};

export default SocialLinkItem;
