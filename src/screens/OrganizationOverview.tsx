'use client';

import { useQuery } from '@apollo/client/react';
import { useUserContext } from '@contexts/UserContext';
import {
  OfferingConnection,
  OfferingEdge,
  OfferingParticipant,
  OfferingParticipantConnection,
  OfferingParticipantEdge
} from '@gql/graphql';
import {
  GetOrganizationQuery,
  GetOffering_participantQuery,
  Organization,
  OrganizationConnection
} from '@gql/graphql';
import DashboardCard from '@src/components/cards/DashboardCard';
import { toastExperiment } from '@src/components/indicators/Notifications';
import LoadingModal from '@src/components/loading/ModalLoading';
import CreateOffering from '@src/components/offering/CreateOffering';
import OfferingFinder from '@src/components/offering/OfferingFinder';
import OfferingsList from '@src/components/offering/OfferingsList';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import { GET_OFFERING_PARTICIPANT, GET_ORG_OFFERINGS } from '@src/utils/graphQueries/offering';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { GET_USER } from '@src/utils/graphQueries/user';
import { useParams } from 'next/navigation';
import React, { FC } from 'react';
import { useAccount } from 'wagmi';
import { getIsAdmin } from '@src/utils/helpersUserAndEntity';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useOrganizations } from '@contexts/OrganizationsContext';

const OrganizationOverview: FC = () => {
  const { user } = useUserContext();
  const { chosenOrganization } = useOrganizations();
  const { address: userWalletAddress } = useAccount();

  const userId = user?.id;

  const { data: participantData } = useQuery<GetOffering_participantQuery>(
    GET_OFFERING_PARTICIPANT,
    {
      variables: { walletAddress: userWalletAddress }
    }
  );

  const legalEntities = chosenOrganization?.legal_entities;

  const offerings = legalEntities?.flatMap(entity => entity.offering);

  if (!chosenOrganization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = participantData?.participantCollection?.edges?.map(
    (offeringParticipant: OfferingParticipantEdge) => {
      return offeringParticipant.node.offering;
    }
  );

  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;
  const isAdmin = userId && getIsAdmin(userId, chosenOrganization);
  const isEditorOrAdmin = getIsEditorOrAdmin(userId, chosenOrganization);

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
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">
              Your current offerings:{' '}
            </h2>
            <OfferingsList offerings={offerings} />
          </div>
        )}
        <DashboardCard>
          <h2 className="text-cDarkBlue text-xl font-bold mb-8 ">{`${isAdmin ? 'Manage ' : ''}Team`}</h2>
          <TeamMemberList
            teamMembers={chosenOrganization.organization_user}
            organizationId={chosenOrganization.id}
            isAdmin={isAdmin}
          />
          <div className="mt-3 rounded-lg p-1 px-2 ">
            <SectionBlock className="font-bold " sectionTitle={'Add team members'} mini asAccordion>
              <SettingsAddTeamMember organizationId={chosenOrganization.id} />
            </SectionBlock>
          </div>
        </DashboardCard>
        {isEditorOrAdmin && (
          <DashboardCard>
            <h2 className="text-xl  text-blue-900 font-semibold mb-4">Create an offering:</h2>
            <CreateOffering organization={chosenOrganization} />
          </DashboardCard>
        )}
      </TwoColumnLayout>
    </div>
  );
};

export default OrganizationOverview;
