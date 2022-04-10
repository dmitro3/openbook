pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Bet is ERC1155{

    struct singleBet {
        uint256 timestamp; //unix timestamp of when the bet was made
        address operator;  // users address
        uint80 gameId; // the ID of the game with which this token is connected
        int8 winnerIndex; //0,1,2,3. What outcome the user chose
        uint128 bet;         // the amount gambled by the user
        uint128 to_win; //the amount user can win
        uint8 status; //0 means pending, 1 means settled, 2 means canceled
    }

    /// The ID of the next token that will be minted. Skips 0
    uint176 private _nextId = 1;

    mapping(uint256 => singleBet) private _bets;

    address public DAI;


    constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;
    }

    function createBet(uint256 timestamp, uint80 gameId, int8 winnerIndex, uint128 bet) public {

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, bet));

        

        if (success){

            uint176 currId = _nextId+1;

            _bets[currId] = singleBet({
                timestamp: timestamp,
                operator: msg.sender,
                gameId: gameId,
                winnerIndex: winnerIndex,
                bet: bet,
                to_win: bet, //get this from odds
                status: 0
             });

            _mint(msg.sender, currId, 1, "");

            _nextId++;
        }
    }

    function withdrawBet(uint176 tokenId) public {
        singleBet storage curr_bet = _bets[tokenId];
        require(curr_bet.status == 1 && curr_bet.to_win > 0, 'Not cleared');

        delete _bets[tokenId]; 

        _burn(msg.sender, tokenId, 1);
    }


}