'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

const WalletContext = createContext<
  { modalOpen: boolean; setModalOpen: (modalOpen: boolean) => void } | undefined
>(undefined);

function WalletContextProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <WalletContext.Provider value={{ modalOpen, setModalOpen }}>{children}</WalletContext.Provider>
  );
}

export default WalletContextProvider;

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletContextProvider');
  }
  return context;
}
