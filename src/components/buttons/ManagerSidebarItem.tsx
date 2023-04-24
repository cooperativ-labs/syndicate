import cn from 'classnames';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';

interface ManagerSidebarItemProps {
  title: string;
  link: string;
}

const ManagerSidebarItem: FC<ManagerSidebarItemProps> = ({ title, link }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar } = applicationStore;
  const isSelected = router.pathname.includes(title.toLocaleLowerCase());

  const windowSize = useWindowSize();
  const buttonClass = cn(
    'p-3 m-1 w-full text-sm text-left font-semibold uppercase  hover:text-cDarkBlue hover:bg-gray-100 rounded-md focus:outline-none',
    isSelected ? 'bg-gray-200 text-cDarkBlue hover:bg-gray-200' : 'text-gray-500'
  );
  return (
    <Link href={link}>
      {windowSize.width < 768 ? (
        <button onClick={() => dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' })} className={buttonClass}>
          {title}
        </button>
      ) : (
        <button className={buttonClass}>{title}</button>
      )}
    </Link>
  );
};

export default ManagerSidebarItem;
