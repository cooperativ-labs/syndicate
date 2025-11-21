import React, { FC } from 'react';

import { CurrencyCodeType, RealEstatePropertyWithAddress } from '@/types';

import FinancialFactItem from './FinancialFactItem';

type TotalInvestmentValueDataProps = {
  propertyDetails: RealEstatePropertyWithAddress;
  operatingCurrency: CurrencyCodeType;
  name?: string | null;
};

const TotalInvestmentValueData: FC<TotalInvestmentValueDataProps> = ({
  propertyDetails,
  operatingCurrency,
  name
}) => {
  const { asset_value, closing_costs, down_payment, lender_fees, loan } = propertyDetails;

  if (!asset_value && !closing_costs && !down_payment && !lender_fees && !loan) {
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
        {asset_value && (
          <FinancialFactItem
            label="Underlying asset price"
            amount={asset_value}
            currency={operatingCurrency}
          />
        )}
        {closing_costs && (
          <FinancialFactItem
            label="Closing costs"
            amount={closing_costs}
            currency={operatingCurrency}
          />
        )}
        {lender_fees && (
          <FinancialFactItem
            label="Lender fees"
            amount={lender_fees}
            currency={operatingCurrency}
          />
        )}
        {down_payment && (
          <FinancialFactItem
            label="Down payment"
            amount={down_payment}
            currency={operatingCurrency}
          />
        )}
        {loan && (
          <FinancialFactItem
            label="Amount borrowed"
            amount={loan}
            percent={asset_value ? loan / asset_value : 0}
            currency={operatingCurrency}
          />
        )}
      </div>
    </>
  );
};

type TotalInvestmentValueProps = {
  OfferingReProperties: RealEstatePropertyWithAddress[];
  operatingCurrency: CurrencyCodeType;
};

const TotalInvestmentValue: FC<TotalInvestmentValueProps> = ({
  OfferingReProperties,
  operatingCurrency
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl py-6 mb-8">
      <h1 className="font-bold text-xl pl-4 lg:pl-8 mb-8">Total Asset Value</h1>
      {OfferingReProperties.length > 0 && (
        <>
          {OfferingReProperties.length < 2 ? (
            <TotalInvestmentValueData
              operatingCurrency={operatingCurrency}
              propertyDetails={OfferingReProperties[0]}
            />
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
