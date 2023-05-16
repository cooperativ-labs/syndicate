import abi, * as backendCtc from './ABI';
import { ALGO_MyAlgoConnect as MyAlgoConnect, loadStdlib } from '@reach-sh/stdlib';
import { Dispatch, SetStateAction, useState } from 'react';
import { ContractAddressType, StandardChainErrorHandling } from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
import { SaleStatusType } from '@src/utils/enumConverters';
import { parseEther, parseUnits } from 'ethers/lib/utils.js';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import { prepareWriteContract, writeContract } from '@wagmi/core';

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
  contractId: ContractAddressType,
  offeringId: string,
  walletAddress: ContractAddressType,
  chainId: number,
  name: string,
  externalId: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  addWhitelistObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>
) => {
  setButtonStep('submitting');

  const config = await prepareWriteContract({
    address: contractId,
    abi: abi,
    functionName: 'addToWhitelist',
    args: [walletAddress],
  });

  let transactionDetails = { hash: '', wait: () => {} };
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { hash, wait } = await writeContract(config).catch((e) => {
        console.log('error: ', e);
        return { hash: '', wait: () => {} };
      });
      transactionDetails = { hash: hash, wait: wait };
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
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  await call();
  return transactionDetails;
};

export const sendShares = async (
  contractId: ContractAddressType,
  offeringId: string,
  numShares: number,
  recipient: ContractAddressType,
  chainId: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  addWhitelistObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>,
  partition: ContractAddressType
) => {
  const amt = parseUnits(numShares.toString(), 18);

  const config = await prepareWriteContract({
    address: contractId,
    abi: abi,
    functionName: 'issueByPartition',
    args: [partition, recipient, amt],
  });
  let transactionDetails = { hash: '', wait: () => {} };
  const call = async () => {
    setButtonStep('submitting');
    try {
      const { hash, wait } = await writeContract(config);
      transactionDetails = { hash: hash, wait: wait };
      await addWhitelistObject({
        variables: {
          currentDate: currentDate,
          addressOfferingId: recipient + offeringId,
          walletAddress: recipient,
          chainId: chainId,
          offering: offeringId,
        },
      });

      setButtonStep('confirmed');
      setRecallContract('sendShares');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep, recipient);
    }
  };
  await call();
  return transactionDetails;
};

export const submitOffer = async (
  reachLib: any,
  contractId: string,
  offeringId: string,
  isContractOwner: boolean,
  myShares: number,
  numShares: number,
  price: number,
  minUnits: number,
  maxUnits: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  setModal: Dispatch<SetStateAction<boolean>>,
  createSaleObject: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>,
  deleteSaleObject?: (any) => void
) => {
  setButtonStep('submitting');
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, contractId);
  const contractUserPubKey = acc.getAddress();
  const normalizeRecipientAddress = reachLib.formatAddress(contractUserPubKey);
  const call = async (f) => {
    try {
      if (!isContractOwner && numShares > myShares) {
        throw Error;
      }
      await createSaleObject({
        variables: {
          currentDate: currentDate,
          offeringId: offeringId,
          smartContractId: contractId,
          initiator: normalizeRecipientAddress,
          numShares: numShares,
          minUnits: minUnits,
          maxUnits: maxUnits,
          price: price,
          visible: true,
        },
      });
      await f();
      setButtonStep('confirmed');
      setRecallContract('submitOffer');
      alert(`You have offered ${numShares} shares.`);
      setModal(false);
    } catch (e) {
      // if (data) {
      //   const saleId = data.updateOffering.offering[0].sales[0].id;
      //   await deleteSaleObject({ variables: { offeringId: id, saleId: saleId } });
      // }
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  const apis = ctc.a;
  call(async () => {
    const apiReturn = await apis.initSwap(loadStdlib(process.env).parseCurrency(numShares), price, isContractOwner);
    return apiReturn;
  });
};

export const cancelSale = async (
  reachLib: any,
  contractId: string,
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
  const ctc = acc.contract(backendCtc, contractId);
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
  contractId: string,
  initiator: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, contractId);
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
  contractId: string,
  saleProceeds: number,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, contractId);
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
  contractId: string,
  amount: number | string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  addDistribution: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>
) => {
  setButtonStep('submitting');
  const ctc = reachAcc.contract(backendCtc, contractId);
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
  contractId: string,
  distributionId: string,
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>,
  setRecallContract: Dispatch<SetStateAction<string>>,
  updateDistribution?: (any) => void
) => {
  setButtonStep('submitting');
  reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
  const acc = await reachLib.getDefaultAccount();
  const ctc = acc.contract(backendCtc, contractId);
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
