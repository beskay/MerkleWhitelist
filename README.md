# Whitelist using a MerkleTree

Simple code template to whitelist addresses using a merkletree and calling the mint function via MetaMask and ethers.js

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
If not, just comment the stuff out where you need an API key in hardhat.config.js.

## Installation

Start by cloning this repo and run
```
npm install
```
Add all addresses you want to whitelist in setMerkleTree.js

### Backend

Start your backend server
```
nodemon server.js
```
It should show you your MerkleTree root in the console, you will need that later

### Hardhat
cd to your hardhat directory and start a local hardhat node
```
npx hardhat node
```
Start hardhat console
```
npx hardhat console --network localhost
```
Deploy MerkleTree.sol via hardhat console
```
Contract = await ethers.getContractFactory("MerkleTree");
contract = await Contract.deploy("Name", "Symbol", "YOUR_MERKLE_ROOT");
```
It should deploy your contract to
```
0x04C89607413713Ec9775E14b954286519d836FEf 
```
If not, change contract address to the correct one in client.js

#### Funding your account
To fund your localhost account with ether
```
await network.provider.send("hardhat_setBalance", [ "YOUR_ACCOUNT_ADDRESS", "0x1000000000000000000",]);
```
## Interact with MerkleTree.sol
- Set your MetaMask network to Localhost
- Open http://localhost:8080/
- Open the Browser console to see if any errors come up
- Click on CONNECT, you should see your account address in the browser console
- Call smart contract, if your address is whitelisted MetaMask should pop up, if not, you should see an error in the console

