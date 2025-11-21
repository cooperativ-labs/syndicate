import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Accordion } from '@src/components/ui/accordion';
import { updateDescriptionText } from '@src/utils/actions/offeringProfileActions';
import { getDescriptionsByTab } from '@src/utils/helpersOffering';
import React, { FC, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { OfferingDescriptionText, OfferingFull, OfferingTabSectionTypes } from '@/types';

import OfferingDescriptionItem from './OfferingDescriptionItem';

type TabDescriptionListProps = {
  offering: OfferingFull;
  tab: OfferingTabSectionTypes;
};

export default function TabDescriptionList({ offering, tab }: TabDescriptionListProps) {
  const [list, setList] = useState<OfferingDescriptionText[]>([]);
  const listIds = useMemo<UniqueIdentifier[]>(
    () => list?.map(description => description.id),
    [list]
  );

  useEffect(() => {
    const descriptions = getDescriptionsByTab(offering, tab);
    const normalizedList = Array.from(descriptions ?? []) as (
      | OfferingDescriptionText
      | undefined
    )[];
    const orderedList = normalizedList
      .filter((description): description is OfferingDescriptionText => Boolean(description))
      .sort((a: any, b: any) => a.order - b.order);
    setList(orderedList);
  }, [offering, tab]);

  const reorder = (list: OfferingDescriptionText[], startIndex: number, endIndex: number) => {
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
        order: i,
        revalidationPath: {
          path: `/[organizationId]/offerings/${offering.id}`,
          type: 'layout'
        }
      });
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = listIds.indexOf(active.id);
      const newIndex = listIds.indexOf(over.id);
      const newOrder = reorder(list, oldIndex, newIndex);
      setList(newOrder);
      await Promise.all(
        newOrder.map((description: any, i: number) => {
          return handleChange(description, i);
        })
      );
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={onDragEnd}
      sensors={sensors}
      id="task-table"
    >
      {list && (
        <SortableContext items={listIds} strategy={verticalListSortingStrategy}>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {list.map((description: OfferingDescriptionText, i: number) => {
              return (
                <OfferingDescriptionItem
                  offering={offering}
                  description={description}
                  tab={description.section as OfferingTabSectionTypes}
                />
              );
            })}
          </Accordion>
        </SortableContext>
      )}
    </DndContext>
  );
}
