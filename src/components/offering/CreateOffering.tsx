'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import FormModal from '@src/containers/FormModal';
import { addOffering } from '@src/utils/actions/offeringActions';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { z } from 'zod';

import { OrganizationComplete } from '@/types';

import CreateEntity from '../entity/CreateEntity';
import { Button } from '../ui/button';
import { LoadingButton } from '../ui/loading-button';
import { useOrganizations } from '@contexts/OrganizationsContext';

type CreateOfferingType = {
  organization: OrganizationComplete | null;
  refetch?: () => void;
};

const CreateOffering: FC<CreateOfferingType> = ({ organization, refetch }) => {
  const router = useRouter();
  const { chosenOrganizationId } = useOrganizations();
  const [entityModal, setEntityModal] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');

  if (!chosenOrganizationId) {
    return <div>Organization not found</div>;
  }
  const entities = organization?.legalEntities;

  const entitiesWithoutOfferings = entities?.filter(entity => entity.offerings.length === 0) ?? [];
  const entitySubmissionCompletion = () => {
    refetch?.();
    setEntityModal(false);
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setButtonState('loading');
    try {
      const result = await addOffering({
        offeringEntityId: data.offeringEntityId,
        name: data.name,
        organizationId: chosenOrganizationId ?? ''
      });
      const offeringId = result.records[0].id;
      if (offeringId) {
        router.push(`/${chosenOrganizationId}/offerings/${offeringId}`);
      }
      setButtonState('success');
    } catch (e: any) {
      setButtonState('error');
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  const schema = z.object({
    offeringEntityId: z.string().min(1, 'Please select an entity'),
    name: z.string().min(1, 'Please set a name')
  });

  const form = useForm<{
    offeringEntityId: string;
    name: string;
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      offeringEntityId: '',
      name: ''
    }
  });

  const { control, register, handleSubmit, formState, watch } = useForm<{
    offeringEntityId: string;
    name: string;
  }>({
    resolver: zodResolver(schema),
    defaultValues: { offeringEntityId: '', name: '' }
  });

  const watchedName = watch('name');

  return (
    <>
      <FormModal
        formOpen={entityModal}
        onClose={() => setEntityModal(false)}
        title={`Link a legal entity to your offering.`}
      >
        <CreateEntity actionOnCompletion={entitySubmissionCompletion} />
      </FormModal>
      <Form {...form}>
        <form>
          <div className="md:grid grid-cols-5 gap-4">
            <div className="col-span-3 align-end ">
              <Label className="text-sm text-blue-900 font-semibold text-opacity-80">
                In which entity are you offering shares?
              </Label>
              <div className="flex items-center gap-3 mt-1">
                <Controller
                  control={control}
                  name="offeringEntityId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an entity" />
                      </SelectTrigger>
                      <SelectContent>
                        {entitiesWithoutOfferings.map(entity => (
                          <SelectItem key={entity.id} value={entity.id.toString()}>
                            {entity.legal_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={e => {
                    e.preventDefault();
                    setEntityModal(true);
                  }}
                  type="button"
                >
                  Add New Entity
                </Button>
              </div>
              {formState.errors.offeringEntityId && (
                <div className="text-sm text-red-500 mt-1">
                  {formState.errors.offeringEntityId.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <Label className="text-sm text-blue-900 font-semibold text-opacity-80">
              What do you call this offering
            </Label>
            <Input placeholder="e.g. First Fund" aria-label="Offering name" {...register('name')} />
            {formState.errors.name && (
              <div className="text-sm text-red-500 mt-1">{formState.errors.name.message}</div>
            )}
          </div>

          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Create ${watchedName}`}
            loadingText={`Creating ${watchedName}`}
            successText="Created!"
            errorText="Oops. Something went wrong"
            reset
            className="mt-8 w-full"
          />
        </form>
      </Form>
    </>
  );
};

export default CreateOffering;
