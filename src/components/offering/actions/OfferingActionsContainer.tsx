import { zodResolver } from '@hookform/resolvers/zod';
import DashboardCard from '@src/components/cards/DashboardCard';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import { Select } from '@src/components/ui/select';
import { SelectTrigger } from '@src/components/ui/select';
import { SelectValue } from '@src/components/ui/select';
import { SelectContent } from '@src/components/ui/select';
import { SelectItem } from '@src/components/ui/select';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { updateInvestmentCurrency } from '@src/utils/actions/offeringActions';
import { cryptoOptionsByChainId } from '@src/utils/enumConverters';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

import { CurrencyCode } from '@/types';

import { OfferingActionsProps } from './OfferingActions';
import OfferingActions from './OfferingActions';

type InvestmentCurrencyFormProps = {
  offeringId: number;
};

const InvestmentCurrencyForm: FC<InvestmentCurrencyFormProps> = ({ offeringId }) => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const { chain } = useAccount();

  const currencyOptions = cryptoOptionsByChainId(chain?.id as number);
  if (!organizationId) {
    return <div>Organization not found</div>;
  }
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const onSubmit = async (data: z.infer<typeof schema>) => {
    updateInvestmentCurrency({
      offeringId,
      organizationId,
      investmentCurrencyCode: data.investmentCurrencyCode
    });
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

  const { control, handleSubmit, formState, watch } = form;

  return (
    <form>
      <FieldGroup>
        <FieldSet className="gap-2">
          <Field>
            <FieldLabel>In which currency will distributions be paid?</FieldLabel>
            <Controller
              control={control}
              name="investmentCurrencyCode"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
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
            variant="outline"
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Set investment currency`}
            loadingText={`Setting ...`}
            successText="Set!"
            errorText="Oops. Something went wrong"
            reset
            className="w-full"
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

type OfferingActionsContainerProps = OfferingActionsProps & {
  userWalletAddress: string | undefined;
  investment_currency: string | undefined | null;
};

export default function OfferingActionsContainer({
  userWalletAddress,
  investment_currency,
  hasContract,
  loading,
  isOfferingManager,
  orders,
  offering,
  contractSet,
  issueReachingContract,
  paymentTokenAddress,
  paymentTokenDecimals,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  sharesOutstanding,
  isContractOwner,
  noLiveOrders,
  partitions,
  refetchMainContracts,
  refetchOfferingInfo,
  currentSalePrice,
  myShareQty,
  transferEvents,
  documents
}: OfferingActionsContainerProps) {
  return (
    <DashboardCard>
      <div className="">
        <div className="font-xl font-semibold">Smart contract actions</div>
        <div className="mt-4">
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : !investment_currency ? (
            <InvestmentCurrencyForm offeringId={Number(offering.id)} />
          ) : (
            <OfferingActions
              retrievalIssue={false}
              hasContract={hasContract}
              loading={loading}
              isOfferingManager={isOfferingManager}
              orders={orders}
              offering={offering}
              contractSet={contractSet}
              issueReachingContract={issueReachingContract}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              swapApprovalsEnabled={swapApprovalsEnabled}
              txnApprovalsEnabled={txnApprovalsEnabled}
              sharesOutstanding={sharesOutstanding}
              isContractOwner={isContractOwner}
              noLiveOrders={noLiveOrders}
              partitions={partitions}
              refetchMainContracts={refetchMainContracts}
              refetchOfferingInfo={refetchOfferingInfo}
              currentSalePrice={currentSalePrice}
              myShareQty={myShareQty}
              transferEvents={transferEvents}
              documents={documents}
            />
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
