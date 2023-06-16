import Card from '@src/components/cards/Card';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useState } from 'react';
import { cleanOrganizationArray, handleOrganizationChange } from '@src/utils/helpersOrganization';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { OfferingParticipant } from 'types';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const { address: userWalletAddress } = useAccount();
  const { data: userData, error } = useQuery(GET_USER, { variables: { id: session?.user.id } });
  const user = userData?.queryUser[0];
  const [showCreateOrganization, setShowCreateOrganization] = useState(false);

  const organizations = cleanOrganizationArray(user?.organizations);
  const hasOrganizations = organizations?.length > 0;

  // For Participants
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress },
  });
  const participantOfferings = participantData?.queryOfferingParticipant.map(
    (offeringParticipant: OfferingParticipant) => {
      return offeringParticipant.offering;
    }
  );
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      {/* <button onClick={handleClick}>Log User</button> */}
      {/* <div className="mx-auto"> */}

      {!hasOrganizations ? (
        <div className="flex flex-col w-full h-full items-center">
          <h1 className="text-2xl mb-4 text-center">
            {`Welcome to Cooperativ's portal for creating and managing investment funds.`}
          </h1>
          <h2 className="text-2xl font-medium mb-8 text-center">Start by creating an organization.</h2>
          <Card className="rounded-lg shadow-box p-4 " style={{ width: 700 }}>
            <h2 className="text-xl text-cDarkBlue mb-8 ">
              {`You manage your brand and team members at the organization level. Each organization can manage multiple
        funds.`}
            </h2>
            <CreateOrganization />
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {/* <div className="col-span-2 p-6 border-2 rounded-md">
          <h2 className="text-xl  text-blue-900 font-semibold">Create an offering:</h2>
          <EnsureProfileCompletion
            user={user}
            explainerText="In order to create an offering, we first need some personal information"
          >
            <CreateOffering />
          </EnsureProfileCompletion>
        </div> */}
          <div className="col-span-1">
            <div>
              <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your Organizations </h2>
              {organizations.map((organization) => {
                return (
                  <div
                    key={organization.id}
                    className="p-4 flex bg-slate-300 rounded-md my-2 items-center cursor-pointer"
                    onClick={() => {
                      handleOrganizationChange(organization.id);
                    }}
                  >
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={organization.logo as string}
                      alt="Avatar of Organization"
                    />
                    <h3 className="text-lg text-blue-900 font-semibold">{organization.name}</h3>
                  </div>
                );
              })}
            </div>
            {isParticipant ? (
              <div>
                <h2 className="text-xl md:mt-8 mb-5  text-blue-900 font-semibold">Your Investments: </h2>
                <OfferingsList offerings={participantOfferings} />
              </div>
            ) : (
              <div className="flex mt-4">
                {!userWalletAddress && <ChooseConnectorButton buttonText={'Connect wallet to see investments'} large />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
