const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./config")

let daiContract = new ethers.Contract(DAI_ADDY,erc20ABI);

describe('Contract tests', () => {
    const FUND_AMOUNT = (BigInt(10000)*BigInt(10**18)).toString()
    let owner;
    let liq;
    let bet;

    let DAI;
    let USER_DAI;

    before('Deploy Contract and Transfer Tokens', async () => {
        //get signer
        [owner] = await ethers.getSigners();

        //Deploy the contracts
        const Liquidity = await ethers.getContractFactory("Liquidity");
        liq = await Liquidity.deploy(DAI_ADDY);
        await liq.deployed();  

        const Bet = await ethers.getContractFactory("Bet");
        bet = await Bet.deploy(DAI_ADDY);
        await bet.deployed();  


        console.log("Liquidity Contract Deployed at " + liq.address);
        console.log("Bet Contract Deployed at " + bet.address);

        //Transfer from a whale to our account to run tests
        const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);


        DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);
        USER_DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, owner);

        await DAI.transfer(owner.address, FUND_AMOUNT, {
            from: WHALE_ADDY,
            });

        
        await whale_signer.sendTransaction({
            to: owner.address,
            value: ethers.utils.parseEther("1")
        });

        for (let addy of ['0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B', '0xFf83517542B4587AAC87DEa0976675569dE0dc8D']) {

            await DAI.transfer(addy, FUND_AMOUNT, {
                from: WHALE_ADDY,
            });


            await whale_signer.sendTransaction({
                to: addy,
                value: ethers.utils.parseEther("1")
            });
        }


    })
    

    it("Add Liquidity", async function () {
        amt = 10
        await USER_DAI.approve(liq.address, amt);
        await liq.addLiquidity(amt);

        expect(await liq.balanceOf(owner.address, 0)).to.equal(amt);
        expect(await DAI.balanceOf(liq.address)).to.equal(amt);
    })

    it("Make bet", async function () {
        amt = 10

        await USER_DAI.approve(bet.address, amt);
        let bet_id = await bet.createBet(22, 1, amt);
        expect(await bet.balanceOf(owner.address, 2)).to.equal(1);
        expect(await DAI.balanceOf(bet.address)).to.equal(amt);
    })

})