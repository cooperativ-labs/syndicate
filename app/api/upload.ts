// upload.ts
//@ts-ignore
import { Multer } from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

import { upload } from './file/upload';

type NextApiRequestWithFile = NextApiRequest & {
  file: Multer.GoogleCloudStorage.File;
};

const handler = upload
  .single('file')
  .post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
    try {
      res.status(200).json({ url: req.file.path, fileId: req.file.filename });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false
  }
};
