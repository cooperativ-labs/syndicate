import PropertyDetails from '@src/screens/PropertyDetails';
import { getReProperty, getRePropertyAssets } from '@src/utils/actions/rePropertyActions';

import { Image, RealEstatePropertyWithAssets } from '@/types';

export default async function PropertyPage({
  params
}: {
  params: Promise<{ organizationId: string; entityId: string; propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = await getReProperty(propertyId);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div data-test='component-landing' className='h-full flex'>
      <PropertyDetails property={property} />
    </div>
  );
}
