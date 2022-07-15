const vaultsReducer = (state = {
    vaults: null,
    selectedVaultAddress: null
  }, action) => {
      switch (action.type) {
            case "SET_VAULTS":
                state = {
                    ...state,
                    vaults: action.payload
                }   
                break;
            case "SET_SELECTED_VAULT_ADDRESS":
                state = {
                    ...state,
                    selectedVaultAddress: action.payload
                }
                break;
        }
      return state;
  };

export default vaultsReducer;