'use client';

import FileUpload from '@src/components/form-components/FileUpload';
import { Input } from '@src/components/ui/input';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/tabs';
import SectionBlock from '@src/containers/SectionBlock';
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
  const [documentSelected, setDocumentSelected] = useState<boolean>(false);

  const handleUploadSubmit = async (files: File[]) => {
    setButtonState('loading');
    for (const file of files) {
      const offeringUniqueId = offeringId + file.name;
      await uploadOfferingDocument({
        file,
        offeringId,
        entityId,
        title: file.name,
        offeringUniqueId
      });
    }
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

  const LinkDocumentForm = ({ format }: { format: DocumentFormatType }) => (
    <form className='flex flex-col items-center'>
      <div className='w-full mb-2'>
        <Input
          {...register('title', { required: 'Please title this document.' })}
          className='bg-opacity-0'
          placeholder='Title'
        />
        {errors.title && <div className='text-sm text-red-500 mt-1'>{errors.title.message}</div>}
      </div>
      <div className='w-full mb-2'>
        <Input
          {...register('docUrl', { required: 'URL is required.' })}
          className='bg-opacity-0'
          placeholder='URL'
        />
        {errors.docUrl && <div className='text-sm text-red-500 mt-1'>{errors.docUrl.message}</div>}
      </div>

      <LoadingButton
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className='w-full'
        variant='outline'
        text={`Link ${getDocFormatOption(format)?.name}`}
        loadingText={`Linking ...`}
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
    </form>
  );

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
            uploaderText='Add Document'
            onSubmit={handleUploadSubmit}
            setIsSelected={setDocumentSelected}
          />
          {!documentSelected && (
            <Tabs
              value={fileFormat}
              onValueChange={value => setFileFormat(value as DocumentFormatType)}
              className='mt-4'
            >
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value={DocumentFormat.VIDEO}>Video</TabsTrigger>
                <TabsTrigger value={DocumentFormat.POWERPOINT}>Presentation</TabsTrigger>
                <TabsTrigger value={DocumentFormat.OTHER}>Link</TabsTrigger>
              </TabsList>
              <TabsContent value={DocumentFormat.VIDEO}>
                <LinkDocumentForm format={DocumentFormat.VIDEO} />
              </TabsContent>
              <TabsContent value={DocumentFormat.POWERPOINT}>
                <LinkDocumentForm format={DocumentFormat.POWERPOINT} />
              </TabsContent>
              <TabsContent value={DocumentFormat.OTHER}>
                <LinkDocumentForm format={DocumentFormat.OTHER} />
              </TabsContent>
            </Tabs>
          )}
        </SectionBlock>
      </div>
    </div>
  );
};

export default DocumentAdder;
