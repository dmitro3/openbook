pragma solidity ^0.8.0;

contract OpenBook{
    uint256 public protocolFee;
    uint256 public LPFee;

    event MarketCreated(uint256 id, string[] names, uint256[] initialOdds);


    struct Market {
        uint256 matchTimestamp;
        string[] names;
        string sport;
        string league;
        int8 winnerIndex;
        uint256 protocolFee;
        uint256 LPFee;
        uint256 creationTimestamp;
        string[] bets;
        uint256[] odds;
        bool active; // false if resolved
    }

    Market[] internal markets;

    constructor(uint256 protocolFee, uint256 _LPFee) public{
        protocolFee = protocolFee;
        LPFee = _LPFee;
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

    //startMarket needs to be an array

    function startMarket(uint256 _matchTimestamp, string[] memory _names, string memory sport, string memory league, string[] memory _bets, uint256[] memory _odds) internal returns (uint256 _marketId) {
        _marketId = markets.length;

        markets.push(
            Market(
                _matchTimestamp,
                _names,
                sport,
                league,
                -1,
                protocolFee,
                LPFee,
                block.timestamp,
                _bets,
                _odds,
                true
            )
        );

        emit MarketCreated(_marketId, _names, _odds);

        return _marketId;
    }
}