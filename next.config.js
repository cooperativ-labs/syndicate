// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

//here we need a way to set endpoint bu something other than NODE_ENV
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile packages that use ES modules
  transpilePackages: [
    '@reown/appkit',
    '@reown/appkit-common',
    '@reown/appkit-universal-connector',
    '@reown/walletkit'
    // '@walletconnect/ethereum-provider'
  ]
};

module.exports = nextConfig;

// module.exports = {

//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     //this is to fix an issue with webpack not finding the electron module
//     config.module.rules.push({
//       test: /\.md$/,
//       exclude: /node_modules/,
//       use: [
//         {
//           loader: 'markdown-loader',
//         },
//       ],
//     });
//     // if (process.env.NODE_ENV === 'production') {

//     // }
//     return config;
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: 'https://app.safe.global',
//           },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET, POST, PUT, DELETE',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'Content-Type, Authorization',
//           },
//         ],
//       },
//     ];
//   },
// };
