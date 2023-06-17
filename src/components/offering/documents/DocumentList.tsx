import DocumentAdder from './DocumentAdder';
import DocumentListItem from './DocumentListItem';
import React, { FC } from 'react';
import { Document, Maybe } from 'types';

type DocumentListProps = {
  documents: Maybe<Document>[] | null | undefined;
  isOfferingManager: boolean;
  offeringId?: string;
  entityId?: string | undefined | null;
  hideUpload?: boolean;
};

const DocumentList: FC<DocumentListProps> = ({ documents, isOfferingManager, offeringId, hideUpload, entityId }) => {
  return (
    <div className="col-span-2">
      <div className="flex flex-wrap">
        {documents?.map((document, i) => (
          <DocumentListItem key={i} document={document} offeringId={offeringId} deleteButton={isOfferingManager} />
        ))}
      </div>

      {/* </div> */}
      {!hideUpload && isOfferingManager && !!offeringId && !!entityId && (
        //SElECT FILE TYPE
        <DocumentAdder offeringId={offeringId} entityId={entityId} />
      )}
    </div>
  );
};

export default DocumentList;
