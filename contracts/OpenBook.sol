pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract OpenBook is ChainlinkClient{
    using Chainlink for Chainlink.Request;
    

    constructor() {

    }

    function getOdds() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest("d5270d1c311941d0b08bead21fea7747", address(this), this.fulfill.selector);
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8, request, 0.1 * 10 ** 18);
    }

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {

    }


}