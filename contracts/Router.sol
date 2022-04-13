pragma solidity ^0.8.0;
import './interfaces/IBet.sol';
import './interfaces/ILiquidity.sol';

contract OpenBookRouter{

    address public BET_CONTRACT;
    address public LIQUIDITY_CONTRACT;


   constructor(address _BET_CONTRACT, address _LIQUIDITY_CONTRACT) public{
        BET_CONTRACT = BET_CONTRACT;
        LIQUIDITY_CONTRACT = LIQUIDITY_CONTRACT;

    }

    function createBet(uint80 gameId, int8 betIndex, uint128 bet_amount) public{
        //add some checks here
        IBet(BET_CONTRACT).createBet(gameId, betIndex, bet_amount);
    }

    function addLiquidity(uint256 _amount)  public {
        //add some checks here
        ILiquidity(LIQUIDITY_CONTRACT).addLiquidity(_amount);
    }
}