const vaultsReducer = (state = {
    vaults: null,
    selectedVaultAddress: null,
    vaultsData: null
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
            case "SET_VAULTS_DATA":
                state={
                    ...state,
                    vaultsData: action.payload
                }
                break;
        }
      return state;
  };

export default vaultsReducer;