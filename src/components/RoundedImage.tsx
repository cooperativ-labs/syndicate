import { cn } from '@src/lib/utils';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export interface RoundedImageProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  alt?: string;
  onClick?: () => void;
}

const RoundedImage: React.FunctionComponent<RoundedImageProps> = ({
  src,
  className,
  onClick,
  width,
  height,
  fill = true,
  alt
}) => {
  return (
    <div
      data-test='component-rounded-image'
      className={cn(
        className,
        !!onClick && 'hover:cursor-pointer relative',
        'flex rounded-full overflow-hidden items-center backdrop-opacity-10'
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        className='h-full absolute'
        fill={fill}
        alt={alt || 'image'}
        width={width}
        height={height}
        objectPosition='center'
        unoptimized={process.env.NODE_ENV === 'development'}
      />
      {!!onClick && (
        <div className='flex backdrop-opacity-10 hover:backdrop-invert w-full h-full text-white hover:bg-gray-800/50 items-center justify-center opacity-0 hover:opacity-100'>
          <Pencil size={16} />
        </div>
      )}
    </div>
  );
};

export default RoundedImage;
