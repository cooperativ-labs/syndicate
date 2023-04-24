import Button from '@src/components/buttons/Button';
import CloseButton from '@src/components/buttons/CloseButton';
import cn from 'classnames';
import Link from 'next/link';
import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Offering } from 'types';
import { useWindowSize } from 'react-use';

type RightSidebarProps = {
  children: ReactNode;
  formOpen: boolean;
  onClose: () => void;
};

const RightSidebar: FC<RightSidebarProps> = ({ children, formOpen, onClose }) => {
  return (
    <>
      {formOpen && (
        <div
          id="sidebar-curtain"
          className="absolute top-0 bottom-0 right-0 left-0 z-40 bg-gray-500 bg-opacity-80 overflow-y-auto"
          onClick={(e: any) => {
            /** @TODO : fix typescript */
            if (e.target.id === 'sidebar-curtain') {
              // onClose();
            }
          }}
        >
          <div className={'z-50 absolute right-0 left-1/3 top-0 p-3 bg-white shadow-xl'}>
            <CloseButton
              onClick={() => {
                onClose();
              }}
            />
            <div className="flex justify-between items-center mb-5">
              <div className={cn(formOpen ? 'flex md:hidden' : 'hidden')}>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                >
                  <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
                </Button>
              </div>
            </div>
            <div className="mb-5 px-2 pr-4 md:pr-10 md:mt-4 "> {children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
