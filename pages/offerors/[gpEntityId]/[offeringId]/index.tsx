import Footer from '@src/Footer/Footer';
import Head from 'next/head';

import React, { FC } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Card from '@src/components/cards/Card';
import LoadingModal from '@src/components/loading/ModalLoading';
import OfferingProfile from '@src/pages/OfferingProfile';
import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import router from 'next/router';
import useApollo, { initializeApollo } from '@src/utils/apolloClient';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { Offering } from 'types';
import { useQuery } from '@apollo/client';

type ResultProps = {
  result: Offering;
};

const ProjectProfile: NextPage<ResultProps> = ({ result }) => {
  // const offering = result && result;
  const offeringId = router.query.offeringId;
  const { data } = useQuery(GET_OFFERING, { variables: { id: offeringId } });

  if (!data) {
    return <LoadingModal />;
  }
  const offering = data?.getOffering;
  const { name, shortDescription, sharing, id, isPublic, accessCode } = offering;

  return offering && isPublic ? (
    <div data-test="component-project" className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={shortDescription} />
        <meta
          property="og:image"
          content={sharing ? `/assets/images/sharing-images/${sharing?.image.url}` : '/assets/images/share.png'}
        />
        <meta property="og:url" content={`https://cooperativ.io/${orgId}/offerings/${id}`}></meta>
        Twitter
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={shortDescription} />
        <meta
          name="twitter:image"
          content={sharing ? `/assets/images/sharing-images/${sharing?.image.url}` : '/assets/images/share.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ProfilePrivateModal offeringId={id} accessCode={accessCode} />
      <OfferingProfile offering={offering} />

      <Footer color="bg-gray-200" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <div>Sorry, this syndication does not have a public profile. </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const apolloClient = initializeApollo();
//   const data = await apolloClient.query({ variables: { id: params.id }, query: GET_OFFERING });
//   const result = data.data.getProject;

//   // const offeringId = params.offeringId;
//   // const { data, error } = useQuery(GET_OFFERING, { variables: { id: offeringId } });
//   // console.log(data, error);
//   // const result = data.getProject;

//   if (!result) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { result },
//   };
// };

export default ProjectProfile;
