import MoneyDisplay from './../MoneyDisplay';
import OfferingDetailDashboardItem from './OfferingDetailDashboardItem';
import PercentageDisplay from '../PercentageDisplay';
import React, { FC } from 'react';
import { OfferingDetails, OfferingSale } from 'types';

export type ContractViewDetails = {
  sharesOutstanding: number;
  fundsDistributed: number;
  myShares: number;
  bacId: string;
};

export type OfferingDetailsDisplayProps = {
  offeringDetails: OfferingDetails;
  currentSalePrice: number;
  isOfferingOwner: boolean;
  contractViewDetails: ContractViewDetails;
  className?: string;
};

const OfferingDetailsDisplay: FC<OfferingDetailsDisplayProps> = ({
  offeringDetails,
  currentSalePrice,
  isOfferingOwner,
  contractViewDetails,
  className,
}) => {
  const { sharesOutstanding, fundsDistributed, myShares, bacId } = contractViewDetails;
  const {
    numUnits,
    projectedIrr,
    projectedIrrMax,
    preferredReturn,
    projectedAppreciation,
    cocReturn,
    capRate,
    targetEquityMultiple,
    targetEquityMultipleMax,
    investmentCurrency,
  } = offeringDetails;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <OfferingDetailDashboardItem title="Deal size">
          <MoneyDisplay amount={currentSalePrice * numUnits} bacId={bacId} currency={investmentCurrency} />
        </OfferingDetailDashboardItem>

        {/* <div className="flex justify-center">
        <div className="bg-gray-300 h-16 w-1" />
      </div> */}

        <OfferingDetailDashboardItem title="Share price">
          <MoneyDisplay amount={currentSalePrice} bacId={bacId} currency={investmentCurrency} />
        </OfferingDetailDashboardItem>

        {isOfferingOwner ? (
          <OfferingDetailDashboardItem title="Shares allocated">
            <MoneyDisplay amount={sharesOutstanding} />
          </OfferingDetailDashboardItem>
        ) : (
          <OfferingDetailDashboardItem title="My shares">
            <MoneyDisplay amount={myShares} />
          </OfferingDetailDashboardItem>
        )}

        {isOfferingOwner ? (
          <OfferingDetailDashboardItem title="Funds Distributed">
            <MoneyDisplay amount={fundsDistributed} bacId={bacId} currency={investmentCurrency} />
          </OfferingDetailDashboardItem>
        ) : (
          <OfferingDetailDashboardItem title="Share value">
            <MoneyDisplay amount={myShares * currentSalePrice} bacId={bacId} currency={investmentCurrency} />
          </OfferingDetailDashboardItem>
        )}
      </div>
      {(projectedAppreciation || projectedIrr || preferredReturn || targetEquityMultiple || cocReturn || capRate) && (
        <div className=" mt-10" />
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
        {projectedAppreciation ? (
          <OfferingDetailDashboardItem title="Projected Appreciation">
            <PercentageDisplay className="text-gray-900" percent={projectedAppreciation} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {projectedIrr ? (
          <OfferingDetailDashboardItem title="Projected IRR">
            <div>
              <PercentageDisplay className=" text-gray-900" percent={projectedIrr} secondPercent={projectedIrrMax} />
            </div>
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {preferredReturn ? (
          <OfferingDetailDashboardItem title="Preferred Return" note="(Cumulative, Non-Compounding)">
            <PercentageDisplay className="text-gray-900" percent={preferredReturn} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {targetEquityMultiple ? (
          <OfferingDetailDashboardItem title="Target Equity Multiple">
            <PercentageDisplay
              className="text-gray-900"
              multiple={targetEquityMultiple}
              secondMultiple={targetEquityMultipleMax}
            />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
        {cocReturn ? (
          <OfferingDetailDashboardItem title="CoC Return">
            <PercentageDisplay className="text-gray-900" percent={cocReturn} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
        {capRate ? (
          <OfferingDetailDashboardItem title="Cap Rate">
            <PercentageDisplay className="text-gray-900" percent={capRate} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OfferingDetailsDisplay;
