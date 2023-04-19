import Input from '../form-components/Inputs';
import React, { FC, useContext } from 'react';
import Select from '../form-components/Select';
import { ADD_LEGAL_ENTITY_USER } from '@src/utils/dGraphQueries/entity';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { GET_USER_FROM_EMAIL } from '@src/utils/dGraphQueries/user';
import { legalEntityPermissionOptions } from '@src/utils/enumConverters';
import { LegalEntityPermissionType } from 'types';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';

const fieldDiv = 'md:my-2 bg-opacity-0';

type SettingsAddTeamMemberProps = {
  entityId: string;
};

const SettingsAddTeamMember: FC<SettingsAddTeamMemberProps> = ({ entityId }) => {
  const [addTeamMember, { data, error }] = useMutation(ADD_LEGAL_ENTITY_USER);
  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);
  const client = useApolloClient();

  const handleAddTeamMemberAddress = async (emailAddress: string, permission: LegalEntityPermissionType) => {
    setUserDoesNotExist(false);
    client
      .query({
        query: GET_USER_FROM_EMAIL,
        variables: { emailAddress: emailAddress },
      })
      .then((result) => {
        if (result.data.queryUser.length === 0) {
          setUserDoesNotExist(true);
          return;
        }
        addTeamMember({
          variables: {
            userId: result.data.queryUser[0].id,
            currentDate: currentDate,
            entityId: entityId,
            emailAddress: emailAddress,
            permission: permission,
          },
        }).catch((error) => {
          throw new Error(error);
        });
      });
  };

  return (
    <Formik
      initialValues={{
        emailAddress: '',
        permission: LegalEntityPermissionType.Editor,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.emailAddress) {
          errors.emailAddress = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)) {
          errors.emailAddress = 'Invalid email address';
        }
        if (!values.permission) {
          errors.permission = 'Please choose a role';
        }
        if (userDoesNotExist) {
          errors.emailAddress = 'User does not exist';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleAddTeamMemberAddress(values.emailAddress, values.permission);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col ">
          <div className="grid md:grid-cols-5 gap-2">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              name="emailAddress"
              required
              placeholder="e.g moritz@bonuslife.com"
            />
            <Select className={`${fieldDiv} col-span-2`} name="permission">
              <option value="">--Role--</option>
              {legalEntityPermissionOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </Select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-blue-900 hover:bg-blue-800 hover:text-white border-2 border-blue-900 text-sm font-bold uppercase my-0 rounded p-2"
          >
            Add member
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsAddTeamMember;
