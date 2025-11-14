import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { addWhitelistMember } from '@src/web3/contractShareCalls';
import { getAddressFromEns, String0x } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { isAddress } from 'viem';
import { z } from 'zod';

export type AddWhitelistAddressProps = {
  organizationId: string | number;
  shareContractAddress: String0x;
  offeringId: string | number;
};

const whitelistSchema = z.object({
  address: z
    .string()
    .min(1, 'Please enter an address to approve')
    .refine(
      async value => {
        const address = await getAddressFromEns(value);
        return address !== undefined && address !== null;
      },
      { message: 'Please enter an address to approve' }
    )
    .refine(
      async value => {
        const address = await getAddressFromEns(value);
        if (!address) return false;
        return isAddress(address);
      },
      { message: 'This is not a valid address.' }
    ),
  name: z.string().optional(),
  externalId: z.string().optional()
});

type WhitelistFormData = z.infer<typeof whitelistSchema>;

const AddWhitelistAddress: FC<AddWhitelistAddressProps> = ({
  shareContractAddress,
  offeringId,
  organizationId
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const form = useForm<WhitelistFormData>({
    resolver: zodResolver(whitelistSchema),
    defaultValues: {
      address: '',
      name: '',
      externalId: ''
    }
  });

  const onSubmit = async (values: WhitelistFormData) => {
    const address = await getAddressFromEns(values.address);
    await addWhitelistMember({
      shareContractAddress,
      offeringId,
      walletAddress: address as String0x,
      organizationId: organizationId,
      setButtonStep
    });
    form.reset();
  };

  const watchedAddress = form.watch('address');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap relative">
      <div className="md:grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <Controller
            control={form.control}
            name="address"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Wallet address <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="0x531518975607FE8867fd5F39e9a3754F1fc38276"
                  {...field}
                />
                <FieldError
                  errors={
                    form.formState.errors.address ? [form.formState.errors.address] : undefined
                  }
                />
              </Field>
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input type="text" placeholder="Lisa Novak" {...field} />
                <FieldError
                  errors={form.formState.errors.name ? [form.formState.errors.name] : undefined}
                />
              </Field>
            )}
          />
        </div>
        <div className="col-span-3">
          <Controller
            control={form.control}
            name="externalId"
            render={({ field }) => (
              <Field>
                <FieldLabel>external ID</FieldLabel>
                <Input type="text" placeholder="934834 (optional)" {...field} />
                <FieldError
                  errors={
                    form.formState.errors.externalId
                      ? [form.formState.errors.externalId]
                      : undefined
                  }
                />
              </Field>
            )}
          />
        </div>
      </div>
      <LoadingButtonChain
        type="submit"
        disabled={form.formState.isSubmitting || buttonStep === 'step1'}
        state={buttonStep}
        idleText={`Approve ${watchedAddress || ''}`}
        step1Text="Adding member to whitelist..."
        confirmedText="Added!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </form>
  );
};

export default AddWhitelistAddress;
