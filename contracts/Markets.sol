pragma solidity ^0.8.0;

import "./interfaces/IVaultManager.sol";
import "./interfaces/IVault.sol";
import "hardhat/console.sol";

contract Markets{
    uint256 public protocolFee;
    uint256[] market_ids;
    uint256 private _nextId = 1;

    address public BET_CONTRACT;
    address public MANAGER_CONTRACT;
    uint32 public val_set = 0;
    uint32 public vault_set = 0;



    struct Market {
        string id;
        uint256 matchTimestamp;
        string[] names;
        string[] match_details;
        uint8 winnerIndex;
        uint256 protocolFee;
        uint256 creationTimestamp;
        string[] bets;
        uint256[] odds;
        bool active; // false if resolved
    }

    mapping(uint256 => Market) private markets;

    modifier onlyOracle {
        require(msg.sender == 0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd);
        _;
    }


    constructor(uint256 protocolFee) public{
        protocolFee = protocolFee;
    }

    function setBetContract(address _bet_contract) public{
        require(val_set == 0);
        BET_CONTRACT = _bet_contract;
        val_set = 1;
    }

    function setVaultMgrContract(address _manager_contract) public{
        require(vault_set == 0);
        MANAGER_CONTRACT = _manager_contract;
        vault_set = 1;
    }

    function getDefaultOddsById(uint256 id) public view returns (uint256[] memory) {
        return markets[id].odds;
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

    function settleMarket(uint256 marketId, uint8 winnerIndex) onlyOracle public{
        markets[marketId].active = false;
        markets[marketId].winnerIndex = winnerIndex;

        address[] memory vaults = IVaultManager(MANAGER_CONTRACT).getAllVaults();

        for (uint j=0; j<vaults.length; j++) {
            IVault(vaults[j]).unlockLiquidity(marketId, winnerIndex);            
        }
    }

    function startMarket(string calldata id, uint256 matchTimestamp, string[] memory _names, string[] calldata _match_details, string[] calldata _bets, uint256[] calldata _odds) onlyOracle public {
        
        console.log("Starting Market");
        uint256  currId = _nextId+1;

        markets[currId] = Market(
                id,
                matchTimestamp,
                _names,
                _match_details,
                99,
                protocolFee,
                block.timestamp,
                _bets,
                _odds,
                true
            );

        market_ids.push(currId);
        _nextId++;
    }
}