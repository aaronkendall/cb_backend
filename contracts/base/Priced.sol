pragma solidity ^0.4.11;

contract Priced {
  modifier costs(uint price) {
    if (msg.value >= price) {
        _;
    }
  }
}
