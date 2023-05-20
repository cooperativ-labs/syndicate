import { defineConfig } from '@wagmi/cli';
import { goerli, mainnet, polygon, polygonMumbai, sepolia } from 'wagmi/chains';
import { sourcify } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'src/web3/generated.ts',
  plugins: [
    sourcify({
      chainId: sepolia.id,
      contracts: [
        {
          name: 'PrivateOffering',
          address: '0x18201F3219e818eE419cF3aa193ff269ABAB0df8',
        },
      ],
    }),
  ],
});
