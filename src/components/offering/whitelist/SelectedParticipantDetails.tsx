import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import ClickToEditItem from '@src/components/form-components/ClickToEditItem';
import DistributionList from '../distributions/DistributionList';
import ForceTransferForm from '../actions/ForceTransferForm';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import Input from '@src/components/form-components/Inputs';

import JurisdictionSelect from '@src/components/form-components/JurisdictionSelect';
import React, { Dispatch, FC, useState } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { Form, Formik } from 'formik';
import { getIsEditorOrAdmin, renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { Maybe, OfferingParticipant, OfferingSmartContractSet, WhitelistTransactionType } from 'types';

import TransferEventList from '../sales/TransferEventList';
import { shareContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { UPDATE_OFFERING_PARTICIPANT, UPDATE_WHITELIST } from '@src/utils/dGraphQueries/offering';
import { useContractReads, useContractWrite } from 'wagmi';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { addWhitelistMember, removeWhitelistMember } from '@src/web3/contractShareCalls';

type SelectedParticipantProps = {
  selection: string;
  participants: Maybe<Maybe<OfferingParticipant>[]> | undefined;
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  currentSalePrice: Maybe<number> | undefined;
  paymentTokenDecimals: number | undefined;
  offeringId: string;
  partitions: String0x[];
  transferEventList: any[];
  refetchContracts: () => void;
  setSelectedParticipant: Dispatch<React.SetStateAction<string | undefined>>;
};

export type ParticipantSpecItemType = 'name' | 'jurisdiction' | 'externalId';

const SelectedParticipantDetails: FC<SelectedParticipantProps> = ({
  selection,
  participants,
  contractSet,
  paymentTokenDecimals,
  currentSalePrice,
  offeringId,
  partitions,
  transferEventList,
  refetchContracts,
}) => {
  const { data: session } = useSession();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [specEditOn, setSpecEditOn] = useState<string | undefined>(undefined);
  const [updateOfferingParticipant] = useMutation(UPDATE_OFFERING_PARTICIPANT);
  const [updateWhitelist] = useMutation(UPDATE_WHITELIST);
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;

  const participant = participants?.find((p) => p?.id === selection);
  const participantWallet = participant?.walletAddress as String0x;

  const transferEvents = transferEventList.filter((transferEvent) => {
    return transferEvent.recipientAddress === participantWallet || transferEvent.senderAddress === participantWallet;
  });

  //-----------------Contract Interactions---------------------

  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress.address as String0x;

  const sharedContractSpecs = {
    address: shareContractAddress,
    abi: shareContractABI,
  };

  const { data } = useContractReads({
    contracts: [
      { ...sharedContractSpecs, functionName: 'balanceOf', args: [participantWallet as String0x] },
      { ...sharedContractSpecs, functionName: 'isWhitelisted', args: [participantWallet as String0x] },
    ],
  });

  const shareBalanceData = data?.[0].result;
  const isWhitelisted = data?.[1].result;

  // -----------------Approve Whitelist Participant---------------------

  const updateWhitelistMember = async (type: WhitelistTransactionType) => {
    const baseVariables = {
      offeringId: offeringId,
      organization: offering.offeringEntity?.organization,
      walletAddress: participantWallet,
      shareContractAddress: shareContractAddress,
      setButtonStep,
      updateWhitelist,
    };
    try {
      if (type === WhitelistTransactionType.Add) {
        addWhitelistMember({
          ...baseVariables,
        });
      } else {
        removeWhitelistMember({
          ...baseVariables,
        });
      }
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };

  //-----------------Contract Interactions END --------------------

  if (!participant) {
    return <div>Participant not found</div>;
  }

  const {
    name,
    walletAddress,
    externalId,
    id,
    jurisdiction,
    investorApplication,
    offering,
    chainId,
    whitelistTransactions,
  } = participant;

  const distributions = offering.distributions;
  const isEditorOrAdmin = getIsEditorOrAdmin(session?.user.id, offering.offeringEntity?.organization);
  const investorApplicationText = investorApplication?.applicationDoc.text;

  const updateInvestorForm = (itemType: ParticipantSpecItemType) => {
    return (
      <Formik
        initialValues={{
          name: name,
          jurCountry: jurisdiction?.country ?? '',
          jurProvince: jurisdiction?.province ?? '',
          externalId: externalId,
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          // if (!values.jurCountry) {
          //   errors.type = 'Please enter a country';
          // }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await updateOfferingParticipant({
            variables: {
              currentDate: currentDate,
              id: id,
              name: values.name,
              jurCountry: values.jurCountry,
              jurProvince: values.jurProvince,
              externalId: values.externalId,
            },
          });
          setSpecEditOn('none');
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex md:grid grid-cols-5 w-full items-center gap-2 my-4">
            <div className="w-full md:col-span-3">
              {itemType === 'name' && <Input className={' bg-opacity-0'} name="name" />}
              {itemType === 'jurisdiction' && <JurisdictionSelect values={values} />}
              {itemType === 'externalId' && <Input className={' bg-opacity-0'} name="externalId" />}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase h-11 rounded w-full"
            >
              Save
            </Button>
            <Button
              className="border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase h-11 rounded w-full"
              onClick={(e) => {
                e.preventDefault();
                setSpecEditOn('none');
              }}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  const specificationSection = (
    <div className="text-sm font-medium text-gray-500">
      <ClickToEditItem
        label="Name"
        currentValue={name}
        form={updateInvestorForm('name')}
        editOn={specEditOn}
        itemType="name"
        isManager={isEditorOrAdmin}
        setEditOn={setSpecEditOn}
      />
      <ClickToEditItem
        label="Jurisdiction"
        currentValue={jurisdiction?.country ? renderJurisdiction(jurisdiction) : null}
        form={updateInvestorForm('jurisdiction')}
        editOn={specEditOn}
        itemType="jurisdiction?"
        isManager={isEditorOrAdmin}
        setEditOn={setSpecEditOn}
      />
      <ClickToEditItem
        label="External ID"
        currentValue={externalId}
        form={updateInvestorForm('externalId')}
        editOn={specEditOn}
        itemType="externalId"
        isManager={isEditorOrAdmin}
        setEditOn={setSpecEditOn}
      />
    </div>
  );

  const tradesSection = (
    <div>
      <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-10 ">Distributions</h1>
      <DistributionList
        distributionContractAddress={distributionContractAddress}
        distributions={distributions}
        isDistributor
        walletAddress={participantWallet}
      />
      <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-10 ">Trades & Transfers</h1>
      <TransferEventList transferEvents={transferEvents} paymentTokenDecimals={paymentTokenDecimals} />
    </div>
  );

  const whitelistSection = (
    <div>
      <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-10 ">Whitelist Events</h1>
      {whitelistTransactions?.map((transaction, i) => {
        return (
          <div key={i} className="flex gap-2 p-2 border-2 rounded-md my-2">
            <div className="flex gap-2">
              <FormattedCryptoAddress
                className={'text-sm font-medium flex col-span-1 justify-center '}
                chainId={chainId}
                address={transaction?.transactionHash}
                label={transaction?.type}
                lookupType="tx"
                showFull
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const buttonSection = (
    <>
      <div className="flex gap-3">
        {investorApplicationText && (
          <button
            className="bg-cLightBlue hover:bg-cDarkBlue text-white font-bold uppercase mt-2 rounded p-2 w-full"
            aria-label="review application"
            onClick={() => DownloadFile(investorApplicationText, `${name} - application.md`)}
          >
            Review Investor Application
          </button>
        )}
        {isWhitelisted ? (
          <button
            className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full"
            aria-label="remove wallet from whitelist"
            onClick={() => updateWhitelistMember(WhitelistTransactionType.Remove)}
          >
            <LoadingButtonText
              state={buttonStep}
              idleText="Remove this investor from the whitelist"
              step1Text="Removing..."
              confirmedText="Investor Removed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </button>
        ) : (
          <button
            onClick={() => updateWhitelistMember(WhitelistTransactionType.Add)}
            className="bg-emerald-600 hover:bg-emerald-800  text-white font-bold uppercase mt-2 rounded p-2 w-full"
            // className="font-bold  text-white  uppercase mt-4 rounded p-2 w-full"
          >
            <LoadingButtonText
              state={buttonStep}
              idleText="Approve Investor"
              step1Text="Updating..."
              confirmedText="Investor Approved!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </button>
        )}
      </div>
      {shareBalanceData && shareBalanceData > 0 && (
        <div className="mt-4 border-2 rounded-md px-2">
          <SectionBlock className="font-bold" sectionTitle={'Force transfer or clawback'} mini asAccordion>
            <ForceTransferForm
              shareContractAddress={shareContractAddress}
              partitions={partitions}
              target={participantWallet}
              offeringParticipants={participants}
              refetchContracts={refetchContracts}
            />
          </SectionBlock>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col">
      <FormattedCryptoAddress
        withCopy
        address={walletAddress}
        chainId={chainId}
        className="font-bold text-lg"
        showFull
      />

      <div className="mb-4">
        <div>{`Shares: ${toNormalNumber(shareBalanceData, shareContractDecimals)} `}</div>
      </div>
      {specificationSection}
      {tradesSection}
      {whitelistSection}
      <hr className="my-10" />
      {buttonSection}
    </div>
  );
};

export default SelectedParticipantDetails;
