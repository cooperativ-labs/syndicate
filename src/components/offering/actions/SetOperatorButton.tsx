import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { useState } from 'react';

import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import { setContractOperator } from '@src/web3/contractShareCalls';
import { String0x } from '@src/web3/helpersChain';
import { useAccount } from 'wagmi';

type SetOperatorButtonProps = {
  shareContractAddress: String0x;
  operatorField?: boolean;
  refetch: () => void;
};

const SetOperatorButton: React.FC<SetOperatorButtonProps> = ({ shareContractAddress, operatorField, refetch }) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [operatorAddress, setOperatorAddress] = useState<String0x | ''>('');

  const handleSetOperator = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setButtonStep('step1');
    e.preventDefault();
    await setContractOperator({
      shareContractAddress,
      operator: userWalletAddress as String0x,
      setButtonStep,
      refetch,
    });
    setButtonStep('confirmed');
    return;
  };

  return (
    <>
      {operatorField && (
        <Input
          className={defaultFieldDiv}
          type="text"
          name="operator"
          placeholder="Operator Address"
          value={operatorAddress}
          onBlur={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setOperatorAddress(e.target.value as String0x)
          }
          required
        />
      )}
      <Button
        className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
        onClick={(e) => handleSetOperator(e)}
      >
        <LoadingButtonText
          state={buttonStep}
          idleText={`You must first set yourself as an operator for the contract`}
          step1Text="Setting operator..."
          confirmedText="Confirmed!"
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      </Button>
    </>
  );
};

export default SetOperatorButton;
