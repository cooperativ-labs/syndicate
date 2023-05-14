import OfferingDescriptionItem from './OfferingDescriptionItem';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import { Offering, OfferingTabSection } from 'types';
import { UPDATE_DESCRIPTION_TEXT } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

type TabDescriptionListProps = {
  offering: Offering;
  tab: OfferingTabSection;
};

const TabDescriptionList: FC<TabDescriptionListProps> = ({ offering, tab }) => {
  const [list, setList] = useState<any>(undefined);
  const [updateDescription, { data: dataUpdate, error: errorUpdate, loading }] = useMutation(UPDATE_DESCRIPTION_TEXT);

  useEffect(() => {
    const descriptions = getDescriptionsByTab(offering, tab);
    setList(descriptions);
  }, [offering, tab]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleChange = async (description, i) => {
    try {
      await updateDescription({
        variables: {
          currentDate: currentDate,
          descriptionId: description.id,
          title: description.title,
          text: description.text,
          section: tab,
          order: i,
        },
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    const newOrder = reorder(list, source.index, destination.index);
    setList(newOrder);
    await Promise.all(
      newOrder.map((description, i) => {
        return handleChange(description, i);
      })
    );
  };

  const orderedList = list?.sort((a, b) => a.order - b.order);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {list && (
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {orderedList.map((description, i) => {
                return (
                  <Draggable key={description.id} index={i} draggableId={description.id}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <OfferingDescriptionItem
                          order={description.order}
                          offering={offering}
                          description={description}
                          tab={description.section}
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
