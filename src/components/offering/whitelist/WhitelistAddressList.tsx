import React, { FC } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import SelectedParticipantDetails, { SelectedParticipantProps } from './SelectedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { Currency, Maybe, OfferingParticipant, OfferingSmartContractSet } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { String0x } from '@src/web3/helpersChain';

export type WhitelistAddressListProps = {
  investorListRefreshTrigger: number;
  triggerInvestorListRefresh: () => void;
};

type WhitelistAddressListPropsLocal = SelectedParticipantProps &
  WhitelistAddressListProps & {
    offeringId: string;
    investmentCurrency: Maybe<Currency> | undefined;
  };

const WhitelistAddressList: FC<WhitelistAddressListPropsLocal> = ({
  offeringId,
  offeringParticipants,
  contractSet,
  currentSalePrice,
  investmentCurrency,
  transferEventList,
  investorListRefreshTrigger,
  triggerInvestorListRefresh,
  refetchContracts,
}) => {
  const [selectedParticipant, setSelectedParticipant] = React.useState<string | undefined>(undefined);
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const partitions = contractSet?.shareContract?.partitions as String0x[];

  return (
    <>
      <RightSideBar formOpen={!!selectedParticipant} onClose={() => setSelectedParticipant(undefined)}>
        <div className="w-full">
          {selectedParticipant && (
            <SelectedParticipantDetails
              selection={selectedParticipant}
              offeringParticipants={offeringParticipants}
              contractSet={contractSet}
              currentSalePrice={currentSalePrice}
              paymentTokenDecimals={getCurrencyOption(investmentCurrency)?.decimals}
              partitions={partitions}
              offeringId={offeringId}
              transferEventList={transferEventList}
              refetchContracts={refetchContracts}
              setSelectedParticipant={setSelectedParticipant}
              triggerInvestorListRefresh={triggerInvestorListRefresh}
            />
          )}
        </div>
      </RightSideBar>
      <div className="w-full">
        {offeringParticipants?.map((participant, i) => {
          return (
            <div className="mb-3" key={i}>
              <WhitelistAddressListItem
                investorListRefreshTrigger={investorListRefreshTrigger}
                participant={participant}
                shareContractAddress={shareContractAddress}
                setSelectedParticipant={setSelectedParticipant}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WhitelistAddressList;
