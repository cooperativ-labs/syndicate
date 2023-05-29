import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { useState } from 'react';
import { MatchSupportedChains } from '@src/web3/connectors';
import { setAllowance } from '@src/web3/contractFunctionCalls';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type SetAllowanceFormProps = {
  amount: number;
  paymentTokenAddress: String0x;
  swapContractAddress: String0x;
};

const SetAllowanceForm: React.FC<SetAllowanceFormProps> = ({ paymentTokenAddress, swapContractAddress, amount }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const chainId = useChainId();
  const chainName = MatchSupportedChains(chainId)?.name;
  return (
    <Button
      className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
      onClick={() =>
        setAllowance({
          paymentTokenAddress: paymentTokenAddress,
          swapContractAddress: swapContractAddress,
          amount: amount,
          setButtonStep: setButtonStep,
        })
      }
    >
      <LoadingButtonText
        state={buttonStep}
        idleText={`Permit the smart contract access to funds your ${chainName} wallet`}
        submittingText="Setting allowance..."
        confirmedText="Confirmed!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );
};

export default SetAllowanceForm;
