import cn from 'classnames';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';
import { ManagerSideBarItemSelectionType } from '@src/containers/sideBar/ManagerSideBarContents';

interface ManagerSidebarItemProps {
  title: ManagerSideBarItemSelectionType;
  link: string;
  // isSelected: ManagerSideBarItemSelectionType;
  // setIsSelected: (value: ManagerSideBarItemSelectionType) => void;
}

const ManagerSidebarItem: FC<ManagerSidebarItemProps> = ({ title, link }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar } = applicationStore;
  const path = router.pathname.split('/')[2] ?? 'overview';
  const isSelected = path === title.toLocaleLowerCase();

  const buttonClass = cn(
    'p-3 m-1 w-full text-sm text-left font-semibold uppercase  hover:text-cDarkBlue hover:bg-gray-100 rounded-md focus:outline-none',
    isSelected ? 'bg-gray-200 text-cDarkBlue hover:bg-gray-200' : 'text-gray-500'
  );

  const handleClick = () => {
    dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' });
  };

  return (
    <Link href={link}>
      <button className={buttonClass} onClick={handleClick}>
        {title}
      </button>
    </Link>
  );
};

export default ManagerSidebarItem;
