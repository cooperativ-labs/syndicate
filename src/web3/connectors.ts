import { CryptoAddressProtocol } from 'types';
import { configureChains, createConfig, sepolia, mainnet } from 'wagmi';
import { goerli, polygon, polygonMumbai } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { LedgerConnector } from 'wagmi/connectors/ledger';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';

declare let window: any;

//OLD ------------------

// export const jupiterBlockChain = {
//   id: 10001,
//   name: 'Jupiter',
//   network: 'jupiter',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'JupiterEth',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//     default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
//   },
//   blockExplorers: {
//     etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 11_907_934,
//     },
//   },
// } as const satisfies Chain;

// export const RPC_URLS: { [chainId: number]: string } = {
//   1: 'https://mainnet.infura.io/v3/',
//   3: 'https://ropsten.infura.io/v3/',
//   137: 'https://polygon-mainnet.infura.io/v3/',
//   80001: 'https://polygon-mumbai.infura.io/v3/',
// };

export const SupportedChains = [mainnet, sepolia, goerli, polygon, polygonMumbai];

const { chains, publicClient, webSocketPublicClient } = configureChains(SupportedChains, [
  // publicProvider(),
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const SupportedChainsAddendum = [
  {
    id: mainnet.id,
    name: mainnet.name,
    blockExplorer: mainnet.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-icons/ethereum-eth-logo.svg',
    contractsSupported: true,
    color: 'emerald-600',
  },
  {
    id: sepolia.id,
    name: sepolia.name,
    blockExplorer: sepolia.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-logos/sepolia-logo.png',
    contractsSupported: true,
    color: 'blue-300',
  },
  {
    id: goerli.id,
    name: goerli.name,
    blockExplorer: goerli.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-logos/sepolia-logo.png',
    contractsSupported: true,
    color: 'blue-300',
  },
  // {
  //   id: 100001,
  //   name: 'Jupiter',
  //   blockExplorer: 'https://polygonscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: 'assets/images/chain-icons/jupiter-logo.svg',
  //   contractsSupported: true,
  //   color: 'black',
  // },
  {
    id: polygon.id,
    name: polygon.name,
    blockExplorer: polygon.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.Eth,
    icon: '/assets/images/chain-icons/polygon-matic-logo.svg',
    contractsSupported: true,
    color: 'purple-600',
  },
  {
    id: polygonMumbai.id,
    name: polygonMumbai.name,
    blockExplorer: polygonMumbai.blockExplorers.default.url,
    faucet: 'https://faucet.matic.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'purple-300',
  },
  // {
  //   id: 43114,
  //   name: 'Avalanche Mainnet',
  //   blockExplorer: 'https://arbiscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: 'assets/images/chain-icons/arbitrum.svg',
  //   contractsSupported: false,
  // },
  // {
  //   id: 56,
  //   name: 'Binance Smart Chain',
  //   blockExplorer: 'https://bscscan.com',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: 'assets/images/chain-icons/binance-chain.svg',
  //   contractsSupported: false,
  // },
  // {
  //   id: 10,
  //   name: 'Optimism',
  //   blockExplorer: 'https://optimistic.etherscan.io',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: 'assets/images/chain-icons/optomism.png',
  //   contractsSupported: false,
  // },
  // {
  //   id: 100,
  //   name: 'xDAI',
  //   blockExplorer: 'https://blockscout.com/xdai/mainnet',
  //   protocol: CryptoAddressProtocol.Eth,
  //   icon: 'assets/images/chain-icons/xdai.svg',
  //   contractsSupported: false,
  // },

  // {
  //   id: 12345678,
  //   name: 'Algo',
  //   blockExplorer: 'https://algoexplorer.io',
  //   protocol: CryptoAddressProtocol.Algo,
  //   icon: 'assets/images/chain-icons/algorand-algo.svg',
  //   contractsSupported: true,
  //   color: 'grey-800',
  // },
  // {
  //   id: 654321,
  //   name: 'AlgoTest',
  //   blockExplorer: 'https://testnet.algoexplorer.io',
  //   protocol: CryptoAddressProtocol.Algo,
  //   icon: 'assets/images/chain-icons/algorand-algo.svg',
  //   contractsSupported: true,
  //   color: 'grey-800',
  // },
];

export const MatchSupportedChains = (chainId) => {
  return SupportedChainsAddendum.find((chain) => chain.id === chainId);
};

export const isAlgorand = (chainId) => MatchSupportedChains(chainId).protocol === CryptoAddressProtocol.Algo;

const supportedChainIds = chains.map((chain) => chain.id);

export const CustomWalletConnectConnector = async () => {
  return await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: supportedChainIds,
    showQrModal: true, // REQUIRED set to "true" to use @web3modal/standalone,
    // methods, // OPTIONAL ethereum methods
    // events, // OPTIONAL ethereum events
    // rpcMap, // OPTIONAL rpc urls for each chain
    // metadata, // OPTIONAL metadata of your app
    // qrModalOptions // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/2.0/web3modal/options
  });
};

