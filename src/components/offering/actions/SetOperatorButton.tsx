import { Button } from '@src/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { setContractOperator } from '@src/web3/contractShareCalls';
import { String0x } from '@src/web3/helpersChain';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';

type SetOperatorButtonProps = {
  shareContractAddress: String0x;
  operatorField?: boolean;
  refetch: () => void;
};

const SetOperatorButton: React.FC<SetOperatorButtonProps> = ({
  shareContractAddress,
  operatorField,
  refetch
}) => {
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
      refetch
    });
    setButtonStep('confirmed');
    return;
  };

  return (
    <>
      {operatorField && (
        <Field>
          <FieldContent>
            <FieldLabel>Operator Address</FieldLabel>
            <Input
              type="text"
              placeholder="Operator Address"
              value={operatorAddress}
              onBlur={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setOperatorAddress(e.target.value as String0x)
              }
              required
            />
          </FieldContent>
        </Field>
      )}
      <Button
        className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
        onClick={e => handleSetOperator(e)}
      >
        <LoadingButtonChain
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
