const environment = process.env.NODE_ENV;

if (!environment) {
  throw new Error('Provide NODE_ENV');
}

const shared = {
  port: 7300,
};

const config = {
  development: {
    apiURL: 'http://localhost:7400',
  },
  production: {
    apiURL: 'https://cinema.poohitan.com/api',
  },
};

module.exports = {
  ...shared,
  ...config[environment],
};
