import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import FormButton from '@src/components/buttons/FormButton';
import Checkbox from '@src/components/form-components/Checkbox';
import FileUpload from '@src/components/form-components/FileUpload';
import Input from '@src/components/form-components/Inputs';
import { updateOfferingProfile } from '@src/utils/actions/offeringActions';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';

import { Offering } from '@/types';

const fieldDiv = 'my-2 bg-opacity-0';

type OfferingProfileSettingsProps = {
  offering: Offering;
  userId: string;
};

const OfferingProfileSettings: FC<OfferingProfileSettingsProps> = ({ offering, userId }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const {
    id,
    name,
    brand_color,
    light_brand,
    image,
    banner_image,
    primary_video,
    website,
    short_description,
    is_public
  } = offering;

  const addLogoToDb = (url: string) => {
    // updateOfferingProfile({
    //   offeringId: offering.id.toString(),
    //   name: offering.name,
    //   image: url
    // });
  };

  const addBannerImageToDb = (url: string) => {
    // updateOfferingProfile({
    //   offeringId: offering.id.toString(),
    //   name: offering.name,
    //   bannerImage: url
    // });
  };

  return (
    <>
      <h2 className="text-xl md:mt-8 mb-4 text-blue-900 font-semibold">Offering Profile</h2>
      <div className="flex md:grid-span-2 gap-12">
        <div className="flex w-full">
          <Formik
            initialValues={{
              name: name,
              shortDescription: short_description,
              brandColor: brand_color,
              lightBrand: light_brand,
              isPublic: is_public,
              primaryVideo: primary_video,
              website: website,
              image: image,
              bannerImage: banner_image
            }}
            validate={values => {
              const errors: any = {}; /** @TODO : Shape */
              if (!values.name) {
                errors.name = 'Please name this syndication.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setButtonStep('step1');

              setSubmitting(true);
              try {
                updateOfferingProfile({
                  offeringId: offering.id.toString(),
                  name: values.name,
                  brandColor: values.brandColor,
                  lightBrand: values.lightBrand,
                  shortDescription: values.shortDescription,
                  primaryVideo: values.primaryVideo,
                  website: values.website,
                  image: values.image,
                  bannerImage: values.bannerImage
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
                  Note: Be sure to use the embed link, which is sometimes different from the link
                  you see in your browser, and that you have the correct permissions to embed the
                  video.
                </div>
                <FormButton
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-4 rounded p-4 w-full"
                >
                  <LoadingButtonText
                    state={buttonStep}
                    idleText={`Update ${values.name}`}
                    step1Text="Saving"
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
              <img src={offering.bannerImage as string} className="object-cover h-36" />
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
              <img src={offering.image as string} className="object-cover h-36" />
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
