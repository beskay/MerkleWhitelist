// https://github.com/miguelmota/merkletreejs
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { ethers } = require("ethers");

// Map whitelisted address to amount
const whitelist = {
  "***REMOVED***": 4,
  "***REMOVED***": 1,
  "***REMOVED***": 2,
};

// hash account + amount via Soliditys keccak256 function
// see https://docs.ethers.io/v5/api/utils/hashing/#utils--solidity-hashing
function hashLeaf(account, amount) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}

// map over entries in object to generate leaf and merkletree
function generateMerkleTree() {
  const merkleTree = new MerkleTree(
    Object.entries(whitelist).map((entry) => hashLeaf(...entry)),
    keccak256,
    { sortPairs: true }
  );
  console.log(merkleTree.getHexRoot());
  return merkleTree;
}

module.exports = { generateMerkleTree, hashLeaf };
