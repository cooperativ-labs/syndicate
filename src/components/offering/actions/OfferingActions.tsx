import Button from '@src/components/buttons/Button';
import ContractInvestorActions, { ContractInvestorActionsProps } from './InvestorActions';
import ContractOwnerActions, { ContractOwnerActionsProps } from './OwnerActions';
import Loading from '@src/components/loading/Loading';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import router from 'next/router';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import { OfferingSale } from 'types';
import { String0x } from '@src/web3/helpersChain';

export type ActionPanelActionsProps = boolean | 'send' | 'distribute' | 'sale';

type OfferingActionsProps = ContractOwnerActionsProps &
  ContractInvestorActionsProps & {
    sales: OfferingSale[];
    hasContract: boolean;
    loading: boolean;
    isOfferingManager: boolean;
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
  isOfferingManager,
  offering,
  sharesOutstanding,
  sales,
  contractId,
  isContractOwner,
  myDistToClaim,
  distributionId,
  isWhitelisted,
  partitions,
  setShareSaleManagerModal,
  setSaleFormModal,
  refetch,
  setRecallContract,
}) => {
  const organization = offering.offeringEntity.organization;
  if (!hasContract) {
    return isOfferingManager ? (
      <Button
        className="p-3 bg-cLightBlue rounded-md text-white"
        onClick={() => router.push(`/${organization.id}/offerings/${offering.id}/create-shares`)}
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
              partitions={partitions}
            />
          ) : (
            <ContractInvestorActions
              offering={offering}
              contractId={contractId}
              isWhitelisted={isWhitelisted}
              myDistToClaim={myDistToClaim}
              distributionId={distributionId}
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
