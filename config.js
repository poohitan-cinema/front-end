const environment = process.env.NODE_ENV;

if (!environment) {
  throw new Error('Provide NODE_ENV');
}

const shared = {
  port: 7300,
  digitalOcean: {
    space: 'https://poohitan-cinema.ams3.cdn.digitaloceanspaces.com',
  },
  pageTitle: 'Звалище фільмів',
};

const config = {
  development: {
    apiURL: 'http://localhost:7400',
  },
  production: {
    apiURL: 'http://api.cinema.poohitan.com',

    server: {
      host: '46.101.99.203',
      username: 'poohitan',
      folder: '~/poohitan.com/cinema/front-end',
    },

    repository: 'git@github.com:poohitan-cinema/front-end.git',

    deploy: {
      appName: 'cinema',
    },

    google: {
      analyticsTrackingId: 'UA-10797087-21',
    },
  },
};

module.exports = {
  ...shared,
  ...config[environment],
};
