import IssuanceSaleItem, { IssuanceSaleProps } from './IssuanceSaleItem';
import React, { FC } from 'react';
import { ShareIssuanceTrade } from 'types';

export type IssuanceSaleListProps = IssuanceSaleProps & { issuances: ShareIssuanceTrade[] };

const IssuanceSaleList: FC<IssuanceSaleListProps> = ({ issuances, paymentTokenDecimals }) => {
  return (
    <>
      <div className="md:grid grid-cols-12 gap-3 items-center pl-3 p-1 mb-2 ">
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">Date</div>
        </div>

        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">{'Sender'}</div>
        </div>

        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">{'Recipient'}</div>
        </div>

        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">Shares</div>
        </div>
        <div className="col-span-3">
          <div className="text-sm font-bold text-gray-700">Transaction</div>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700">Price</div>
        </div>
      </div>
      {issuances?.map((issuance: ShareIssuanceTrade, i) => {
        return <IssuanceSaleItem key={i} issuance={issuance} paymentTokenDecimals={paymentTokenDecimals} />;
      })}
    </>
  );
};

export default IssuanceSaleList;
