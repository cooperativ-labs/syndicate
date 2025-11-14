import { Button } from '@src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@src/components/ui/sheet';
import React, { FC, ReactNode } from 'react';

type SheetButtonRightProps = {
  children: ReactNode;
  title: string;
  buttonText: string;
  onOpen?: () => void;
  onClose?: () => void;
};

const SheetButtonRight: FC<SheetButtonRightProps> = ({
  children,
  title,
  buttonText,
  onOpen,
  onClose
}) => {
  return (
    <Sheet onOpenChange={open => (open ? onOpen?.() : onClose?.())}>
      <SheetTrigger asChild>
        <Button variant="outline"> {buttonText} </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-2/3 p-3 overflow-y-scroll ">
        <SheetHeader>
          <SheetTitle>{title} </SheetTitle>
        </SheetHeader>

        <div className="mb-5 px-2 pr-4 md:pr-10 md:mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetButtonRight;
