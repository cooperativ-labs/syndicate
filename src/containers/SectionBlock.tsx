'use client';

import { cn } from '@src/lib/utils';
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@src/components/ui/accordion';

interface SectionBlockProps {
  sectionTitle: string | Maybe<string> | undefined;
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
  asAccordion
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={startOpen ? 'item' : undefined}
      className={className}
    >
      <AccordionItem value="item" className="border-none">
        <AccordionTrigger
          className={cn(
            mini ? 'text-sm text-grey-600' : 'text-xl font-bold',
            asAccordion && 'w-full',
            'h-8 min-w-max rounded outline-none hover:no-underline'
          )}
        >
          <h2 className={cn(mini ? 'text-sm text-grey-600' : 'text-xl font-bold text-gray-800')}>
            {sectionTitle}
          </h2>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SectionBlock;
