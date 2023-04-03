import * as backendCtc from '../../../web3/index.main';
import React, { FC, useContext } from 'react';
import WhitelistAddressListItem from './WhitelistAddressListItem';
import { ChainErrorResponses, StandardChainErrorHandling } from '@src/web3/helpersChain';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { OfferingParticipant } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { REMOVE_WHITELIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type WhitelistAddressListProps = {
  offeringParticipants: OfferingParticipant[];
  offeringId: string;
  contractId: string;
};

const WhitelistAddressList: FC<WhitelistAddressListProps> = ({ offeringParticipants, offeringId, contractId }) => {
  const { reachAcc } = useContext(ReachContext);
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WHITELIST_OBJECT);

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
    <div className="w-full">
      {offeringParticipants.map((participant, i) => {
        return (
          <div className="mb-3" key={i}>
            <WhitelistAddressListItem participant={participant} contractId={contractId} removeAddress={removeAddress} />
          </div>
        );
      })}
    </div>
  );
};

export default WhitelistAddressList;
