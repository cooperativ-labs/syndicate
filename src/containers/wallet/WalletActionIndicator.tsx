import React, { FC } from 'react';
import { faCheck, faClockFour, faWaveSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

type StepStatusType = 'waiting' | 'pending' | 'success' | 'error';

export type WalletActionStepType = LoadingButtonStateType;

const WalletActionStep: FC<{ stepStatus: StepStatusType; message?: string; subMessage?: string }> = ({
  stepStatus,
  message,
  subMessage,
}) => {
  const icon =
    stepStatus === 'pending' ? (
      <img
        src="/assets/images/loading-circle.png"
        aria-label="loading"
        className="h-10 mr-1 animate-spin bg-white rounded-full"
      />
    ) : stepStatus === 'success' ? (
      <FontAwesomeIcon icon={faCheck} />
    ) : stepStatus === 'error' ? (
      <FontAwesomeIcon icon={faXmark} />
    ) : (
      <FontAwesomeIcon icon={faWaveSquare} />
    );

  return (
    <div className={'grid grid-cols-8 p-3 border-2 border-gray-200 rounded-lg items-center  '}>
      <div className="flex justify-center col-span-1 text-2xl">{icon}</div>
      <div className="col-span-7 ">
        <div className=" text-lg text-cDarkBlue">{message}</div>
        {subMessage && <div className="font-medium text-sm text-cLightBlue">{subMessage}</div>}
      </div>
    </div>
  );
};

type WalletActionIndicatorProps = {
  noModal?: boolean;
  step: WalletActionStepType;
  step1Text: string;
  step2Text?: string;
  step1SubText?: string;
  step2SubText?: string;
};

const WalletActionIndicator: FC<WalletActionIndicatorProps> = ({
  step,
  step1Text,
  step2Text,
  step1SubText,
  step2SubText,
}) => {
  const step1Status = () => {
    switch (step) {
      case 'idle':
        return 'waiting';
      case 'step1':
        return 'pending';
      case 'step2':
        return 'success';
      case 'confirmed':
        return 'success';
      default:
        return 'waiting';
    }
  };

  const step2Status = () => {
    switch (step) {
      case 'idle':
        return 'waiting';
      case 'step1':
        return 'waiting';
      case 'step2':
        return 'pending';
      case 'confirmed':
        return 'success';
      default:
        return 'waiting';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <WalletActionStep stepStatus={step1Status()} message={step1Text} subMessage={step1SubText} />
      {!!step2Text && <WalletActionStep stepStatus={step2Status()} message={step2Text} subMessage={step2SubText} />}
    </div>
  );
};

export default WalletActionIndicator;
