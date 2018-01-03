pragma solidity ^0.4.11;

import "../base/Ownable.sol";

contract MarketplaceConfig is Ownable {
  uint public marketplaceCut = 5;

  function setNewMarketplaceCut(uint _newCut) external onlyOwner {
    marketplaceCut = _newCut;
  }
}
