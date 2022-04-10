pragma solidity ^0.8.0;

//Look at how uniswap handles this
contract OpenBook{



   constructor() public{
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

    // function startMarket(
    //     address _settlementAddress,
    //     string[] memory _names,
    //     uint256[] memory _initialOdds,
    //     bool _active
    // ) internal returns (uint256 _marketId) {
    //     _marketId = markets.length;
    //     markets.push(
    //         Market(
    //             _settlementAddress,
    //             createShareTokens(_names, address(this)),
    //             OwnedERC20(0),
    //             0,
    //             settlementFee,
    //             protocolFee,
    //             stakerFee,
    //             block.timestamp,
    //             0,
    //             _initialOdds,
    //             _active
    //         )
    //     );
    //     emit MarketCreated(_marketId, _names, _initialOdds);
    //     if (_active) {
    //         emit MarketActivated(_marketId);
    //     }
    // }



}