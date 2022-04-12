pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Liquidity is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant LIQUIDITY = 0;
    address public DAI;

   constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function addLiquidity(uint256 _amount)  public {

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
            _mint(msg.sender, LIQUIDITY, _amount, "");
    }

     function removeLiquidity(uint256 _amount)  public {
        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, msg.sender, _amount));

        if (success)
            _burn(msg.sender, LIQUIDITY, _amount);

    }


    function getAddress() public view returns (address){
        return msg.sender;
    }

}