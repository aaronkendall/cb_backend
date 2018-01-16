pragma solidity ^0.4.18;

import "../lib/RandomNumber.sol";

import "../base/ERC721.sol";
import "../base/ERC721Metadata.sol";
import "../base/Priced.sol";
import "./FighterConfig.sol";
import "./FighterBase.sol";
import "./FighterTraining.sol";

contract FighterOwnership is FighterConfig, FighterBase, FighterTraining, ERC721, Priced {

    /// @notice Name and symbol of the non fungible token, as defined in ERC721.
    string public constant name = "CryptoBrawlers";
    string public constant symbol = "BRWL";

    // The contract that will return fighter metadata
    ERC721Metadata public erc721Metadata;

    bytes4 constant InterfaceSignature_ERC165 =
        bytes4(keccak256('supportsInterface(bytes4)'));

    bytes4 constant InterfaceSignature_ERC721 =
        bytes4(keccak256('name()')) ^
        bytes4(keccak256('symbol()')) ^
        bytes4(keccak256('totalSupply()')) ^
        bytes4(keccak256('balanceOf(address)')) ^
        bytes4(keccak256('ownerOf(uint256)')) ^
        bytes4(keccak256('approve(address,uint256)')) ^
        bytes4(keccak256('transfer(address,uint256)')) ^
        bytes4(keccak256('transferFrom(address,address,uint256)')) ^
        bytes4(keccak256('tokensOfOwner(address)')) ^
        bytes4(keccak256('tokenMetadata(uint256,string)'));

    /// @notice Introspection interface as per ERC-165 (https://github.com/ethereum/EIPs/issues/165).
    ///  Returns true for any standardized interfaces implemented by this contract. We implement
    ///  ERC-165 (obviously!) and ERC-721.
    function supportsInterface(bytes4 _interfaceID) external view returns (bool)
    {
      // DEBUG ONLY
      //require((InterfaceSignature_ERC165 == 0x01ffc9a7) && (InterfaceSignature_ERC721 == 0x9a20483d));

      return ((_interfaceID == InterfaceSignature_ERC165) || (_interfaceID == InterfaceSignature_ERC721));
    }

    /// @dev Set the address of the sibling contract that tracks metadata.
    ///  CEO only.
    function setMetadataAddress(address _contractAddress) public {
      erc721Metadata = ERC721Metadata(_contractAddress);
    }

    // Internal utility functions: These functions all assume that their input arguments
    // are valid. We leave it to public methods to sanitize their inputs and follow
    // the required logic.

    /// @dev Checks if a given address is the current owner of a particular fighter.
    /// @param _claimant the address we are validating against.
    /// @param _tokenId fighter id, only valid when > 0
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
      return fighterIdToOwner[_tokenId] == _claimant;
    }

    /// @dev Checks if a given address currently has transferApproval for a particular fighter.
    /// @param _claimant the address we are confirming kitten is approved for.
    /// @param _tokenId fighter id, only valid when > 0
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
      return fighterIdToApproved[_tokenId] == _claimant;
    }

    /// @dev Marks an address as being approved for transferFrom(), overwriting any previous
    ///  approval. Setting _approved to address(0) clears all transfer approval.
    ///  NOTE: _approve() does NOT send the Approval event.
    function _approve(uint256 _tokenId, address _approved) internal {
      fighterIdToApproved[_tokenId] = _approved;
    }

    /// @notice Returns the number of Fighters owned by a specific address.
    /// @param _owner The owner address to check.
    /// @dev Required for ERC-721 compliance
    function balanceOf(address _owner) public view returns (uint256 count) {
      return fighterCountForOwner[_owner];
    }

    /// @notice Transfers a Fighter to another address. If transferring to a smart
    /// contract be VERY CAREFUL to ensure that it is aware of ERC-721.
    /// @param _to The address of the recipient, can be a user or contract.
    /// @param _tokenId The ID of the fighter to transfer.
    /// @dev Required for ERC-721 compliance.
    function transfer(address _to, uint256 _tokenId) external {
      // Safety check to prevent against an unexpected 0x0 default.
      require(_to != address(0));
      // Disallow transfers to this contract to prevent accidental misuse.
      require(_to != address(this));
      // Disallow transfers to the auction contracts to prevent accidental
      // You can only send your own fighter.
      require(_owns(msg.sender, _tokenId));

      // Reassign ownership, clear pending approvals, emit Transfer event.
      _transfer(msg.sender, _to, _tokenId);
    }

    /// @notice Grant another address the right to transfer a specific fighter via
    ///  transferFrom(). This is the preferred flow for transfering NFTs to contracts.
    /// @param _to The address to be granted transfer approval. Pass address(0) to
    ///  clear all approvals.
    /// @param _tokenId The ID of the fighter that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function approve(address _to, uint256 _tokenId) external {
      // Only an owner can grant transfer approval.
      require(_owns(msg.sender, _tokenId));

      // Register the approval (replacing any previous approval).
      _approve(_tokenId, _to);

      // Emit approval event.
      Approval(msg.sender, _to, _tokenId);
    }

    /// @notice Transfer a fighter owned by another address, for which the calling address
    ///  has previously been granted transfer approval by the owner.
    /// @param _from The address that owns the fighter to be transfered.
    /// @param _to The address that should take ownership of the fighter. Can be any address,
    ///  including the caller.
    /// @param _tokenId The ID of the fighter to be transferred.
    /// @dev Required for ERC-721 compliance.
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
      // Safety check to prevent against an unexpected 0x0 default.
      require(_to != address(0));
      // Disallow transfers to this contract to prevent accidental misuse.
      require(_to != address(this));
      // Check for approval and valid ownership
      require(_approvedFor(msg.sender, _tokenId));
      require(_owns(_from, _tokenId));

      // Reassign ownership (also clears pending approvals and emits Transfer event).
      _transfer(_from, _to, _tokenId);
    }

    /// @notice Returns the total number of fighters currently in existence.
    /// @dev Required for ERC-721 compliance.
    function totalSupply() public view returns (uint) {
        return fighters.length;
    }

    /// @notice Returns the address currently assigned ownership of a given fighter.
    /// @dev Required for ERC-721 compliance.
    function ownerOf(uint256 _tokenId)
        external
        view
        returns (address owner)
    {
        owner = fighterIdToOwner[_tokenId];

        require(owner != address(0));
    }

    function getFightersForAddress(address _owner) constant external returns(uint256[]) {
      return ownedFighters[_owner];
    }

    /// @notice Returns a list of all Fighter IDs assigned to an address.
    /// @param _owner The owner whose Fighters we are interested in.
    // This is mega expensive, make sure it's only being called from web3
    function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
          // Return an empty array
          return new uint256[](0);
        } else {
          uint256 resultIndex = 0;
          uint256 totalFighters = totalSupply();
          uint256[] memory result = new uint256[](tokenCount);

          uint fighterId;
          for (fighterId = 1; fighterId <= totalFighters; fighterId++) {
            if (fighterIdToOwner[fighterId] == _owner) {
              result[resultIndex] = fighterId;
              resultIndex++;
            }
          }

          return result;
        }
    }

    /// @dev Adapted from memcpy() by @arachnid (Nick Johnson <arachnid@notdot.net>)
    ///  This method is licenced under the Apache License.
    ///  Ref: https://github.com/Arachnid/solidity-stringutils/blob/2f6ca9accb48ae14c66f1437ec50ed19a0616f78/strings.sol
    function _memcpy(uint _dest, uint _src, uint _len) private view {
        // Copy word-length chunks while possible
        for(; _len >= 32; _len -= 32) {
            assembly {
                mstore(_dest, mload(_src))
            }
            _dest += 32;
            _src += 32;
        }

        // Copy remaining bytes
        uint256 mask = 256 ** (32 - _len) - 1;
        assembly {
            let srcpart := and(mload(_src), not(mask))
            let destpart := and(mload(_dest), mask)
            mstore(_dest, or(destpart, srcpart))
        }
    }

    /// @dev Adapted from toString(slice) by @arachnid (Nick Johnson <arachnid@notdot.net>)
    ///  This method is licenced under the Apache License.
    ///  Ref: https://github.com/Arachnid/solidity-stringutils/blob/2f6ca9accb48ae14c66f1437ec50ed19a0616f78/strings.sol
    function _toString(bytes32[4] _rawBytes, uint256 _stringLength) private view returns (string) {
        var outputString = new string(_stringLength);
        uint256 outputPtr;
        uint256 bytesPtr;

        assembly {
            outputPtr := add(outputString, 32)
            bytesPtr := _rawBytes
        }

        _memcpy(outputPtr, bytesPtr, _stringLength);

        return outputString;
    }

    /// @notice Returns a URI pointing to a metadata package for this token conforming to
    ///  ERC-721 (https://github.com/ethereum/EIPs/issues/721)
    /// @param _tokenId The ID number of the fighter whose metadata should be returned.
    function tokenMetadata(uint256 _tokenId, string _preferredTransport) external view returns (string infoUrl) {
        require(erc721Metadata != address(0));
        bytes32[4] memory buffer;
        uint256 count;
        (buffer, count) = erc721Metadata.getMetadata(_tokenId, _preferredTransport);

        return _toString(buffer, count);
    }

    function healFighter(uint _fighterId) external payable costs(trainingCost) {
      require(_owns(msg.sender, _fighterId));
      _heal(_fighterId);
    }

    function trainFighter(uint _fighterId, string _attribute, uint _seed) external payable costs(trainingCost) returns (uint) {
      require(_owns(msg.sender, _fighterId));
      uint _attributeIncrease = (RandomNumber.rand1To10(_seed) / trainingFactor);
      _train(_fighterId, _attribute, _attributeIncrease);
      return _attributeIncrease;
    }

    function searchForFighter(uint _seed) external returns (bool fighterFound) {
      uint randomNum = RandomNumber.randomNum(_seed);

      if (randomNum % chanceOfFighterCreation == 0) {
        uint _speed = RandomNumber.rand1To10(_seed);
        uint _strength = RandomNumber.rand1To10(_seed);
        _createFighter(10, _speed, _strength, msg.sender);
        FighterFound(true);
        return true;
      }
      FighterFound(false);
      return false;
    }

    function ownerCreation(address _recipient, uint _seed) external onlyOwner {
      uint _speed = RandomNumber.rand1To10(_seed);
      uint _strength = RandomNumber.rand1To10(_seed);
      _createFighter(10, _speed, _strength, _recipient);
    }

    function customOwnerCreation(address _recipient, uint _maxHealth, uint _speed, uint _strength) external onlyOwner {
      _createFighter(_maxHealth, _speed, _strength, _recipient);
    }
}
