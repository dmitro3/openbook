pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IMarkets.sol";
import "hardhat/console.sol";

contract Bet is ERC1155{

    struct singleBet {
        uint256 timestamp; //unix timestamp of when the bet was made
        address punter;  // users address
        uint80 gameId; // the ID of the game with which this token is connected
        uint8 betIndex; //0,1,2. What outcome the user chose
        uint128 bet_amount;         // the amount gambled by the user
        uint256 to_win; //the amount user can win
        uint8 status; //0 means pending, 1 means settled, 2 means canceled
    }

    address public MARKET_CONTRACT;


    /// The ID of the next token that will be minted. Skips 0
    uint176 private _nextId = 1;

    mapping(uint256 => singleBet) private _bets;
    uint256[] all_bets;

    address public DAI;


    constructor(address _DAI, address _MARKET_CONTRACT) public ERC1155(""){
       DAI = _DAI;
       MARKET_CONTRACT = _MARKET_CONTRACT;

    }

    function createBet(uint80 gameId, uint8 betIndex, uint128 bet_amount) public returns (uint176){

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, bet_amount));
        require(success, "Cannot transfer DAI");

        uint176 currId = _nextId+1;

        uint256[] memory odds = IMarkets(MARKET_CONTRACT).getOddsById(gameId);

        _bets[currId] = singleBet({
            timestamp: block.timestamp,
            punter: msg.sender,
            gameId: gameId,
            betIndex: betIndex,
            bet_amount: bet_amount,
            to_win: (bet_amount * odds[uint256(betIndex)]) / 1000,
            status: 0
            });

        _mint(msg.sender, currId, 1, "");
        all_bets.push(currId);
        _nextId++;
        return currId;

    }

    function createBets(uint80[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts) public returns (uint176[] memory){
        uint128 total = 0;

        for (uint i=0; i<bet_amounts.length; i++) {
            total = total + bet_amounts[i];
        }

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, this, total));
        require(success, "Cannot transfer DAI");

        uint176[] memory curr_bets = new uint176[](bet_amounts.length);

        for (uint i=0; i<bet_amounts.length; i++) {


            uint176  currId = _nextId+1;
            uint256[] memory odds = IMarkets(MARKET_CONTRACT).getOddsById(gameIds[i]);
            // console.log(odds[0]);
            // console.log(odds[1]);


            // console.log(betIndexes[i]);
            // console.log(odds[uint256(betIndexes[i])]);
            // console.log(bet_amounts[i]);


            curr_bets[i] = currId;

            _bets[currId] = singleBet({
                timestamp: block.timestamp,
                punter: msg.sender,
                gameId: gameIds[i],
                betIndex: betIndexes[i],
                bet_amount: bet_amounts[i],
                to_win: (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000, //get this from odds
                status: 0
            });


            _mint(msg.sender, currId, 1, "");
            console.log("Mint");

            all_bets.push(currId);
            console.log("Pushed");

            _nextId++;
        }
        console.log("Outside");
        return curr_bets;
    }



    function getAllBets() public returns (uint256 [] memory){
        return all_bets;
    }

    function betDetailsByID(uint256 id) public returns (uint256, address, uint80, uint8, uint128, uint256, uint8){
        return (_bets[id].timestamp, _bets[id].punter, _bets[id].gameId, _bets[id].betIndex, _bets[id].bet_amount, _bets[id].to_win, _bets[id].status);
    }

    function withdrawBets(uint176[] calldata tokenIds) public returns (bool) {
        uint totalWithdraw = 0;

        for (uint i=0; i<tokenIds.length; i++)
        {
            singleBet storage curr_bet = _bets[tokenIds[i]];

            uint8 winnerIndex = IMarkets(MARKET_CONTRACT).getOutcomeById(curr_bet.gameId);
            
            if (winnerIndex != 99)
            {
                require(curr_bet.punter == msg.sender, 'Not you');

                if (curr_bet.betIndex == winnerIndex)
                {
                    totalWithdraw = totalWithdraw + curr_bet.to_win;

                }

                delete _bets[tokenIds[i]]; 
                delete all_bets[tokenIds[i]];

                _burn(msg.sender, tokenIds[i], 1);
            }            
        }

        if (totalWithdraw > 0)
        {
            (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, this, msg.sender, totalWithdraw));
            return success;
        }
        
        return true;
    }
}