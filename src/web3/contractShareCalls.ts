import { handleWhitelistUpdateNotification } from '@src/components/notifications/notificationFunctions';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { AddContractPartitionParams } from '@src/utils/actions/cryptoActions';
import { upsertWhitelistMember } from '@src/utils/actions/offeringActions';
import { AddTransferEventResult } from '@src/utils/actions/orderActions';
import { addTransferEvent, AddTransferEventParams } from '@src/utils/actions/orderActions';
import { getBaseUrl } from '@src/utils/helpersURL';
import { getWagmiConfig } from '@src/web3/wagmi';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { TransactionReceipt } from 'viem';
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';

import {
  CurrencyCodeType,
  Organization,
  RevalidationPath,
  ShareTransferEventType,
  WhitelistTransactionType
} from '@/types';

import { shareContractABI } from './generated';
import {
  addressWithoutEns,
  bytes32FromString,
  ChainErrorResponses,
  hashBytes32FromString,
  splitAddress,
  StandardChainErrorHandling,
  String0x
} from './helpersChain';
import { shareContractDecimals, toContractNumber } from './util';

type UpsertMemberProps = {
  shareContractAddress: String0x;
  offeringId: string | number;
  walletAddress: String0x;
  organizationId: string | number;
  chainId: number;
  name?: string | null;
  externalId?: string | null;
  type: typeof WhitelistTransactionType.ADD | typeof WhitelistTransactionType.REMOVE;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  revalidationPath: RevalidationPath | undefined;
};

export const upsertMember = async ({
  shareContractAddress,
  offeringId,
  walletAddress,
  organizationId,
  chainId,
  name,
  externalId,
  type,
  setButtonStep,
  revalidationPath
}: UpsertMemberProps) => {
  const config = getWagmiConfig();

  const addToDb = async (transactionHash: string) => {
    try {
      await upsertWhitelistMember({
        offeringId: offeringId,
        addressOfferingId: walletAddress + offeringId,
        walletAddress: walletAddress,
        chainId: chainId,
        name: name,
        externalId: externalId,
        transactionHash: transactionHash,
        type,
        revalidationPath: revalidationPath
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  setButtonStep('step1');
  const contractFunctionName =
    type === WhitelistTransactionType.ADD ? 'addToWhitelist' : 'removeFromWhitelist';
  const actionText = type === WhitelistTransactionType.ADD ? 'added to' : 'removed from';
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: contractFunctionName,
      args: [walletAddress]
    });
    const hash = await writeContract(config, request);
    await waitForTransactionReceipt(config, {
      hash
    });

    await addToDb(hash);
    // await handleWhitelistUpdateNotification({
    //   organizationId: organizationId,
    //   completionUrl: `${getBaseUrl()}/offerings/${offeringId}`,
    //   notificationText:
    //     `${walletAddress} was ${actionText} your offering's whitelist.`,
    // });

    toast.success(`${walletAddress} was ${actionText} your offering's whitelist.`);
    setButtonStep('confirmed');
  } catch (e) {
    const parsedError = ChainErrorResponses(e, walletAddress);
    if (parsedError.code === 1001) {
      await addToDb('unknown');

      setButtonStep('confirmed');
    } else {
      StandardChainErrorHandling(e, setButtonStep, walletAddress);
    }
  }
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
  refetchMainContracts
}: SetDocumentProps) => {
  const config = getWagmiConfig();
  const name = bytes32FromString(docName);
  const docHash = hashBytes32FromString(text) as String0x;
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'setDocument',
      args: [name, uri, docHash]
    });
    const hash = await writeContract(config, request);
    await waitForTransactionReceipt(config, {
      hash
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
  paymentTokenDecimals: number | undefined;
  shareContractId: string;
  numShares: number;
  price: number;
  currencyCode: CurrencyCodeType;
  recipient: String0x;
  sender: String0x;
  partition: string;
  newPartition: string;
  isIssuance: boolean;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addPartition: (params: AddContractPartitionParams) => Promise<void>;
  addIssuance: (params: AddTransferEventParams) => Promise<AddTransferEventResult>;
  refetchMainContracts: () => void;
};

export const sendShares = async ({
  shareContractAddress,
  paymentTokenDecimals,
  shareContractId,
  numShares,
  price,
  currencyCode,
  recipient,
  sender,
  partition,
  newPartition,
  isIssuance,
  setButtonStep,
  addPartition,
  addIssuance,
  refetchMainContracts
}: SendSharesProps): Promise<TransactionReceipt> => {
  const amt = toContractNumber(numShares, shareContractDecimals);
  const config = getWagmiConfig();
  let transactionDetails = {} as TransactionReceipt;
  const call = async () => {
    setButtonStep('step1');
    const setPartition =
      partition === '0xNew' ? bytes32FromString(newPartition) : (partition as String0x);

    const buildRequest = async (): Promise<Parameters<typeof writeContract>[1]> => {
      if (isIssuance) {
        const { request } = await simulateContract(config, {
          address: shareContractAddress,
          abi: shareContractABI,
          functionName: 'issueByPartition',
          args: [setPartition, recipient, amt]
        });
        return request;
      }
      const { request } = await simulateContract(config, {
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: 'operatorTransferByPartition',
        args: [setPartition, sender, recipient, amt]
      });
      return request;
    };

    try {
      const request = await buildRequest();
      const hash = await writeContract(config, request);
      const details = await waitForTransactionReceipt(config, {
        hash
      });
      transactionDetails = details;
      await addIssuance({
        shareContractAddress: shareContractAddress,
        recipientAddress: recipient,
        senderAddress: sender,
        amount: numShares,
        currencyCode,
        price: toContractNumber(price as number, paymentTokenDecimals as number).toString(),
        transactionHash: transactionDetails.transactionHash,
        partition: setPartition,
        type: isIssuance ? ShareTransferEventType.ISSUANCE : ShareTransferEventType.TRANSFER
      });
      if (partition === '0xNew') {
        await addPartition({
          smartContractId: shareContractId,
          partition: setPartition
        });
      }
      refetchMainContracts();
      toast.success(
        `${numShares} shares sent to ${addressWithoutEns({
          address: recipient
        })}. Transaction hash: ${splitAddress(transactionDetails.transactionHash)}`
      );
      setButtonStep('confirmed');
    } catch (e: any) {
      toast.error(`Error sending shares: ${e.message}`);
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
  refetch
}: SetContractOperatorProps) => {
  const config = getWagmiConfig();
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'authorizeOperator',
      args: [operator]
    });
    const hash = await writeContract(config, request);
    await waitForTransactionReceipt(config, {
      hash
    });
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

  refetchContracts: () => void;
};

export const forceTransfer = async ({
  shareContractAddress,
  partition,
  amount,
  target,
  recipient,
  setButtonStep,

  refetchContracts
}: ForceTransferProps) => {
  const config = getWagmiConfig();
  setButtonStep('step1');
  const amt = toContractNumber(amount, shareContractDecimals);
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'operatorTransferByPartition',
      args: [partition, target, recipient, amt]
    });
    const hash = await writeContract(config, request);
    const details = await waitForTransactionReceipt(config, {
      hash
    });
    await addTransferEvent({
      shareContractAddress: shareContractAddress,
      recipientAddress: recipient,
      senderAddress: target,
      amount: amount,
      transactionHash: details.transactionHash,
      partition: partition,
      type: ShareTransferEventType.FORCED
    });
    refetchContracts();
    setButtonStep('confirmed');
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
};
