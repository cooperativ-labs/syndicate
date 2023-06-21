import Card from '@src/components/cards/Card';
import cn from 'classnames';
import React, { FC } from 'react';

type WalletActionModalProps = {
  noModal?: boolean;
  children: React.ReactNode;
  open?: boolean;
  metaMaskWarning?: boolean;
};

const WalletActionModal: FC<WalletActionModalProps> = ({ noModal, children, open, metaMaskWarning }) => {
  if (open) {
    return (
      <div data-test="component-create-entity-modal">
        <div
          id="dialog-curtain"
          className={cn(
            noModal
              ? 'fixed top-0 bottom-0 right-0 left-0 md:relative'
              : 'w-screen md:h-screen fixed top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-20 md:bg-opacity-80 overflow-y-scroll'
          )}
        >
          <div className="absolute right-0 left-0 top-32 ">
            <Card
              className=" mx-4 p-6 mb-10 flex-col md:mx-auto rounded-xl md:rounded-lg shadow-modal bg-white "
              style={{ overflow: 'smooth', maxWidth: '500px' }}
            >
              {metaMaskWarning && (
                <div className="p-3 border-2 border-orange-600 rounded-lg items-center mb-4">
                  {`Note: MetaMask will ask you to set a "custom spending cap". Please click`}
                  <strong>{`use default`}</strong>.
                </div>
              )}
              {children}
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WalletActionModal;
