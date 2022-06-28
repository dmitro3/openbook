pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IBet.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

//Fix the lock

contract Liquidity is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant LIQUIDITY = 0;
    address public DAI;
    address public BET_CONTRACT;
    uint32 public val_set = 0;
    uint256 public totalSupply = 0;

    
    modifier onlyBet{
        require(msg.sender == BET_CONTRACT);
        _;
    }

   constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function setBetContract(address _bet_contract) public{
        require(val_set == 0);
        BET_CONTRACT = _bet_contract;
        val_set = 1;
    }

    function getLockedLiquidity()  public returns (uint256) {
        return IBet(BET_CONTRACT).getLockedLiquidity();
    }

    function getLockedShares() public returns (uint256) {
        return IBet(BET_CONTRACT).getLockedLiquidity() * getDAIBalance() / totalSupply;
    }

    function getTotalSupply() public returns (uint256) {
        return totalSupply;
    }


    function getUserLockedShares(address user)  public returns (uint256) {
        uint256 locked = getLockedShares()/getTotalSupply() * this.balanceOf(user, LIQUIDITY);
        return locked;
    }

    
    function getDAIBalance() public returns (uint256) {
        return IERC20(DAI).balanceOf(address(this));
    }




    function getShareValue(uint256 _amount) public returns (uint256) {
        if (totalSupply == 0){
            return _amount;
        }

        return _amount * getDAIBalance() / totalSupply;
    }

    function sendWithdrawl(address _receipent, uint256 _amount) public onlyBet returns (bool) {
        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, _receipent, _amount));
        return success;
    }


    function addLiquidity(uint256 _amount)  public {

        uint256 shares = 0;

        if (totalSupply > 0) {
            shares =  _amount * (totalSupply / getDAIBalance());
        }
        else {
            shares = _amount;
        }

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
        {
            _mint(msg.sender, LIQUIDITY, shares, "");
            totalSupply = totalSupply + shares;
        }
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