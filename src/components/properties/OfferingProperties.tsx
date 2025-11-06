'use client';

import Button from '@src/components/buttons/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { LegalEntity, RealEstatePropertyWithAddresses } from '@/types';

import RealEstatePropertyCard from './RealEstatePropertyCard';

type OfferingPropertiesProps = {
  properties: RealEstatePropertyWithAddresses[] | undefined;
  offeringEntity: LegalEntity;
  isOfferingManager: boolean;
  offeringId: string;
};

const OfferingProperties: FC<OfferingPropertiesProps> = ({
  properties,
  offeringEntity,
  isOfferingManager,
  offeringId
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify center gap-5">
      {properties?.map((property: RealEstatePropertyWithAddresses, i: number) => (
        <RealEstatePropertyCard
          key={i}
          property={property}
          currency={offeringEntity.operating_currency}
          offeringEntityId={offeringEntity.id.toString()}
        />
      ))}
      {isOfferingManager && (
        <Button
          className="mt-3 md:mt-0 p-3 border-2 border-cLightBlue rounded-md md:rounded-full text-cLightBlue text-bold text-xl w-full md:h-20 md:w-20  hover:text-white hover:bg-cLightBlue self-center m-8"
          onClick={() => router.push(`./${offeringId}/add-property`)}
        >
          <Plus size={16} />
        </Button>
      )}
    </div>
  );
};

export default OfferingProperties;
