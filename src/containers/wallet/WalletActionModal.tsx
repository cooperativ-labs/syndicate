import Card from '@src/components/cards/Card';
import CloseButton from '@src/components/buttons/CloseButton';
import cn from 'classnames';
import React, { FC } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type WalletActionStepType = 'none' | 'step1' | 'step2';
type StepStatusType = 'waiting' | 'pending' | 'success' | 'error';

const WalletActionStep: FC<{ stepStatus: StepStatusType; message?: string }> = ({ stepStatus, message }) => {
  const icon =
    stepStatus === 'pending' ? (
      <img
        src="/assets/images/loading-circle.jpeg"
        aria-label="loading"
        className="h-10 mr-1 animate-spin bg-white rounded-full"
      />
    ) : stepStatus === 'success' ? (
      <FontAwesomeIcon icon={'fa-solid fa-check' as IconProp} />
    ) : stepStatus === 'error' ? (
      <FontAwesomeIcon icon={'fa-solid fa-circle-xmark' as IconProp} />
    ) : (
      <FontAwesomeIcon icon={'fa-regular circle-outline' as IconProp} />
    );

  return (
    <div className={'grid grid-cols-8 p-3 my-3 border-2 border-gray-200 rounded-lg items-center'}>
      <div className="flex justify-center col-span-1 text-2xl">{icon}</div>
      <div className="col-span-7 ">{message}</div>
    </div>
  );
};

type WalletActionModalProps = {
  noModal?: boolean;
  step: WalletActionStepType;
  step1Text?: string;
  step2Text?: string;
  step1Status: StepStatusType;
  step2Status: StepStatusType;
};

const WalletActionModal: FC<WalletActionModalProps> = ({
  noModal,
  step,
  step1Text,
  step2Text,
  step1Status,
  step2Status,
}) => {
  const open = step !== 'none';

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
              <WalletActionStep stepStatus={step1Status} message={step1Text} />
              <WalletActionStep stepStatus={step2Status} message={step2Text} />
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default WalletActionModal;
