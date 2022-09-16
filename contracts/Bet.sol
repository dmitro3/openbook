pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./interfaces/IMarkets.sol";
import "./interfaces/IVault.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

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

    /// The ID of the next token that will be minted. Skips 0
    uint256 private _nextId = 1;

    mapping(uint256 => singleBet) private _bets;

    uint256[] all_bets;
    uint256[] bet_history;

    address public DAI;



    constructor(address _DAI, address _MARKET_CONTRACT) public ERC1155(""){
       DAI = _DAI;
       MARKET_CONTRACT = _MARKET_CONTRACT;
    }


    function performTransfer(uint256[] calldata gameIds, uint128[] calldata bet_amounts, address _vault) internal {
        uint128 total = 0;

        for (uint i=0; i<bet_amounts.length; i++) {
            total = total + bet_amounts[i];
        }

        require(total <= IVault(_vault).getLiquidityLimit(gameIds), "Not enough liquidity");

        (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, _vault, total));
        require(success, "Cannot transfer DAI");
    }

    function createBets(uint256[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts, address _vault) public returns (uint256[] memory){
        performTransfer(gameIds, bet_amounts, _vault); //because of 20 var limit error

        uint256[] memory curr_bets = new uint256[](bet_amounts.length);

        for (uint i=0; i<bet_amounts.length; i++) {


            uint256  currId = _nextId+1;
            uint256[] memory odds = IVault(_vault).getOddsById(gameIds[i]);


            // hacky logic until a better oracle found as oracle must handle this
            uint256 matchTimestamp = IMarkets(MARKET_CONTRACT).getStartingById(gameIds[i]);
            require(block.timestamp < matchTimestamp);

            curr_bets[i] = currId;


            _bets[_nextId+1] = singleBet({
                timestamp: block.timestamp,
                punter: msg.sender,
                gameId: gameIds[i],
                betIndex: betIndexes[i],
                bet_amount: bet_amounts[i],
                to_win: (bet_amounts[i] * odds[uint256(betIndexes[i])]) / 1000,
                vault: _vault,
                status: 0
            });

            IVault(_vault).lockLiquidity(odds, gameIds[i], betIndexes[i], bet_amounts[i]);

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

    function betDetailsByID(uint256 id) public returns (singleBet memory){
        return _bets[id];
    }

    function withdrawBets(uint256[] calldata tokenIds, uint256[] calldata indexes, address[] calldata vaults) public returns (bool) {
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
                    if ((curr_bet.to_win) > 0)
                    {
                        bool succ = IVault(vaults[i]).sendWithdrawl(msg.sender, curr_bet.to_win);
                    }

                    bet_history.push(tokenIds[i]);
                    delete all_bets[indexes[i]];
                    _burn(msg.sender, tokenIds[i], 1);
                }


            }            
        }
        
        return true;
    }
}