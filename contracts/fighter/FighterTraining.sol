pragma solidity ^0.4.18;

import "./FighterBase.sol";

contract FighterTraining is FighterBase {
  function _train(uint _fighterId, string _attribute, uint _attributeIncrease) internal {
    if (keccak256(_attribute) == keccak256('maxHealth')) {
      _trainMaxHealth(_fighterId, _attributeIncrease, msg.sender);
    } else if (keccak256(_attribute) == keccak256('strength')) {
      _trainStrength(_fighterId, _attributeIncrease, msg.sender);
    } else if (keccak256(_attribute) == keccak256('speed')) {
      _trainSpeed(_fighterId, _attributeIncrease, msg.sender);
    }
  }

  function _heal(uint _fighterId) internal {
    _healFighter(_fighterId, msg.sender);
  }
}
