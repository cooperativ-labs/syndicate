import Button from '@src/components/buttons/Button';
import CloseButton from '@src/components/buttons/CloseButton';
import cn from 'classnames';
import React, { FC, ReactNode, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type RightSidebarProps = {
  children: ReactNode;
  formOpen: boolean;
  onClose: () => void;
};

const RightSidebar: FC<RightSidebarProps> = ({ children, formOpen, onClose }) => {
  useEffect(() => {
    let targetElement = document.getElementById('sidebar-curtain');
    function handleMouseDown(e: MouseEvent) {
      if (e.target === targetElement) {
        onClose();
      }
    }
    function handleMouseUp(e: MouseEvent) {
      e.stopPropagation();
    }
    targetElement?.addEventListener('mousedown', handleMouseDown);
    targetElement?.addEventListener('mouseup', handleMouseUp, true);
    return () => {
      targetElement?.removeEventListener('mousedown', handleMouseDown);
      targetElement?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onClose]);

  return (
    <>
      {formOpen && (
        <div
          id="sidebar-curtain"
          className={
            'w-screen md:h-screen fixed top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-20 md:bg-opacity-80 '
          }
        >
          <div className={'z-50 absolute right-0 left-1/3 top-0 bottom-0 p-3 bg-white shadow-xl overflow-y-scroll'}>
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
