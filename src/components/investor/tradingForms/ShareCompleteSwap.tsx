import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { Button } from '@src/components/ui/button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
// import { isMetaMask } from '@src/web3/wagmi';
import { String0x } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { useConnection, useChainId } from 'wagmi';

type ShareCompleteSwapProps = {
  acceptedOrderQty: number;
  sender: String0x;
  recipient: String0x;
  isAskOrder: boolean;
  isTradeExecutionStep: boolean;
  price: number;
  paymentTokenAddress: String0x;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => Promise<void>;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({
  acceptedOrderQty,
  sender,
  recipient,
  isAskOrder,
  isTradeExecutionStep,
  price,
  paymentTokenAddress,
  callFillOrder
}) => {
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { connector } = useConnection();

  const handleClick = async () => {
    await callFillOrder({
      amount: acceptedOrderQty,
      setButtonStep
    });
  };

  const saleStatementText = (
    <span className='flex my-2 font-semibold'>
      You have an offer from &nbsp;
      <FormattedCryptoAddress chainId={chainId} address={sender} className='text-base' />
    </span>
  );

  const formButtonText = `Purchase ${acceptedOrderQty} shares for ${numberWithCommas(price * acceptedOrderQty, 2)} ${
    getCurrencyById(paymentTokenAddress)?.symbol
  }`;

  if (isTradeExecutionStep) {
    return (
      <>
        <WalletActionModal open={buttonStep === 'step1' || buttonStep === 'step2'}>
          <WalletActionIndicator
            step={buttonStep}
            step1Text='Setting contract allowance'
            step1SubText='This will allow the contract to spend your tokens on your behalf'
            step2Text='Executing trade'
            step2SubText='This will execute the trade and purchase the shares'
          />
        </WalletActionModal>

        <div className={'flex flex-col'}>
          <div className='flex flex-col'>{saleStatementText}</div>
          <Button
            className='rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium'
            onClick={handleClick}
          >
            <LoadingButtonChain
              state={buttonStep}
              idleText={formButtonText}
              step1Text={'Executing...'}
              confirmedText={'Confirmed!'}
              failedText='Transaction failed'
              rejectedText='You rejected the transaction. Click here to try again.'
            />
          </Button>
        </div>
      </>
    );
  } else {
    return <> {`2. Confirm your trade`}</>;
  }
};

export default ShareCompleteSwap;
