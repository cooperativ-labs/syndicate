import { Draggable } from '@src/components/DndList';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@src/components/ui/accordion';
import { Button } from '@src/components/ui/button';
import { deleteDescriptionText } from '@src/utils/actions/offeringProfileActions';
import { Menu, Pencil, X } from 'lucide-react';
import React, { FC, useState } from 'react';

import { OfferingDescriptionText, OfferingFull, OfferingTabSectionTypes } from '@/types';

import OfferingProfileDescriptionForm from './OfferingProfileDescriptionForm';

type OfferingDescriptionItemProps = {
  offering: OfferingFull;
  description: OfferingDescriptionText;
  tab: OfferingTabSectionTypes | undefined;
};
const OfferingDescriptionItem: FC<OfferingDescriptionItemProps> = ({
  offering,
  description,
  tab
}) => {
  return (
    <Draggable
      draggableId={description.id}
      className="border-2 bg-white border-gray-200 rounded-lg shadow-sm "
    >
      <AccordionItem value={description.id}>
        <>
          <AccordionTrigger className="px-4 w-full hover:no-underline hover:cursor-pointer">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="font-medium text-lg"> {description?.title} </div>
              </div>

              <div
                className={`focus:outline-none pr-2 rounded-full font-semibold text-lg text-gray-700`}
                aria-label={'drag to reorder section'}
              >
                <div className="p-1">
                  <Menu size={16} />
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 p-4 pt-0 rounded-lg ">
            <OfferingProfileDescriptionForm
              offering={offering}
              description={description}
              tab={tab}
            />
            <Button
              onClick={() =>
                deleteDescriptionText({
                  descriptionId: description?.id,
                  revalidationPath: {
                    path: `/[organizationId]/offerings/${offering.id}`,
                    type: 'layout'
                  }
                })
              }
              className="p-3 border-2 border-red-800 rounded-md w-full text-red-800 font-bold uppercase"
              variant="outline"
            >
              Delete Description
            </Button>
          </AccordionContent>
        </>
      </AccordionItem>
    </Draggable>
  );
};

export default OfferingDescriptionItem;
