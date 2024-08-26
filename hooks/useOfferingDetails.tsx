import {
  confirmNoLiveOrders,
  ContractOrder,
  getCurrentOrderPrice,
  getOrderArrayFromContract,
} from '@src/utils/helpersOrder';
import { dividendContractABI } from '@src/web3/generated';
import { CurrencyCode, DocumentType, Maybe, Offering, ShareOrder } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { RETRIEVE_ORDERS, RETRIEVE_TRANSFER_EVENT } from '@src/utils/dGraphQueries/orders';
import { toNormalNumber } from '@src/web3/util';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useAsync } from 'react-use';
import { useQuery } from '@apollo/client';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useState } from 'react';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';

const useOfferingDetails = (offering: Offering, userId?: string | undefined) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const { details, smartContractSets } = offering;
  const [contractOrderList, setContractOrderList] = useState<ContractOrder[]>([]);

  const contractSet = smartContractSets?.slice(-1)[0];
  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress.address as String0x;
  const swapContract = contractSet?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress.address as String0x;
  const distributionPaymentToken = getCurrencyOption(details?.investmentCurrency as Maybe<CurrencyCode> | undefined);
  const distributionPaymentTokenAddress = distributionPaymentToken?.address as String0x;
  const distributionPaymentTokenDecimals = distributionPaymentToken ? distributionPaymentToken?.decimals : 18;

  const {
    data: ordersData,
    error,
    refetch: refetchOrders,
  } = useQuery(RETRIEVE_ORDERS, {
    variables: { swapContractAddress: swapContractAddress },
  });

  const orders = ordersData?.queryShareOrder;

  const { data: transferEventData, refetch: refetchTransactionHistory } = useQuery(RETRIEVE_TRANSFER_EVENT, {
    variables: { shareContractAddress: shareContractAddress },
  });

  const transferEvents = transferEventData?.queryShareTransferEvent;

  const partitions = shareContract?.partitions as String0x[];
  const documents = offering?.documents;
  const legalLinkTexts = documents && getDocumentsOfType(documents, DocumentType.ShareLink);

  const {
    contractOwner,
    isManager,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    shareContractVersion,
    issueReaching1410,
    isLoading: shareIsLoading,
    refetchShareContract,
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
    refetchSwapContract,
  } = useSwapContractInfo(swapContractAddress);

  const { data: distributionData } = useContractRead({
    address: distributionContractAddress,
    abi: dividendContractABI,
    functionName: 'balances',
    args: [distributionPaymentTokenAddress as String0x],
  });
  const totalDistributed = toNormalNumber(distributionData, distributionPaymentTokenDecimals);

  useAsync(async () => {
    const list =
      orders &&
      paymentTokenDecimals &&
      (await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals));
    setContractOrderList(list);
  }, [orders, swapContractAddress, paymentTokenDecimals, getOrderArrayFromContract]);

  const currentSalePrice = getCurrentOrderPrice(contractOrderList, offering.details?.priceStart);
  const noLiveOrders = confirmNoLiveOrders(contractOrderList);

  const contractOrders = orders?.filter((order: ShareOrder) => {
    return order?.swapContractAddress === swapContractAddress;
  });

  const hasContract = !!contractOwner;
  const isContractOwner = contractOwner === userWalletAddress;
  const isOfferingManager = getIsEditorOrAdmin(userId, offering.offeringEntity?.organization) ?? false;
  const contractManagerMatches = isContractOwner === !!isOfferingManager || isManager === !!isOfferingManager;

  const swapContractMatches = !swapContract
    ? true
    : normalizeEthAddress(shareTokenAddress) === normalizeEthAddress(shareContractAddress);

  const contractMatchesCurrentChain = !shareContract ? true : shareContract.cryptoAddress.chainId === chainId;

  const isLoading = shareIsLoading || swapIsLoading;

  const issueReachingContract = { swap: issueReachingSwapContract, share: issueReaching1410 };

  //NOTE: This does not return any objects the user can get directly from the Offering node in the DB.
  return {
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
    distributionPaymentToken,
    distributionPaymentTokenAddress,
    distributionPaymentTokenDecimals,
    orders,
    contractOrders,
    transferEvents,
    partitions,
    legalLinkTexts,
    isOfferingManager,
    contractOrderList,
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
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    totalDistributed,
    issueReachingContract,
    refetchShareContract,
    refetchSwapContract,
    refetchOrders,
    refetchTransactionHistory,
  };
};

export default useOfferingDetails;
