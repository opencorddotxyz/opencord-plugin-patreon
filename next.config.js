/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.resolve.fallback = {
      crypto: false,
      path: false,
      fs: false
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
        }
      }
    })
    
    return config
  },
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
};

module.exports = nextConfig;
