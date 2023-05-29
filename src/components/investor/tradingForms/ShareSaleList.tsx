import Button from '@src/components/buttons/Button';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import ShareSaleListItem from './ShareSaleListItem';
import { defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import { Offering, OfferingParticipant, OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';

import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type ShareSaleListProps = {
  offering: Offering;
  sales: OfferingSale[];
  myBacBalance: number;
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  walletAddress: string;
  permittedEntity: OfferingParticipant;
  isContractOwner: boolean;
  txnApprovalsEnabled: boolean;
  setSaleFormModal: Dispatch<SetStateAction<boolean>>;
  setShareSaleManagerModal: Dispatch<SetStateAction<boolean>>;
  setRecallContract: Dispatch<SetStateAction<string>>;
};

const ShareSaleList: FC<ShareSaleListProps> = ({
  offering,
  walletAddress,
  sales,
  myBacBalance,
  swapContractAddress,
  paymentTokenAddress,
  txnApprovalsEnabled,
  permittedEntity,
  isContractOwner,
  setSaleFormModal,
  setShareSaleManagerModal,
  setRecallContract,
}) => {
  const chainId = useChainId();
  const { userWalletAddress } = useContext(ReachContext);
  const mySale = sales.find((sale) => sale.initiator === userWalletAddress);
  const offers = sales.filter((sale) => sale.isAsk);

  const saleButton = (
    <Button
      className="p-3 shadow-md rounded-md bg-slate-300 w-full uppercase font-semibold"
      onClick={() => {
        setSaleFormModal(true), setShareSaleManagerModal(false);
      }}
    >
      Post Shares Offer
    </Button>
  );

  if (sales.length < 1) {
    return <>{saleButton}</>;
  }

  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold">{`Offers`}</h2>
      {offers.map((sale, i) => {
        return (
          <div key={i}>
            <ShareSaleListItem
              index={i}
              walletAddress={walletAddress}
              offering={offering}
              sale={sale}
              myBacBalance={myBacBalance}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              permittedEntity={permittedEntity}
              isContractOwner={isContractOwner}
              setModal={setShareSaleManagerModal}
              setRecallContract={setRecallContract}
            />
          </div>
        );
      })}

      {!mySale && <>{saleButton}</>}
    </>
  );
};

export default ShareSaleList;
