import Image from 'next/image';
import {Box} from "@mui/material";
export const VaultIcon = () => {
    return (
        <Box sx={{mr:'9px !important'}}>
            <Image height='25px' width="25px" src="/static/images/top_navigation_bar_icons/safe.png"></Image>
        </Box>
    )
}