import * as backendCtc from '../../../web3/ABI';
import React, { FC, useContext } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import SelectedParticipantDetails from './SelectedParticipantDetails';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { ChainErrorResponses, StandardChainErrorHandling } from '@src/web3/helpersChain';
import { Currency, OfferingParticipant } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { ReachContext } from '@src/SetReachContext';
import { REMOVE_WHITELIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

const TEMP_offeringParticipants = [
  {
    id: '0x123',
    addressOfferingId: '0x0dBb2C4107d77EB34535840d63CF02aE46bedebD0x123',
    walletAddress: '0x0dBb2C4107d77EB34535840d63CF02aE46bedebD',
    chainId: 1,
    permitted: true,
    name: 'John Doe',
    lastUpdate: new Date(),
    creationDate: new Date(),
    investorApplication: {
      id: '0x2222',
      applicationDoc: {
        creationDate: new Date(),
        id: '0x3333',
        title: 'Application Doc',
        url: 'https://www.google.com',
        text: 'This is the application doc',
        owner: {
          id: '0x4444',
        },
      },
      signatories: [
        {
          id: '0x5555',
          name: 'John Doe',
        },
      ],
    },
    minPledge: 20,
    maxPledge: 60,
    jurisdiction: { country: 'US', province: 'CA' },
    paid: false,
    externalId: '87654321',
    offering: {
      details: {
        distributionCurrency: {
          code: 'USD',
        },
      },
      offeringEntity: {
        organization: {
          users: [
            {
              permissions: ['ADMIN'],
              user: {
                id: '0x2',
              },
            },
          ],
        },
      },
    },
  },
];

type WhitelistAddressListProps = {
  offeringParticipants: OfferingParticipant[];
  offeringId: string;
  contractId: string;
  currentSalePrice: number;
  investmentCurrency: Currency;
};

const WhitelistAddressList: FC<WhitelistAddressListProps> = ({
  offeringParticipants,
  offeringId,
  contractId,
  currentSalePrice,
  investmentCurrency,
}) => {
  const { reachAcc } = useContext(ReachContext);
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WHITELIST_OBJECT);
  const [selectedParticipant, setSelectedParticipant] = React.useState<OfferingParticipant | null>(null);

  const removeAddress = async (walletAddress: string, whitelistItemID: string) => {
    const ctc = reachAcc.contract(backendCtc, contractId);
    const call = async (f) => {
      try {
        await f();
        removeMember({ variables: { offeringId: offeringId, id: whitelistItemID, currentDate: currentDate } });
      } catch (e) {
        StandardChainErrorHandling(e);
      }
    };
    const apis = ctc.a;
    call(async () => {
      const apiReturn = await apis.remWL(walletAddress);
      alert(`${walletAddress} removed from whitelist`);

      return apiReturn;
    });
  };

  return (
    <>
      <RightSideBar formOpen={!!selectedParticipant} onClose={() => setSelectedParticipant(null)}>
        <div className="w-full">
          {selectedParticipant && (
            <SelectedParticipantDetails
              participant={selectedParticipant}
              contractId={contractId}
              currentSalePrice={currentSalePrice}
              investmentCurrency={investmentCurrency}
              removeAddress={removeAddress}
            />
          )}
        </div>
      </RightSideBar>
      <div className="w-full">
        {TEMP_offeringParticipants.map((participant, i) => {
          return (
            <div className="mb-3" key={i}>
              <WhitelistAddressListItem
                participant={participant}
                contractId={contractId}
                removeAddress={removeAddress}
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
