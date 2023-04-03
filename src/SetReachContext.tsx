import React, { useEffect, useState } from 'react';
import { GetAlgoConnector } from './web3/connectors';
import { useAsyncFn } from 'react-use';
import { WalletErrorCodes } from './web3/helpersChain';

declare let window: any;

export const ReachContext = React.createContext<{
  reachLib: any;
  userWalletAddress: string | undefined;
  reachAcc: any | undefined;
  reFetchWallet: (string) => Promise<any>;
}>({
  reachLib: undefined,
  userWalletAddress: undefined,
  reachAcc: undefined,
  reFetchWallet: undefined,
});

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetReachContext: React.FC<SetAppContextProps> = ({ children }) => {
  const [userWalletAddress, setUserWalletAddress] = useState(undefined);
  const [currentReachLib, setCurrentReachLib] = useState(undefined);
  const [reachAcc, setReachAcc] = useState(undefined);

  const providerEnv = 'TestNet';

  const [, connectWallet] = useAsyncFn(
    async (selectedConnector) => {
      if (selectedConnector !== 'disconnect') {
        try {
          const reachLib = await GetAlgoConnector(selectedConnector, providerEnv);
          setCurrentReachLib(reachLib);
          const acc = await reachLib.getDefaultAccount();
          setReachAcc(acc);
          const contractUserPubKey = acc.getAddress();
          const normalizeRecipientAddress = reachLib.formatAddress(contractUserPubKey); // make sure address, not PubKey
          setUserWalletAddress(normalizeRecipientAddress);
        } catch (error) {
          return error;
        }
      }
    },
    [GetAlgoConnector]
  );

  const reFetchWallet = async (selectedConnector) => {
    if (selectedConnector === 'disconnect') {
      setCurrentReachLib(undefined);
      setUserWalletAddress(undefined);
    }
    connectWallet(selectedConnector);
  };

  useEffect(() => {
    const selection = window.sessionStorage?.getItem('CHOSEN_CONNECTOR');
    connectWallet(selection).catch((err) => {
      alert(WalletErrorCodes(err));
    });
  }, [connectWallet]);

  return (
    <ReachContext.Provider
      value={{
        reachLib: currentReachLib,
        userWalletAddress: userWalletAddress,
        reachAcc: reachAcc,
        reFetchWallet: reFetchWallet,
      }}
    >
      {children}
    </ReachContext.Provider>
  );
};

export default SetReachContext;
