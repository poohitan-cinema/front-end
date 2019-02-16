const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: '[name]-[local]--[hash:base64]',
  },
});
