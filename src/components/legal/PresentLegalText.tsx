import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface PresentLegalTextProps {
  text: string | undefined | null;
}

const PresentLegalText: FC<PresentLegalTextProps> = ({ text }) => {
  if (!text) return null;
  return (
    <div className="w-full">
      <hr className="md:hidden border border-gray-400 my-8" />
      <div className="prose text-sm md:text-base break-all md:break-normal">
        <ReactMarkdown>{text as string}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PresentLegalText;
