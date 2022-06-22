import Link from 'next/link';
import {Tab} from '@mui/material';
export const WrapTab = (props) => {
    const { href } = props
    return (
    <Link href={href} style={{ width: "100%" }}>
      <Tab {...props} sx={{minWidth: "60px","&:hover":{color:'#5048E5'}}}/>
    </Link>
)}