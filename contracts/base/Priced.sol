pragma solidity ^0.4.18;

contract Priced {
  modifier costs(uint price) {
    if (msg.value >= price) {
        _;
    }
  }
}
