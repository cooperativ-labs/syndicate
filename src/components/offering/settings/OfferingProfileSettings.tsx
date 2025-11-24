'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import ImageUpload from '@src/components/form-components/ImageUpload';
import { Checkbox } from '@src/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { Textarea } from '@src/components/ui/textarea';
import {
  deleteOfferingAsset,
  updateOfferingProfile,
  uploadOfferingAsset
} from '@src/utils/actions/offeringProfileActions';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Offering } from '@/types';

const schema = z.object({
  name: z.string().min(1, 'Please name this syndication.'),
  shortDescription: z.string().optional(),
  brandColor: z.string().optional(),
  lightBrand: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  primaryVideo: z.string().optional(),
  website: z.string().optional(),
  image: z.string().optional(),
  bannerImage: z.string().optional()
});

type OfferingProfileFormData = z.infer<typeof schema>;

type OfferingProfileSettingsProps = {
  offering: Offering;
  userId: string;
};

const OfferingProfileSettings: FC<OfferingProfileSettingsProps> = ({ offering, userId }) => {
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const {
    id,
    name,
    brand_color,
    light_brand,
    image,
    banner_image,
    primary_video,
    website,
    short_description,
    is_public
  } = offering;

  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(image || null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(banner_image || null);

  const handleAddLogo = async (file: File) => {
    console.log('handleAddLogo', file);
    await uploadOfferingAsset({
      assetFile: file,
      assetName: file.name,
      assetType: 'image',
      offeringId: offering.id
    });
  };

  const handleAddBannerImage = async (file: File) => {
    await uploadOfferingAsset({
      assetFile: file,
      assetName: file.name,
      assetType: 'banner_image',
      offeringId: offering.id
    });
  };

  const handleDeleteLogo = async () => {
    await deleteOfferingAsset({
      assetUrl: image as string,
      assetType: 'image',
      offeringId: offering.id
    });
    setLogoImageUrl(null);
  };

  const handleDeleteBannerImage = async () => {
    await deleteOfferingAsset({
      assetUrl: banner_image as string,
      assetType: 'banner_image',
      offeringId: offering.id
    });
    setBannerImageUrl(null);
  };

  const form = useForm<OfferingProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name || '',
      shortDescription: short_description || '',
      brandColor: brand_color || '',
      lightBrand: light_brand || false,
      isPublic: is_public || false,
      primaryVideo: primary_video || '',
      website: website || '',
      image: image || '',
      bannerImage: banner_image || ''
    }
  });

  const watchedBrandColor = form.watch('brandColor');
  const watchedName = form.watch('name');

  const onSubmit = async (values: OfferingProfileFormData) => {
    setButtonState('loading');
    try {
      await updateOfferingProfile({
        offeringId: offering.id.toString(),
        name: values.name,
        brandColor: values.brandColor,
        lightBrand: values.lightBrand,
        shortDescription: values.shortDescription,
        primaryVideo: values.primaryVideo,
        website: values.website,
        image: values.image,
        bannerImage: values.bannerImage
      });
      setButtonState('success');
    } catch (e) {
      setButtonState('error');
      alert(e);
    }
  };

  return (
    <div className='flex md:grid-span-2 gap-12'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full relative'>
        <FieldGroup>
          <Controller
            control={form.control}
            name='shortDescription'
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor='shortDescription'>
                  Short Description (160 Characters) <span className='text-destructive'>*</span>
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id='shortDescription'
                    placeholder=''
                    {...field}
                    value={field.value || ''}
                    className='min-h-[60px]'
                  />
                  <FieldError
                    errors={
                      form.formState.errors.shortDescription
                        ? [form.formState.errors.shortDescription]
                        : undefined
                    }
                  />
                </FieldContent>
              </Field>
            )}
          />

          <div className='md:grid grid-cols-7 gap-4'>
            <div className='col-span-3'>
              <Controller
                control={form.control}
                name='brandColor'
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor='brandColor'>Brand color</FieldLabel>
                    <FieldContent>
                      <Input
                        id='brandColor'
                        type='text'
                        placeholder='#d3d3d3'
                        {...field}
                        value={field.value || ''}
                      />
                      <FieldError
                        errors={
                          form.formState.errors.brandColor
                            ? [form.formState.errors.brandColor]
                            : undefined
                        }
                      />
                    </FieldContent>
                  </Field>
                )}
              />
            </div>
            <div className='col-span-1 self-center md:mt-8'>
              <div
                className='h-2 md:h-11 md:w-11 rounded-full border'
                style={{ backgroundColor: watchedBrandColor ?? '#d3d3d3' }}
              />
            </div>
            <div className='col-span-3'>
              <Controller
                control={form.control}
                name='lightBrand'
                render={({ field }) => (
                  <Field orientation='horizontal'>
                    <Checkbox
                      id='lightBrand'
                      checked={field.value ?? false}
                      onCheckedChange={checked => {
                        field.onChange(checked === true);
                      }}
                    />
                    <FieldLabel htmlFor='lightBrand' className='font-normal'>
                      Light brand
                    </FieldLabel>
                    {form.formState.errors.lightBrand && (
                      <FieldError errors={[form.formState.errors.lightBrand]} className='w-full' />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <Controller
            control={form.control}
            name='website'
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor='website'>External website</FieldLabel>
                <FieldContent>
                  <Input
                    id='website'
                    type='text'
                    placeholder='https://www.awesome.com'
                    {...field}
                    value={field.value || ''}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.website ? [form.formState.errors.website] : undefined
                    }
                  />
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='primaryVideo'
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor='primaryVideo'>Primary video</FieldLabel>
                <FieldContent>
                  <Input
                    id='primaryVideo'
                    type='text'
                    placeholder='https://www.youtube.com/embed/FbPODl0eyVQ'
                    {...field}
                    value={field.value || ''}
                  />
                  <FieldDescription>
                    Be sure to use the embed link, which is sometimes different from the link you
                    see in your browser, and that you have the correct permissions to embed the
                    video.
                  </FieldDescription>
                  <FieldError
                    errors={
                      form.formState.errors.primaryVideo
                        ? [form.formState.errors.primaryVideo]
                        : undefined
                    }
                  />
                </FieldContent>
              </Field>
            )}
          />

          <LoadingButton
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            buttonState={buttonState}
            text={`Update ${watchedName || 'Offering'}`}
            loadingText='Saving'
            successText={`${watchedName || 'Offering'} updated!`}
            errorText='Oops. Something went wrong'
            className='mt-4'
          />
        </FieldGroup>
      </form>

      <div className='flex flex-col min-w-max gap-3'>
        <div>
          <ImageUpload
            onSubmit={handleAddBannerImage}
            selectedImageUrl={bannerImageUrl}
            setSelectedImageUrl={setBannerImageUrl}
            onDelete={handleDeleteBannerImage}
            title='Banner Image'
            classNames='max-w-56'
          />
        </div>
        <div>
          <ImageUpload
            onSubmit={handleAddLogo}
            selectedImageUrl={logoImageUrl}
            setSelectedImageUrl={setLogoImageUrl}
            onDelete={handleDeleteLogo}
            title='Logo'
            description='Choose file.'
          />
        </div>
      </div>
    </div>
  );
};

export default OfferingProfileSettings;
