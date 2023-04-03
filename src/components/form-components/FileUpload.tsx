import Compressor from 'compressorjs';
import fireApp from 'firebaseConfig/firebaseConfig';
import React, { FC, useState } from 'react';
import { connectStorageEmulator, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { DocumentType } from 'types';
import { FileUploader } from 'react-drag-drop-files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFileFormat, urlToDatabaseProps } from '@src/utils/helpersDocuments';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export const storage = getStorage(fireApp);
// connectStorageEmulator(storage, 'localhost', 9199); Uncomment for Firebase Emulator

type FileUploadProps = {
  uploaderText: string;
  baseUploadUrl: string;
  urlToDatabase: urlToDatabaseProps;
  docType?: DocumentType;
  accept: string[];
  allowMultiple?: boolean;
};

const FileUpload: FC<FileUploadProps> = ({
  uploaderText,
  baseUploadUrl,
  urlToDatabase,
  docType,
  accept,
  allowMultiple,
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  function handleUploadFile(file) {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      new Compressor(file, {
        quality: 0.6,
        convertTypes: ['image/png'],
        convertSize: 300000,
        success(result) {
          // console.log('Compressed file size (in bytes): ', result.size);
          uploadFile(result as File);
        },
        error(err) {
          alert(err.message);
        },
      });
    } else {
      uploadFile(file);
    }

    function uploadFile(file) {
      setUploading(true);
      let storageRef = ref(storage, `${baseUploadUrl}/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressAmt(percentage);
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              urlToDatabase(downloadURL, file.name, docType, getFileFormat(file));
            })
            .then(() => {
              setProgressAmt(0);
              setUploading(false);
            });
        }
      );
    }
  }

  return (
    <div className="flex flex-col">
      <FileUploader multiple={allowMultiple} handleChange={handleUploadFile} name="file" types={accept}>
        <div className="flex p-3 mt-1 bg-gray-100  h-24 items-center justify-center rounded-md border-2 border-dashed border-cLightBlue border-opacity-40">
          <FontAwesomeIcon icon={'arrow-up-from-bracket' as IconName} className="text-3xl text-gray-600 mr-4" />
          <div>
            <div className="  text-gray-700 text-bold text-lg uppercase">{uploaderText}</div>
            <div className="text-sm mt-1 "> Drag and drop or click to upload</div>
            {uploading && <progress className="mt-1" value={progressAmt} max="100" />}
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

export default FileUpload;
