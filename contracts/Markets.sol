pragma solidity ^0.8.0;

contract Markets{
    uint256 public protocolFee;
    uint256 public LPFee;
    uint256[] market_ids;
    uint176 private _nextId = 1;


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

    mapping(uint256 => Market) private markets;



    constructor(uint256 protocolFee, uint256 _LPFee) public{
        protocolFee = protocolFee;
        LPFee = _LPFee;
    }


     //Creates new markets. Resolve current markets
    function settleMarkets(uint256[] calldata marketIds, uint256[] calldata winnerIndex) public{

        for (uint i=0; i<marketIds.length; i++)
        {
            delete markets[marketIds[i]];
        }

    }

    function getAllMarkets() public view returns (uint256 [] memory){
        return market_ids;
    }

    function marketDetailsById(uint256 id) public view returns (Market memory) {
        return markets[id];
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

            uint176  currId = _nextId+1;
            
            markets[currId] = Market(
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
                );

            market_ids.push(currId);
            _nextId++;
            
        }
    }
}