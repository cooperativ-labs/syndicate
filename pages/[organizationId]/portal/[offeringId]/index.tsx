import PortalWrapper from '@src/containers/PortalWrapper';

import React, { FC } from 'react';

const PortalOfferingPage: FC = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <PortalWrapper>portal offering page</PortalWrapper>
    </div>
  );
};

export default PortalOfferingPage;
