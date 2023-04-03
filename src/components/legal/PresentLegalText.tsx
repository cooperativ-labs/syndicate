import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
interface PresentLegalTextProps {
  text: string;
}

const PresentLegalText: FC<PresentLegalTextProps> = ({ text }) => {
  return (
    <div className="w-full">
      <hr className="md:hidden border-1 border-gray-400 my-8" />
      <div className="prose text-sm md:text-base break-all md:break-normal">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PresentLegalText;
