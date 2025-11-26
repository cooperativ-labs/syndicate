import { useOffering } from '@contexts/OfferingContext';
import LoadingToggle from '@src/components/buttons/LoadingToggle';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { SwapContractSettingsProps } from '@src/components/investor/tradingForms/offering-actions-types';
import SectionBlock from '@src/containers/SectionBlock';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import CreateSwapContract from '../CreateSwapContract';

const SwapContractSettings: FC<SwapContractSettingsProps> = ({
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  contractSet,
  investmentCurrency,
  noLiveOrders
}) => {
  const chainId = useChainId();
  const [isLoading, setIsLoading] = useState<'txn' | 'listing' | ''>('');
  const [toggleStates, setToggleStates] = useState<{ txn: boolean; listing: boolean }>({
    txn: txnApprovalsEnabled || false,
    listing: swapApprovalsEnabled || false
  });
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress?.address as String0x;

  const { legalEntity, offering } = useOffering();
  const organizationId = legalEntity?.organization_id;
  const toggleClass = 'flex align-middle justify-between items-center ';

  const sharedContractInfo = { address: swapContractAddress, abi: swapContractABI };

  const { writeContract: writeSwapApproval, data: swapApprovalData } = useWriteContract();

  const { writeContract: writeTxnApproval, data: txnApprovalData } = useWriteContract();

  const { data: swapTransactionData } = useWaitForTransactionReceipt({
    hash: swapApprovalData
  });

  const { data: txnTransactionData } = useWaitForTransactionReceipt({
    hash: txnApprovalData
  });

  useEffect(() => {
    if (swapTransactionData) {
      if (swapTransactionData?.status === 'success') {
        setToggleStates({
          txn: toggleStates.txn,
          listing: !toggleStates.listing
        });
        setIsLoading('');
      } else {
        alert('Setting change failed');
        setIsLoading('');
      }
    }
  }, [swapTransactionData]);

  useEffect(() => {
    if (txnTransactionData) {
      if (txnTransactionData?.status === 'success') {
        setToggleStates({
          txn: !toggleStates.txn,
          listing: toggleStates.listing
        });
        setIsLoading('');
      } else {
        alert('Setting change failed');
        setIsLoading('');
      }
    }
  }, [txnTransactionData]);

  const handleSwapToggle = async () => {
    setIsLoading('listing');
    writeSwapApproval({
      ...sharedContractInfo,
      functionName: 'toggleSwapApprovals'
    });
  };

  const handleTxnToggle = async () => {
    setIsLoading('txn');
    writeTxnApproval({
      ...sharedContractInfo,
      functionName: 'toggleTxnApprovals'
    });
  };

  const swapApproval = (
    <div className={toggleClass}>
      <div className='text-sm font-medium text-gray-700 mr-2'>Listings require approval</div>
      <LoadingToggle
        isLoading={isLoading === 'listing'}
        toggleSubject={toggleStates.listing}
        onClick={() => handleSwapToggle()}
      />
    </div>
  );

  const txnApproval = (
    <div className={toggleClass}>
      <div className='text-sm font-medium text-gray-700 mr-2'>
        Each transaction requires approval
      </div>
      <LoadingToggle
        isLoading={isLoading === 'txn'}
        toggleSubject={toggleStates.txn}
        onClick={() => handleTxnToggle()}
      />
    </div>
  );
  return (
    <>
      {shareContractAddress && !swapContractAddress && (
        <CreateSwapContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={legalEntity?.id.toString()}
          offeringId={offering.id.toString()}
          organizationId={organizationId.toString()}
        />
      )}
      {swapContractAddress && (
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-semibold text-lg'>Trading contract: </h1>
            <FormattedCryptoAddress
              chainId={chainId}
              className='text-sm text-gray-500 font-medium'
              showFull
              withCopy
              address={swapContractAddress}
            />
          </div>

          <SectionBlock
            className='border rounded-lg p-3'
            sectionTitle={'Trade approval settings'}
            mini
            startOpen
            asAccordion
          >
            {noLiveOrders ? (
              <div className='flex flex-col mt-4 ml-6'>
                {swapApproval}
                <hr className='my-4' />
                {txnApproval}
              </div>
            ) : (
              <div className='flex flex-col my-4 ml-10'>
                <div className='text-sm font-medium text-gray-700 mr-2'>
                  Please complete or cancel all orders before changing approval settings.
                </div>
              </div>
            )}
          </SectionBlock>
        </div>
      )}
    </>
  );
};

export default SwapContractSettings;
