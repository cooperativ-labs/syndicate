import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';

import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import React, { FC, useEffect } from 'react';
import { claimDistribution } from '@src/web3/contractDistributionCall';
import { CurrencyCode, Maybe, OfferingDistribution } from 'types';
import { dividendContractABI } from '@src/web3/generated';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { getHumanDate, getHumanDateTime } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useAccount, useChainId, useContractReads } from 'wagmi';
import { useDistributionDetails } from '@src/web3/hooks/useDistributionDetails';

export type DistributionListItemProps = {
  distributionContractAddress: String0x;
  isDistributor?: boolean;
  hideTransactionId?: boolean;
  walletAddress: String0x | undefined;
};

const DistributionListItem: FC<DistributionListItemProps & { distribution: OfferingDistribution }> = ({
  distribution,
  hideTransactionId,
  isDistributor,
  distributionContractAddress,
  walletAddress,
}) => {
  const chainId = useChainId();
  const { address: userWalletAddress } = useAccount();
  const isMyDistribution = userWalletAddress === walletAddress;

  const { transactionHash, contractIndex } = distribution;

  const [buttonStep, setButtonStep] = React.useState<LoadingButtonStateType>('idle');

  const {
    dividendPartition,
    blockTimestamp,
    exDividendDate,
    recordDate,
    payoutDate,
    dividendAmount,
    payoutTokenAddress,
    isErc20Payout,
    amountRemaining,
  } = useDistributionDetails(distributionContractAddress, contractIndex);

  const { data, refetch } = useContractReads({
    contracts: [
      {
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'getClaimableAmount',
        args: [walletAddress as String0x, BigInt(contractIndex)],
      },
      {
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'claimedAmount',
        args: [walletAddress as String0x, BigInt(contractIndex)],
      },
    ],
  });

  const now = new Date();
  const isBeforePayoutDate = payoutDate ? payoutDate > now : true;

  useEffect(() => {
    if (!isBeforePayoutDate) {
      setTimeout(() => {
        refetch();
      }, 10000);
    }
  }, [isBeforePayoutDate, refetch]);

  const amountToClaim = data
    ? toNormalNumber(data[0].result as bigint, getCurrencyById(payoutTokenAddress)?.decimals)
    : undefined;

  const claimedAmount = data
    ? toNormalNumber(data[1].result as bigint, getCurrencyById(payoutTokenAddress)?.decimals)
    : undefined;

  const handleClaim = async () => {
    claimDistribution({ distributionContractAddress, distributionContractIndex: contractIndex, setButtonStep });
  };

  const setButtonItem =
    amountToClaim && isMyDistribution ? (
      <Button
        onClick={() => handleClaim()}
        disabled={!isMyDistribution}
        className={cn(
          `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white text-sm p-3 px-6 font-semibold rounded-md relative`
        )}
      >
        <LoadingButtonText
          state={buttonStep}
          idleText={`Claim ${numberWithCommas(amountToClaim, 2)}`}
          step1Text="Claiming..."
          confirmedText="Clamed!"
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      </Button>
    ) : isMyDistribution && claimedAmount ? (
      <div className="p-3"> {numberWithCommas(claimedAmount, 2)} claimed</div>
    ) : (
      <div className="p-3"> {numberWithCommas(amountToClaim, 2)} to claim</div>
    );

  return (
    <div className="relative bg-white shadow-md md:grid grid-cols-8 gap-3 items-center pl-3 p-1 rounded-lg ">
      <div className="col-span-2">
        <div className="font-bold text-base ">{recordDate && getHumanDate(recordDate)}</div>
      </div>
      {!hideTransactionId && (
        <div className="col-span-2 mt-3 md:mt-0">
          <div className="md:w-auto font-medium ">
            <FormattedCryptoAddress chainId={chainId} address={transactionHash} lookupType="tx" />
          </div>
        </div>
      )}
      <div className="col-span-2 mt-3 md:mt-0">
        <div className="md:w-auto font-medium ">
          {dividendAmount} {getCurrencyById(payoutTokenAddress)?.symbol}
        </div>
      </div>

      <div className="col-span-2 flex mt-3 md:mt-0 justify-end">
        {isBeforePayoutDate ? <div className="p-3"> pending... </div> : setButtonItem}
      </div>
    </div>
  );
};

export default DistributionListItem;
