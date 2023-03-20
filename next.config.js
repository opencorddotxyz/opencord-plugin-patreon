const dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const env = {};
const loaded = dotenv.config({
  path: `.env.${process.env.APP_ENV || process.env.NODE_ENV}`,
  silent: true,
});

env['NEXT_PUBLIC_APP_ENV'] = process.env.APP_ENV;

Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = loaded.parsed[key];
  }
});

const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.resolve.fallback = {
      crypto: false,
      path: false,
      fs: false,
    };
    config.module.rules.push({
      test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024 * 30,
          name: '[path][name].[ext]',
          encoding: 'base64',
          fallback: require.resolve('file-loader'),
        },
      },
    });

    return config;
  },
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
  env,
};

module.exports = withBundleAnalyzer(nextConfig);
