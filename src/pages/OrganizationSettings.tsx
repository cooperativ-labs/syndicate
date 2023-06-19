import DashboardCard from '@src/components/cards/DashboardCard';
import EmailAddressList from '@src/components/EmailAddressList';
import FileUpload from '@src/components/form-components/FileUpload';
import FormModal from '@src/containers/FormModal';
import LinkedAccountsList from '@src/components/LinkedAccountsList';
import ModalLoading from '@src/components/loading/ModalLoading';
import OrganizationSpecifications, {
  changeForm,
  EditOrganizationSelectionType,
} from '@src/components/organization/OrganizationSpecifications';
import ProfileVisibilityToggle from '@src/components/offering/settings/ProfileVisibilityToggle';
import React, { FC, useState } from 'react';
import RoundedImage from '@src/components/RoundedImage';
import SectionBlock from '@src/containers/SectionBlock';
import SettingsAddEmail from '@src/components/account/SettingsAddEmail';

import NotificationConfigList from '@src/components/organization/NotificationConfigList';
import SettingsAddNotification from '@src/components/organization/SettingsAddNotification';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import SettingsSocial from '@src/components/account/SettingsSocial';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_ORGANIZATION, UPDATE_ORGANIZATION_INFORMATION } from '@src/utils/dGraphQueries/organization';
import { getBaseUrl } from '@src/utils/helpersURL';
import { getIsAdmin, getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { getOrganizationUser } from '@src/utils/helpersOrganization';
import { Maybe, Organization } from 'types';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const OrganizationSettings: FC = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const { organizationId: orgId } = router.query;

  const {
    data: organizationData,
    error: getOrgError,
    loading,
  } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization: Organization = organizationData?.getOrganization;

  const [updateOrganization, { data: updateOrgData, error: updateOrgError }] = useMutation(
    UPDATE_ORGANIZATION_INFORMATION
  );

  const [imageModal, setImageModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditOrganizationSelectionType>('none');
  const [alerted, setAlerted] = useState<boolean>(false);

  const error = updateOrgError || getOrgError;
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong. ${error}`);
    setAlerted(true);
  }

  if (!organization || loading) {
    return <ModalLoading />;
  }

  const {
    id,
    name,
    emailAddresses,
    logo,
    bannerImage,
    legalEntities,
    country,
    isPublic,
    description,
    shortDescription,
    linkedAccounts,
  } = organization;

  const organizationCurrentUser = getOrganizationUser(userId, organization);
  const isAdmin = userId && getIsAdmin(userId, organization);
  const isEditorOrAdmin = getIsEditorOrAdmin(userId, organization);

  const handleNameChange = (values: { name: Maybe<string> | undefined }) => {
    updateOrganization({
      variables: {
        currentDate: currentDate,
        organizationId: organization.id,
        name: values.name,
        logo: logo,
        bannerImage: bannerImage,
        country: country,
      },
    }).then((res) => {
      setNameEditOn('none');
      router.reload();
    });
  };
  const handleToggle = (profileVisibility: boolean) => {
    updateOrganization({
      variables: {
        currentDate: currentDate,
        organizationId: organization.id,
        name: name,
        country: country,
        isPublic: profileVisibility,
        logo: logo,
        bannerImage: bannerImage,
      },
    });
  };

  const addLogoToDB = (url: string) => {
    updateOrganization({
      variables: {
        organizationId: organization.id,
        currentDate: currentDate,
        name: name,
        country: country,
        bannerImage: bannerImage,

        logo: url,
      },
    });
  };

  const addBannerImageToDb = (url: string) => {
    updateOrganization({
      variables: {
        organizationId: organization.id,
        currentDate: currentDate,
        name: name,
        country: country,

        bannerImage: url,
      },
    });
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal formOpen={imageModal} onClose={() => setImageModal(false)}>
        <div className=" grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1 justify-center">
            <img className="h-32 object-scale-down" src={logo as string} />
            <FileUpload
              uploaderText="Add logo"
              urlToDatabase={addLogoToDB}
              accept={['jpg', 'jpeg', 'png', 'svg']}
              baseUploadUrl={`/${organization.id}/`}
            />
          </div>
          <div className="col-span-2">
            <img className="h-32 w-full object-cover" src={bannerImage as string} />
            <FileUpload
              uploaderText="Add banner image"
              urlToDatabase={addBannerImageToDb}
              accept={['jpg', 'jpeg', 'png', 'svg']}
              baseUploadUrl={`/${organization.id}/`}
            />
          </div>
        </div>
      </FormModal>

      <div className="flex items-center relative">
        <img src={bannerImage as string} className="object-cover h-64 w-full absolute" />
        <div className="flex backdrop-opacity-10 backdrop-invert w-full h-64 bg-gray-800/50 items-center">
          <div className="ml-4 flex items-center ">
            <RoundedImage
              className="h-40 w-40 bg-gray-800 backdrop-opacity-10  border-2 border-gray-100 mr-4"
              src={logo as string}
              onClick={() => isEditorOrAdmin && setImageModal(true)}
            />

            <div>
              {nameEditOn === 'name' ? (
                changeForm('name', organization, setNameEditOn, handleNameChange)
              ) : (
                <div
                  className="font-ubuntu text-3xl text-white font-semibold hover:cursor-pointer"
                  onClick={() => isEditorOrAdmin && setNameEditOn('name')}
                >
                  {name}
                </div>
              )}
            </div>
          </div>
          <button
            className="absolute right-4 bottom-4 text-white"
            onClick={() => isEditorOrAdmin && setImageModal(true)}
            aria-label="edit banner image"
            name="Edit banner image"
          >
            <FontAwesomeIcon icon="pen" />
          </button>
        </div>
      </div>
      <hr className="my-5 w-0" />
      <TwoColumnLayout twoThirdsLayout>
        <div>
          <DashboardCard>
            <div className="flex justify-between">
              <div className="font-semibold">Set as public profile:</div>
              <div className="flex items-center">
                {isEditorOrAdmin && (
                  <ProfileVisibilityToggle profileVisibility={isPublic} handleToggle={handleToggle} />
                )}
                <a href={`/${organization.id}`} target="_blank" rel="noreferrer" className="ml-2">
                  <FontAwesomeIcon icon="square-arrow-up-right" className="text-lg " />
                </a>
              </div>
            </div>
            <hr className="my-4" />
            <OrganizationSpecifications
              organization={organization}
              isOrganizationManager={isEditorOrAdmin}
              updateOrganization={updateOrganization}
            />

            <div>
              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Email addresses'}>
                  <EmailAddressList emailAddresses={emailAddresses} withEdit isOrganizationManager={isEditorOrAdmin} />
                  {isEditorOrAdmin && <SettingsAddEmail completionUrl={`${getBaseUrl()}/email-confirmation`} />}
                </SectionBlock>
              </div>

              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Socials'}>
                  <LinkedAccountsList linkedAccounts={linkedAccounts} isOrganizationManager={isEditorOrAdmin} />
                  {isEditorOrAdmin && <SettingsSocial organization={organization} />}
                </SectionBlock>
              </div>
            </div>
          </DashboardCard>
        </div>
        <>
          <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Team</h2>
          <TeamMemberList
            teamMembers={organization.users}
            organizationId={organization.id}
            currentUserId={userId}
            isAdmin={isAdmin}
          />
          <div className="mt-3 rounded-lg p-1 px-2 border-2 border-gray-200">
            <SectionBlock className="font-bold " sectionTitle={'Add team members'} mini asAccordion>
              <SettingsAddTeamMember organizationId={organization.id} />
            </SectionBlock>
          </div>
        </>
        <></>
        <>
          <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Email Notifications</h2>
          <NotificationConfigList organizationUser={organizationCurrentUser} />
          <div className="mt-3 rounded-lg p-1 px-2 border-2 border-gray-200">
            <SectionBlock className="font-bold " sectionTitle={'Add Notification Rule'} mini asAccordion>
              <SettingsAddNotification organizationUserId={organizationCurrentUser?.id} />
            </SectionBlock>
          </div>
        </>
      </TwoColumnLayout>
      {/* <EntityTabContainer subsidiaries={subsidiaries} offerings={offerings} entity={entity} /> */}
    </div>
  );
};

export default OrganizationSettings;
