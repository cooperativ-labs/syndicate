import cn from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RoundedImageProps {
  src: string;
  className?: string;
  onClick?: () => void;
}

const RoundedImage: React.FunctionComponent<RoundedImageProps> = ({ src, className, onClick }) => {
  return (
    <div
      data-test="component-rounded-image"
      className={cn(
        className,
        !!onClick && 'hover:cursor-pointer relative',
        'flex rounded-full overflow-hidden items-center backdrop-opacity-10'
      )}
      onClick={onClick}
    >
      <img src={src} className="h-full absolute" />
      {!!onClick && (
        <div className="flex backdrop-opacity-10 hover:backdrop-invert w-full h-full text-white hover:bg-gray-800/50 items-center justify-center opacity-0 hover:opacity-100">
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </div>
  );
};

export default RoundedImage;
