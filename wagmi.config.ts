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
          address: '0x760b189D05B20d15daAda48ae4a7430E715d3755',
        },
        { name: 'SwapContract', address: '0x9ba3B49BF2845d3748C71B1c3872908f727d7062' },
        { name: 'DividendContract', address: '0xDd78Ef60DffEba48142139e9a6b6Ce2B023416d3' },
      ],
    }),
  ],
});
