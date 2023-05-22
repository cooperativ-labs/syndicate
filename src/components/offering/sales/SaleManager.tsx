import * as backendCtc from '../../../web3/ABI';
import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import MoneyDisplay from '../../MoneyDisplay';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import SaleVisibilityToggle from './SaleVisibilityToggle';
import { DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

export type SaleProps = any;

type SaleManagerProps = {
  offeringId: string;
  saleDetails: SaleProps;
  shareContractId: string;
  sale: OfferingSale;
  setRecallContract: Dispatch<SetStateAction<string>>;
};
// create Sale type
const SaleManager: FC<SaleManagerProps> = ({ offeringId, saleDetails, shareContractId, sale, setRecallContract }) => {
  const { reachLib, userWalletAddress } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { formatCurrency } = reachLib;
  const qty = parseInt(formatCurrency(saleDetails.qty._hex, 6), 10);
  const sold = parseInt(formatCurrency(saleDetails.sold._hex, 6), 10);
  const [deleteSaleObject, { data, error }] = useMutation(DELETE_SALE);
  const status = saleDetails.status;

  const [, endSale] = useAsyncFn(async () => {
    setButtonStep('submitting');
    reachLib.setWalletFallback(reachLib.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
    const acc = await reachLib.getDefaultAccount();
    const ctc = acc.contract(backendCtc, shareContractId);
    const call = async (f) => {
      try {
        await f();
        deleteSaleObject({ variables: { offeringId: offeringId, saleId: sale.id } });
        setButtonStep('confirmed');
        setRecallContract('endSale');
      } catch (e) {
        StandardChainErrorHandling(e, setButtonStep);
      }
    };
    const apis = ctc.a;
    call(async () => {
      const apiReturn = await apis.cancelSwap();
      return apiReturn;
    });
  });

  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          Shares sold: <MoneyDisplay className="text-lg font-bold" amount={sold} />
        </div>
        <div>
          Shares remaining: <MoneyDisplay className="text-lg font-bold" amount={qty} />
        </div>

        <Button
          className="text-sm p-3 px-6 mr-10 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative"
          onClick={() => endSale()}
          disabled={buttonStep === 'submitting'}
        >
          <LoadingButtonText
            state={buttonStep}
            idleText="End Sale"
            submittingText="Ending Sale..."
            confirmedText="Sale Ended!"
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </Button>
      </div>

      <hr className="my-4" />
      <SaleVisibilityToggle saleVisibility={sale.visible} saleId={sale.id} />
    </div>
  );
};

export default SaleManager;
