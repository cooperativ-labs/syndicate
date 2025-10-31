import { useAnalytics } from "@hooks/analytics";
import React from "react";

import AnalyticsContext from "@/contexts/analytics";

type SetCookieContextProps = {
  children: React.ReactNode;
};

const SetCookieContext: React.FC<SetCookieContextProps> = ({ children }) => {
  const [dynamicDimensions, setDynamicDimensions] = useAnalytics();
  const analyticsContext = { dynamicDimensions, setDynamicDimensions };
  return (
    <AnalyticsContext.Provider value={analyticsContext}>{children} </AnalyticsContext.Provider>
  );
};

export default SetCookieContext;
