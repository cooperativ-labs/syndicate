import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import CloseButton from '@src/components/buttons/CloseButton';
import FormButton from '@src/components/buttons/FormButton';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import SendShares from '../SendShares';
import SubmitDistribution from '../SubmitDistribution';
import { ActionPanelActionsProps } from './OfferingActions';
import { claimDistribution, claimProceeds } from '@src/web3/reachCalls';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { UPDATE_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;

export type ContractOwnerActionsProps = {
  offering: Offering;
  contractId: string;
  distributionId: string;
  sharesOutstanding: number;
  myDistToClaim: number;
  setRecallContract: Dispatch<SetStateAction<string>>;
  setShareSaleManagerModal: Dispatch<SetStateAction<boolean>>;
  setSaleFormModal: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

const ContractOwnerActions: FC<ContractOwnerActionsProps> = ({
  offering,
  contractId,
  distributionId,
  sharesOutstanding,
  myDistToClaim,
  setRecallContract,
  setShareSaleManagerModal,
  setSaleFormModal,
  refetch,
}) => {
  const { reachLib } = useContext(ReachContext);
  const [updateDistribution, { data: updateDistributionData }] = useMutation(UPDATE_DISTRIBUTION);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [showActionPanel, setShowActionPanel] = useState<ActionPanelActionsProps>(false);
  const { id, participants, details } = offering;
  const ButtonPanel = (
    <div className="flex flex-col w-full gap-3">
      <Button
        onClick={() => {
          setShowActionPanel('distribute');
        }}
        className={standardClass}
      >
        Create Distribution
      </Button>
      {myDistToClaim ? (
        <>
          <FormButton
            type="submit"
            disabled={myDistToClaim === 0}
            onClick={() =>
              claimDistribution(
                reachLib,
                contractId,
                distributionId,
                setButtonStep,
                setRecallContract,
                updateDistribution
              )
            }
          >
            <LoadingButtonText
              state={buttonStep}
              idleText={`${numberWithCommas(myDistToClaim, 2)} AVAILABLE TO CLAIM`}
              submittingText="Claiming - This can take time. Please do not refresh."
              confirmedText="Confirmed! (check your wallet)"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </FormButton>
        </>
      ) : (
        <></>
      )}
      <Button
        onClick={() => {
          setShowActionPanel('send');
        }}
        className={standardClass}
      >
        Send shares
      </Button>
      <Button
        onClick={() => {
          setShareSaleManagerModal(true);
        }}
        className={standardClass}
      >
        Manage Share Sales
      </Button>
    </div>
  );

  const ActionPanel = (
    <div className=" relative mt-4 bg-gray-100 p-4 rounded-md">
      <div className="absolute -top-1 right-0 z-40">
        <CloseButton
          onClose={() => {
            setShowActionPanel(false);
          }}
        />
      </div>
      {showActionPanel === 'send' && (
        <SendShares
          sharesIssued={details?.numUnits}
          sharesOutstanding={sharesOutstanding}
          contractId={contractId}
          offeringId={id}
          offeringParticipants={participants}
          refetch={refetch}
          setRecallContract={setRecallContract}
        />
      )}
      {showActionPanel === 'distribute' && (
        <SubmitDistribution contractId={contractId} refetch={refetch} setRecallContract={setRecallContract} />
      )}
    </div>
  );

  return <div>{!showActionPanel ? ButtonPanel : ActionPanel}</div>;
};

export default ContractOwnerActions;
