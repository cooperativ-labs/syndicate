import DocumentAdder from './DocumentAdder';
import DocumentListItem from './DocumentListItem';
import React, { FC, useContext, useState } from 'react';
import { ADD_OFFERING_DOCUMENT } from '@src/utils/dGraphQueries/document';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Document, DocumentFormat, DocumentType } from 'types';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';

type DocumentListProps = {
  documents: Document[];
  isOfferingOwner: boolean;
  offeringId?: string;
  ownerEntityId?: string;
  hideUpload?: boolean;
};

const DocumentList: FC<DocumentListProps> = ({ documents, isOfferingOwner, offeringId, hideUpload, ownerEntityId }) => {
  const { data: session, status } = useSession();

  const [addFile, { data, error, loading }] = useMutation(ADD_OFFERING_DOCUMENT);
  const [alerted, setAlerted] = useState<boolean>(false);

  const offeringDocs = documents;

  if (error && !alerted) {
    alert(error.message);
    setAlerted(true);
  }

  return (
    <div className="col-span-2">
      <div className="flex flex-wrap">
        {offeringDocs.map((document, i) => (
          <DocumentListItem key={i} document={document} offeringId={offeringId} deleteButton={isOfferingOwner} />
        ))}
      </div>

      {/* </div> */}
      {!hideUpload && isOfferingOwner && !!offeringId && !!ownerEntityId && (
        //SElECT FILE TYPE
        <DocumentAdder offeringId={offeringId} ownerEntityId={ownerEntityId} />
      )}
    </div>
  );
};

export default DocumentList;
