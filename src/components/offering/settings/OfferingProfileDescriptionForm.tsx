import { zodResolver } from '@hookform/resolvers/zod';
import { FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { Textarea } from '@src/components/ui/textarea';
import {
  createDescriptionText,
  updateDescriptionText
} from '@src/utils/actions/offeringProfileActions';
import { tabSectionOptions } from '@src/utils/enumConverters';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  OfferingDescriptionText,
  OfferingFull,
  OfferingTabSection,
  OfferingTabSectionTypes
} from '@/types';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type OfferingProfileDescriptionFormProps = {
  offering: OfferingFull;
  description?: OfferingDescriptionText;
  tab: OfferingTabSectionTypes | undefined;
  onSubmit?: () => void;
};

const schema = z.object({
  title: z.string().min(1, 'Please give this a title.'),
  text: z.string().min(1, 'Please include text.'),
  tab: z
    .string()
    .min(1, 'Please indicate the tab where you want this text to appear.')
    .refine(val => Object.values(OfferingTabSection).includes(val as OfferingTabSectionTypes), {
      message: 'Please select a valid tab'
    })
});

type FormData = z.infer<typeof schema>;

const OfferingProfileDescriptionForm: FC<OfferingProfileDescriptionFormProps> = ({
  offering,
  description,
  tab,
  onSubmit
}) => {
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const isUpdate = !!description;

  const tabSectionOptionsOhneFinancials = tabSectionOptions.filter(
    option => option.value !== OfferingTabSection.FINANCIALS
  );

  const descriptionsByTab = getDescriptionsByTab(offering, tab);

  const nextOrder = descriptionsByTab.length ? descriptionsByTab.length + 1 : 0;

  function handleSubmission(values: { title: string; text: string; tab: OfferingTabSectionTypes }) {
    description
      ? updateDescriptionText({
          descriptionId: description.id,
          title: values.title,
          text: values.text,
          section: values.tab,
          order: description.order,
          revalidationPath: {
            path: `/[organizationId]/offerings/${offering.id}`,
            type: 'layout'
          }
        })
      : createDescriptionText({
          offeringId: offering.id.toString(),
          title: values.title,
          text: values.text,
          section: values.tab,
          order: nextOrder,
          revalidationPath: {
            path: `/[organizationId]/offerings/${offering.id}`,
            type: 'layout'
          }
        });
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: description?.title ?? '',
      text: description?.text ?? '',
      tab: (description?.section ?? tab ?? '') as OfferingTabSectionTypes | string
    }
  });

  const onFormSubmit = async (data: FormData) => {
    setButtonState('loading');

    try {
      handleSubmission({
        ...data,
        tab: data.tab as OfferingTabSectionTypes
      });
      setButtonState('success');
      onSubmit && onSubmit();
    } catch (e) {
      setButtonState('error');
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col relative bg'>
      <div className='grid grid-cols-2 gap-6'>
        <div className={fieldDiv}>
          <FieldLabel
            htmlFor='title'
            className='text-sm text-blue-900 font-semibold text-opacity-80'
          >
            Section title *
          </FieldLabel>
          <Input
            id='title'
            type='text'
            placeholder='e.g. About this offering'
            {...register('title')}
            className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
          />
          {errors.title && <div className='text-sm text-red-500 mt-1'>{errors.title.message}</div>}
        </div>
        <div className={fieldDiv}>
          <FieldLabel htmlFor='tab' className='text-sm text-blue-900 font-semibold text-opacity-80'>
            Move to a different tab *
          </FieldLabel>
          <Controller
            control={control}
            name='tab'
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'>
                  <SelectValue placeholder='Select a tab' />
                </SelectTrigger>
                <SelectContent>
                  {tabSectionOptionsOhneFinancials.map((section, i) => (
                    <SelectItem key={i} value={section.value}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tab && <div className='text-sm text-red-500 mt-1'>{errors.tab.message}</div>}
        </div>
      </div>
      <div className={fieldDiv}>
        <FieldLabel htmlFor='text' className='text-sm text-blue-900 font-semibold text-opacity-80'>
          Content *
        </FieldLabel>
        <Textarea
          id='text'
          placeholder=''
          {...register('text')}
          className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none h-96'
        />
        {errors.text && <div className='text-sm text-red-500 mt-1'>{errors.text.message}</div>}
      </div>
      <div className='text-sm mb-4'>
        You can add styling to this text using{' '}
        <span className='underline'>
          <a
            href='https://rawgit.com/fletcher/human-markdown-reference/master/index.html'
            target='_blank'
            rel='noreferrer'
          >
            Markdown
          </a>
        </span>
        .
      </div>
      <LoadingButton
        onClick={e => {
          e.stopPropagation();
          handleSubmit(onFormSubmit);
        }}
        disabled={isSubmitting || buttonState === 'loading'}
        buttonState={buttonState}
        text={`Update ${isUpdate ? 'Description' : offering.name}`}
        loadingText='Saving'
        successText={`${isUpdate ? 'Description' : offering.name} updated!`}
        errorText='Oops. Something went wrong'
      />
    </form>
  );
};

export default OfferingProfileDescriptionForm;
