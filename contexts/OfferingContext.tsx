'use client';

import useOfferingDetails from '@hooks/useOfferingDetails';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { String0x } from '@src/web3/helpersChain';
import React, { createContext, useCallback, useContext, useState } from 'react';

import {
  Document,
  LegalEntityWithAddresses,
  OfferingFull,
  OfferingSmartContractSet,
  OrganizationUser,
  ShareOrder,
  ShareTransferEvent,
  SmartContract
} from '@/types';

import { useUserContext } from './UserContext';

type CurrencyOptionType = ReturnType<typeof getCurrencyOption>;

type OfferingContextValue = {
  // Core offering data
  offering: OfferingFull;
  documents: Document[];
  organizationUsers: OrganizationUser[];
  isOfferingManager: boolean;
  legalEntity: LegalEntityWithAddresses;

  // Contract state
  hasContract: boolean;
  isContractOwner: boolean;
  contractManagerMatches: boolean;
  swapContractMatches: boolean;
  contractMatchesCurrentChain: boolean;
  contractSet: OfferingSmartContractSet | null;
  shareContract: SmartContract | undefined;
  shareContractAddress: String0x | undefined;
  swapContract: SmartContract | undefined;
  swapContractAddress: String0x | undefined;
  distributionContractAddress: String0x | undefined;
  contractOwner: String0x | undefined;

  // Orders and events
  orders: ShareOrder[];
  transferEvents: ShareTransferEvent[];
  noLiveOrders: boolean;

  // Share info
  partitions: String0x[];
  myShareQty: number;
  sharesOutstanding: number | undefined;
  smartContractDocuments: any;
  legalLinkTexts: Document[];

  // Payment token info
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;

  // Swap contract settings
  listingApprovalsRequired: boolean | undefined;
  txnApprovalsRequired: boolean | undefined;
  shareTokenAddress: String0x | undefined;
  nextOrderId: number | undefined;

  // Computed values
  currentSalePrice: number;
  totalDistributed: number | undefined;

  // Loading state
  isLoading: boolean;
  issueReachingContract: { share: boolean; swap: boolean };

  // Refetch callbacks
  refetchShareContract: () => void;
  refetchSwapContract: () => void;
  refetchOrders: () => void;
  refetchTransactionHistory: () => void;

  // Composed refetch callbacks
  refetchMainContracts: () => void;
  refetchOfferingInfo: () => void;

  // Investor list refresh (for whitelist)
  investorListRefreshTrigger: number;
  triggerInvestorListRefresh: () => void;
};

const OfferingContext = createContext<OfferingContextValue | undefined>(undefined);

export function OfferingContextProvider({
  offering,
  organizationUsers,
  documents,
  children
}: {
  offering: OfferingFull;
  organizationUsers: OrganizationUser[];
  documents: Document[];
  children: React.ReactNode;
}) {
  const { userId } = useUserContext();
  const isOfferingManager = getIsEditorOrAdmin({
    userId: userId,
    organizationUsers: organizationUsers
  });
  const legalEntity = offering.legalEntity;
  const contractSet = offering.offeringSmartContracts;

  const [investorListRefreshTrigger, setInvestorListRefreshTrigger] = useState<number>(0);
  const triggerInvestorListRefresh = useCallback(() => {
    setInvestorListRefreshTrigger(prev => prev + 1);
  }, []);

  const {
    hasContract,
    isContractOwner,
    contractManagerMatches,
    swapContractMatches,
    contractMatchesCurrentChain,
    shareContract,
    shareContractAddress,
    swapContract,
    swapContractAddress,
    distributionContractAddress,
    orders,
    transferEvents,
    partitions,
    legalLinkTexts,
    noLiveOrders,
    currentSalePrice,
    contractOwner,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    isLoading,
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals,
    listingApprovalsRequired,
    txnApprovalsRequired,
    nextOrderId,
    totalDistributed,
    issueReachingContract,
    refetchShareContract,
    refetchSwapContract,
    refetchOrders,
    refetchTransactionHistory
  } = useOfferingDetails({
    price_start: offering.price_start,
    investment_currency: offering.investment_currency,
    isOfferingManager,
    documents,
    contractSet
  });

  const refetchMainContracts = useCallback(() => {
    refetchShareContract();
    refetchSwapContract();
    refetchTransactionHistory();
    triggerInvestorListRefresh();
  }, [
    refetchShareContract,
    refetchSwapContract,
    refetchTransactionHistory,
    triggerInvestorListRefresh
  ]);

  const refetchOfferingInfo = useCallback(() => {
    refetchTransactionHistory();
    refetchOrders();
  }, [refetchTransactionHistory, refetchOrders]);

  return (
    <OfferingContext.Provider
      value={{
        // Core offering data
        offering,
        documents,
        organizationUsers,
        isOfferingManager,
        legalEntity,

        // Contract state
        hasContract,
        isContractOwner,
        contractManagerMatches,
        swapContractMatches,
        contractMatchesCurrentChain,
        contractSet,
        shareContract,
        shareContractAddress,
        swapContract,
        swapContractAddress,
        distributionContractAddress,
        contractOwner,

        // Orders and events
        orders,
        transferEvents,
        noLiveOrders,

        // Share info
        partitions: partitions ?? [],
        myShareQty,
        sharesOutstanding,
        smartContractDocuments,
        legalLinkTexts: legalLinkTexts ?? [],

        // Payment token info
        paymentTokenAddress,
        paymentTokenDecimals,

        // Swap contract settings
        listingApprovalsRequired,
        txnApprovalsRequired,
        shareTokenAddress,
        nextOrderId,

        // Computed values
        currentSalePrice,
        totalDistributed,

        // Loading state
        isLoading: isLoading ?? false,
        issueReachingContract,

        // Refetch callbacks
        refetchShareContract,
        refetchSwapContract,
        refetchOrders,
        refetchTransactionHistory,

        // Composed refetch callbacks
        refetchMainContracts,
        refetchOfferingInfo,

        // Investor list refresh
        investorListRefreshTrigger,
        triggerInvestorListRefresh
      }}
    >
      {children}
    </OfferingContext.Provider>
  );
}

export function useOffering() {
  const context = useContext(OfferingContext);
  if (!context) {
    throw new Error('useOffering must be used within an OfferingContextProvider');
  }
  return context;
}

export default OfferingContext;
