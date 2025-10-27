import LoadingModal from './components/loading/ModalLoading';
import React from 'react';

declare let window: any;

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetAppContext: React.FC<SetAppContextProps> = ({ children }) => {
  return <>{children}</>;
};

export default SetAppContext;
