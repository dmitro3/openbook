pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IBet.sol";
import "./interfaces/IERC20.sol";

contract Liquidity is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant LIQUIDITY = 0;
    address public DAI;
    address public BET_CONTRACT;
    uint32 public val_set = 0;
    uint32 public totalSupply = 0;

    
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

    function getDAIBalance() public returns (uint256) {
        return IERC20(DAI).balanceOf(this);
    }

    function getFreeFunds() public returns (uint256) {
        return (getDAIBalance() - getLockedLiquidity());
    }

    function getShareValue(uint256 _amount) returns (uint256) {
        if (totalSupply == 0){
            return _amount;
        }

        return _amount * getFreeFunds() / totalSupply;
    }

    function sendWithdrawl(address _receipent, uint256 _amount) public onlyBet returns (bool) {
        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, _receipent, _amount));
        return success;
    }


    function addLiquidity(uint256 _amount)  public {
        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
        {
            if (totalSupply > 0) {
                shares =  _amount * (totalSupply / getFreeFunds());
            }
            else {
                shares = _amount;
            }

         
            _mint(msg.sender, LIQUIDITY, shares, "");
            total_shares = total_shares + shares;

        }
    }

    function removeLiquidity(uint256 _amount)  public {

        uint256 balance = this.balanceOf(msg.sender, LIQUIDITY);
        
        require(_shareValue(_amount) >= _amount, "User's capital must be greater than requested amt");

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, msg.sender, _amount));

        if (success)
            _burn(msg.sender, LIQUIDITY, _amount);

    }

    function getAddress() public view returns (address){
        return msg.sender;
    }

}