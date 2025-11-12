// const SentryWebpackPlugin = require('@sentry/webpack-plugin');

//here we need a way to set endpoint bu something other than NODE_ENV
// @ts-check

const supabaseHostname = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : 'csduwlbwlfnfswzbikcc.supabase.co';

const websiteHostname = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
  : 'localhost';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile packages that use ES modules
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/storage/v1/object/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/storage/v1/object/**'
      },
      {
        protocol: 'https',
        hostname: websiteHostname
      },
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/**'
      }
    ]
  }
};

module.exports = nextConfig;
