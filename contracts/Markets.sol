pragma solidity ^0.8.0;


contract Markets{
    uint256 public protocolFee;
    uint256 public LPFee;
    uint256[] market_ids;
    uint256 private _nextId = 1;

    address public BET_CONTRACT;
    uint32 public val_set = 0;



    struct Market {
        uint256 matchTimestamp;
        string[] names;
        string[] match_details;
        uint8 winnerIndex;
        uint256 protocolFee;
        uint256 LPFee;
        uint256 creationTimestamp;
        string[] bets;
        uint256[] odds;
        bool active; // false if resolved
    }

    mapping(uint256 => Market) private markets;

    modifier onlyProvider {
        require(msg.sender == 0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd);
        _;
    }


    constructor(uint256 protocolFee, uint256 _LPFee) public{
        protocolFee = protocolFee;
        LPFee = _LPFee;
    }

    function setBetContract(address _bet_contract) public{
        require(val_set == 0);
        BET_CONTRACT = _bet_contract;
        val_set = 1;
    }

    function getDefaultOddsById(uint256 id) public view returns (uint256[] memory) {
        return markets[id].odds;
    }


    function settleMarkets(uint256[] calldata marketIds, uint8[] calldata winnerIndex) onlyProvider public{

        for (uint i=0; i<marketIds.length; i++)
        {
            markets[marketIds[i]].active = false;
            markets[marketIds[i]].winnerIndex = winnerIndex[i];

            
            // IVault(BET_CONTRACT).unlockLiquidity(marketIds[i], winnerIndex[i]);

        }


    }

    function getAllMarkets() public view returns (uint256 [] memory){
        return market_ids;
    }

    function marketDetailsById(uint256 id) public view returns (Market memory) {
        return markets[id];
    }

    function getOutcomeById(uint256 id) public view returns (uint8) {
        return markets[id].winnerIndex;
    }

    function startMarket(uint256 matchTimestamp, string[] memory _names, string[] calldata _match_details, string[] calldata _bets, uint256[] calldata _odds) onlyProvider public {
        uint256  currId = _nextId+1;

        markets[currId] = Market(
                matchTimestamp,
                _names,
                _match_details,
                99,
                protocolFee,
                LPFee,
                block.timestamp,
                _bets,
                _odds,
                true
            );

        market_ids.push(currId);
        _nextId++;
    }
    


    function startMarkets(uint256[] calldata _matchTimestamps, string[][] calldata _names, string[][] calldata _match_details, string[][] calldata _bets, uint256[][] calldata _odds) onlyProvider public {
        
        for (uint i = 0; i< _matchTimestamps.length; i++){

            uint256  currId = _nextId+1;
            
            markets[currId] = Market(
                    _matchTimestamps[i],
                    _names[i],
                    _match_details[i],
                    99,
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