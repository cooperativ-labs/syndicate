import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import ClickToEditItem from '@src/components/form-components/ClickToEditItem';
import DistributionList from '../distributions/DistributionList';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import Input from '@src/components/form-components/Inputs';
import JurisdictionSelect from '@src/components/form-components/JurisdictionSelect';
import React, { FC, useState } from 'react';
import { Currency, OfferingParticipant } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { Form, Formik } from 'formik';
import { getIsEditorOrAdmin, renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { shareContractABI } from '@src/web3/generated';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { UPDATE_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { useContractRead, useContractWrite } from 'wagmi';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';

type SelectedParticipantProps = {
  selection: string;
  participants: OfferingParticipant[];
  shareContractId: string;
  currentSalePrice: number;
  investmentCurrency: Currency;
  removeMember: (variables) => void;
};

const SelectedParticipantDetails: FC<SelectedParticipantProps> = ({
  selection,
  participants,
  shareContractId,
  currentSalePrice,
  removeMember,
}) => {
  const { data: session } = useSession();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [updateOfferingParticipant, { data: dataUpdate }] = useMutation(UPDATE_OFFERING_PARTICIPANT);
  const [approveOfferingParticipant, { data: dataApprove }] = useMutation(UPDATE_OFFERING_PARTICIPANT);
  const [loading, setLoading] = useState<boolean>(false);
  const [specEditOn, setSpecEditOn] = useState<string | undefined>(undefined);

  const participant = participants?.find((p) => p.id === selection);
  const participantWallet = participant?.walletAddress;

  //-----------------Contract Interactions---------------------

  const sharedContractSpecs = {
    address: shareContractId as String0x,
    abi: shareContractABI,
  };

  const { data } = useContractRead({
    ...sharedContractSpecs,
    functionName: 'balanceOf',
    args: [participantWallet as String0x],
  });

  const removeFromDb = async () => {
    await removeMember({ variables: { offeringId: offering.id, id: participant?.id, currentDate: currentDate } });
  };

  const { write: removeWrite } = useContractWrite({
    ...sharedContractSpecs,
    functionName: 'removeFromWhitelist',
    mode: 'recklesslyUnprepared',
    args: [participantWallet as String0x],
    onSuccess: (data) => {
      console.log(data), removeFromDb();
    },
    onError: (e) => {
      StandardChainErrorHandling(e, setButtonStep);
    },
  });

  const removeWhitelistMember = async () => {
    setButtonStep('submitting');
    try {
      removeWrite();
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };

  // -----------------Approve Whitelist Participant---------------------

  const updateDb = async () => {
    await approveOfferingParticipant({
      variables: {
        currentDate: currentDate,
        id: id,
        permitted: true,
      },
    });
    setButtonStep('confirmed');
  };

  const { data: addData, write: addWrite } = useContractWrite({
    ...sharedContractSpecs,
    functionName: 'removeFromWhitelist',
    mode: 'recklesslyUnprepared',
    args: [participantWallet as String0x],
    onSuccess: () => updateDb(),
    onError: (e) => {
      StandardChainErrorHandling(e);
    },
  });

  const approveWhiteListMember = async () => {
    setButtonStep('submitting');
    try {
      addWrite();
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };

  //-----------------Contract Interactions END --------------------

  if (!participant) {
    return <div>Participant not found</div>;
  }

  const { name, walletAddress, externalId, permitted, id, jurisdiction, investorApplication, offering, chainId } =
    participant;

  const isEditorOrAdmin = getIsEditorOrAdmin(session?.user.id, offering.offeringEntity.organization);

  const updateInvestorForm = (itemType) => {
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
              permitted: permitted,
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
        currentValue={jurisdiction.country ? renderJurisdiction(jurisdiction) : null}
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
        shareContractId={shareContractId}
        distributions={offering.distributions}
        currency={offering.details.distributionCurrency}
      />
      <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-10 ">Trades</h1>
      <DistributionList
        shareContractId={shareContractId}
        distributions={offering.distributions}
        currency={offering.details.distributionCurrency}
      />
    </div>
  );

  const buttonSection = (
    <div className="flex gap-3">
      <button
        className="bg-cLightBlue hover:bg-cDarkBlue text-white font-bold uppercase mt-2 rounded p-2 w-full"
        aria-label="review application"
        onClick={() => DownloadFile(investorApplication.applicationDoc.text, `${name} - application.md`)}
      >
        Review Investor Application
      </button>
      {permitted ? (
        <button
          className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full"
          aria-label="remove wallet from whitelist"
          onClick={removeWhitelistMember}
        >
          <LoadingButtonText
            state={buttonStep}
            idleText="Remove this this investor from the whitelist"
            submittingText="Removing..."
            confirmedText="Investor Removed!"
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </button>
      ) : (
        <button
          onClick={approveWhiteListMember}
          className="bg-emerald-600 hover:bg-emerald-800  text-white font-bold uppercase mt-2 rounded p-2 w-full"
          // className="font-bold  text-white  uppercase mt-4 rounded p-2 w-full"
        >
          <LoadingButtonText
            state={buttonStep}
            idleText="Approve Investor"
            submittingText="Updating..."
            confirmedText="Investor Approved!"
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </button>
      )}
    </div>
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
      need to get shares and distributions from Chain
      <div className="text-sm">{`Shares: ${toNormalNumber(data, 18)} `}</div>
      {specificationSection}
      {tradesSection}
      <hr className="my-10" />
      {buttonSection}
    </div>
  );
};

export default SelectedParticipantDetails;
