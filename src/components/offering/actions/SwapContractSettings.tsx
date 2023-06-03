import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Currency, Offering, OfferingSmartContractSet } from 'types';
import { String0x } from '@src/web3/helpersChain';

import LoadingToggle from '@src/components/buttons/LoadingToggle';
import { swapContractABI } from '@src/web3/generated';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export type SwapContractSettingsProps = {
  swapApprovalsEnabled: boolean;
  txnApprovalsEnabled: boolean;
  contractSet: OfferingSmartContractSet;
  investmentCurrency: Currency;
  offering: Offering;
  chainId: number;
  refetchMainContracts: () => void;
};

const SwapContractSettings: FC<SwapContractSettingsProps> = ({
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  contractSet,
  investmentCurrency,
  offering,
  chainId,
  refetchMainContracts,
}) => {
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
  });

  const { data: txnTransactionData } = useWaitForTransaction({
    hash: txnApprovalData?.hash,
  });

  useEffect(() => {
    if (swapTransactionData || txnTransactionData) {
      refetchMainContracts();
      setIsLoading('');
    }
  }, [swapTransactionData, txnTransactionData, refetchMainContracts, setIsLoading]);

  const handleSwapToggle = async () => {
    setIsLoading('listing');
    writeSwapApproval();
  };

  const handleTxnToggle = async () => {
    setIsLoading('txn');
    writeTxnApproval();
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
      {shareContractAddress && !swapContractAddress ? (
        <CreateSwapContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offeringEntity.id}
          offeringDetailsId={details.id}
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center">
            2. Swap contract:{' '}
            <FormattedCryptoAddress
              chainId={chainId}
              className="text-base font-medium ml-2"
              showFull
              withCopy
              address={swapContractAddress}
            />
          </div>
          <div className="flex flex-col mt-4 ml-10">
            {swapApproval}
            <hr className="my-4" />
            {txnApproval}
          </div>
        </div>
      )}
    </>
  );
};

export default SwapContractSettings;
