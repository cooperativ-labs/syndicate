import {
 CurrencyCodeType,
 Document,
 OfferingFull,
 OfferingParticipant,
 OfferingSmartContractSet,
 ShareOrder,
 ShareTransferEvent,
} from "@/types";
import { String0x } from "@src/web3/helpersChain";
import { ManagerModalType } from "@src/utils/helpersOffering";
import { Dispatch, SetStateAction } from "react";

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

type BaseProps = {
 paymentTokenDecimals: number | undefined;
 sharesOutstanding: number | undefined;
 partitions: String0x[];
};

export type PostBidAskFormProps = BaseProps & {
 offering: OfferingFull;
 swapApprovalsEnabled: boolean;
 myShareQty: number | undefined;
 isContractOwner: boolean;
 currentSalePrice: number;
 refetchOfferingInfo: () => void;
};

export type PostInitialSaleProps = BaseProps & {
 paymentTokenAddress: String0x | undefined;
 refetchOfferingInfo: () => void;
};

export type SwapContractSettingsProps = {
 swapApprovalsEnabled: boolean | undefined;
 txnApprovalsEnabled: boolean | undefined;
 contractSet: OfferingSmartContractSet | null;
 offering: OfferingFull;
 noLiveOrders: boolean;
 investmentCurrency: CurrencyCodeType | null;
 refetchMainContracts: () => void;
};

export type SendSharesProps = {
 sharesIssued: number | undefined | null;
 sharesOutstanding: number | undefined;
 shareContractId: string;
 shareContractAddress: String0x;
 offeringParticipants: OfferingParticipant[] | undefined | null;
 partitions: String0x[];
 myShareQty: number | undefined;
 investmentCurrency: CurrencyCodeType | null;
 currentSalePrice: number | undefined;
 refetchMainContracts: () => void;
};

export type SmartContractsSettingsProps = SwapContractSettingsProps & {
 partitions: String0x[];
};

export type ShareContractInfoType = {
 contractOwner: string | undefined;
 isManager: boolean;
 isWhitelisted: boolean;
 myShareQty: number | undefined;
 sharesOutstanding: number | undefined;
 smartContractDocuments: any | undefined;
 firstPartition: String0x | undefined;
 shareContractVersion: string | undefined;
 isLoading: boolean;
 issueReaching1410: boolean;
 refetchShareContract: () => void;
};

export type OrderStatusType = {
 isApproved: boolean;
 isDisapproved: boolean;
 isAccepted: boolean;
 isCancelled: boolean;
};
export type SaleMangerPanelProps = {
 swapContractAddress: String0x | undefined;
 paymentTokenAddress: String0x | undefined;
 paymentTokenDecimals: number | undefined;
 txnApprovalsEnabled: boolean | undefined;
 swapApprovalsEnabled: boolean | undefined;
 isContractOwner: boolean;
 refetchOfferingInfo: () => void;
};
export type ShareSaleListItemProps = SaleMangerPanelProps & {
 offering: OfferingFull;
 shareContractAddress: String0x | undefined;
 myShareQty: number | undefined;
 transferEvents: ShareTransferEvent[] | undefined;
 setModal: (value: ManagerModalType) => void;
 refetchMainContracts: () => void;
};

export type ShareSaleListProps = ShareSaleListItemProps & {
 orders: ShareOrder[] | undefined;
 setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

export type AllOfferingActionsProps =
 & SmartContractsSettingsProps
 & PostBidAskFormProps
 & PostInitialSaleProps
 & {
  orders: ShareOrder[] | undefined;
  hasContract: boolean;
  loading: boolean | undefined;
  retrievalIssue: boolean;
  issueReachingContract: { share: boolean; swap: boolean };
  transferEvents: ShareTransferEvent[] | undefined;
  documents: Document[];
 };
