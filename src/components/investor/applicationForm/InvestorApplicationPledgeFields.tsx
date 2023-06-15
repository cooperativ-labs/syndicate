import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React from 'react';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { Maybe, Offering } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';

type InvestorApplicationPledgeFieldsProps = {
  offering: Offering;
  values: any;
  saleAmountString: (shares: string, price: Maybe<number> | undefined) => string;
};

const InvestorApplicationPledgeFields: React.FC<InvestorApplicationPledgeFieldsProps> = ({
  offering,
  values,
  saleAmountString,
}) => {
  return (
    <div>
      <div className="text-xs font-semibold uppercase">
        <div>
          Price per share:{' '}
          <span className="font-normal ">
            {numberWithCommas(offering.details?.minUnitsPerInvestor)}{' '}
            {offering.details?.investmentCurrency && getCurrencyOption(offering.details.investmentCurrency)?.symbol}
          </span>
        </div>
        <div>
          Minimum purchase:{' '}
          <span className="font-normal ">{numberWithCommas(offering.details?.priceStart)} shares </span>
        </div>
      </div>
      <div className="md:grid grid-cols-2 gap-3">
        <div>
          <Input
            className={`${defaultFieldDiv} col-span-1`}
            labelText="Min shares you'd purchase"
            name="minPledge"
            type="number"
            placeholder="e.g. 10"
            required
          />
          <NonInput className={`${defaultFieldDiv} `}>
            <>
              {values.minPledge &&
                `${saleAmountString(values.minPledge, offering.details?.priceStart)} ${
                  offering.details?.investmentCurrency && getCurrencyOption(offering.details.investmentCurrency)?.symbol
                }`}
            </>
          </NonInput>
        </div>
        <div>
          <Input
            className={`${defaultFieldDiv} col-span-1`}
            labelText="Max shares you'd purchase"
            name="maxPledge"
            type="number"
            placeholder="e.g. 150"
            required
          />
          <NonInput className={`${defaultFieldDiv} `}>
            <>
              {values.maxPledge &&
                `${saleAmountString(values.maxPledge, offering.details?.priceStart)} ${
                  offering.details?.investmentCurrency && getCurrencyOption(offering.details.investmentCurrency)?.symbol
                }`}
            </>
          </NonInput>
        </div>
      </div>
    </div>
  );
};

export default InvestorApplicationPledgeFields;
