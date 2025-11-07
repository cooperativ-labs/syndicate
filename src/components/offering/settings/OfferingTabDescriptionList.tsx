import { updateDescriptionText } from '@src/utils/actions/offeringActions';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import React, { FC, useEffect, useState } from 'react';
// @ts-expect-error - react-beautiful-dnd types can mismatch our generics here
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';

import { Offering, OfferingDescriptionText, offeringTabSectionTypes } from '@/types';

import OfferingDescriptionItem from './OfferingDescriptionItem';

type TabDescriptionListProps = {
  offering: Offering;
  tab: offeringTabSectionTypes;
};

const TabDescriptionList: FC<TabDescriptionListProps> = ({ offering, tab }) => {
  const [list, setList] = useState<ArrayLike<OfferingDescriptionText | undefined>>([]);

  useEffect(() => {
    const descriptions = getDescriptionsByTab(offering, tab);
    setList(descriptions);
  }, [offering, tab]);

  const reorder = (
    list: ArrayLike<OfferingDescriptionText | undefined>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleChange = async (description: OfferingDescriptionText, i: number) => {
    try {
      await updateDescriptionText({
        descriptionId: description.id,
        title: description.title,
        text: description.text,
        section: tab,
        order: i
      });
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  const handleDragEnd = async ({ destination, source }: { destination: any; source: any }) => {
    if (!destination) return;
    const newOrder = reorder(list, source.index, destination.index);
    setList(newOrder);
    await Promise.all(
      newOrder.map((description: any, i: number) => {
        return handleChange(description, i);
      })
    );
  };

  // @ts-expect-error - list is ArrayLike<Maybe<OfferingDescriptionText>>; sort uses any
  const orderedList = list?.sort((a: any, b: any) => a.order - b.order);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {list && (
        <Droppable droppableId="droppable">
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {orderedList.map((description: OfferingDescriptionText, i: number) => {
                return (
                  <Draggable key={description.id} index={i} draggableId={description.id}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <OfferingDescriptionItem
                          order={description.order}
                          offering={offering}
                          description={description}
                          tab={description.section as offeringTabSectionTypes}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default TabDescriptionList;
