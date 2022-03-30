const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI, WHALE, erc20ABI } = require("./config")
const IERC20 = artifacts.require("IERC20")

let daiErc20Contract = new ethers.Contract(DAI,erc20ABI);

it("Token Transfer", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liq = await Liquidity.deploy(DAI);


    await liq.deployed();

    

    // await liq.addLiquidity("");
    const whale = await ethers.provider.getSigner(WHALE)

})