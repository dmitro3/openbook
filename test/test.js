const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./config")

let daiContract = new ethers.Contract(DAI_ADDY,erc20ABI);

describe('Contract tests', () => {
    const FUND_AMOUNT = (BigInt(200000)*BigInt(10**18)).toString()
    let owner;
    let liq;
    let DAI;
    let USER_DAI;

    before('Deploy Contract and Transfer Tokens', async () => {
        //get signer
        [owner] = await ethers.getSigners();

        //Deploy the contracts
        const Liquidity = await ethers.getContractFactory("Liquidity");
        liq = await Liquidity.deploy(DAI_ADDY);
        await liq.deployed();  
        console.log("Liquidity Contract Deployed at " + liq.address);



        //Transfer from a whale to our account to run tests
        const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);


        DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);
        USER_DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, owner);

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
    })
    

    it("Add Liquidity", async function () {
        amt = 10
        await USER_DAI.approve(liq.address, amt);
        await liq.addLiquidity(amt);

        bal = await liq.balanceOf(owner.address, 0);

        expect(await liq.balanceOf(owner.address, 0)).to.equal(amt);
        expect(await DAI.balanceOf(liq.address)).to.equal(amt);
    })

    it("Make bet", async function () {
        
    })

})