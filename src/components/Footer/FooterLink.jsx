import { Link } from "@mui/material";

export const FooterLink = ({children}) => {
    return(
    <Link sx={{color:'black',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    flexWrap: 'wrap',
    backgroundColor:'inherit',
    borderRadius:'10px',
    cursor:'pointer',
    flexDirection:"column"}} underline="none">{children}</Link>
    )
}