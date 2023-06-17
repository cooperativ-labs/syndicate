import Button from '@src/components/buttons/Button';
import cn from 'classnames';
import FileUpload from '@src/components/form-components/FileUpload';
import Input from '@src/components/form-components/Inputs';
import React, { FC, useContext, useState } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import { ADD_OFFERING_DOCUMENT } from '@src/utils/dGraphQueries/document';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DocumentFormat, DocumentType } from 'types';
import { Form, Formik } from 'formik';
import { getDocFormatOption } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';

type DocumentAdderProps = {
  offeringId?: string;
  entityId?: string;
};

const DocumentAdder: FC<DocumentAdderProps> = ({ offeringId, entityId }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [addFile, { data, error, loading }] = useMutation(ADD_OFFERING_DOCUMENT);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [fileFormat, setFileFormat] = useState<DocumentFormat | undefined>();

  if (error && !alerted) {
    alert(error.message);
    setAlerted(true);
  }

  const addFileToDB = (
    url: string,
    fileId: string,
    title: string,
    docType: DocumentType | undefined,
    format: DocumentFormat | undefined
  ) => {
    addFile({
      variables: {
        offeringId: offeringId,
        entityId: entityId,
        currentDate: currentDate,
        title: title,
        docUrl: url,
        fileId: fileId,
        docType: docType,
        format: format,
        offeringUniqueId: offeringId + title,
      },
    });
  };

  return (
    <div className="col-span-2">
      <div className="mt-4 border-2 rounded-md px-2">
        <SectionBlock className="font-bold" sectionTitle={'Attach links and documents'} mini asAccordion>
          <hr className="mt-1 mb-2" />
          <FileUpload
            uploaderText="Add Offering Document"
            baseUploadUrl={`/offerings/${offeringId}/docs/${userId}/`}
            urlToDatabase={addFileToDB}
            docType={DocumentType.OfferingDocument}
            accept={[
              'pdf',
              'doc',
              'docx',
              'xml',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'md',
            ]}
          />
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div
              className={cn(
                fileFormat === DocumentFormat.Video && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.Video)}
            >
              Video
            </div>
            <div
              className={cn(
                fileFormat === DocumentFormat.Powerpoint && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.Powerpoint)}
            >
              Presentation
            </div>
            <div
              className={cn(
                fileFormat === DocumentFormat.Other && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.Other)}
            >
              Link
            </div>
          </div>
          {fileFormat !== null && (
            <Formik
              initialValues={{
                title: '',
                docUrl: '',
                format: fileFormat,
              }}
              validate={(values) => {
                const errors: any = {}; /** @TODO : Shape */
                if (!values.title) {
                  errors.title = 'Please title this document.';
                }
                if (!values.docUrl) {
                  errors.docUrl = 'URL is required.';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setAlerted(false);
                setSubmitting(true);
                addFileToDB(values.docUrl, 'external', values.title, DocumentType.OfferingDocument, fileFormat);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col items-center">
                  <Input className={' bg-opacity-0'} required name="title" placeholder="Title" />
                  <Input className={' bg-opacity-0'} required name="docUrl" placeholder="URL" />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-2 bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase px-2 h-11 rounded w-full"
                  >
                    {`Link ${getDocFormatOption(fileFormat)?.name}`}
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </SectionBlock>
      </div>
    </div>
  );
};

export default DocumentAdder;
