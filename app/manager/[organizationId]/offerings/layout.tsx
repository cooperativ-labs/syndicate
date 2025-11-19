import React from 'react';

const OfferingsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-test="layout-offerings" className="flex flex-col w-full h-full mx-auto p-8">
      <div style={{ maxWidth: '1580px' }}>{children}</div>
    </div>
  );
};

export default OfferingsLayout;
