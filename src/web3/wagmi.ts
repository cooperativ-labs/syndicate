import { CryptoAddressProtocol } from "@gql/graphql";
import { Maybe } from "@gql/graphql";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, Chain, mainnet, polygon, polygonMumbai, sepolia } from "wagmi/chains";
import { baseAccount, injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const SupportedChains: readonly [Chain, ...Chain[]] = [
  base,
  mainnet,
  sepolia,
  polygon,
  polygonMumbai
];

let cachedConfig: ReturnType<typeof createConfig> | null = null;

export const getWagmiConfig = () => {
  if (cachedConfig) {
    return cachedConfig;
  }
  const isBrowser = typeof window !== "undefined";

  const connectors = isBrowser
    ? [
        injected(),
        baseAccount(),
        metaMask(),
        safe(),
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! })
      ]
    : [];

  cachedConfig = createConfig({
    chains: SupportedChains,
    connectors,
    storage: createStorage({
      storage: cookieStorage
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [base.id]: http(),
      [polygon.id]: http(),
      [polygonMumbai.id]: http()
    }
  });

  return cachedConfig;
};

// Create and export a singleton config to avoid multiple WalletConnect Core initializations

export const SupportedChainsAddendum = [
  {
    id: mainnet.id,
    name: mainnet.name,
    blockExplorer: mainnet.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.eth,
    icon: "/assets/images/chain-icons/ethereum-eth-logo.svg",
    contractsSupported: true,
    color: "emerald-600"
  },
  {
    id: sepolia.id,
    name: sepolia.name,
    blockExplorer: sepolia.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.eth,
    icon: "/assets/images/chain-logos/sepolia-logo.png",
    contractsSupported: true,
    color: "blue-300"
  },

  // {
  //   id: 100001,
  //   name: 'Jupiter',
  //   blockExplorer: 'https://polygonscan.com',
  //   protocol: CryptoAddressProtocol.eth,
  //   icon: 'assets/images/chain-icons/jupiter-logo.svg',
  //   contractsSupported: true,
  //   color: 'black',
  // },
  {
    id: polygon.id,
    name: polygon.name,
    blockExplorer: polygon.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.eth,
    icon: "/assets/images/chain-icons/polygon-matic-logo.svg",
    contractsSupported: true,
    color: "purple-600"
  },
  {
    id: polygonMumbai.id,
    name: polygonMumbai.name,
    blockExplorer: polygonMumbai.blockExplorers.default.url,
    faucet: "https://faucet.matic.network/",
    protocol: CryptoAddressProtocol.eth,
    contractsSupported: true,
    color: "purple-300"
  },
  {
    id: base.id,
    name: base.name,
    blockExplorer: base.blockExplorers.default.url,
    protocol: CryptoAddressProtocol.eth,
    icon: "/assets/images/chain-icons/base-logo.svg",
    contractsSupported: true,
    color: "purple-600"
  }
];

export const MatchSupportedChains = (chainId: Maybe<number> | undefined) => {
  return SupportedChainsAddendum.find(chain => chain.id === chainId);
};
