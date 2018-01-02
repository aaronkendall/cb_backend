var FighterBase = artifacts.require("./fighter/FighterBase.sol");
var FighterOwnership = artifacts.require("./fighter/FighterOwnership.sol");
var FighterTraining = artifacts.require("./fighter/FighterTraining.sol");

module.exports = function(deployer) {
  deployer.deploy(FighterBase);
  deployer.deploy(FighterOwnership);
  deployer.deploy(FighterTraining);
};
