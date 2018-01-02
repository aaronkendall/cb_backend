pragma solidity ^0.4.11;

contract FighterBase {
  /*** EVENTS ***/

  event Creation(address owner, uint256 fighterId);
  event Transfer(address from, address to, uint256 fighterId);
  event AttributeIncrease(
    address owner,
    uint fighterId,
    string attribute,
    uint increaseValue
  );
  event Healed(address owner, uint fighterId);

  struct Fighter {
    uint256 maxHealth;
    uint256 health;
    uint256 speed;
    uint256 strength;
  }

  /*** STORAGE ***/

  Fighter[] fighters;
  mapping(address => mapping(uint256 => uint256)) public ownedFighters; // owner address to a map of fighter Ids that they own
  mapping(address => uint256) public fighterCountForOwner; // Need this for ERC721 compliance
  mapping(uint256 => address) public fighterIdToOwner; // lookup for owner of a specific fighter
  mapping(uint256 => address) public fighterIdToApproved; // Shows appoved address for sending of fighters, Needed for ERC721

  function _transfer(address _from, address _to, uint256 _fighterId) internal {
    ownedFighters[_to][_fighterId] = _fighterId; // Keep track of an addresses owned fighters
    fighterCountForOwner[_to]++;
    fighterIdToOwner[_fighterId] = _to;

    // Check that it isn't a newly created fighter before messing with ownership values
    if (_from != address(0)) {
      delete ownedFighters[_from][_fighterId];
      delete fighterIdToApproved[_fighterId];
      fighterCountForOwner[_from]--;
    }
    // Emit the transfer event.
    Transfer(_from, _to, _fighterId);
  }

  function _createFighter(
    uint _maxHealth,
    uint _speed,
    uint _strength,
    address _owner
  )
    internal
    returns (uint)
  {
    Fighter memory _fighter = Fighter({
      maxHealth: _maxHealth,
      health: _maxHealth, // Fighters are always created with maximum health
      speed: _speed,
      strength: _strength
    });

    uint256 newFighterId = fighters.push(_fighter) - 1;

    // 4 billion fighters is the max lel
    require(newFighterId == uint256(uint32(newFighterId)));

    Creation(_owner, newFighterId);

    // This will assign ownership, and also emit the Transfer event as
    // per ERC721 draft
    _transfer(0, _owner, newFighterId);

    return newFighterId;
  }

  function _trainMaxHealth(uint _fighterId, address _owner) internal {
    Fighter memory _fighter = fighters[_fighterId];
    _fighter.maxHealth += 1; // Randomly increase these in the future
    AttributeIncrease(_owner, _fighterId, 'Max Health', 1);
  }

  function _trainSpeed(uint _fighterId, address _owner) internal {
    Fighter memory _fighter = fighters[_fighterId];
    _fighter.speed += 1; // Randomly increase these in the future
    AttributeIncrease(_owner, _fighterId, 'Speed', 1);
  }

  function _trainStrength(uint _fighterId, address _owner) internal {
    Fighter memory _fighter = fighters[_fighterId];
    _fighter.strength += 1; // Randomly increase these in the future
    AttributeIncrease(_owner, _fighterId, 'Strength', 1);
  }

  // This function assumes that a fighter can actually be healed i.e this check is done elsewhere before any eth is taken
  function _healFighter(uint _fighterId, address _owner) internal {
    Fighter memory _fighter = fighters[_fighterId];
    _fighter.health = _fighter.maxHealth;
    Healed(_owner, _fighterId);
  }
}
