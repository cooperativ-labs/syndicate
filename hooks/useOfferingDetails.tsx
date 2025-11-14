import { getCurrentOrdersAndPrice } from '@src/utils/actions/offeringActions';
import { retrieveOrders, retrieveTransferEvents } from '@src/utils/actions/orderActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { confirmNoLiveOrders } from '@src/utils/helpersOrder';
import { dividendContractABI } from '@src/web3/generated';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';
import { toNormalNumber } from '@src/web3/util';
import { useCallback, useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount, useChainId, useReadContract } from 'wagmi';

import {
  CurrencyCodeType,
  Document,
  DocumentType,
  OfferingSmartContractSet,
  ShareOrder,
  ShareTransferEvent,
  SmartContractWithCryptoAddress
} from '@/types';

type OfferingDetailsProps = {
  price_start: number | undefined | null;
  investment_currency: CurrencyCodeType | undefined | null;
  offeringId: string;
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
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();

  const [transferEvents, setTransferEvents] = useState<ShareTransferEvent[]>([]);
  const [orders, setOrders] = useState<ShareOrder[]>([]);

  const { swapContract, shareContract, distributionContract } = contractSet ?? {};

  const shareContractAddress = shareContract?.cryptoAddress?.address as String0x;
  const swapContractAddress = swapContract?.cryptoAddress?.address as String0x;
  const distributionContractAddress = distributionContract?.cryptoAddress?.address as String0x;

  const distributionPaymentToken = getCurrencyOption(investment_currency);
  const distributionPaymentTokenAddress = distributionPaymentToken?.address as String0x;
  const distributionPaymentTokenDecimals = distributionPaymentToken?.decimals
    ? distributionPaymentToken.decimals
    : 18;

  useAsync(async () => {
    if (!swapContractAddress || !shareContractAddress) {
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
    retrieveOrders(swapContractAddress).then(setOrders);
  }, [swapContractAddress]);

  const refetchTransactionHistory = useCallback(() => {
    retrieveTransferEvents(shareContractAddress).then(setTransferEvents);
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

  const { data: distributionData } = useReadContract({
    address: distributionContractAddress,
    abi: dividendContractABI,
    functionName: 'balances',
    args: [distributionPaymentTokenAddress as String0x]
  });
  const totalDistributed = toNormalNumber(distributionData, distributionPaymentTokenDecimals);

  const { value: currentOrdersAndPrice } = useAsync(async () => {
    if (!paymentTokenDecimals) {
      return { currentPrice: 0, noLiveOrders: false };
    }
    const { currentPrice, contractSaleList } = await getCurrentOrdersAndPrice({
      offeringId: offeringId,
      paymentTokenDecimals: paymentTokenDecimals ?? 0,
      priceStart: price_start ?? 0
    });

    const result = { currentPrice, noLiveOrders: confirmNoLiveOrders(contractSaleList) };
    return result;
  }, [offeringId]);

  const { currentPrice, noLiveOrders } = currentOrdersAndPrice ?? {
    currentPrice: 0,
    noLiveOrders: true
  };

  const contractOrders = orders?.filter((order: ShareOrder) => {
    return order?.swap_contract_address === swapContractAddress;
  });

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
    distributionPaymentToken,
    distributionPaymentTokenAddress,
    distributionPaymentTokenDecimals,
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
