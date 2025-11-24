import { cn } from '@src/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { Check, Loader2Icon } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from './button';
export type LoadingButtonStateType =
  | 'idle'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'confirmed'
  | 'failed'
  | 'rejected';
export type LoadingButtonTextType = {
  state: LoadingButtonStateType;
  idleText: string;
  step1Text: string;
  step2Text?: string;
  step3Text?: string;
  confirmedText: string;
  failedText?: string;
  rejectedText?: string;
};

export interface LoadingButtonChainProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  state: LoadingButtonStateType;
  idleText: string;
  step1Text: string;
  step2Text?: string;
  step3Text?: string;
  confirmedText: string;
  failedText?: string;
  rejectedText?: string;
  wrapText?: boolean;
}

const LoadingButtonChain = React.forwardRef<HTMLButtonElement, LoadingButtonChainProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      state,
      idleText,
      step1Text,
      step2Text,
      step3Text,
      confirmedText,
      failedText,
      rejectedText,
      wrapText = false,
      ...props
    },
    ref
  ) => {
    const LoadingButtonText = ({
      state,
      idleText,
      step1Text,
      step2Text,
      step3Text,
      confirmedText,
      failedText,
      rejectedText
    }: LoadingButtonTextType) => {
      switch (state) {
        case 'idle':
          return <>{idleText}</>;
        case 'step1':
          return (
            <>
              <img
                src='/assets/images/loading-circle.png'
                aria-label='loading'
                className='h-6 mr-1 animate-spin bg-white rounded-full'
              />
              <span>{step1Text}</span>
            </>
          );
        case 'step2':
          return (
            <>
              <img
                src='/assets/images/loading-circle.png'
                aria-label='loading'
                className='h-6 mr-1 animate-spin bg-white rounded-full'
              />
              <span>{step2Text}</span>
            </>
          );
        case 'step3':
          return (
            <>
              <img
                src='/assets/images/loading-circle.png'
                aria-label='loading'
                className='h-6 mr-1 animate-spin bg-white rounded-full'
              />
              <span>{step3Text}</span>
            </>
          );
        case 'confirmed':
          return <>{confirmedText}</>;
        case 'failed':
          return <>{failedText}</>;
        case 'rejected':
          return <>{rejectedText}</>;
        default:
          return <>{idleText}</>;
      }
    };

    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        ref={ref}
        {...props}
      >
        <div className={cn('flex justify-center items-center ', wrapText && 'flex-wrap text-wrap')}>
          <LoadingButtonText
            state={state}
            idleText={idleText}
            step1Text={step1Text}
            step2Text={step2Text}
            step3Text={step3Text}
            confirmedText={confirmedText}
            failedText={failedText}
            rejectedText={rejectedText}
          />
        </div>
      </Button>
    );
  }
);
LoadingButtonChain.displayName = 'LoadingButtonChain';

export { LoadingButtonChain };
