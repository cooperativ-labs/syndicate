'use client';

import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

const OfferingFinder: FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<{ offeringId: string }>({
    defaultValues: { offeringId: '' }
  });

  return (
    <form
      className='w-full md:grid grid-cols-3 gap-2 items-center'
      onSubmit={handleSubmit(values => router.push(`/offerings/${values.offeringId}`))}
    >
      <div className='col-span-2'>
        <Input {...register('offeringId')} />
      </div>
      <Button
        type='submit'
        disabled={formState.isSubmitting}
        className='bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 md:mt-0 rounded p-4 w-full '
      >
        Find Offering
      </Button>
    </form>
  );
};

export default OfferingFinder;
