const { expect } = require("chai");
const { ethers } = require("hardhat");
const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./test_config")
const hre = require("hardhat");

let daiContract = new ethers.Contract(DAI_ADDY,erc20ABI);

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

describe('Contract tests', () => {
    const FUND_AMOUNT = (BigInt(30000)*BigInt(10**18)).toString()
    let owner;
    let liq;
    let bet;
    let market;

    let DAI;
    let USER_DAI;

    before('Deploy Contract and Transfer Tokens', async () => {

        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [WHALE_ADDY],
          });

        //get signer
        [owner] = await ethers.getSigners();



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

        for (let addy of ['0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B', '0xFf83517542B4587AAC87DEa0976675569dE0dc8D', '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd', '0x91b098c80f0FD05464915A41253AB816804Cd5E8', '0x4cdC8c8bf707748b617deB9e5bcBF8c00C7F289B', '0xaC4312942D8B40cbFB0Fa322f775414E9318f4E0']) {

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

    })

    it("Create Match at a time", async function () {

    })

    it("Create Matches", async function () {
       
    })

    it("Make all bets", async function () {

    })
})