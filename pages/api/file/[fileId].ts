import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import { Storage } from '@google-cloud/storage';
import path from 'path';

const keyFilePath = path.join(process.cwd(), '/syndicate-cloud-key-staging.json');

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: keyFilePath,
});

const bucket = storage.bucket(process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET);

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
  const fileId = req.query.fileId as string;

  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  // Implement your authorization logic based on user roles, groups, etc.
  // Check if the user has access to the requested file.

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
