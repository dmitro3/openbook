pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Bet is ERC1155{

    //This is the ID for the the NFT
    uint32 public constant WAGERED = 0;
    uint32 public constant MATCH_ID = 1;
    uint32 public constant OUTCOME = 2;
    uint32 public constant ODDS = 3;

   constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function createBet(uint256 _amount)  public {

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, _amount));

        if (success)
        {
            _mint(msg.sender, WAGERED, _amount, "");
            _mint(msg.sender, MATCH_ID, _amount, "");
            _mint(msg.sender, OUTCOME, _amount, "");
            _mint(msg.sender, ODDS, _amount, "");
        }

    }

     function withdrawBet(uint256 _amount)  public {
        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, msg.sender, _amount));



    }


    function getAddress() public view returns (address){
        return msg.sender;
    }

}