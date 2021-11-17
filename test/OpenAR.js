const OpenAR = artifacts.require("OpenAR");
const { BN, constants, expectEvent, expectRevert, balance } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

// Generating and assigning a list of accounts to test against

contract("OpenAR", function (accounts) {
  const assets = [{
    owner: accounts[1],
    tokenURI: "https://www.arweave-test.xyz/metadataA.json",
    assetURI: "https://www.arweave-test.xyz/imageB.jpg",
    price: new BN(web3.utils.toWei('0.001'))
  },{
    owner: accounts[5],
    tokenURI: "https://arweave-test.xyz/metadataB.json",
    assetURI: "https://www.arweave-test.xyz/imageC.jpg",
    price: new BN(web3.utils.toWei('0.001'))    
  },{
    owner: accounts[1],
    tokenURI: "https://www.arweave-test.xyz/metadata2.json",
    assetURI: "https://www.arweave-test.xyz/image2.jpg",
    price: new BN(web3.utils.toWei('0.001'))    
  },{
    owner: accounts[1],
    tokenURI: "https://www.arweave-test.xyz/metadata3.json",
    assetURI: "https://arweave-test.xyz/image3.jpg",
    price: new BN(web3.utils.toWei('0.001'))    
  }];
  const NFTName = 'OpenAR';
  const NFTSymbol = 'ARNFT';
  const invalidTokenId = 20;
  let OpenARInstance;
  
  // deploy test contract 
  beforeEach(async function() {
    OpenARInstance = await OpenAR.deployed();
  });

    describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await OpenAR.deployed();
      await assert.isTrue(true);
    });
    it("contract should not be paused upon deployment", async () => {
      assert.isFalse(
        await OpenARInstance.paused(),
        "contract should not be paused upon deployment");
    });
  });

  // test mint function 
  describe("mint", function() {
    it("should mint a new NFT and emit transfer event when NFT is created (`from` == 0)", async function () {
      const retCreate = await OpenARInstance.mint(assets[0].tokenURI, assets[0].price, assets[0].owner, { from: assets[0].owner });
      assets[0].tokenId = retCreate.logs[0].args.tokenId; // Save the token ID for use in future tests
      expectEvent(retCreate, 'Transfer', { from: ZERO_ADDRESS, to: assets[0].owner, tokenId: assets[0].tokenId });
    });
  });

  // test that metadata URI can be read 
  describe("ERC721: Metadata", function() {
    it("tokenURI should return metadata URI", async function() {
      assert.equal(await OpenARInstance.tokenURI.call(assets[0].tokenId, { from: accounts[2] }), assets[0].tokenURI, "tokenURI should be returned");
    });

    // test return name
    it("name should return the NFT name", async function() {
      assert.equal(await OpenARInstance.name.call({ from: accounts[2] }), NFTName, "name should be returned");
    });

       // test return symbol
    it("should return the NFT symbol", async function() {
      assert.equal(await OpenARInstance.symbol.call({ from: accounts[2] }), NFTSymbol, "symbol should be returned");
    });
  });

  // test owner's balance 
  describe("ERC721: balanceOf", function() {
    it("should return count of NFT's owner", async function() {
      assert.equal(await OpenARInstance.balanceOf.call(assets[0].owner, { from: accounts[2] }), 1, "number of NFTs returned should be correct");
    });
    it("should return zero if no NFTs owned", async function() {
      assert.equal(await OpenARInstance.balanceOf.call(accounts[2] , { from: accounts[2] }), 0, "number of NFTs returned should be correct");
    });
  });
  describe("ERC721: ownerOf", function() {
    it("should return the correct NFT owner", async function() {
      assert.equal(await OpenARInstance.ownerOf.call(assets[0].tokenId, { from: accounts[2] }), assets[0].owner, "Owner should be returned");
    });
  });

  describe("ERC721: getApproved", function() {
    it("Returns zero address if no approver.", async function() {
      assert.equal(await OpenARInstance.getApproved.call(assets[0].tokenId , { from: accounts[2] }), ZERO_ADDRESS, "Should return zero address if no approver");
    });
  });

  describe("ERC721: transferFrom/safeTransferFrom", function() {
    it("transfers the ownership of an NFT if `msg.sender` is the current owner", async function() {
      // Mint a new NFT for these tests
      const retCreate = await OpenARInstance.mint(assets[2].tokenURI, assets[2].price, assets[2].owner, { from: assets[2].owner });
      assets[2].tokenId = retCreate.logs[0].args.tokenId; // Save the token ID for use in future tests

      // Test safeTransferFrom
      await OpenARInstance.safeTransferFrom(assets[2].owner, accounts[6], assets[2].tokenId, { from: assets[2].owner });
      assert.equal(await OpenARInstance.ownerOf.call(assets[2].tokenId, { from: accounts[2] }), accounts[6], "safeTransferFrom should transfer to new owner");

      // Test transferFrom by transfering back
      await OpenARInstance.transferFrom(accounts[6], assets[2].owner, assets[2].tokenId, { from: accounts[6] });
      assert.equal(await OpenARInstance.ownerOf.call(assets[2].tokenId, { from: accounts[2] }), assets[2].owner, "transferFrom should transfer to new owner");
    });
  });

  // test pausing the contract
  describe("Pausing the contract", () => {
    
    it("only owner should be able to pause the contract", async () => {});
  });

  // test Nft supply is enumerable 
  describe("ERC721: Enumerable", function() {
    let totalSupply;
    it("totalSupply returns a count of valid NFTs tracked by this contract", async function() {
      totalSupply = (await OpenARInstance.totalSupply.call({ from: accounts[2] })).toNumber();
      assert.equal(totalSupply, 2, 'Totalsupply should equal 2');
    });
  });
});


