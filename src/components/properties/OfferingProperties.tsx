import Button from '@src/components/buttons/Button';
import React, { FC } from 'react';
import RealEstatePropertyCard from './RealEstatePropertyCard';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LegalEntity, Maybe } from 'types';

type OfferingPropertiesProps = {
  offeringEntity: Maybe<LegalEntity> | undefined;
  isOfferingManager: boolean;
  offeringId: string;
};

const OfferingProperties: FC<OfferingPropertiesProps> = ({ offeringEntity, isOfferingManager, offeringId }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify center gap-5">
      {offeringEntity?.realEstateProperties?.map((property: any, i: number) => (
        <RealEstatePropertyCard
          key={i}
          property={property}
          currency={offeringEntity?.operatingCurrency}
          offeringEntityId={offeringEntity.id}
        />
      ))}
      {isOfferingManager && (
        <Button
          className="mt-3 md:mt-0 p-3 border-2 border-cLightBlue rounded-md md:rounded-full text-cLightBlue text-bold text-xl w-full md:h-20 md:w-20  hover:text-white hover:bg-cLightBlue self-center m-8"
          onClick={() => router.push(`./${offeringId}/add-property`)}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
      )}
    </div>
  );
};

export default OfferingProperties;
