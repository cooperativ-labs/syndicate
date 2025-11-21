import { cn } from '@src/lib/utils';
import { getAssetStatusOption } from '@src/utils/enumConverters';
import useBrandColor from '@hooks/useBrandColor';
import React from 'react';
import { OfferingStageTypes, AssetStatusTypes } from '@/types';
type ProgressProps = {
  offeringStage?: OfferingStageTypes;
  propertyInvestmentStage?: AssetStatusTypes | undefined | null;
  brandColor: string;
  lightBrand: boolean;
  className?: string;
};

const Progress: React.FunctionComponent<ProgressProps> = ({
  offeringStage,
  propertyInvestmentStage,
  className,
  brandColor,
  lightBrand
}) => {
  const stage = offeringStage ?? propertyInvestmentStage;
  return (
    <div data-test="atom-progress" className={cn(className, 'items-center grow')}>
      <div className="flex text-sm md:text-base flex-col mr-2 grow" style={{ minWidth: '100px' }}>
        <span className="font-bold">Stage: {getAssetStatusOption(stage)?.name}</span>
        <div className="w-full h-2 bg-gray-200 mt-2 rounded">
          <div
            style={{
              background: useBrandColor(brandColor, lightBrand),
              width: getAssetStatusOption(stage)?.width
            }}
            className={'h-2 rounded'}
          />
        </div>
      </div>
      🎉
    </div>
  );
};

export default Progress;
