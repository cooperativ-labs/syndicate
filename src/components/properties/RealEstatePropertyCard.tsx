import AddressDisplay from '@src/components/address/AddressDisplay';
import cn from 'classnames';
import MapPanel from '../MapPanel';
import React, { FC } from 'react';
import router from 'next/router';
import { Address, Currency, CurrencyCode, Maybe, RealEstateProperty } from 'types';

type RealEstatePropertyCardProps = {
  property: RealEstateProperty;
  currency: Maybe<Currency> | undefined;
  offeringEntityId: string;
  fullWidth?: boolean;
};
export const RealEstatePropertyCard: FC<RealEstatePropertyCardProps> = ({
  property,
  currency,
  offeringEntityId,
  fullWidth,
}) => {
  const { id, downPayment, lenderFees, closingCosts, address, description, images } = property;

  return (
    <div
      className={cn(
        fullWidth ? 'w-full ' : 'md:w-96',
        'rounded-lg drop-shadow-md hover:drop-shadow-lg bg-white text-gray-700 overflow-hidden relative hover:cursor-pointer'
      )}
      onClick={() => router.push(`/entities/${offeringEntityId}/properties/${id}`)}
    >
      <img src={images ? images[0]?.url : undefined} className="object-cover w-full h-24 absolute" />
      <div className="backdrop-opacity-10 backdrop-invert h-24 bg-gray-800/30" />
      <h2 className="text-xl font-bold text-white absolute left-4 top-10">
        {address?.line1 ? `${address.line1}` : `${address?.city}, ${address?.stateProvince}`}
      </h2>

      <div className="p-4 flex flex-col ">
        <AddressDisplay address={address as Address} />
        <hr className="my-3 bg-slate-400" />

        {/* <div>{description}</div> */}
        <div>
          <MapPanel height="180px" width="100%" address={address} />
        </div>
        {/* <div className="absolute bottom-5 left-4 right-4">
          <div className="grid grid-cols-3">
            <OfferingDetailDashboardItem title="Down payment">
              <MoneyDisplay amount={downPayment} currency={currency} />
            </OfferingDetailDashboardItem>
            <OfferingDetailDashboardItem title="Lender's fees">
              <MoneyDisplay amount={lenderFees} currency={currency} />
            </OfferingDetailDashboardItem>
            <OfferingDetailDashboardItem title="Closing costs">
              <MoneyDisplay amount={closingCosts} currency={currency} />
            </OfferingDetailDashboardItem>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default RealEstatePropertyCard;
