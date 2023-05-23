import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import FormButton from '@src/components/buttons/FormButton';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import router from 'next/router';
import StandardButton from '@src/components/buttons/StandardButton';
import { claimDistribution } from '@src/web3/reachCalls';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { String0x } from '@src/web3/helpersChain';
import { UPDATE_DISTRIBUTION } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;

export type ContractInvestorActionsProps = {
  offering: Offering;
  shareContractAddress: String0x;
  swapContractAddress: String0x;
  isWhitelisted: boolean;
  myDistToClaim: number;
  distributionId: string;
  setRecallContract: Dispatch<SetStateAction<string>>;
};

type ContractInvestorActionsPropsAddendum = {
  setShareSaleManagerModal: Dispatch<SetStateAction<boolean>>;
};

const ContractInvestorActions: FC<ContractInvestorActionsProps & ContractInvestorActionsPropsAddendum> = ({
  offering,
  shareContractAddress,
  swapContractAddress,
  isWhitelisted,
  myDistToClaim,
  distributionId,
  setShareSaleManagerModal,
  setRecallContract,
}) => {
  const { reachLib } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [updateDistribution, { data: updateDistributionData }] = useMutation(UPDATE_DISTRIBUTION);
  const organization = offering.offeringEntity.organization;

  return (
    <div className="flex flex-col w-full gap-3">
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
      <StandardButton fullWidth text="Buy & Sell Shares" onClick={() => setShareSaleManagerModal(true)} />
      {!isWhitelisted && (
        <Button
          onClick={() => router.push(`/${organization.id}/portal/${offering.id}/investor-application`)}
          className={standardClass}
        >
          View investor application
        </Button>
      )}
    </div>
  );
};

export default ContractInvestorActions;
