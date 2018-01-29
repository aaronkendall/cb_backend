const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {},
  production: {}
};

const defaultConfig = {
  contractAddress: process.env.CONTRACT_ADDRESS,
  trainingCost: process.env.TRAINING_COST,
  defaultSearchGas: process.env.DEFAULT_SEARCH_GAS,
  defaultFightGas: process.env.DEFAULT_FIGHT_GAS,
  defaultCallGas: process.env.DEFAULT_CALL_GAS,
  queryReturnLimit: 40
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
