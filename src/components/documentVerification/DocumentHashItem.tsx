import { Document, Maybe } from '@gql/graphql';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { Check, Copy } from 'lucide-react';
import React, { FC, useState } from 'react';

import StandardButton from '../buttons/StandardButton';

type HashInstructionsProps = {
  agreementTexts: Document[];
  contractDocuments: string[];
  shareContractId: string;
};

type DocumentHashItemProps = {
  hash: string;
  text: Maybe<string> | undefined;
};

const DocumentHashItem: FC<DocumentHashItemProps> = ({ hash, text }) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div>
      <StandardButton
        className="mt-1 mb-4"
        outlined
        link=""
        color="blue"
        text="Download Agreement"
        onClick={() => text && DownloadFile(text, 'agreement-text.md')}
      />
      <span className="mb-1 mr-2">{`Agreement Hash: ${hash.slice(0, 7)}...${hash.slice(-7)}`}</span>

      <span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(hash[0]);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          {copied ? <Check /> : <Copy />}
        </button>
      </span>
    </div>
  );
};

export default DocumentHashItem;
