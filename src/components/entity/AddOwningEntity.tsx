import Button from '../buttons/Button';
import CreateEntity from './CreateEntity';
import EntitySelector from '../form-components/EntitySelector';
import FormButton from '../buttons/FormButton';
import FormModal from '@src/containers/FormModal';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { ADD_ENTITY_OWNER } from '@src/utils/dGraphQueries/entity';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { LegalEntity, Organization } from 'types';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

type AddOwningEntityProps = {
  ownedEntityId: string;
  organization: Organization;
  refetchOuter?: () => void;
};

const AddOwningEntity: FC<AddOwningEntityProps> = ({ ownedEntityId, organization, refetchOuter }) => {
  const { data: session, status } = useSession();

  const [addOwner, { data, error }] = useMutation(ADD_ENTITY_OWNER);
  const [entityModal, setEntityModal] = useState<boolean>(false);

  const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  if (data) {
    // refetchOuter();
  }

  const legalEntites = organization.legalEntities as LegalEntity[];

  return (
    <>
      <FormModal formOpen={entityModal} onClose={() => setEntityModal(false)} title={`Add an entity to your account`}>
        <CreateEntity actionOnCompletion={() => submissionCompletion(setEntityModal)} organization={organization} />
      </FormModal>

      <Formik
        initialValues={{
          addEntityOwner: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addOwner({
            variables: {
              currentDate: currentDate,
              addEntityOwner: values.addEntityOwner,
              ownedEntityId: ownedEntityId,
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            {legalEntites && (
              <EntitySelector
                className="flex flex-col"
                fieldName="addEntityOwner"
                entities={legalEntites}
                setModal={setEntityModal}
                label="Add a General Partner"
                withAdd
              />
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 rounded p-4 w-full "
            >
              {`Add Owner`}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddOwningEntity;
