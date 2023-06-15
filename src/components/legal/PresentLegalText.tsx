import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Maybe } from 'types';
interface PresentLegalTextProps {
  text: Maybe<string> | undefined;
}

const PresentLegalText: FC<PresentLegalTextProps> = ({ text }) => {
  return (
    <div className="w-full">
      <hr className="md:hidden border-1 border-gray-400 my-8" />
      <div className="prose text-sm md:text-base break-all md:break-normal">
        <ReactMarkdown>{text as string}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PresentLegalText;
