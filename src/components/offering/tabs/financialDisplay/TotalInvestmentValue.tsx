import FinancialFactItem from './FinancialFactItem';
import React, { FC } from 'react';
import { Currency, RealEstateProperty } from 'types';

type TotalInvestmentValueDataProps = {
  propertyDetails: RealEstateProperty;
  operatingCurrency: Currency;
  name?: string | null;
};

const TotalInvestmentValueData: FC<TotalInvestmentValueDataProps> = ({ propertyDetails, operatingCurrency, name }) => {
  const { assetValue, closingCosts, downPayment, lenderFees, loan } = propertyDetails;

  if (!assetValue && !closingCosts && !downPayment && !lenderFees && !loan) {
    return <></>;
  }

  return (
    <>
      <div className="flex">
        {name ? (
          <div className="font-bold text-lg pl-4 lg:pl-8 mb-8">{name}</div>
        ) : (
          <h1 className="font-bold text-xl pl-4 lg:pl-8 mb-8">Total Asset Value</h1>
        )}
      </div>
      <div>
        {assetValue && (
          <FinancialFactItem label="Underlying asset price" amount={assetValue} currency={operatingCurrency} />
        )}
        {closingCosts && <FinancialFactItem label="Closing costs" amount={closingCosts} currency={operatingCurrency} />}
        {lenderFees && <FinancialFactItem label="Lender fees" amount={lenderFees} currency={operatingCurrency} />}
        {downPayment && <FinancialFactItem label="Down payment" amount={downPayment} currency={operatingCurrency} />}
        {loan && (
          <FinancialFactItem
            label="Amount borrowed"
            amount={loan}
            percent={assetValue ? loan / assetValue : 0}
            currency={operatingCurrency}
          />
        )}
      </div>
    </>
  );
};

type TotalInvestmentValueProps = { OfferingReProperties: RealEstateProperty[]; operatingCurrency: Currency };

const TotalInvestmentValue: FC<TotalInvestmentValueProps> = ({ OfferingReProperties, operatingCurrency }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl py-6 mb-8">
      <h1 className="font-bold text-xl pl-4 lg:pl-8 mb-8">Total Asset Value</h1>
      {OfferingReProperties.length > 0 && (
        <>
          {OfferingReProperties.length < 2 ? (
            <TotalInvestmentValueData operatingCurrency={operatingCurrency} propertyDetails={OfferingReProperties[0]} />
          ) : (
            <div>
              {OfferingReProperties.map((property, i) => {
                return (
                  <div key={i} className="bg-gray-100 m-4 rounded-lg py-6">
                    <TotalInvestmentValueData
                      name={property.address?.line1}
                      operatingCurrency={operatingCurrency}
                      propertyDetails={property}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TotalInvestmentValue;
