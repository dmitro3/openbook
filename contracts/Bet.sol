pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IMarkets.sol";
import "./interfaces/ILiquidity.sol";
import "./interfaces/IERC20.sol";

contract Bet is ERC1155{

    struct singleBet {
        uint256 timestamp; //unix timestamp of when the bet was made
        address punter;  // users address
        uint256 gameId; // the ID of the game with which this token is connected
        uint8 betIndex; //0,1,2. What outcome the user chose
        uint128 bet_amount;         // the amount gambled by the user
        uint256 to_win; //the amount user can win
        address vault; //the vault taking the bet
        uint8 status; //0 means pending, 1 means settled, 2 means canceled
    }

    address public MARKET_CONTRACT;
    address public LIQUIDITY_CONTRACT;

    /// The ID of the next token that will be minted. Skips 0
    uint256 private _nextId = 1;
    uint256 public RISK_CAP = 10;

    mapping(uint256 => singleBet) private _bets;

    uint256[] all_bets;
    uint256[] bet_history;

    address public DAI;

    modifier onlyMarkets {
        require (msg.sender == MARKET_CONTRACT);
        _;
    }


    constructor(address _DAI, address _MARKET_CONTRACT, address _LIQUIDITY_CONTRACT, uint256 _RISK_CAP) public ERC1155(""){
       DAI = _DAI;
       MARKET_CONTRACT = _MARKET_CONTRACT;
       LIQUIDITY_CONTRACT = _LIQUIDITY_CONTRACT;
       RISK_CAP = RISK_CAP;
    }


    function performTransfer(uint256[] calldata gameIds, uint128[] calldata bet_amounts) internal {
        uint128 total = 0;

        for (uint i=0; i<bet_amounts.length; i++) {
            total = total + bet_amounts[i];
        }

        require(total <= getLiquidityLimit(gameIds), "Not enough liquidity");

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, LIQUIDITY_CONTRACT, total));
        require(success, "Cannot transfer DAI");
    }

    function createBets(uint256[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts) public returns (uint256[] memory){
        performTransfer(gameIds, bet_amounts); //because of 20 var limit error

        uint256[] memory curr_bets = new uint256[](bet_amounts.length);

        for (uint i=0; i<bet_amounts.length; i++) {


            uint256  currId = _nextId+1;
            uint256[] memory odds = IMarkets(MARKET_CONTRACT).getOddsById(gameIds[i]);

            curr_bets[i] = currId;


            _bets[_nextId+1] = singleBet({
                timestamp: block.timestamp,
                punter: msg.sender,
                gameId: gameIds[i],
                betIndex: betIndexes[i],
                bet_amount: bet_amounts[i],
                to_win: (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000,
                status: 0
            });

            lockedLiquidity = lockedLiquidity + (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000;
            gameWiseLiquidity[gameIds[i]][99] = gameWiseLiquidity[gameIds[i]][99] + (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000; //This tracks the total
            gameWiseLiquidity[gameIds[i]][betIndexes[i]] = gameWiseLiquidity[gameIds[i]][betIndexes[i]] + ((bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000);
        

            _mint(msg.sender, currId, 1, "");

            all_bets.push(currId);

            _nextId++;
        }
        return curr_bets;
    }



    function getAllBets() public returns (uint256 [] memory){
        return all_bets;
    }

    function getSettledBets() public returns (uint256 [] memory){
        return bet_history;
    }

    function betDetailsByID(uint256 id) public returns (uint256, address, uint256, uint8, uint128, uint256, uint8){
        return (_bets[id].timestamp, _bets[id].punter, _bets[id].gameId, _bets[id].betIndex, _bets[id].bet_amount, _bets[id].to_win, _bets[id].status);
    }

    function withdrawBets(uint256[] calldata tokenIds, uint256[] calldata indexes) public returns (bool) {
        uint totalWithdraw = 0;

        for (uint i=0; i<tokenIds.length; i++)
        {
            singleBet storage curr_bet = _bets[tokenIds[i]];
            uint8 winnerIndex = IMarkets(MARKET_CONTRACT).getOutcomeById(curr_bet.gameId);

            if (winnerIndex != 99)
            {
                require(curr_bet.punter == msg.sender, 'Not you');
                require(all_bets[indexes[i]] == tokenIds[i], "Data modified");

                if (curr_bet.betIndex == winnerIndex)
                {
                    totalWithdraw = totalWithdraw + curr_bet.to_win;
                }

                bet_history.push(tokenIds[i]);
                delete all_bets[indexes[i]];
                _burn(msg.sender, tokenIds[i], 1);
            }            
        }


        if (totalWithdraw > 0)
        {
            lockedLiquidity = lockedLiquidity - totalWithdraw;
            bool succ = ILiquidity(LIQUIDITY_CONTRACT).sendWithdrawl(msg.sender, totalWithdraw);
            require(succ, "Cannot transfer DAI");
            return succ;
        }
        
        return true;
    }
}