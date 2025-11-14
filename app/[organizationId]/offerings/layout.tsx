import WithAuthentication from '@src/containers/WithAuthentication';
import React from 'react';

const OfferingsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full mx-auto p-8">
      <div style={{ maxWidth: '1580px' }}>
        <WithAuthentication>{children}</WithAuthentication>
      </div>
    </div>
  );
};

export default OfferingsLayout;
