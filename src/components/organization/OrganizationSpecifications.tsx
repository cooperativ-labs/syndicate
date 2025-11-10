import { cn } from '@src/lib/utils';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Country } from 'country-state-city';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Organization } from '@/types';

import Button from '../buttons/Button';
import { EditEntitySelectionType } from '../entity/EntitySpecifications';
import ClickToEditItem from '../form-components/ClickToEditItem';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LoadingButton, ButtonLoadingState } from '../ui/loading-button';
import { updateOrganization } from '@src/utils/actions/organizationActions';
import { toast } from 'sonner';

export type EditOrganizationSelectionType =
  | 'name'
  | 'country'
  | 'description'
  | 'website'
  | 'shortDescription'
  | 'none';

export const changeForm = (
  itemType: EditOrganizationSelectionType,
  organization: Organization,

  setEditOn: (editOn: EditOrganizationSelectionType) => void,
  handleChange: (values: {
    country: string;
    name: string;
    description: string;
    shortDescription: string;
  }) => void
) => {
  return (
    <OrganizationChangeForm
      itemType={itemType}
      organization={organization}
      setEditOn={setEditOn}
      handleChange={handleChange}
    />
  );
};

type OrganizationChangeFormValues = {
  country: string;
  name: string;
  description: string;
  shortDescription: string;
};

type OrganizationChangeFormProps = {
  itemType: EditOrganizationSelectionType;
  organization: Organization;
  setEditOn: (editOn: EditOrganizationSelectionType) => void;
  handleChange: (values: {
    country: string;
    name: string;
    description: string;
    shortDescription: string;
  }) => void | Promise<void>;
};

const OrganizationChangeForm: FC<OrganizationChangeFormProps> = ({
  itemType,
  organization,
  setEditOn,
  handleChange
}) => {
  const { name, short_description, description, country } = organization;
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<OrganizationChangeFormValues>({
    defaultValues: {
      country: country ?? '',
      name: name ?? '',
      description: description ?? '',
      shortDescription: short_description ?? ''
    }
  });

  const onSubmit = async (values: OrganizationChangeFormValues) => {
    try {
      setButtonState('loading');
      await handleChange({
        country: values.country.trim(),
        name: values.name.trim(),
        description: values.description.trim(),
        shortDescription: values.shortDescription.trim()
      });
    } catch (error) {
      console.error(error);
      setButtonState('error');
      toast.error('Oops. Looks like something went wrong.');
    } finally {
      setButtonState('default');
    }
  };

  return (
    <form
      className={cn(
        itemType !== 'shortDescription' && 'md:grid',
        'flex flex-col  grid-cols-5 w-full items-center gap-2 my-4'
      )}
    >
      <div className="w-full md:col-span-3">
        {itemType === 'country' && (
          <Input
            className=" bg-opacity-0"
            required
            aria-invalid={errors.country ? 'true' : 'false'}
            {...register('country', { required: true })}
          />
        )}
        {itemType === 'name' && (
          <>
            <Input
              className=" bg-opacity-0"
              required
              aria-invalid={errors.name ? 'true' : 'false'}
              {...register('name', {
                required: 'Please include the name of this organization.'
              })}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </>
        )}
        {itemType === 'description' && (
          <Textarea
            className=" bg-opacity-0"
            required
            aria-invalid={errors.description ? 'true' : 'false'}
            {...register('description', { required: true })}
          />
        )}
        {itemType === 'shortDescription' && (
          <Textarea
            className=" bg-opacity-0 w-full"
            required
            aria-invalid={errors.shortDescription ? 'true' : 'false'}
            {...register('shortDescription', { required: true })}
          />
        )}
      </div>
      <LoadingButton
        type="submit"
        disabled={isSubmitting}
        className=" bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase h-11 rounded w-full"
        onClick={handleSubmit(onSubmit)}
        buttonState={buttonState}
        text="Save changes"
      />

      <Button
        className="border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase h-11 rounded w-full"
        onClick={e => {
          e.preventDefault();
          setEditOn('none');
        }}
      >
        Cancel
      </Button>
    </form>
  );
};

type OrganizationSpecificationsProps = {
  organization: Organization;
  isOrganizationManager: boolean | undefined;
};

const OrganizationSpecifications: FC<OrganizationSpecificationsProps> = ({
  organization,
  isOrganizationManager
}) => {
  const [editOn, setEditOn] = useState<
    EditOrganizationSelectionType | EditEntitySelectionType | string
  >('none');
  const { id, name, country, description, short_description, is_public, logo, banner_image } =
    organization;

  const handleChange = async (values: {
    name: string;
    country: string;
    description: string;
    shortDescription: string;
  }) => {
    const { name, country, description, shortDescription } = values;
    try {
      updateOrganization({
        organizationId: id.toString(),
        country: country ?? '',
        name: name,
        description: description,
        shortDescription: shortDescription,
        isPublic: is_public ?? false,
        logo: logo ?? '',
        bannerImage: banner_image ?? ''
      });
      setEditOn('none');
    } catch (e: any) {
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  return (
    <>
      <ClickToEditItem
        label="Name"
        currentValue={name}
        form={changeForm('name', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="name"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Country"
        currentValue={Country.getCountryByCode(country as string)?.name}
        form={changeForm('country', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="country"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Description"
        currentValue={description}
        form={changeForm('description', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="description"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />

      <ClickToEditItem
        label="Short Description (160 characters max)"
        currentValue={short_description}
        form={changeForm('shortDescription', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="shortDescription"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default OrganizationSpecifications;
