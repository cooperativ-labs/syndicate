// upload.ts
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import multer, { File as MulterFile } from 'multer';
import { Storage } from '@google-cloud/storage';
import { getServerSession } from 'next-auth/next';
import { v4 as uuidv4 } from 'uuid';
import options from './auth/next-auth';

export const gcpCredentials = {
  type: 'service_account',
  project_id: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_GCP_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: 'syndicate@syndicate-382709.iam.gserviceaccount.com',
  client_id: '108640420626649045093',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/syndicate%40syndicate-382709.iam.gserviceaccount.com',
};

const storage = new Storage({
  projectId: process.env.NEXT_PRIVATE_GOOGLE_CLOUD_PROJECT_ID,
  credentials: gcpCredentials,
});

const bucket = storage.bucket(process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET as string);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB upload limit
  },
});

type NextApiRequestWithFile = NextApiRequest & {
  file: MulterFile;
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

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const gcsFileName = `${uuidv4()}-${req.file.originalname}`;
    const blob = bucket.file(gcsFileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    try {
      blobStream.on('error', (err) => {
        return res.status(500).json({ error: 'Error uploading to Google Cloud Storage', err });
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`;
        res.status(200).json({ url: publicUrl, fileId: gcsFileName });
      });

      blobStream.end(req.file.buffer);
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
