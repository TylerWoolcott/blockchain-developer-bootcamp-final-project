// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

///@title OpenAR Contract
///@author Tyler Woolcott
///@notice You can use this contract to mint and transfer AR NFTs 
contract OpenAR is ERC721("OpenAR", "ARNFT"), Ownable, Pausable, ReentrancyGuard, ERC721Enumerable, ERC721Burnable, ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct NftInfo {
      string NftURI;
      uint256 price;    // Price in wei
      uint256 purchasedNftCounter;
      mapping(address => bool) purchasedNfts;
  }

  mapping(uint256 => NftInfo) private _nftInfo;

  event NftPurchased(string NftURI, uint256 amount);

/// @notice pauses the contract. 
/// @dev Inherits _pause() function from Pausable.sol and the onlyOwner modifier from Ownable.sol
    function pause() public onlyOwner {
      _pause();
  }

/// @notice unpauses the contract. 
/// @dev Inherits _unpause() function from Pausable.sol and the onlyOwner modifier from Ownable.sol
    function unpause() public onlyOwner {
      _unpause();
  }

/// @dev tokenURI should have prefix http, https, ipfs or ar. For example, use ar://xyz
/// instead of https://arweave.net/xyz.  Emits Created with ID of NFT when completed.
/// @param _tokenURI URI of the json file containing the metadata in JSON format.  Should conform to the ERC721 Metadata JSON Schema
    function mint (string calldata _tokenURI, uint256 price, address payable owner) 
    external 
    whenNotPaused
  {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    NftInfo storage newNftInfo = _nftInfo[newTokenId];
    newNftInfo.price = price;
    _safeMint(owner, newTokenId);
    _setTokenURI (newTokenId, _tokenURI);
  }
  
/// @notice The stored information for a given NFT
/// @dev Throws if NFT with ID is not valid
/// @param tokenId Id of the NFT
/// @return URI of the NFT
/// @return owner of the NFT
    function getNftInfo (uint256 tokenId) external view returns (string memory URI, address owner, uint256 price) {
    require(_exists(tokenId), "NftInfo query for nonexistent tokenId");
    string memory _URI = super.tokenURI(tokenId);
    return (_URI, ownerOf(tokenId), _nftInfo[tokenId].price);
  } 
  
/// @notice Sends ETH to NFT owner
/// @dev Throws if ETH sent with contract is less than NFT price
/// @param tokenId Id of the NFT to purchase
  function purchaseNft(uint256 tokenId) external payable nonReentrant {
    require(_exists(tokenId), "purchaseNft query for nonexistent tokenId");
    require(msg.value >= _nftInfo[tokenId].price, "Not enough Eth to purchase");
    require(!_nftInfo[tokenId].purchasedNfts[msg.sender], "NFT already purchased");

    payable(ownerOf(tokenId)).transfer(msg.value);
      _nftInfo[tokenId].purchasedNfts[msg.sender] = true;
    emit NftPurchased(_nftInfo[tokenId].NftURI, msg.value);
  }
  
/// @notice Revert the transaction if it's failing
/// @dev `fallback` will fully revert the tx if there is no proper input or call
    fallback() external {
      revert();
    }

/// @notice The following functions are overrides required by Solidity.
/// @notice Conforms to the ERC721 metadata extension - https://eips.ethereum.org/EIPS/eip-721
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
      return super.tokenURI(tokenId);
  }

/// @notice As ERC721, ERC721Enumerable, and include _beforeTokenTransfer we need to override both.
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override(ERC721, ERC721Enumerable) {
      super._beforeTokenTransfer(from, to, amount);
  }

  /// @notice As ERC721 and ERC721Enumerable include supportsInterface we need to override both.
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
      return super.supportsInterface(interfaceId);
  }

  /// @notice As ERC721 and ERC721URIStorage include supportsInterface we need to override both.
    function _burn(uint256 tokenId) internal whenNotPaused override (ERC721, ERC721URIStorage)  {
      super._burn(tokenId);
  }
}