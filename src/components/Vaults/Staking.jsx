import { useEffect, useState,useMemo } from "react";
import {
  Tab,
  Tabs,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Switch
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { DashboardLayout } from "@components/Navigation/DashboardLayout";
import { handleLiqChange } from "@utils/web3Provider";
import {StakingTab} from "@components/Vaults/StakingTab"
import { GeneralTab } from "@components/Vaults/GeneralTab";

// Redux Dependencies
import {connect} from "react-redux";
import { ManageTab } from "@components/Vaults/ManageTab";


const useStyle = makeStyles({
  root: {
    marginTop: "1rem",
  },
  bookieHeader: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "48px",
    color: "#5048E5",
    marginBottom: '20px',
    display:'flex'
  },
});

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  marginInline:'5px',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#f1ae39'
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#1890ff',
    boxSizing: 'border-box',
  },
}));

const Staking = (props) => {
  const styles = useStyle();
  const [values,setValues] = useState({
    DAI:{
      liqDisplayValue : 0,
      balanceHoldValue : 0,
      withdrawableValue : 0,
      userStakeValue : 0,
    },
    Shares:{
      liqDisplayValue : 0,
      balanceHoldValue : 0,
      withdrawableValue :  0,
      userStakeValue : 0,
    }
  })

  useEffect(()=>{
    if (props.vaults_state.vaultsData == null)
      return
    let vaultAdddress = props.vault.ADDRESS;
    let vaultsData = props.vaults_state.vaultsData;
    let temp_values = {
      DAI:{
        liqDisplayValue: vaultsData[vaultAdddress].DAI.total,
        balanceHoldValue: vaultsData[vaultAdddress].DAI.locked,
        withdrawableValue: vaultsData[vaultAdddress].DAI.withdrawable,
        userStakeValue: vaultsData[vaultAdddress].DAI.user,
      },
      Shares:{
        liqDisplayValue: vaultsData[vaultAdddress].Shares.total,
        balanceHoldValue: vaultsData[vaultAdddress].Shares.locked,
        withdrawableValue: vaultsData[vaultAdddress].Shares.withdrawable,
        userStakeValue: vaultsData[vaultAdddress].Shares.user,
      }
    }
    setValues(temp_values);
  },[props.vaults_state.vaultsData])

  const [switchState, setSwitchState] = useState(true);
  const [tabValue, setTabValue] = useState('general');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(()=>{
    if(props.user.web3)
      handleLiqChange();
    else
      return
  },[props.user.web3])

  return (
    <>
      <h1 className={styles.bookieHeader}>{props.vault.VAULT_NAME}</h1>

      {/* Two column layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignContent:'flex-start',
          width: "100%",
          borderRadius: "15px",
          padding: "2rem",
          overflow: "hidden",
          gap: "1rem",
          backgroundColor: "#f3f5f9",
          flexDirection: 'column',
          minHeight:'560px',
          position:'relative'
        }}
      >
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab value={"general"} label="General"/>
          <Tab value={"staking"} label="Staking"/>
          <Tab value={"manage"} label="Manage"/>
        </Tabs>
      </Box>
        <Box sx={{display:`${tabValue == "general" ? "block" : "none"}`}}>
          <Box sx={{display: 'flex', alignItems: 'center', width:'100%', justifyContent:'flex-end',mb:'15px'}}>
            <Typography>Shares</Typography>
            <AntSwitch onChange={(event)=>{setSwitchState(!switchState)}} checked={!!switchState}/>
            <Typography>DAI</Typography>
          </Box>
          <GeneralTab switchState={switchState} vaultsData={switchState ? values.DAI : values.Shares}/> 
        </Box>
        <Box sx={{display:`${tabValue == "staking" ? "block" : "none"}`}}>
          <Box sx={{display: 'flex', alignItems: 'center', width:'100%', justifyContent:'flex-end',mb:'15px'}}>
              <Typography>Shares</Typography>
              <AntSwitch onChange={(event)=>{setSwitchState(!switchState)}} checked={!!switchState} />
              <Typography>DAI</Typography>
            </Box>
          <StakingTab vault={props.vault} withdrawableValue={switchState ? values.DAI.withdrawableValue : values.Shares.withdrawableValue} switchState={switchState}/> 
        </Box>

        <Box sx={{display:`${tabValue == "manage" ? "block" : "none"}`}}>
          <ManageTab vault={props.vault}/>
        </Box>


      </Box>
    </>
  );
};

Staking.getLayout = (page) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user,
      vaults_state: state.vaults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
