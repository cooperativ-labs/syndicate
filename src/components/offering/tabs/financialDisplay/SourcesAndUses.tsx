import FinancialFactItem from './FinancialFactItem';
import React, { FC } from 'react';

import { CurrencyCode, OfferingDetails } from 'types';

type SourcesAndUsesDisplayProps = {
  offeringDetails: OfferingDetails;
  operatingCurrency: CurrencyCode;
};

const SourcesAndUsesDisplay: FC<SourcesAndUsesDisplayProps> = ({ offeringDetails, operatingCurrency }) => {
  const { maxRaise, minRaise, adminExpense } = offeringDetails;

  return (
    <div className="bg-white rounded-xl shadow-xl py-6 mb-8">
      <h1 className="font-bold text-xl px-4 lg:px-8 mb-8">Sources & Uses of Funds</h1>
      <div>
        <FinancialFactItem label="Gross offering proceeds (max)" amount={maxRaise} currency={operatingCurrency} />
        <FinancialFactItem label="Gross offering proceeds (min)" amount={minRaise} currency={operatingCurrency} />
        {!!adminExpense && (
          <>
            <FinancialFactItem
              label="Legal/organizational expense"
              amount={adminExpense}
              percent={parseFloat((100 * (adminExpense / maxRaise)).toFixed(1))}
              currency={operatingCurrency}
            />
            <FinancialFactItem
              label="Proceeds invested (max)"
              amount={maxRaise - adminExpense}
              currency={operatingCurrency}
            />
            <FinancialFactItem
              label="Proceeds invested (min)"
              amount={minRaise - adminExpense}
              currency={operatingCurrency}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SourcesAndUsesDisplay;
