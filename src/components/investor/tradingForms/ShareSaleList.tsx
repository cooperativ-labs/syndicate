import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import ShareSaleListItem, { ShareSaleListItemProps } from './ShareSaleListItem';
import { claimProceeds } from '@src/web3/contractSwapCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCurrencyById } from '@src/utils/enumConverters';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { Maybe, ShareOrder } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { toNormalNumber } from '@src/web3/util';
import { useAccount, useContractRead } from 'wagmi';

export type ShareSaleListProps = ShareSaleListItemProps & {
  orders: Maybe<ShareOrder>[] | undefined;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

const ShareSaleList: FC<ShareSaleListProps> = ({
  offering,
  orders,
  myShareQty,
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
  isContractOwner,
  transferEvents,
  setModal,
  refetchMainContracts,
  refetchOfferingInfo,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');
  const { data: contractData } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress as String0x],
  });

  const rawProceeds = contractData && contractData[1];
  const proceeds = paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const handleClaimProceeds = async () => {
    await claimProceeds({
      swapContractAddress,
      setButtonStep: setClaimProceedsButton,
      refetchAllContracts: refetchMainContracts,
    });
  };

  const proceedsButton = proceeds !== 0 && (
    <Button
      className={'p-3 shadow-md rounded-md bg-blue-600 text-white text-sm uppercase font-medium'}
      onClick={handleClaimProceeds}
      disabled={claimProceedsButton === 'step1'}
    >
      <LoadingButtonText
        state={claimProceedsButton}
        idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
        step1Text="Claiming Proceeds..."
        confirmedText="Proceeds Claimed!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const saleButton = (
    <Button
      className="p-3 shadow-md hover:shadow-xl disabled:shadow-none rounded-md bg-slate-600 text-white text-sm  uppercase font-medium disabled:bg-gray-400"
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
      className=" text-blue-800 text-xl "
      onClick={() => {
        refetchOfferingInfo();
        refetchMainContracts();
      }}
    >
      <FontAwesomeIcon icon="sync" className="mr-2" />
    </Button>
  );

  if (orders && orders.length < 1) {
    return <div className="w-full">{saleButton}</div>;
  }

  const currentOrders = orders?.filter((order) => !order?.archived);
  const archivedOrders = orders?.filter((order) => order?.archived);

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
        return (
          <ShareSaleListItem
            key={i}
            index={i}
            offering={offering}
            order={order as ShareOrder}
            myShareQty={myShareQty}
            swapContractAddress={swapContractAddress}
            paymentTokenAddress={paymentTokenAddress}
            txnApprovalsEnabled={txnApprovalsEnabled}
            swapApprovalsEnabled={swapApprovalsEnabled}
            isContractOwner={isContractOwner}
            setModal={setModal}
            refetchMainContracts={refetchMainContracts}
            paymentTokenDecimals={paymentTokenDecimals}
            shareContractAddress={shareContractAddress}
            refetchOfferingInfo={refetchOfferingInfo}
            transferEvents={transferEvents}
          />
        );
      })}
      {archivedOrders?.length !== 0 && (
        <div className="w-full mt-4 border-2 border-slate-600 rounded-md">
          <SectionBlock
            className={'p-3 bg-slate-600 text-white rounded-sm w-full font-semibold  '}
            sectionTitle={'Archived offers'}
            mini
          >
            <div className=" items-center px-3 w-full">
              {archivedOrders?.map((order, i) => {
                return (
                  <ShareSaleListItem
                    key={i}
                    index={i}
                    offering={offering}
                    order={order as ShareOrder}
                    myShareQty={myShareQty}
                    swapContractAddress={swapContractAddress}
                    paymentTokenAddress={paymentTokenAddress}
                    txnApprovalsEnabled={txnApprovalsEnabled}
                    swapApprovalsEnabled={swapApprovalsEnabled}
                    isContractOwner={isContractOwner}
                    setModal={setModal}
                    refetchMainContracts={refetchMainContracts}
                    paymentTokenDecimals={paymentTokenDecimals}
                    shareContractAddress={shareContractAddress}
                    refetchOfferingInfo={refetchOfferingInfo}
                    transferEvents={transferEvents}
                  />
                );
              })}
            </div>
          </SectionBlock>
        </div>
      )}
    </>
  );
};

export default ShareSaleList;
