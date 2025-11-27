import { useOffering } from '@contexts/OfferingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardCard from '@src/components/cards/DashboardCard';
import { OfferingActionsContainerProps } from '@src/components/investor/tradingForms/offering-actions-types';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { updateInvestmentCurrency } from '@src/utils/actions/offeringProfileActions';
import { cryptoOptionsByChainId } from '@src/utils/enumConverters';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useConnection } from 'wagmi';
import { z } from 'zod';

import { CurrencyCode } from '@/types';

import OfferingActions from './OfferingActions';

type InvestmentCurrencyFormProps = {
  offeringId: number;
};

const InvestmentCurrencyForm: FC<InvestmentCurrencyFormProps> = ({ offeringId }) => {
  const { organizationId } = useParams<{ organizationId: string }>();

  const { chain } = useConnection();
  const currencyOptions = cryptoOptionsByChainId(chain?.id as number);
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setButtonState('loading');
    updateInvestmentCurrency({
      offeringId,
      organizationId,
      investmentCurrencyCode: data.investmentCurrencyCode
    });
    setButtonState('success');
  };

  const schema = z.object({
    investmentCurrencyCode: z.nativeEnum(CurrencyCode)
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      investmentCurrencyCode: undefined
    }
  });

  if (!organizationId) {
    return <div>Organization not found</div>;
  }

  const { control, handleSubmit } = form;

  return (
    <form>
      <FieldGroup>
        <FieldSet className='gap-2'>
          <Field>
            <FieldLabel>In which currency will distributions be paid?</FieldLabel>
            <Controller
              control={control}
              name='investmentCurrencyCode'
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select currency' />
                  </SelectTrigger>
                  <SelectContent position='item-aligned'>
                    {currencyOptions.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.symbol} ({chain?.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />{' '}
          </Field>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            variant='outline'
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Set investment currency`}
            loadingText={`Setting ...`}
            successText='Set!'
            errorText='Oops. Something went wrong'
            reset
            className='w-full'
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default function OfferingActionsContainer({
  userWalletAddress
}: OfferingActionsContainerProps) {
  const { offering } = useOffering();
  const investmentCurrency = offering.investment_currency;

  return (
    <DashboardCard>
      <div className='min-w-[200px]'>
        <div className='font-xl font-semibold'>Smart contract actions</div>
        <div className='mt-4'>
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : !investmentCurrency ? (
            <InvestmentCurrencyForm offeringId={Number(offering.id)} />
          ) : (
            <OfferingActions />
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
