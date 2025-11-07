import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import FormButton from '@src/components/buttons/FormButton';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { Textarea } from '@src/components/ui/textarea';
import { createDescriptionText, updateDescriptionText } from '@src/utils/actions/offeringActions';
import { tabSectionOptions } from '@src/utils/enumConverters';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Offering,
  OfferingDescriptionText,
  OfferingTabSection,
  offeringTabSectionTypes
} from '@/types';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type OfferingProfileDescriptionFormProps = {
  offering: Offering;
  description: OfferingDescriptionText;
  tab: offeringTabSectionTypes | undefined;
  onSubmit?: () => void;
};

const schema = z.object({
  title: z.string().min(1, 'Please give this a title.'),
  text: z.string().min(1, 'Please include text.'),
  tab: z
    .string()
    .min(1, 'Please indicate the tab where you want this text to appear.')
    .refine(val => Object.values(OfferingTabSection).includes(val as offeringTabSectionTypes), {
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
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const isUpdate = !!description;

  const tabSectionOptionsOhneFinancials = tabSectionOptions.filter(
    option => option.value !== OfferingTabSection.FINANCIALS
  );

  const descriptionsByTab = getDescriptionsByTab(offering, tab);

  const nextOrder = descriptionsByTab.length ? descriptionsByTab.length + 1 : 0;

  function handleSubmission(values: { title: string; text: string; tab: offeringTabSectionTypes }) {
    description
      ? updateDescriptionText({
          descriptionId: description.id,
          title: values.title,
          text: values.text,
          section: values.tab,
          order: description.order
        })
      : createDescriptionText({
          offeringId: offering.id.toString(),
          title: values.title,
          text: values.text,
          section: values.tab,
          order: nextOrder
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
      tab: (description?.section ?? tab ?? '') as offeringTabSectionTypes | string
    }
  });

  const onFormSubmit = async (data: FormData) => {
    setButtonStep('step1');

    try {
      handleSubmission({
        ...data,
        tab: data.tab as offeringTabSectionTypes
      });
      setButtonStep('confirmed');
      onSubmit && onSubmit();
    } catch (e) {
      setButtonStep('failed');
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col relative pr-7">
      <div className="grid grid-cols-2 gap-6">
        <div className={fieldDiv}>
          <Label htmlFor="title" className="text-sm text-blue-900 font-semibold text-opacity-80">
            Section title *
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g. About this offering"
            {...register('title')}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
          {errors.title && <div className="text-sm text-red-500 mt-1">{errors.title.message}</div>}
        </div>
        <div className={fieldDiv}>
          <Label htmlFor="tab" className="text-sm text-blue-900 font-semibold text-opacity-80">
            Move to a different tab *
          </Label>
          <Controller
            control={control}
            name="tab"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                  <SelectValue placeholder="Select a tab" />
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
          {errors.tab && <div className="text-sm text-red-500 mt-1">{errors.tab.message}</div>}
        </div>
      </div>
      <div className={fieldDiv}>
        <Label htmlFor="text" className="text-sm text-blue-900 font-semibold text-opacity-80">
          Content *
        </Label>
        <Textarea
          id="text"
          placeholder=""
          {...register('text')}
          className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none h-96"
        />
        {errors.text && <div className="text-sm text-red-500 mt-1">{errors.text.message}</div>}
      </div>
      <div className="text-sm ">
        You can add styling to this text using{' '}
        <span className="underline">
          <a
            href="https://rawgit.com/fletcher/human-markdown-reference/master/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Markdown
          </a>
        </span>
        .
      </div>
      <FormButton
        type="submit"
        disabled={isSubmitting || buttonStep === 'step1'}
        className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
      >
        <LoadingButtonText
          state={buttonStep}
          idleText={`Update ${isUpdate ? 'Description' : offering.name}`}
          step1Text="Saving"
          confirmedText={`${isUpdate ? 'Description' : offering.name} updated!`}
          failedText="Oops. Something went wrong"
        />
      </FormButton>
    </form>
  );
};

export default OfferingProfileDescriptionForm;
