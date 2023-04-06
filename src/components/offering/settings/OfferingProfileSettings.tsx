import Checkbox from '@src/components/form-components/Checkbox';
import FileUpload from '@src/components/form-components/FileUpload';
import FormButton from '@src/components/buttons/FormButton';
import Input from '@src/components/form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { Offering } from 'types';
import { UPDATE_OFFERING_PROFILE } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

const fieldDiv = 'my-2 bg-opacity-0';

type OfferingProfileSettingsProps = {
  offering: Offering;
  userId: string;
};

const OfferingProfileSettings: FC<OfferingProfileSettingsProps> = ({ offering, userId }) => {
  const [updateOffering, { data, error }] = useMutation(UPDATE_OFFERING_PROFILE);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const addLogoToDb = (url: string) => {
    updateOffering({
      variables: {
        offeringId: offering.id,
        currentDate: currentDate,
        name: offering.name,
        image: url,
      },
    });
  };

  const addBannerImageToDb = (url: string) => {
    updateOffering({
      variables: {
        offeringId: offering.id,
        currentDate: currentDate,
        name: offering.name,
        bannerImage: url,
      },
    });
  };

  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    setAlerted(true);
  }

  return (
    <>
      <h2 className="text-xl md:mt-8 mb-4 text-blue-900 font-semibold">Offering Profile</h2>
      <div className="flex md:grid-span-2 gap-12">
        <div className="flex w-full">
          <Formik
            initialValues={{
              name: offering.name,
              shortDescription: offering.shortDescription,
              brandColor: offering.brandColor,
              lightBrand: offering.lightBrand,
              isPublic: offering.isPublic,
              primaryVideo: offering.primaryVideo,
              website: offering.website,
            }}
            validate={(values) => {
              const errors: any = {}; /** @TODO : Shape */
              if (!values.name) {
                errors.name = 'Please name this syndication.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setButtonStep('submitting');
              setAlerted(false);
              setSubmitting(true);
              try {
                updateOffering({
                  variables: {
                    currentDate: currentDate,
                    name: values.name,
                    brandColor: values.brandColor,
                    lightBrand: values.lightBrand,
                    shortDescription: values.shortDescription,
                    primaryVideo: values.primaryVideo,
                    website: values.website,
                  },
                });
                setButtonStep('confirmed');
              } catch (e) {
                setButtonStep('failed');
                alert(e);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="flex flex-col w-full relative">
                {/* <Input
            className={fieldDiv}
            textArea
            required
            labelText="Short Description (160 Characters)"
            name="shortDescription"
            placeholder=""
          /> */}

                {/* <Input className={fieldDiv} labelText="Logo" name="logo" placeholder="https://source.com/your-logo" /> */}

                <div className="md:grid grid-cols-7 gap-4">
                  {/* <div className="col-span-3 ">
                  <Input className={fieldDiv} labelText="Brand color" name="brandColor" placeholder="#d3d3d3" />
                </div> */}
                  {/* <div className="col-span-1 self-center md:mt-8">
                  <div className="h-2 md:h-11 md:w-11 rounded-full" style={{ backgroundColor: values.brandColor }} />
                </div>
                <div className="col-span-3">
                  <Checkbox
                    className={fieldDiv}
                    labelText="Adjust for light brand color"
                    name="lightBrand"
                    checked={values.lightBrand}
                  />
                </div> */}
                </div>
                <Input
                  className={fieldDiv}
                  labelText="External website"
                  name="website"
                  placeholder="https://www.awesome.com"
                />
                <Input
                  className={fieldDiv}
                  labelText="Primary video"
                  name="primaryVideo"
                  placeholder="https://www.youtube.com/embed/FbPODl0eyVQ"
                />
                <div className="text-sm text-orange-700 font-medium -mt-2">
                  Note: Be sure to use the embed link, which is sometimes different from the link you see in your
                  browser, and that you have the correct permissions to embed the video.
                </div>
                <FormButton
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-4 rounded p-4 w-full"
                >
                  <LoadingButtonText
                    state={buttonStep}
                    idleText={`Update ${values.name}`}
                    submittingText="Saving"
                    confirmedText={`${values.name} updated!`}
                    failedText="Oops. Something went wrong"
                  />
                </FormButton>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex min-w-max gap-3">
          <div>
            <div className="h-36">
              <img src={offering.bannerImage} className="object-cover h-36" />
            </div>
            <FileUpload
              uploaderText="Add Banner"
              urlToDatabase={addBannerImageToDb}
              accept={['jpg', 'jpeg', 'png']}
              baseUploadUrl={`/offerings/${offering.id}/image/${userId}`}
            />
          </div>
          <div>
            <div className="h-36">
              <img src={offering.image} className="object-cover h-36" />
            </div>
            <FileUpload
              uploaderText="Add Logo"
              urlToDatabase={addLogoToDb}
              accept={['jpg', 'jpeg', 'png']}
              baseUploadUrl={`/offerings/${offering.id}/image/${userId}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferingProfileSettings;
