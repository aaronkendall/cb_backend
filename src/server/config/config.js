const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {},
  production: {}
};

const defaultConfig = {
  contractAddress: process.env.CONTRACT_ADDRESS,
  trainingCost: process.env.TRAINING_COST,
  defaultSearchGas: process.env.DEFAULT_SEARCH_GAS
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
