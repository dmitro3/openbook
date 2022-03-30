const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./config")

let daiContract = new ethers.Contract(DAI_ADDY,erc20ABI);



it("Token Transfer", async function () {
    const FUND_AMOUNT = (BigInt(2)*BigInt(10**16)).toString()

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liq = await Liquidity.deploy(DAI_ADDY);
    await liq.deployed();  
    
    console.log("Contract Deployerd at " + liq.address);

    // await liq.addLiquidity("");
    const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);

    let DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);
    let balance = await DAI.balanceOf(WHALE_ADDY)  / 1e18;

    await DAI.transfer(liq.address, FUND_AMOUNT, {
            from: WHALE_ADDY,
          });

    console.log("Whale Balance: " + balance)
    // await DAI.mint(owner, ethers.utils.parseEther('10000'))

    // await

})