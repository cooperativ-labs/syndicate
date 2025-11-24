import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { cn } from '@src/lib/utils';
import { useState } from 'react';
import { useConnection } from 'wagmi';

import { CurrencyCodeType, LegalEntityWithAddresses, OfferingFull } from '@/types';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

import BasicOfferingDetailsForm from './settings/BasicOfferingDetailsForm';

type OfferingBasicDetailsFormProps = {
  offering: OfferingFull;
  isOfferingManager: boolean;

  legalEntity: LegalEntityWithAddresses;
};
export default function OfferingBasicDetailsForm({
  offering,
  isOfferingManager,
  legalEntity
}: OfferingBasicDetailsFormProps) {
  const { address: userWalletAddress } = useConnection();
  const { id } = offering;

  return (
    <>
      {isOfferingManager &&
        (!userWalletAddress ? (
          <div className='flex mt-4'>
            <ChooseConnectorButton buttonText={'Connect wallet to continue'} large />
          </div>
        ) : (
          'This offering has no details yet.'
        ))}
      <Dialog open={!!isOfferingManager && !!userWalletAddress}>
        <DialogContent
          data-test='component-form-modal'
          className={cn('max-w-[600px] min-w-[600px]')}
        >
          <DialogHeader>
            <DialogTitle>Offering Basics</DialogTitle>
            <DialogDescription>Set the basic details of this offering.</DialogDescription>
          </DialogHeader>

          <BasicOfferingDetailsForm
            offeringId={id.toString()}
            operatingCurrency={legalEntity?.operating_currency as CurrencyCodeType}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
