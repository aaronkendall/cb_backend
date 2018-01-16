pragma solidity ^0.4.18;

import "../base/Ownable.sol";

contract FighterConfig is Ownable {
  uint public chanceOfFighterCreation = 3;
  uint public trainingFactor = 3;
  uint256 public trainingCost = 5000000000000000; // cost of training in wei

  function setFighterCreationChance(uint newProbability) external onlyOwner {
    chanceOfFighterCreation = newProbability;
  }

  function setTrainingFactor(uint newFactor) external onlyOwner {
    trainingFactor = newFactor;
  }

  function setNewTrainingCost(uint newCost) external onlyOwner {
    trainingCost = newCost;
  }
}
