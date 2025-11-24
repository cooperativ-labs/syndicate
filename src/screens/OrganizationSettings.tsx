'use client';

import { useUserContext } from '@contexts/UserContext';
import SettingsAddEmail from '@src/components/account/SettingsAddEmail';
import SettingsSocial from '@src/components/account/SettingsSocial';
import DashboardCard from '@src/components/cards/DashboardCard';
import EmailAddressList from '@src/components/EmailAddressList';
import ImageUpload from '@src/components/form-components/ImageUpload';
import LinkedAccountsList from '@src/components/LinkedAccountsList';
import ModalLoading from '@src/components/loading/ModalLoading';
import ProfileVisibilityToggle from '@src/components/offering/settings/ProfileVisibilityToggle';
import NotificationConfigList from '@src/components/organization/NotificationConfigList';
import OrganizationSpecifications, {
  changeForm,
  EditOrganizationSelectionType
} from '@src/components/organization/OrganizationSpecifications';
import SettingsAddNotification from '@src/components/organization/SettingsAddNotification';
import SettingsAddTeamMember from '@src/components/organization/SettingsAddTeamMember';
import TeamMemberList from '@src/components/organization/TeamMemberList';
import RoundedImage from '@src/components/RoundedImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/ui/dialog';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import {
  deleteOrganizationAsset,
  setProfileVisibility,
  updateOrganization,
  uploadOrganizationAsset
} from '@src/utils/actions/organizationActions';
import { getBaseUrl } from '@src/utils/helpersURL';
import { getIsAdmin, getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { Pencil, SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useState } from 'react';

import { NotificationConfiguration, OrganizationComplete, OrganizationUser } from '@/types';
interface OrganizationSettingsProps {
  organization: OrganizationComplete | null;
  organizationUser:
    | (OrganizationUser & { notificationConfigurations: NotificationConfiguration[] })
    | null;
}
const OrganizationSettings: FC<OrganizationSettingsProps> = ({
  organization,
  organizationUser
}) => {
  const { user } = useUserContext();
  const userId = user?.id;
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(organization?.logo || null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(
    organization?.banner_image || null
  );
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditOrganizationSelectionType>('none');

  if (!organization) {
    return <ModalLoading />;
  }

  const {
    id,
    name,
    emailAddresses,
    logo,
    banner_image,
    legalEntities,
    country,
    linkedAccounts,
    is_public,
    short_description,
    description
  } = organization;

  const isAdmin =
    organizationUser && userId && getIsAdmin({ userId, organizationUsers: [organizationUser] });
  const isEditorOrAdmin = getIsEditorOrAdmin({
    userId: userId ?? '',
    organizationUsers: organizationUser ? [organizationUser] : []
  });

  const baseItems = {
    organizationId: organization.id.toString(),
    country: country ?? '',
    shortDescription: short_description ?? '',
    description: description ?? ''
  };

  const handleNameChange = async (values: { name: string }) => {
    await updateOrganization({
      name: values.name,
      ...baseItems,
      logo: logo ?? '',
      bannerImage: banner_image ?? '',
      isPublic: is_public ?? false
    });
    setNameEditOn('none');
    window.location.reload();
  };
  const handleToggle = async (profileVisibility: boolean) => {
    await setProfileVisibility({
      organizationId: organization.id.toString(),
      isPublic: profileVisibility
    });
  };

  const addLogoToDB = async (file: File) => {
    await uploadOrganizationAsset({
      assetFile: file,
      assetName: file.name,
      assetType: 'logo',
      organizationId: organization.id
    });
  };

  const addBannerImageToDb = async (file: File) => {
    await uploadOrganizationAsset({
      assetFile: file,
      assetName: file.name,
      assetType: 'banner_image',
      organizationId: organization.id
    });
  };

  const deleteLogoFromDb = async () => {
    await deleteOrganizationAsset({
      assetUrl: logo as string,
      assetType: 'logo',
      organizationId: organization.id
    });
    setLogoImageUrl(null);
  };

  const deleteBannerImageFromDb = async () => {
    await deleteOrganizationAsset({
      assetUrl: banner_image as string,
      assetType: 'banner_image',
      organizationId: organization.id
    });
    setBannerImageUrl(null);
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <Dialog open={imageModal} onOpenChange={setImageModal}>
        <DialogContent className="md:max-w-[800px] max-h-[90vh] ">
          <DialogHeader>
            <DialogTitle>Edit your organization's logo and banner image</DialogTitle>
          </DialogHeader>
          <div className=" grid grid-cols-3 gap-4">
            <div className="flex flex-col col-span-1 justify-center">
              <ImageUpload
                onSubmit={addLogoToDB}
                accept={['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml']}
                selectedImageUrl={logoImageUrl}
                setSelectedImageUrl={setLogoImageUrl}
                onDelete={deleteLogoFromDb}
                title="Logo"
                description="Choose file."
              />
            </div>
            <div className="col-span-2">
              <ImageUpload
                onSubmit={addBannerImageToDb}
                accept={['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml']}
                selectedImageUrl={bannerImageUrl}
                setSelectedImageUrl={setBannerImageUrl}
                onDelete={deleteBannerImageFromDb}
                title="Banner Image"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center relative">
        {banner_image && (
          <Image
            src={banner_image as string}
            className="object-cover h-64 w-full absolute"
            fill
            alt="Organization banner image"
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        )}
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
            <Pencil size={16} />
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
                  <ProfileVisibilityToggle
                    profileVisibility={is_public}
                    handleToggle={handleToggle}
                  />
                )}
                <a
                  href={`/portal/${organization.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2"
                >
                  <SquareArrowOutUpRight className="text-lg " />
                </a>
              </div>
            </div>
            <hr className="my-4" />
            <OrganizationSpecifications
              organization={organization}
              isOrganizationManager={isEditorOrAdmin}
            />

            <div>
              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Email addresses'}>
                  <EmailAddressList
                    emailAddresses={emailAddresses}
                    withEdit
                    isOrganizationManager={isEditorOrAdmin}
                  />
                  {isEditorOrAdmin && (
                    <SettingsAddEmail completionUrl={`${getBaseUrl()}/email-confirmation`} />
                  )}
                </SectionBlock>
              </div>

              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Socials'}>
                  <LinkedAccountsList
                    linkedAccounts={linkedAccounts}
                    isOrganizationManager={isEditorOrAdmin}
                  />
                  {isEditorOrAdmin && <SettingsSocial organization={organization} />}
                </SectionBlock>
              </div>
            </div>
          </DashboardCard>
        </div>
        <>
          <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Team</h2>
          <TeamMemberList
            teamMembers={organization.organizationUsers}
            organizationId={organization.id.toString()}
            isAdmin={isAdmin ?? false}
          />
          <div className="mt-3 rounded-lg p-1 px-2 border-2 border-gray-200">
            <SectionBlock className="font-bold " sectionTitle={'Add team members'} mini asAccordion>
              <SettingsAddTeamMember organizationId={organization.id.toString()} />
            </SectionBlock>
          </div>
        </>
        <></>
        <>
          <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Email Notifications</h2>
          <NotificationConfigList organizationUser={organizationUser} />
          <div className="mt-3 rounded-lg p-1 px-2 border-2 border-gray-200">
            <SectionBlock
              className="font-bold "
              sectionTitle={'Add Notification Rule'}
              mini
              asAccordion
            >
              <SettingsAddNotification organizationUserId={organizationUser?.id} />
            </SectionBlock>
          </div>
        </>
      </TwoColumnLayout>
      {/* <EntityTabContainer subsidiaries={subsidiaries} offerings={offerings} entity={entity} /> */}
    </div>
  );
};

export default OrganizationSettings;
