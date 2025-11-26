import { ManagerModalType } from '@src/utils/helpersOffering';
import { String0x } from '@src/web3/helpersChain';
import { Dispatch, SetStateAction } from 'react';

import {
  CurrencyCodeType,
  Document,
  OfferingFull,
  OfferingSmartContractSet,
  ShareOrder,
  ShareTransferEvent
} from '@/types';

export type ContractOrder = {
  orderId: string | undefined;
  contractIndex: number | undefined;
  price: number;
  initiator: String0x | null;
  partition: String0x | null;
  isCancelled: boolean | null;
  isFilled: boolean | null;
  isAccepted: boolean | null;
  isApproved: boolean | null;
  filler: String0x | null;
};

export type ShareContractInfoType = {
  contractOwner: String0x | undefined;
  isManager: boolean;
  isWhitelisted: boolean;
  myShareQty: number;
  sharesOutstanding: number | undefined;
  smartContractDocuments: any;
  firstPartition: String0x | undefined;
  shareContractVersion: string | undefined;
  isLoading: boolean;
  issueReaching1410: boolean;
  refetchShareContract: () => void;
};

export type CoreOfferingActionsProps = {
  offering: OfferingFull;
  contractSet: OfferingSmartContractSet | null;

  // Contract Data
  sharesOutstanding: number | undefined;
  myShareQty: number | undefined;
  partitions: String0x[];
  currentSalePrice: number;

  // Payment Token Info
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;

  // Permissions / Status
  isContractOwner: boolean;
  swapApprovalsEnabled: boolean | undefined;
  txnApprovalsEnabled: boolean | undefined;

  // Callbacks
  refetchMainContracts: () => void;
  refetchOfferingInfo: () => void;
};

export type PostBidAskFormProps = CoreOfferingActionsProps;

export type PostInitialSaleProps = CoreOfferingActionsProps;

export type SwapContractSettingsProps = {
  refetchMainContracts: () => void;
  noLiveOrders: boolean;
  investmentCurrency: CurrencyCodeType | null;
  swapApprovalsEnabled: boolean | undefined;
  txnApprovalsEnabled: boolean | undefined;
  contractSet: OfferingSmartContractSet | null;
};

export type SendSharesProps = CoreOfferingActionsProps;

export type SmartContractsSettingsProps = SwapContractSettingsProps & {
  noLiveOrders: boolean;
  investmentCurrency: CurrencyCodeType | null;
  offering: OfferingFull;
  partitions: String0x[];
};

export type SaleMangerPanelProps = CoreOfferingActionsProps;

export type ShareSaleListItemProps = SaleMangerPanelProps & {
  offering: OfferingFull;
  transferEvents: ShareTransferEvent[] | undefined;
};

export type ShareSaleListProps = ShareSaleListItemProps & {
  orders: ShareOrder[] | undefined;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

export type AllOfferingActionsProps = CoreOfferingActionsProps & {
  orders: ShareOrder[] | undefined;
  hasContract: boolean;
  loading: boolean | undefined;
  retrievalIssue: boolean;
  issueReachingContract: { share: boolean; swap: boolean };
  transferEvents: ShareTransferEvent[] | undefined;
  documents: Document[];

  // From SwapContractSettingsProps
  noLiveOrders: boolean;
  investmentCurrency: CurrencyCodeType | null;
};
