import "./Vault.sol";

contract VaultManager{
    address public MARKET_CONTRACT;
    address public BET_CONTRACT;

    address public DAI;

    address[] vaults;


    constructor(address _DAI, address _MARKET_CONTRACT, address _BET_CONTRACT) public {       
        DAI = _DAI;
        MARKET_CONTRACT = _MARKET_CONTRACT;
        BET_CONTRACT = _BET_CONTRACT;
    }

    function createVault( string calldata _VAULT_NAME, address _PROVIDER, uint256 _IMBALANCE_FROM, uint256 _IMBALANCE_RATIO, bool _external_lp_enabled, uint256 liquidityAdded) public {
        if (liquidityAdded > 0){
            (bool success, bytes memory data) = DAI.call(abi.encodeWithSelector(0x23b872dd, msg.sender, address(this), liquidityAdded));
            require(success, "Cannot transfer DAI");
        }
        
        Vault vault = new Vault(_VAULT_NAME, DAI, MARKET_CONTRACT, BET_CONTRACT, _PROVIDER, _IMBALANCE_FROM, _IMBALANCE_RATIO, _external_lp_enabled);
        vaults.push(address(vault));
    }

    function getAllVaults() public returns (address[] memory) {
        return vaults;
    }
}