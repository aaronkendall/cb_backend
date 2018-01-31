const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    httpProvider: 'http://localhost:8545'
  },
  production: {
    httpProvider: 'http://'
  }
};

const defaultConfig = {
  queryReturnLimit: 40,
  contractAddress: process.env.CONTRACT_ADDRESS,
  fromEthAddress: process.env.FROM_ETH_ADDRESS
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
