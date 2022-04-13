pragma solidity ^0.8.0;

interface IBet {
  function DAI (  ) external view returns ( address );
  function balanceOf ( address account, uint256 id ) external view returns ( uint256 );
  function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);
  function createBet ( uint80 gameId, int8 betIndex, uint128 bet_amount ) external;
  function isApprovedForAll ( address account, address operator ) external view returns ( bool );
  function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
  function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
  function setApprovalForAll ( address operator, bool approved ) external;
  function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
  function withdrawBet ( uint176 tokenId ) external;
}
