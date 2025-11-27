import { useOffering } from '@contexts/OfferingContext';
import { Button } from '@src/components/ui/button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import SectionBlock from '@src/containers/SectionBlock';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { claimProceeds } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { RefreshCw } from 'lucide-react';
import React, { FC, useState } from 'react';
import { useConnection, useReadContract } from 'wagmi';

import { ShareOrder } from '@/types';

import { ShareSaleListProps } from './offering-actions-types';
import ShareSaleListItem from './ShareSaleListItem';

const ShareSaleList: FC<ShareSaleListProps> = ({ setModal }) => {
  const {
    contractSet,
    orders,
    paymentTokenAddress,
    paymentTokenDecimals,
    refetchMainContracts,
    refetchOfferingInfo
  } = useOffering();

  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;
  const { address: userWalletAddress } = useConnection();
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');
  const { data: contractData } = useReadContract({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress as String0x]
  });

  const rawProceeds = contractData && contractData[1];
  const proceeds =
    paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const handleClaimProceeds = async () => {
    await claimProceeds({
      swapContractAddress,
      setButtonStep: setClaimProceedsButton,
      refetchOrderAndContracts: refetchMainContracts
    });
  };

  const proceedsButton = proceeds !== 0 && (
    <LoadingButtonChain
      onClick={handleClaimProceeds}
      disabled={claimProceedsButton === 'step1'}
      state={claimProceedsButton}
      idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
      step1Text="Claiming Proceeds..."
      confirmedText="Proceeds Claimed!"
      failedText="Transaction failed"
      rejectedText="You rejected the transaction. Click here to try again."
    />
  );

  const saleButton = (
    <Button
      onClick={() => {
        setModal('saleForm');
      }}
      disabled={!swapContractAddress}
    >
      {!swapContractAddress ? 'Buying and selling is not enabled' : `Post Bid/Ask`}
    </Button>
  );

  const refreshButton = (
    <Button
      variant="ghost"
      onClick={() => {
        refetchOfferingInfo();
        refetchMainContracts();
      }}
    >
      <RefreshCw className="mr-2" />
    </Button>
  );

  if (orders && orders.length < 1) {
    return <div className="w-full">{saleButton}</div>;
  }

  const currentOrders = orders?.filter(order => !order?.archived);
  const archivedOrders = orders?.filter(order => order?.archived);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl text-blue-900 font-semibold ">{`Offers`}</h2>
        <div className="flex gap-3">
          {saleButton}
          {proceedsButton}
          {refreshButton}
        </div>
      </div>
      {currentOrders?.map((order, i) => {
        return <ShareSaleListItem key={i} order={order as ShareOrder} />;
      })}
      {archivedOrders?.length !== 0 && (
        <div className="w-full mt-4 border border-gray-300 rounded-md">
          <SectionBlock
            className={'p-3 bg-slate-100 text-gray-800 rounded-sm w-full font-semibold  '}
            sectionTitle={'Archived offers'}
            mini
          >
            <div className=" items-center px-3 w-full">
              {archivedOrders?.map((order, i) => {
                return <ShareSaleListItem key={i} order={order as ShareOrder} />;
              })}
            </div>
          </SectionBlock>
        </div>
      )}
    </>
  );
};

export default ShareSaleList;
