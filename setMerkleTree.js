// https://github.com/miguelmota/merkletreejs
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// Add all whitelisted addresses here
const leaves = [
  "ADDRESS1",
  "ADDRESS2",
  "ADDRESS3",
].map((x) => keccak256(x));

// generate merkletree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getHexRoot();

console.log(`MerkleTree Root: ${root}`);

module.exports = { tree, root };
