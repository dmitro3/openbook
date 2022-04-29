interface IBet {
  function DAI (  ) external view returns ( address );
  function balanceOf ( address account, uint256 id ) external view returns ( uint256 );
  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);
  function betDetailsByID ( uint256 id ) external returns ( uint256, address, uint80, uint8, uint128, uint256, uint8 );
  function createBet ( uint80 gameId, uint8 betIndex, uint128 bet_amount ) external returns ( uint176 );
  function createBets ( uint80[] calldata gameIds, uint8[] calldata betIndexes, uint128[] calldata bet_amounts ) external returns ( uint176[] memory );
  function getAllBets (  ) external returns ( uint256[] memory );
  function isApprovedForAll ( address account, address operator ) external view returns ( bool );
  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
  function setApprovalForAll ( address operator, bool approved ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function uri ( uint256 ) external view returns ( string calldata );
  function withdrawBet ( uint176 tokenId ) external returns ( bool );
  function withdrawBets ( uint176[] calldata tokenIds, uint256[] calldata ) external returns ( bool );
}
