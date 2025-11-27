import { ManagerModalType } from '@src/utils/helpersOffering';
import { String0x } from '@src/web3/helpersChain';
import { Dispatch, SetStateAction } from 'react';

import { ShareOrder } from '@/types';

// Contract order type used for on-chain order data
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

// Share contract info type - used by useShareContractInfo hook
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

// =============================================================================
// SIMPLIFIED COMPONENT PROPS - Most data now comes from OfferingContext
// =============================================================================

// Props for ShareSaleList - needs modal control and callback to open sale form
export type ShareSaleListProps = {
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

// Props for ShareSaleListItem - needs the specific order being displayed
export type ShareSaleListItemProps = {
  order: ShareOrder;
};

// Props for PostBidAskForm - needs wallet address and modal callback
export type PostBidAskFormProps = {
  walletAddress: string;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
  refetchAllContracts: () => void;
};

// Props for PostInitialSale - needs modal callback
export type PostInitialSaleProps = {
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

// Props for SaleManagerPanel - needs order-specific data
export type SaleManagerPanelProps = {
  order: ShareOrder;
  // Order state from useOrderDetails
  currentUserFiller: boolean;
  currentUserInitiator: boolean;
  isApproved: boolean | undefined;
  isDisapproved: boolean;
  isAccepted: boolean | undefined;
  isCancelled: boolean | undefined;
  isFilled: boolean | undefined;
  isAskOrder: boolean | undefined;
  filler: String0x | undefined;
  initiator: String0x;
  amount: number | undefined;
  price: number | undefined;
  partition: String0x | undefined;
};

// Props for SharePurchaseSteps - needs order-specific data
export type SharePurchaseStepsProps = {
  order: ShareOrder;
  shareQtyRemaining: number;
  price: number;
  isAskOrder: boolean;
  refetchOrderAndContracts: () => void;
  // Order state from useOrderDetails
  isApproved: boolean;
  isFilled: boolean;
  isCancelled: boolean;
  isAccepted: boolean;
  filledAmount: number;
  filler: String0x;
  partition: String0x;
  initiator: String0x;
};

// Props for SmartContractsSettings - no additional props needed (all from context)
export type SmartContractsSettingsProps = Record<string, never>;

// Props for SwapContractSettings - no additional props needed (all from context)
export type SwapContractSettingsProps = Record<string, never>;

// Props for SendShares - no additional props needed (all from context)
export type SendSharesProps = Record<string, never>;

// Props for ShareSaleStatusWidget - no additional props needed (all from context)
export type ShareSaleStatusWidgetProps = Record<string, never>;

// Props for OfferingActions - no additional props needed (all from context)
export type OfferingActionsProps = Record<string, never>;

// Props for OfferingActionsContainer - needs wallet address check
export type OfferingActionsContainerProps = {
  userWalletAddress: string | undefined;
};
