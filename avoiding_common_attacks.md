# Avoiding Common Attacks

## Specific Compiler Pragma

The contract code in this project uses a specific compiler version ^0.8.0

## Re-entrancy

Re-entrancy (SWC-107): I am defending against re-entrancy by using nonReentrant modifier on the ``purchaseNft`` function.

## Function Default Visibility 

Function Default Visibility (SWC-100): I specify my functions visibility, as those that don't would be public by default. For example, I don't want my ``mint`` function to be public, rather external because it is more gas efficient. For public functions Solidity immediately copies array arguments to memory, while external functions can read directly from calldata.

## Compiler Version

Outdated Compiler Version (SWC-102): I am using an updated compiler version (^0.8.0).