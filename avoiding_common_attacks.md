My smart contract implments the following security measures:

Using specific compiler pragma: OpenAR uses pragma solidity ^0.8.0.

Re-entrancy (SWC-107): I am defending against re-entrancy by using nonReentrant modifier on the mint function.

Function Default Visibility (SWC-100): I specify my functions visibility, as those that don't would be public by default. For example, I don't want my _burn function to be public, rather internal.

Outdated Compiler Version (SWC-102): I am using an updated compiler version (^0.8.0).