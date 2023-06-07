import React, { FC } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import SelectedParticipantDetails from './SelectedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { Currency, OfferingParticipant, OfferingSmartContractSet } from 'types';

import { REMOVE_WHITELIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { String0x } from '@src/web3/helpersChain';

import { useMutation } from '@apollo/client';

type WhitelistAddressListProps = {
  offeringParticipants: OfferingParticipant[];
  contractSet: OfferingSmartContractSet;
  currentSalePrice: number;
  investmentCurrency: Currency;
};

const WhitelistAddressList: FC<WhitelistAddressListProps> = ({
  offeringParticipants,
  contractSet,
  currentSalePrice,
  investmentCurrency,
}) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WHITELIST_OBJECT);
  const [selectedParticipant, setSelectedParticipant] = React.useState<string | undefined>(undefined);
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;

  return (
    <>
      <RightSideBar formOpen={!!selectedParticipant} onClose={() => setSelectedParticipant(null)}>
        <div className="w-full">
          {selectedParticipant && (
            <SelectedParticipantDetails
              selection={selectedParticipant}
              participants={offeringParticipants}
              contractSet={contractSet}
              currentSalePrice={currentSalePrice}
              investmentCurrency={investmentCurrency}
              removeMember={removeMember}
            />
          )}
        </div>
      </RightSideBar>
      <div className="w-full">
        {offeringParticipants.map((participant, i) => {
          return (
            <div className="mb-3" key={i}>
              <WhitelistAddressListItem
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
