'use client';

import { Button } from '@src/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { LegalEntity, RealEstatePropertyWithAddress } from '@/types';
import PropertyCardList from './PropertyCardList';

type OfferingPropertiesProps = {
  properties: RealEstatePropertyWithAddress[];
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
      <PropertyCardList
        properties={properties}
        operatingCurrency={offeringEntity.operating_currency}
      />
      {isOfferingManager && (
        <Button
          variant="outline"
          className="mt-3 md:mt-0 p-3 border-2 border-cLightBlue rounded-md md:rounded-full text-bold text-xl w-full md:h-20 md:w-20 hover:text-black self-center m-8"
          onClick={() => router.push(`./${offeringId}/add-property`)}
        >
          <Plus size={16} />
        </Button>
      )}
    </div>
  );
};

export default OfferingProperties;
