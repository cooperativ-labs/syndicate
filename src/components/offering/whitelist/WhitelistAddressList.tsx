import abi, * as backendCtc from '../../../web3/ABI';
import React, { FC, useContext } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import SelectedParticipantDetails from './SelectedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { Currency, OfferingParticipant } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { ReachContext } from '@src/SetReachContext';
import { REMOVE_WHITELIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { StandardChainErrorHandling, String0x } from '@src/web3/helpersChain';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useMutation } from '@apollo/client';

type WhitelistAddressListProps = {
  offeringParticipants: OfferingParticipant[];
  contractId: string;
  currentSalePrice: number;
  investmentCurrency: Currency;
};

const WhitelistAddressList: FC<WhitelistAddressListProps> = ({
  offeringParticipants,
  contractId,
  currentSalePrice,
  investmentCurrency,
}) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WHITELIST_OBJECT);
  const [selectedParticipant, setSelectedParticipant] = React.useState<string | undefined>(undefined);

  return (
    <>
      <RightSideBar formOpen={!!selectedParticipant} onClose={() => setSelectedParticipant(null)}>
        <div className="w-full">
          {selectedParticipant && (
            <SelectedParticipantDetails
              selection={selectedParticipant}
              participants={offeringParticipants}
              contractId={contractId}
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
                contractId={contractId}
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
