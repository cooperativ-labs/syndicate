'use client';

import React, { FC } from 'react';

// End of Selectio

import ManagerSideBar from './sideBar/ManagerSideBar';
import NavBar from './NavigationBar';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        <ManagerSideBar />{' '}
      </div>
      <div className="md:mx-6 w-full">
        <NavBar />
        <div className="grow z-10">
          <div className=" px-2 py-2 md:mt-4">
            <div className="mx-auto ">{children}</div>
            {/* <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
