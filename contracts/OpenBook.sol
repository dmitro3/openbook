pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract OpenBook{

    constructor(string memory _test){
        console.log("Deploying", _test);
    }
}