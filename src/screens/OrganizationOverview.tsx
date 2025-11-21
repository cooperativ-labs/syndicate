'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import { useUserContext } from '@contexts/UserContext';
import DashboardCard from '@src/components/cards/DashboardCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import CreateOffering from '@src/components/offering/CreateOffering';
import OfferingsList from '@src/components/offering/OfferingsList';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import React, { FC } from 'react';

import { OrganizationPermissionTypes } from '@/types';
import { OrganizationComplete } from '@/types';

const OrganizationOverview: FC<{ organization: OrganizationComplete }> = ({ organization }) => {
  const { isEditorOrAdmin, isAdmin } = useOrganizations();

  const legalEntities = organization?.legalEntities;

  const legalEntitiesWithOfferingCount = legalEntities?.map(entity => ({
    id: entity.id,
    legal_name: entity.legal_name,
    offeringCount: entity.offerings.length
  }));

  const offerings = legalEntities?.flatMap(entity => entity.offerings);

  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const hasOfferings = offerings && offerings.length > 0;

  return (
    <div data-test="component-OrganizationOverview" className="flex flex-col w-full h-full">
      <TwoColumnLayout>
        {hasOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">
              Your current offerings:{' '}
            </h2>
            <OfferingsList offerings={offerings} organizationId={organization.id.toString()} />
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
            <CreateOffering legalEntities={legalEntitiesWithOfferingCount} />
          </DashboardCard>
        )}
      </TwoColumnLayout>
    </div>
  );
};

export default OrganizationOverview;
