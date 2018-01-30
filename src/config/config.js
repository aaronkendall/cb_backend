const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {},
  production: {}
};

const defaultConfig = {
  queryReturnLimit: 40
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
