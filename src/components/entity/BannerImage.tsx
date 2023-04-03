import React, { FC } from 'react';

type BannerImageProps = {
  imageUrl: string;
};

const BannerImage: FC<BannerImageProps> = ({ imageUrl }) => {
  return (
    <div className="h-36 md:h-64 bg-gray-500">
      <img src={imageUrl} className="h-36 md:h-64 w-full object-cover" />
    </div>
  );
};

export default BannerImage;
