# OpenAR

This is a final project for Consensys Blockchain Developer Bootcamp 2021. It is deployed on Ropsten at [0x208615C86b560D4A5fe5e40F75828e3761B08d28](https://ropsten.etherscan.io/address/0x208615C86b560D4A5fe5e40F75828e3761B08d28).

My public Ethereum Account: [0x4CF10E2B109389189a3FC334cf2aFcB7383b3df0](https://etherscan.io/address/0x4CF10E2B109389189a3FC334cf2aFcB7383b3df0)

## Table of Contents

- [About the Project](#about-the-project)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Deployment](#deployment)
- [Documentation](#documentation)

## About the Project

### Problem Statement

Today Augmented Reality experiences are only accessible through siloed proprietary apps (eg. Instagram, TikTok). Creating AR content for social media 2.0 is quick and easy (eg. Lens Studio for Snapchat, Spark AR for Instagram) but it’s useless outside the app. Currently, AR NFT creators tend to send the AR component as a separate file (unlockable), which means no one else other than the collector can enjoy it, even though its ownership is secured on the blockchain. As such, AR remains a niche player in the NFT space. However, the viral success of AR face filters on closed social networks like Snapchat proves there is huge untapped potential for AR NFTs.


### Workflow

Alice wants to mint and interact with an augmented reality NFT and be able to transfer it to Bob. 

Actual workflow:

Alice goes in the web UI and submits a request through MetaMask to mint an AR NFT. Inputs include:

- Uniform Resource Identifier (URI) as a string
- Sale price 
- Address of Account Owner 

The smart contract mints an NFT to the Account Owner's Address.

Alice can then also transfer an NFT she owns to Bob's account. Inputs include: 

- From Account
- To Account
- TokenId

The smart contract transfers the NFT from Alice to Bob. 

Alice and Bob can check their NFT balance and also who owns a particular NFT by entering its TokenId. 

## Directory Structure

The project was bootstrapped from [Create React App](https://reactjs.org/docs/getting-started.html). The ``client/`` folder contains the React frontend app, everything outside of this folder contains the smart contract code. Note, that the smart contract code has its own ``package.json`` and ``node_modules/`` for the smart contract's dependencies (which are different from the ones inside of ``client/``). The ``test/`` folder contains the smart contract tests.

The most notable component of the ``client/src/`` folder is ``client/src/utils`` - the ABI for the smart contract and dependencies.

## Installation and Testing

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
3. Optional: install [Ganache](https://www.trufflesuite.com/ganache) - you can use any blockchain emulator, but I will be using Ganache in the installation instructions
4. Install [MetaMask](https://metamask.io/)

### Smart Contract

### Frontend

1. Clone this repo and `cd` into the cloned `blockchain-developer-bootcamp-final-project/client`
2. `npm i` - installs the dependencies for the fronted
3. `npm run start`
4. Go to `http://localhost:3000` in your browser. 

## Deployment

### Smart Contract

The instructions are walking through the deployment of the contract to Ropsten via [Infura](https://infura.io/). 
1. Create an `.env` file inside `blockchain-developer-bootcamp-final-project`. 
2. Copy the contents of `.env.sample` to `.env` 
3. Pick an address that is going to deploy the contract (and make sure that address has funds) and fill out its mnemonic in the `MNEMONIC` variable in the .env file. 
4. Create an Infura account - follow [these](https://blog.infura.io/getting-started-with-infura-28e41844cc89/) directions up to and including Step 2. Then under endpoints you will see a URL of the format `https://<network>.infura.io/v3/YOUR-PROJECT-ID`. Select ROSTEN in the "Endpoints" dropdown if you are following along this example. Copy tha URL in the `INFURA_URL`variable. 
5. In `blockchain-developer-bootcamp-final-project/truffle-config.js` uncomment lines 2 - 7 and 19-25. In this patricular case we will be deploying the contract to Ropsten, but it is fairly straightforward to deploy the contract to other Testnets or Mainnet. 
6. Run `truffle migrate --network ropsten` 

## Documentation 

Design Patterns and Avoiding Common Attacks: 
- Refer to: `avoiding_common_attacks.md` and `design_pattern_decisions.md` files in project root directory.

Deployed contract address and testnet:
- Refer to: `deployed_address.txt` file in project root directory.

**DO NOT UPLOAD SENSITIVE INFORMATION TO GITHUB OR A PUBLIC SITE!** 