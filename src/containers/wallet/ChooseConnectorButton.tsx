import { useWalletContext } from '@contexts/WalletContext';
import { Button } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';
import { FC } from 'react';

// const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

type ChooseConnectorButtonProps = {
  buttonText: string;
  large?: boolean;
};

const ChooseConnectorButton: FC<ChooseConnectorButtonProps> = ({ buttonText, large }) => {
  const { setModalOpen } = useWalletContext();
  return (
    <Button
      variant='outline'
      className={cn(
        large ? 'p-2 px-4' : 'text-xs p-1 px-3',
        'font-semibold rounded-full relative  w-full'
      )}
      onClick={e => {
        e.preventDefault();
        setModalOpen(true);
      }}
    >
      {buttonText}
    </Button>
  );
};

export default ChooseConnectorButton;
