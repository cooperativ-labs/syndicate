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
          name: 'ShareContract',
          address: '0x074EAf2EF4c553a0077De051EaF22e1A3cCF6C5e',
        },
        { name: 'SwapContract', address: '0xBbA9522bB72b49C1623Ed8083D76799992c91792' },
      ],
    }),
  ],
});
