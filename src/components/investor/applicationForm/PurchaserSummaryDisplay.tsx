import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

type PurchaserSummaryDisplayProps = {
  summary: string;
  suitabilityAttestation: string;
  qualificationsPresent: boolean;
};

const PurchaserSummaryDisplay: FC<PurchaserSummaryDisplayProps> = ({
  summary,
  suitabilityAttestation,
  qualificationsPresent,
}) => {
  return (
    <div className="flex flex-col">
      <div className="prose text-sm md:text-base break-all md:break-normal">
        <div className="rounded-lg bg-gray-50 px-6 py-3 mb-3">
          <ReactMarkdown>{summary}</ReactMarkdown>{' '}
        </div>
        {qualificationsPresent && (
          <div className="rounded-lg bg-gray-50 px-6 py-3 mb-3">
            <ReactMarkdown>{suitabilityAttestation}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaserSummaryDisplay;
