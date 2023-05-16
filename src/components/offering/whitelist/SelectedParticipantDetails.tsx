import abi from '../../../web3/ABI';
import React, { FC, useContext, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { ContractAddressType, StandardChainErrorHandling } from '@src/web3/helpersChain';

import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { Currency, OfferingParticipant } from 'types';
import { Form, Formik } from 'formik';
import { ReachContext } from '@src/SetReachContext';
import { UPDATE_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';

import { useMutation } from '@apollo/client';

import Input from '@src/components/form-components/Inputs';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { getIsEditorOrAdmin, renderJurisdiction } from '@src/utils/helpersUserAndEntity';

import ClickToEditItem from '@src/components/form-components/ClickToEditItem';
import DistributionList from '../distributions/DistributionList';

import { useSession } from 'next-auth/react';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { toNormalNumber } from '@src/web3/util';
import JurisdictionSelect from '@src/components/form-components/JurisdictionSelect';

type SelectedParticipantProps = {
  selection: string;
  participants: OfferingParticipant[];
  contractId: string;
  currentSalePrice: number;
  investmentCurrency: Currency;
  removeMember: (any) => void;
};

const SelectedParticipantDetails: FC<SelectedParticipantProps> = ({
  selection,
  participants,
  contractId,
  currentSalePrice,
  removeMember,
}) => {
  const { data: session } = useSession();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [updateOfferingParticipant, { data: dataUpdate }] = useMutation(UPDATE_OFFERING_PARTICIPANT);
  const [loading, setLoading] = useState<boolean>(false);
  const [specEditOn, setSpecEditOn] = useState<string | undefined>(undefined);

  const participant = participants.find((p) => p.id === selection);

  const { name, walletAddress, externalId, permitted, id, jurisdiction, investorApplication, offering, chainId } =
    participant;

  const isEditorOrAdmin = getIsEditorOrAdmin(session?.user.id, offering.offeringEntity.organization);

  //-----------------Contract Interactions---------------------

  const sharedContractSpecs = {
    address: contractId as ContractAddressType,
    abi: abi,
  };

  const { data } = useContractRead({
    ...sharedContractSpecs,
    functionName: 'balanceOf',
    args: [participant.walletAddress as ContractAddressType],
  });

  const { config: configRemove } = usePrepareContractWrite({
    ...sharedContractSpecs,
    functionName: 'removeFromWhitelist',
    args: [walletAddress as ContractAddressType],
  });

  const { config: configApprove } = usePrepareContractWrite({
    ...sharedContractSpecs,
    functionName: 'addToWhitelist',
    args: [walletAddress as ContractAddressType],
  });

  const { isSuccess: isSuccessRemove, write: remove } = useContractWrite(configRemove);
  const removeAddress = async (whitelistItemID: string) => {
    try {
      remove();
      if (isSuccessRemove) {
        removeMember({ variables: { offeringId: offering.id, id: whitelistItemID, currentDate: currentDate } });
      }
    } catch (e) {
      StandardChainErrorHandling(e);
    }
  };

  const { isSuccess: isSuccessApprove, write: approve } = useContractWrite(configApprove);
  const approveWhiteListMember = async () => {
    setButtonStep('submitting');
    try {
      // () => approve();
      if (isSuccessApprove) {
        await updateOfferingParticipant({
          variables: {
            currentDate: currentDate,
            id: id,
            name: name,
            externalId: externalId,
            jurCountry: jurisdiction?.country,
            jurProvince: jurisdiction?.province,
            permitted: true,
          },
        });
      }
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
    setLoading(false);
  };
  //-----------------Contract Interactions--------------------

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
          if (!values.jurCountry) {
            errors.type = 'Please enter a country';
          }
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
          setSpecEditOn(undefined);
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
        currentValue={jurisdiction ? renderJurisdiction(jurisdiction) : null}
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
        contractId={contractId}
        distributions={offering.distributions}
        currency={offering.details.distributionCurrency}
      />
      <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-10 ">Trades</h1>
      <DistributionList
        contractId={contractId}
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
          onClick={() => removeAddress(id)}
        >
          Remove this this investor from the whitelist
        </button>
      ) : (
        <button
          onClick={() => approveWhiteListMember()}
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
