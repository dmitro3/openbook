interface IVaultManager {
  function DAI (  ) external view returns ( address );
  function MARKET_CONTRACT (  ) external view returns ( address );
  function createVault ( address, uint256 ) external;
  function getAllVaults (  ) external returns ( address[] calldata );
}
