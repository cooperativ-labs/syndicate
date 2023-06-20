import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { useState } from 'react';
import { MatchSupportedChains } from '@src/web3/connectors';
import { setAllowance } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type SetAllowanceFormProps = {
  amount: number | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  spenderAddress: String0x | undefined;
  refetchAllowance: () => void;
};

const SetAllowanceForm: React.FC<SetAllowanceFormProps> = ({
  paymentTokenAddress,
  paymentTokenDecimals,
  spenderAddress,
  amount,
  refetchAllowance,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const chainId = useChainId();
  const chainName = MatchSupportedChains(chainId)?.name;

  const handleAllowance = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await setAllowance({
      paymentTokenAddress,
      paymentTokenDecimals,
      spenderAddress,
      amount,
      setButtonStep,
    });
    refetchAllowance();
    return;
  };

  return (
    <Button
      className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
      onClick={(e) => handleAllowance(e)}
    >
      <LoadingButtonText
        state={buttonStep}
        idleText={`First permit the smart contract access your funds`}
        submittingText="Setting allowance..."
        confirmedText="Confirmed!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );
};

export default SetAllowanceForm;
