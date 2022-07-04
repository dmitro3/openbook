const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')

async function main(){
    let abis = await exec("yarn run hardhat export-abi")
    let dir = await readdir("./abi/contracts/", { withFileTypes: true })

    let ABI_STRING = "";

    dir.forEach((value) => {
        if (value.name.includes(".sol")){
            console.log(value.name)
        }



        //run the deploy.js

        
    })
}

main()