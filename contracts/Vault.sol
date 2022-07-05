pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IBet.sol";
import "./interfaces/IMarkets.sol";

import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

//Fix the lock

contract Vault is ERC1155{

    address public BET_CONTRACT;
    address public MARKET_CONTRACT;
    address public PROVIDER;

    address public DAI;

    uint256 public RISK_CAP;

    //This is the ID for the the NFT
    uint32 public constant LIQUIDITY = 0;
    uint32 public val_set = 0;
    uint256 public totalSupply = 0;
    uint256 public lockedLiquidity = 0;

    event updateOdds_Event(uint256 marketId, uint256[] odds);

    mapping(uint256 => uint256[]) private vault_odds;

    mapping(uint256 => mapping(uint256 => uint256)) public gameWiseLiquidity;


    modifier onlyBet{
        require(msg.sender == BET_CONTRACT);
        _;
    }

    modifier onlyMarkets {
        require (msg.sender == MARKET_CONTRACT);
        _;
    }

    modifier onlyProvider {
        require (msg.sender == PROVIDER);
        _;
    }


   constructor(address _DAI, address _MARKET_CONTRACT, address _PROVIDER, uint256 _RISK_CAP) public ERC1155(""){
       DAI = _DAI;
       MARKET_CONTRACT = _MARKET_CONTRACT;
       PROVIDER = _PROVIDER;
       RISK_CAP = _RISK_CAP;
    }

    function setBetContract(address _bet_contract) public{
        require(val_set == 0);
        BET_CONTRACT = _bet_contract;
        val_set = 1;
    }

    function getLockedShares() public returns (uint256) {
        return lockedLiquidity * getDAIBalance() / totalSupply;
    }

    function getTotalSupply() public returns (uint256) {
        return totalSupply;
    }

    function getLockedLiquidity() external returns (uint256){
        return lockedLiquidity;
    }

    function getUserLockedShares(address user)  public returns (uint256) {
        uint256 locked = getLockedShares()/getTotalSupply() * this.balanceOf(user, LIQUIDITY);
        return locked;
    }

    
    function getDAIBalance() public returns (uint256) {
        return IERC20(DAI).balanceOf(address(this));
    }

    function getOddsById(uint256 id) public view returns (uint256[] memory) {
        //return defaul odds if not exist
        if (vault_odds[id][0] > 0){
            return vault_odds[id];
        }
        else{
            return IMarkets(MARKET_CONTRACT).getDefaultOddsById(id);
        }

    }

    function unlockLiquidity(uint256 gameId, uint8 outcome_id) onlyMarkets external{
        for (uint i = 0; i<=2; i++){
            if (i != outcome_id){
                lockedLiquidity = lockedLiquidity - gameWiseLiquidity[gameId][i];
            }
        }
    }

    function getLiquidityLimit(uint256[] calldata gameIds) public returns (uint256){
        uint256 totalLiq = IERC20(DAI).balanceOf(address(this));

        uint256 limit = totalLiq * RISK_CAP / 100;
        uint256 totalBet = 0;

        for (uint i=0; i < gameIds.length; i++){
            totalBet = totalBet + gameWiseLiquidity[gameIds[i]][99];
        }


         if (totalBet > limit){
             return 0;
         }

         return limit - totalBet;
    }


    //Update odds
    function updateOdds(uint256 marketId, uint256[] calldata newOdds) public onlyProvider{
        vault_odds[marketId] = newOdds;
        emit updateOdds_Event(marketId, newOdds);
    }

    function getShareValue(uint256 _amount) public returns (uint256) {
        if (totalSupply == 0){
            return _amount;
        }

        return _amount * getDAIBalance() / totalSupply;
    }

    function sendWithdrawl(address _receipent, uint256 _amount) public onlyBet returns (bool) {
        lockedLiquidity = lockedLiquidity - _amount;

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, _receipent, _amount));
        return success;
    }


    function addLiquidity(uint256 _amount)  public {

        uint256 shares = 0;

        if (totalSupply > 0) {
            shares =  _amount * (totalSupply / getDAIBalance()); //okay this is wrong. actually no. not sure why
        }
        else {
            shares = _amount;
        }

        console.log(_amount, totalSupply, getDAIBalance());

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
        {
            _mint(msg.sender, LIQUIDITY, shares, "");
            totalSupply = totalSupply + shares;
        }
    }

    function lockLiquidity(uint256 i, uint256[] calldata odds, uint256[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts) public onlyBet {
        lockedLiquidity = lockedLiquidity + (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000;
        gameWiseLiquidity[gameIds[i]][99] = gameWiseLiquidity[gameIds[i]][99] + (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000; //This tracks the total
        gameWiseLiquidity[gameIds[i]][betIndexes[i]] = gameWiseLiquidity[gameIds[i]][betIndexes[i]] + ((bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000);
    }

    function removeLiquidity(uint256 shares)  public {

        uint256 balance = this.balanceOf(msg.sender, LIQUIDITY);

        require(shares >= balance, "User's capital must be greater than requested amt");

        uint256 amount = getShareValue(shares);

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, msg.sender, amount));

        if (success)
        {
            totalSupply = totalSupply - shares;
            _burn(msg.sender, LIQUIDITY, shares);
        }

    }

    function getAddress() public view returns (address){
        return msg.sender;
    }

}