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

type SubmitSwapProps = {
  numShares: number;
  price: number;
  partition: String0x;
  newPartition?: string;
  minUnits: number;
  maxUnits: number;
  visible: boolean;
  toc?: boolean;
  swapContractAddress: String0x;
  shareContractId?: string;
  paymentTokenDecimals: number;
  offeringId: string;
  isContractOwner: boolean;
  isAsk: boolean;
  isIssuance: boolean;
  isErc20Payment: boolean;
  myShares?: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  createSale: (
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
  createSale,
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
        address: swapContractAddress,
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
      const orderId = Number(result);
      addPartition &&
        (await addPartition({
          variables: {
            smartContractId: shareContractId,
            partition: setPartition as string,
          },
        }));
      await createSale({
        variables: {
          currentDate: currentDate,
          orderId: orderId,
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
      toast.success(`You have offered ${numShares} shares.`);
      setModal && setModal(false);
      return transactionReceipt;
    } catch (e) {
      // if (data) {
      //   const saleId = data.updateOffering.offering[0].sales[0].id;
      //   await deleteSaleObject({ variables: { offeringId: id, saleId: saleId } });
      // }
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type AcceptOrderProps = {
  swapContractAddress: String0x;
  amount: number;
  orderId: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};

export const acceptOrder = async ({
  swapContractAddress,
  amount,
  orderId,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: AcceptOrderProps) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'acceptOrder',
        args: [BigInt(orderId), toContractNumber(amount, shareContractDecimals)],
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
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  spenderAddress: String0x;
  amount: number;
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
        address: paymentTokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [spenderAddress, toContractNumber(amount, paymentTokenDecimals)],
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

export const adjustAllowance = async ({
  paymentTokenAddress,
  paymentTokenDecimals,
  spenderAddress,
  amount: amountIncrease,
  setButtonStep,
  setModal,
}: SetAllowanceProps) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: paymentTokenAddress,
        abi: erc20ABI,
        functionName: 'increaseAllowance',
        args: [spenderAddress, toContractNumber(amountIncrease, paymentTokenDecimals)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have increased contract allowance.`);
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type ApproveRejectSwapProps = {
  swapContractAddress: String0x;
  orderId: number;
  isDisapprove: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts: () => void;
};
export const approveRejectSwap = async ({
  swapContractAddress,
  orderId,
  isDisapprove,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: ApproveRejectSwapProps) => {
  setButtonStep('submitting');
  const contractFunctionName = isDisapprove ? 'disapproveOrder' : 'approveOrder';
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: contractFunctionName,
        args: [BigInt(orderId)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
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
  swapContractAddress: String0x;
  orderId: number;
  saleId: string;
  offeringId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  deleteSaleObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts?: () => void;
};

export const cancelSwap = async ({
  swapContractAddress,
  orderId,
  saleId,
  offeringId,
  setButtonStep,
  deleteSaleObject,
  setModal,
  refetchAllContracts,
}: CancelOrderProps) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'cancelOrder',
        args: [BigInt(orderId)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      deleteSaleObject && (await deleteSaleObject({ variables: { offeringId: offeringId, saleId: saleId } }));
      setButtonStep('confirmed');
      toast.success(`You have cancelled your sale.`);
      setModal && setModal(false);
      refetchAllContracts && refetchAllContracts();
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type ClaimProceedsProps = {
  swapContractAddress: String0x;
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

type AcceptOfferProps = {
  swapContractAddress: String0x;
  orderId: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  refetchAllContracts?: () => void;
};

export const acceptOffer = async ({
  swapContractAddress,
  orderId,
  setButtonStep,
  refetchAllContracts,
}: AcceptOfferProps) => {
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'acceptOrder',
        args: [BigInt(orderId)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      refetchAllContracts && refetchAllContracts();
      toast.success(`You have accepted this offer.`);
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };
  await call();
};

type FillOrderProps = {
  swapContractAddress: String0x;
  amount: number;
  orderId: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
  refetchAllContracts?: () => void;
};

export const fillOrder = async ({
  swapContractAddress,
  amount,
  orderId,
  setButtonStep,
  refetchAllContracts,
  setModal,
}: FillOrderProps) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'fillOrder',
        args: [BigInt(orderId), toContractNumber(amount, shareContractDecimals)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have completed the swap.`);
      refetchAllContracts && refetchAllContracts();
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};
