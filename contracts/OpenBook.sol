pragma solidity ^0.8.0;

//Look at how uniswap handles this
contract OpenBook{
    event MarketCreated(uint256 id, string[] names, uint256[] initialOdds);

    uint256 public protocolFee;
    uint256 public LPFee;

    struct Market {
        string[] names;
        int8 winnerIndex;
        uint256 protocolFee;
        uint256 LPFee;
        uint256 creationTimestamp;
        uint256 resolutionTimestamp; // when winner is declared
        uint256[] odds;
        bool active; // false if not ready to use or if resolved
    }

    Market[] internal markets;


   constructor(uint256 protocolFee, uint256 LPFee) public{
       protocolFee = protocolFee;
        LPFee = LPFee;
    }


    //Creates new markets. Resolve current markets
    function updateMarkets() public{
        
    }

    //Update odds
    function updateOdds() public{
        markets[1].odds = [1,2,3];
    }

    function getAddress() public view returns (address){
        return msg.sender;
    }

    function startMarket(string[] memory _names, uint256[] memory _initialOdds, uint256 resolutionTimestamp) internal returns (uint256 _marketId) {
        _marketId = markets.length;

        markets.push(
            Market(
                _names,
                -1,
                protocolFee,
                LPFee,
                block.timestamp,
                resolutionTimestamp,
                _initialOdds,
                false
            )
        );

        emit MarketCreated(_marketId, _names, _initialOdds);
    }
}