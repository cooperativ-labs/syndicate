// upload.ts
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import { Multer } from 'multer';
import { upload } from './file/upload';
import { getServerSession } from 'next-auth/next';

import { initializeApollo } from '@src/utils/apolloClient';
import { GET_USER_PERMISSIONS } from '@src/utils/dGraphQueries/user';
import options from './auth/next-auth';

type NextApiRequestWithFile = NextApiRequest & {
  file: Multer.GoogleCloudStorage.File;
};

const handler = nextConnect<NextApiRequestWithFile, NextApiResponse>()
  .use(upload.single('file'))
  .post(async (req, res) => {
    const session = await getServerSession(req, res, options);
    // const apolloClient = initializeApollo();
    // const { data } = await apolloClient.query({
    //   query: GET_USER_PERMISSIONS,
    //   variables: { id: session?.user?.id },
    // });
    // const isOrgUser = data?.queryUser[0].organizations[0].permissions.includes('ADMIN', 'EDITOR');

    if (!session) {
      return res.status(401).send('Unauthorized');
    }
    try {
      res.status(200).json({ url: req.file.path, fileId: req.file.filename });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
