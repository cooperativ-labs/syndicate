import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import CloseButton from '@src/components/buttons/CloseButton';
import FormButton from '@src/components/buttons/FormButton';
import FormModal from '@src/containers/FormModal';
import LinkLegal from '@src/components/legal/LinkLegal';
import Loading from '@src/components/loading/Loading';
import PostBidAskForm from '@src/components/investor/tradingForms/PostBidAskForm';
import PostInitialSale from '@src/components/investor/tradingForms/PostInitialSale';
import React, { FC, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import SendShares from '../SendShares';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import SmartContractsSettings, { SmartContractsSettingsProps } from './SmartContractsSettings';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, OfferingParticipant, OfferingSmartContractSet, ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';

import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@apollo/client';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;
export type ActionPanelActionsProps = boolean | 'send' | 'distribute' | 'sale';

type OfferingActionsProps = SmartContractsSettingsProps & {
  orders: ShareOrder[];
  hasContract: boolean;
  loading: boolean;
  isOfferingManager: boolean;
  retrievalIssue: boolean;
  isContractOwner: boolean;
  permittedEntity: OfferingParticipant;
  currentSalePrice: number;
  myShares: number;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  userId: string;
  offering: Offering;
  contractSet: OfferingSmartContractSet;
  distributionId: string;
  sharesOutstanding: number;
  myDistToClaim: number;
  partitions: String0x[];
};

const OfferingActions: FC<OfferingActionsProps> = ({
  retrievalIssue,
  hasContract,
  loading,
  isOfferingManager,
  offering,
  paymentTokenAddress,
  paymentTokenDecimals,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  sharesOutstanding,
  orders,
  contractSet,
  isContractOwner,
  myDistToClaim,
  distributionId,
  partitions,
  refetchMainContracts,
  permittedEntity,
  currentSalePrice,
  myShares,
  userId,
}) => {
  const chainId = useChainId();
  const { data: userData } = useQuery(GET_USER, { variables: { id: userId } });
  const user = userData?.queryUser[0];
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [smartContractsSettingsModal, setSmartContractsSettingsModal] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [isExistingShares, setIsExistingShares] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [showActionPanel, setShowActionPanel] = useState<ActionPanelActionsProps>(false);

  // const [updateDistribution, { data: updateDistributionData }] = useMutation(UPDATE_DISTRIBUTION);

  const { id, participants, details } = offering;

  const { address: userWalletAddress } = useAccount();
  const shareContractId = contractSet?.shareContract?.id as string;
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;

  const offeringName = offering.name;
  const offeringMin = offering.details.minUnitsPerInvestor;
  const investmentCurrency = offering.details.investmentCurrency;
  const sharesIssued = offering.details?.numUnits;

  const FormModals = (
    <>
      <FormModal
        formOpen={shareSaleManagerModal}
        onClose={() => setShareSaleManagerModal(false)}
        title={`Manage shares of ${offeringName}`}
      >
        {userWalletAddress && (
          <ShareSaleList
            offering={offering}
            orders={orders}
            swapContractAddress={swapContractAddress}
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            permittedEntity={permittedEntity}
            isContractOwner={isContractOwner === !!isOfferingManager}
            setShareSaleManagerModal={setShareSaleManagerModal}
            setSaleFormModal={setSaleFormModal}
            refetchMainContracts={refetchMainContracts}
            txnApprovalsEnabled={txnApprovalsEnabled}
            shareContractAddress={shareContractAddress}
          />
        )}
      </FormModal>
      <FormModal
        formOpen={smartContractsSettingsModal}
        onClose={() => setSmartContractsSettingsModal(false)}
        title={`Smart contract settings`}
      >
        <SmartContractsSettings
          user={user}
          offering={offering}
          chainId={chainId}
          partitions={partitions}
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          swapApprovalsEnabled={swapApprovalsEnabled}
          txnApprovalsEnabled={txnApprovalsEnabled}
          refetchMainContracts={refetchMainContracts}
        />
      </FormModal>
      <FormModal
        formOpen={saleFormModal}
        onClose={() => setSaleFormModal(false)}
        title={`${isExistingShares ? 'Sell' : 'Offer new'} shares of ${offeringName}`}
      >
        <button
          className="p-2 border-2 border-gray-300 text-sm text-gray-800 rounded-md"
          onClick={() => setIsExistingShares(!isExistingShares)}
        >{`${
          isExistingShares ? 'Create a fresh offering of orders' : 'Sell existing shares form your wallet instead.'
        }`}</button>
        {isExistingShares ? (
          <PostBidAskForm
            offering={offering}
            offeringMin={offeringMin}
            sharesOutstanding={sharesOutstanding}
            walletAddress={userWalletAddress as String0x}
            myShares={myShares}
            swapContractAddress={swapContractAddress}
            permittedEntity={permittedEntity}
            isContractOwner={isContractOwner === !!isOfferingManager}
            currentSalePrice={currentSalePrice}
            setModal={setSaleFormModal}
            partitions={partitions}
            paymentTokenDecimals={paymentTokenDecimals}
            refetchAllContracts={refetchMainContracts}
            swapApprovalsEnabled={swapApprovalsEnabled}
          />
        ) : (
          <PostInitialSale
            sharesIssued={sharesIssued}
            sharesOutstanding={sharesOutstanding}
            offeringId={offering.id}
            offeringMin={offeringMin}
            priceStart={offering.details.priceStart}
            swapContractAddress={swapContractAddress}
            shareContractId={shareContractId}
            partitions={partitions}
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            refetchAllContracts={refetchMainContracts}
          />
        )}
      </FormModal>
      {/* <FormModal formOpen={bidFormModel} onClose={() => setBidFormModel(false)} title={`Bid for shares of ${offeringName}`}>
  <ShareBidForm
    offering={offering}
    walletAddress={userWalletAddress}
    offeringMin={details?.minUnitsPerInvestor}
    shareContractAddress={shareContractAddress}
    permittedEntity={permittedEntity}
    setModal={setBidFormModel}
    setRecallContract={setRecallContract}
  />
</FormModal> */}
    </>
  );

  const ActionPanel = (
    <div className=" relative mt-4 bg-gray-100 p-4 rounded-md">
      <div className="absolute -top-1 right-0 z-40">
        <CloseButton
          onClick={() => {
            setShowActionPanel(false);
          }}
        />
      </div>
      {showActionPanel === 'send' && (
        <SendShares
          sharesIssued={details?.numUnits}
          sharesOutstanding={sharesOutstanding}
          shareContractAddress={shareContractAddress}
          shareContractId={shareContractId}
          offeringParticipants={participants}
          partitions={partitions}
          myShares={myShares}
          refetchMainContracts={refetchMainContracts}
        />
      )}
    </div>
  );

  const ButtonPanel = (
    <div className="flex flex-col w-full gap-3">
      {isOfferingManager ? (
        <>
          <Button
            className="p-3 bg-cLightBlue rounded-md text-white"
            onClick={() => setSmartContractsSettingsModal(true)}
          >
            Configure shares & trading
          </Button>

          {swapContractAddress ? (
            <Button
              onClick={() => {
                setShareSaleManagerModal(true);
              }}
              className={standardClass}
            >
              Manage Share Sales
            </Button>
          ) : (
            <Button
              onClick={() => {
                setSmartContractsSettingsModal(true);
              }}
              className={standardClass}
            >
              Configure trading
            </Button>
          )}
          <Button
            onClick={() => {
              setShowActionPanel('send');
            }}
            className={standardClass}
          >
            Send shares
          </Button>
          {myDistToClaim ? (
            <>
              <FormButton type="submit" disabled={myDistToClaim === 0} onClick={() => {}}>
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`${numberWithCommas(myDistToClaim, 2)} AVAILABLE TO CLAIM`}
                  submittingText="Claiming - This can take time. Please do not refresh."
                  confirmedText="Confirmed! (check your wallet)"
                  failedText="Transaction failed"
                  rejectedText="You rejected the transaction. Click here to try again."
                />
              </FormButton>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>The offeror has not yet created shares or your wallet is not connected.</div>
      )}
    </div>
  );

  const NoContract = isOfferingManager ? (
    <Button className="p-3 bg-cLightBlue rounded-md text-white" onClick={() => setSmartContractsSettingsModal(true)}>
      Configure shares & trading
    </Button>
  ) : (
    <>The offeror has not yet created shares or your wallet is not connected.</>
  );

  const myOrder = orders?.find((order) => order.initiator === userWalletAddress);

  return (
    <>
      {FormModals}
      {retrievalIssue ? (
        <RetrievalIssue className="mt-10" />
      ) : loading ? (
        <div className="flex justify-center self-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="">{!hasContract ? NoContract : showActionPanel ? ActionPanel : ButtonPanel}</div>
          {myOrder && (
            <ShareSaleStatusWidget
              order={myOrder}
              offeringId={offering.id}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              txnApprovalsEnabled={txnApprovalsEnabled}
              isContractOwner={isContractOwner}
              refetchMainContracts={refetchMainContracts}
            />
          )}
        </>
      )}
    </>
  );
};

export default OfferingActions;

{
  /* <Button
            onClick={() => {
              setShowActionPanel('distribute');
            }}
            className={standardClass}
          >
            Create Distribution
          </Button> */
}
{
  /* {myDistToClaim ? (
            <>
              <FormButton
                type="submit"
                disabled={myDistToClaim === 0}
                onClick={() =>
                  claimDistribution(
                    reachLib,
                    shareContractAddress,
                    distributionId,
                    setButtonStep,
                    setRecallContract,
                    updateDistribution
                  )
                }
              >
                <LoadingButtonText
                  state={buttonStep}
                  idleText={`${numberWithCommas(myDistToClaim, 2)} AVAILABLE TO CLAIM`}
                  submittingText="Claiming - This can take time. Please do not refresh."
                  confirmedText="Confirmed! (check your wallet)"
                  failedText="Transaction failed"
                  rejectedText="You rejected the transaction. Click here to try again."
                />
              </FormButton>
            </>
          ) : (
            <></>
          )} */
}
