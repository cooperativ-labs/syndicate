const multer = require("multer");
import MulterGoogleStorage from "multer-google-storage";
import path from "path";

const keyFilePath = path.join(process.cwd(), "/syndicate-cloud-key-staging.json");

export const upload = multer({
  storage: new MulterGoogleStorage({
    projectId: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID,
    bucket: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET,
    keyFilename: keyFilePath,
    public: true
  })
});

export default upload;
