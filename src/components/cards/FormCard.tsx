import Card, { CardProps } from './Card';
import cn from 'classnames';
import React from 'react';

type FormCardProps = CardProps & { small?: boolean; maxWidth?: boolean };

const FormCard: React.FC<FormCardProps> = ({ children, center, maxWidth, small }) => {
  return (
    <Card
      className={cn(
        center && 'mx-auto',
        !maxWidth && 'max-w-2xl',
        small ? 'pt-6 md:p-6' : 'pt-8 p-4 md:p-8',
        'min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 shadow-none md:shadow-xl'
      )}
    >
      {children}
    </Card>
  );
};
export default FormCard;
