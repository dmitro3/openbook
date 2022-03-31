const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./config")

let daiContract = new ethers.Contract(DAI_ADDY,erc20ABI);



it("Token Transfer", async function () {
    const FUND_AMOUNT = (BigInt(200000)*BigInt(10**18)).toString()

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Liquidity = await ethers.getContractFactory("Liquidity");
    const liq = await Liquidity.deploy(DAI_ADDY);
    await liq.deployed();  
    
    console.log("Contract Deployerd at " + liq.address);

    // await liq.addLiquidity("");
    const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);

    let DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);



    await DAI.transfer("0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9", FUND_AMOUNT, {
            from: WHALE_ADDY,
        });


    await DAI.transfer(owner.address, FUND_AMOUNT, {
        from: WHALE_ADDY,
        });

    await whale_signer.sendTransaction({
            to: "0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9",
            value: ethers.utils.parseEther("1.0")
        });
    
    await whale_signer.sendTransaction({
        to: owner.address,
        value: ethers.utils.parseEther("1.0")
    });

    expect(await liq.getAddress()).to.equal(owner.address);


    await liq.addLiquidity(10);
    console.log("Minted");
})