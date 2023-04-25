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
import React, { FC, useContext, useEffect, useState } from 'react';
import RoundedImage from '@src/components/RoundedImage';
import SectionBlock from '@src/containers/SectionBlock';
import SettingsAddEmail from '@src/components/account/SettingsAddEmail';
import SettingsAddTeamMember from '@src/components/entity/SettingsAddTeamMember';
import SettingsSocial from '@src/components/account/SettingsSocial';
import TeamMemberList from '@src/components/entity/TeamMemberList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import {
  ADD_ORGANIZATION_EMAIL,
  GET_ORGANIZATION,
  UPDATE_ORGANIZATION_INFORMATION,
} from '@src/utils/dGraphQueries/organization';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIsAdmin } from '@src/utils/helpersUserAndEntity';
import { Organization } from 'types';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ApplicationStoreProps, store } from '@context/store';

const OrganizationDetails: FC = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const orgId = router.query.organizationId;
  const {
    data: organizationData,
    error: getOrgError,
    loading,
  } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization: Organization = organizationData?.getOrganization;

  const [updateOrganization, { data: updateOrgData, error: updateOrgError }] = useMutation(
    UPDATE_ORGANIZATION_INFORMATION
  );
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: setActiveOrg } = applicationStore;

  const [addOrganizationEmail, { data: dataEmail, error: errorEmail }] = useMutation(ADD_ORGANIZATION_EMAIL);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditOrganizationSelectionType>('none');
  const [alerted, setAlerted] = useState<boolean>(false);

  const error = updateOrgError || errorEmail || getOrgError;
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong. ${error}`);
    setAlerted(true);
  }

  const [localStorage, setLocalStorage] = useState(undefined);
  useEffect(() => {
    setLocalStorage(window.localStorage);
  }, [setLocalStorage]);

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

  const isAdmin = getIsAdmin(userId, organization);

  const offerings = legalEntities
    .map((entity) => {
      return entity.offerings;
    })
    .flat();

  const emailForSignIn = localStorage?.getItem('emailForSignIn');
  const addEmailToDatabase = (email: string) => {
    try {
      addOrganizationEmail({
        variables: {
          organizationId: orgId,
          address: email,
          isPublic: true,
        },
      });

      window.localStorage.removeItem('emailForSignIn');
    } catch (err) {
      throw new Error(err);
    }
  };

  if (emailForSignIn) {
    addEmailToDatabase(emailForSignIn);
  }

  const handleNameChange = (values: { name: string }) => {
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
      console.log(res);
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

  const submissionCompletion = (setModal) => {
    setModal(false);
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal formOpen={imageModal} onClose={() => setImageModal(false)}>
        <div className=" grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1 justify-center">
            <img className="h-32 object-scale-down" src={logo} />
            <FileUpload
              uploaderText="Add logo"
              urlToDatabase={addLogoToDB}
              accept={['jpg', 'jpeg', 'png', 'svg']}
              baseUploadUrl={`/${organization.id}/`}
            />
          </div>
          <div className="col-span-2">
            <img className="h-32 w-full object-cover" src={bannerImage} />
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
        <img src={bannerImage} className="object-cover h-64 w-full absolute" />
        <div className="flex backdrop-opacity-10 backdrop-invert w-full h-64 bg-gray-800/50 items-center">
          <div className="ml-4 flex items-center ">
            <RoundedImage
              className="h-40 w-40 bg-gray-800 backdrop-opacity-10  border-2 border-gray-100 mr-4"
              src={logo}
              onClick={() => setImageModal(true)}
            />

            <div>
              {nameEditOn === 'name' ? (
                changeForm('name', organization, setNameEditOn, handleNameChange)
              ) : (
                <div
                  className="font-ubuntu text-3xl text-white font-semibold hover:cursor-pointer"
                  onClick={() => setNameEditOn('name')}
                >
                  {name}
                </div>
              )}
            </div>
          </div>
          <button
            className="absolute right-4 bottom-4 text-white"
            onClick={() => setImageModal(true)}
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
                <ProfileVisibilityToggle profileVisibility={isPublic} handleToggle={handleToggle} />
                <a href={`/offerors/${organization.id}`} target="_blank" rel="noreferrer" className="ml-2">
                  <FontAwesomeIcon icon="square-arrow-up-right" className="text-lg " />
                </a>
              </div>
            </div>
            <hr className="my-4" />
            <OrganizationSpecifications
              organization={organization}
              isOrganizationManager={true}
              updateOrganization={updateOrganization}
            />

            <div>
              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Email addresses'}>
                  <EmailAddressList emailAddresses={emailAddresses} withEdit />
                  <SettingsAddEmail completionUrl={`/${orgId}/settings`} />
                </SectionBlock>
              </div>

              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Socials'}>
                  <LinkedAccountsList linkedAccounts={linkedAccounts} />
                  <SettingsSocial organization={organization} />{' '}
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
      </TwoColumnLayout>
      {/* <EntityTabContainer subsidiaries={subsidiaries} offerings={offerings} entity={entity} /> */}
    </div>
  );
};

export default OrganizationDetails;
