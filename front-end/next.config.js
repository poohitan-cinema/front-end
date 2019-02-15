const withSass = require('@zeit/next-sass');

const { data } = require('./services/data');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: '[name]-[local]--[hash:base64]',
  },

  exportPathMap() {
    const serialsPathMap = data
      .filter(item => item.type === 'serial')
      .reduce((serialsAccumulator, serial) => ({
        ...serialsAccumulator,
        [`/serials/${serial.id}`]: {
          page: '/serial',
          query: {
            id: serial.id,
          },
        },
        ...serial.seasons.reduce((seasonsAccumulator, season) => ({
          ...seasonsAccumulator,
          [`/serials/${serial.id}/seasons/${season.id}`]: {
            page: '/season',
            query: {
              id: season.id,
              serialId: serial.id,
            },
          },
          ...season.episodes.reduce((episodesAccumulator, episode) => ({
            ...episodesAccumulator,
            [`/serials/${serial.id}/seasons/${season.id}/episodes/${episode.id}`]: {
              page: '/episode',
              query: {
                id: episode.id,
                serialId: serial.id,
                seasonId: season.id,
              },
            },
          }), {}),
        }), {}),
      }), {});

    return {
      '/': { page: '/' },
      ...serialsPathMap,
    };
  },
});
