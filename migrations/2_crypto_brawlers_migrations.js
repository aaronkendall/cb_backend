const RandomNumber = artifacts.require("./lib/RandomNumber.sol");
const CryptoBrawlers = artifacts.require("./CryptoBrawlers.sol");

module.exports = function(deployer) {
  deployer.deploy(RandomNumber).then(() => {
    deployer.deploy(CryptoBrawlers)
  });
  deployer.link(RandomNumber, CryptoBrawlers);
};
