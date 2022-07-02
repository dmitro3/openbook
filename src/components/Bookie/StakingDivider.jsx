import { Divider } from "@mui/material";



export const StakingDivider = (props) => {
  return(
    <Divider
    variant="inset"
    sx={{
      border: "1px solid #5048E5",
      my: 1,
      opacity: 0.25,
      mx: 'auto',
      width: '80%'
    }}

    style={props.style}
  />
)};

