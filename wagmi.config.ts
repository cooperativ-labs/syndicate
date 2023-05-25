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
          address: '0x8c4Faa40b9f3CdaEF990F3ACE935680D42Fa82f9',
        },
        { name: 'SwapContract', address: '0x30Db8f901686d43D8866F80B984E7faaE6103be9' },
      ],
    }),
  ],
});
