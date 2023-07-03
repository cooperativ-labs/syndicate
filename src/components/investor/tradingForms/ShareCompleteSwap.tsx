import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { FC, useState } from 'react';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { useAccount, useChainId } from 'wagmi';

import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { getCurrencyById } from '@src/utils/enumConverters';
import { isMetaMask } from '@src/web3/connectors';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';

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
  callFillOrder,
}) => {
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { connector } = useAccount();

  const handleClick = async () => {
    await callFillOrder({
      amount: acceptedOrderQty,
      setButtonStep,
    });
  };

  const saleStatementText = (
    <span className="flex my-2 font-semibold">
      You have an offer from &nbsp;
      <FormattedCryptoAddress chainId={chainId} address={sender} className="text-base" />
    </span>
  );

  const formButtonText = `Purchase ${acceptedOrderQty} shares for ${numberWithCommas(price * acceptedOrderQty, 2)} ${
    getCurrencyById(paymentTokenAddress)?.symbol
  }`;

  if (isTradeExecutionStep) {
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
          <div className="flex flex-col">{saleStatementText}</div>
          <Button className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium" onClick={handleClick}>
            <LoadingButtonText
              state={buttonStep}
              idleText={formButtonText}
              step1Text={'Executing...'}
              confirmedText={'Confirmed!'}
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
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
