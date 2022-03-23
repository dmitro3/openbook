const { expect } = require("chai");
const { ethers } = require("hardhat");

it("Check that all is good", async function () {
    const OpenBook = await ethers.getContractFactory("OpenBook");
    const obook = await OpenBook.deploy("Come and gamble");
    await obook.deployed();
})