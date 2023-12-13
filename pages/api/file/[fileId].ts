import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { initializeApollo } from '@src/utils/apolloClient';
import { GET_USER_PERMISSIONS } from '@src/utils/dGraphQueries/user';
import { GET_DOCUMENT_EDITORS } from '@src/utils/dGraphQueries/document';
import { OrganizationUser } from 'types';
import { gcpCredentials } from '../upload';

// Initialize Google Cloud Storage with direct credentials
const storage = new Storage({
  projectId: process.env.NEXT_PRIVATE_GOOGLE_CLOUD_PROJECT_ID,
  credentials: gcpCredentials,
});

const bucket = storage.bucket(process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET as string);

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.get(async (req, res) => {
//   const session = await getSession({ req });
//   const fileId = req.query.fileId as string;

//   if (!session) {
//     return res.status(401).send('Unauthorized');
//   }

//   // Implement your authorization logic based on user roles, groups, etc.
//   // Check if the user has access to the requested file.

//   const file = bucket.file(fileId);
//   const readStream = file.createReadStream();

//   res.setHeader('Content-Type', 'your-content-type');
//   res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);

//   readStream.pipe(res);
// });

handler.delete(async (req, res) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;
  const fileId = req.query.fileId as string;
  const apolloClient = initializeApollo();

  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const { data } = await apolloClient.query({
      query: GET_DOCUMENT_EDITORS,
      variables: { fileId: fileId },
    });
    const isDocEditor =
      data?.queryDocument
        ?.map((document: any) => document.owner.organization.users)
        .flat()
        .filter((organizationUser: OrganizationUser) => {
          return organizationUser.user.id === userId;
        }).length > 0;

    if (!isDocEditor) {
      return res.status(403).send('Forbidden');
    }
  } catch (error) {
    return res.status(500).send({ error: 'Error fetching user permissions' });
  }

  const file = bucket.file(fileId);

  try {
    await file.delete();

    // TODO: Update your database to remove the relationship between the user and the file

    res.status(200).send({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

export default handler;
