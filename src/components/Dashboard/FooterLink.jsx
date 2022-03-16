import { Link } from "@mui/material";

export const FooterLink = ({children}) => {
    return(
    <Link sx={{color:'black',display: 'flex',justifyContent: 'center',alignItems: 'center',flexWrap: 'wrap',padding:'15px',backgroundColor:'#f5f5f5',borderRadius:'10px',cursor:'pointer',marginRight:'20px'}} underline="none">{children}</Link>
    )
}