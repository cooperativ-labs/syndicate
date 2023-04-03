import Button from '@src/components/buttons/Button';
import ContractInvestorActions, { ContractInvestorActionsProps } from './InvestorActions';
import ContractOwnerActions, { ContractOwnerActionsProps } from './OwnerActions';
import Loading from '@src/components/loading/Loading';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import router from 'next/router';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import { OfferingSale } from 'types';

export type ActionPanelActionsProps = boolean | 'send' | 'distribute' | 'sale';

type OfferingActionsProps = ContractOwnerActionsProps &
  ContractInvestorActionsProps & {
    sales: OfferingSale[];
    hasContract: boolean;
    loading: boolean;
    isOfferingOwner: boolean;
    retrievalIssue: boolean;
    isContractOwner: boolean;
    myBacBalance: number;
    setShareSaleManagerModal: Dispatch<SetStateAction<boolean>>;
    saleFormModal: boolean;
  };

const OfferingActions: FC<OfferingActionsProps> = ({
  retrievalIssue,
  hasContract,
  loading,
  isOfferingOwner,
  offering,
  sharesOutstanding,
  sales,
  contractId,
  isContractOwner,
  myDistToClaim,
  distributionId,
  isOptedIn,
  isWhiteListed,
  setShareSaleManagerModal,
  setSaleFormModal,
  refetch,
  setRecallContract,
}) => {
  if (!hasContract) {
    return isOfferingOwner ? (
      <Button
        className="p-3 bg-cLightBlue rounded-md text-white"
        onClick={() => router.push(`./${offering.id}/create-shares`)}
      >
        Create Shares
      </Button>
    ) : (
      <>The offeror has not yet created shares or your wallet is not connected.</>
    );
  }

  return (
    <>
      {retrievalIssue ? (
        <RetrievalIssue className="mt-10" />
      ) : loading ? (
        <div className="flex justify-center self-center">
          <Loading />
        </div>
      ) : (
        <div className="">
          {isContractOwner ? (
            <ContractOwnerActions
              offering={offering}
              contractId={contractId}
              sharesOutstanding={sharesOutstanding}
              myDistToClaim={myDistToClaim}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setSaleFormModal={setSaleFormModal}
              setRecallContract={setRecallContract}
              refetch={refetch}
              distributionId={distributionId}
            />
          ) : (
            <ContractInvestorActions
              offering={offering}
              contractId={contractId}
              isWhiteListed={isWhiteListed}
              myDistToClaim={myDistToClaim}
              distributionId={distributionId}
              isOptedIn={isOptedIn}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setRecallContract={setRecallContract}
            />
          )}
          <ShareSaleStatusWidget
            sales={sales}
            offeringId={offering.id}
            contractId={contractId}
            isContractOwner={isContractOwner}
          />
        </div>
      )}
    </>
  );
};

export default OfferingActions;
