import "./Vault.sol";

contract VaultManager{
    address public MARKET_CONTRACT;
    address public DAI;

    address[] vaults;


    constructor(address _DAI, address _MARKET_CONTRACT) public {       
        DAI = _DAI;
        MARKET_CONTRACT = _MARKET_CONTRACT;
    }

    function createVault( address _PROVIDER, uint256 _RISK_CAP) public {
        Vault vault = new Vault(DAI, MARKET_CONTRACT, _PROVIDER, _RISK_CAP);
        vaults.push(address(vault));
    }

    function getAllVaults() public returns (address[] memory) {
        return vaults;
    }
}