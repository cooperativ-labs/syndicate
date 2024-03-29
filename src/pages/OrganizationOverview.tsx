import CreateOffering from '@src/components/offering/CreateOffering';
import DashboardCard from '@src/components/cards/DashboardCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import OfferingFinder from '@src/components/offering/OfferingFinder';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useContext } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import toast, { Toaster } from 'react-hot-toast';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getIsAdmin, getIsEditorOrAdmin, getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { OfferingParticipant } from 'types';
import { toastExperiment } from '@src/components/indicators/Notifications';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// type OrganizationDashboardProps = {
//   user: User;
// };

const OrganizationOverview: FC = () => {
  const { data: session, status } = useSession();
  const { address: userWalletAddress } = useAccount();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const userId = session?.user.id;
  const { data: organizationData, error, loading, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress },
  });

  if (!organizationData) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = participantData?.queryOfferingParticipant.map(
    (offeringParticipant: OfferingParticipant) => {
      return offeringParticipant.offering;
    }
  );

  const offerings = organization && getOrgOfferingsFromEntity(organization);
  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;
  const isAdmin = userId && getIsAdmin(userId, organization);
  const isEditorOrAdmin = getIsEditorOrAdmin(userId, organization);

  return (
    <div data-test="component-OrganizationOverview" className="flex flex-col w-full h-full">
      {/* <button
        className="bg-blue-500 text-white p-3"
        onClick={() => toastExperiment({ title: 'hi', message: 'whhhattt' })}
      >
        Make me a toast
      </button> */}
      <TwoColumnLayout twoThirdsLayout>
        {hasOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your current offerings: </h2>
            <OfferingsList offerings={offerings} />
          </div>
        )}
        <DashboardCard>
          <h2 className="text-cDarkBlue text-xl font-bold mb-8 ">{`${isAdmin ? 'Manage ' : ''}Team`}</h2>
          <TeamMemberList
            teamMembers={organization.users}
            organizationId={organization.id}
            currentUserId={userId}
            isAdmin={isAdmin}
          />
          <div className="mt-3 rounded-lg p-1 px-2 ">
            <SectionBlock className="font-bold " sectionTitle={'Add team members'} mini asAccordion>
              <SettingsAddTeamMember organizationId={organization.id} />
            </SectionBlock>
          </div>
        </DashboardCard>
        {isEditorOrAdmin && (
          <DashboardCard>
            <h2 className="text-xl  text-blue-900 font-semibold mb-4">Create an offering:</h2>
            <CreateOffering organization={organization} refetch={refetch} />
          </DashboardCard>
        )}
      </TwoColumnLayout>
    </div>
  );
};

export default OrganizationOverview;
