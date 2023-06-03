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
          address: '0x7d070A80d3d093172936d54C650749b9a0df28c2',
        },
        { name: 'SwapContract', address: '0xf292f3DB7c9aeBF5B07DF3f09C70C3dAfEFC1554' },
        { name: 'DividendContract', address: '0x36E26EdD9D7b6C8d6E7fBE1977DD569619dB145F' },
      ],
    }),
  ],
});
