import Link from 'next/link';
import {Tab} from '@mui/material';
export const MobileWrapTab = (props) => {
    const { href } = props
    return (
    <Link href={href} style={{ width: "100%" }}>
      <Tab {...props} sx={{minWidth: "66px","&:hover":{color:'#5048E5'},padding: "0px",fontSize: "9px !important",py:'0px',width:'66px'}} iconPosition="top">
      </Tab>
    </Link>
)}