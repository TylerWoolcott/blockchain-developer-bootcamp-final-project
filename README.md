# OpenAR

This is a final project for Consensys Blockchain Developer Bootcamp 2021. It is deployed on Ropsten at [0xdF41435F04AfF150e247ee3DFE55f25E03cc9ED0](https://ropsten.etherscan.io/address/0xdF41435F04AfF150e247ee3DFE55f25E03cc9ED0).

Link to the frontend website hosted on Vercel: 
https://frontend-nqk4sxecp-tylerwoolcott.vercel.app/

My public Ethereum mainet Account (for NFT certificate): [0x4CF10E2B109389189a3FC334cf2aFcB7383b3df0](https://etherscan.io/address/0x4CF10E2B109389189a3FC334cf2aFcB7383b3df0)

## Table of Contents

- [About the Project](#about-the-project)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Deployment](#deployment)

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

The root directory of the project contains the following sub-directories:

- client: contains all the frontend code, including all dependencies and configuration.
- contracts: contains all the solidity code. 
- migrations: contains the migration scripts for deploying solidity contracts to the blockchain.
- node_modules: contains all smart contract dependencies.
- tests: contains the smart contract unit tests (written in Javascript). 
- design patterns: `design_pattern_decisions.md` 
- avoiding common attacks: ``avoiding_common_attacks.md`` 
- deployed contract address and testnet: `deployed_address.txt` 

## Installation 

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
3. Optional: install [Ganache](https://www.trufflesuite.com/ganache) - you can use any blockchain emulator, but I will be using Ganache in the installation instructions
4. Install [MetaMask](https://metamask.io/)

## Deployment

To start the dapp locally requires two separate tasks:

- Starting the frontend

- Deploying the smart contract to either a development blockchain or a testnet such as Ropsten.

### Starting the frontend

Navigate to the client directory:

``cd client``

Install the dependencies

``npm install``

Start the application

``npm run start``

In the browser, visit:

``localhost:3000``

### Deploying the smart contract

In a new terminal, navigate to the project root and install the projects dependencies

``npm install``

Also install ganache-cli

``npm install -g ganache-cli``

### Deploying to a local development network

Start a local development blockchain on port 8545 by running:

``gananche_cli``

Deploy the contract

``truffle migrate --network development --reset``

**Important**: After redeploying you will need to add the new address of OpenAR contract to ``App.js`` (line 6). The newly generated ABI file can be copied to ``src > utils > OpenAR.json``

### Deploying to the Ropsten testnet
Use the the ``.env.sample`` file to create a ``.env`` file in the projects root directory and add the following:

- Your metamask seed
- Infura Websocket URL including API key.

Example:

``MNEMONIC="Your mnemonic here"``
``INFURA_URL="wss://ropsten.infura.io/ws/v3/a87687a687ddgy8686sss"``

Then deploy the contract

``truffle migrate --network ropsten --reset``

**Important**: After redeploying you will need to add the new address of OpenAR contract to ``App.js`` (line 6). The newly generated ABI file can be copied to ``src > utils > OpenAR.json``

### Running the test suite

If not done already, start a local development blockchain on port 8545 by running:

``gananche_cli``

To run the test suite simply enter the following command:

``truffle test``


