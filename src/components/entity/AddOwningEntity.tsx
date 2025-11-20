'use client';

import { useEntities } from '@contexts/EntityContext';
import FormModal from '@src/containers/FormModal';
import { addOwner } from '@src/utils/actions/entityActions';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CreateEntity from './CreateEntity';
import { Button } from '../ui/button';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel
} from '../ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

type AddOwningEntityForm = {
  addEntityOwner: string;
};

type AddOwningEntityProps = {
  ownedEntityId: string | number;
  refetchOuter?: () => void;
};

const AddOwningEntity: FC<AddOwningEntityProps> = ({ ownedEntityId, refetchOuter }) => {
  const { entities } = useEntities();
  const [entityModal, setEntityModal] = useState<boolean>(false);

  const { control, handleSubmit, formState, reset } = useForm<AddOwningEntityForm>({
    defaultValues: {
      addEntityOwner: ''
    }
  });

  const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  const onSubmit = async (values: AddOwningEntityForm) => {
    if (!values.addEntityOwner) {
      return;
    }

    try {
      await addOwner({
        ownerId: values.addEntityOwner,
        entityId: ownedEntityId
      });
      reset();
      refetchOuter?.();
    } catch (error) {
      console.error('Failed to add owner', error);
    }
  };

  return (
    <>
      <FormModal
        formOpen={entityModal}
        onClose={() => setEntityModal(false)}
        title={`Add an entity to your account`}
      >
        <CreateEntity actionOnCompletion={() => submissionCompletion(setEntityModal)} />
      </FormModal>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
        {entities && entities.length > 0 && (
          <Field className="flex flex-col">
            <FieldLabel>Add a General Partner</FieldLabel>
            <FieldContent>
              <Controller
                name="addEntityOwner"
                control={control}
                rules={{
                  required: 'Please select an entity.'
                }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an entity" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.map(entity => (
                        <SelectItem key={entity.id} value={entity.id?.toString() ?? ''}>
                          {entity.legal_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {formState.errors.addEntityOwner && (
                <FieldError errors={[{ message: formState.errors.addEntityOwner.message }]} />
              )}
            </FieldContent>
          </Field>
        )}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEntityModal(true)}
            className="w-full md:w-auto"
          >
            Add New Entity
          </Button>
        </div>

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-2 rounded p-4 w-full"
        >
          {formState.isSubmitting ? 'Adding...' : 'Add Owner'}
        </Button>
      </form>
    </>
  );
};

export default AddOwningEntity;
