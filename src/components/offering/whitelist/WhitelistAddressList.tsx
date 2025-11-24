import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@src/components/ui/sheet';
import { String0x } from '@src/web3/helpersChain';
import React, { FC } from 'react';

import { CurrencyCodeType, OfferingDistribution } from '@/types';

import SelectedParticipantDetails, { SelectedParticipantProps } from './SelctedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';

export type WhitelistAddressListProps = {
  investorListRefreshTrigger: number;
  triggerInvestorListRefresh: () => void;
};

type WhitelistAddressListPropsLocal = SelectedParticipantProps &
  WhitelistAddressListProps & {
    distributions: OfferingDistribution[];
    offeringId: string;
    investmentCurrency: CurrencyCodeType;
  };

const WhitelistAddressList: FC<WhitelistAddressListPropsLocal> = ({
  distributions,
  offeringId,
  offeringParticipants,
  contractSet,
  currentSalePrice,
  organizationId,
  transferEventList,
  investorListRefreshTrigger,
  triggerInvestorListRefresh,
  refetchContracts
}) => {
  const [selectedParticipant, setSelectedParticipant] = React.useState<string | undefined>(
    undefined
  );

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const partitions = contractSet?.shareContract?.partitions as String0x[];

  return (
    <>
      <div className='w-full'>
        {offeringParticipants?.map((participant, i) => {
          return (
            <div className='mb-3' key={i}>
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
      <Sheet
        open={!!selectedParticipant}
        onOpenChange={open => !open && setSelectedParticipant(undefined)}
      >
        <SheetContent className='sm:max-w-2/3 p-6 overflow-y-scroll '>
          <SheetHeader>
            <SheetTitle>Whitelist Address List</SheetTitle>
          </SheetHeader>

          <div className='w-full mt-3'>
            {selectedParticipant && (
              <SelectedParticipantDetails
                selection={selectedParticipant}
                offeringParticipants={offeringParticipants}
                contractSet={contractSet}
                distributions={distributions}
                currentSalePrice={currentSalePrice}
                partitions={partitions}
                offeringId={offeringId}
                organizationId={organizationId}
                transferEventList={transferEventList}
                refetchContracts={refetchContracts}
                setSelectedParticipant={setSelectedParticipant}
                triggerInvestorListRefresh={triggerInvestorListRefresh}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WhitelistAddressList;
