import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
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
        partition: bytes32FromString(data.partition),
        revalidationPath: {
          path: '[organizationId]/offering/[offeringId]',
          type: 'page'
        }
      });
      setButtonStep('confirmed');
    } catch (error) {
      setButtonStep('failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative">
      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel>New class name *</FieldLabel>
            <Input id="partition" type="text" placeholder="Class A" {...register('partition')} />
          </Field>
          <LoadingButtonChain
            type="submit"
            disabled={isSubmitting || buttonStep === 'step1'}
            state={buttonStep}
            idleText={`Add new share class`}
            step1Text="Sending shares..."
            confirmedText="Confirmed!"
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default NewClassForm;
