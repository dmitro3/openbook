pragma solidity ^0.8.0;

//Look at how uniswap handles this
contract Bet{

    struct Market {
        address settlementAddress;
        OwnedERC20[] shareTokens;
        OwnedERC20 winner;
        uint256 winnerIndex;
        uint256 settlementFee;
        uint256 protocolFee;
        uint256 stakerFee;
        uint256 creationTimestamp;
        uint256 resolutionTimestamp; // when winner is declared
        uint256[] initialOdds;
        bool active; // false if not ready to use or if resolved
    }

    Market[] internal markets;



   constructor(address _DAI) public{
       DAI = _DAI;
    }


    //Creates new markets. Resolve current markets
    function updateMarkets() public{

    }

    function updateOdds() public{

    }

    function getAddress() public view returns (address){
        return msg.sender;
    }


    // uint256 _winningShares = _market.winner.trustedBurnAll(msg.sender);
    // _winningShares = (_winningShares / shareFactor) * shareFactor; // remove unusable dust



    // Market memory _market = markets[_id];
    //     for (uint256 _i = 0; _i < _market.shareTokens.length; _i++) {
    //         _market.shareTokens[_i].trustedMint(_receiver, _shareToMint);
    //     }

    function startMarket(
        address _settlementAddress,
        string[] memory _names,
        uint256[] memory _initialOdds,
        bool _active
    ) internal returns (uint256 _marketId) {
        _marketId = markets.length;
        markets.push(
            Market(
                _settlementAddress,
                createShareTokens(_names, address(this)),
                OwnedERC20(0),
                0,
                settlementFee,
                protocolFee,
                stakerFee,
                block.timestamp,
                0,
                _initialOdds,
                _active
            )
        );
        emit MarketCreated(_marketId, _names, _initialOdds);
        if (_active) {
            emit MarketActivated(_marketId);
        }
    }

    function createShareTokens(string[] memory _names, address _owner) internal returns (OwnedERC20[] memory) {
        uint256 _numOutcomes = _names.length;
        OwnedERC20[] memory _tokens = new OwnedERC20[](_numOutcomes);

        for (uint256 _i = 0; _i < _numOutcomes; _i++) {
            _tokens[_i] = new OwnedERC20(_names[_i], _names[_i], _owner);
        }
        return _tokens;
    }

}