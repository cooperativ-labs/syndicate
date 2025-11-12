'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import FormModal from '@src/containers/FormModal';
import { addOffering } from '@src/utils/actions/offeringActions';
import { currencyOptionsExcludeCredits } from '@src/utils/enumConverters';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CurrencyCode, CurrencyCodeType, OrganizationComplete } from '@/types';

import CreateEntity from '../entity/CreateEntity';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field';
import { LoadingButton } from '../ui/loading-button';

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

  const schema = z.object({
    offeringEntityId: z.string().min(1, 'Please select an entity'),
    name: z.string().min(1, 'Please set a name')
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      offeringEntityId: '',
      name: ''
    }
  });

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

  const { control, register, handleSubmit, formState, watch } = form;

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
      <form>
        <FieldGroup className="w-full">
          <FieldSet>
            <FieldLegend variant="label">In which entity are you offering shares?</FieldLegend>
            <div className="md:flex flex-col gap-4">
              <div className="flex items-center gap-3 mt-1">
                <Field>
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
                </Field>
                <Button
                  variant="outline"
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

            <Field>
              <FieldLabel>What do you call this offering</FieldLabel>
              <Input
                placeholder="e.g. First Fund"
                aria-label="Offering name"
                {...register('name')}
              />
              {formState.errors.name && (
                <div className="text-sm text-red-500 mt-1">{formState.errors.name.message}</div>
              )}
            </Field>
          </FieldSet>
          <FieldSet>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              buttonState={buttonState}
              setButtonState={setButtonState}
              text={`Create ${watchedName}`}
              loadingText={`Creating ${watchedName}`}
              successText="Created!"
              errorText="Oops. Something went wrong"
              reset
              className="w-full"
            />
          </FieldSet>
        </FieldGroup>
      </form>
    </>
  );
};

export default CreateOffering;
