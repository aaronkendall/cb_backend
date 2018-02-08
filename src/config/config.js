const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    httpProvider: 'http://localhost:8545',
    webSocketProvider: 'wss://localhost:8545'
  },
  production: {
    httpProvider: 'http://mainnet.infura.io',
    webSocketProvider: 'wss://mainnet.infura.io/ws'
  }
};

const defaultConfig = {
  queryReturnLimit: 40,
  contractAddress: process.env.CONTRACT_ADDRESS,
  fromEthAddress: process.env.FROM_ETH_ADDRESS
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
