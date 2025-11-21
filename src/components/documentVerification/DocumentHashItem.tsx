import { DownloadFile } from '@src/utils/helpersAgreement';
import { Check, Copy } from 'lucide-react';
import React, { FC, useState } from 'react';

import { Button } from '../ui/button';

type DocumentHashItemProps = {
  hash: string;
  text: string | undefined;
};

const DocumentHashItem: FC<DocumentHashItemProps> = ({ hash, text }) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div>
      <Button
        className="mt-1 mb-4"
        variant="outline"
        onClick={() => text && DownloadFile(text, 'agreement-text.md')}
      >
        Download Agreement
      </Button>
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
