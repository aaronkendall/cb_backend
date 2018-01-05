const RandomNumber = artifacts.require("./lib/RandomNumber.sol");
const Marketplace = artifacts.require("./marketplace/Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(RandomNumber).then(() => {
    deployer.deploy(Marketplace);
  });
  deployer.link(RandomNumber, Marketplace);
};
