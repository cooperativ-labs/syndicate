// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

//here we need a way to set endpoint bu something other than NODE_ENV
const getEndpoint = () => {
  if (process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'production' || process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'staging') {
    return process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT;
  } else {
    return 'http://localhost:8080/graphql';
  }
};

module.exports = {
  env: {
    NEXT_PUBLIC_DGRAPH_ENDPOINT: getEndpoint(),
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //this is to fix an issue with webpack not finding the electron module
    config.module.rules.push({
      test: /\.md$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'markdown-loader',
        },
      ],
    });
    // if (process.env.NODE_ENV === 'production') {

    // }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://app.safe.global',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};
