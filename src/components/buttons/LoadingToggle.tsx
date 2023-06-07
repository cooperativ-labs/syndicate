import cn from 'classnames';
import React, { FC } from 'react';

type LoadingToggleProps = {
  toggleSubject: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const LoadingToggle: FC<LoadingToggleProps> = ({ toggleSubject, isLoading, onClick }) => {
  return (
    <button
      className=" border-2 border-grey-100 shadow-inner rounded-full w-12 bg-white "
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {isLoading ? (
        <img
          src="/assets/images/loading-circle.jpeg"
          aria-label="loading"
          className="h-6 mr-1 animate-spin bg-white rounded-full"
        />
      ) : (
        <div className={cn([toggleSubject ? ' ml-5 bg-emerald-600' : 'bg-gray-400'], 'h-6 w-6 rounded-full ')} />
      )}
    </button>
  );
};

export default LoadingToggle;
