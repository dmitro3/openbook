pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Liquidity is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant AMOUNT = 0;
    uint32 public constant POOL_SIZE = 1;
    
    address public DAI;
    IERC20 public IDAI = IERC20(DAI);

    uint256 private constant MAX_UINT = 2**256 - 1;

   constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function addLiquidity(uint32 _amount)  public {
        // IDAI.transferFrom(msg.sender, address(this), _amount);
        // IDAI.approve(address(this), MAX_UINT);
        // DAI = 0x2daa35962a6d43eb54c48367b33d0b379c930e5e;
        _mint(msg.sender, AMOUNT, _amount, "https://www.larvalabs.com/public/images/cryptopunks/punk1000.png");
        // _mint(msg.sender, POOL_SIZE, IDAI.balanceOf(address(this)), "");

    }


    function getAddress() public view returns (address){
        return msg.sender;
    }

}