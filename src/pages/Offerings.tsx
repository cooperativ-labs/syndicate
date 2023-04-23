import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC } from 'react';

import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';

const Offerings: FC = () => {
  const { data: session, status } = useSession();
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
              <OfferingsList offerings={offerings} organizationId={organization} />
              <MajorActionButton className="w-full md:w-96" link="offerings/create-offering">
                Create another Offering
              </MajorActionButton>
            </>
          ) : (
            <LimitedWidthSection center>
              {/* <EnsureProfileCompletion
                user={user}
                explainerText="In order to create an offering, we first need some personal information"
              >
                <CreateOffering />
              </EnsureProfileCompletion> */}
            </LimitedWidthSection>
          )}
        </section>
      </div>
    </div>
  );
};

export default Offerings;
