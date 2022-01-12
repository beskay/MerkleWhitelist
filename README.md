# Whitelist using a Merkle tree

Version 2 of the Merkle tree whitelist template. Each whitelisted address can claim a specific amount of NFTs, e.g. Address 1 can claim 2 NFTs, Address 2 can claim 5 NFTs and so on.

Mint function is being called with MetaMask and ethers.js. Express.js is used as backend.

![Merkle](https://blog.ethereum.org/wp-content/uploads/2015/11/merkle.png "Merkle")

## Prerequisites

Add localhost network to MetaMask

```
Name: Localhost 8545
RPC-URL: http://localhost:8545
Chain ID: 1337
Currency Symbol: ETH
```

If you want to deploy the contract to Rinkeby, or fork the ETH mainnet for testing, create a .env file in the hardhat directory and include the neccessary API Keys.

```
API_MAINNET = "YOUR_MAINNET_API_KEY"
API_RINKEBY = "RINKEBY_API_KEY"
...
```

If not, just comment the stuff out (or delete it) where you need an API key in hardhat.config.js. If you dont do this, you wont be able to start a hardhat node.

## Installation

Clone this repo and run

```
npm install
```

In the root and hardhat directory

### Backend

Add all addresses with the specific token amount you want to whitelist in setMerkleTree.js

```
const whitelist = {
  "0x1337ABC": 4,
  "0xabcdefg": 1,
  "0x123456": 2,
};
```

Start your backend server

```
nodemon server.js
```

It should show you your MerkleTree root in the console, you will need that later for contract deployment

### Hardhat

Open another terminal, cd to your hardhat directory and start a local hardhat node

```
npx hardhat node
```

Open a third terminal instance and start the hardhat console

```
npx hardhat console --network localhost
```

In the hardhat console, deploy MerkleTree.sol

```
Contract = await ethers.getContractFactory("MerkleTree");
contract = await Contract.deploy("Name", "Symbol", "YOUR_MERKLE_ROOT");
```

You will see the deployed contract address in your console. Update the contract address in client.js to the correct one!

#### Funding your account

To fund your localhost account with ether

```
await network.provider.send("hardhat_setBalance", [ "YOUR_ACCOUNT_ADDRESS", "0x1000000000000000000",]);
```

After executing that command in your hardhat console, reload your MetaMask (e.g. by switching the network from localhost to mainnet and back to localhost). MetaMask doesnt update balances automatically.

## Interact with MerkleTree.sol

- Set your MetaMask network to Localhost
- Open http://localhost:8080/
- Open the Browser console to see if any errors come up
- Click on CONNECT, you should see your account address in the browser console
- Enter the correct amount and click "Mint", if your address is whitelisted MetaMask should pop up, if not, you should see an error in the console

If the minting worked, you should see a log of the transfer event in your browser console.
To see your minted NFT in your wallet, click on "Import Tokens" in MetaMask and add the contract address

## Common errors

If you restart your local hardhat node and try to mint with the same MetaMask account, you will get an invalid nonce error. The cached transaction history in Metamask does not match the network’s history. To fix this, reset your MetaMask account or change the accounts nonce in your hardhat network by running this command in your hardhat console:

```
await network.provider.send("hardhat_setNonce", [
  "YOUR_ACCOUNT",
  "0x4",
]);
```

In the above example the nonce is set to 4.

## Useful resources

This here is an interesting article about MerkleProofs
https://evosnails.medium.com/how-to-use-a-merkle-tree-for-large-whitelist-mints-2d48fd12577e

OpenZeppelin MerkleProof Contract
https://docs.openzeppelin.com/contracts/4.x/api/utils#MerkleProof

General info about Merkle trees
https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/