export const SupportedEthConnectors = [
  {
    id: 'injected',
    name: 'MetaMask',
    logo: '/assets/images/wallet-logos/metamask-fox.svg',
    experimental: false,
    description: 'Mobile app and extension',
    connector: new InjectedConnector({
      chains: SupportedChains,
    }),
  },
  {
    id: 'coinbasewallet',
    name: 'Coinbase Wallet',
    logo: '/assets/images/wallet-logos/coinbasewallet-logo.png',
    isSquare: true,
    experimental: false,
    description: 'Link to Coinbase Wallet',
    connector: new CoinbaseWalletConnector({
      chains: SupportedChains,
      options: {
        appName: 'Syndicate by Cooperativ Labs',
        jsonRpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      },
    }),
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: '/assets/images/wallet-logos/walletconnect-logo.svg',
    experimental: false,
    description: 'Link wallet with a QR code',
    connector: new WalletConnectConnector({
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        isNewChainsStale: false,
      },
    }),
  },
  {
    id: 'ledger',
    name: 'Ledger Connect',
    logo: '/assets/images/wallet-logos/ledgerconnect-alternative.webp',
    experimental: false,
    description: 'Connect to Ledger',
    connector: new LedgerConnector({
      chains: SupportedChains,
    }),
  },
];

export const GetEthConnector = (id) => {
  switch (id) {
    case 'injected':
      return SupportedEthConnectors[0].connector;
    case 'walletconnect':
      return SupportedEthConnectors[2].connector;
    case 'coinbase':
      return SupportedEthConnectors[1].connector;
    case 'ledger':
      return SupportedEthConnectors[3].connector;
    default:
      return undefined;
  }
};

export const disconnectWallet = async (callback?: () => void) => {
  await window.algorand?.disconnect();

  window.sessionStorage.removeItem('CHOSEN_CONNECTOR');
  window.localStorage.removeItem('wc:session:');
  window.localStorage.removeItem('wagmi.connected');
  if (callback) {
    callback();
  }
};

// ================ ALGO ================

export const SupportedAlgoConnectors = [
  {
    id: 'pera',
    name: 'Pera Wallet',
    logo: '/assets/images/wallet-logos/pera-logo.png',
    experimental: false,
    description: 'Connect to Pera app',
  },
  {
    id: 'myAlgo',
    name: 'MyAlgo',
    logo: '/assets/images/wallet-logos/myalgo-logo.png',
    isSquare: true,
    experimental: false,
    description: 'Connect to MyAlgo',
  },
];

// const useMyAlgo = async (providerEnv) => {
//   // We delete the wallet to guarantee we get MyAlgo
//   delete window.algorand;
//   // We load a fresh stdlib, to clear out any state from before
//   let reachLib = loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
//   // We load MyAlgo
//   reachLib.setWalletFallback(
//     reachLib.walletFallback({
//       providerEnv,
//       MyAlgoConnect,
//     })
//   );
//   return reachLib;
// };

// const usePeraConnect = async (providerEnv) => {
//   delete window.algorand;
//   let reachLib = loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
//   reachLib.setWalletFallback(
//     reachLib.walletFallback({
//       providerEnv: providerEnv,
//       WalletConnect: MakePeraConnect(PeraWalletConnect),
//     })
//   );
//   return reachLib;
// };

// export type ConnectorIdType = 'injected' | 'walletlink' | 'walletconnect' | 'pera' | 'myAlgo' | 'algoSigner';

export const GetAlgoConnector = (id, providerEnv) => {
  switch (id) {
    case 'pera':
      return undefined;
    case 'myAlgo':
      return undefined;
    // case 'algoSigner':
    //   return AlgoSignerConnect;
    default:
      return undefined;
  }
};
