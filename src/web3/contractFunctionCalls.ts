import { Dispatch, SetStateAction } from 'react';
import {
  String0x,
  StandardChainErrorHandling,
  bytes32FromString,
  hashBytes32FromString,
  ChainErrorResponses,
} from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
import { SaleStatusType } from '@src/utils/enumConverters';
import { waitForTransaction, writeContract, getAccount, prepareWriteContract } from 'wagmi/actions';
import { parseUnits } from 'viem';
import { shareContractABI, swapContractABI } from './generated';
import toast from 'react-hot-toast';
import { toContractNumber } from './util';
import { erc20ABI } from 'wagmi';

export type SaleContentsType = {
  qty: number;
  qtySold: number;
  price: number;
  proceeds: number;
  saleDetails: any;
  status: SaleStatusType;
  btId: string;
};

export const addWhitelistMember = async (
  shareContractAddress: String0x,
  offeringId: string,
  walletAddress: String0x,
  chainId: number,
  name: string,
  externalId: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  addWhitelistObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>
) => {
  const addToDb = async () => {
    try {
      addWhitelistObject({
        variables: {
          currentDate: currentDate,
          addressOfferingId: walletAddress + offeringId,
          walletAddress: walletAddress,
          chainId: chainId,
          name: name,
          offering: offeringId,
          externalId: externalId,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  let transactionHash = '';
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { request, result } = await prepareWriteContract({
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: 'addToWhitelist',
        args: [walletAddress],
      });

      const { hash } = await writeContract(request);
      transactionHash = hash;
      await waitForTransaction({
        hash: hash,
      });
      await addToDb();
      setButtonStep('confirmed');
    } catch (e) {
      const parsedError = ChainErrorResponses(e);
      if (parsedError.code === 1000) {
        await addToDb();
        setButtonStep('confirmed');
      } else {
        StandardChainErrorHandling(e, setButtonStep, walletAddress);
      }
    }
  };
  await call();
  return transactionHash;
};

export const setDocument = async (
  docName: string,
  text: string,
  shareContractAddress: String0x,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  callback: () => void,
  uri: string
) => {
  const name = bytes32FromString(docName);
  const docHash = hashBytes32FromString(text) as String0x;
  try {
    const { request } = await prepareWriteContract({
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'setDocument',
      args: [name, uri, docHash],
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({
      hash: hash,
    });
    callback();
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
  return docHash;
};

export const sendShares = async (
  shareContractAddress: String0x,
  shareContractId: string,
  numShares: number,
  recipient: String0x,
  partition: string,
  newPartition: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  addPartition: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>
) => {
  const amt = parseUnits(numShares.toString() as `${number}`, 18);

  let transactionDetails = undefined;
  const call = async () => {
    setButtonStep('submitting');
    const setPartition = partition === '0xNew' ? bytes32FromString(newPartition) : (partition as String0x);
    try {
      const { request } = await prepareWriteContract({
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: 'issueByPartition',
        args: [setPartition, recipient, amt],
      });

      const { hash } = await writeContract(request);
      const details = await waitForTransaction({
        hash: hash,
      });
      transactionDetails = details;
      if (partition === '0xNew')
        await addPartition({
          variables: {
            smartContractId: shareContractId,
            partition: setPartition,
          },
        });

      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep, recipient);
    }
  };
  await call();
  return transactionDetails;
};

type SubmitSwapType = {
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
  bacDecimals: number;
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
  bacDecimals,
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
}: SubmitSwapType) => {
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
          toContractNumber(numShares, 18),
          toContractNumber(price, bacDecimals),
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
          isAsk: isAsk,
          numShares: numShares,
          minUnits: minUnits,
          maxUnits: maxUnits,
          initiator: userWalletAddress,
          price: price,
          visible: visible,
        },
      });
      // if (partition === '0xNew') {
      //   console.log('adding partition');
      //   await addPartition({
      //     variables: {
      //       smartContractId: shareContractId,
      //       partition: setPartition as string,
      //     },
      //   });
      // }

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

type SetAllowanceType = {
  paymentTokenAddress: String0x;
  swapContractAddress: String0x;
  amount: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
};
export const setAllowance = async ({
  paymentTokenAddress,
  swapContractAddress,
  amount,
  setButtonStep,
  setModal,
}: SetAllowanceType) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: paymentTokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [swapContractAddress, toContractNumber(amount, 18)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have approved the swap.`);
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

type AcceptOrderType = {
  swapContractAddress: String0x;
  amount: number;
  orderId: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
};

export const acceptOrder = async ({
  swapContractAddress,
  amount,
  orderId,
  setButtonStep,
  setModal,
}: AcceptOrderType) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'acceptOrder',
        args: [BigInt(orderId), toContractNumber(amount, 18)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have applied to purchase shares.`);
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

export const approveSwap = async (
  swapContractAddress: String0x,
  orderId: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setModal?: Dispatch<SetStateAction<boolean>>
) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'approveOrder',
        args: [BigInt(orderId)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have approved the swap.`);
      setModal && setModal(false);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

export const cancelSwap = async (
  swapContractAddress: String0x,
  orderId: number,
  saleId: string,
  offeringId: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  deleteSaleObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>,
  setModal?: Dispatch<SetStateAction<boolean>>
) => {
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
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
};

export const claimProceeds = async (
  swapContractAddress: String0x,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>
) => {
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
      toast.success(`You have claimed your proceeds.`);
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };
  await call();
};

export const acceptOffer = async (
  swapContractAddress: String0x,
  orderId: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>
) => {
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
      toast.success(`You have accepted this offer.`);
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };
  await call();
};

export const completeSwap = async (
  swapContractAddress: String0x,
  orderId: number,
  numShares: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>
) => {
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { request } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'fillOrder',
        args: [BigInt(orderId), toContractNumber(numShares, 18)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
      toast.success(`You have completed the transaction.`);
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };
  await call();
};
