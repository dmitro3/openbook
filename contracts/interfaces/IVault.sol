interface IVault {
  function BET_CONTRACT (  ) external view returns ( address );
  function DAI (  ) external view returns ( address );
  function LIQUIDITY (  ) external view returns ( uint32 );
  function MARKET_CONTRACT (  ) external view returns ( address );
  function PROVIDER (  ) external view returns ( address );
  function RISK_CAP (  ) external view returns ( uint256 );
  function addLiquidity ( uint256 _amount ) external;
  function balanceOf ( address account, uint256 id ) external view returns ( uint256 );
  function gameWiseLiquidity ( uint256, uint256 ) external view returns ( uint256 );
  function getAddress (  ) external view returns ( address );
  function getDAIBalance (  ) external returns ( uint256 );
  function getLiquidityLimit ( uint256[] calldata ) external returns ( uint256 );
  function getLockedLiquidity (  ) external returns ( uint256 );
  function getLockedShares (  ) external returns ( uint256 );
  function getOddsById ( uint256 id ) external view returns ( uint256[] calldata );
  function getShareValue ( uint256 _amount ) external returns ( uint256 );
  function getTotalSupply (  ) external returns ( uint256 );
  function getUserLockedShares ( address user ) external returns ( uint256 );
  function isApprovedForAll ( address account, address operator ) external view returns ( bool );
  function lockLiquidity ( uint256[] calldata, uint256, uint256, uint256) external;
  function lockedLiquidity (  ) external view returns ( uint256 );
  function removeLiquidity ( uint256 shares ) external;
  function safeBatchTransferFrom ( address from, address to, uint256[] calldata, uint256[] calldata, bytes calldata ) external;
  function safeTransferFrom ( address from, address to, uint256 id, uint256 amount, bytes calldata ) external;
  function sendWithdrawl ( address _receipent, uint256 _amount ) external returns ( bool );
  function setApprovalForAll ( address operator, bool approved ) external;
  function setBetContract ( address _bet_contract ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function totalSupply (  ) external view returns ( uint256 );
  function unlockLiquidity ( uint256 gameId, uint8 outcome_id ) external;
  function updateOdds ( uint256 marketId, uint256[] calldata ) external;
  function val_set (  ) external view returns ( uint32 );
}
