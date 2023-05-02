import Footer from '@src/Footer/Footer';
import Head from 'next/head';

import OrganizationProfile from '@src/pages/OrganizationProfile';
import React from 'react';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { GetServerSideProps, NextPage } from 'next';
import { initializeApollo } from '@src/utils/apolloClient';
import { Organization } from 'types';
import PortalWrapper from '@src/containers/PortalWrapper';
import PortalOrganization from '@src/pages/PortalOrganization';

export const TEMP_IS_PARTICIPANT = true;

type ResultProps = {
  result: Organization;
};

const OfferorProfile: NextPage<ResultProps> = ({ result }) => {
  const organization = result;

  const { name, shortDescription, sharingImage, id } = organization;

  return organization ? (
    <div data-test="component-project" className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={shortDescription} />
        <meta
          property="og:image"
          content={sharingImage ? `/assets/images/sharing-images/${sharingImage?.url}` : '/assets/images/share.png'}
        />
        <meta property="og:url" content={`https://cooperativ.io/${id}/portal/`}></meta>
        Twitter
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={shortDescription} />
        <meta
          name="twitter:image"
          content={sharingImage ? `/assets/images/sharing-images/${sharingImage?.url}` : '/assets/images/share.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {TEMP_IS_PARTICIPANT ? (
        <PortalWrapper>
          <PortalOrganization />{' '}
        </PortalWrapper>
      ) : (
        <OrganizationProfile organization={organization} />
      )}
      <Footer color="bg-gray-200" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <div>Sorry, this offeror does not have a public profile. </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const organizationId = params.organizationId;

  try {
    const { data } = await apolloClient.query({
      query: GET_ORGANIZATION,
      variables: { id: organizationId },
    });
    const result = data.getOrganization;
    return {
      props: { result },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        result: null,
      },
    };
  }
};

export default OfferorProfile;
