import React, { FC } from 'react';

const Loading: FC = () => {
  const loadingImage =
    process.env.NEXT_PUBLIC_CLIENT === 'reizen'
      ? '/assets/images/branding/reizen/reizen_logo_small.png'
      : '/assets/images/branding/cooperativ/symbol_dark_blue.svg';
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row items-center">
        <div className="h-20 w-20 md:h-14 md:w-14 mb-5 md:mr-3 md:mb-0">
          <img src={loadingImage} />
        </div>
        <div>
          <div className="text-center font-bold text-cDarkBlue md:text-xl">Thinking...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
