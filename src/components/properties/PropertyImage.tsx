import React, { FC } from 'react';

import { Image } from '@/types';

import DeleteButton from '../buttons/DeleteButton';
import { removePropertyImage } from '@src/utils/actions/rePropertyActions';

type PropertyImageProps = {
  image: Image | undefined;
  propertyId: string;
  isOwner?: boolean;
};

const PropertyImage: FC<PropertyImageProps> = ({ image, propertyId, isOwner }) => {
  const handleDelete = async () => {
    if (!image?.id) {
      throw new Error('Image ID is required');
    }
    try {
      await removePropertyImage(image.id);
    } catch (error: any) {
      throw new Error('Error details:', error);
    }
  };
  return (
    <div className="m-2 relative">
      {isOwner && (
        <div className="absolute -right-1 -top-1">
          <DeleteButton onDelete={handleDelete} iconColor={'gray-800'} bgColor={'white'} />
        </div>
      )}
      <img className="h-64" src={image?.url} />
    </div>
  );
};

export default PropertyImage;
