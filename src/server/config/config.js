const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {},
  production: {}
};

const defaultConfig = {
  contractAddress: process.env.CONTRACT_ADDRESS
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
