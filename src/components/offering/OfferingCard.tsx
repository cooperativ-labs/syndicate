'use client';

import { useUserContext } from '@contexts/UserContext';
import { getCurrentOrdersAndPrice } from '@src/utils/actions/offeringActions';
import { getCurrencyByCode } from '@src/utils/enumConverters';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useAsync } from 'react-use';
import { useAccount } from 'wagmi';

import { CurrencyCodeType, Offering } from '@/types';

import Card from '../cards/Card';
import MoneyDisplay from '../MoneyDisplay';
import PercentageDisplay from '../PercentageDisplay';
import { OfferingWithParticipants } from '@/types';
import OfferingDetailDashboardItem from './OfferingDetailDashboardItem';
import { getPublicUrl } from '@src/utils/actions/storageActions';

// In-memory cache for public URLs
const publicUrlCache = new Map<string, { data: string | null; error: Error | null }>();
const getCachedPublicUrl = async (
  bucket: string,
  path: string | null,
  source: string
): Promise<{ data: string | null; error: Error | null }> => {
  if (!path) {
    return { data: null, error: new Error('Path is required') };
  }

  const cacheKey = `${bucket}:${path}`;
  if (publicUrlCache.has(cacheKey)) {
    return publicUrlCache.get(cacheKey)!;
  }

  const result = await getPublicUrl({ bucket, path, source });
  publicUrlCache.set(cacheKey, result);
  return result;
};

export type OfferingCardProps = {
  organizationId: string | number;
  operatingCurrency: string | null;
  offering: Offering;
};

const OfferingCard: React.FC<OfferingCardProps> = ({
  offering,
  operatingCurrency,
  organizationId
}) => {
  const { address: userWalletAddress } = useAccount();
  const { userId } = useUserContext();
  const router = useRouter();

  const cacheKey = useMemo(
    () => (offering.image ? `offering-assets:${offering.image}` : null),
    [offering.image]
  );

  const { value: offeringImage } = useAsync(async () => {
    if (!offering.image) {
      return { data: null, error: new Error('Path is required') };
    }
    return getCachedPublicUrl('offering-assets', offering.image, 'OfferingCard');
  }, [cacheKey]);

  const imageUrl = offeringImage?.data as string | null;

  const {
    name,
    id,
    projected_irr,
    projected_irr_max,
    preferred_return,
    projected_appreciation,
    investment_currency
  } = offering;

  const paymentTokenDecimals =
    investment_currency && getCurrencyByCode(investment_currency)?.decimals;

  const { value: currentPrice } = useAsync(async () => {
    if (!paymentTokenDecimals) {
      return 0;
    }
    const { currentPrice } = await getCurrentOrdersAndPrice({
      offeringId: offering.id.toString(),
      paymentTokenDecimals: paymentTokenDecimals ?? 0,
      priceStart: offering.price_start ?? 0
    });
    return currentPrice;
  }, [offering.id]);

  const toProfile = !userWalletAddress;
  const pushLink = userId
    ? `/manager/${organizationId}/offerings/${id}`
    : toProfile
      ? `/${organizationId}/${id}`
      : `/portal/${organizationId}/${id}`;
  return (
    <div
      onClick={() => {
        router.push(pushLink);
      }}
    >
      <Card className="md:mr-5 md:w-96 rounded-lg drop-shadow-md hover:drop-shadow-lg bg-white text-gray-700 overflow-hidden relative hover:cursor-pointer">
        <img src={imageUrl ?? undefined} className="object-cover w-full h-24 absolute" />
        <div className="backdrop-opacity-10 backdrop-invert h-24 bg-gray-800/30" />
        <div className="p-4">
          <div className="text-lg font-bold">{name}</div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3">
            {currentPrice ? (
              <OfferingDetailDashboardItem title="Price">
                <MoneyDisplay
                  className="text-center"
                  amount={currentPrice}
                  currency={operatingCurrency as CurrencyCodeType}
                />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {projected_appreciation ? (
              <OfferingDetailDashboardItem title="Projected Appreciation">
                <PercentageDisplay percent={projected_appreciation} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {projected_irr ? (
              <OfferingDetailDashboardItem title="Projected IRR">
                <PercentageDisplay percent={projected_irr} secondPercent={projected_irr_max} />
              </OfferingDetailDashboardItem>
            ) : (
              <></>
            )}
            {preferred_return ? (
              <OfferingDetailDashboardItem title="Preferred Return">
                <PercentageDisplay percent={preferred_return} />
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
