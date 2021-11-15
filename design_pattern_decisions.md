My smart contract implements the following design patterns:

Inheritance and Interfaces: I am importing and using functions and modifiers from Ownable and ReentrancyGuard, OpenZeppelin's abstract contracts.

Access Control Design Patterns: my mint function is callable only by the contract owner. I using Ownable to enforce this.