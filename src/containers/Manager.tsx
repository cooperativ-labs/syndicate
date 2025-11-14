import React, { FC } from 'react';

import NavBar from './NavigationBar';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  return (
    <div className=" w-full">
      <NavBar />
      <div className="grow z-10">
        <div className="mx-auto ">{children}</div>
        {/* <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div> */}
      </div>
    </div>
  );
};

export default Manager;
