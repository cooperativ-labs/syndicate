'use client';

import InvestorApplicationForm from '@src/components/investor/applicationForm/InvestorApplicationForm';
import Header from '@src/containers/Header';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';
import { getRealEstatePropertiesFromOffering } from '@src/utils/actions/rePropertyActions';

import { RealEstatePropertyWithAssets } from '@/types';

type Params = {
  params: Promise<{ organizationId: string; offeringId: string }>;
};

export default async function InvestorApplicationPage({ params }: Params) {
  const { organizationId, offeringId } = await params;
  const [offering, organization] = await Promise.all([
    getOfferingById(offeringId),
    getOrganization(organizationId, '/portal/[offeringId]/investor-application')
  ]);

  if (!organization) {
    return <div>Organization not found</div>;
  }

  if (!offering) {
    return <div>Offering not found</div>;
  }

  const properties = await getRealEstatePropertiesFromOffering(offering.legalEntity.id.toString());
  const propertyImages =
    properties?.flatMap((property: RealEstatePropertyWithAssets) => property.images) ?? [];

  return (
    <div data-test='investor-application' className='w-screen h-full pb-10 md:pb-20'>
      <Header offering={offering} small offeringPropertyImages={propertyImages} />
      <div className='flex z-30 md:z-10 min-h-full '>
        <div className='md:mx-6 w-full'>
          <div className='grow h-full z-10'>
            <div className='h-full px-2 py-2 md:mt-4'>
              <div className='mx-auto min-h-full'>
                <InvestorApplicationForm offering={offering} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
