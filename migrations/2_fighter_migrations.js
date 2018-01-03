const RandomNumber = artifacts.require("./lib/RandomNumber.sol");
const FighterOwnership = artifacts.require("./fighter/FighterOwnership.sol");
const Marketplace = artifacts.require("./marketplace/Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(RandomNumber).then(() => {
    deployer.deploy(FighterOwnership);
  });
  deployer.link(RandomNumber, FighterOwnership);
  deployer.deploy(Marketplace);
};
