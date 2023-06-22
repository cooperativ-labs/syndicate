import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import ShareSaleListItem, { ShareSaleListItemProps } from './ShareSaleListItem';
import { claimProceeds } from '@src/web3/contractSwapCalls';
import { getCurrencyById } from '@src/utils/enumConverters';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { Maybe, ShareOrder } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { standardClass } from '@src/components/offering/actions/OfferingActions';
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
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
  isContractOwner,
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
    await claimProceeds({ swapContractAddress, setButtonStep: setClaimProceedsButton });
  };

  const proceedsButton = proceeds !== 0 && (
    <Button
      className={'mt-4 p-3 shadow-md rounded-md bg-slate-300 w-full uppercase font-semibold'}
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
      className="mt-4 p-3 shadow-md hover:shadow-xl disabled:shadow-none rounded-md bg-slate-600 text-white w-full uppercase font-semibold disabled:bg-gray-400"
      onClick={() => {
        setModal('saleForm');
      }}
      disabled={!swapContractAddress}
    >
      {!swapContractAddress ? 'Buying and selling is not enabled' : `Post Bid/Ask`}
    </Button>
  );

  if (orders && orders.length < 1) {
    return <>{saleButton}</>;
  }

  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold">{`Offers`}</h2>
      {orders?.map((order, i) => {
        return (
          <div key={i}>
            <ShareSaleListItem
              index={i}
              offering={offering}
              order={order as ShareOrder}
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
            />
          </div>
        );
      })}

      {<>{saleButton}</>}
      {<>{proceedsButton}</>}
    </>
  );
};

export default ShareSaleList;
