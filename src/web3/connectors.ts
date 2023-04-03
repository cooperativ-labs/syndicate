import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { CryptoAddressProtocol } from 'types';
import { ALGO_MyAlgoConnect as MyAlgoConnect, loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MakeAlgoSignerConnect as MakeAlgoSignerConnect } from '@reach-sh/stdlib';
import { PeraWalletConnect } from '@perawallet/connect';
import { ALGO_MakePeraConnect as MakePeraConnect } from '@reach-sh/stdlib';
declare let window: any;

const TestingContract = '0x05840f9f';
const TestBackingToken = 0x05716d2b;

export const setChainId = 654321;

export const liveChain = (chainId) => {
  if (chainId === 12345678) {
    return true;
  }
  return false;
};
export const SupportedChainIds = [
  {
    id: 1,
    name: 'Ethereum',
    blockExplorer: 'https://etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/ethereum-eth-logo.svg',
    contractsSupported: true,
    color: 'emerald-600',
  },
  {
    id: 3,
    name: 'Ropsten',
    blockExplorer: 'https://ropsten.etherscan.io',
    faucet: 'https://faucet.dimensions.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'cYellow',
  },
  {
    id: 137,
    name: 'Polygon',
    blockExplorer: 'https://polygonscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/polygon-matic-logo.svg',
    contractsSupported: true,
    color: 'purple-600',
  },
  {
    id: 80001,
    name: 'Polygon Mumbai',
    blockExplorer: 'https://mumbai.polygonscan.com',
    faucet: 'https://faucet.matic.network/',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: true,
    color: 'purple-300',
  },
  {
    id: 43114,
    name: 'Avalanche Mainnet',
    blockExplorer: 'https://arbiscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/arbitrum.svg',
    contractsSupported: false,
  },
  {
    id: 56,
    name: 'Binance Smart Chain',
    blockExplorer: 'https://bscscan.com',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/binance-chain.svg',
    contractsSupported: false,
  },
  {
    id: 10,
    name: 'Optimism',
    blockExplorer: 'https://optimistic.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/optomism.png',
    contractsSupported: false,
  },
  {
    id: 100,
    name: 'xDAI',
    blockExplorer: 'https://blockscout.com/xdai/mainnet',
    protocol: CryptoAddressProtocol.Eth,
    icon: 'assets/images/chain-icons/xdai.svg',
    contractsSupported: false,
  },
  {
    id: 4,
    name: 'Rinkeby',
    blockExplorer: 'https://rinkeby.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,

    contractsSupported: false,
  },
  {
    id: 5,
    name: 'Görli',
    blockExplorer: 'https://goerli.etherscan.io',
    protocol: CryptoAddressProtocol.Eth,
    contractsSupported: false,
  },
  {
    id: 12345678,
    name: 'Algo',
    blockExplorer: 'https://algoexplorer.io',
    protocol: CryptoAddressProtocol.Algo,
    icon: 'assets/images/chain-icons/algorand-algo.svg',
    contractsSupported: true,
    color: 'grey-800',
  },
  {
    id: 654321,
    name: 'AlgoTest',
    blockExplorer: 'https://testnet.algoexplorer.io',
    protocol: CryptoAddressProtocol.Algo,
    icon: 'assets/images/chain-icons/algorand-algo.svg',
    contractsSupported: true,
    color: 'grey-800',
  },
];

export const MatchSupportedChains = (chainId) => {
  return SupportedChainIds.find((chain) => chain.id === chainId);
};

export const isAlgorand = (chainId) => MatchSupportedChains(chainId).protocol === CryptoAddressProtocol.Algo;

export const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  3: 'https://ropsten.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  137: 'https://polygon-mainnet.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
  80001: 'https://polygon-mumbai.infura.io/v3/acfb1610d5514a998fb6c0baf20682c2',
};

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 137, 80001] });

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    137: RPC_URLS[137],
    80001: RPC_URLS[80001],
  },
  qrcode: true,
});

const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Cooperativ',
  darkMode: false,
  appLogoUrl: 'https://www.cooperativ.io/assets/android-chrome-192x192.png',
});

export const EthConnectors = [
  {
    id: 'injected',
    name: 'MetaMask',
    logo: '/assets/images/wallet-logos/metamask-fox.svg',
    experimental: false,
    description: 'Mobile app and extension',
  },
  {
    id: 'walletlink',
    name: 'WalletLink',
    logo: '/assets/images/wallet-logos/walletlink-logo.png',
    isSquare: true,
    experimental: false,
    description: 'Link to Coinbase Wallet',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    logo: '/assets/images/wallet-logos/walletconnect-logo.svg',
    experimental: true,
    description: 'Link wallet with a QR code',
  },
];

const useMyAlgo = async (providerEnv) => {
  // We delete the wallet to guarantee we get MyAlgo
  delete window.algorand;
  // We load a fresh stdlib, to clear out any state from before
  let reachLib = loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
  // We load MyAlgo
  reachLib.setWalletFallback(
    reachLib.walletFallback({
      providerEnv,
      MyAlgoConnect,
    })
  );
  return reachLib;
};

const usePeraConnect = async (providerEnv) => {
  delete window.algorand;
  let reachLib = loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
  reachLib.setWalletFallback(
    reachLib.walletFallback({
      providerEnv: providerEnv,
      WalletConnect: MakePeraConnect(PeraWalletConnect),
    })
  );
  return reachLib;
};

export const disconnectWallet = async (callback?: () => void) => {
  await window.algorand?.disconnect();
  window.sessionStorage.removeItem('CHOSEN_CONNECTOR');
  window.localStorage.removeItem('walletconnect');
  window.localStorage.removeItem('PeraWallet.Wallet');

  if (callback) {
    callback();
  }
};

export const AlgoConnectors = [
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
  // {
  //   id: 'algoSigner',
  //   name: 'AlgoSigner',
  //   logo: '/assets/images/wallet-logos/algoSigner-logo.jpg',
  //   isSquare: true,
  //   experimental: false,
  //   description: 'Connect to AlgoSigner',
  // },
];

// export type ConnectorIdType = 'injected' | 'walletlink' | 'walletconnect' | 'pera' | 'myAlgo' | 'algoSigner';

export const GetEthConnector = (id) => {
  switch (id) {
    case 'injected':
      return injected;
    case 'walletconnect':
      return walletconnect;
    case 'walletlink':
      return walletlink;
    default:
      return undefined;
  }
};
export const GetAlgoConnector = (id, providerEnv) => {
  switch (id) {
    case 'pera':
      return usePeraConnect(providerEnv);
    case 'myAlgo':
      return useMyAlgo(providerEnv);
    // case 'algoSigner':
    //   return AlgoSignerConnect;
    default:
      return undefined;
  }
};
