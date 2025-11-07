import {
  CurrencyCodeType,
  Organization,
  ShareTransferEventType,
  WhitelistTransactionType,
} from "@/types";
import { LoadingButtonStateType } from "@src/components/buttons/Button";
import { handleWhitelistUpdateNotification } from "@src/components/notifications/notificationFunctions";
import { currentDate } from "@src/utils/graphQueries/gqlUtils";
import { getBaseUrl } from "@src/utils/helpersURL";
import { getWagmiConfig } from "@src/web3/wagmi";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { parseUnits, TransactionReceipt } from "viem";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

import { shareContractABI } from "./generated";
import {
  addressWithoutEns,
  bytes32FromString,
  ChainErrorResponses,
  hashBytes32FromString,
  splitAddress,
  StandardChainErrorHandling,
  String0x,
} from "./helpersChain";
import { shareContractDecimals, toContractNumber } from "./util";
import { AddTransferEventResult } from "@src/utils/actions/orderActions";
import {
  AddContractPartitionParams,
  AddContractPartitionResult,
} from "@src/utils/actions/cryptoActions";
import {
  addTransferEvent,
  AddTransferEventParams,
} from "@src/utils/actions/orderActions";
import {
  AddWhitelistMemberParams,
  UpdateWhitelistParams,
} from "@src/utils/actions/offeringActions";

type AddWhitelistMemberProps = {
  shareContractAddress: String0x;
  offeringId: string;
  walletAddress: String0x;
  chainId?: number;
  name?: string;
  externalId?: string;
  organizationId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  updateWhitelist: (
    params: UpdateWhitelistParams,
  ) => Promise<void>;
  refetchMainContracts?: () => void;
  triggerInvestorListRefresh?: () => void;
};

