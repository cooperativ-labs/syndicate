import React, { FC } from 'react';

import DocumentHashItem from './DocumentHashItem';
import { Document, Maybe } from 'types';
import { getHashTextPairs, String0x } from '@src/web3/helpersChain';
import { shareContractABI } from '@src/web3/generated';
import { useContractReads } from 'wagmi';

type HashInstructionsProps = {
  agreementTexts: Maybe<Document>[] | undefined;
  contractDocuments: string[];
  shareContractAddress: string;
};

const HashInstructions: FC<HashInstructionsProps> = ({ agreementTexts, contractDocuments, shareContractAddress }) => {
  const chainDocs = contractDocuments.map((doc) => {
    return {
      address: shareContractAddress as String0x,
      abi: shareContractABI,
      functionName: 'getDocument',
      args: [doc],
    };
  });

  const { data, isError, isLoading } = useContractReads({
    contracts: chainDocs,
  });

  const hashTextArray = data && agreementTexts && getHashTextPairs(data, agreementTexts);

  return (
    <div className="p-3 border-2 border-cLightBlue bg-gray-100 rounded-md">
      {hashTextArray?.map((doc, i) => {
        return <DocumentHashItem key={i} hash={doc.hash} text={doc.text} />;
      })}
      <div className="text-sm text-gray-700 mt-2">
        The agreement hash lets you verify that the agreement text is exactly the text associated with this class of
        shares.
      </div>
      <div className="text-sm font-bold">
        Download the agreement text above,{' '}
        <a href="https://emn178.github.io/online-tools/keccak_256_checksum.html" target="_blank" rel="noreferrer">
          <span className="underline">then upload it here to check the hash</span>
        </a>
        .
      </div>
    </div>
  );
};

export default HashInstructions;
