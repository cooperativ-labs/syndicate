import { useOffering } from '@contexts/OfferingContext';
import ClickToEditItem from '@src/components/form-components/ClickToEditItem';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { Button } from '@src/components/ui/button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { Separator } from '@src/components/ui/separator';
import SectionBlock from '@src/containers/SectionBlock';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getIsEditorOrAdmin, renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { upsertMember } from '@src/web3/contractShareCalls';
import { shareContractABI } from '@src/web3/generated';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import React, { Dispatch, FC, useState } from 'react';
import { useChainId, useReadContracts } from 'wagmi';

import {
  EnrichedOfferingParticipant,
  OfferingDistribution,
  OfferingSmartContractSet,
  ShareTransferEvent,
  WhitelistTransactionType
} from '@/types';

import ForceTransferForm from '../../actions/ForceTransferForm';
import DistributionList from '../../distributions/DistributionList';
import TransferEventList from '../../sales/TransferEventList';
import WhitelistTransactionItem from '../WhitelistTransactionItem';

import UpdateInvestorForm from './InvestorUpdateForm';

export type ParticipantSpecItemType = 'name' | 'jurisdiction' | 'externalId';

export type SelectedParticipantProps = {
  offeringParticipants: EnrichedOfferingParticipant[];
  contractSet: OfferingSmartContractSet | null;
  currentSalePrice: number | undefined;
  offeringId: string;
  organizationId: string;
  distributions: OfferingDistribution[];
  transferEventList: ShareTransferEvent[];
  refetchContracts: () => void;
  triggerInvestorListRefresh: () => void;
};

type SelectedParticipantFormPropsLocal = SelectedParticipantProps & {
  selection: string;
  partitions: String0x[];
  setSelectedParticipant: Dispatch<React.SetStateAction<string | undefined>>;
};

