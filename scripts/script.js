const hre = require("hardhat");

async function main() {
    const OpenBook = await hre.ethers.getContractFactory("OpenBook");
    const obook = await OpenBook.deploy("OpenBook");

    await obook.deployed();

    console.log("OpenBook deployed to:", obook.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
