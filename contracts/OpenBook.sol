pragma solidity ^0.8.0;

contract OpenBook{
    uint256 public protocolFee;
    uint256 public LPFee;

    struct Market {
        uint256 matchTimestamp;
        string[] names;
        string[] match_details;
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

    function startMarkets(uint256[] calldata _matchTimestamps, string[][] calldata _names, string[][] calldata _match_details, string[][] calldata _bets, uint256[][] calldata _odds) public {
        
        for (uint i = 0; i< _matchTimestamps.length; i++){
            markets.push(
                Market(
                    _matchTimestamps[i],
                    _names[i],
                    _match_details[i],
                    -1,
                    protocolFee,
                    LPFee,
                    block.timestamp,
                    _bets[i],
                    _odds[i],
                    true
                )
            );
        }
    }
}