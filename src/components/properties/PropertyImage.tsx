import { removePropertyImage } from '@src/utils/actions/rePropertyActions';
import React, { FC } from 'react';

import { Image } from '@/types';

import DeleteButton from '../buttons/DeleteButton';

type PropertyImageProps = {
  image: Image;
  propertyId: string;
  isOwner?: boolean;
};

const PropertyImage: FC<PropertyImageProps> = ({ image, propertyId, isOwner }) => {
  if (!image.url) {
    return null;
  }
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
    <div className='m-2 relative'>
      {isOwner && (
        <div className='absolute -right-1 -top-1'>
          <DeleteButton onDelete={handleDelete} iconColor={'gray-800'} bgColor={'white'} />
        </div>
      )}
      <img className='h-64' src={image.url} alt={image.label} />
    </div>
  );
};

export default PropertyImage;
