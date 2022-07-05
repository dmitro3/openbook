interface IBet {
  function DAI (  ) external view returns ( address );
  function LIQUIDITY_CONTRACT (  ) external view returns ( address );
  function MARKET_CONTRACT (  ) external view returns ( address );
  function balanceOf ( address account, uint256 id ) external view returns ( uint256 );
  function balanceOfBatch ( address[] calldata, uint256[] calldata ) external view returns ( uint256[] calldata );
  function betDetailsByID ( uint256 id ) external returns ( uint256, address, uint256, uint8, uint128, uint256, uint8 );
  function createBets ( uint256[] calldata, uint8[] calldata, uint128[] calldata, address _vault ) external returns ( uint256[] calldata );
  function getAllBets (  ) external returns ( uint256[] calldata );
  function getSettledBets (  ) external returns ( uint256[] calldata );
  function isApprovedForAll ( address account, address operator ) external view returns ( bool );
  function safeBatchTransferFrom ( address from, address to, uint256[] calldata, uint256[] calldata, bytes calldata ) external;
  function setApprovalForAll ( address operator, bool approved ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function withdrawBets ( uint256[] calldata, uint256[] calldata ) external returns ( bool );
}
