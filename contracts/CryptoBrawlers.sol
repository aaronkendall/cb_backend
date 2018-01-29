pragma solidity ^0.4.18;

import "./marketplace/Marketplace.sol";

contract CryptoBrawlers is Marketplace {
  uint public startingFighterPrice = 5000000000000000;

  function setupStartingFighters(uint startingFighters) external onlyOwner {
    uint count;
    for(count = 1; count <= startingFighters; count++) {
      uint createdFighterId = _createFighter(10, 5, 5, msg.sender);

      // fighter 0 must always be owned by the creator as it causes problems when trying to be purchased
      // and transferred etc
      /* if (createdFighterId > 0) {
        fighterIdToSale[createdFighterId] = Sale({
          fighterId: createdFighterId,
          price: startingFighterPrice
        });
      } */
    }
  }

  function getInfoForFighter(uint _fighterId)
    external returns (uint maxHealth, uint health, uint speed, uint strength, bool isForSale, bool isInArena)
  {
    Fighter memory _fighter = fighters[_fighterId];
    return (
      _fighter.maxHealth,
      _fighter.health, _fighter.speed,
      _fighter.strength,
      _fighterIsForSale(_fighterId),
      _fighterIsForBrawl(_fighterId)
    );
  }
}
