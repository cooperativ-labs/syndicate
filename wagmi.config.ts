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
        { name: 'SwapContract', address: '0xCED331cf4e6716B4DbF99fDd8A424D539CC3b196' },
      ],
    }),
  ],
});
