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

const Staking = (props) => {
  const styles = useStyle();
  let liqDisplayValue = props.bookie.liqDisplayValue;
  let balanceHoldValue = props.bookie.balanceHoldValue;
  let withdrawableValue = props.bookie.withdrawableValue;
  let userStakeValue = props.bookie.userStakeValue;

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
      <h1 className={styles.bookieHeader}>{props.vaultName}</h1>

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
          <GeneralTab liqDisplayValue={liqDisplayValue} balanceHoldValue={balanceHoldValue} withdrawableValue={withdrawableValue} userStakeValue={userStakeValue}/> 
        </Box>
        <Box sx={{display:`${tabValue == "staking" ? "block" : "none"}`}}>
          <StakingTab  withdrawableValue={withdrawableValue}/> 
        </Box>

        <Box sx={{display:`${tabValue == "manage" ? "block" : "none"}`}}>
          <ManageTab valueName={props.vaultName}/>
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
      bookie: state.bookie
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staking);
