'use client';

import FormModal from '@src/containers/FormModal';
import { Form, Formik } from 'formik';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import EntitySelector from '../form-components/EntitySelector';
import CreateEntity from './CreateEntity';
import { addOwner } from '@src/utils/actions/entityActions';
import { useEntities } from '@contexts/EntityContext';

type AddOwningEntityProps = {
  ownedEntityId: string | number;
  refetchOuter?: () => void;
};

const AddOwningEntity: FC<AddOwningEntityProps> = ({ ownedEntityId, refetchOuter }) => {
  const { entities } = useEntities();
  const [entityModal, setEntityModal] = useState<boolean>(false);

  const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  return (
    <>
      <FormModal
        formOpen={entityModal}
        onClose={() => setEntityModal(false)}
        title={`Add an entity to your account`}
      >
        <CreateEntity actionOnCompletion={() => submissionCompletion(setEntityModal)} />
      </FormModal>

      <Formik
        initialValues={{
          addEntityOwner: ''
        }}
        validate={values => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addOwner({
            ownerId: values.addEntityOwner,
            entityId: ownedEntityId
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            {entities && (
              <EntitySelector
                className="flex flex-col"
                fieldName="addEntityOwner"
                entities={entities}
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
