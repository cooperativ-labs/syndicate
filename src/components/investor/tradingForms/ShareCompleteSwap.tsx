import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { FC, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import { getIsAllowanceSufficient } from '@src/utils/helpersAllowance';
import { isMetaMask } from '@src/web3/connectors';
import { setAllowance } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';

type ShareCompleteSwapProps = {
  contractIndex: number;
  price: number;
  paymentTokenDecimals: number;
  swapContractAddress: String0x;
  acceptedOrderQty: number;
  paymentTokenAddress: String0x;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => Promise<void>;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({
  acceptedOrderQty,
  paymentTokenAddress,
  swapContractAddress,
  price,
  paymentTokenDecimals,
  callFillOrder,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress, connector } = useAccount();

  const { data: allowanceData, refetch: refetchAllowance } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress],
  });

  const handleClick = async () => {
    const allowance = toNormalNumber(allowanceData, paymentTokenDecimals);
    const allowanceRequiredForPurchase = acceptedOrderQty * price;
    const isAllowanceSufficient = getIsAllowanceSufficient(allowance, allowanceRequiredForPurchase);

    if (!isAllowanceSufficient) {
      setButtonStep('step1');
      await setAllowance({
        paymentTokenAddress,
        paymentTokenDecimals,
        spenderAddress: swapContractAddress,
        amount: allowanceRequiredForPurchase,
        setButtonStep,
      });
      setButtonStep('step2');
      await callFillOrder({
        amount: acceptedOrderQty,
        setButtonStep: setButtonStep,
      });
    } else {
      setButtonStep('step2');
      await callFillOrder({
        amount: acceptedOrderQty,
        setButtonStep: setButtonStep,
      });
    }
  };

  // ABSTRACT THIS OUT

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
