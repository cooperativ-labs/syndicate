// upload.ts
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { Multer } from 'multer';
import { upload } from './file/upload';

type NextApiRequestWithFile = NextApiRequest & {
  file: Multer.GoogleCloudStorage.File;
};

const handler = nextConnect<NextApiRequestWithFile, NextApiResponse>()
  .use(upload.single('file'))
  .post(async (req, res) => {
    try {
      res.status(200).json({ url: req.file.path });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
