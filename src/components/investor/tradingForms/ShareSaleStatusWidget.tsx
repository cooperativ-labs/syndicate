import cn from 'classnames';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import SaleManagerPanel from './ShareManagerPanel';
import { getSale, SaleContentsType } from '@src/web3/reachCalls';
import { getSaleStatusOption } from '@src/utils/enumConverters';
import { OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';

type ShareSaleStatusWidgetProps = {
  sales: OfferingSale[];
  offeringId: string;
  contractId: string;
  isContractOwner: boolean;
};

const ShareSaleStatusWidget: FC<ShareSaleStatusWidgetProps> = ({ sales, offeringId, contractId, isContractOwner }) => {
  const { reachLib, reachAcc, userWalletAddress } = useContext(ReachContext);

  const mySale = sales?.find((sale) => sale.initiator === userWalletAddress);
  const [saleContents, setSaleContents] = useState<SaleContentsType>({
    qty: 0,
    qtySold: 0,
    price: 0,
    proceeds: 0,
    saleDetails: undefined,
    status: undefined,
    btId: undefined,
  });

  const retrieveSale = useCallback(() => {
    getSale(reachLib, reachAcc, contractId, userWalletAddress, setSaleContents);
  }, [reachLib, reachAcc, contractId, userWalletAddress, setSaleContents]);

  useEffect(() => {
    if (mySale) {
      retrieveSale();
    }
  }, [retrieveSale, mySale]);

  return (
    <>
      {saleContents?.status && (
        <div className="px-3 pb-3 pt-2 mt-4 rounded-lg bg-slate-200">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold"> Your offer </div>
            <div
              className={cn(
                'text-xs font-semibold rounded-md max-w-min px-1 h-5 border-2 min-w-max',
                `text-${getSaleStatusOption(saleContents.status).color}`,
                // 'text-white font-semibold',
                `border-${getSaleStatusOption(saleContents.status)?.color}`
              )}
            >
              {getSaleStatusOption(saleContents.status).name}
            </div>
          </div>

          <div>Remaining: {saleContents.qty} shares</div>
          <div className="flex flex-col gap-2 mt-4">
            <SaleManagerPanel
              isOfferor={true}
              offeringId={offeringId}
              status={saleContents.status}
              proceeds={saleContents.proceeds}
              btId={saleContents.btId}
              sale={mySale}
              contractId={contractId}
              isContractOwner={isContractOwner}
              recallGetSale={retrieveSale}
              small
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSaleStatusWidget;
