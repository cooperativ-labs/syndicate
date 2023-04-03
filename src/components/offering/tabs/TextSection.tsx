import React, { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const contentSectionHeader = 'font-medium text-lg mb-4 border-b-2 border-gray-300 w-3/4 ';

type TextSectionProps = {
  title: string;
  text: string;
};

const TextSection: FC<TextSectionProps> = ({ title, text }) => {
  return (
    <div className="my-10 first:mt-0">
      <h1 className={contentSectionHeader}>{title}</h1>
      <div className="prose text-sm md:text-base break-normal">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TextSection;
