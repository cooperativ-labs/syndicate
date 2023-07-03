import { Dispatch, SetStateAction } from 'react';
import { String0x, StandardChainErrorHandling, bytes32FromString } from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
import { waitForTransaction, writeContract, getAccount, prepareWriteContract } from 'wagmi/actions';
import { swapContractABI } from './generated';
import toast from 'react-hot-toast';
import { shareContractDecimals, toContractNumber } from './util';
import { erc20ABI } from 'wagmi';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Currency, CurrencyCode, Organization, ShareTransferEventType } from 'types';
import { getBaseUrl } from '@src/utils/helpersURL';
import {
  handleOfferingRequestNotification,
  handleTradeExecutionNotification,
} from '@src/components/notifications/notificationFunctions';
import { getCurrencyById } from '@src/utils/enumConverters';

type SubmitSwapProps = {
  numShares: number;
  price: number;
  partition: String0x;
  newPartition?: string;
  minUnits?: number;
  maxUnits?: number;
  visible: boolean;
  toc?: boolean;
  swapContractAddress: String0x | undefined;
  shareContractId?: string;
  paymentTokenDecimals: number;
  offeringId: string;
  isContractOwner: boolean;
  isAsk: boolean;
  isIssuance: boolean;
  isErc20Payment: boolean;
  myShareQty?: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  createOrder: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  addPartition?: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchAllContracts: () => void;
  refetchOfferingInfo: () => void;
};

