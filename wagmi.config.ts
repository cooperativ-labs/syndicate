import ABI from '@src/web3/ABI';
// import { defineConfig } from '@wagmi/cli';
// import { etherscan, react } from '@wagmi/cli/plugins';
import { goerli, mainnet, polygon, polygonMumbai, sepolia } from 'wagmi/chains';

export const SupportedChains = [mainnet, sepolia, goerli, polygon, polygonMumbai];

// export default defineConfig({
//   out: 'src/web3/generated.ts',
//   contracts: [
//     {
//       name: 'PrivateOffering',
//       abi: ABI,
//     },
//   ],
//   plugins: [
//     etherscan({
//       apiKey: process.env.ETHERSCAN_API_KEY!,
//       chainId: mainnet.id,
//       contracts: [
//         {
//           name: 'EnsRegistry',
//           address: {
//             [sepolia.id]: '0x18201F3219e818eE419cF3aa193ff269ABAB0df8',
//             // [mainnet.id]: '0x314159265dd8dbb310642f98f50c066173c1259b',
//           },
//         },
//       ],
//     }),
//     react(),
//   ],
// });
