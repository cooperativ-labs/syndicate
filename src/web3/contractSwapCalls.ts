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
import { ShareTransferEventType } from 'types';
import { emailNotificationContent } from '@src/services/postmark';
import { getBaseUrl } from '@src/utils/helpersURL';
import axios from 'axios';

// const handleEmailNotification = async (address: string, completionUrl: string) => {
//   const notificationText = 'Someone has applied to purchase shares in your offering.';
//   const url = `${getBaseUrl()}/offerings/${offeringId}`;

//   const to = address;
//   const subject = 'Welcome to Cooperativ.io';
//   const { html, text } = emailNotificationContent(notificationText, url);
//   const htmlBody = html;
//   const textBody = text;

//   try {
//     await axios.post('/api/send-email', { to, subject, htmlBody, textBody });
//   } catch (error) {
//     console.error(error);
//   }
// };

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
  myShares?: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  createOrder: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  addPartition?: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchAllContracts: () => void;
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
  myShares,
  setModal,
  setButtonStep,
  createOrder,
  addPartition,
  refetchAllContracts,
}: SubmitSwapProps) => {
  setButtonStep('submitting');
  const call = async () => {
    const setPartition = partition === '0xNew' ? bytes32FromString(newPartition) : (partition as String0x);
    try {
      if (!isContractOwner && numShares > myShares!) {
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
          offeringId: offeringId,
          swapContractAddress: swapContractAddress,
          minUnits: minUnits,
          maxUnits: maxUnits,
          initiator: userWalletAddress,
          visible: visible,
          transactionHash: transactionReceipt.transactionHash,
        },
      });
      refetchAllContracts();
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
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const acceptOrder = async ({
  swapContractAddress,
  amount,
  contractIndex,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: AcceptOrderProps) => {
  setButtonStep('submitting');
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
      refetchAllContracts();
      setButtonStep('confirmed');
      toast.success(`You have applied to purchase shares.`);
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
  setButtonStep('submitting');
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
      setButtonStep('confirmed');
      toast.success(`You have set contract allowance to ${numberWithCommas(amount)}.`);
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

// export const adjustAllowance = async ({
//   paymentTokenAddress,
//   paymentTokenDecimals,
//   spenderAddress,
//   amount: amountIncrease,
//   setButtonStep,
//   setModal,
// }: SetAllowanceProps) => {
//   setButtonStep('submitting');
//   const call = async () => {
//     try {
//       const { request } = await prepareWriteContract({
//         address: paymentTokenAddress,
//         abi: erc20ABI,
//         functionName: 'increaseAllowance',
//         args: [spenderAddress, toContractNumber(amountIncrease, paymentTokenDecimals)],
//       });
//       const { hash } = await writeContract(request);
//       await waitForTransaction({
//         hash: hash,
//       });
//       setButtonStep('confirmed');
//       toast.success(`You have increased contract allowance.`);
//       setModal && setModal(false);
//     } catch (e) {
//       StandardChainErrorHandling(e, setButtonStep);
//     }
//   };
//   await call();
// };

type ApproveRejectSwapProps = {
  transferEventArgs?: {
    shareContractAddress: String0x | undefined;
    recipientAddress: '' | `0x${string}` | undefined;
    senderAddress: String0x | undefined | '';
    numShares: number | undefined;
    decimalAdjustedPrice: number | undefined;
    partition: String0x | undefined | '';
    addApprovalRecord: (arg0: {
      variables: {
        shareContractAddress: String0x | undefined;
        recipientAddress: '' | `0x${string}` | undefined;
        senderAddress: String0x | undefined | '';
        amount: number | undefined;
        price: number | undefined;
        partition: String0x | undefined | '';
        transactionHash: String0x;
        type: ShareTransferEventType;
      };
    }) => Promise<any> | undefined;
  };
  swapContractAddress: String0x | undefined;
  contractIndex: number;
  isDisapprove: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};
export const approveRejectSwap = async ({
  transferEventArgs,
  swapContractAddress,
  contractIndex,
  isDisapprove,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: ApproveRejectSwapProps) => {
  setButtonStep('submitting');
  const contractFunctionName = isDisapprove ? 'disapproveOrder' : 'approveOrder';
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
          decimalAdjustedPrice,
          partition,
          addApprovalRecord,
        } = transferEventArgs;

        await addApprovalRecord({
          variables: {
            shareContractAddress: shareContractAddress,
            recipientAddress: recipientAddress,
            senderAddress: senderAddress,
            amount: numShares,
            price: decimalAdjustedPrice,
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
  orderId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  deleteOrderObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const cancelSwap = async ({
  swapContractAddress,
  contractIndex,
  orderId,
  setButtonStep,
  deleteOrderObject,
  setModal,
  refetchAllContracts,
}: CancelOrderProps) => {
  setButtonStep('submitting');
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
      deleteOrderObject && (await deleteOrderObject({ variables: { orderId: orderId } }));
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
    setButtonStep('submitting');
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
      StandardChainErrorHandling(e);
    }
  };
  await call();
};

type FillOrderProps = {
  swapContractAddress: String0x | undefined;
  shareContractAddress: String0x | undefined;
  amount: number;
  price: number;
  contractIndex: number;
  partition: String0x;
  recipient: String0x;
  sender: String0x;
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
  contractIndex,
  partition,
  recipient,
  sender,
  shareContractAddress,
  addTrade,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: FillOrderProps) => {
  setButtonStep('submitting');
  const call = async () => {
    if (!swapContractAddress || !shareContractAddress) {
      throw new Error('No swap or share contract address');
    }
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'fillOrder',
        args: [BigInt(contractIndex), toContractNumber(amount, shareContractDecimals)],
        value: BigInt(0),
      });
      const { hash } = await writeContract(request);
      const transactionDetails = await waitForTransaction({
        hash: hash,
      });
      addTrade({
        variables: {
          shareContractAddress,
          recipientAddress: recipient,
          senderAddress: sender,
          amount: amount,
          price: price,
          transactionHash: transactionDetails.transactionHash,
          partition: partition,
          type: ShareTransferEventType.Trade,
        },
      });
      setButtonStep('confirmed');
      toast.success(`You have completed the swap.`);
      refetchAllContracts();
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};