const SelectedParticipantDetails: FC<SelectedParticipantFormPropsLocal> = ({
  selection,
  offeringParticipants,
  contractSet,
  distributions,
  organizationId,
  offeringId,
  partitions,
  transferEventList,
  triggerInvestorListRefresh,
  refetchContracts
}) => {
  const { isOfferingManager } = useOffering();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [specEditOn, setSpecEditOn] = useState<string | undefined>(undefined);
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const chainId = useChainId();

  const participant = offeringParticipants?.find(p => p?.id === selection);

  const investorApplication = participant?.investorApplication;
  const investorApplicationText = investorApplication?.applicationDoc?.text;
  const jurisdiction = participant?.jurisdiction;
  const whitelistTransactions = participant?.whitelistTransactions;
  const participantWallet = participant?.wallet_address as String0x;
  const participantChainId = participant?.chain_id;
  const participantExternalId = participant?.external_id;

  const transferEvents = transferEventList.filter(transferEvent => {
    return (
      transferEvent.recipient_address === participantWallet ||
      transferEvent.sender_address === participantWallet
    );
  });

  //-----------------Contract Interactions---------------------

  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress
    .address as String0x;

  const sharedContractSpecs = {
    address: shareContractAddress,
    abi: shareContractABI
  };

  const { data } = useReadContracts({
    contracts: [
      { ...sharedContractSpecs, functionName: 'balanceOf', args: [participantWallet as String0x] },
      {
        ...sharedContractSpecs,
        functionName: 'isWhitelisted',
        args: [participantWallet as String0x]
      }
    ]
  });

  const shareBalanceData = data?.[0].result as bigint;
  const isWhitelisted = data?.[1].result;
  const numShares = toNormalNumber(shareBalanceData, shareContractDecimals);

  if (!participant) {
    return <div>Participant not found</div>;
  }

  // -----------------Approve Whitelist Participant---------------------

  const updateWhitelistMember = async (
    type: typeof WhitelistTransactionType.ADD | typeof WhitelistTransactionType.REMOVE
  ) => {
    try {
      await upsertMember({
        shareContractAddress,
        offeringId,
        walletAddress: participantWallet,
        setButtonStep,
        chainId: chainId,
        name: participant?.name,
        externalId: participantExternalId,
        type,
        revalidationPath: {
          path: '/manager/[organizationId]/offering/[offeringId]',
          type: 'layout'
        }
      });
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep, participantWallet);
    }
  };

  const specificationSection = (
    <div className='flex flex-col text-sm font-medium text-gray-500 gap-2 max-w-[350px]'>
      <ClickToEditItem
        label='Name'
        currentValue={participant?.name}
        form={
          <UpdateInvestorForm
            itemType={'name'}
            participant={participant}
            setSpecEditOn={setSpecEditOn}
          />
        }
        editOn={specEditOn}
        itemType='name'
        isManager={isOfferingManager}
        setEditOn={setSpecEditOn}
        className='justify-start'
      />
      <ClickToEditItem
        label='Jurisdiction'
        currentValue={jurisdiction?.country ? renderJurisdiction(jurisdiction) : null}
        form={
          <UpdateInvestorForm
            itemType={'jurisdiction'}
            participant={participant}
            setSpecEditOn={setSpecEditOn}
          />
        }
        editOn={specEditOn}
        itemType='jurisdiction'
        isManager={isOfferingManager}
        setEditOn={setSpecEditOn}
        className='justify-start'
      />
      <ClickToEditItem
        label='External ID'
        currentValue={participantExternalId}
        form={
          <UpdateInvestorForm
            itemType={'externalId'}
            participant={participant}
            setSpecEditOn={setSpecEditOn}
          />
        }
        editOn={specEditOn}
        itemType='externalId'
        isManager={isOfferingManager}
        setEditOn={setSpecEditOn}
        className='justify-start'
      />
    </div>
  );

  const tradesSection = (
    <div>
      <h1 className='text-cDarkBlue text-xl font-bold  mb-3 mt-10 '>Distributions</h1>
      <DistributionList
        distributionContractAddress={distributionContractAddress}
        distributions={distributions}
        isDistributor
        walletAddress={participantWallet}
      />
      <h1 className='text-cDarkBlue text-xl font-bold  mb-3 mt-10 '>Trades & Transfers</h1>
      <TransferEventList transferEvents={transferEvents} />
    </div>
  );

  const buttonSection = (
    <>
      <div className='flex gap-3'>
        {investorApplicationText && (
          <Button
            className='bg-cLightBlue hover:bg-cDarkBlue text-white font-bold uppercase mt-2 rounded p-2 w-full'
            aria-label='review application'
            onClick={() => DownloadFile(investorApplicationText, `${name} - application.md`)}
          >
            Review Investor Application
          </Button>
        )}
        {isWhitelisted ? (
          <LoadingButtonChain
            aria-label='remove wallet from whitelist'
            className='bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full'
            onClick={() => updateWhitelistMember(WhitelistTransactionType.REMOVE)}
            state={buttonStep}
            idleText='Remove this investor from the whitelist'
            step1Text='Removing...'
            confirmedText='Updated!'
            failedText='Transaction failed'
            rejectedText='You rejected the transaction. Click here to try again.'
          />
        ) : (
          <LoadingButtonChain
            onClick={() => updateWhitelistMember(WhitelistTransactionType.ADD)}
            className='bg-emerald-600 hover:bg-emerald-800  text-white font-bold uppercase mt-2 rounded p-2 w-full'
            aria-label='approve investor'
            state={buttonStep}
            idleText='Approve Investor'
            step1Text='Approving...'
            confirmedText='Updated!'
            failedText='Transaction failed'
            rejectedText='You rejected the transaction. Click here to try again.'
          />
        )}
      </div>
      {!!shareBalanceData && shareBalanceData > 0 && (
        <div className='mt-4 border-2 rounded-md px-2'>
          <SectionBlock
            className='font-bold'
            sectionTitle={'Force transfer or clawback'}
            mini
            asAccordion
          >
            <ForceTransferForm
              shareContractAddress={shareContractAddress}
              partitions={partitions}
              target={participantWallet}
              offeringParticipants={offeringParticipants}
              refetchContracts={refetchContracts}
            />
          </SectionBlock>
        </div>
      )}
    </>
  );

  return (
    <div className='flex flex-col gap-4'>
      <FormattedCryptoAddress
        withCopy
        address={participantWallet}
        chainId={participantChainId}
        className='font-bold text-lg'
        showFull
      />

      <div className='flex flex-col mb-4 gap-2'>
        <div>{`Shares:  ${numberWithCommas(numShares)} `}</div>
        <SectionBlock sectionTitle='Review approvals' mini className='border-2 rounded-md p-2'>
          {whitelistTransactions?.map((transaction, i) => (
            <WhitelistTransactionItem
              key={i}
              transaction={transaction}
              chainId={participantChainId}
            />
          ))}
        </SectionBlock>
      </div>
      {specificationSection}
      {tradesSection}

      <Separator />
      {buttonSection}
    </div>
  );
};

export default SelectedParticipantDetails;
