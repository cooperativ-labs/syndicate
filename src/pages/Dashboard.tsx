import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import OfferingFinder from '@src/components/offering/OfferingFinder';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useContext, useState } from 'react';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_USER } from '@src/utils/dGraphQueries/user';

import AddItemButton from '@src/components/buttons/AddItemButton';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import router from 'next/router';
import { ApplicationStoreProps, store } from '@context/store';
import { cleanOrganizationArray, handleOrganizationChange } from '@src/utils/helpersOrganization';
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
  const participantOfferings = participantData?.queryOfferingParticipant.map((offeringParticipant) => {
    return offeringParticipant.offering;
  });
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      {/* <button onClick={handleClick}>Log User</button> */}
      {/* <div className="mx-auto"> */}

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
          {hasOrganizations && (
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
                    <img className="w-10 h-10 rounded-full mr-4" src={organization.logo} alt="Avatar of Organization" />
                    <h3 className="text-lg text-blue-900 font-semibold">{organization.name}</h3>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex mt-4">
            {showCreateOrganization ? (
              <CreateOrganization />
            ) : (
              <AddItemButton
                classNames="w-full p-4 border-cLightBlue text-cLightBlue hover:text-slate-200 hover:bg-slate-500 rounded-md my-2 items-center cursor-pointer"
                text="Create Organization"
                onClick={() => {
                  setShowCreateOrganization(true);
                }}
              />
            )}
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
    </div>
  );
};

export default Dashboard;
