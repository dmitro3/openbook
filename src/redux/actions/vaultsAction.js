export function setVaults(vaults){
    return {
        type: "SET_VAULTS",
        payload: vaults
    }
}

export function setSelectedVaultAddress(address){
    return {
        type: "SET_SELECTED_VAULT_ADDRESS",
        payload: address
    }
}