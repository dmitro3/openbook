interface IMarkets {
  function LPFee (  ) external view returns ( uint256 );
  function getAllMarkets (  ) external view returns ( uint256[] memory );
  function getOddsById ( uint256 id ) external view returns ( uint256[] memory );
  function protocolFee (  ) external view returns ( uint256 );
  function settleMarkets ( uint256[] calldata marketIds, uint256[] calldata winnerIndex ) external;
  function startMarket ( uint256 matchTimestamp, string[] memory _names, string[] calldata _match_details, string[] calldata _bets, uint256[] calldata _odds ) external;
  function startMarkets ( uint256[] calldata _matchTimestamps, string[][] calldata _names, string[][] calldata _match_details, string[][] calldata _bets, uint256[][] calldata _odds ) external;
  function updateOdds (  ) external;
}
