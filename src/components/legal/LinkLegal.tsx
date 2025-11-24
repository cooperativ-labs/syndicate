import { getCurrencyOption } from '@src/utils/enumConverters';
import { GenerateLegalLink } from '@src/utils/helpersAgreement';
import { getAvailableContracts } from '@src/utils/helpersContracts';
import { capitalizeFirstLetter } from '@src/utils/helpersText';
import { MatchSupportedChains } from '@src/web3/wagmi';
import axios from 'axios';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount, useChainId } from 'wagmi';

import { OfferingFull, SmartContractWithCryptoAddress } from '@/types';

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
  shareContracts: SmartContractWithCryptoAddress[];
};

const LinkLegal: React.FC<LinkLegalProps> = ({ offering, shareContracts }) => {
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

  const availableContract = shareContracts && getAvailableContracts({ shareContracts, chainId });

  const backingToken = availableContract?.backing_token;
  const bacToken = getCurrencyOption(backingToken);
  const bacValue = bacToken?.value;
  const bacName = bacToken?.symbol;
  const bacId = bacToken?.address;

  const isTestNet = chain?.testnet;

  const agreement = GenerateLegalLink(
    {
      offeringId: offering.id,
      organizationId: offering.legalEntity?.organization_id,
      spvEntityName: orgLegalName ?? '',
      gpEntityName: offerEntityGP ?? '',
      contractAddress: availableContract?.crypto_address_id,
      chainName: MatchSupportedChains(chainId)?.name,
      bacName: bacName,
      bacAddress: bacId,
      signature: signature,
      isNotMainnet: isTestNet as boolean,
      agreementCurrency: bacName,
      baseUrl: window.location.origin,
      offeringPageUrl: `${window.location.origin}/portal/${offering.legalEntity?.organization_id}/${offering.id}`,
      termsOfServiceUrl: `${process.env.NEXT_PUBLIC_TERMS_URL}`,
      platformName: capitalizeFirstLetter(process.env.NEXT_PUBLIC_CLIENT ?? '[Platform Name]')
    },
    standardAgreementText ?? ''
  );

  return (
    <div className='flex flex-col gap h-full'>
      <h1 className='font-semibold text-lg'>Create shares of {orgLegalName}</h1>
      {!availableContract ? (
        <div className='mt-5'>
          <CreateShareContract
            contractCreatorId={legalEntity.id.toString()}
            offeringId={offering.id.toString()}
          />
        </div>
      ) : (
        <div className='my-3 h-full w-full'>
          <UnestablishedContractCard unestablishedContract={availableContract} />
          <div className='mt-4 '>
            <LinkLegalForm
              setAgreementContent={setAgreementContent}
              availableContract={availableContract}
              agreement={agreement}
              bacValue={bacValue}
              bacName={bacName}
              bacId={bacId}
              entityId={legalEntity.id.toString()}
              spvEntityName={legalEntity.legal_name ?? undefined}
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
