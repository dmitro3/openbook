pragma solidity ^0.8.0;

//Look at how uniswap handles this
contract Bet{

    struct Market {
        address settlementAddress;
        OwnedERC20[] shareTokens;
        OwnedERC20 winner;
        uint256 winnerIndex;
        uint256 settlementFee;
        uint256 protocolFee;
        uint256 stakerFee;
        uint256 creationTimestamp;
        uint256 resolutionTimestamp; // when winner is declared
        uint256[] initialOdds;
        bool active; // false if not ready to use or if resolved
    }

    Market[] internal markets;



   constructor(address _DAI) public{
       DAI = _DAI;
    }


    //Creates new markets. Resolve current markets
    function updateMarkets() public{

    }

    function updateOdds() public{

    }

    function getAddress() public view returns (address){
        return msg.sender;
    }


    // uint256 _winningShares = _market.winner.trustedBurnAll(msg.sender);
    // _winningShares = (_winningShares / shareFactor) * shareFactor; // remove unusable dust

}