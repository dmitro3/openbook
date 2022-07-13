export function setVaults(vaults){
    return {
        type: "SET_VAULTS",
        payload: vaults
    }
}

export function setSelectedVaultIndex(index){
    return {
        type: "SET_SELECTED_VAULT_INDEX",
        payload: index
    }
}