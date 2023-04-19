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
import { investmentOfferingTypeOptions } from '@src/utils/enumConverters';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { ReachContext } from '@src/SetReachContext';
import { useMutation, useQuery } from '@apollo/client';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const fieldDiv = 'pt-3 my-2 bg-opacity-0';

const CreateOffering: FC = () => {
  const { data: session, status } = useSession();
  const { data: userData, refetch } = useQuery(GET_USER, { variables: { id: session.user.id } });
  const user = userData?.queryUser[0];

  const { userWalletAddress } = useContext(ReachContext);

  const [entityModal, setEntityModal] = useState<boolean>(false);
  const [addOffering, { data, error }] = useMutation(ADD_OFFERING);
  // const [addOfferingParticipant, { data: participantData, error: participantError }] =
  //   useMutation(ADD_OFFERING_PARTICIPANT);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [alerted, setAlerted] = useState<boolean>(false);
  const router = useRouter();

  const entitySubmissionCompletion = () => {
    refetch();
    setEntityModal(false);
  };

  if (!user) {
    return <></>;
  }

  const entityOptions = [...user.legalEntities].reverse();
  const spvEntityOptions = entityOptions.filter((entity) => entity.legalEntity.offerings.length === 0);

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
    setButtonStep('confirmed');
    setTimeout(() => {
      router.push(`/offerings/${offeringId}`);
    }, 1000);
  }

  const handleSubmit = async (values) => {
    try {
      await addOffering({
        variables: {
          currentDate: currentDate,
          userId: user.id,
          managingEntityId: values.managingEntityId,
          offeringEntityId: values.offeringEntityId,
          name: values.name,
          image: '/assets/images/logos/company-placeholder.jpeg',
          // shortDescription: values.shortDescription,
          // website: values.website,
          brandColor: '#275A8F',
        },
      });
    } catch (e) {
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
        <CreateEntity actionOnCompletion={entitySubmissionCompletion} />
      </FormModal>
      <Formik
        initialValues={{
          managingEntityId: '',
          offeringEntityId: '',
          name: '',
          website: '',
          investmentType: '',
          shortDescription: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.name) {
            errors.name = 'Please set an name';
          }
          if (!values.investmentType) {
            errors.investmentType = 'Please select an investment type';
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
            <Select
              required
              className={defaultFieldDiv}
              labelText="What type of asset are you offering"
              name="investmentType"
            >
              <option value="">Select an asset type</option>
              {investmentOfferingTypeOptions.map((type, i) => {
                return (
                  <option key={i} value={type.value}>
                    {type.name}
                  </option>
                );
              })}
            </Select>
            <Input
              className={defaultFieldDiv}
              required
              labelText="What do you call this offering"
              name="name"
              placeholder="e.g. Cosy Apartments"
            />
            {/* <Input
              className={fieldDiv}
              textArea
              labelText="Short Description (160 Characters)"
              name="shortDescription"
              placeholder="e.g. This is a set of seven luxury apartments."
            />
            <Input
              className={fieldDiv}
              labelText="Offering website (optional)"
              name="website"
              placeholder="https://www.awesome.com"
            /> */}

            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
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
