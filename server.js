console.log("Server-side code running");

const express = require("express");
const keccak256 = require("keccak256");
const merkleTree = require("./setMerkleTree.js");

const app = express();

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
app.get("/retData/:account", async (req, res, next) => {
  try {
    let account = req.params.account;
    let leaf = keccak256(account);
    let proof = merkleTree.tree.getHexProof(leaf);
    res.send(proof);
  } catch (err) {
    res.send(err);
  }
});
