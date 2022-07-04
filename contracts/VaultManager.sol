import "./Vault.sol";

contract VaultManager{
    address public DAI;
    address[] vaults;


    constructor(address _DAI) public{
       DAI = _DAI;
    }

    function createVault(uint256 _RISK_CAP) public {
        Vault vault = new Vault(_DAI, _RISK_CAP);
        all_bets.push(address(currId));
    }
}