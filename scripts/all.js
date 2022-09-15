async function main(){
    const { deploy } = require("./deploy");
    await deploy()

    const { updateOracleOnce } = require("./oracle");
    await updateOracleOnce()

    const { updateOddsOnce } = require("./provider");
    await updateOddsOnce()

}

main()