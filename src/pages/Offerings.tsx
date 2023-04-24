import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC } from 'react';

import AddItemButton from '@src/components/buttons/AddItemButton';
import CloseButton from '@src/components/buttons/CloseButton';
import CreateOffering from '@src/components/offering/CreateOffering';
import DashboardCard from '@src/components/cards/DashboardCard';
import router from 'next/router';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

const Offerings: FC = () => {
  const { data: session, status } = useSession();
  const [entityFormOpen, setEntityFormOpen] = React.useState(false);
  const orgId = router.query.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;

  if (!organization) {
    return <></>;
  }

  const offerings = getOrgOfferingsFromEntity(organization);

  const hasOfferings = offerings?.length > 0;
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
                <AddItemButton
                  onClick={() => setEntityFormOpen(true)}
                  classNames="p-5 border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700 mt-5"
                  text="Add Offering"
                />
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
