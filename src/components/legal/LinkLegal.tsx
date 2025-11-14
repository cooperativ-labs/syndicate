import { getCurrencyOption } from '@src/utils/enumConverters';
import { GenerateLegalLink } from '@src/utils/helpersAgreement';
import { getAvailableContracts } from '@src/utils/helpersContracts';
import { MatchSupportedChains } from '@src/web3/wagmi';
import axios from 'axios';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount, useChainId } from 'wagmi';

import { Offering, OfferingFull } from '@/types';

import CreateShareContract from '../offering/CreateShareContract';
import UnestablishedContractCard from '../offering/UnestablishedContractCard';

import LinkLegalForm from './LinkLegalForm';

export type AgreementContentType = {
  signature: string;
};

type AgreementText = {
  custom: string;
  standard: string;
};

type LinkLegalProps = {
  offering: OfferingFull;
};

const LinkLegal: React.FC<LinkLegalProps> = ({ offering }) => {
  const chainId = useChainId();
  const { chain } = useAccount();
  const legalEntity = offering.legalEntity;
  const [agreementContent, setAgreementContent] = useState<AgreementContentType>({
    signature: ''
  });

  const standardAgreement = `/assets/legal-link/legal-link.md`;
  const getStandardAgreementText = async (): Promise<AgreementText['standard']> =>
    axios.get(standardAgreement).then(resp => resp.data);
  const { value: standardAgreementText } = useAsync(getStandardAgreementText, []);

  const { signature } = agreementContent;

  const orgLegalName = legalEntity?.legal_name;
  const offerEntityGP = legalEntity?.owners ? legalEntity.owners[0]?.legal_name : orgLegalName;

  const availableContract =
    legalEntity?.smart_contracts && getAvailableContracts(legalEntity.smart_contracts, chainId);

  const backingToken = availableContract?.backingToken;
  const bacToken = getCurrencyOption(backingToken);
  const bacValue = bacToken?.value;
  const bacName = bacToken?.symbol;
  const bacId = bacToken?.address;

  const isTestNet = chain?.testnet;

  const agreement = GenerateLegalLink(
    {
      offeringId: offering.id,
      spvEntityName: orgLegalName,
      gpEntityName: offerEntityGP,
      contractAddress: availableContract?.cryptoAddress.address,
      chainName: MatchSupportedChains(chainId)?.name,
      bacName: bacName,
      bacAddress: bacId,
      signature: signature,
      isNotMainnet: isTestNet as boolean,
      agreementCurrency: bacName,
      baseUrl: window.location.origin
    },
    standardAgreementText ?? ''
  );

  return (
    <div className="flex flex-col gap">
      <h1 className="font-semibold text-lg">Create shares of {orgLegalName}</h1>
      {!availableContract ? (
        <div className="mt-5">
          <CreateShareContract
            contractCreatorId={legalEntity?.id}
            offeringId={offering.id.toString()}
          />
        </div>
      ) : (
        <div className="my-3">
          <UnestablishedContractCard unestablishedContract={availableContract} />
          <div className="mt-4">
            <LinkLegalForm
              setAgreementContent={setAgreementContent}
              availableContract={availableContract}
              agreement={agreement}
              bacValue={bacValue}
              bacName={bacName}
              bacId={bacId}
              entityId={legalEntity.id}
              spvEntityName={legalEntity.legalName}
              offeringId={offering.id.toString()}
            />
            {/* <FormChainWarning /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkLegal;
{
  /* ) : (
          <div className="font-bold text-center">
            Please switch to the{' '}
            <span className="text-yellow-600">{MatchSupportedChains(cryptoAddress.chainId).name} </span> network to
            establish this class.
          </div>
        )} */
}
