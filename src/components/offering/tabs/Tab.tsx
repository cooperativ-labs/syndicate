import { cn } from '@src/lib/utils';
import React, { Dispatch, FC, SetStateAction } from 'react';

import { OfferingTabSectionTypes } from '@/types';

type TabProps = {
  label: string;
  activeTab: OfferingTabSectionTypes | string;
  tabId: OfferingTabSectionTypes | string;
  setActiveTab: Dispatch<SetStateAction<OfferingTabSectionTypes | string>>;
};

const Tab: FC<TabProps> = ({ label, activeTab, tabId, setActiveTab }) => {
  const active = activeTab === tabId;
  return (
    <button
      className={cn(
        active
          ? ' text-opacity-100 border-opacity-100'
          : 'text-opacity-50 hover:text-opacity-80 hover:border-cLightBlue',
        'col-span-1 p-2 px-6 text-center text-cLightBlue border-b-2 border-cLightBlue border-opacity-40 whitespace-nowrap'
      )}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );
};

export default Tab;