export const addWhitelistMember = async ({
  shareContractAddress,
  offeringId,
  walletAddress,
  organizationId,
  setButtonStep,
  updateWhitelist,
  refetchMainContracts,
  triggerInvestorListRefresh,
}: AddWhitelistMemberProps) => {
  const config = getWagmiConfig();
  const addToDb = async (transactionHash: string) => {
    try {
      updateWhitelist({
        organizationId: organizationId,
        offeringId: offeringId,
        offeringParticipantId: walletAddress + offeringId,
        transactionHash: transactionHash,
        type: WhitelistTransactionType.ADD,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
  const call = async () => {
    setButtonStep("step1");
    try {
      const { request, result } = await simulateContract(config, {
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: "addToWhitelist",
        args: [walletAddress],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, {
        hash,
      });
      await addToDb(hash);
      await handleWhitelistUpdateNotification({
        organizationId: organizationId,
        completionUrl: `${getBaseUrl()}/offerings/${offeringId}`,
        notificationText:
          `${walletAddress} was added to your offering's whitelist.`,
      });
      triggerInvestorListRefresh && triggerInvestorListRefresh();
      refetchMainContracts && refetchMainContracts();
      toast.success(`${walletAddress} was added to your offering's whitelist.`);
      setButtonStep("confirmed");
    } catch (e) {
      const parsedError = ChainErrorResponses(e, walletAddress);
      if (parsedError.code === 1001) {
        await addToDb("unknown");

        setButtonStep("confirmed");
      } else {
        StandardChainErrorHandling(e, setButtonStep, walletAddress);
      }
    }
  };
  await call();
};

type RemoveWhitelistMemberProps = {
  shareContractAddress: String0x;
  offeringId: string;
  walletAddress: String0x;
  organizationId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  updateWhitelist: (
    params: UpdateWhitelistParams,
  ) => Promise<void>;
  refetchMainContracts?: () => void;
  triggerInvestorListRefresh?: () => void;
};

export const removeWhitelistMember = async ({
  shareContractAddress,
  offeringId,
  walletAddress,
  organizationId,
  setButtonStep,
  updateWhitelist,
  refetchMainContracts,
  triggerInvestorListRefresh,
}: RemoveWhitelistMemberProps) => {
  const config = getWagmiConfig();
  const call = async () => {
    setButtonStep("step1");
    try {
      const { request } = await simulateContract(config, {
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: "removeFromWhitelist",
        args: [walletAddress],
      });
      const hash = await writeContract(config, request);
      await waitForTransactionReceipt(config, {
        hash,
      });
      await updateWhitelist({
        organizationId: organizationId,
        offeringId: offeringId,
        offeringParticipantId: walletAddress + offeringId,
        transactionHash: hash,
        type: WhitelistTransactionType.REMOVE,
      });
      await handleWhitelistUpdateNotification({
        organizationId: organizationId,
        completionUrl: `${getBaseUrl()}/offerings/${offeringId}`,
        notificationText:
          `${walletAddress} was removed from your offering's whitelist.`,
      });
      refetchMainContracts && refetchMainContracts();
      triggerInvestorListRefresh && triggerInvestorListRefresh();
      toast.success(
        `${walletAddress} was removed from your offering's whitelist.`,
      );
      setButtonStep("confirmed");
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep, walletAddress);
    }
  };
  await call();
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
  const config = getWagmiConfig();
  const name = bytes32FromString(docName);
  const docHash = hashBytes32FromString(text) as String0x;
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: "setDocument",
      args: [name, uri, docHash],
    });
    const hash = await writeContract(config, request);
    await waitForTransactionReceipt(config, {
      hash,
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
  addPartition: (
    params: AddContractPartitionParams,
  ) => Promise<AddContractPartitionResult>;
  addIssuance: (
    params: AddTransferEventParams,
  ) => Promise<AddTransferEventResult>;
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
  refetchMainContracts,
}: SendSharesProps): Promise<TransactionReceipt> => {
  const amt = toContractNumber(numShares, shareContractDecimals);
  const config = getWagmiConfig();
  let transactionDetails = {} as TransactionReceipt;
  const call = async () => {
    setButtonStep("step1");
    const setPartition = partition === "0xNew"
      ? bytes32FromString(newPartition)
      : (partition as String0x);
    const setFunctionName = isIssuance
      ? "issueByPartition"
      : "operatorTransferByPartition";
    const issueByPartitionArgs = [setPartition, recipient, amt] as readonly [
      String0x,
      String0x,
      bigint,
    ];
    const operatorTransferByPartitionArgs = [
      setPartition,
      sender,
      recipient,
      amt,
    ] as readonly [
      String0x,
      String0x,
      String0x,
      bigint,
    ];
    const setArgs = isIssuance
      ? issueByPartitionArgs
      : operatorTransferByPartitionArgs;
    const setType = isIssuance
      ? ShareTransferEventType.ISSUANCE
      : ShareTransferEventType.TRANSFER;
    try {
      const { request } = await simulateContract(config, {
        address: shareContractAddress,
        abi: shareContractABI,
        functionName: setFunctionName,
        args: setArgs,
      });

      const hash = await writeContract(config, request);
      const details = await waitForTransactionReceipt(config, {
        hash,
      });
      transactionDetails = details;
      await addIssuance({
        shareContractAddress: shareContractAddress,
        recipientAddress: recipient,
        senderAddress: sender,
        amount: numShares,
        currencyCode,
        price: toContractNumber(
          price as number,
          paymentTokenDecimals as number,
        ).toString(),
        transactionHash: transactionDetails.transactionHash,
        partition: setPartition,
        type: setType,
      });
      if (partition === "0xNew") {
        await addPartition({
          smartContractId: shareContractId,
          partition: setPartition,
        });
      }
      refetchMainContracts();
      toast.success(
        `${numShares} shares sent to ${
          addressWithoutEns({
            address: recipient,
          })
        }. Transaction hash: ${
          splitAddress(transactionDetails.transactionHash)
        }`,
      );
      setButtonStep("confirmed");
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
  refetch,
}: SetContractOperatorProps) => {
  const config = getWagmiConfig();
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: "authorizeOperator",
      args: [operator],
    });
    const hash = await writeContract(config, request);
    await waitForTransactionReceipt(config, {
      hash,
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

  refetchContracts,
}: ForceTransferProps) => {
  const config = getWagmiConfig();
  setButtonStep("step1");
  const amt = toContractNumber(amount, shareContractDecimals);
  try {
    const { request } = await simulateContract(config, {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: "operatorTransferByPartition",
      args: [partition, target, recipient, amt],
    });
    const hash = await writeContract(config, request);
    const details = await waitForTransactionReceipt(config, {
      hash,
    });
    await addTransferEvent({
      shareContractAddress: shareContractAddress,
      recipientAddress: recipient,
      senderAddress: target,
      amount: amount,
      transactionHash: details.transactionHash,
      partition: partition,
      type: ShareTransferEventType.FORCED,
    });
    refetchContracts();
    setButtonStep("confirmed");
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
};
