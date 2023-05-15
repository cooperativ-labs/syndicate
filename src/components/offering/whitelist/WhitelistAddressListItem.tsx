import * as backendCtc from '../../../web3/ABI';
import cn from 'classnames';
import FormattedCryptoAddress from '../../FormattedCryptoAddress';
import Input from '@src/components/form-components/Inputs';
import React, { FC, useContext, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { ChainErrorResponses, StandardChainErrorHandling } from '@src/web3/helpersChain';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { OfferingParticipant } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { UPDATE_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type WhitelistAddressListItemProps = {
  participant: OfferingParticipant;
  contractId: string;
  currentSalePrice: number;
  setSelectedParticipant: (participantId: OfferingParticipant) => void;
  removeAddress: (walletAddress: string, whitelistItemID: string) => void;
};

const TEMP_participent_shares_tokens = 40; // Function should take wallet address and return the number of tokens

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({
  participant,
  contractId,
  currentSalePrice,
  setSelectedParticipant,
  removeAddress,
}) => {
  const { userWalletAddress } = useContext(ReachContext);

  const isYou = participant.walletAddress === userWalletAddress;

  return (
    <div
      className={cn(
        isYou && 'bg-gray-50',
        'relative md:grid grid-cols-11 gap-3 items-center  p-3  border-2 rounded-lg hover:shadow-md cursor-pointer'
      )}
      onClick={() => setSelectedParticipant(participant)}
    >
      <div className="col-span-6">
        <FormattedCryptoAddress
          chainId={1}
          address={participant.walletAddress}
          withCopy
          className="font-bold text-base "
          userName={participant.name}
          isYou={isYou}
        />
        <div className="text-sm">{`Shares: ${TEMP_participent_shares_tokens} `}</div>
        {/* <PresentWalletUser className="md:w-auto mt-2 font-medium" walletAddress={participant.address} /> */}
      </div>

      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">External ID:</div>
        <div className="md:w-auto  font-medium ">{participant.externalId}</div>
      </div>
      <div className="col-span-3 mt-3 md:mt-0 flex justify-end">
        {participant.permitted ? (
          <div className="font-bold text-emerald-700 uppercase center self-center mr-4">approved</div>
        ) : (
          <StandardButton
            text="Review Candidate"
            color="cLightBlue"
            onClick={() => setSelectedParticipant(participant)}
          />
        )}
      </div>
    </div>
  );
};

export default WhitelistAddressListItem;
