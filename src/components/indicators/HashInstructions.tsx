import React, { FC, useContext, useState } from 'react';
import StandardButton from '../buttons/StandardButton';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { ReachContext } from '@src/SetReachContext';

type HashInstructionsProps = {
  hashes: any;
  agreementText: string;
};

const HashInstructions: FC<HashInstructionsProps> = ({ hashes, agreementText }) => {
  // const { reachLib } = useContext(ReachContext);
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className="p-3 border-2 border-cLightBlue bg-gray-100 rounded-md">
      <StandardButton
        className="mt-1 mb-4"
        outlined
        link=""
        color="blue"
        text="Download Agreement Text"
        onClick={() => DownloadFile(agreementText, 'agreement-text.md')}
      />
      {hashes.map((hash, i) => {
        return (
          <div key={i}>
            <span className="mb-1 mr-2">
              {/* why isn't negative slice working? */}
              {`Agreement Hash: ${hash[0].slice(0, 7)}...${hash[0].slice(58)}`}
            </span>

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
                {copied ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="copy" />}
              </button>
            </span>
          </div>
        );
      })}
      <div className="text-sm text-gray-700 mt-2">
        The agreement hash lets you verify that the agreement text is exactly the text associated with this class of
        shares.
      </div>
      <div className="text-sm font-bold">
        Download the agreement text above,{' '}
        <a href="https://emn178.github.io/online-tools/sha256_checksum.html" target="_blank" rel="noreferrer">
          <span className="underline">then upload it here to check the hash</span>
        </a>
        .
      </div>
    </div>
  );
};

export default HashInstructions;
