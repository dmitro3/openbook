import detectEthereumProvider from '@metamask/detect-provider';
const {HTTP_PROVIDER, WSS_PROVIDER} = require("../config")
import Web3 from 'web3';


// console.log(web3s)

const getAllWeb3s = async () => {
    //Socket web3
    let socket_web3 = new Web3(new Web3.providers.WebsocketProvider(WSS_PROVIDER))

    //HTTP web3
    let http_web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));

    //User web3
    const provider = await detectEthereumProvider();
    let user_web3 = null;
    if(provider){
        user_web3 = new Web3(provider);
    }

    let web3s = {
        socket_web3: socket_web3,
        http_web3: http_web3,
        user_web3: user_web3
    }

    return web3s;
}

export default getAllWeb3s;