// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree is ERC721 {
    uint256 mintIndex;
    bytes32 immutable public root;

    constructor(string memory name, string memory symbol, bytes32 merkleroot)
    ERC721(name, symbol)
    {
        root = merkleroot;
    }

    function claim(address account, uint256 amount, bytes32[] calldata proof)
    external
    {
        require(_verify(_leaf(account, amount), proof), "Invalid merkle proof");
        
        for(uint i = 0; i < amount; i++) {
            _safeMint(account, mintIndex);
            mintIndex += 1;
        }
    }

    function _leaf(address account, uint256 amount)
    internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account, amount));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof)
    internal view returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }
}