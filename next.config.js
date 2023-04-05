// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

//here we need a way to set endpoint bu something other than NODE_ENV
const getEndpoint = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return '--';
    case 'staging':
      return '--';
    default:
      return 'http://localhost:8080/graphql';
  }
};

const GRAPHQL_ENDPOINT = getEndpoint();

module.exports = {
  env: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: GRAPHQL_ENDPOINT,
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
};
