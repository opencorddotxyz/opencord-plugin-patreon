const dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const loadEnv = () => {
  const env = {
    NEXT_PUBLIC_APP_ENV: process.env.APP_ENV || process.env.NODE_ENV,
  };
  const loaded = dotenv.config({
    path: '.env.' + env.NEXT_PUBLIC_APP_ENV,
    silent: true,
  });
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      env[key] = loaded.parsed[key];
    }
  });
  return env;
};

const nextConfig = {
  env: loadEnv(),
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
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
};

module.exports = withBundleAnalyzer(nextConfig);
