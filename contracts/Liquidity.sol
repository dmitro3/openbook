pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Liquidity is ERC1155{

    uint24 public constant AMOUNT = 0;
    uint24 public constant FEES = 1;
    uint24 public constant BLOCK = 2;


   constructor() public ERC1155(""){
       _mint(msg.sender, AMOUNT, 10**18, "");
       _mint(msg.sender, FEES, 0, "");
       _mint(msg.sender, BLOCK, block.number, "");
    }

}