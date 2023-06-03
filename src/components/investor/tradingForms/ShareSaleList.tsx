import Button from '@src/components/buttons/Button';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import ShareSaleListItem, { ShareSaleListItemProps } from './ShareSaleListItem';
import { defaultFieldLabelClass } from '@src/components/form-components/Inputs';
import { Offering, OfferingParticipant, OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';

type ShareSaleListProps = ShareSaleListItemProps & {
  sales: OfferingSale[];
  setSaleFormModal: Dispatch<SetStateAction<boolean>>;
};

const ShareSaleList: FC<ShareSaleListProps> = ({
  offering,
  walletAddress,
  sales: offers,
  swapContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  permittedEntity,
  isContractOwner,
  setSaleFormModal,
  setShareSaleManagerModal,
  refetchMainContracts,
}) => {
  const saleButton = (
    <Button
      className="mt-4 p-3 shadow-md rounded-md bg-slate-300 w-full uppercase font-semibold"
      onClick={() => {
        setSaleFormModal(true), setShareSaleManagerModal(false);
      }}
    >
      Post Shares Offer
    </Button>
  );

  if (offers.length < 1) {
    return <>{saleButton}</>;
  }

  const createOfferList = () => {
    if (!isContractOwner) {
      return offers.filter((offer) => offer.visible);
    }
    return offers;
  };

  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold">{`Offers`}</h2>
      {createOfferList().map((sale, i) => {
        return (
          <div key={i}>
            <ShareSaleListItem
              index={i}
              walletAddress={walletAddress}
              offering={offering}
              sale={sale}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              permittedEntity={permittedEntity}
              isContractOwner={isContractOwner}
              setShareSaleManagerModal={setShareSaleManagerModal}
              refetchMainContracts={refetchMainContracts}
              paymentTokenDecimals={paymentTokenDecimals}
            />
          </div>
        );
      })}

      {<>{saleButton}</>}
    </>
  );
};

export default ShareSaleList;
