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
import { String0x } from '@src/web3/helpersChain';
import { UPDATE_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;

export type ContractOwnerActionsProps = {
  offering: Offering;
  shareContractAddress: String0x;
  shareContractId: string;
  swapContractAddress: String0x;
  distributionId: string;
  sharesOutstanding: number;
  myDistToClaim: number;
  partitions: String0x[];
  setRecallContract: Dispatch<SetStateAction<string>>;
  refetch: () => void;
};

type ContractInvestorActionsPropsAddendum = {
  setShareSaleManagerModal: Dispatch<SetStateAction<boolean>>;
  setSmartContractsSettingsModal: Dispatch<SetStateAction<boolean>>;
};

const ContractOwnerActions: FC<ContractOwnerActionsProps & ContractInvestorActionsPropsAddendum> = ({
  offering,
  shareContractAddress,
  shareContractId,
  swapContractAddress,
  distributionId,
  sharesOutstanding,
  myDistToClaim,
  partitions,
  setRecallContract,
  setShareSaleManagerModal,
  setSmartContractsSettingsModal,
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
                shareContractAddress,
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
      {swapContractAddress ? (
        <Button
          onClick={() => {
            setShareSaleManagerModal(true);
          }}
          className={standardClass}
        >
          Manage Share Sales
        </Button>
      ) : (
        <Button
          onClick={() => {
            setSmartContractsSettingsModal(true);
          }}
          className={standardClass}
        >
          Configure trading
        </Button>
      )}
    </div>
  );

  const ActionPanel = (
    <div className=" relative mt-4 bg-gray-100 p-4 rounded-md">
      <div className="absolute -top-1 right-0 z-40">
        <CloseButton
          onClick={() => {
            setShowActionPanel(false);
          }}
        />
      </div>
      {showActionPanel === 'send' && (
        <SendShares
          sharesIssued={details?.numUnits}
          sharesOutstanding={sharesOutstanding}
          shareContractAddress={shareContractAddress}
          shareContractId={shareContractId}
          offeringParticipants={participants}
          partitions={partitions}
        />
      )}
      {showActionPanel === 'distribute' && (
        <SubmitDistribution
          shareContractAddress={shareContractAddress}
          refetch={refetch}
          setRecallContract={setRecallContract}
        />
      )}
    </div>
  );

  return <div>{!showActionPanel ? ButtonPanel : ActionPanel}</div>;
};

export default ContractOwnerActions;
