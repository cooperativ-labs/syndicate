import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import CreateOffering from '@src/components/offering/CreateOffering';
import EnsureProfileCompletion from '@src/containers/EnsureProfileCompletion';
import OfferingFinder from '@src/components/offering/OfferingFinder';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useContext } from 'react';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getUserOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { ReachContext } from '@src/SetReachContext';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

// type DashboardProps = {
//   user: User;
// };

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const { data: userData, error } = useQuery(GET_USER, { variables: { id: session.user.id } });
  const user = userData?.queryUser[0];
  const { userWalletAddress } = useContext(ReachContext);
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress },
  });

  if (!user) {
    return <></>;
  }

  const participantOfferings = participantData?.queryOfferingParticipant.map((offeringParticipant) => {
    return offeringParticipant.offering;
  });

  const offerings = getUserOfferingsFromEntity(user);

  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
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
          <EnsureProfileCompletion
            user={user}
            explainerText="In order to create an offering, we first need some personal information"
          >
            <CreateOffering />
          </EnsureProfileCompletion>
        </div>
        <div className="col-span-1">
          {hasOfferings && (
            <div>
              <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your current offerings: </h2>
              <OfferingsList offerings={offerings} />
            </div>
          )}
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
