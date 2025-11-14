import { useAnalytics } from '@hooks/analytics';
import CookieBanner from '@src/CookieBanner';
import { setCookieApproval } from '@src/utils/helpersServer';
import React, { useState } from 'react';

import AnalyticsContext from '@/contexts/analytics';

type AnalyticsContextProps = {
  children: React.ReactNode;
  analyticsCookies: string | undefined;
};

const AnalyticsContextProvider: React.FC<AnalyticsContextProps> = ({
  children,
  analyticsCookies
}) => {
  const [dynamicDimensions, setDynamicDimensions] = useAnalytics();
  const [analyticsApproved, setAnalyticsApproved] = useState<string | undefined>(analyticsCookies);
  const analyticsContext = { dynamicDimensions, setDynamicDimensions };

  const handleAnalyticsApproval = async () => {
    setAnalyticsApproved('approved');
    await setCookieApproval();
    window.location.reload();
  };

  return (
    <AnalyticsContext.Provider value={analyticsContext}>
      {children}
      {analyticsApproved !== 'approved' && (
        <CookieBanner handleAnalyticsApproval={handleAnalyticsApproval} />
      )}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContextProvider;
