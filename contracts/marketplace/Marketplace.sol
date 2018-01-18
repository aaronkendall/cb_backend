pragma solidity ^0.4.18;

import "../fighter/FighterOwnership.sol";
import "./MarketplaceConfig.sol";

contract Marketplace is FighterOwnership, MarketplaceConfig {
  mapping(uint256 => Sale) public fighterIdToSale; // Storing of figher Ids against their sale Struct
  uint256[] public fightersInMarket; // List of all figher Ids in the market

  mapping(uint256 => uint256) public fighterIdToMaxHealth; // Map of fighter Ids to their max health
  uint256[] public fightersInArena; // List of all fighter ids in the arena

  event PurchaseSuccess(address buyer, uint price, uint fighterId);
  event FightComplete(address winner, uint winnerId);

  struct Combatant {
    uint256 fighterId;
    Fighter fighter;
  }

  struct Sale {
    uint256 fighterId;
    uint256 price;
  }

  function getPriceForFighter(uint _fighterId) constant external returns (uint256) {
    return fighterIdToSale[_fighterId].price;
  }

  function getFightersForSale() constant external returns (uint[]) {
    return fightersInMarket;
  }

  function getFightersInArena() constant external returns (uint[]) {
    return fightersInArena;
  }

  function removeFighterFromSale(uint _fighterId) external {
    require(_owns(msg.sender, _fighterId));
    // Just double check we can actually remove a fighter before we go any further
    require(_fighterIsForSale(_fighterId));

    _removeFighterFromSale(_fighterId);
  }

  function removeFighterFromArena(uint _fighterId) external {
    require(_owns(msg.sender, _fighterId));
    // Just double check we can actually remove a fighter before we go any further
    require(_fighterIsForBrawl(_fighterId));

    _removeFighterFromArena(_fighterId);
  }

  function makeFighterAvailableForSale(uint _fighterId, uint _price) external {
    require(_owns(msg.sender, _fighterId));
    // Fighters can't be both for sale and open for brawling
    require(!_fighterIsForBrawl(_fighterId));
    require(_price > 0);

    fightersInMarket.push(_fighterId);
    fighterIdToSale[_fighterId] = Sale({ fighterId: _fighterId, price: _price });
  }

  function makeFighterAvailableForBrawl(uint _fighterId) external {
    require(_owns(msg.sender, _fighterId));
    // Fighters can't be both for sale and open for brawling
    require(!_fighterIsForSale(_fighterId));

    fightersInArena.push(_fighterId);
    fighterIdToMaxHealth[_fighterId] = fighters[_fighterId].maxHealth;
  }

  function buyFighter(uint _fighterId) external payable {
    _makePurchase(_fighterId, msg.value);
    _transfer(fighterIdToOwner[_fighterId], msg.sender, _fighterId);
  }

  function getInfoForFighter(uint _fighterId) constant external returns (uint maxHealth, uint health, uint speed, uint strength, bool isForSale, bool isInArena) {
    Fighter memory _fighter = fighters[_fighterId];
    return (
      _fighter.maxHealth,
      _fighter.health, _fighter.speed,
      _fighter.strength,
      _fighterIsForSale(_fighterId),
      _fighterIsForBrawl(_fighterId)
    );
  }

  function fight(uint _attackerId, uint _defenderId, uint _seed) external {
    // fighter actually in the arena is always the defender
    require(_fighterIsForBrawl(_defenderId));
    // Make sure the challenger is actually sending the transaction
    require(_owns(msg.sender, _attackerId));

    uint[2] memory winnerAndLoser = _determineWinner(_attackerId, _defenderId, _seed);
    uint _winnerId = winnerAndLoser[0];
    uint _loserId = winnerAndLoser[1];

    if (_fighterIsForBrawl(_loserId)) {
      _removeFighterFromArena(_loserId);
    }

    _transfer(fighterIdToOwner[_loserId], fighterIdToOwner[_winnerId], _loserId);
    FightComplete(fighterIdToOwner[_winnerId], _winnerId);
  }

  function _determineWinner(uint _attackerId, uint _defenderId, uint _seed) internal returns (uint[2]) {
    Combatant[] memory orderOfCombat;
    Fighter memory _attacker = fighters[_attackerId];
    Fighter memory _defender = fighters[_defenderId];

    if(_defender.speed >= _attacker.speed) {
      orderOfCombat[0] = Combatant({ fighterId: _defenderId, fighter: _defender });
      orderOfCombat[1] = Combatant({ fighterId: _attackerId, fighter: _attacker });
    } else {
      orderOfCombat[0] = Combatant({ fighterId: _attackerId, fighter: _attacker });
      orderOfCombat[1] = Combatant({ fighterId: _defenderId, fighter: _defender });
    }

    return _calculateCombatOutcome(orderOfCombat, _seed);
  }

  function _calculateCombatOutcome(Combatant[] _combatants, uint _seed) internal returns (uint[2]) {
    uint[2] memory winnerAndLoser;

    while ( _combatants[0].fighter.health > 0 &&  _combatants[1].fighter.health > 0) {
      uint _fighter1StrengthCheck = (RandomNumber.randDecimal(_seed) *  _combatants[0].fighter.strength);
      uint _fighter2SpeedCheck = (RandomNumber.randDecimal(_seed) *  _combatants[1].fighter.speed);

      if (_fighter1StrengthCheck > _fighter2SpeedCheck) {
         _combatants[1].fighter.health -= (_fighter1StrengthCheck - _fighter2SpeedCheck);
      }

      if (_combatants[1].fighter.health <= 0) {
        winnerAndLoser[0] =  _combatants[0].fighterId;
        winnerAndLoser[1] =  _combatants[1].fighterId;
        break;
      }

      uint _fighter2StrengthCheck = (RandomNumber.randDecimal(_seed) *  _combatants[1].fighter.strength);
      uint _fighter1SpeedCheck = (RandomNumber.randDecimal(_seed) *  _combatants[0].fighter.speed);

      if (_fighter2StrengthCheck > _fighter1SpeedCheck) {
         _combatants[0].fighter.health -= (_fighter2StrengthCheck - _fighter1SpeedCheck);
      }

      if (_combatants[0].fighter.health <= 0) {
        winnerAndLoser[0] = _combatants[1].fighterId;
        winnerAndLoser[1] = _combatants[0].fighterId;
        break;
      }
    }

    // Set the losers health to 0
    fighters[winnerAndLoser[1]].health = 0;
    return winnerAndLoser;
  }

  function _makePurchase(uint _fighterId, uint _price) internal {
    require(_fighterIsForSale(_fighterId));
    require(_price >= fighterIdToSale[_fighterId].price);

    address sellerAddress = fighterIdToOwner[_fighterId];
    _removeFighterFromSale(_fighterId);

    uint saleCut = _calculateCut(_price);
    uint totalSale = _price - saleCut;
    sellerAddress.transfer(totalSale);

    PurchaseSuccess(msg.sender, _price, _fighterId);
  }

  function _calculateCut(uint _totalPrice) internal returns (uint) {
    return ((_totalPrice / 100) * marketplaceCut);
  }

  function _fighterIsForSale(uint _fighterId) internal returns (bool) {
    return (fighterIdToSale[_fighterId].price > 0);
  }

  function _fighterIsForBrawl(uint _fighterId) internal returns (bool) {
    return (fighterIdToMaxHealth[_fighterId] > 0);
  }

  function _removeFighterFromSale(uint _fighterId) internal {
    uint index;
    for(index = 0; index < fightersInMarket.length; index++) {
      if (fightersInMarket[index] == _fighterId) {
        delete fightersInMarket[index];
      }
    }
    delete fighterIdToSale[_fighterId];
  }

  function _removeFighterFromArena(uint _fighterId) internal {
    uint index;
    for(index = 0; index < fightersInArena.length; index++) {
      if (fightersInArena[index] == _fighterId) {
        delete fightersInArena[index];
      }
    }
    delete fighterIdToMaxHealth[_fighterId];
  }
}
