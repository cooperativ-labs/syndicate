'use client';

import { useMutation } from '@apollo/client/react';
import { LegalEntity, Organization } from '@gql/graphql';
import FormModal from '@src/containers/FormModal';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { ADD_OFFERING } from '@src/utils/graphQueries/offering';
import { getEntityOptionsList } from '@src/utils/helpersUserAndEntity';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '../ui/loading-button';
import CreateEntity from '../entity/CreateEntity';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { Button } from '../ui/button';

type CreateOfferingType = {
  organization: (Organization & { legal_entities: LegalEntity[] }) | null;
  refetch?: () => void;
};

const CreateOffering: FC<CreateOfferingType> = ({ organization, refetch }) => {
  const [entityModal, setEntityModal] = useState<boolean>(false);
  const [addOffering, { data, error }] = useMutation(ADD_OFFERING);
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const [alerted, setAlerted] = useState<boolean>(false);
  const router = useRouter();

  if (!organization) {
    return <div>Organization not found</div>;
  }
  const entityOptions = organization.legal_entity;
  console.log('organization', organization);
  // organization &&
  // getEntityOptionsList(organization.legal_entities.edges.map(edge => edge.node) as LegalEntity[]);

  console.log('entityOptions', entityOptions);

  const entitiesWithoutOfferings = entityOptions.filter(entity => entity.offering.length === 0);
  console.log('entitiesWithoutOfferings', entitiesWithoutOfferings);
  const entitySubmissionCompletion = () => {
    refetch?.();
    setEntityModal(false);
  };

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  const onSubmit = async (values: { offeringEntityId: string; name: string }) => {
    try {
      const result: any = await addOffering({
        variables: {
          offeringEntityId: values.offeringEntityId,
          name: values.name,
          image: '/assets/images/logos/company-placeholder.jpeg',
          brandColor: '#275A8F'
        }
      });
      const offeringId = result.data?.insertIntoofferingCollection?.records[0].id;
      if (offeringId) {
        router.push(`/${organization.id}/offerings/${offeringId}`);
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
        <CreateEntity organization={organization} actionOnCompletion={entitySubmissionCompletion} />
      </FormModal>
      <form
        onSubmit={handleSubmit(async values => {
          setButtonState('loading');
          await onSubmit(values);
        })}
      >
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
                      {entityOptions.map(entity => (
                        <SelectItem key={entity.id} value={entity.id}>
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
          type="submit"
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
    </>
  );
};

export default CreateOffering;
