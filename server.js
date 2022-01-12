console.log("Server-side code running");

const express = require("express");
const keccak256 = require("keccak256");
const merkleTree = require("./setMerkleTree.js");

const app = express();

const tree = merkleTree.generateMerkleTree();

// serve files from the public directory
app.use(express.static("public"));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log("listening on 8080");
});

// serve the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// get Merkle Proof
app.get("/mint", async (req, res, next) => {
  try {
    let account = req.query.account;
    let amount = req.query.amount;
    let leaf = merkleTree.hashLeaf(account, amount);
    let proof = tree.getHexProof(leaf);
    res.send(proof);
  } catch (err) {
    res.send(err);
  }
});
