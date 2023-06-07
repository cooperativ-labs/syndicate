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
import { waitForTransaction, writeContract, prepareWriteContract } from 'wagmi/actions';
import { parseUnits } from 'viem';
import { shareContractABI } from './generated';
import toast from 'react-hot-toast';
import { shareContractDecimals } from './util';

export type SaleContentsType = {
  qty: number;
  qtySold: number;
  price: number;
  proceeds: number;
  saleDetails: any;
  status: SaleStatusType;
  btId: string;
};

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
      const parsedError = ChainErrorResponses(e);
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
  partition: string;
  newPartition: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addPartition: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
  refetchMainContracts?: () => void;
};

export const sendShares = async ({
  shareContractAddress,
  shareContractId,
  numShares,
  recipient,
  partition,
  newPartition,
  setButtonStep,
  addPartition,
  refetchMainContracts,
}: SendSharesProps) => {
  const amt = parseUnits(numShares.toString() as `${number}`, shareContractDecimals);

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
      refetchMainContracts && refetchMainContracts();
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
};

export const setContractOperator = async ({
  shareContractAddress,
  operator,
  setButtonStep,
}: SetContractOperatorProps) => {
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
  } catch (e) {
    StandardChainErrorHandling(e, setButtonStep);
  }
};

// export const submitDistribution = async (
//   reachAcc: any,
//   shareContractId: string,
//   amount: number | string,
//   setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
//   setRecallContract: Dispatch<SetStateAction<string>>,
//   addDistribution: (
//     options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
//   ) => Promise<any>
// ) => {
//   setButtonStep('submitting');
//   const ctc = reachAcc.contract(backendCtc, shareContractId);
//   const call = async (f) => {
//     try {
//       await f();
//       await addDistribution({ variables: { currentDate: currentDate, amount: amount } });
//       setButtonStep('confirmed');
//       setRecallContract('submitDistribution');
//     } catch (e) {
//       StandardChainErrorHandling(e, setButtonStep);
//     }
//   };
//   const apis = ctc.a;
//   call(async () => {
//     const apiReturn = await apis.dBT(loadStdlib(process.env).parseCurrency(amount));
//     return apiReturn;
//   });
// };

// export const claimDistribution = async (
//   reachLib: any,
//   shareContractId: string,
//   distributionId: string,
//   setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
//   setRecallContract: Dispatch<SetStateAction<string>>,
//   updateDistribution?: (any) => void
// ) => {
//   setButtonStep('submitting');
//   reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
//   const acc = await reachLib.getDefaultAccount();
//   const ctc = acc.contract(backendCtc, shareContractId);
//   const contractUserPubKey = acc.getAddress();
//   const normalizeRecipientAddress = reachLib.formatAddress(contractUserPubKey);
//   const call = async (f) => {
//     try {
//       await f();
//       if (updateDistribution) {
//         updateDistribution({
//           variables: {
//             currentDate: currentDate,
//             distributionId: distributionId,
//             claimantAddress: normalizeRecipientAddress,
//           },
//         });
//       }
//       setRecallContract('claimBT');
//       setButtonStep('confirmed');
//     } catch (e) {
//       StandardChainErrorHandling(e, setButtonStep);
//     }
//   };
//   const apis = ctc.a;
//   call(async () => {
//     const apiReturn = await apis.cBT();
//     return apiReturn;
//   });
// };
