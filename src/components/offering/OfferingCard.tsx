'use client';

import { useUserContext } from '@contexts/UserContext';
import { getOfferingSmartContractSet } from '@src/utils/actions/cryptoActions';
import { retrieveOrders } from '@src/utils/actions/orderActions';
import {
  ContractOrder,
  getLowestOrderPrice,
  getOrderArrayFromContract
} from '@src/utils/helpersOrder';
import { String0x } from '@src/web3/helpersChain';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount } from 'wagmi';

import {
  LegalEntityWithAddresses,
  OfferingFull,
  OfferingSmartContractSet,
  Organization
} from '@/types';
import { CurrencyCodeType, ShareOrder } from '@/types';

import Card from '../cards/Card';
import MoneyDisplay from '../MoneyDisplay';
import PercentageDisplay from '../PercentageDisplay';

import OfferingDetailDashboardItem from './OfferingDetailDashboardItem';

export type OfferingCardProps = {
  offering: OfferingFull;
  organization: Organization;
};

const OfferingCard: React.FC<OfferingCardProps> = ({ offering, organization }) => {
  const { address: userWalletAddress } = useAccount();
  const { userId } = useUserContext();
  const router = useRouter();

  const {
    name,
    short_description,
    id,
    image,
    projected_irr,
    projected_irr_max,
    preferred_return,
    projected_appreciation,
    investment_currency
  } = offering;

  const { operating_currency } = offering.legalEntity;

  const [smartContracts, setSmartContracts] = useState<OfferingSmartContractSet | null>(null);
  const [contractSaleList, setContractSaleList] = useState<ContractOrder[]>([]);
  const [orders, setOrders] = useState<ShareOrder[]>([]);

  const organizationId = offering.legalEntity?.organization_id;

  const organizationImg = organization.logo as string;
  const swapContract = smartContracts?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;

  const { paymentTokenDecimals } = useSwapContractInfo(swapContractAddress);

  useAsync(async () => {
    const orders = await retrieveOrders(swapContractAddress);
    const smartContracts = await getOfferingSmartContractSet(offering.id.toString());
    setSmartContracts(smartContracts);
    if (orders && smartContracts) {
      setOrders(orders);
    }
    const contractSaleList =
      orders &&
      paymentTokenDecimals &&
      (await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals));
    contractSaleList && setContractSaleList(contractSaleList);
  }, [orders, swapContractAddress, paymentTokenDecimals, getOrderArrayFromContract]);

  const currentPrice = getLowestOrderPrice(contractSaleList, offering?.price_start);

  const toProfile = !userWalletAddress;
  const pushLink = userId
    ? `/${organizationId}/offerings/${id}`
    : toProfile
      ? `/${organizationId}/${id}`
      : `/${organizationId}/portal/${id}`;
  return (
    <div
      onClick={() => {
        window.sessionStorage.setItem('CHOSEN_OFFERING', id.toString());
        router.push(pushLink);
      }}
    >
      <Card className="md:mr-5 md:w-96 rounded-lg drop-shadow-md hover:drop-shadow-lg bg-white text-gray-700 overflow-hidden relative hover:cursor-pointer">
        <img src={image as string} className="object-cover w-full h-24 absolute" />
        <div className="backdrop-opacity-10 backdrop-invert h-24 bg-gray-800/30" />
        <div className="flex justify-between absolute left-4 top-5 right-4 items-center">
          <h2 className="text-xl font-bold text-white ">{name}</h2>
          <img
            src={organizationImg as string}
            referrerPolicy="no-referrer"
            className="w-16 h-16 border-2 border-white rounded-full"
          />
        </div>
        <div className="p-4">
          {short_description && (
            <>
              <hr className="my-3 bg-slate-400" />
              <div className=" text-gray-800 mb-4">{short_description}</div>
              <hr className="my-3 bg-slate-400" />
            </>
          )}
          <div className="grid grid-cols-3">
            {currentPrice ? (
              <OfferingDetailDashboardItem title="Price">
                <MoneyDisplay
                  className="text-center"
                  amount={currentPrice}
                  currency={operating_currency as CurrencyCodeType}
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
