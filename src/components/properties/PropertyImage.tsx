import DeleteButton from '../buttons/DeleteButton';

import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';

import { Image } from 'types';
import { REMOVE_PROPERTY_IMAGE } from '@src/utils/dGraphQueries/reProperty';
import { useMutation } from '@apollo/client';

type PropertyImageProps = {
  image: Image;
  propertyId: string;
  isOwner?: boolean;
};

const PropertyImage: FC<PropertyImageProps> = ({ image, propertyId, isOwner }) => {
  const [deleteImage, { error: deleteError }] = useMutation(REMOVE_PROPERTY_IMAGE);

  if (deleteError) {
    alert(`from Firebase: ${deleteError}`);
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/file/${image.fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // if (error.includes('No such object')) {
        //   deleteImage({ variables: { currentDate: currentDate, propertyId: propertyId, imageId: image.id } });
        // }
        const error = await response.text();
        throw new Error(error);
      }
      deleteImage({ variables: { currentDate: currentDate, propertyId: propertyId, imageId: image.id } });
    } catch (error) {
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
      <img className="h-64" src={image.url} />
    </div>
  );
};

export default PropertyImage;
