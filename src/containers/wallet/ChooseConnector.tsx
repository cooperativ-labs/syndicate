import { Button } from '@src/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from '@src/components/ui/item';
import { cn } from '@src/lib/utils';
import { WalletErrorCodes } from '@src/web3/helpersChain';
import { ChevronRightIcon } from 'lucide-react';
import React, { FC, useContext } from 'react';
import { Connector, useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

import { ApplicationStoreProps, store } from '@/contexts/store';

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map(connector => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({ connector, onClick }: { connector: Connector; onClick: () => void }) {
  const [ready, setReady] = React.useState(false);
  console.log(connector, ready);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Item onClick={onClick} variant="outline" className="cursor-pointer hover:shadow-md">
      <ItemContent>
        <ItemTitle>{connector.name}</ItemTitle>
        {/* <ItemDescription>{connector.description}</ItemDescription> */}
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon />
      </ItemActions>
    </Item>
  );
}

//========================

// type ConnectorProps = {
//   index: number;
//   connector: {
//     id: string;
//     name: string;
//     logo: string;
//     isSquare?: boolean;
//     experimental?: boolean;
//     description: string;
//   };
//   length: number;
// };

// const Connector: FC<ConnectorProps> = ({ index, connector, length }) => {
//   return (
//     <div
//       key={index}
//       className={cn(index < length - 1 && 'border-b-2', 'px-8 py-4 border-gray-200')}
//     >
//       <div className="grid grid-cols-10 gap-4">
//         <div className="col-span-2">
//           <div
//             className={cn(
//               connector.isSquare ? 'h-12 w-12' : 'h-14 w-14',
//               'flex overflow-hidden items-center '
//             )}
//           >
//             <img src={connector.logo} className="min-w-full" />
//           </div>
//         </div>
//         <div className="col-span-7 p-2 flex flex-col items-start justify-center">
//           <div className="text font-semibold align-start">{connector.name}</div>
//           {connector.experimental ? (
//             <div className="text-xs text-red-500 font-medium">EXPERIMENTAL</div>
//           ) : (
//             <div className="text-xs text-gray-500 font-medium align-start">
//               {connector.description}
//             </div>
//           )}
//         </div>
//         <div className="col-span-1 self-center text-gray-400 text-sm">
//           <FontAwesomeIcon icon="arrow-right" />
//         </div>
//       </div>
//     </div>
//   );
// };

// type WalletChoicesProps = {
//   dispatchWalletModal: (action: { type: string; payload?: any }) => void;
// };

// const EthChoices: FC<WalletChoicesProps> = ({ dispatchWalletModal }) => {
//   const { connect, error } = useConnect();

//   return (
//     <>
//       {SupportedEthConnectors.map((supportedConnector, i) => {
//         // This MUST be called "connector". Other variables will not work.
//         const connector = supportedConnector.connector;
//         return (
//           <Button
//             key={i}
//             disabled={!connector.ready}
//             className="w-full"
//             onClick={() => {
//               window?.sessionStorage.setItem('CHOSEN_CONNECTOR', supportedConnector.id);
//               connect({ connector });
//               error && alert(WalletErrorCodes(error));
//               dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
//             }}
//           >
//             <Connector
//               index={i}
//               connector={supportedConnector}
//               length={SupportedEthConnectors.length}
//             />
//           </Button>
//         );
//       })}

//       <h2 className="text-lg font-medium text-center text-gray-600 my-6">
//         <span>{`Don't have a wallet?`}</span>{' '}
//         <span className="underline">
//           <a href="https://metamask.io/" target="_blank" rel="noreferrer">
//             Download Here
//           </a>
//         </span>
//       </h2>
//     </>
//   );
// };

// const AlgoChoices: FC<WalletChoicesProps> = ({ selection, dispatchWalletModal }) => {
//   const { reFetchWallet } = useContext(ReachContext);

//   return (
//     <>
//       {SupportedAlgoConnectors.map((connector, i) => {
//         return (
//           <Button
//             key={i}
//             className="w-full"
//             onClick={() => {
//               selection?.setItem('CHOSEN_CONNECTOR', connector.id);
//               reFetchWallet(connector.id).catch((err) => {
//                 alert(WalletErrorCodes(err));
//               });
//               dispatchWalletModal({ type: 'TOGGLE_WALLET_MODAL' });
//             }}
//           >
//             <Connector index={i} connector={connector} length={SupportedAlgoConnectors.length} />
//           </Button>
//         );
//       })}

//       <h2 className="text-lg font-medium text-center text-gray-600 my-6">
//         <span>{`Don't have a wallet?`}</span>{' '}
//         <span className="underline">
//           <a href="https://perawallet.app/" target="_blank" rel="noreferrer">
//             Download Here
//           </a>
//         </span>
//       </h2>
//     </>
//   );
// };

// const ChooseConnector: FC = () => {
//   const applicationStore: ApplicationStoreProps = useContext(store);
//   const { dispatch: dispatchWalletModal } = applicationStore;

//   return (
//     <>
//       <h2 className="text-lg font-bold text-center my-8">Connect Your Wallet</h2>
//       <EthChoices dispatchWalletModal={dispatchWalletModal} />
//       {/* <AlgoChoices selection={selection} dispatchWalletModal={dispatchWalletModal} /> */}
//     </>
//   );
// };

// export default ChooseConnector;
