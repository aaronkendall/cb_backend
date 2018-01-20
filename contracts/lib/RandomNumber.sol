pragma solidity ^0.4.18;

library RandomNumber {
  function randomNum(uint seed) internal returns (uint) {
    uint _number = (uint(keccak256(block.blockhash(block.number-1), seed))%100);
    if (_number == 0) {
      _number = 1;
    }

    return _number;
  }

  function rand1To10(uint seed) internal returns (uint) {
    uint _number = (uint(keccak256(block.blockhash(block.number-1), seed))%10);
    if (_number == 0) {
      _number = 1;
    }

    return _number;
  }

  function randDecimal(uint seed) internal returns (uint) {
    return (rand1To10(seed) / 10);
  }
}
