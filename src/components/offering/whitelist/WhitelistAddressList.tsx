import React, { FC } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import SelectedParticipantDetails from './SelectedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { Currency, Maybe, OfferingParticipant, OfferingSmartContractSet } from 'types';

import { REMOVE_WHITELIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { String0x } from '@src/web3/helpersChain';

import { getCurrencyOption } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';

type WhitelistAddressListProps = {
  offeringId: string;
  offeringParticipants: Maybe<Maybe<OfferingParticipant>[]> | undefined;
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  currentSalePrice: Maybe<number> | undefined;
  investmentCurrency: Maybe<Currency> | undefined;
  issuances: any[];
  refetchContracts: () => void;
};

const WhitelistAddressList: FC<WhitelistAddressListProps> = ({
  offeringId,
  offeringParticipants,
  contractSet,
  currentSalePrice,
  investmentCurrency,
  issuances,
  refetchContracts,
}) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WHITELIST_OBJECT);
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
              participants={offeringParticipants}
              contractSet={contractSet}
              currentSalePrice={currentSalePrice}
              paymentTokenDecimals={getCurrencyOption(investmentCurrency)?.decimals}
              removeMember={removeMember}
              partitions={partitions}
              offeringId={offeringId}
              issuanceList={issuances}
              refetchContracts={refetchContracts}
            />
          )}
        </div>
      </RightSideBar>
      <div className="w-full">
        {offeringParticipants?.map((participant, i) => {
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
