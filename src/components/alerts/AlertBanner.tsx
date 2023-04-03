import React, { FC } from 'react';

type AlertBannerProps = {
  text: string;
};

const AlertBanner: FC<AlertBannerProps> = ({ text }) => {
  return (
    <a className="bg-orange-600 bg-opacity-90 flex p-2 shadow-xl" href="/" target="_blank" rel="noreferrer">
      <div className="font-medium text-white text-xs md:text-sm mx-auto px-2 ">
        <div>{text}</div>
      </div>
    </a>
  );
};

export default AlertBanner;
