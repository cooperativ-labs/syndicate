import React, { FC, useContext, useState } from 'react';

import Input, { defaultFieldDiv } from '../form-components/Inputs';
import Select from '../form-components/Select';
import { currentDate } from '@utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';

import CreateEntity from '../entity/CreateEntity';
import EntitySelector from '../form-components/EntitySelector';
import FormButton from '../buttons/FormButton';
import FormModal from '@src/containers/FormModal';
import { ADD_OFFERING, ADD_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { useMutation } from '@apollo/client';

import { getEntityOptionsList } from '@src/utils/helpersUserAndEntity';
import { LegalEntity, Organization } from 'types';
import { useRouter } from 'next/router';
const fieldDiv = 'pt-3 my-2 bg-opacity-0';

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

  const entitySubmissionCompletion = () => {
    refetch();
    setEntityModal(false);
  };

  const entityOptions = organization && getEntityOptionsList(organization.legalEntities as LegalEntity[]);
  const spvEntityOptions = entityOptions.filter((entity) => entity.offerings?.length === 0);

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  // const addParticipant = async (offeringId, offeringEntity) => {
  //   try {
  //     await addOfferingParticipant({
  //       variables: {
  //         currentDate: currentDate,
  //         addressOfferingId: userWalletAddress + offeringId,
  //         chainId: chainId,
  //         offeringId: offeringId,
  //         name: `${offeringEntity.fullName}`,
  //         applicantId: offeringEntity.id,
  //         walletAddress: userWalletAddress,
  //         permitted: false,
  //       },
  //     });
  //     router.push(`/offerings/${offeringId}`);
  //   } catch (e) {
  //     return;
  //     // alert(`Oops. Looks like something went wrong with adding you as a participant: ${e.message}`);
  //   }
  // };

  // const offeringId = data?.addOffering.offering[0].id;
  // const offeringEntity = data?.addOffering.offering[0].offeringEntity;

  // if (offeringId && offeringEntity && !alerted) {
  //   addParticipant(offeringId, offeringEntity);
  // }

  if (data && !alerted) {
    const offeringId = data?.addOffering.offering[0].id;
    setAlerted(true);
    router.push(`/${organization.id}/offerings/${offeringId}`);
  }

  const handleSubmit = async (values: { managingEntityId: string; offeringEntityId: string; name: string }) => {
    try {
      await addOffering({
        variables: {
          currentDate: currentDate,
          managingEntityId: values.managingEntityId,
          offeringEntityId: values.offeringEntityId,
          name: values.name,
          image: '/assets/images/logos/company-placeholder.jpeg',
          brandColor: '#275A8F',
        },
      });
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
          managingEntityId: '',
          offeringEntityId: '',
          name: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.name) {
            errors.name = 'Please set an name';
          }

          if (values.managingEntityId === values.offeringEntityId) {
            errors.offeringEntityId = 'The General Partner and the offering entity cannot be the same.';
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
              entities={entityOptions}
              fieldName="managingEntityId"
              setModal={setEntityModal}
              label="Who will serve as the General Partner?"
              withAdd
            />
            <EntitySelector
              entities={spvEntityOptions}
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
