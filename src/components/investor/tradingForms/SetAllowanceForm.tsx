import { Button } from '@src/components/ui/button';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import { setAllowance } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { useState } from 'react';
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
  refetchAllowance
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const chainId = useChainId();
  const chainName = MatchSupportedChains(chainId)?.name;

  const handleAllowance = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setButtonStep('step1');
    await setAllowance({
      paymentTokenAddress,
      paymentTokenDecimals,
      spenderAddress,
      amount,
      setButtonStep
    });
    setButtonStep('confirmed');
    refetchAllowance();
    return;
  };

  return (
    <Button
      className='rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium'
      onClick={e => handleAllowance(e)}
    >
      <LoadingButtonChain
        state={buttonStep}
        idleText={`First permit the smart contract access your funds`}
        step1Text='Setting allowance...'
        confirmedText='Confirmed!'
        failedText='Transaction failed'
        rejectedText='You rejected the transaction. Click here to try again.'
      />
    </Button>
  );
};

export default SetAllowanceForm;
