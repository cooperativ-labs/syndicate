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
          address: '0xD08F75F2078EEE566565165C8aa536285C7A06A0',
        },
        { name: 'SwapContract', address: '0x469C5070F39f5F46162577a19f12f3173ab9D28a' },
      ],
    }),
  ],
});
