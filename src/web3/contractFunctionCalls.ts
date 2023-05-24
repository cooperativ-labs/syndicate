import { ALGO_MyAlgoConnect as MyAlgoConnect, loadStdlib } from '@reach-sh/stdlib';
import { Dispatch, SetStateAction } from 'react';
import { String0x, StandardChainErrorHandling, bytes32FromString, hashBytes32FromString } from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
import { SaleStatusType } from '@src/utils/enumConverters';
import { waitForTransaction, writeContract, getAccount, prepareWriteContract } from 'wagmi/actions';
import { Transaction, TransactionReceipt, parseUnits } from 'viem';
import { shareContractABI, swapContractABI } from './generated';
import toast from 'react-hot-toast';

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
    } catch (e) {
      throw new Error(e);
    }
  };

  let transactionHash = '';
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { request } = await prepareWriteContract({
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
      StandardChainErrorHandling(e, setButtonStep, walletAddress);
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

export const submitOrder = async (
  values: {
    numShares: number;
    price: number;
    partition: String0x;
    minUnits: number;
    maxUnits: number;
    visible: boolean;
  },
  swapContractAddress: String0x,
  offeringId: string,
  isContractOwner: boolean,
  isAsk: boolean,
  isIssuance: boolean,
  isErc20Payment: boolean,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  createSale: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>,
  setModal?: Dispatch<SetStateAction<boolean>>,
  myShares?: number
) => {
  setButtonStep('submitting');
  const call = async () => {
    try {
      if (!isContractOwner && values.numShares > myShares) {
        throw Error('You do not have enough shares to sell.');
      }
      const { request, result } = await prepareWriteContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'initiateOrder',
        args: [values.partition, BigInt(values.numShares), BigInt(values.price), isAsk, isIssuance, isErc20Payment],
      });
      const { hash } = await writeContract(request);
      const transactionReceipt = await waitForTransaction({
        hash: hash,
      });
      const { address: userWalletAddress } = getAccount();
      await createSale({
        variables: {
          currentDate: currentDate,
          offeringId: offeringId,
          initiator: userWalletAddress,
          swapContractAddress: swapContractAddress,
          partition: values.partition,
          isAsk: isAsk,
          orderId: Number(result),
          numShares: values.numShares,
          price: values.price,
          minUnits: values.minUnits,
          maxUnits: values.maxUnits,
          visible: values.visible,
        },
      });

      setButtonStep('confirmed');
      toast.success(`You have offered ${values.numShares} shares.`);
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

export const cancelSale = async (
  reachLib: any,
  shareContractAddress: string,
  offeringId: string,
  saleId: string,
  saleStatus: SaleStatusType,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  deleteSaleObject?: (any) => void
) => {
  setButtonStep('submitting');
  // const reach = await loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, shareContractAddress);
  const call = async (f) => {
    try {
      if (saleStatus !== '-----') {
        await f();
      }
      deleteSaleObject && deleteSaleObject({ variables: { offeringId: offeringId, saleId: saleId } });
      setButtonStep('confirmed');
      setRecallContract('cancelSale');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.cancelSwap();
    return apiReturn;
  });
};

export const approveSwap = async (
  reachLib: any,
  shareContractAddress: string,
  initiator: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, shareContractAddress);
  const call = async (f) => {
    try {
      await f();
      setRecallContract('approveSwap');
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.approveSwap(initiator);
    return apiReturn;
  });
};

export const claimProceeds = async (
  reachLib: any,
  shareContractAddress: string,
  saleProceeds: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, shareContractAddress);
  const call = async (f) => {
    try {
      await f();
      setRecallContract('claimProceeds');
      setButtonStep('confirmed');
      alert(`You've claimed ${numberWithCommas(saleProceeds, 2)}. You should now see the funds in your wallet.`);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.claimSwapProceeds();
    return apiReturn;
  });
};

export const submitDistribution = async (
  reachAcc: any,
  shareContractAddress: string,
  amount: number | string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  addDistribution: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>
) => {
  setButtonStep('submitting');
  const ctc = reachAcc.contract(backendCtc, shareContractAddress);
  const call = async (f) => {
    try {
      await f();
      await addDistribution({ variables: { currentDate: currentDate, amount: amount } });
      setButtonStep('confirmed');
      setRecallContract('submitDistribution');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.dBT(loadStdlib(process.env).parseCurrency(amount));
    return apiReturn;
  });
};

export const claimDistribution = async (
  reachLib: any,
  shareContractAddress: string,
  distributionId: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  updateDistribution?: (any) => void
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, shareContractAddress);
  const contractUserPubKey = acc.getAddress();
  const normalizeRecipientAddress = reachLib.formatAddress(contractUserPubKey);
  const call = async (f) => {
    try {
      await f();
      if (updateDistribution) {
        updateDistribution({
          variables: {
            currentDate: currentDate,
            distributionId: distributionId,
            claimantAddress: normalizeRecipientAddress,
          },
        });
      }
      setRecallContract('claimBT');
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.cBT();
    return apiReturn;
  });
};
