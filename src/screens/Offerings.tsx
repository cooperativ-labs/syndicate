'use client';

import { useQuery } from '@apollo/client/react';
import AddItemButton from '@src/components/buttons/AddItemButton';
import CloseButton from '@src/components/buttons/CloseButton';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import DashboardCard from '@src/components/cards/DashboardCard';
import CreateOffering from '@src/components/offering/CreateOffering';
import OfferingsList from '@src/components/offering/OfferingsList';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { getIsEditorOrAdmin, getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import router from 'next/router';
import React, { FC } from 'react';

import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

const Offerings: FC = () => {
  const { user } = useSupabaseAuth();
  const [entityFormOpen, setEntityFormOpen] = React.useState(false);
  const orgId = router.query.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
    skip: !orgId
  });
  const organization = organizationData?.getOrganization;

  if (!organization) {
    return <></>;
  }
  const isAdminOrEditor = getIsEditorOrAdmin(session?.user?.id, organization);

  const offerings = getOrgOfferingsFromEntity(organization);

  const hasOfferings = offerings && offerings.length > 0;
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className="flex">
        <section>
          {hasOfferings ? (
            <>
              <OfferingsList offerings={offerings} />
              {entityFormOpen ? (
                <DashboardCard className="mt-5">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-medium text-cDarkBlue">Add Offering</h2>
                    <CloseButton onClick={() => setEntityFormOpen(false)} className="self-end" />
                  </div>
                  <CreateOffering organization={organization} refetch={refetch} />
                </DashboardCard>
              ) : (
                isAdminOrEditor && (
                  <AddItemButton
                    onClick={() => setEntityFormOpen(true)}
                    classNames="p-5 border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700 mt-5"
                    text="Add Offering"
                  />
                )
              )}
            </>
          ) : (
            <LimitedWidthSection center>
              <CreateOffering organization={organization} refetch={refetch} />
            </LimitedWidthSection>
          )}
        </section>
      </div>
    </div>
  );
};

export default Offerings;
