import React, { FC } from 'react';

type AlertBannerProps = {
  text: string;
  show: boolean;
  color: string;
};

const AlertBanner: FC<AlertBannerProps> = ({ text, show, color }) => {
  if (!show) {
    return <></>;
  }
  return (
    <div className={`bg-${color} "bg-opacity-90 flex p-2 shadow-xl"`}>
      <div className="font-medium text-white text-xs md:text-sm mx-auto px-2 ">
        <div>{text}</div>
      </div>
    </div>
  );
};

export default AlertBanner;
