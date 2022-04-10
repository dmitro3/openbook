pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Liquidity is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant AMOUNT = 0;
    uint32 public constant POOL_SIZE = 1;
    
    address public DAI;
    IERC20 public IDAI = IERC20(DAI);

    event DAITransfer(bool success);

    uint256 private constant MAX_UINT = 2**256 - 1;

   constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function addLiquidity(uint32 _amount)  public {

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
            _mint(msg.sender, AMOUNT, _amount, "https://www.larvalabs.com/public/images/cryptopunks/punk1000.png");
    }


    function getAddress() public view returns (address){
        return msg.sender;
    }

}