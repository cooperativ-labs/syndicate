import FormButton from '@src/components/buttons/FormButton';
import Input from '@src/components/form-components/Inputs';
import React, { FC, useState } from 'react';
import Select from '@src/components/form-components/Select';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { Offering, OfferingDescriptionText, OfferingTabSection } from 'types';
import { tabSectionOptions } from '@src/utils/enumConverters';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

export type OfferingProfileDescriptionFormProps = {
  offering: Offering;
  description?: OfferingDescriptionText;
  addDescription?: any;
  updateDescription?: any;
  setAlerted: any;
  tab: OfferingTabSection;
  onSubmit?: () => void;
};
const OfferingProfileDescriptionForm: FC<OfferingProfileDescriptionFormProps> = ({
  offering,
  description,
  addDescription,
  updateDescription,
  setAlerted,
  tab,
  onSubmit,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const isUpdate = !!description;

  const tabSectionOptionsOhneFinancials = tabSectionOptions.filter(
    (option) => option.value !== OfferingTabSection.Financials
  );

  const nextOrder = getDescriptionsByTab(offering, tab)?.length + 1;

  function handleSubmission(values) {
    description
      ? updateDescription({
          variables: {
            currentDate: currentDate,
            descriptionId: description.id,
            title: values.title,
            text: values.text,
            section: values.tab,
            order: description.order,
          },
        })
      : addDescription({
          variables: {
            currentDate: currentDate,
            offeringId: offering.id,
            title: values.title,
            text: values.text,
            section: values.tab,
            order: nextOrder,
          },
        });
  }

  // offering.profileDescriptions?.sort((a, b) => a.order - b.order);

  return (
    <Formik
      initialValues={{
        title: description?.title ?? '',
        text: description?.text ?? '',
        tab: description?.section ?? tab,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.title) {
          errors.title = 'Please give this a title.';
        }
        if (!values.text) {
          errors.text = 'Please include text.';
        }
        if (!values.tab) {
          errors.tab = 'Please indicate the tab where you want this text to appear.';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setButtonStep('submitting');
        setAlerted(false);
        setSubmitting(true);
        try {
          handleSubmission(values);
          setButtonStep('confirmed');
          onSubmit && onSubmit();
        } catch (e) {
          setButtonStep('failed');
          alert(e);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col relative  pr-7">
          <div className="grid grid-cols-2 gap-6">
            <Input
              className={fieldDiv}
              required
              labelText="Section title"
              name="title"
              placeholder="e.g. About this offering"
            />
            <Select className={fieldDiv} labelText="Move to a different tab" required name="tab">
              {tabSectionOptionsOhneFinancials.map((section, i) => {
                return (
                  <option key={i} value={section.value}>
                    {section.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <Input
            className={fieldDiv}
            textArea
            fieldHeight={'h-96'}
            required
            labelText="Content"
            name="text"
            placeholder=""
          />
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
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            <LoadingButtonText
              state={buttonStep}
              idleText={`Update ${isUpdate ? 'Description' : offering.name}`}
              submittingText="Saving"
              confirmedText={`${isUpdate ? 'Description' : offering.name} updated!`}
              failedText="Oops. Something went wrong"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default OfferingProfileDescriptionForm;
