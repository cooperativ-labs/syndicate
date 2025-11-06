'use client';

import InvestorApplicationForm from '@src/components/investor/applicationForm/InvestorApplicationForm';

import Header from '@src/containers/Header';
import PortalWrapper from '@src/containers/PortalWrapper';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';

type Params = {
  params: Promise<{ organizationId: string; offeringId: string }>;
};

export default async function InvestorApplicationPage({ params }: Params) {
  const { organizationId, offeringId } = await params;
  const [offering, organization] = await Promise.all([
    getOfferingById(offeringId),
    getOrganization(organizationId)
  ]);

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div data-test="investor-application" className="w-screen h-full pb-10 md:pb-20">
      <PortalWrapper organization={organization}>
        <Header offering={offering} small realEstateProperties={[]} />
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <div className="md:mx-6 w-full">
            <div className="grow h-full z-10">
              <div className="h-full px-2 py-2 md:mt-4">
                <div className="mx-auto min-h-full">
                  <InvestorApplicationForm offering={offering} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalWrapper>
    </div>
  );
}
