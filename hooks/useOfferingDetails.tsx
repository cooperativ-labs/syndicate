import { retrieveOrders, retrieveTransferEvents } from '@src/utils/actions/orderActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getCurrentPrice, getOrderArrayFromContract, liveOrders } from '@src/utils/helpersOrder';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { dividendContractABI } from '@src/web3/generated';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';
import { toNormalNumber } from '@src/web3/util';
import { useCallback, useRef, useState } from 'react';
import { useAsync } from 'react-use';
import { useChainId, useConnection, useReadContract } from 'wagmi';

import {
  CurrencyCodeType,
  Document,
  DocumentType,
  OfferingSmartContractSet,
  ShareOrder,
  ShareTransferEvent
} from '@/types';

type OfferingDetailsProps = {
  price_start: number | undefined | null;
  investment_currency: CurrencyCodeType | undefined | null;
  offeringId: number | string;
  isOfferingManager: boolean;
  documents?: Document[];
  contractSet: OfferingSmartContractSet | null;
};

const useOfferingDetails = ({
  price_start,
  investment_currency,
  offeringId,
  isOfferingManager,
  documents,
  contractSet
}: OfferingDetailsProps) => {
  const { address: userWalletAddress } = useConnection();
  const chainId = useChainId();

  const [transferEvents, setTransferEvents] = useState<ShareTransferEvent[]>([]);
  const [orders, setOrders] = useState<ShareOrder[]>([]);
  const isManualRefetchRef = useRef(false);

  const { swapContract, shareContract, distributionContract } = contractSet ?? {};

  const shareContractAddress = shareContract?.cryptoAddress?.address as String0x;
  const swapContractAddress = swapContract?.cryptoAddress?.address as String0x;
  const distributionContractAddress = distributionContract?.cryptoAddress?.address as String0x;
  console.log('USE OFFERING DETAILS');
  useAsync(async () => {
    if ((!swapContractAddress && !shareContractAddress) || isManualRefetchRef.current) {
      return;
    }
    const [ordersData, transferEventsData] = await Promise.all([
      retrieveOrders(swapContractAddress),
      retrieveTransferEvents(shareContractAddress)
    ]);
    setOrders(ordersData as ShareOrder[]);
    setTransferEvents(transferEventsData as ShareTransferEvent[]);
  }, [swapContractAddress, shareContractAddress]);

  const refetchOrders = useCallback(() => {
    if (!swapContractAddress) return;
    isManualRefetchRef.current = true;
    retrieveOrders(swapContractAddress)
      .then(setOrders)
      .finally(() => {
        isManualRefetchRef.current = false;
      });
  }, [swapContractAddress]);

  const refetchTransactionHistory = useCallback(() => {
    if (!shareContractAddress) return;
    isManualRefetchRef.current = true;
    retrieveTransferEvents(shareContractAddress)
      .then(setTransferEvents)
      .finally(() => {
        isManualRefetchRef.current = false;
      });
  }, [shareContractAddress]);

  const partitions = shareContract?.partitions as String0x[];

  const legalLinkTexts = getDocumentsOfType(documents, DocumentType.SHARE_LINK);

  const {
    contractOwner,
    isManager,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    shareContractVersion,
    issueReaching1410,
    isLoading: shareIsLoading,
    refetchShareContract
  } = useShareContractInfo(shareContractAddress, userWalletAddress);

  const {
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    issueReachingSwapContract,
    isLoading: swapIsLoading,
    refetchSwapContract
  } = useSwapContractInfo(swapContractAddress);

  const paymentToken = getCurrencyOption(investment_currency);
  const defaultPaymentTokenAddress = paymentToken?.address as String0x;
  const defaultPaymentTokenDecimals = paymentToken ? paymentToken.decimals : 18;
  const _paymentTokenAddress = paymentTokenAddress ?? defaultPaymentTokenAddress;
  const _paymentTokenDecimals = paymentTokenDecimals ?? defaultPaymentTokenDecimals;

  const { data: distributionData } = useReadContract({
    address: distributionContractAddress,
    abi: dividendContractABI,
    functionName: 'balances',
    args: [defaultPaymentTokenAddress as String0x]
  });

  const totalDistributed = toNormalNumber(distributionData, defaultPaymentTokenDecimals);

  const { value: contractOrders } = useAsync(async () => {
    if (!_paymentTokenDecimals || !orders || !swapContractAddress) {
      return [];
    }
    return await getOrderArrayFromContract(orders, swapContractAddress, _paymentTokenDecimals);
  }, [_paymentTokenDecimals, orders, swapContractAddress]);

  const currentPrice = getCurrentPrice({
    paymentTokenDecimals: _paymentTokenDecimals,
    priceStart: price_start ?? 0,
    transferEvents,
    contractOrders: contractOrders ?? []
  });

  const noLiveOrders = liveOrders(contractOrders).length === 0;

  const hasContract = !!contractOwner;

  const isContractOwner = contractOwner === userWalletAddress;

  const contractManagerMatches =
    isContractOwner === !!isOfferingManager || isManager === !!isOfferingManager;

  const swapContractMatches = !swapContract
    ? true
    : normalizeEthAddress(shareTokenAddress) === normalizeEthAddress(shareContractAddress);

  const contractMatchesCurrentChain = !shareContract
    ? true
    : shareContract.cryptoAddress?.chain_id === chainId;

  const isLoading = shareIsLoading || swapIsLoading;

  const issueReachingContract = { swap: issueReachingSwapContract, share: issueReaching1410 };

  //NOTE: This does not return any objects the user can get directly from the Offering node in the DB.

  return {
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
    distributionPaymentToken: paymentToken,
    distributionPaymentTokenAddress: _paymentTokenAddress,
    distributionPaymentTokenDecimals: _paymentTokenDecimals,
    orders,
    contractOrders,
    transferEvents,
    partitions,
    legalLinkTexts,
    noLiveOrders,
    currentSalePrice: currentPrice,
    contractOwner,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    isLoading,
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    totalDistributed,
    issueReachingContract,
    refetchShareContract,
    refetchSwapContract,
    refetchOrders,
    refetchTransactionHistory
  };
};

export default useOfferingDetails;
