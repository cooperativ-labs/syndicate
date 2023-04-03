import Button from '../buttons/Button';
import CreateEntity from './CreateEntity';
import EntitySelector from '../form-components/EntitySelector';
import FormButton from '../buttons/FormButton';
import FormModal from '@src/containers/FormModal';
import React, { FC, useContext, useState } from 'react';
import { ADD_ENTITY_OWNER } from '@src/utils/dGraphQueries/entity';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useMutation, useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

type GpAdderProps = {
  ownedEntityId: string;
  refetchOuter: () => void;
};

const GpAdder: FC<GpAdderProps> = ({ ownedEntityId, refetchOuter }) => {
  const { uuid } = useContext(UserAccountContext);
  const { data: userData, refetch } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];

  const [addOwner, { data, error }] = useMutation(ADD_ENTITY_OWNER);
  const [entityModal, setEntityModal] = useState<boolean>(false);

  const submissionCompletion = (setModal) => {
    setModal(false);
    refetch();
  };

  if (data) {
    refetchOuter();
  }

  return (
    <>
      <FormModal formOpen={entityModal} onClose={() => setEntityModal(false)} title={`Add an entity to your account`}>
        <CreateEntity actionOnCompletion={() => submissionCompletion(setEntityModal)} />
      </FormModal>

      <Formik
        initialValues={{
          gpEntityId: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addOwner({
            variables: {
              currentDate: currentDate,
              gpEntityId: values.gpEntityId,
              ownedEntityId: ownedEntityId,
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            <EntitySelector
              className="flex flex-col"
              fieldName="gpEntityId"
              entities={user.legalEntities}
              setModal={setEntityModal}
              label="Add a General Partner"
              withAdd
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 rounded p-4 w-full "
            >
              {`Add General Partner`}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GpAdder;
