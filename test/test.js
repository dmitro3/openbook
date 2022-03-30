const { expect } = require("chai");
const { ethers } = require("hardhat");

it("Basic", async function () {
    const [owner] = await ethers.getSigners();
    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liq = await Liquidity.deploy();
    await liq.deployed();

    const balance = await liq.balanceOf(owner.address,2)
    console.log(balance);



    

})