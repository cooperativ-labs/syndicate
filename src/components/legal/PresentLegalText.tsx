import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface PresentLegalTextProps {
  text: string | undefined | null;
}

const PresentLegalText: FC<PresentLegalTextProps> = ({ text }) => {
  if (!text) return null;
  return (
    <div className='w-full'>
      <hr className='md:hidden border border-gray-400 my-8' />
      <div className='prose prose-slate max-w-none'>
        <ReactMarkdown
          components={{
            h2: ({ children }) => <h2 className='text-lg font-semibold mt-8 mb-4'>{children}</h2>,
            p: ({ children }) => <p className='mb-4'>{children}</p>,
            ul: ({ children }) => <ul className='list-disc pl-6 mb-4'>{children}</ul>,
            li: ({ children }) => <li className='mb-1'>{children}</li>
          }}
        >
          {text as string}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PresentLegalText;
