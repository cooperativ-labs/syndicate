import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { FC, useState } from 'react';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { useAccount } from 'wagmi';

import { isMetaMask } from '@src/web3/connectors';

type ShareCompleteSwapProps = {
  acceptedOrderQty: number;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => Promise<void>;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({ acceptedOrderQty, callFillOrder }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { connector } = useAccount();

  const handleClick = async () => {
    await callFillOrder({
      amount: acceptedOrderQty,
      setButtonStep,
    });
  };

  return (
    <>
      <WalletActionModal
        open={buttonStep === 'step1' || buttonStep === 'step2'}
        metaMaskWarning={isMetaMask(connector)}
      >
        <WalletActionIndicator
          step={buttonStep}
          step1Text="Setting contract allowance"
          step1SubText="This will allow the contract to spend your tokens on your behalf"
          step2Text="Executing trade"
          step2SubText="This will execute the trade and purchase the shares"
        />
      </WalletActionModal>

      <div className={'flex flex-col'}>
        <Button className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium" onClick={handleClick}>
          <LoadingButtonText
            state={buttonStep}
            idleText={'Execute trade'}
            step1Text={'Executing...'}
            confirmedText={'Confirmed!'}
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </Button>
      </div>
    </>
  );
};

export default ShareCompleteSwap;
