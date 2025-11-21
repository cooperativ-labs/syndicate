'use client';

import { FieldDescription } from '@src/components/ui/field';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { Offering } from '@/types';

import { TextField } from './FormControls';
import type { InvestorFormInputsType } from './InvestorApplicationForm';

type InvestorApplicationPledgeFieldsProps = {
  offering: Offering;
  saleAmountString: (shares: string, price: number | undefined) => string;
};

const InvestorApplicationPledgeFields: React.FC<InvestorApplicationPledgeFieldsProps> = ({
  offering,
  saleAmountString
}) => {
  const { investment_currency, price_start, min_units_per_investor } = offering;
  const form = useFormContext<InvestorFormInputsType>();
  const minPledge = useWatch({ control: form.control, name: 'minPledge' });
  const maxPledge = useWatch({ control: form.control, name: 'maxPledge' });

  const currencySymbol = investment_currency && getCurrencyOption(investment_currency)?.symbol;

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold uppercase space-y-1">
        <div>
          Price per share:{' '}
          <span className="font-normal">
            {numberWithCommas(min_units_per_investor)} {currencySymbol}
          </span>
        </div>
        <div>
          Minimum purchase:{' '}
          <span className="font-normal">{numberWithCommas(price_start)} shares</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <TextField
            name="minPledge"
            label="Min shares you'd purchase"
            placeholder="e.g. 10"
            type="number"
            required
            inputProps={{ min: 0 }}
          />
          {minPledge && price_start && (
            <FieldDescription className="mt-1">
              {saleAmountString(minPledge.toString(), price_start)} {currencySymbol}
            </FieldDescription>
          )}
        </div>
        <div>
          <TextField
            name="maxPledge"
            label="Max shares you'd purchase"
            placeholder="e.g. 150"
            type="number"
            required
            inputProps={{ min: 0 }}
          />
          {maxPledge && price_start && (
            <FieldDescription className="mt-1">
              {saleAmountString(maxPledge.toString(), price_start)} {currencySymbol}
            </FieldDescription>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorApplicationPledgeFields;
