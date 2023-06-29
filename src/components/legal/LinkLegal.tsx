import axios from 'axios';
import LinkLegalForm from './LinkLegalForm';
import React, { useState } from 'react';
import { getCurrencyOption } from '@src/utils/enumConverters';

import CreateShareContract from '../offering/CreateShareContract';
import UnestablishedContractCard from '../offering/UnestablishedContractCard';
import { GenerateLegalLink } from '@src/utils/helpersAgreement';
import { getAvailableContracts } from '@src/utils/helpersContracts';
import { MatchSupportedChains } from '@src/web3/connectors';
import { Offering, User } from 'types';
import { useAsync } from 'react-use';
import { useChainId, useNetwork } from 'wagmi';

export type AgreementContentType = {
  signature: string;
};

type AgreementText = {
  custom: string;
  standard: string;
};

type LinkLegalProps = {
  offering: Offering;
  user: User;
};

const LinkLegal: React.FC<LinkLegalProps> = ({ offering, user }) => {
  const chainId = useChainId();
  const { chain } = useNetwork();

  const [agreementContent, setAgreementContent] = useState<AgreementContentType>({
    signature: '',
  });

  const standardAgreement = `/assets/legal-link/legal-link.md`;
  const getStandardAgreementText = async (): Promise<AgreementText['standard']> =>
    axios.get(standardAgreement).then((resp) => resp.data);
  const { value: standardAgreementText } = useAsync(getStandardAgreementText, []);

  const { signature } = agreementContent;
  const offeringEntity = offering.offeringEntity;
  const orgLegalName = offeringEntity?.legalName;
  const offerEntityGP = offeringEntity?.owners ? offeringEntity.owners[0]?.legalName : orgLegalName;

  const availableContract =
    offeringEntity?.smartContracts && getAvailableContracts(offeringEntity.smartContracts, chainId);

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
      baseUrl: window.location.origin,
    },
    standardAgreementText ?? ''
  );

  return (
    <div className="flex flex-col gap">
      <h1 className="font-semibold text-lg">Create shares of {orgLegalName}</h1>
      {!availableContract ? (
        <div className="mt-5">
          <CreateShareContract contractCreatorId={offeringEntity?.id} />
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
              entityId={offeringEntity.id}
              spvEntityName={offeringEntity.legalName}
              offeringId={offering.id}
              organizationId={offeringEntity.organization.id}
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
