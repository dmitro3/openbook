import "./Vault.sol";

contract VaultManager{
    address public MARKET_CONTRACT;
    address public DAI;

    address[] vaults;


    constructor(address _DAI, address _MARKET_CONTRACT) public {       
        DAI = _DAI;
        MARKET_CONTRACT = _MARKET_CONTRACT;
    }

    function createVault( string calldata _VAULT_NAME, address _PROVIDER, uint256 _IMBALANCE_FROM, uint256 _IMBALANCE_RATIO, bool _external_lp_enabled) public {
        Vault vault = new Vault(_VAULT_NAME, DAI, MARKET_CONTRACT, _PROVIDER, _IMBALANCE_FROM, _IMBALANCE_RATIO, _external_lp_enabled);
        vaults.push(address(vault));
    }

    function getAllVaults() public returns (address[] memory) {
        return vaults;
    }
}