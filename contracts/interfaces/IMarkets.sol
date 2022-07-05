interface IMarkets {
  function BET_CONTRACT (  ) external view returns ( address );
  function LPFee (  ) external view returns ( uint256 );
  function getAllMarkets (  ) external view returns ( uint256[] calldata );
  function getDefaultOddsById ( uint256 id ) external view returns ( uint256[] calldata );
  function getOutcomeById ( uint256 id ) external view returns ( uint8 );
  function protocolFee (  ) external view returns ( uint256 );
  function setBetContract ( address _bet_contract ) external;
  function settleMarkets ( uint256[] calldata, uint8[] calldata ) external;
  function startMarket ( uint256 , string[] calldata, string[] calldata, string[] calldata, uint256[] calldata ) external;
  function startMarkets ( uint256[] calldata, string[][] calldata, string[][] calldata, string[][] calldata, uint256[][] calldata ) external;
  function val_set (  ) external view returns ( uint32 );
}
