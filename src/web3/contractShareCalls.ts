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

import { waitForTransaction, writeContract, prepareWriteContract } from 'wagmi/actions';
import { TransactionReceipt, parseUnits } from 'viem';
import { shareContractABI } from './generated';
import toast from 'react-hot-toast';
import { shareContractDecimals, toContractNumber } from './util';
import { ShareIssuanceTradeType } from 'types';

type AddWhitelistMemberProps = {
  shareContractAddress: String0x;
  offeringId: string;
  walletAddress: String0x;
  chainId: number;
  name: string;
  externalId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addWhitelistObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchMainContracts?: () => void;
};

export const addWhitelistMember = async ({
  shareContractAddress,
  offeringId,
  walletAddress,
  chainId,
  name,
  externalId,
  setButtonStep,
  addWhitelistObject,
  refetchMainContracts,
}: AddWhitelistMemberProps) => {
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
      const parsedError = ChainErrorResponses(e, walletAddress);
      if (parsedError.code === 1000) {
        await addToDb();
        refetchMainContracts && refetchMainContracts();
        setButtonStep('confirmed');
      } else {
        StandardChainErrorHandling(e, setButtonStep, walletAddress);
      }
    }
  };
  await call();
  return transactionHash;
};

type SetDocumentProps = {
  docName: string;
  text: string;
  shareContractAddress: String0x;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  callback: () => void;
  uri: string;
  refetchMainContracts?: () => void;
};
export const setDocument = async ({
  docName,
  text,
  shareContractAddress,
  setButtonStep,
  callback,
  uri,
  refetchMainContracts,
}: SetDocumentProps) => {
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
    refetchMainContracts && refetchMainContracts();
    callback();
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
  return docHash;
};

type SendSharesProps = {
  shareContractAddress: String0x;
  shareContractId: string;
  numShares: number;
  recipient: String0x;
  sender: String0x;
  partition: string;
  newPartition: string;
  isIssuance: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addPartition: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  addIssuance: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchMainContracts: () => void;
};

export const sendShares = async ({
  shareContractAddress,
  shareContractId,
  numShares,
  recipient,
  sender,
  partition,
  newPartition,
  isIssuance,
  setButtonStep,
  addPartition,
  addIssuance,
  refetchMainContracts,
}: SendSharesProps): Promise<TransactionReceipt> => {
  const amt = toContractNumber(numShares, shareContractDecimals);

  let transactionDetails = {} as TransactionReceipt;
  const call = async () => {
    setButtonStep('submitting');
    const setPartition = partition === '0xNew' ? bytes32FromString(newPartition) : (partition as String0x);
    const setFunctionName = isIssuance ? 'issueByPartition' : 'operatorTransferByPartition';
    const issueByPartitionArgs = [setPartition, recipient, amt] as readonly [String0x, String0x, bigint];
    const operatorTransferByPartitionArgs = [setPartition, sender, recipient, amt] as readonly [
      String0x,
      String0x,
      String0x,
      bigint
    ];
    const setArgs = isIssuance ? issueByPartitionArgs : operatorTransferByPartitionArgs;
    try {
      const { request } = await prepareWriteContract({
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: setFunctionName,
        args: setArgs,
      });

      const { hash } = await writeContract(request);
      const details = await waitForTransaction({
        hash: hash,
      });
      transactionDetails = details;
      await addIssuance({
        variables: {
          shareContractAddress,
          recipientAddress: recipient,
          senderAddress: sender,
          amount: numShares,
          transactionHash: transactionDetails.transactionHash,
          partition: setPartition,
          type: isIssuance ? ShareIssuanceTradeType.Issue : ShareIssuanceTradeType.Transfer,
        },
      });
      if (partition === '0xNew')
        await addPartition({
          variables: {
            smartContractId: shareContractId,
            partition: setPartition,
          },
        });
      refetchMainContracts();
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep, recipient);
    }
  };
  await call();
  return transactionDetails;
};

type SetContractOperatorProps = {
  shareContractAddress: String0x;
  operator: String0x;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  refetch: () => void;
};

export const setContractOperator = async ({
  shareContractAddress,
  operator,
  setButtonStep,
  refetch,
}: SetContractOperatorProps) => {
  setButtonStep('submitting');
  try {
    const { request } = await prepareWriteContract({
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'authorizeOperator',
      args: [operator],
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({
      hash: hash,
    });
    setButtonStep('confirmed');
    refetch();
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
};

type ForceTransferProps = {
  shareContractAddress: String0x;
  partition: String0x;
  amount: number;
  target: String0x;
  recipient: String0x;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addIssuance: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchContracts: () => void;
};

export const forceTransfer = async ({
  shareContractAddress,
  partition,
  amount,
  target,
  recipient,
  setButtonStep,
  addIssuance,
  refetchContracts,
}: ForceTransferProps) => {
  setButtonStep('submitting');
  const amt = toContractNumber(amount, shareContractDecimals);
  try {
    const { request } = await prepareWriteContract({
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'operatorTransferByPartition',
      args: [partition, target, recipient, toContractNumber(amount, shareContractDecimals)],
    });
    const { hash } = await writeContract(request);
    const details = await waitForTransaction({
      hash: hash,
    });
    await addIssuance({
      variables: {
        shareContractAddress,
        recipientAddress: recipient,
        senderAddress: target,
        amount: amount,
        transactionHash: details.transactionHash,
        partition: partition,
        type: ShareIssuanceTradeType.Forced,
      },
    });
    refetchContracts();
    setButtonStep('confirmed');
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
};
