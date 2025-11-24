'use client';

import FileUpload from '@src/components/form-components/FileUpload';
import { Input } from '@src/components/ui/input';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import SectionBlock from '@src/containers/SectionBlock';
import { cn } from '@src/lib/utils';
import { uploadOfferingDocument } from '@src/utils/actions/documentActions';
import { linkOfferingDocument } from '@src/utils/actions/documentActions';
import { getDocFormatOption } from '@src/utils/enumConverters';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { DocumentFormat, DocumentFormatType } from '@/types';

type DocumentAdderProps = {
  offeringId: string;
  entityId: string;
};

const DocumentAdder: FC<DocumentAdderProps> = ({ offeringId, entityId }) => {
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');
  const [fileFormat, setFileFormat] = useState<DocumentFormatType | undefined>();

  const handleUploadSubmit = async (file: File) => {
    setButtonState('loading');
    const offeringUniqueId = offeringId + file.name;
    await uploadOfferingDocument({
      file,
      offeringId,
      entityId,
      title: '',
      offeringUniqueId
    });
    setButtonState('success');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ title: string; docUrl: string }>({
    defaultValues: {
      title: '',
      docUrl: ''
    }
  });

  const onSubmit = async (data: { title: string; docUrl: string }) => {
    setButtonState('loading');
    const offeringUniqueId = offeringId + data.title;
    try {
      await linkOfferingDocument({
        offeringId,
        entityId,
        title: data.title,
        format: fileFormat as DocumentFormatType,
        docUrl: data.docUrl,
        offeringUniqueId: offeringUniqueId
      });
      setButtonState('success');
    } catch (err: any) {
      toast.error(err.message);
      setButtonState('error');
    }
  };

  return (
    <div className='col-span-2'>
      <div className='mt-4 border-2 rounded-md px-2'>
        <SectionBlock
          className='font-bold'
          sectionTitle={'Attach links and documents'}
          mini
          asAccordion
        >
          <hr className='mt-1 mb-2' />
          <FileUpload
            uploaderText='Add Offering Document'
            onSubmit={handleUploadSubmit}
            accept={[
              'pdf',
              'doc',
              'docx',
              'xml',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'md'
            ]}
          />
          <div className='grid grid-cols-3 gap-3 mb-2'>
            <div
              className={cn(
                fileFormat === DocumentFormat.VIDEO && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.VIDEO)}
            >
              Video
            </div>
            <div
              className={cn(
                fileFormat === DocumentFormat.POWERPOINT && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.POWERPOINT)}
            >
              Presentation
            </div>
            <div
              className={cn(
                fileFormat === DocumentFormat.OTHER && 'bg-gray-600 text-white',
                'mt-4 text-sm font-semibold hover:cursor-pointer flex items-center justify-center border-2  p-1'
              )}
              onClick={() => setFileFormat(DocumentFormat.OTHER)}
            >
              Link
            </div>
          </div>
          {fileFormat !== undefined && (
            <form className='flex flex-col items-center'>
              <div className='w-full mb-2'>
                <Input
                  {...register('title', { required: 'Please title this document.' })}
                  className='bg-opacity-0'
                  placeholder='Title'
                />
                {errors.title && (
                  <div className='text-sm text-red-500 mt-1'>{errors.title.message}</div>
                )}
              </div>
              <div className='w-full mb-2'>
                <Input
                  {...register('docUrl', { required: 'URL is required.' })}
                  className='bg-opacity-0'
                  placeholder='URL'
                />
                {errors.docUrl && (
                  <div className='text-sm text-red-500 mt-1'>{errors.docUrl.message}</div>
                )}
              </div>

              <LoadingButton
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className='mb-2 bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase px-2 h-11 rounded w-full'
                text={`Link ${getDocFormatOption(fileFormat)?.name}`}
                loadingText={`Linking ...`}
                buttonState={buttonState}
                setButtonState={setButtonState}
              />
            </form>
          )}
        </SectionBlock>
      </div>
    </div>
  );
};

export default DocumentAdder;
