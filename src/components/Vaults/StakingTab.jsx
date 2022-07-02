import { useEffect, useState,useMemo } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { addLiquidity, removeLiquidity } from "@utils/web3Provider";
import { DaiIcon } from "@components/Icons/DaiIcon";

  const useStyle = makeStyles({
    root: {
      marginTop: "1rem",
    },
    stakingHeader: {
      textAlign: "center",
      fontSize: "30px",
      color: "#5048E5",
      display: 'flex'
    },
    stakingText: {
      marginBottom: "1rem",
      textAlign: "center",
      display: 'flex'
    },
  });

  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#004e92",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#004e92",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5048e5",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: "royalblue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#004e92",
      },
    },
  });


export const StakingTab = (props) => {
    const styles = useStyle();
    let withdrawableValue = props.withdrawableValue;
    const [depositAmountInput, setDepositAmountInput] = useState("0");
    const [withdrawable,setWithdrawable] = useState(true);
    const stringToNum = (txt) => {
        if(txt.split){
          let number = txt.split(" ")[0];
          return Number(number)
        }
        else{
          return 0;
        }
      }
    
      let depositAmountInputNumber = Number(depositAmountInput);
      let withdrawableValueNumber = stringToNum(withdrawableValue);
      if(withdrawable){
        if(depositAmountInputNumber > withdrawableValueNumber){
          setWithdrawable(false);
        }
      }
      else{
        if(depositAmountInputNumber <= withdrawableValueNumber){
          setWithdrawable(true);
        }
      }
    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "40%",
          paddingRight: "1rem",
          alignItems: 'flex-start'
        }}
      >
        <h3 className={styles.stakingHeader}>Staking Menu</h3>
        <Typography className={styles.stakingText}>
          Input the amount of DAI you want to stake or from the OpenBook Liquidity
          Pool
        </Typography>

        {/* Deposit Amount input box */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginTop: "50px",
            justifyContent: 'flex-start'
          }}
        >
          <StyledTextField
            value={depositAmountInput}
            id="deposit-input"
            variant="outlined"
            label=" Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDepositAmountInput(e.target.value)}
            InputProps={{
              endAdornment: <DaiIcon />,
            }}
          />
        </Box>

        {/* Buttons box */}
        <Box sx={{ display: "flex", width: "100%", marginTop: "1rem",justifyContent:'flex-start' }}>
          <Button
            variant="contained"
            sx={{ marginRight: "7px" }}
            onClick={() => {addLiquidity(depositAmountInput);}}
          >
            Stake DAI
          </Button>

          <Button
            variant="contained"
            sx={{ marginLeft: "7px" }}
            className={withdrawable ? void(0) : "disbaleButton"}
            onClick={() => {removeLiquidity(depositAmountInput);}}
          >
            Withdraw DAI
          </Button>
          <style>
            {`        
              .disbaleButton{
                background-color: #8d8d8d;
                cursor: not-allowed;
                pointer-events: none;
              }
            `}
          </style>
        </Box>
      </Box>
    )
}