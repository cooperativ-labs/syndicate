import FinancialFactItem from './FinancialFactItem';
import React, { FC } from 'react';
import { OfferingDetails } from 'types';

type TotalReturnsProps = {
  offeringDetails: OfferingDetails;
};

const TotalReturns: FC<TotalReturnsProps> = ({ offeringDetails }) => {
  const {
    projectedIrr,
    projectedIrrMax,
    preferredReturn,
    targetEquityMultiple,
    targetEquityMultipleMax,
    cocReturn,
    projectedAppreciation,
    capRate,
  } = offeringDetails;

  return (
    <div className="bg-white rounded-xl shadow-xl py-6 mb-8">
      <h1 className="font-bold text-xl px-4 lg:px-8 mb-8">Total Returns</h1>
      <div>
        {projectedIrr ? (
          <FinancialFactItem
            label="Projected IRR"
            percent={projectedIrr / 100}
            secondPercent={projectedIrrMax ? projectedIrrMax / 100 : undefined}
          />
        ) : (
          <></>
        )}
        {preferredReturn ? <FinancialFactItem label="Preferred Return" percent={preferredReturn / 100} /> : <></>}
        {targetEquityMultiple ? (
          <FinancialFactItem
            label="Target Equity Multiple"
            multiple={targetEquityMultiple / 100}
            secondMultiple={targetEquityMultipleMax ? targetEquityMultipleMax / 100 : undefined}
          />
        ) : (
          <></>
        )}
        {cocReturn ? <FinancialFactItem label="CoC return" percent={cocReturn / 100} /> : <></>}
        {capRate ? <FinancialFactItem label="Cap rate" percent={capRate / 100} /> : <></>}
        {projectedAppreciation ? (
          <FinancialFactItem label="Projected appreciation" percent={projectedAppreciation / 100} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TotalReturns;