export const submitSwap = async ({
  numShares,
  price,
  partition,
  newPartition,
  minUnits,
  maxUnits,
  visible,
  toc,
  swapContractAddress,
  shareContractId,
  paymentTokenDecimals,
  offeringId,
  isContractOwner,
  isAsk,
  isIssuance,
  isErc20Payment,
  myShareQty,
  setModal,
  setButtonStep,
  createOrder,
  addPartition,
  refetchAllContracts,
  refetchOfferingInfo,
}: SubmitSwapProps) => {
  setButtonStep('step1');
  const call = async () => {
    const setPartition = partition === '0xNew' ? bytes32FromString(newPartition) : (partition as String0x);
    try {
      if (!isContractOwner && numShares > myShareQty!) {
        toast.error('You do not have enough shares to sell.');
      }

      const { request, result } = await prepareWriteContract({
        address: swapContractAddress as String0x,
        abi: swapContractABI,
        functionName: 'initiateOrder',
        args: [
          setPartition,
          toContractNumber(numShares, shareContractDecimals),
          toContractNumber(price, paymentTokenDecimals - shareContractDecimals), //must account for share contract decimals
          isAsk,
          isIssuance,
          isErc20Payment,
        ],
      });
      const { hash } = await writeContract(request);
      const transactionReceipt = await waitForTransaction({
        hash: hash,
      });
      const { address: userWalletAddress } = getAccount();
      const contractIndex = Number(result);
      addPartition &&
        (await addPartition({
          variables: {
            smartContractId: shareContractId,
            partition: setPartition as string,
          },
        }));
      await createOrder({
        variables: {
          currentDate: currentDate,
          contractIndex: contractIndex,
          swapContractAddress: swapContractAddress,
          minUnits: minUnits,
          maxUnits: maxUnits,
          initiator: userWalletAddress,
          visible: visible,
          transactionHash: transactionReceipt.transactionHash,
        },
      });
      refetchAllContracts();
      refetchOfferingInfo();
      setButtonStep('confirmed');
      toast.success(`You have offered ${!isAsk ? 'to purchase ' : ''}${numShares} shares.`);
      setModal && setModal(false);
      return transactionReceipt;
    } catch (e) {
      // if (data) {
      //   const orderId = data.updateOffering.offering[0].sales[0].id;
      //   await deleteSaleObject({ variables: { offeringId: id, orderId: orderId } });
      // }
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type AcceptOrderProps = {
  swapContractAddress: String0x;
  amount: number;
  contractIndex: number;
  offeringId: string;
  organization: Organization;
  isAskOrder: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const acceptOrder = async ({
  swapContractAddress,
  amount,
  contractIndex,
  offeringId,
  organization,
  isAskOrder,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: AcceptOrderProps) => {
  if (!swapContractAddress) {
    throw new Error('No swap contract address');
  }
  if (!swapContractAddress) {
    throw new Error('No swap contract address');
  }
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'acceptOrder',
        args: [BigInt(contractIndex), toContractNumber(amount, shareContractDecimals)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      await handleOfferingRequestNotification({
        organization,
        completionUrl: `${getBaseUrl()}/offerings/${offeringId}`,
        notificationText: 'Someone has applied to purchase shares in your offering.',
      });
      refetchAllContracts();
      setButtonStep('confirmed');
      toast.success(`You have applied to ${isAskOrder ? 'purchase' : 'sell'} shares.`);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type SetAllowanceProps = {
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  spenderAddress: String0x | undefined;
  amount: number | undefined;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
};

export const setAllowance = async ({
  paymentTokenAddress,
  paymentTokenDecimals,
  spenderAddress,
  amount,
  setButtonStep,
  setModal,
}: SetAllowanceProps) => {
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: paymentTokenAddress as String0x,
        abi: erc20ABI,
        functionName: 'approve',
        args: [spenderAddress as String0x, toContractNumber(amount as number, paymentTokenDecimals as number)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type ApproveRejectSwapProps = {
  transferEventArgs?: {
    shareContractAddress: String0x | undefined;

    recipientAddress: '' | `0x${string}` | undefined;
    senderAddress: String0x | undefined | '';
    numShares: number | undefined;
    price: number | undefined;
    currencyCode: CurrencyCode | undefined;
    partition: String0x | undefined | '';
    addApprovalRecord: (arg0: {
      variables: {
        shareContractAddress: String0x | undefined;
        orderIndex: number;
        recipientAddress: '' | `0x${string}` | undefined;
        senderAddress: String0x | undefined | '';
        amount: number | undefined;
        price: string | undefined;
        currencyCode: CurrencyCode | undefined;
        partition: String0x | undefined | '';
        transactionHash: String0x;
        type: ShareTransferEventType;
      };
    }) => Promise<any> | undefined;
  };
  swapContractAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  contractIndex: number;
  isDisapprove: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};
export const approveRejectSwap = async ({
  transferEventArgs,
  swapContractAddress,
  paymentTokenDecimals,
  contractIndex,
  isDisapprove,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: ApproveRejectSwapProps) => {
  setButtonStep('step1');

  const contractFunctionName = isDisapprove ? 'managerResetOrder' : 'approveOrder';
  const call = async () => {
    if (!swapContractAddress) {
      throw new Error('No swap contract address');
    }
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: contractFunctionName,
        args: [BigInt(contractIndex)],
      });
      const { hash } = await writeContract(request);
      const transactionDetails = await waitForTransaction({
        hash: hash,
      });
      if (transferEventArgs) {
        const {
          shareContractAddress,
          recipientAddress,
          senderAddress,
          numShares,
          price,
          currencyCode,
          partition,
          addApprovalRecord,
        } = transferEventArgs;

        await addApprovalRecord({
          variables: {
            shareContractAddress: shareContractAddress,
            orderIndex: contractIndex,
            recipientAddress: recipientAddress,
            senderAddress: senderAddress,
            amount: numShares,
            price: toContractNumber(price as number, paymentTokenDecimals as number).toString(),
            currencyCode: currencyCode,
            transactionHash: transactionDetails.transactionHash,
            partition: partition,
            type: isDisapprove ? ShareTransferEventType.Disapproval : ShareTransferEventType.Approval,
          },
        });
      }
      setButtonStep('confirmed');
      toast.success(`You have ${isDisapprove ? 'disapproved' : 'approved'} the swap.`);
      refetchAllContracts();
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type CancelOrderProps = {
  swapContractAddress: String0x | undefined;
  contractIndex: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  handleArchive: (archive: boolean) => Promise<any>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const cancelSwap = async ({
  swapContractAddress,
  contractIndex,
  setButtonStep,
  handleArchive,
  setModal,
  refetchAllContracts,
}: CancelOrderProps) => {
  setButtonStep('step1');
  const call = async () => {
    if (!swapContractAddress) {
      throw new Error('No swap contract address');
    }
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'cancelOrder',
        args: [BigInt(contractIndex)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      handleArchive && handleArchive(true);
      setButtonStep('confirmed');
      toast.success(`You have cancelled your sale.`);
      setModal && setModal(false);
      refetchAllContracts();
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type CancelAcceptanceProps = {
  swapContractAddress: String0x | undefined;
  contractIndex: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const cancelAcceptance = async ({
  swapContractAddress,
  contractIndex,
  setButtonStep,
  setModal,
  refetchAllContracts,
}: CancelAcceptanceProps) => {
  setButtonStep('step1');
  const call = async () => {
    if (!swapContractAddress) {
      throw new Error('No swap contract address');
    }
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'cancelAcceptance',
        args: [BigInt(contractIndex)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have cancelled your offer.`);
      setModal && setModal(false);
      refetchAllContracts();
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type ClaimProceedsProps = {
  swapContractAddress: String0x | undefined;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  refetchAllContracts?: () => void;
};

export const claimProceeds = async ({
  swapContractAddress,
  setButtonStep,
  refetchAllContracts,
}: ClaimProceedsProps) => {
  const call = async () => {
    setButtonStep('step1');
    if (!swapContractAddress) {
      throw new Error('No swap contract address');
    }
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'claimProceeds',
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      refetchAllContracts && refetchAllContracts();
      toast.success(`You have claimed your proceeds.`);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type FillOrderProps = {
  swapContractAddress: String0x | undefined;
  shareContractAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  amount: number;
  price: number;
  paymentTokenDecimals: number;
  contractIndex: number;
  partition: String0x;
  recipient: String0x;
  sender: String0x;
  offeringId: string;
  organization: Organization;
  addTrade: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const fillOrder = async ({
  swapContractAddress,
  amount,
  price,
  paymentTokenAddress,
  paymentTokenDecimals,
  contractIndex,
  partition,
  recipient,
  sender,
  shareContractAddress,
  offeringId,
  organization,
  addTrade,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: FillOrderProps) => {
  const contractAmount = toContractNumber(amount, shareContractDecimals);
  const call = async () => {
    if (!swapContractAddress || !shareContractAddress) {
      throw new Error('No swap or share contract address');
    }

    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'fillOrder',
        args: [BigInt(contractIndex), contractAmount],
        value: BigInt(0),
      });
      const { hash } = await writeContract(request);
      const transactionDetails = await waitForTransaction({
        hash: hash,
      });
      await addTrade({
        variables: {
          shareContractAddress,
          recipientAddress: recipient,
          senderAddress: sender,
          amount: amount,
          price: contractAmount.toString(),
          currencyCode: getCurrencyById(paymentTokenAddress)?.value,
          transactionHash: transactionDetails.transactionHash,
          partition: partition,
          type: ShareTransferEventType.Trade,
        },
      });
      await handleTradeExecutionNotification({
        organization,
        completionUrl: `${getBaseUrl()}/offerings/${offeringId}`,
        notificationText: `${sender} has sold ${amount} shares to ${recipient} at ${numberWithCommas(
          price,
          2
        )} per share. The transaction hash is ${transactionDetails.transactionHash}.`,
      });

      toast.success(`You have completed the swap.`);
      refetchAllContracts();
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};
