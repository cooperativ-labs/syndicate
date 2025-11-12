'use client';

import { useUserContext } from '@contexts/UserContext';
import DashboardCard from '@src/components/cards/DashboardCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import CreateOffering from '@src/components/offering/CreateOffering';
import OfferingsList from '@src/components/offering/OfferingsList';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import { getOfferingParticipant } from '@src/utils/actions/offeringActions';
import { getIsAdmin } from '@src/utils/helpersUserAndEntity';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount } from 'wagmi';

import { OfferingParticipant, OrganizationPermissionTypes, OrganizationUser } from '@/types';
import { OrganizationComplete } from '@/types';

const OrganizationOverview: FC<{ organization: OrganizationComplete }> = ({ organization }) => {
  const { user } = useUserContext();
  const { address: userWalletAddress } = useAccount();
  const [participantOfferings, setParticipantOfferings] = useState<OfferingParticipant[]>([]);
  const userId = user?.id;

  useAsync(async () => {
    if (userWalletAddress) {
      const offeringParticipants = await getOfferingParticipant({
        walletAddress: userWalletAddress
      });
      setParticipantOfferings(offeringParticipants);
    }
  }, [userWalletAddress]);

  const legalEntities = organization?.legalEntities;

  const offerings = legalEntities?.flatMap(entity => entity.offerings);

  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const hasOfferings = offerings && offerings.length > 0;
  const isParticipant = participantOfferings?.length > 0;
  const organizationUsers = organization.organizationUsers as {
    id: string;
    user_id: string;
    permissions: OrganizationPermissionTypes[];
  }[];

  const isAdmin = userId && getIsAdmin({ userId, organizationUsers });
  const isEditorOrAdmin = getIsEditorOrAdmin({
    userId,
    organizationUsers: organization.organizationUsers as OrganizationUser[]
  });
  return (
    <div data-test="component-OrganizationOverview" className="flex flex-col w-full h-full">
      <TwoColumnLayout>
        {hasOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">
              Your current offerings:{' '}
            </h2>
            <OfferingsList offerings={offerings} organization={organization} />
          </div>
        )}
        <DashboardCard>
          <h2 className="text-cDarkBlue text-xl font-bold mb-8 ">{`${isAdmin ? 'Manage ' : ''}Team`}</h2>
          <TeamMemberList
            teamMembers={organization.organizationUsers}
            organizationId={organization.id.toString()}
            isAdmin={isAdmin}
          />
          <div className="mt-3 rounded-lg p-1 px-2 ">
            <SectionBlock className="font-bold " sectionTitle={'Add team members'} mini asAccordion>
              <SettingsAddTeamMember organizationId={organization.id.toString()} />
            </SectionBlock>
          </div>
        </DashboardCard>
        {isEditorOrAdmin && (
          <DashboardCard>
            <h2 className="text-xl  text-blue-900 font-semibold mb-4">Create an offering:</h2>
            <CreateOffering organization={organization} />
          </DashboardCard>
        )}
      </TwoColumnLayout>
    </div>
  );
};

export default OrganizationOverview;
