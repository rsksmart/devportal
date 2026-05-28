const webpack = require('webpack');

module.exports = function () {
  return {
    name: 'webpack-polyfills',
    configureWebpack(_config, isServer) {
      if (isServer) return {};
      return {
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser.js',
          }),
        ],
        resolve: {
          alias: {
            // ESM packages (like @reown/appkit) require explicit .js extension
            'process/browser': require.resolve('process/browser.js'),
          },
          fallback: {
            buffer: require.resolve('buffer/'),
            // wagmi/core tempo/Connectors.js does `import('accounts').catch(...)` — provide empty stub
            accounts: false,
          },
        },
      };
    },
  };
};
