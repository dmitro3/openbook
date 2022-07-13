const vaultsReducer = (state = {
    vaults: [],
    selectedVaultIndex: null
  }, action) => {
      switch (action.type) {
            case "SET_VAULTS":
                state = {
                    ...state,
                    vaults: action.payload
                }   
                break;
            case "SET_SELECTED_VAULT_INDEX":
                state = {
                    ...state,
                    selectedVaultIndex: action.payload
                }
                break;
        }
      return state;
  };

export default vaultsReducer;