import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import CreateOffering from '@src/components/offering/CreateOffering';
import OfferingFinder from '@src/components/offering/OfferingFinder';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useContext } from 'react';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { ReachContext } from '@src/SetReachContext';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { useRouter } from 'next/router';
import LoadingModal from '@src/components/loading/ModalLoading';

// type OrganizationDashboardProps = {
//   user: User;
// };

const OrganizationDashboard: FC = () => {
  const { data: session, status } = useSession();
  const { address: userWalletAddress } = useAccount();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData, error, loading, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress },
  });
  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = participantData?.queryOfferingParticipant.map((offeringParticipant) => {
    return offeringParticipant.offering;
  });

  const offerings = organization && getOrgOfferingsFromEntity(organization);
  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div data-test="component-OrganizationDashboard" className="flex flex-col w-full h-full">
      {/* <button onClick={handleClick}>Log User</button> */}
      {/* <div className="mx-auto"> */}
      <div className="p-4 bg-slate-300 rounded-md">
        <h2 className="text-lg mb-3 text-blue-900 font-semibold">Search for an offering by ID: </h2>
        <OfferingFinder />
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 p-6 border-2 rounded-md">
          <h2 className="text-xl  text-blue-900 font-semibold">Create an offering:</h2>
          <CreateOffering organization={organization} refetch={refetch} />
        </div>
        <div className="col-span-1">
          {hasOfferings && (
            <div>
              <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your current offerings: </h2>
              {/* <OfferingsList offerings={offerings} /> */}
            </div>
          )}
          {isParticipant ? (
            <div>
              <h2 className="text-xl md:mt-8 mb-5  text-blue-900 font-semibold">Your Investments: </h2>
              {/* <OfferingsList offerings={participantOfferings} /> */}
            </div>
          ) : (
            <div className="flex mt-4">
              {!userWalletAddress && <ChooseConnectorButton buttonText={'Connect wallet to see investments'} large />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
