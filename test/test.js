const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "0x773616e4d11a78f511299002da57a0a94577f1f4";

it("Basic", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liq = await Liquidity.deploy(DAI);
    await liq.deployed();
})