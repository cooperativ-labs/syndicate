import Footer from '@src/Footer/Footer';
import Head from 'next/head';

import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import OfferingProfile from '@src/screens/OfferingProfile';
import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { initializeApollo } from '@src/utils/supabaseApolloClient';
import { Offering } from '@gql/graphql';

type ResultProps = {
  result: Offering;
};

const ProjectProfile: NextPage<ResultProps> = ({ result }) => {
  const offering = result;
  const orgId = offering?.offeringEntity?.organization.id;
  const isPublic = offering?.is_public ?? false;
  const name = offering?.name ?? '';
  const shortDescription = offering?.short_description ?? '';
  const sharingImage = offering?.sharing_image ?? null;
  const id = offering?.id ?? '';
  const accessCode = offering?.access_code ?? '';

  return offering && isPublic ? (
    <div data-test="component-project" className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={shortDescription as string} />
        <meta
          property="og:image"
          content={
            sharingImage
              ? `/assets/images/sharing-images/${sharingImage?.url}`
              : '/assets/images/share.png'
          }
        />
        <meta property="og:url" content={`https://cooperativ.io/${orgId}/offerings/${id}`}></meta>
        Twitter
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={shortDescription as string} />
        <meta
          name="twitter:image"
          content={
            sharingImage
              ? `/assets/images/sharing-images/${sharingImage?.url}`
              : '/assets/images/share.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <ProfilePrivateModal offeringId={id} accessCode={accessCode} />
      <OfferingProfile offering={offering} />

      <Footer color="bg-gray-200" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <div>Sorry, this offering does not have a profile. </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const offeringId = params?.offeringId;
  return {
    props: {
      result: null
    }
  };

  try {
    const { data, error } = await apolloClient.query({
      query: GET_OFFERING,
      variables: { id: offeringId }
    });

    const result = data?.offeringsCollection?.edges[0]?.node;

    return {
      props: { result }
    };
  } catch (error) {
    console.log('error', error);

    return {
      props: {
        result: null
      }
    };
  }
};

export default ProjectProfile;
