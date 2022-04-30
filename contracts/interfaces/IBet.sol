interface IBet {
  function DAI (  ) external view returns ( address );
  function balanceOf ( address account, uint256 id ) external view returns ( uint256 );
  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);
  function betDetailsByID ( uint256 id ) external returns ( uint256, address, uint256, uint8, uint128, uint256, uint8 );
  function unlockLiquidity ( uint256, uint8 ) external;
  function createBets ( uint256[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts ) external returns ( uint256[] memory );
  function getAllBets (  ) external returns ( uint256[] memory );
  function getLockedLiquidity (  ) external returns ( uint256 );

  function isApprovedForAll ( address account, address operator ) external view returns ( bool );
  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
  function setApprovalForAll ( address operator, bool approved ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function uri ( uint256 ) external view returns ( string calldata );
  function withdrawBet ( uint256 tokenId ) external returns ( bool );
  function withdrawBets ( uint256[] calldata tokenIds, uint256[] calldata ) external returns ( bool );
}
