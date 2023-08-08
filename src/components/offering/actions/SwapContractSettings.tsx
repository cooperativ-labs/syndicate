import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CurrencyCode, Maybe, Offering, OfferingSmartContractSet, User } from 'types';
import { String0x } from '@src/web3/helpersChain';

import LoadingToggle from '@src/components/buttons/LoadingToggle';
import SectionBlock from '@src/containers/SectionBlock';
import { swapContractABI } from '@src/web3/generated';
import { useChainId, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export type SwapContractSettingsProps = {
  swapApprovalsEnabled: boolean | undefined;
  txnApprovalsEnabled: boolean | undefined;
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  offering: Offering;
  noLiveOrders: boolean;
  refetchMainContracts: () => void;
};

export type SwapContractsSettingsAdditional = SwapContractSettingsProps & {
  investmentCurrency: CurrencyCode | undefined | null;
};

const SwapContractSettings: FC<SwapContractsSettingsAdditional> = ({
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  contractSet,
  investmentCurrency,
  offering,
  noLiveOrders,
  refetchMainContracts,
}) => {
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState<'txn' | 'listing' | ''>('');
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress?.address as String0x;

  const { offeringEntity, details } = offering;
  const toggleClass = 'flex align-middle justify-between items-center ';

  const sharedContractInfo = { address: swapContractAddress, abi: swapContractABI };

  const { config: configSwapApproval } = usePrepareContractWrite({
    ...sharedContractInfo,
    functionName: 'toggleSwapApprovals',
  });
  const { config: configTxnApproval } = usePrepareContractWrite({
    ...sharedContractInfo,
    functionName: 'toggleTxnApprovals',
  });

  const { data: swapApprovalData, write: writeSwapApproval } = useContractWrite(configSwapApproval);

  const { data: txnApprovalData, write: writeTxnApproval } = useContractWrite(configTxnApproval);

  const { data: swapTransactionData } = useWaitForTransaction({
    hash: swapApprovalData?.hash,
    onSuccess: () => {
      refetchMainContracts();
      setIsLoading('');
    },
  });

  const { data: txnTransactionData } = useWaitForTransaction({
    hash: txnApprovalData?.hash,
    onSuccess: () => {
      refetchMainContracts();
      setIsLoading('');
    },
  });

  const handleSwapToggle = async () => {
    setIsLoading('listing');
    writeSwapApproval && writeSwapApproval();
  };

  const handleTxnToggle = async () => {
    setIsLoading('txn');
    writeTxnApproval && writeTxnApproval();
  };

  const swapApproval = (
    <div className={toggleClass}>
      <div className="text-sm font-medium text-gray-700 mr-2">Listings require approval</div>
      <LoadingToggle
        isLoading={isLoading === 'listing'}
        toggleSubject={swapApprovalsEnabled}
        onClick={() => handleSwapToggle()}
      />
    </div>
  );

  const txnApproval = (
    <div className={toggleClass}>
      <div className="text-sm font-medium text-gray-700 mr-2">Each transaction requires approval</div>
      <LoadingToggle
        isLoading={isLoading === 'txn'}
        toggleSubject={txnApprovalsEnabled}
        onClick={() => handleTxnToggle()}
      />
    </div>
  );
  return (
    <>
      {!shareContractAddress && 'Trading contract:'}
      {shareContractAddress && !swapContractAddress && (
        <CreateSwapContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offeringEntity?.id}
          offeringDetailsId={details?.id}
        />
      )}
      {swapContractAddress && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="font-semibold"> Trading contract: </div>
            <FormattedCryptoAddress
              chainId={chainId}
              className="text-base font-medium ml-2"
              showFull
              withCopy
              address={swapContractAddress}
            />
          </div>
          <div className="mt-4 border-2 rounded-md px-2">
            <SectionBlock className="" sectionTitle={'Trade approval settings'} mini startOpen asAccordion>
              {noLiveOrders ? (
                <div className="flex flex-col my-4 ml-10">
                  {swapApproval}
                  <hr className="my-4" />
                  {txnApproval}
                </div>
              ) : (
                <div className="flex flex-col my-4 ml-10">
                  <div className="text-sm font-medium text-gray-700 mr-2">
                    Please complete or cancel all orders before changing approval settings.
                  </div>
                </div>
              )}
            </SectionBlock>
          </div>
        </div>
      )}
    </>
  );
};

export default SwapContractSettings;
