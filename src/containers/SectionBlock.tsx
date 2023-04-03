import cn from 'classnames';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SectionBlockProps {
  sectionTitle: string;
  children: React.ReactNode;
  className?: string;
  startOpen?: boolean;
  mini?: boolean;
  asAccordion?: boolean;
}

const SectionBlock: React.FC<SectionBlockProps> = ({
  sectionTitle,
  children,
  className,
  startOpen,
  mini,
  asAccordion,
}) => {
  const [detailsShown, setDetailsShown] = useState(startOpen);
  const handleDetailsReveal = () => {
    setDetailsShown(!detailsShown);
  };
  return (
    <div className="">
      <button
        className={cn(
          className,
          mini ? 'text-sm text-grey-600' : 'text-xl font-bold py-4 mb-2',
          asAccordion && 'w-full flex justify-between items-center',
          'h-8  min-w-max flex items-center rounded outline-none'
        )}
        onClick={handleDetailsReveal}
      >
        <h2 className={cn(mini ? 'text-sm text-grey-600' : 'text-xl font-bold text-gray-800')}>{sectionTitle}</h2>
        <div className="ml-2">
          {detailsShown ? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}
        </div>
      </button>
      {detailsShown && <div>{children}</div>}
    </div>
  );
};

export default SectionBlock;
