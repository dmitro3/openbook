pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Bet is ERC1155{

    struct singleBet {
        uint256 timestamp; //unix timestamp of when the bet was made
        address punter;  // users address
        uint80 gameId; // the ID of the game with which this token is connected
        int8 betIndex; //0,1,2,3. What outcome the user chose
        uint128 bet_amount;         // the amount gambled by the user
        uint128 to_win; //the amount user can win
        uint8 status; //0 means pending, 1 means settled, 2 means canceled
    }

    /// The ID of the next token that will be minted. Skips 0
    uint176 private _nextId = 1;

    mapping(uint256 => singleBet) private _bets;
    uint256[] all_bets;

    address public DAI;


    constructor(address _DAI) public ERC1155(""){
       DAI = _DAI;

    }

    function createBet(uint80 gameId, int8 betIndex, uint128 bet_amount) public {

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, bet_amount));

        if (success){

            uint176 currId = _nextId+1;

            _bets[currId] = singleBet({
                timestamp: block.timestamp,
                punter: msg.sender,
                gameId: gameId,
                betIndex: betIndex,
                bet_amount: bet_amount,
                to_win: bet_amount, //get this from odds
                status: 0
             });

            _mint(msg.sender, currId, 1, "");
            all_bets.push(currId);
            _nextId++;
        }
    }


    // function getBets(address addy) public {
        

    //     for (uint i=0; i<all_bets.length; i++) {
    //         if (_bets[all_bets[i]].punter == addy){
    //             _bets[all_bets[i]];
    //         }
    //     }
    // }

    function withdrawBet(uint176 tokenId) public {
        singleBet storage curr_bet = _bets[tokenId];

        //also check that the market has been resolved
        require(curr_bet.status == 1 && curr_bet.to_win > 0, 'Not cleared');

        delete _bets[tokenId]; 
        delete all_bets[tokenId];

        _burn(msg.sender, tokenId, 1);
    }
}