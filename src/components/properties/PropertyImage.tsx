import DeleteButton from '../buttons/DeleteButton';
import fireApp from 'firebaseConfig/firebaseConfig';
import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Image } from 'types';
import { REMOVE_PROPERTY_IMAGE } from '@src/utils/dGraphQueries/reProperty';
import { useMutation } from '@apollo/client';

const storage = getStorage(fireApp);

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
  const handleDelete = () => {
    const docRef = ref(storage, image.url);
    deleteObject(docRef)
      .then(() => {
        deleteImage({ variables: { currentDate: currentDate, propertyId: propertyId, imageId: image.id } });
      })
      .catch((error) => {
        alert(`from Firebase:  ${error.message}`);
      });
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
