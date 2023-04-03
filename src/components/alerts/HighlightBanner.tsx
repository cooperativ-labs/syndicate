import React, { FC } from 'react';

const HighlightBanner: FC = () => {
  return (
    <a
      className="bg-orange-600 bg-opacity-90 flex p-2 shadow-xl"
      href="https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde"
      target="_blank"
      rel="noreferrer"
    >
      <div className="font-medium text-white text-xs md:text-sm mx-auto px-2 ">
        <div>
          Real Asset Syndicator is a work in progress and should only be used on test networks.{' '}
          {/* <span className="underline mr-1"> Click here to read more about them.</span> 🎉 */}
        </div>
      </div>
    </a>
  );
};

export default HighlightBanner;
