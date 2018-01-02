pragma solidity ^0.4.11;

import "./FighterOwnership.sol";

contract FighterTraining is FighterOwnership {
  function trainFighter(uint _fighterId, string _attribute) external {
    require(_owns(msg.sender, _fighterId));

    if (keccak256(_attribute) == keccak256('maxHealth')) {
      _trainMaxHealth(_fighterId, msg.sender);
    } else if (keccak256(_attribute) == keccak256('strength')) {
      _trainStrength(_fighterId, msg.sender);
    } else if (keccak256(_attribute) == keccak256('speed')) {
      _trainSpeed(_fighterId, msg.sender);
    }
  }

  function healFighter(uint _fighterId) external {
    require(_owns(msg.sender, _fighterId));
    _healFighter(_fighterId, msg.sender);
  }
}
