const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    httpProvider: 'http://localhost:8545',
    webSocketProvider: 'wss://localhost:8545'
  },
  production: {
    httpProvider: `https://${process.env.ETH_ENV}.infura.io`,
    webSocketProvider: `wss://${process.env.ETH_ENV}.infura.io/ws`
  }
};

const defaultConfig = {
  queryReturnLimit: 40,
  contractAddress: process.env.CONTRACT_ADDRESS,
  fromEthAddress: process.env.FROM_ETH_ADDRESS
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
