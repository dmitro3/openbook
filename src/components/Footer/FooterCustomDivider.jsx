import { Divider } from "@mui/material";



export const FooterCustomDivider = (props) => {
  return(
    <Divider
    sx={{
      borderColor: "#787b7d",
      my: 3,
      opacity: 0.1,
      border: '0.8px solid',
      mx: 'auto',
      width: '97%'
    }}

    style={props.style}
  />
)};

