import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import FormButton from '@src/components/buttons/FormButton';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { addContractPartition } from '@src/utils/actions/cryptoActions';
import { bytes32FromString } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type NewClassFormProps = {
  shareContractId: string;
};

const schema = z.object({
  partition: z.string().min(1, 'Please choose a name for the share class.')
});

type FormData = z.infer<typeof schema>;

const NewClassForm: FC<NewClassFormProps> = ({ shareContractId }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      partition: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setButtonStep('step1');
    try {
      await addContractPartition({
        smartContractId: shareContractId,
        partition: bytes32FromString(data.partition)
      });
      setButtonStep('confirmed');
    } catch (error) {
      setButtonStep('failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap relative">
      <div className="pt-3 bg-opacity-0">
        <Label htmlFor="partition" className="text-sm text-blue-900 font-semibold text-opacity-80">
          New class name *
        </Label>
        <Input
          id="partition"
          type="text"
          placeholder="Class A"
          {...register('partition')}
          className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
        />
        {errors.partition && (
          <div className="text-sm text-red-500 mt-1">{errors.partition.message}</div>
        )}
      </div>
      <FormButton type="submit" disabled={isSubmitting || buttonStep === 'step1'}>
        <LoadingButtonText
          state={buttonStep}
          idleText={`Add new share class`}
          step1Text="Sending shares..."
          confirmedText="Confirmed!"
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      </FormButton>
    </form>
  );
};

export default NewClassForm;
