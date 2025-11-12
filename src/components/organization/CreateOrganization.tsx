'use client';

import { useUserContext } from '@contexts/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrganizationWithAdmin } from '@src/utils/actions/organizationActions';
import { formatSlug } from '@src/utils/graphQueries/gqlUtils';
import { fileToImageUrl } from '@src/utils/helpersDocuments';
import { organizationChangeServer } from '@src/utils/helpersOrganizationServer';
import { Country } from 'country-state-city';
import { useRouter } from 'next/navigation';
import React, { FC, useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import ImageUpload from '../form-components/ImageUpload';
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

export type CreateOrganizationType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
  noTitle?: boolean;
};

type CreateOrganizationFormData = {
  name: string;
  website: string;
  shortDescription: string;
  country: string;
};

const schema = z.object({
  name: z.string().min(1, 'Please include a name'),
  website: z.string(),
  shortDescription: z.string(),
  country: z.string()
});

const CreateOrganization: FC<CreateOrganizationType> = ({
  defaultLogo,
  actionOnCompletion,
  noTitle = false
}) => {
  const { user } = useUserContext();
  const [logoUrl, setLogoUrl] = useState<string | null>(defaultLogo ?? null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');

  const router = useRouter();
  const handleOrganizationChange = (id: string) => {
    organizationChangeServer(id);
  };
  const countries = Country.getAllCountries();

  const form = useForm<CreateOrganizationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      website: '',
      shortDescription: '',
      country: ''
    }
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = form;

  const watchedName = watch('name');

  if (!user) {
    return null;
  }

  const userId = user.id;

  const handleLogoUpload = async (file: File) => {
    setLogoFile(file);
    setLogoUrl(await fileToImageUrl(file));
  };

  const handleLogoDelete = async () => {
    setLogoUrl(null);
    setLogoFile(null);
  };

  const onSubmit = async (data: CreateOrganizationFormData) => {
    setButtonState('loading');
    try {
      const orgData = await createOrganizationWithAdmin({
        userId,
        name: data.name,
        logoFile: logoFile,
        shortDescription: data.shortDescription,
        website: data.website,
        country: data.country,
        slug: formatSlug(data.name),
        logoFileName: logoFile?.name || ''
      });
      setButtonState('success');
      handleOrganizationChange(orgData.organization_id);
      router.push(`/${orgData.organization_id}/overview`);
      actionOnCompletion && actionOnCompletion();
    } catch (error: any) {
      setButtonState('error');
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <FieldSet>
        {!noTitle && <FieldLegend>Create Organization</FieldLegend>}
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup className="col-span-1 flex flex-col gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Organization's name *</FieldLabel>
                  <Input type="text" placeholder="Alphabet Inc." {...field} />
                  <FieldError errors={errors.name ? [errors.name] : undefined} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Country of operation</FieldLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {countries.map((country, i) => (
                        <SelectItem key={i} value={country.isoCode}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={errors.country ? [errors.country] : undefined} />
                </Field>
              )}
            />
          </FieldGroup>

          <ImageUpload
            title="Add logo"
            onSubmit={handleLogoUpload}
            accept={['image/jpeg', 'image/png', 'image/svg+xml']}
            selectedImageUrl={logoUrl}
            setSelectedImageUrl={setLogoUrl}
            onDelete={handleLogoDelete}
          />
        </div>
        <FieldGroup>
          <Controller
            control={control}
            name="website"
            render={({ field }) => (
              <Field>
                <FieldLabel>Organization's website</FieldLabel>
                <Input type="text" placeholder="e.g. https://www.cooperativ.io" {...field} />
                <FieldError errors={errors.website ? [errors.website] : undefined} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="shortDescription"
            render={({ field }) => (
              <Field>
                <FieldLabel>Short description of the organization</FieldLabel>
                <Textarea
                  placeholder="e.g. Creates and invests in companies that are changing the world."
                  {...field}
                />
                <FieldError
                  errors={errors.shortDescription ? [errors.shortDescription] : undefined}
                />
              </Field>
            )}
          />
        </FieldGroup>
        <Separator />

        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          buttonState={buttonState}
          setButtonState={setButtonState}
          text={`Create ${watchedName}`}
          loadingText="Creating organization..."
          successText="Organization created!"
          errorText="Failed to create organization"
          reset
        />
      </FieldSet>
    </form>
  );
};

export default CreateOrganization;
