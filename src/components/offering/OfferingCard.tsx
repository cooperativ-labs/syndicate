import Card from '../cards/Card';
import MoneyDisplay from '../MoneyDisplay';
import OfferingDetailDashboardItem from './OfferingDetailDashboardItem';
import PercentageDisplay from '../PercentageDisplay';
import React from 'react';
import { Currency, Offering } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getLowestSalePrice, numberWithCommas } from '@src/utils/helpersMoney';
import { useRouter } from 'next/router';

export type OfferingCardProps = {
  offering: Offering;
};

const OfferingCard: React.FC<OfferingCardProps> = ({ offering }) => {
  const router = useRouter();
  const { name, shortDescription, id, details, image, offeringEntity } = offering;
  const currentPrice = details && getLowestSalePrice(offering.sales, offering.details?.priceStart);
  const organizationId = offeringEntity?.organization.id;

  const publicFacing = router.pathname.includes('/offerors');
  const pushLink = publicFacing ? `/offerors/${organizationId}/${id}` : `/${organizationId}/offerings/${id}`;
  return (
    <div
      onClick={() => {
        window.sessionStorage.setItem('CHOSEN_OFFERING', id);
        router.push(pushLink);
      }}
    >
      <Card className="md:mr-5 md:w-96 rounded-lg drop-shadow-md hover:drop-shadow-lg bg-white text-gray-700 overflow-hidden relative hover:cursor-pointer">
        <img src={image} className="object-cover w-full h-24 absolute" />
        <div className="backdrop-opacity-10 backdrop-invert h-24 bg-gray-800/30" />
        <div className="flex justify-between absolute left-4 top-5 right-4 items-center">
          <h2 className="text-xl font-bold text-white ">{name}</h2>
          <img src={image} referrerPolicy="no-referrer" className="w-16 h-16 border-2 border-white rounded-full" />
        </div>
        <div className="p-4">
          {shortDescription && (
            <>
              <hr className="my-3 bg-slate-400" />
              <div className=" text-gray-800 mb-4">{shortDescription}</div>
              <hr className="my-3 bg-slate-400" />
            </>
          )}
          <div className="grid grid-cols-3">
            {currentPrice ? (
              <OfferingDetailDashboardItem title="Price">
                <MoneyDisplay className="text-center" amount={currentPrice} currency={details?.investmentCurrency} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {details?.projectedAppreciation ? (
              <OfferingDetailDashboardItem title="Projected Appreciation">
                <PercentageDisplay percent={details?.projectedAppreciation} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {details?.projectedIrr ? (
              <OfferingDetailDashboardItem title="Projected IRR">
                <PercentageDisplay percent={details?.projectedIrr} secondPercent={details?.projectedIrrMax} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {details?.preferredReturn ? (
              <OfferingDetailDashboardItem title="Preferred Return">
                <PercentageDisplay percent={details?.preferredReturn} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
          </div>
          {/* <hr className="my-3 bg-slate-400" /> */}
        </div>
      </Card>
    </div>
  );
};

export default OfferingCard;
