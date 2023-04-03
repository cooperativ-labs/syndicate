import Footer from '@src/Footer/Footer';
import Head from 'next/head';

import React, { FC } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Card from '@src/components/cards/Card';
import GpProfile from '@src/pages/GpProfile';
import LoadingModal from '@src/components/loading/ModalLoading';
import router from 'next/router';
import useApollo, { initializeApollo } from '@src/utils/apolloClient';
import { GET_ENTITY } from '@src/utils/dGraphQueries/entity';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { Offering } from 'types';
import { useQuery } from '@apollo/client';

type ResultProps = {
  result: Offering;
};

const OfferorProfile: NextPage<ResultProps> = ({ result }) => {
  const gpEntityId = router.query.gpEntityId;
  const { data } = useQuery(GET_ENTITY, { variables: { id: gpEntityId } });

  if (!data) {
    return <LoadingModal />;
  }
  const entity = data?.getLegalEntity;

  const { name, shortDescription, sharing, id } = entity;

  return entity ? (
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
        <meta property="og:url" content={`https://cooperativ.io/offerings/${id}`}></meta>
        Twitter
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={shortDescription} />
        <meta
          name="twitter:image"
          content={sharing ? `/assets/images/sharing-images/${sharing?.image.url}` : '/assets/images/share.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <GpProfile entity={entity} />
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

//   // const gpEntityId = params.gpEntityId;
//   // const { data, error } = useQuery(GET_OFFERING, { variables: { id: gpEntityId } });
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

export default OfferorProfile;
