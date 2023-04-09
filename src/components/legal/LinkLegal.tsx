import axios from 'axios';
import LinkLegalForm from './LinkLegalForm';
import PresentLegalText from './PresentLegalText';
import React, { useState } from 'react';
import { getCurrencyOption } from '@src/utils/enumConverters';

import CreateShareClass from '../offering/CreateShareClass';
import UnestablishedContractCard from '../offering/UnestablishedContractCard';
import { GenerateLegalLink } from '@src/utils/helpersAgreement';
import { GetAvailableContracts } from '@src/utils/helpersContracts';
import { MatchSupportedChains, setChainId } from '@src/web3/connectors';
import { Offering, User } from 'types';
import { useAsync } from 'react-use';
import { useNetwork } from 'wagmi';

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
  const { chain } = useNetwork();
  const chainId = chain?.id;
  const [agreementContent, setAgreementContent] = useState<AgreementContentType>({
    signature: '',
  });

  const standardAgreement = `/assets/legal-link/legal-link.md`;
  const getStandardAgreementText = async (): Promise<AgreementText['standard']> =>
    axios.get(standardAgreement).then((resp) => resp.data);
  const { value: standardAgreementText } = useAsync(getStandardAgreementText, []);

  if (!user) {
    return <></>;
  }

  const { signature } = agreementContent;
  const offeringEntity = offering.offeringEntity;
  const orgLegalName = offeringEntity.fullName;
  const offerEntityGP = offeringEntity.owners[0];
  const availableContract = GetAvailableContracts(offeringEntity.smartContracts, chainId)[0];
  const backingToken = availableContract?.backingToken;
  const bacToken = getCurrencyOption(backingToken);
  const bacValue = bacToken?.value;
  const bacName = bacToken?.symbol;
  const bacId = bacToken?.address;

  const isMainNet = availableContract?.cryptoAddress.chainId === 12345678;

  const agreement = GenerateLegalLink(
    {
      offeringId: offering.id,
      spvEntityName: orgLegalName,
      gpEntityName: offerEntityGP.fullName,
      contractAddress: availableContract?.cryptoAddress.address,
      chainName: MatchSupportedChains(chainId)?.name,
      bacName: bacName,
      bacAddress: bacId,
      signature: signature,
      isNotMainnet: !isMainNet,
      agreementCurrency: bacName,
      baseUrl: window.location.origin,
    },
    standardAgreementText ?? ''
  );

  return (
    <div className="px-4 py-10">
      <div className="md:mx-4">
        <h1 className="text-3xl font-bold ">Create shares of {orgLegalName}</h1>
        {/* {cryptoAddress.chainId === chainId ? ( */}

        <div className="md:mt-10 lg:grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <div className="">
              {!availableContract ? (
                <div className="p-3 rounded-lg border-2 border-gray-400 my-4 md:w-96">
                  {/* <h1 className="text-cDarkBlue text-lg font-bold ">Step 1. Create Shares</h1> */}
                  <CreateShareClass
                    contractCreatorId={offeringEntity.id}
                    entityName={offeringEntity.fullName}
                    investmentCurrency={offering.details.investmentCurrency}
                  />
                </div>
              ) : (
                <div className="mb-3">
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
                      spvEntityName={offeringEntity.fullName}
                      offeringId={offering.id}
                    />
                    {/* <FormChainWarning /> */}
                  </div>
                </div>
              )}
              {/* </div> */}
            </div>
          </div>
          <div className="hidden md:flex border-t-1 lg:border-0 col-span-3 md:max-w-max">
            <PresentLegalText text={agreement} />
          </div>
        </div>
        {/* ) : (
          <div className="font-bold text-center">
            Please switch to the{' '}
            <span className="text-yellow-600">{MatchSupportedChains(cryptoAddress.chainId).name} </span> network to
            establish this class.
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LinkLegal;
