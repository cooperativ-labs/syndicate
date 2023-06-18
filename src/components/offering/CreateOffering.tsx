import React, { FC, useState } from 'react';

import Input, { defaultFieldDiv } from '../form-components/Inputs';

import { currentDate } from '@utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import CreateEntity from '../entity/CreateEntity';
import EntitySelector from '../form-components/EntitySelector';
import FormButton from '../buttons/FormButton';
import FormModal from '@src/containers/FormModal';
import { ADD_OFFERING } from '@src/utils/dGraphQueries/offering';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { useMutation } from '@apollo/client';

import { getEntityOptionsList } from '@src/utils/helpersUserAndEntity';
import { LegalEntity, Organization } from 'types';
import { useRouter } from 'next/router';

type CreateOfferingType = {
  organization: Organization;
  refetch: () => void;
};

const CreateOffering: FC<CreateOfferingType> = ({ organization, refetch }) => {
  const [entityModal, setEntityModal] = useState<boolean>(false);
  const [addOffering, { data, error }] = useMutation(ADD_OFFERING);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [alerted, setAlerted] = useState<boolean>(false);
  const router = useRouter();
  const entityOptions = organization && getEntityOptionsList(organization.legalEntities as LegalEntity[]);
  const entitiesWithoutOfferings = entityOptions.filter((entity) => entity.offerings?.length === 0);

  const entitySubmissionCompletion = () => {
    refetch();
    setEntityModal(false);
  };

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  const handleSubmit = async (values: { offeringEntityId: string; name: string }) => {
    try {
      const result = await addOffering({
        variables: {
          currentDate: currentDate,
          offeringEntityId: values.offeringEntityId,
          name: values.name,
          image: '/assets/images/logos/company-placeholder.jpeg',
          brandColor: '#275A8F',
        },
      });
      const offeringId = result.data?.addOffering.offering[0].id;
      router.push(`/${organization.id}/offerings/${offeringId}`);
    } catch (e: any) {
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  return (
    <>
      <FormModal
        formOpen={entityModal}
        onClose={() => setEntityModal(false)}
        title={`Link a legal entity to your offering.`}
      >
        <CreateEntity organization={organization} actionOnCompletion={entitySubmissionCompletion} />
      </FormModal>
      <Formik
        initialValues={{
          offeringEntityId: '',
          name: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.name) {
            errors.name = 'Please set an name';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setButtonStep('submitting');
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="">
            <EntitySelector
              entities={entitiesWithoutOfferings}
              fieldName="offeringEntityId"
              setModal={setEntityModal}
              label="In which entity are you offering shares?"
              excludeIndividuals
              withAdd
            />
            <Input
              className={defaultFieldDiv}
              required
              labelText="What do you call this offering"
              name="name"
              placeholder="e.g. First Fund"
            />
            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-cLightBlue text-cLightBlue hover:bg-cLightBlue hover:text-white font-bold uppercase test-sm mt-8 rounded p-3 w-full"
            >
              <LoadingButtonText
                state={buttonStep}
                idleText={`Create ${values.name}`}
                submittingText={`Creating ${values.name}`}
                confirmedText="Created!"
                failedText="Oops. Something went wrong"
              />
            </FormButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateOffering;
