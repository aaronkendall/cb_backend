pragma solidity ^0.4.18;

import "../base/Ownable.sol";

contract MarketplaceConfig is Ownable {
  uint public marketplaceCut = 5;

  function setNewMarketplaceCut(uint _newCut) external onlyOwner {
    marketplaceCut = _newCut;
  }

  function withdrawBalance() external onlyOwner {
    owner.transfer(this.balance);
  }

  function withdrawBalanceToAddress(address _recipient) external onlyOwner {
    _recipient.transfer(this.balance);
  }

  function killConract() external onlyOwner {
    selfdestruct(owner);
  }
}
