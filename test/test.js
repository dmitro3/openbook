const { expect } = require("chai");
const { ethers } = require("hardhat");

it("Basic", async function () {
    const OpenBook = await ethers.getContractFactory("OpenBook");
    const obook = await OpenBook.deploy();
    await obook.deployed();

    const odds = await obook.getOdds();
    console.log(odds);
})