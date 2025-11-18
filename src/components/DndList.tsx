import React, { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export function Draggable({
  children,
  draggableId,
  className
}: {
  children: React.ReactElement;
  draggableId: string | number;
  className?: string;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({
    id: draggableId
  });

  const style: CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : `translate(0px, 0px)`,
    transition: transition || 'all 0.2s ease-in-out',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    boxShadow: isDragging
      ? '0px 4px 10px 0px rgb(0 0 0 / 0.1), 0px 0px 5px 0px rgb(0 0 0 / 0.25)'
      : 'none',
    position: 'relative'
  };

  return (
    <div
      className={className}
      data-slot="draggable-row"
      key={draggableId}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
